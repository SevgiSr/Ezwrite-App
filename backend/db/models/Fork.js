import mongoose from "mongoose";

const ForkSchema = new mongoose.Schema(
  {
    story: {
      type: mongoose.Types.ObjectId,
      ref: "Story",
    },
    collaborator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
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

export default mongoose.model("Fork", ForkSchema);
