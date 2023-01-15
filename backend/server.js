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

//PRODUCTION
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//SECURITY
import helmet from "helmet";
import xss from "xss-clean/lib/index.js";
import mongoSanitize from "express-mongo-sanitize";

//db
import connectDB from "./db/connect.js";

//routers
import authRoutes from "./routes/authRoutes.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import jwtAuthentication from "./middleware/jwt-auth.js";

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

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

////  ROUTES  ////
//  api route
app.use("/auth", authRoutes);
/* app.use("/myStories", jwtAuthentication, storiesRoute); */

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

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {}
};

start();
