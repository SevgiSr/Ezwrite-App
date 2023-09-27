import mongoose from "mongoose";

const CollabNotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["CollabRequest", "PullRequest"], // Define the possible types here
  },
  request: {
    type: mongoose.Types.ObjectId,
    refPath: "type",
  },
});

export default mongoose.model("CollabNotification", CollabNotificationSchema);
