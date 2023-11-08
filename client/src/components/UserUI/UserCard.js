import ProfilePicture from "../ProfilePicture";
import StyledUserCard from "../styles/UserCard.styled";
import { io } from "socket.io-client";
import { ProfileContext } from "../../context/profileContext";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { BsPersonPlusFill } from "react-icons/bs";
import { UserContext } from "../../context/userContext";
import { useQuery } from "@tanstack/react-query";
import socket from "../../socket.js";
import BackgroundPicture from "../BackgroundPicture";

const UserCard = ({ user }) => {
  const {
    alertState,
    getProfile,
    useFollowProfile,
    useUnfollowProfile,
    sendNotification,
    addToFollowerFeed,
  } = useContext(ProfileContext);

  const followProfileMutation = useFollowProfile();
  const unfollowProfileMutation = useUnfollowProfile();

  const location = useLocation();

  //get profile data of ahmed user
  const { data: profileData = {}, isLoading } = useQuery(
    ["profile", user.name],
    () => getProfile(user.name)
  );

  const { userState } = useContext(UserContext);
  const localUser = userState.user;

  const toggleFollowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.name === "follow") {
      handleFollowClick();
    } else {
      handleUnfollowClick();
    }
  };

  const handleFollowClick = async () => {
    if (localUser.name === user.name) return;
    await followProfileMutation.mutateAsync({ username: user.name });

    const notification = {
      text: `${localUser.name} has followed you.`,
      activity: `${localUser.name} has followed ${user.name}`,
      route: `/user/${localUser.name}`,
    };

    socket.emit("send notification", {
      notification,
      room: user.name,
    });

    const nt_id = await sendNotification(user.name, notification);
    addToFollowerFeed("Notification", nt_id);
  };

  const handleUnfollowClick = () => {
    unfollowProfileMutation.mutate({ username: user.name });
  };

  if (!user) return null;
  if (isLoading) return null;
  return (
    <StyledUserCard>
      <Link
        to={`/user/${user.name}`}
        style={{ textDecoration: "none", color: "#222" }}
      >
        <BackgroundPicture filename={user._id} height="95px" />
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
            className={`${
              profileData.isFollowing ? "unfollow" : "follow"
            } profile-button`}
            name={profileData.isFollowing ? "unfollow" : "follow"}
          >
            <span className="icon">
              <BsPersonPlusFill />
            </span>
            <span className="btn-text">
              {profileData.isFollowing ? "unfollow" : "follow"}
            </span>
          </button>
          <div className="info">
            <div>
              {user.stories.length} <span>Works</span>
            </div>
            <div>
              {profileData.profile.following.length} <span>Following</span>
            </div>
            <div>
              {profileData.profile.followers.length} <span>Followers</span>
            </div>
          </div>
        </div>
      </Link>
    </StyledUserCard>
  );
};

export default UserCard;
