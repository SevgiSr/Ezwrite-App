import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
