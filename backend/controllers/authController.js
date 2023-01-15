import User from "../db/models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

//server.js -> authRoutes -> register
///////   USING DATABASE   ////////
const register = async (req, res) => {
  // request from frontend ->
  const { name, password } = req.body;

  if (!name || !password) {
    throw new BadRequestError("please provide all values");
    //I can just throw js error and it'll be sent in error handler middleware. but instead of usual js error I created my instance of it.
  }

  const userAlreadyExists = await User.findOne({ name });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  //error is handled in User model middleware ->

  const user = await User.create({ name, password });

  const token = user.createJWT();
  //password is send back cuz of .create
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
    },
    token,
  });
};

const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new BadRequestError("Please provide all values");
  }

  //cuz in the model password is select:false it wont return back in findOne method
  const user = await User.findOne({ name }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

export { register, login };
