import StyledMessages from "./styles/Messages.styled";
import { useContext, useEffect } from "react";
import { useState } from "react";
import SendMessage from "../../components/SendMessage";
import socket from "../../socket.js";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../context/profileContext";

function Messages() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { sendMessage } = useContext(ProfileContext);
  const { username } = useParams();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    socket.connect();

    socket.on("connect", () => {
      console.log("frontend connected");
      //if you sort, sevgi and sevgi3 users will be in the same room and broadcast messages to each other
      const room = JSON.stringify([user.name, username].sort());
      socket.emit("join room", room);
    });

    socket.on("connect_error", (err) => {
      if (err.message !== "invalid credentials") {
        socket.connect();
      }
    });

    // clients receive broadcastet message and change UI
    socket.on("receive message", (msg) => {
      console.log(msg);
      setMessages((prev) => [...prev, msg]);
      sendMessage();
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
          {messages ? (
            messages?.map((msg) => {
              i++;
              return (
                <div key={i} className="message">
                  {msg}
                </div>
              );
            })
          ) : (
            <p>No messages...</p>
          )}
        </div>
        <SendMessage message={message} setMessage={setMessage} />
      </div>
    </StyledMessages>
  );
}

export default Messages;
