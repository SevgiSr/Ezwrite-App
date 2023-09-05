import mongoose from "mongoose";

// CHECKED: Gets deleted and pulled from referense correctly
const ChapterSchema = new mongoose.Schema(
  {
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
    history: {
      type: Array,
      default: [],
    },
    paragraphs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Paragraph",
      },
    ],
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
    visibility: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chapter", ChapterSchema);
