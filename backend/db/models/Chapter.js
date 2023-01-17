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
    /* story: {
      type: mongoose.Types.ObjectId,
      ref: "Story",
      required: [true, "chapter must belong to a story"],
    }, */
  },
  { timestamps: true }
);

export default mongoose.model("Chapter", ChapterSchema);
