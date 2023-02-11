import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";
import { io } from "../server.js";

//////////  ONLY THE TOKEN   ////////////
const auth = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(payload); //what we pass in jwt.sign as the first argument.
    //req.user = payload; //now I can use usedId anywhere.
    //to look up all the jobs for user or update it I need to know the user
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default auth;
