//////  ROUTES ONLY FOR API  /////
// the specified routes are NOT the ones you'll see in the search bars
// you WON'T use them to display pages or any static element
//  - that is React router's job
// these only return json kind of data when frontend makes an api call
// when you make get request for writing page you'll use react
// when u make get request to pull out some data from db and display on that page you'll use backend

//create express app
import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";

import { createServer } from "http";
import { Server } from "socket.io";

//PRODUCTION
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";

//SECURITY
import helmet from "helmet";
import xss from "xss-clean/lib/index.js";
import mongoSanitize from "express-mongo-sanitize";

//db
import connectDB from "./db/connect.js";

//routers
import authRoutes from "./routes/authRoutes.js";
import myStoryRoutes from "./routes/myStoryRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import convRoutes from "./routes/convRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import jwtAuthentication from "./middleware/jwt-auth.js";
import { UnauthenticatedError } from "./errors/index.js";
import mongoose from "mongoose";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

////////////
const __dirname = dirname(fileURLToPath(import.meta.url));
//only when ready to deploy
//app.use(express.static(path.resolve(__dirname, "./client/build")));
///////////
//now -node server and I can access app in localhost:5000

app.use(express.json());
app.use(cors());

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
//for image
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////  ROUTES  ////
//  api route
app.use("/auth", authRoutes);
app.use("/myStories", jwtAuthentication, myStoryRoutes);
app.use("/user", jwtAuthentication, profileRoutes);
app.use("/stories", jwtAuthentication, storyRoutes);
app.use("/conversations", jwtAuthentication, convRoutes);
app.use("/messages", jwtAuthentication, messageRoutes);
app.use("/upload", jwtAuthentication, uploadRoutes);
app.use("/images", imageRoutes);

//  react route
/* app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
}); */

//middleware
//not-found looks for requests that do not match any of current route.
//error-handler looking for the errors that happening in our existing routes.
//error-handler comes last
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const listener = (socket) => {
  console.log(socket.id + " user is connected");
  let rooms = [];
  socket.on("join room navbar", (room2) => {
    rooms.push(room2);
    socket.join(rooms);
  });

  socket.on("join room", (room1) => {
    rooms.push(room1);
    socket.join(rooms);
  });

  //from the send button i emit send room name and messago to the server
  //so that server can broadcast it to all clients in that room
  socket.on("send message", ({ message, room }) => {
    socket.to(room).emit("receive message", message);
  });

  socket.on("send notification", ({ notification, room }) => {
    console.log(notification, room);
    socket.to(room).emit("receive notification", notification);
  });

  socket.on("disconnect", () => {
    rooms = [];
  });
};

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    /* app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    }); */

    httpServer.listen(port, () => console.log(`Listening on port ${port}...`));
    io.on("connection", listener);
  } catch (error) {
    console.log(error);
  }
};

start();
