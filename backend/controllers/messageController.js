import { StatusCodes } from "http-status-codes";
import Message from "../db/models/Message.js";
import PrivateConv from "../db/models/PrivateConv.js";
import User from "../db/models/User.js";

const getPrivateConvs = async (req, res) => {
  const user = await User.findById(req.user.userId).populate({
    path: "privateConvs",
    populate: "messages partner",
  });

  res.status(StatusCodes.OK).json({ inbox: user.privateConvs });
};

const openPrivateConv = async (req, res) => {
  await PrivateConv.findById(req.body.inbox_id).populate("messages partner");
};

const sendMessage = async (req, res) => {
  const { receiver_id, message_content } = req.body;
  const privateConv = await PrivateConv.findOne();
  await Message.create({
    sender: req.user.userId,
    receiver: receiver_id,
    content: message_content,
  });
  if (privateConv) {
  } else {
    await PrivateConv.create({ partner: receiver_id, messages: [] });
  }
};

export { getPrivateConvs, openPrivateConv, sendMessage };
