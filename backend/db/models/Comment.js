import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  subcomments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export default mongoose.model("Comment", CommentSchema);
