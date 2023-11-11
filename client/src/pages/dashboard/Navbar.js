import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StyledNavbar from "./styles/Navbar.styled";
import src from "./logo.png";
import ProfilePicture from "../../components/ProfilePicture";
import { UserContext } from "../../context/userContext";
import { FiSearch } from "react-icons/fi";
import { AiFillCaretDown, AiOutlineMenu } from "react-icons/ai";
import socket from "../../socket.js";
import { useLocation } from "react-router-dom";
import DropdownMenu from "../../components/DropdownMenu";
import { BsFillEnvelopeFill, BsPencilSquare } from "react-icons/bs";
import { BiArrowBack, BiNetworkChart } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { ProfileContext } from "../../context/profileContext";
import styled from "styled-components";

function Navbar() {
  const { logoutUser } = useContext(UserContext);
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
      // queryClient.invalidateQueries(["notifications"]); // invalidate queries so that I see the new notifications
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

          {windowWidth > 540 && (
            <SearchForm
              windowWidth={windowWidth}
              isSearchOpen={isSearchOpen}
              setIsSearchOpen={setIsSearchOpen}
            />
          )}
        </nav>
      </div>

      <div className="section">
        <nav id="actions">
          <ul className="nav-items">
            <li className="nav-item">
              {windowWidth <= 540 && (
                <SearchForm
                  windowWidth={windowWidth}
                  isSearchOpen={isSearchOpen}
                  setIsSearchOpen={setIsSearchOpen}
                />
              )}
            </li>
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

function SearchForm({ windowWidth, isSearchOpen, setIsSearchOpen }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
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

  return (
    <StyledSearchForm>
      <button
        type="button"
        className="search-btn"
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
        <SearchFormModal
          handleChange={handleChange}
          query={query}
          setIsSearchOpen={setIsSearchOpen}
          handleKeyDown={handleKeyDown}
        />
      )}
    </StyledSearchForm>
  );
}

const StyledSearchForm = styled.form`
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-left: 30px;
  z-index: 9999;

  button {
    border: none;
    font-size: 23px;
    color: var(--font2);
    padding: 5px 7px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
      background-color: var(--background4);
    }
  }

  input {
    padding: 9px 13px;
    border-radius: 9px;
    width: 270px;
    background-color: var(--background1);
    color: var(--font1);
    border: none;
    margin-left: 5px;

    ::placeholder {
      color: var(--font2);
      font-size: 15px;
      font-weight: 500;
    }
  }
  .modal-search-form {
    background-color: var(--background5);
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
    padding: 10px;
    padding-left: 0;
    border-radius: 10px;
    position: absolute;
    left: 0;
    display: flex;
    input {
      display: block;
      width: 270px;
    }
  }

  @media only screen and (max-width: 540px) {
    margin-left: 0;
    button {
      font-size: 20px;
      padding: 5px 16px;
      background-color: transparent !important;
    }

    .modal-search-form {
      input {
        width: 150px;
      }
    }
  }
  @media only screen and (max-width: 1280px) {
    input {
      display: none;
    }
    button {
      background-color: var(--background5);
    }
  }
`;

function SearchFormModal({
  handleChange,
  query,
  setIsSearchOpen,
  handleKeyDown,
}) {
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
