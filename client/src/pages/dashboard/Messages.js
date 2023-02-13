import StyledMessages from "./styles/Messages.styled";
import { useContext, useEffect } from "react";
import { useState } from "react";
import SendMessage from "../../components/SendMessage";
import socket from "../../socket.js";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../context/profileContext";
import { Message } from "../../components/index.js";

function Messages() {
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [mainUser, setMainUser] = useState("");

  const { profileState, sendMessage, openMessages } =
    useContext(ProfileContext);

  const { username } = useParams();

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

  let i = 0;

  return (
    <StyledMessages>
      <div className="parent">
        <h1 className="title">Inbox</h1>
        <div className="messages">
          {messages?.map((msg) => {
            i++;
            return (
              <Message
                key={i}
                content={msg.content}
                isSelf={mainUser === msg.author.name}
              />
            );
          })}
        </div>
        <SendMessage
          messageContent={messageContent}
          setMessageContent={setMessageContent}
        />
      </div>
    </StyledMessages>
  );
}

export default Messages;
