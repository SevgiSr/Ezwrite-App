import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/Navbar.css";

function Navbar() {
  const initialState = { discover: "", profile: "" };
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

  return (
    <div id="header">
      <nav id="discover">
        <ul className="list-inline">
          <li id="header-logo">
            just logo
            <Link />
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

      <form
        id="header-search-form"
        className="form-horizontal"
        action="/search/"
      >
        <button type="submit">Q</button>
        <input name="q" placeholder="Ara" type="text" />
      </form>

      <nav></nav>

      <div onClick={toggleMenu} name="profile" id="profile-dropdown">
        <button data-toggle="dropdown" id="profile-toggle-btn">
          <div className="avatar">
            <img src="" alt="" width="25" height="25" />
          </div>
          <span className="username">sevgi</span>
        </button>
        <div className={"dropdown-menu-parent" + show.profile}>
          <div className="dropdown-menu">
            <Link className="dropdown-item">My Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
