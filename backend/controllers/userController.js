import { StatusCodes } from "http-status-codes";
import User from "../db/models/User.js";
import Story from "../db/models/Story.js";
import Comment from "../db/models/Comment.js";

const getProfile = async (req, res) => {
  const user = await User.findOne({ name: req.params.username }).populate(
    "stories"
  );

  res.status(StatusCodes.OK).json({ user });
};

const getProfileConv = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ name: username });
  const comments = await Comment.find({
    _id: { $in: user.comments },
  }).populate({ path: "subcomments", populate: { path: "author" } });

  res.status(StatusCodes.OK).json({ conv: comments });
};

const addProfileConv = async (req, res) => {
  const { comment_content } = req.body;
  const comment = await Comment.create({
    author: req.user.userId,
    content: comment_content,
    subcomments: [],
  });

  await User.findOneAndUpdate(
    { name: req.params.username },
    { $push: { comments: comment._id } },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(StatusCodes.OK);
};

const addConvComment = async (req, res) => {
  const { comment_content } = req.body;
  const comment = await Comment.create({
    author: req.user.userId,
    content: comment_content,
    subcomments: [],
  });
  await Comment.findOneAndUpdate(
    { _id: req.params.conv_id },
    { $push: { subcomments: comment._id } },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(StatusCodes.OK);
};

export { getProfile, getProfileConv, addProfileConv, addConvComment };
