import { StatusCodes } from "http-status-codes";
import User from "../db/models/User.js";

const getUser = async (req, res) => {
  const user = await User.findOne({ name: req.params.username });

  console.log(user);

  res.status(StatusCodes.OK).json({ user });
};

export { getUser };
