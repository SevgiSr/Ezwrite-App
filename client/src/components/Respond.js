import { useContext, useState } from "react";
import StyledRespond from "./styles/Respond.styled";
import ProfilePicture from "./ProfilePicture";
import { useRef } from "react";
import { useEffect } from "react";
import socket from "../socket.js";
import { ProfileContext } from "../context/profileContext";
import { UserContext } from "../context/userContext";
import { RiSendPlaneFill } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClipLoader, SyncLoader } from "react-spinners";

function Respond({
  text,
  activity,
  type,
  sender,
  location = null,
  route,
  to,
  dest,
  useAddConv,
}) {
  const { sendNotification, profileState } = useContext(ProfileContext);
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

    if (location) {
      await addConvMutation.mutateAsync({ location, dest, comment });
    } else {
      await addConvMutation.mutateAsync({ dest, comment });
    }

    setComment("");
    const notification = {
      text: text,
      activity: activity,
      sender: sender,
      route: route,
      content: comment,
    };
    console.log(notification.text);
    socket.emit("send notification", {
      notification,
      room: to,
    });
    sendNotification(to, notification);
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
