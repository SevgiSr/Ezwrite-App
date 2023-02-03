import { useContext } from "react";
import { FcSettings } from "react-icons/fc";
import { Link } from "react-router-dom";
import { ProfileContext } from "../context/profileContext";
import OrangeLinks from "./OrangeLinks";
import StyledProfileNavbar from "./styles/ProfileNavbar.styled";

const ProfileNavbar = ({ links }) => {
  const { profileState, openEditMode } = useContext(ProfileContext);
  const handleClick = () => {
    openEditMode();
  };
  return (
    <StyledProfileNavbar>
      {profileState.isEditMode && <div className="navbar-overlay"></div>}
      <OrangeLinks links={links} className="orange-links" />
      <button className="edit-profile-btn" onClick={handleClick}>
        <Link to="">
          <span className="icon">
            <FcSettings />
          </span>
          <span className="btn-text">Edit Profile</span>
        </Link>
      </button>
    </StyledProfileNavbar>
  );
};

export default ProfileNavbar;
