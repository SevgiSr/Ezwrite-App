import { useContext, useState } from "react";
import { FcSettings } from "react-icons/fc";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProfileContext } from "../context/profileContext";
import NavLinks from "./NavLinks";
import StyledProfileNavbar from "./styles/ProfileNavbar.styled";
import { BsFillStarFill, BsPersonPlusFill } from "react-icons/bs";
import { BsPersonCheckFill } from "react-icons/bs";
import { AiFillDislike, AiFillMessage, AiOutlineBars } from "react-icons/ai";
import { io } from "socket.io-client";
import socket from "../socket.js";
import { UserContext } from "../context/userContext";
import ModalCenter from "./ModalCenter";
import StoryCardDetailed, { Alert } from "./";
import Cover from "./Cover";
import { GoEye } from "react-icons/go";
import { StoryContext } from "../context/storyContext";

const ProfileNavbar = ({ links, profileData }) => {
  //profileData has isFollowing and visited user's followers info
  //if we just invalidate prodile queries profileData is going to update

  //we need profileState for editMode
  const {
    profileState,
    openEditMode,
    useFollowProfile,
    useUnfollowProfile,
    sendNotification,
  } = useContext(ProfileContext);

  const { requestCollab, alertState } = useContext(StoryContext);

  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);

  const { userState } = useContext(UserContext);
  const { user } = userState;

  const followProfileMutation = useFollowProfile();
  const unfollowProfileMutation = useUnfollowProfile();

  const navigate = useNavigate();
  const { username } = useParams();

  const handleFollowClick = () => {
    console.log(user.name, username);
    if (user.name === username) return;
    followProfileMutation.mutate({ username });
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
    unfollowProfileMutation.mutate({ username });
  };

  const handleMessageClick = () => {
    navigate(`/inbox/${username}`);
  };

  const handleSendCollabClick = () => {
    setIsCollabModalOpen(true);
  };

  const handleSendCollabRequest = (story_id) => {
    // you need to save to backend first, because we have some checks on there
    const ntCollab = requestCollab(story_id, user._id);
    if (ntCollab) {
      socket.emit("send collab notification", {
        notification: ntCollab,
        room: username,
      });
    }
  };

  return (
    <StyledProfileNavbar>
      <Alert state={alertState} />
      <ModalCenter
        isOpen={isCollabModalOpen}
        setIsOpen={setIsCollabModalOpen}
        width={"600px"}
        content={
          <div className="collab-modal">
            <h3 className="collab-title">{username}'s Stories</h3>
            {profileData.profile.stories.map((story) => {
              return (
                <div className="collab-stories-row">
                  <Story story={story} />
                  <button
                    onClick={() => handleSendCollabRequest(story._id)}
                    className="btn btn-basic"
                    type="button"
                  >
                    Ask to collaborate
                  </button>
                </div>
              );
            })}
          </div>
        }
      />

      {profileState.isEditMode && <div className="navbar-overlay"></div>}
      <div className="parent">
        <NavLinks links={links} />

        {!profileData.isMainUser && (
          <div className="buttons">
            <button onClick={handleSendCollabClick} className="btn btn-basic">
              Collaborate
            </button>
            {profileData.isFollowing ? (
              <button
                onClick={handleUnfollowClick}
                disabled={
                  unfollowProfileMutation.isLoading ||
                  followProfileMutation.isLoading
                }
                className="following profile-btn btn btn-basic"
              >
                <span className="icon">
                  <BsPersonCheckFill />
                </span>
                <span className="btn-text">Following</span>
              </button>
            ) : (
              <button
                onClick={handleFollowClick}
                disabled={
                  followProfileMutation.isLoading ||
                  unfollowProfileMutation.isLoading
                }
                className="follow profile-btn btn"
              >
                <span className="icon">
                  <BsPersonPlusFill />
                </span>
                <span className="btn-text">Follow</span>
              </button>
            )}
            <button
              onClick={handleMessageClick}
              className="message profile-btn btn btn-basic"
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

function Story({ story }) {
  return (
    <div className="story-card-minimal">
      <div className="cover">
        <Cover filename={story._id} width="80px" />
      </div>
      <div className="content">
        <div className="title">{story.title}</div>
        <div className="meta-data">
          <div>
            <div className="icon">
              <GoEye />
            </div>
            <div className="count">{story.views}</div>
          </div>
          <div>
            <div className="icon">
              <BsFillStarFill />
            </div>
            <div className="count">{story.votesCount.upvotes}</div>
          </div>
          <div>
            <div className="icon">
              <AiFillDislike />
            </div>
            <div className="count">{story.votesCount.downvotes}</div>
          </div>
          <div>
            <div className="icon">
              <AiOutlineBars />
            </div>
            <div className="count">{story.chapters.length}</div>
          </div>
        </div>
        <div className="description">
          {story.description.slice(0, 286)}
          {story.description.length > 286 && "..."}
        </div>
      </div>
    </div>
  );
}

export default ProfileNavbar;
