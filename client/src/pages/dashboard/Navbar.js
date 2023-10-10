import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StyledNavbar from "./styles/Navbar.styled";
import src from "./logo.png";
import ProfilePicture from "../../components/ProfilePicture";
import { UserContext } from "../../context/userContext";
import { FiSearch } from "react-icons/fi";
import { AiFillBell, AiFillCaretDown, AiOutlineMenu } from "react-icons/ai";
import socket from "../../socket.js";
import { useLocation } from "react-router-dom";
import DropdownMenu from "../../components/DropdownMenu";
import { BsEnvelope, BsFillEnvelopeFill, BsPencilSquare } from "react-icons/bs";
import { BiArrowBack, BiNetworkChart } from "react-icons/bi";
import { FaBell, FaUserClock } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import SideNavbar from "./SideNavbar";
import { ProfileContext } from "../../context/profileContext";

function Navbar() {
  const { userState, logoutUser } = useContext(UserContext);
  const { queryClient } = useContext(ProfileContext);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //for notifications
  const [ntCount, setNtCount] = useState(0);
  const [ntCollabCount, setNtCollabCount] = useState(0);
  const location = useLocation();

  ///////for query///////
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/stories/search/${query}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  //for notification
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("navbar connected");
    });
    const room = user.name;
    socket.emit("join room navbar", room);

    socket.on("connect_error", (err) => {
      if (err.message !== "invalid credentials") {
        socket.connect();
      }
    });

    //TASK: make notifications mutate
    socket.on("receive notification", (notification) => {
      setNtCount(ntCount + 1); // increments notification count on instant but you still cant see new nt
      queryClient.invalidateQueries(["notifications"]); // invalidate queries so that I see the new notifications
    });

    socket.on("receive collab notification", (notification) => {
      setNtCollabCount(ntCollabCount + 1);
      queryClient.invalidateQueries(["notifications", "collab"]);
      queryClient.invalidateQueries(["myStories"]); // update collabRequests inside of my stories
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("receive notification");
      console.log("navbar disconnected!");
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/notifications") {
      setNtCount(0);
    }
    if (location.pathname === "/collaborations") {
      setNtCollabCount(0);
    }
  }, [location]);

  return (
    <StyledNavbar>
      <div className="section">
        <nav id="logo-and-search">
          <div className="logo">
            <Link to={"/"}>
              <img src={src} alt="" />
            </Link>
          </div>

          <form id="search-form">
            <button
              type="button"
              onClick={windowWidth > 1280 ? handleSubmit : handleOpenSearch}
            >
              <FiSearch />
            </button>
            <input
              onChange={handleChange}
              name="query"
              value={query}
              placeholder="Search..."
              type="text"
              onKeyDown={handleKeyDown}
            />
            {isSearchOpen && (
              <SearchForm
                handleChange={handleChange}
                query={query}
                setIsSearchOpen={setIsSearchOpen}
                handleKeyDown={handleKeyDown}
              />
            )}
          </form>
        </nav>
      </div>

      <div className="section">
        <nav id="actions">
          <ul className="nav-items">
            <li className="nav-item">
              <Link to={`/workspace/myStories/`} className="nav-link">
                <BsPencilSquare />
              </Link>
            </li>
            {windowWidth > 768 && (
              <li className="nav-item">
                <Link to="/collaborations" className="nav-link">
                  {ntCollabCount !== 0 && (
                    <div className="nt-count">{ntCollabCount}</div>
                  )}
                  <BiNetworkChart />
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/notifications" className="nav-link">
                {ntCount !== 0 && <div className="nt-count">{ntCount}</div>}
                <FaBell />
              </Link>
            </li>
            {windowWidth > 768 && (
              <li className="nav-item">
                <Link to="/inbox" className="nav-link">
                  <BsFillEnvelopeFill />
                </Link>
              </li>
            )}
            {windowWidth <= 900 && (
              <li className="nav-item">
                <Link to="/more-nav" className="nav-link">
                  <AiOutlineMenu />
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <section className="section">
        <nav id="profile-dropdown">
          <DropdownMenu
            button={
              <div className="pp">
                <ProfilePicture
                  filename={user._id}
                  width="40px"
                  height="40px"
                />
                <div className="username">{user.name}</div>
                <AiFillCaretDown style={{ fontSize: "10px" }} />
              </div>
            }
            menu={
              <>
                <Link to="" className="dropdown-item">
                  <span>Profile Info</span>
                </Link>

                <Link to={`/settings`} className="dropdown-item">
                  <span>Settings</span>
                </Link>
                <hr />
                <Link
                  to={"/register"}
                  className="dropdown-item"
                  onClick={logoutUser}
                >
                  <span>Log out</span>
                </Link>
              </>
            }
          />
        </nav>
      </section>
    </StyledNavbar>
  );
}

function SearchForm({ handleChange, query, setIsSearchOpen, handleKeyDown }) {
  return (
    <div className="modal-search-form">
      <button type="button" onClick={() => setIsSearchOpen(false)}>
        <BiArrowBack />
      </button>
      <input
        onChange={handleChange}
        name="query"
        value={query}
        placeholder="Search..."
        type="text"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Navbar;
