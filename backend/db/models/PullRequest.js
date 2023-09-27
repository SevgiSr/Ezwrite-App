import mongoose from "mongoose";

const PullRequestSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  fork: {
    type: mongoose.Types.ObjectId,
    ref: "Fork",
  },
  status: {
    type: String,
    default: "pending",
  },
});

export default mongoose.model("PullRequest", PullRequestSchema);
