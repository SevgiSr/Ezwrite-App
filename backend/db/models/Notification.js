import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    text: {
      type: String, //commented on, mentioned you in a comment on, mentioned you on your feed
    },
    activity: {
      type: String,
    },
    route: {
      type: String,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
