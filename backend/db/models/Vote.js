import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    value: {
      type: Number,
      required: true,
      enum: [-1, 1],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vote", VoteSchema);
