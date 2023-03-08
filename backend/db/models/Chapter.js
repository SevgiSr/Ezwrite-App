import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema(
  {
    story: {
      type: mongoose.Types.ObjectId,
      ref: "Story",
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
    title: {
      type: String,
      default: "Unnamed Chapter",
      required: [true, "please provide title"],
    },
    content: {
      type: String,
      default: "",
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    votes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Vote",
      },
    ],
    votesCount: {
      type: Object,
      default: { upvotes: 0, downvotes: 0 },
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chapter", ChapterSchema);
