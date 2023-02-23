import { StatusCodes } from "http-status-codes";
import Message from "../db/models/Message.js";
import PrivateConv from "../db/models/PrivateConv.js";
import User from "../db/models/User.js";
import Notification from "../db/models/Notification.js";
const getPrivateConvs = async (req, res) => {
  const user = await User.findById(req.user.userId).populate({
    path: "privateConvs",
    populate: "messages partner",
  });

  res.status(StatusCodes.OK).json({ inbox: user.privateConvs });
};

const openPrivateConv = async (req, res) => {
  const { username } = req.params;
  const receiver = await User.findOne({ name: username });
  const conv = await PrivateConv.findOne({
    users: [req.user.userId, receiver._id].sort(),
  }).populate({ path: "messages", populate: "author" });
  res.status(StatusCodes.OK).json({ conv });
};

const sendMessage = async (req, res) => {
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
    const newPC = await PrivateConv.create({
      users: [req.user.userId, receiver._id].sort(),
      messages: [message],
    });
  }
  res.status(StatusCodes.OK);
};

const openNotifications = async (req, res) => {
  const user = await User.findById(req.user.userId).populate({
    path: "notifications",
    populate: "sender",
  });
  res.status(StatusCodes.OK).json({ notifications: user.notifications });
};

const sendNotification = async (req, res) => {
  const { nt } = req.body;
  const sender = await User.findById(req.user.userId);
  const notification = await Notification.create({
    type: nt.type,
    sender: sender._id,
    content: nt.content,
  });
  const user = await User.findOneAndUpdate(
    { name: req.params.username },
    { $push: { notifications: notification._id } },
    { upsert: true, new: true, runValidators: true }
  );
  res.status(StatusCodes.OK);
};

const deleteNotifications = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.user.userId },
    { $unset: { notifications: [] } },
    { upsert: true, new: true, runValidators: true }
  );

  await Notification.deleteMany({});

  res.status(StatusCodes.OK);
};

export {
  getPrivateConvs,
  openPrivateConv,
  sendMessage,
  openNotifications,
  sendNotification,
  deleteNotifications,
};
