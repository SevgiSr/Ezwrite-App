import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    text: {
      type: String, //commented on, mentioned you in a comment on, mentioned you on your feed
    },
    activity: {
      type: String,
    },
    type: {
      type: String, //conversation, story, profile
    },
    location: {
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
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
