import ProfilePicture from "./ProfilePicture";
import StyledUserCard from "./styles/UserCard.styled";
import { io } from "socket.io-client";
import { ProfileContext } from "../context/profileContext";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsPersonPlusFill } from "react-icons/bs";
import { UserContext } from "../context/userContext";
const UserCard = ({ user }) => {
  const socket = io("http://localhost:5000");
  const { alertState, followProfile, unfollowProfile, sendNotification } =
    useContext(ProfileContext);

  const [followState, setFollowState] = useState("unfollow");

  const { userState } = useContext(UserContext);
  const localUser = userState.user;

  const toggleFollowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.name === "follow") {
      handleFollowClick();
      setFollowState("unfollow");
    } else {
      handleUnfollowClick();
      setFollowState("follow");
    }
  };
  const handleFollowClick = () => {
    if (localUser.name === user.name) return;
    followProfile(user.name);
    const notification = {
      type: "You have a new follower.",
      content: `${localUser.name} has followed you.`,
    };
    socket.emit("send notification", {
      notification,
      room: user.name,
    });

    sendNotification(user.name, notification);
  };

  const handleUnfollowClick = () => {
    console.log("unfollowing..");
    unfollowProfile(user.name);
  };

  if (!user) return null;
  return (
    <StyledUserCard className="card">
      <Link
        to={`/user/${user.name}`}
        style={{ textDecoration: "none", color: "#222" }}
      >
        <div className="background" style={{ width: "300px", height: "100px" }}>
          <img
            src={`/images/background/${user._id}`}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </div>
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
      </Link>
    </StyledUserCard>
  );
};

export default UserCard;
