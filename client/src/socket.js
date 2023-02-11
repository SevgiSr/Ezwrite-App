import { io } from "socket.io-client";
/* 
autoConnect is set to false so the connection is not established right away. 
We will manually call socket.connect() later, once the user has selected conversation. */
const user = localStorage.getItem("user");

const socket = io("http://localhost:5000", {
  autoConnect: false,
  multiplex: false,
  auth: { user },
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
