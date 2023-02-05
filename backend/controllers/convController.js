import { StatusCodes } from "http-status-codes";
import Comment from "../db/models/Comment.js";

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

export { addConvComment };
