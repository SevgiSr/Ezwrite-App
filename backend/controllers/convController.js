import { StatusCodes } from "http-status-codes";
import Comment from "../db/models/Comment.js";

const addConvComment = async (req, res) => {
  const { comment_content } = req.body;
  const comment = await Comment.create({
    author: req.user.userId,
    content: comment_content,
    subcomments: [],
  });
  console.log(req.params.conv_id);
  const newConv = await Comment.findOneAndUpdate(
    { _id: req.params.conv_id },
    { $push: { subcomments: comment._id } },
    { new: true, runValidators: true }
  )
    .populate("author")
    .populate({ path: "subcomments", populate: "author" });

  res.status(StatusCodes.OK).json({ newConv });
};

export { addConvComment };
