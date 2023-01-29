import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide title"],
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "please provide category"],
    },
    cover: {
      data: Buffer,
      contentType: String,
    },
    chapters: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Story", StorySchema);
