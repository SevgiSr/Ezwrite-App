import mongoose from "mongoose";

const FeedItemSchema = new mongoose.Schema(
  {
    type: {
      type: String, // activity, post
      enum: ["Comment", "Notification"],
    },
    item: {
      type: mongoose.Types.ObjectId,
      refPath: "type",
    },
  },
  { timestamps: true }
);

export default mongoose.model("FeedItem", FeedItemSchema);
