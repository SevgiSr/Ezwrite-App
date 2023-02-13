import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    type: {
      type: String, //profile_comment, chapter_comment, conv_comment, follow, message
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
