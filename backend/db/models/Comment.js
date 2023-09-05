import mongoose from "mongoose";

// CHECKED: Gets deleted and pulled from referense correctly
const CommentSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
