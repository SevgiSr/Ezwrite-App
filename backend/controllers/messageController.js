import { StatusCodes } from "http-status-codes";
import Message from "../db/models/Message.js";
import Comment from "../db/models/Comment.js";
import PrivateConv from "../db/models/PrivateConv.js";
import User from "../db/models/User.js";
import Notification from "../db/models/Notification.js";
import mongoose from "mongoose";
const getPrivateConvs = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate({
      path: "privateConvs",
      populate: "messages users",
    });

    console.log(user.privateConvs);

    res.status(StatusCodes.OK).json({ inbox: user.privateConvs });
  } catch (error) {
    throw new Error(error.message);
  }
};

const openPrivateConv = async (req, res) => {
  try {
    const { username } = req.params;
    const receiver = await User.findOne({ name: username });
    const conv = await PrivateConv.findOne({
      users: [req.user.userId, receiver._id].sort(),
    }).populate({ path: "messages", populate: "author" });
    res.status(StatusCodes.OK).json({ conv });
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendMessage = async (req, res) => {
  try {
    const { message_content } = req.body;
    const { username } = req.params;
    const receiver = await User.findOne({ name: username });
    const message = await Message.create({
      author: req.user.userId,
      content: message_content,
    });
    const privateConv = await PrivateConv.findOne({
      users: [req.user.userId, receiver._id].sort(),
    });

    if (privateConv) {
      privateConv.messages.push(message);
      await privateConv.save();
      console.log(privateConv);
    } else {
      const newPrivateConv = await PrivateConv.create({
        users: [req.user.userId, receiver._id].sort(),
        messages: [message],
      });
      await User.updateMany(
        { _id: { $in: [req.user.userId, receiver._id] } },
        { $push: { privateConvs: newPrivateConv._id } }
      );
    }
    res.status(StatusCodes.OK);
  } catch (error) {
    throw new Error(error.message);
  }
};

const openNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate({
      path: "notifications",
      populate: "sender location",
    });

    const notifications = user.notifications.sort(
      (a, b) => b.createdAt - a.createdAt
    );

    console.log(notifications);

    res.status(StatusCodes.OK).json({ notifications });
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendNotification = async (req, res) => {
  try {
    const { nt } = req.body;

    const notification = await Notification.create({
      ...nt,
    });

    await User.updateOne(
      { name: req.params.username },
      { $push: { notifications: notification._id } },
      { runValidators: true }
    );

    await User.updateOne(
      { _id: notification.sender },
      { $push: { activity: notification._id } },
      { runValidators: true }
    );

    res.status(StatusCodes.OK).json({ notification });
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  getPrivateConvs,
  openPrivateConv,
  sendMessage,
  openNotifications,
  sendNotification,
};
