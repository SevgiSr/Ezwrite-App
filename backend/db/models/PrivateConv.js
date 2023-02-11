import mongoose from "mongoose";

const PrivateConvSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

export default mongoose.model("PrivateConv", PrivateConvSchema);
