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
    tags: {
      type: Array,
      validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
    },
    language: {
      type: String,
    },
    cover: {
      type: Object,
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

function arrayLimit(val) {
  return val.length <= 15;
}

export default mongoose.model("Story", StorySchema);
