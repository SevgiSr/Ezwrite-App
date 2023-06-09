import { useContext, useEffect, useRef, useState } from "react";
import StyledSendMessage from "./styles/SendMessage.styled";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";
import { ProfileContext } from "../context/profileContext";

const SendMessage = ({ messageContent, setMessageContent }) => {
  const { sendMessage } = useContext(ProfileContext);

  const socket = io("http://localhost:5000");

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

  const handleChange = (e) => {
    setMessageContent(e.target.value);
  };
  const { username } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const room = JSON.stringify([user.name, username].sort());

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageContent("");
    const message = {
      author: {
        _id: user._id,
        name: user.name,
      },
      content: messageContent,
    };
    socket.emit("send message", {
      message,
      room,
    });
    sendMessage(username, message.content);
  };
  return (
    <StyledSendMessage>
      <form onSubmit={handleSubmit}>
        <ProfilePicture filename={user._id} width="10%" height="10%" />
        <textarea
          className={show.msgBox}
          ref={texareaRef}
          value={messageContent}
          onChange={handleChange}
          name="msgBox"
          id=""
          cols="30"
          rows="10"
          placeholder="Type your message..."
        ></textarea>
        <button
          className={`${show.sendBtn} orange-button`}
          ref={buttonRef}
          name="sendBtn"
          type="submit"
        >
          Submit
        </button>
      </form>
    </StyledSendMessage>
  );
};

export default SendMessage;
