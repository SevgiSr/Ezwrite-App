import { StatusCodes } from "http-status-codes";
import User from "../db/models/User.js";
import Story from "../db/models/Story.js";
import Notification from "../db/models/Notification.js";
import Comment from "../db/models/Comment.js";
import ReadingList from "../db/models/ReadingList.js";

const getProfile = async (req, res) => {
  const profile = await User.findOne({ name: req.params.username })
    .populate("stories followers following")
    .populate({ path: "activity", populate: "sender" })
    .populate({
      path: "readingLists",
      populate: { path: "stories", populate: "author" },
    });

  let isMainUser = false;
  if (String(profile._id) === req.user.userId) {
    isMainUser = true;
  }

  let isFollowing = false;
  profile.followers.map((follower) => {
    if (String(follower._id) === req.user.userId) {
      isFollowing = true;
    }
  });

  res.status(StatusCodes.OK).json({ profile, isMainUser, isFollowing });
};

const followProfile = async (req, res) => {
  console.log("backend: following...");
  const isFollowing = await User.find({
    name: req.params.username,
    followers: { $elemMatch: { $eq: req.user.userId } },
  });

  if (isFollowing.length > 0) return;

  const user = await User.findOneAndUpdate(
    { name: req.params.username },
    { $push: { followers: req.user.userId } },
    { upsert: true, new: true, runValidators: true }
  );

  await User.findOneAndUpdate(
    { _id: req.user.userId },
    { $push: { following: user._id } }
  );
  res.status(StatusCodes.OK).json({ followers: user.followers });
};

const unfollowProfile = async (req, res) => {
  console.log("backend: unfollowing...");
  const user = await User.findOneAndUpdate(
    { name: req.params.username },
    { $pull: { followers: req.user.userId } },
    { upsert: true, new: true, runValidators: true }
  );

  await User.findOneAndUpdate(
    { _id: req.user.userId },
    { $pull: { following: user._id } }
  );

  res.status(StatusCodes.OK).json({ followers: user.followers });
};

//now you don't have to wait for activity tab to load each time because it's populated as soon as profile mounted
/* const getProfileActivity = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ name: username });

  const activity = await Notification.find({ sender: user._id }).populate(
    "sender location"
  );

  res.status(StatusCodes.OK).json({ activity });
}; */

const getProfileConv = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ name: username });
  const comments = await Comment.find({
    _id: { $in: user.comments },
  })
    .populate("author")
    .populate({ path: "subcomments", populate: "author" });

  res.status(StatusCodes.OK).json({ convs: comments });
};

const addProfileConv = async (req, res) => {
  const { comment_content } = req.body;
  const comment = await Comment.create({
    author: req.user.userId,
    content: comment_content,
    subcomments: [],
  });
  const newConv = await Comment.findById(comment._id)
    .populate("author")
    .populate({ path: "subcomments", populate: "author" });

  console.log(newConv);
  await User.findOneAndUpdate(
    { name: req.params.username },
    { $push: { comments: comment._id } },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ newConv: newConv });
};

const editProfile = async (req, res) => {
  const { profileInfo } = req.body;

  const newUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { ...profileInfo },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ newUser });
};

const getProfileSettings = async (req, res) => {
  const profileSettings = await User.findById(req.user.userId).select(
    "name AIKey"
  );
  res.status(StatusCodes.OK).json({ profileSettings });
};

export {
  getProfile,
  followProfile,
  unfollowProfile,
  getProfileConv,
  addProfileConv,
  editProfile,
  getProfileSettings,
};
