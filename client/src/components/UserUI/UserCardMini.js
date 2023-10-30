import ProfilePicture from "../ProfilePicture";
import { io } from "socket.io-client";
import { ProfileContext } from "../../context/profileContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsPersonPlusFill } from "react-icons/bs";
import StyledUserCardMini from "../styles/UserCardMini.styled";
import socket from "../../socket.js";

const UserCardMini = ({ user }) => {
  const {
    alertState,
    followProfile,
    unfollowProfile,
    sendNotification,
    addToFollowerFeed,
  } = useContext(ProfileContext);

  const [followState, setFollowState] = useState("");

  const localUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const isFollowing = user.followers.filter((f) => f._id === localUser._id);
    if (!isFollowing || isFollowing.length === 0) {
      setFollowState("follow");
    } else {
      setFollowState("unfollow");
    }
  }, []);

  const toggleFollowClick = (e) => {
    if (e.target.name === "follow") {
      handleFollowClick();
      setFollowState("unfollow");
    } else {
      handleUnfollowClick();
      setFollowState("follow");
    }
  };
  const handleFollowClick = async () => {
    if (localUser.name === user.name) return;
    await followProfile(user.name);
    const notification = {
      type: "You have a new follower.",
      content: `${localUser.name} has followed you.`,
    };
    socket.emit("send notification", {
      notification,
      room: user.name,
    });

    const nt_id = await sendNotification(user.name, notification);
    addToFollowerFeed("Notification", nt_id);
  };

  const handleUnfollowClick = () => {
    console.log("unfollowing..");
    unfollowProfile(user.name);
  };

  if (!user) return null;
  return (
    <StyledUserCardMini className="card">
      <div className="main">
        <div className="profilePicture">
          <ProfilePicture filename={user._id} width="70px" height="70px" />
        </div>
        <div className="aliases">
          <span className="profileName">{user.profileName}</span>
          <span className="username">@{user.name}</span>
        </div>
        <button
          onClick={toggleFollowClick}
          disabled={alertState.isLoading}
          className={`${followState} profile-button`}
          name={followState}
        >
          <span className="icon">
            <BsPersonPlusFill />
          </span>
          <span className="btn-text">{followState}</span>
        </button>
        <div className="info">
          <div>
            {user.stories.length} <span>Works</span>
          </div>
          <div>
            {user.following.length} <span>Following</span>
          </div>
          <div>
            {user.followers.length} <span>Followers</span>
          </div>
        </div>
      </div>
    </StyledUserCardMini>
  );
};

export default UserCardMini;
