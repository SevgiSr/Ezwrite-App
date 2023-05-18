import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    story: {
      type: mongoose.Types.ObjectId,
      ref: "Story",
    },
    chapters: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Chapter",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Progress", ProgressSchema);
