import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("Chapter", ChapterSchema);
