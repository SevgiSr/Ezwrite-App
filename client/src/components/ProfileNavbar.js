import { useContext } from "react";
import { FcSettings } from "react-icons/fc";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProfileContext } from "../context/profileContext";
import OrangeLinks from "./OrangeLinks";
import StyledProfileNavbar from "./styles/ProfileNavbar.styled";
import { BsPersonPlusFill } from "react-icons/bs";
import { BsPersonCheckFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { io } from "socket.io-client";

const ProfileNavbar = ({ links }) => {
  const socket = io("http://localhost:5000");

  const {
    profileState,
    openEditMode,
    followProfile,
    unfollowProfile,
    sendNotification,
  } = useContext(ProfileContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const { username } = useParams();

  const handleEditClick = () => {
    openEditMode();
  };

  const handleFollowClick = () => {
    console.log(user.name, username);
    if (user.name === username) return;
    followProfile(username);
    const notification = {
      type: "You have a new follower.",
      content: `${user.name} has followed you.`,
    };
    socket.emit("send notification", {
      notification,
      room: username,
    });

    sendNotification(username, notification);
  };

  const handleUnfollowClick = () => {
    console.log("unfollowing..");
    unfollowProfile(username);
  };

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
            {profileState.isFollowing ? (
              <button
                onClick={handleUnfollowClick}
                disabled={profileState.isDisabled}
                className="following profile-button"
              >
                <span className="icon">
                  <BsPersonCheckFill />
                </span>
                <span className="btn-text">Following</span>
              </button>
            ) : (
              <button
                onClick={handleFollowClick}
                disabled={profileState.isDisabled}
                className="follow profile-button"
              >
                <span className="icon">
                  <BsPersonPlusFill />
                </span>
                <span className="btn-text">Follow</span>
              </button>
            )}
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
