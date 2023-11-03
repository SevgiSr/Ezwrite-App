import StyledMessages from "./styles/Messages.styled";
import { useContext, useEffect } from "react";
import { useState } from "react";
import socket from "../../socket.js";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../context/profileContext";
import { Message } from "../../components/index.js";
import { UserContext } from "../../context/userContext";
import { useRef } from "react";
import ProfilePicture from "../../components/ProfilePicture";
import styled from "styled-components";

function Messages() {
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [mainUser, setMainUser] = useState("");

  const { username } = useParams();

  const { profileState, sendMessage, openMessages } =
    useContext(ProfileContext);
  const { userState } = useContext(UserContext);

  const room = JSON.stringify([userState.user.name, username].sort());

  useEffect(() => {
    setMessages(profileState.messages);
  }, [profileState.messages]);

  useEffect(() => {
    openMessages(username);

    socket.connect();

    const user = JSON.parse(localStorage.getItem("user"));
    setMainUser(user.name);

    socket.on("connect", () => {
      console.log("frontend connected");
      //if you sort, sevgi and sevgi3 users will be in the same room and broadcast messages to each other
    });
    const room = JSON.stringify([user.name, username].sort());
    socket.emit("join room", room);

    socket.on("connect_error", (err) => {
      if (err.message !== "invalid credentials") {
        socket.connect();
      }
    });

    // clients receive broadcastet message and change UI
    socket.on("receive message", (msg) => {
      console.log(msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("receive message");
      socket.off("connect_error");
      console.log("frontend disconnected!");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageContent("");
    const message = {
      author: {
        _id: userState.user._id,
        name: userState.user.name,
      },
      content: messageContent,
    };
    setMessages((prev) => [...prev, message]);
    socket.emit("send message", {
      message,
      room,
    });
    sendMessage(username, message.content);
  };

  let i = 0;

  return (
    <StyledMessages>
      <h3 className="title">Your conversation with {username}</h3>
      <div className="messages">
        {messages?.map((msg) => {
          i++;
          return (
            <Message key={i} msg={msg} isSelf={mainUser === msg.author.name} />
          );
        })}
      </div>
      <SendMessage
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        handleSubmit={handleSubmit}
      />
    </StyledMessages>
  );
}

function SendMessage({ messageContent, setMessageContent, handleSubmit }) {
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
}

const StyledSendMessage = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;

  form {
    width: 100%;
    padding: 20px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    textarea {
      border-radius: 15px;
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      color: var(--font1);
      background-color: var(--background5);
      width: 85%;
      height: 45px;
      border: none;
      padding: 0.5rem 0.8rem;
      -webkit-transition: height 0.5s;
      resize: none;
    }
    button {
      cursor: pointer;
      display: none;
      position: absolute;
      bottom: 10px;
      right: 10px;
      border: none;
      padding: 10px 10px;
    }
    .sendBtn-show {
      display: block;
    }

    .msgBox-show {
      height: 80px;
      margin-bottom: 40px;
    }
    .msgBox-show ~ button {
      display: block;
    }
  }
`;

export default Messages;
