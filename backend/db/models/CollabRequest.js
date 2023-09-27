import mongoose from "mongoose";

const CollabRequestSchema = new mongoose.Schema({
  story: {
    type: mongoose.Types.ObjectId,
    ref: "Story",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "pending",
  },
});

export default mongoose.model("CollabRequest", CollabRequestSchema);
