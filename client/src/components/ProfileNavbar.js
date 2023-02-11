import { useContext } from "react";
import { FcSettings } from "react-icons/fc";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProfileContext } from "../context/profileContext";
import OrangeLinks from "./OrangeLinks";
import StyledProfileNavbar from "./styles/ProfileNavbar.styled";
import { RiUserFollowFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";

const ProfileNavbar = ({ links }) => {
  const { profileState, openEditMode } = useContext(ProfileContext);
  const navigate = useNavigate();
  const { username } = useParams();
  const handleEditClick = () => {
    openEditMode();
  };

  const handleFollowClick = () => {};

  const handleMessageClick = () => {
    navigate(`/inbox/${username}`);
  };

  return (
    <StyledProfileNavbar>
      {profileState.isEditMode && <div className="navbar-overlay"></div>}
      <div className="parent">
        <OrangeLinks links={links} className="orange-links" />
        {profileState.isMainUser ? (
          <button className="profile-button" onClick={handleEditClick}>
            <span className="icon">
              <FcSettings />
            </span>
            <span className="btn-text">Edit Profile</span>
          </button>
        ) : (
          <div className="buttons">
            <button
              onClick={handleFollowClick}
              className="follow profile-button"
            >
              <span className="icon">
                <RiUserFollowFill />
              </span>
              <span className="btn-text">Follow</span>
            </button>
            <button
              onClick={handleMessageClick}
              className="message profile-button"
            >
              <span className="icon">
                <AiFillMessage />
              </span>

              <span className="btn-text">Message</span>
            </button>
          </div>
        )}
      </div>
    </StyledProfileNavbar>
  );
};

export default ProfileNavbar;
