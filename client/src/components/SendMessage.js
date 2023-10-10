import { useContext, useEffect, useRef, useState } from "react";
import StyledSendMessage from "./styles/SendMessage.styled";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { ProfileContext } from "../context/profileContext";
import socket from "../socket.js";
import { UserContext } from "../context/userContext";

const SendMessage = ({ messageContent, setMessageContent, handleSubmit }) => {
  const { userState } = useContext(UserContext);

  const initialState = { msgBox: "", sendBtn: "" };
  const [show, setShow] = useState(initialState);

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

  return (
    <StyledSendMessage>
      <form onSubmit={handleSubmit}>
        <ProfilePicture
          filename={userState.user._id}
          width="50px"
          height="50px"
        />
        <textarea
          className={show.msgBox}
          ref={texareaRef}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          name="msgBox"
          id=""
          cols="30"
          rows="1"
          placeholder="Type your message..."
        ></textarea>
        <button
          className={`${show.sendBtn} btn btn-main`}
          ref={buttonRef}
          name="sendBtn"
          type="submit"
        >
          Send
        </button>
      </form>
    </StyledSendMessage>
  );
};

export default SendMessage;
