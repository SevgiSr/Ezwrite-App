import { useContext, useState } from "react";
import StyledRespond from "./styles/Respond.styled";
import ProfilePicture from "./ProfilePicture";
import { useRef } from "react";
import { useEffect } from "react";
import socket from "../socket.js";
import { ProfileContext } from "../context/profileContext";
import { UserContext } from "../context/userContext";
import { ClipLoader } from "react-spinners";

function Respond({
  text,
  activity,
  type = "Notification",
  sender,
  story_id = null,
  route = null,
  to,
  dest,
  useAddConv,
  isFeed = true,
}) {
  const { sendNotification, addToFollowerFeed } = useContext(ProfileContext);
  const { userState } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const initialState = { comment: "", share: "" };
  const [show, setShow] = useState(initialState);

  //addComment can be adding a comment to the profile or a book or adding a comment to a conversation
  //inactive ones won't be refetching anyways, so this is not wasteful

  const addConvMutation = useAddConv();

  const stateRef = useRef(show);

  const setShowState = (state) => {
    stateRef.current = state;
    setShow(state);
  };

  const texareaRef = useRef();
  const buttonRef = useRef();

  const listener = (e) => {
    if (e.target !== buttonRef.current && e.target !== texareaRef.current) {
      setShowState(initialState);
    } else {
      setShowState({
        ...stateRef.current,
        [e.target.name]: `${e.target.name}-show`,
      });
    }
  };
  useEffect(() => {
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;
    setShow(initialState);

    let conv_id;
    if (story_id) {
      // story_id by default is null, I only pass story id for calculating story's score
      // if you're making comment in a story, I need story_id to calculate score
      conv_id = await addConvMutation.mutateAsync({ story_id, dest, comment });
    } else {
      conv_id = await addConvMutation.mutateAsync({ dest, comment });
    }

    setComment("");

    if (!to) {
      return; //if no one needs to be notifyed or feeded, return
    }

    const notification = {
      text: text,
      activity: activity,
      sender: sender,
      route: route,
      content: comment,
    };
    if (type === "Notification") {
      const rooms = Array.isArray(to) ? to : Array.of(to);
      rooms.forEach((room) =>
        socket.emit("send notification", {
          notification,
          room: room,
        })
      );

      const nt_id = await sendNotification(rooms, notification);
      if (isFeed) await addToFollowerFeed("Notification", nt_id, rooms); // add notification to followers' feed, I dont want to add to feed of whoever received the notification
    } else if (type === "Post") {
      // if it' somebody making a post, dont send notification just add to the feed (it was notifying me for making comment on my profile)
      if (isFeed) await addToFollowerFeed("Post", conv_id); // add post to followers' feed
    }
  };

  return (
    <StyledRespond>
      <form onSubmit={handleSubmit}>
        <ProfilePicture
          filename={userState.user._id}
          width="50px"
          height="50px"
        />
        <textarea
          className={show.comment}
          ref={texareaRef}
          name="comment"
          value={comment}
          onChange={handleChange}
          cols="30"
          rows="1"
          placeholder="Type your comment..."
        ></textarea>
        {addConvMutation.isLoading && (
          <div className="icon">
            <ClipLoader color="rgb(0, 178, 178)" size={25} />
          </div>
        )}
        <button
          className={`${show.share} btn btn-main`}
          name="share"
          ref={buttonRef}
          type="submit"
        >
          Share
        </button>
      </form>
    </StyledRespond>
  );
}

export default Respond;
