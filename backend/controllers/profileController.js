import { StatusCodes } from "http-status-codes";
import User from "../db/models/User.js";
import Story from "../db/models/Story.js";
import Notification from "../db/models/Notification.js";
import Comment from "../db/models/Comment.js";
import ReadingList from "../db/models/ReadingList.js";
import { getStoryVotes, getStoryViews } from "./storyController.js";

import {
  handleAddConvComment,
  handleDeleteConvComment,
} from "./commentControllers.js";
import FeedItem from "../db/models/FeedItem.js";

const getAllUsers = async (req, res) => {
  try {
    console.log("gettin users");
    let users = await User.find();
    users = users.filter(
      (user) => String(user._id) !== String(req.user.userId)
    );
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProfile = async (req, res) => {
  try {
    const mainUser = await User.findById(req.user.userId);
    let isMainUser = false;
    if (req.params.username === mainUser.name) {
      isMainUser = true;
    }
    let profile = await User.findOne({ name: req.params.username })
      .populate({
        path: "stories",
        options: { excludeVisibilityCheck: isMainUser },
        populate: "author",
      })
      .populate("followers following")
      .populate({ path: "activity", populate: "sender" })
      .populate({
        path: "readingLists",
        populate: { path: "stories", populate: "author" },
      });

    profile.stories.sort((a, b) => {
      // First sort by visibility (published comes first)
      if (a.visibility === "published" && b.visibility !== "published")
        return -1;
      if (a.visibility !== "published" && b.visibility === "published")
        return 1;

      // Then sort by updatedAt date (newest first)
      return b.updatedAt - a.updatedAt;
    });

    let isFollowing = false;
    profile.followers.map((follower) => {
      if (String(follower._id) === req.user.userId) {
        isFollowing = true;
      }
    });

    res.status(StatusCodes.OK).json({ profile, isMainUser, isFollowing });
  } catch (error) {
    throw new Error(error.message);
  }
};

const followProfile = async (req, res) => {
  try {
    console.log("backend: following...");
    const isFollowing = await User.find({
      name: req.params.username,
      followers: { $elemMatch: { $eq: req.user.userId } },
    });

    if (isFollowing.length > 0) return;

    const user = await User.findOneAndUpdate(
      { name: req.params.username },
      { $push: { followers: req.user.userId } },
      { new: true, runValidators: true }
    );

    await User.findOneAndUpdate(
      { _id: req.user.userId },
      { $push: { following: user._id } }
    );
    res.status(StatusCodes.OK).json({ followers: user.followers });
  } catch (error) {
    throw new Error(error.message);
  }
};

const unfollowProfile = async (req, res) => {
  try {
    console.log("backend: unfollowing...");
    const user = await User.findOneAndUpdate(
      { name: req.params.username },
      { $pull: { followers: req.user.userId } },
      { new: true, runValidators: true }
    );

    await User.findOneAndUpdate(
      { _id: req.user.userId },
      { $pull: { following: user._id } }
    );

    res.status(StatusCodes.OK).json({ followers: user.followers });
  } catch (error) {
    throw new Error(error.message);
  }
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
  try {
    const { username } = req.params;
    const user = await User.findOne({ name: username });
    const comments = await Comment.find({
      _id: { $in: user.comments },
    })
      .populate("author")
      .populate({ path: "subcomments", populate: "author" });

    res.status(StatusCodes.OK).json({ convs: comments });
  } catch (error) {
    throw new Error(error.message);
  }
};

const addProfileConv = async (req, res) => {
  try {
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
    await User.updateOne(
      { name: req.params.username },
      { $push: { comments: comment._id } },
      { runValidators: true }
    );

    res.status(StatusCodes.OK).json({ newConv_id: newConv._id });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProfileConv = async (req, res) => {
  try {
    const conv = await Comment.findById(req.params.conv_id);

    if (conv) {
      for (let commentId of conv.subcomments) {
        await Comment.findByIdAndRemove(commentId);
      }
      await User.findOneAndUpdate(
        { name: req.params.username },
        {
          $pull: { comments: conv._id },
        }
      );

      await conv.delete();
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "comment deleted successfully." });
  } catch (error) {
    throw new Error(error.message);
  }
};

const addConvComment = async (req, res) => {
  await handleAddConvComment(req, res);
};

//FOR ALL OF CONVERSATIONS' SUBCOMMENTS
const deleteConvComment = async (req, res) => {
  await handleDeleteConvComment(req, res);
};

const editProfile = async (req, res) => {
  try {
    const { profileInfo } = req.body;

    const newUser = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { ...profileInfo },
      { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({ newUser });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProfileSettings = async (req, res) => {
  try {
    const profileSettings = await User.findById(req.user.userId).select(
      "name AIKey"
    );
    res.status(StatusCodes.OK).json({ profileSettings });
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  getProfile,
  followProfile,
  unfollowProfile,
  getProfileConv,
  addProfileConv,
  editProfile,
  getProfileSettings,
  deleteProfileConv,
  getAllUsers,
  addConvComment,
  deleteConvComment,
};
