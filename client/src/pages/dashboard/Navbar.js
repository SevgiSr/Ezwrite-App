import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import StyledNavbar from "./styles/Navbar.styled";
import src from "./logo.png";
import ProfilePicture from "../../components/ProfilePicture";
import { UserContext } from "../../context/userContext";
import { FiSearch } from "react-icons/fi";
import { AiFillCaretDown } from "react-icons/ai";

function Navbar() {
  const initialState = { discover: "", profile: "", write: "" };
  const [show, setShow] = useState(initialState);
  const toggleMenu = (e) => {
    const name = e.target.name;
    console.log(name);
    let value;
    if (show[name] === "") {
      value = "show";
    } else {
      value = "";
    }
    setShow({ ...initialState, [name]: value });
  };

  const { userState } = useContext(UserContext);

  return (
    <StyledNavbar>
      <nav id="discover">
        <ul>
          <li className="logo">
            <img src={src} alt="" />
          </li>
          <li className="dropdown">
            <button
              onClick={toggleMenu}
              name="discover"
              className="dropdown-toggle"
            >
              Göz at
            </button>
            <div className={"dropdown-menu-parent" + show.discover}>
              <div className="dropdown-menu">
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
          </li>
        </ul>
      </nav>

      <form className="search-form" action="/search/">
        <button type="submit">
          <FiSearch />
        </button>
        <input name="q" placeholder="Ara" type="text" />
      </form>

      <nav>
        <button onClick={toggleMenu} name="write">
          Yaz
        </button>
        <div className={"dropdown-menu-parent" + show.write}>
          <div className="dropdown-menu">
            <Link to={`/newStory`} className="dropdown-item">
              New Story
            </Link>
            <Link to={`/myStories`} className="dropdown-item">
              My Stories
            </Link>
          </div>
        </div>
      </nav>

      <div className="profile-dropdown">
        <button onClick={toggleMenu} name="profile">
          <ProfilePicture width="40px" height="40px" />{" "}
          <AiFillCaretDown style={{ marginLeft: "10px" }} />
        </button>
        <div className={"dropdown-menu-parent" + show.profile}>
          <div className="dropdown-menu">
            <Link to={`/user/${userState.user.name}`} className="dropdown-item">
              My Profile
            </Link>
          </div>
        </div>
      </div>
    </StyledNavbar>
  );
}

export default Navbar;
