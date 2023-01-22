//read from database
import "../assets/ProfileNavbar.css";
import { NavLink } from "react-router-dom";

const ProfileNavbar = () => {
  return (
    <nav id="profile-navbar">
      <div id="profile-links">
        <NavLink to="" className="profile-link">
          About
        </NavLink>
        <NavLink to="conversations" className="profile-link">
          Conversations
        </NavLink>
        <NavLink to="following" className="profile-link">
          Following
        </NavLink>
      </div>
    </nav>
  );
};

export default ProfileNavbar;
