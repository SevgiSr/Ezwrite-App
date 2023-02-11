import { useEffect, useRef, useState } from "react";
import StyledSendMessage from "./styles/SendMessage.styled";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import ProfilePicture from "./ProfilePicture";

const SendMessage = ({ message, setMessage }) => {
  const socket = io("http://localhost:5000");

  const initialState = { message: "", send: "" };
  const [show, setShow] = useState(initialState);
  const user = JSON.parse(localStorage.getItem("user"));

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
    setMessage(e.target.value);
  };
  const { username } = useParams();

  const room = JSON.stringify([user.name, username].sort());

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send message", {
      message,
      room,
    });
  };
  return (
    <StyledSendMessage>
      <form onSubmit={handleSubmit}>
        <ProfilePicture width="10%" height="10%" />
        <textarea
          className={show.message}
          ref={texareaRef}
          value={message}
          onChange={handleChange}
          name="message"
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button
          className={`${show.send} orange-button`}
          ref={buttonRef}
          name="send"
          type="submit"
        >
          Submit
        </button>
      </form>
    </StyledSendMessage>
  );
};

export default SendMessage;
