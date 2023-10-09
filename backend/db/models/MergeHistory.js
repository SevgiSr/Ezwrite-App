import mongoose from "mongoose";

const MergeHistorySchema = new mongoose.Schema(
  {
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

export default mongoose.model("MergeHistory", MergeHistorySchema);
