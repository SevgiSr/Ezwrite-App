import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StyledNavbar from "./styles/Navbar.styled";
import src from "./logo.png";
import ProfilePicture from "../../components/ProfilePicture";
import { UserContext } from "../../context/userContext";
import { FiSearch } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";
import socket from "../../socket.js";
import { useLocation } from "react-router-dom";
import DropdownMenu from "../../components/DropdownMenu";

function Navbar() {
  const { userState, logoutUser } = useContext(UserContext);

  //for notifications
  const [ntCount, setNtCount] = useState(0);
  const location = useLocation();

  ///////for query///////
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/stories/search/${query}`);
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

    socket.on("receive notification", (notification) => {
      console.log(notification);
      setNtCount((prev) => prev + 1);
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
  }, [location.pathname]);

  return (
    <StyledNavbar>
      <div className="section">
        <Link to={"/"} className="logo">
          <img src={src} alt="" />
        </Link>
        <nav id="discover-dropdown">
          <DropdownMenu
            button={
              <>
                Browse
                <AiFillCaretDown
                  style={{ marginLeft: "8px", fontSize: "10px" }}
                />
              </>
            }
            menu={
              <>
                <div className="dropdown-item">
                  <div className="symbol">😍</div>
                  <Link to={"/stories/fantasy"}>Fantasy</Link>
                  <Link to={"/stories/romance"}>Romance</Link>
                  <Link to={"/stories/action"}>Action</Link>
                  <Link to={"/stories/fanfiction"}>Fanfinction</Link>
                </div>
                <div className="dropdown-item">
                  <div className="symbol">💀</div>
                  <Link to={"/stories/horror"}>Horror</Link>
                  <Link to={"/stories/mystery"}>Mystery</Link>
                  <Link to={"/stories/paranormal"}>Paranormal</Link>
                  <Link to={"/stories/vampire"}>Vampire/Werewolf</Link>
                </div>
                <div className="dropdown-item">
                  <div className="symbol">🤓</div>
                  <Link to={"/stories/educational"}>Educational</Link>
                  <Link to={"/stories/debate"}>Debate</Link>
                  <Link to={"/stories/humor"}>Humor</Link>
                  <Link to={"/stories/nonFiction"}>Non-fiction</Link>
                </div>
              </>
            }
          />
        </nav>
      </div>

      <form onSubmit={handleSubmit} id="search-form">
        <button type="submit">
          <FiSearch />
        </button>
        <input
          onChange={handleChange}
          name="query"
          value={query}
          placeholder="Search..."
          type="text"
        />
      </form>

      <div className="section">
        <nav id="read-dropdown">
          <DropdownMenu
            button={
              <>
                Read
                <AiFillCaretDown
                  style={{ marginLeft: "8px", fontSize: "10px" }}
                />
              </>
            }
            menu={
              <>
                <Link to={`/library`} className="dropdown-item">
                  Continue Reading
                </Link>
                <Link to={`/library`} className="dropdown-item">
                  Reading List
                </Link>
              </>
            }
          />
        </nav>

        <nav id="write-dropdown">
          <DropdownMenu
            button={
              <>
                Write
                <AiFillCaretDown
                  style={{ marginLeft: "8px", fontSize: "10px" }}
                />
              </>
            }
            menu={
              <>
                <Link to={`/newStory`} className="dropdown-item">
                  New Story
                </Link>
                <Link to={`/myStories`} className="dropdown-item">
                  My Stories
                </Link>
              </>
            }
          />
        </nav>

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
                {ntCount !== 0 && <div className="nt-count">{ntCount}</div>}
                <AiFillCaretDown style={{ fontSize: "10px" }} />
              </div>
            }
            menu={
              <>
                <Link
                  to={`/user/${userState.user.name}`}
                  className="dropdown-item"
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <span>My Profile</span>
                </Link>
                <Link to={`/inbox`} className="dropdown-item">
                  <span>Inbox</span>
                </Link>
                <Link to={`/notifications`} className="dropdown-item">
                  <span>
                    {ntCount !== 0 && <div className="nt-count">{ntCount}</div>}
                    Notifications
                  </span>
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
      </div>
    </StyledNavbar>
  );
}

export default Navbar;
