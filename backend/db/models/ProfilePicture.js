import mongoose from "mongoose";

const ProfilePictureSchema = new mongoose.Schema({
  caption: {
    type: String,
  },
  filename: {
    type: String,
  },
  fileId: {
    type: String,
  },
});

export default mongoose.model("ProfilePicture", ProfilePictureSchema);
