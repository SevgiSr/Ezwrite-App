import mongoose from "mongoose";

const ReadingListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    stories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Story",
      },
    ],
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ReadingList", ReadingListSchema);
