import express from "express";
const router = express.Router();
import {
  addProfileConv,
  getProfile,
  followProfile,
  unfollowProfile,
  getProfileConv,
  editProfile,
} from "../controllers/profileController.js";
import User from "../db/models/User.js";

//image upload
import { GridFsStorage } from "multer-gridfs-storage";
import methodOverride from "method-override";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

router.route("/:username").get(getProfile).patch(editProfile);
router.route("/:username/follow").get(followProfile);
router.route("/:username/unfollow").get(unfollowProfile);
router
  .route("/:username/conversations")
  .get(getProfileConv)
  .post(addProfileConv);

//////image///////

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        return resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

router.route("/image").post(upload.single("file"), async (req, res) => {
  console.log(req.body);
  const newUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    {
      profilePicture: {
        caption: req.body.caption,
        filename: req.file.filename,
        fileId: req.file.id,
      },
    },
    { upsert: true, new: true, runValidators: true }
  );
  console.log(newUser.profilePicture);

  res.status(StatusCodes.OK);
});

export default router;
