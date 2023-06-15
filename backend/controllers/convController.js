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

//FOR ALL OF CONVERSATIONS' SUBCOMMENTS
const deleteConvComment = async (req, res) => {
  const { conv_id, comment_id } = req.params;

  // First, remove the subcomment document
  await Comment.findByIdAndRemove(comment_id);

  // Then, remove the reference to the subcomment from the parent comment
  await Comment.findByIdAndUpdate(conv_id, {
    $pull: { subcomments: comment_id },
  });

  res
    .status(StatusCodes.OK)
    .json({ message: "Subcomment deleted successfully." });
};

export { addConvComment, deleteConvComment };
