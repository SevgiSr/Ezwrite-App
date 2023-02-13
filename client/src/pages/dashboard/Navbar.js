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

function Navbar() {
  ///////for dropdowns///////
  const { userState } = useContext(UserContext);
  const initialState = { discover: "", profile: "", write: "", edit: "" };
  const [show, setShow] = useState(initialState);

  //for notifications
  const [ntCount, setNtCount] = useState(0);
  const location = useLocation();

  //because event listener cannot acces current state
  const stateRef = useRef(show);

  const setShowState = (state) => {
    stateRef.current = state;
    setShow(state);
  };

  const menuRef = useRef([]);
  const buttonRef = useRef([]);

  const listener = (e) => {
    if (
      !menuRef.current.includes(e.target) &&
      !buttonRef.current.includes(e.target)
    ) {
      setShowState({ ...initialState });
    } else if (buttonRef.current.includes(e.target)) {
      let name = e.target.name;
      let value;
      if (stateRef.current[name] === "") {
        value = "show";
      } else {
        value = "";
      }

      setShowState({ ...initialState, [name]: value });
    }
  };

  // we sont want to create multiple listeners
  // even if component gonna mount/unmount
  useEffect(() => {
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  ///////for query///////

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
    const user = JSON.parse(localStorage.getItem("user"));
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
      <nav id="discover">
        <ul>
          <li className="logo">
            <img src={src} alt="" />
          </li>
          <li className="dropdown">
            <button
              ref={(e) => (buttonRef.current[0] = e)}
              name="discover"
              className="dropdown-toggle"
            >
              Göz at
              <AiFillCaretDown
                style={{ marginLeft: "8px", fontSize: "10px" }}
              />
            </button>
            <div
              ref={(e) => (menuRef.current[0] = e)}
              className={"dropdown-menu-parent" + show.discover}
            >
              <div className="dropdown-menu discover-dropdown-menu">
                <h3 className="dropdown-title">Göz At</h3>
                <div className="dropdown-items">
                  <Link className="dropdown-item">Fantasy</Link>
                  <Link className="dropdown-item">Romance</Link>
                  <Link className="dropdown-item">Fantasy</Link>
                  <Link className="dropdown-item">Romance</Link>
                  <Link className="dropdown-item">Fantasy</Link>
                  <Link className="dropdown-item">Romance</Link>
                  <Link className="dropdown-item">Fantasy</Link>
                  <Link className="dropdown-item">Romance</Link>
                  <Link className="dropdown-item">Fantasy</Link>
                  <Link className="dropdown-item">Romance</Link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <form onSubmit={handleSubmit} className="search-form">
        <button type="submit">
          <FiSearch />
        </button>
        <input
          onChange={handleChange}
          name="query"
          value={query}
          placeholder="Search"
          type="text"
        />
      </form>

      <nav>
        <button ref={(e) => (buttonRef.current[1] = e)} name="write">
          Yaz
          <AiFillCaretDown style={{ marginLeft: "8px", fontSize: "10px" }} />
        </button>
        <div
          ref={(e) => (menuRef.current[1] = e)}
          className={"dropdown-menu-parent" + show.write}
        >
          <div className="dropdown-menu write-dropdown-menu">
            <div className="dropdown-items">
              <Link to={`/newStory`} className="dropdown-item">
                New Story
              </Link>
              <Link to={`/myStories`} className="dropdown-item">
                My Stories
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="profile-dropdown">
        <button ref={(e) => (buttonRef.current[2] = e)} name="profile">
          <div className="pp">
            <ProfilePicture width="40px" height="40px" />
            {ntCount !== 0 && <div className="nt-count">{ntCount}</div>}
          </div>
          <AiFillCaretDown style={{ marginLeft: "10px" }} />
        </button>
        <div
          ref={(e) => (menuRef.current[0] = e)}
          className={"dropdown-menu-parent" + show.profile}
        >
          <div className="dropdown-menu">
            <div className="dropdown-items">
              <Link
                to={`/user/${userState.user.name}`}
                className="dropdown-item"
              >
                <span>My Profile</span>
              </Link>
              <Link to={`/notifications`} className="dropdown-item">
                <span>
                  {ntCount !== 0 && <div className="nt-count">{ntCount}</div>}
                  Notifications
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </StyledNavbar>
  );
}

export default Navbar;
