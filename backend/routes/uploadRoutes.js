import express from "express";
const router = express.Router();
//image upload
import { GridFsStorage } from "multer-gridfs-storage";
import methodOverride from "method-override";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import User from "../db/models/User.js";
import Story from "../db/models/Story.js";
import mongoose from "mongoose";
dotenv.config();

const conn = mongoose.connection;

let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  console.log("connected");
});

const userStorage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      console.log("heyoooooooooo");
      const filename = req.user.userId;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      return resolve(fileInfo);
    });
  },
});

const userUpload = multer({
  storage: userStorage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  cb("filetype");
};

router
  .route("/profilePicture")
  .post(userUpload.single("file"), async (req, res) => {
    const newUser = await User.findOneAndUpdate(
      { _id: req.user.userId },
      {
        profilePicture: {
          filename: req.file.filename,
          fileId: req.file.id,
        },
      },
      { upsert: true, new: true, runValidators: true }
    );

    deleteImage(req.user.userId);

    res.status(StatusCodes.OK).json({ profilePicture: req.file.filename });
  });

/* router
  .route("/:story_id/cover")
  .post(storyUpload.single("file"), async (req, res) => {
    console.log("almost");

    if (req.file) {
      console.log("in");
      console.log(req.file);
    }

    const newStory = await Story.findOneAndUpdate(
      { _id: req.params.story_id },
      {
        cover: {
          filename: req.file.filename,
          fileId: req.file.id,
        },
      },
      { upsert: true, new: true, runValidators: true }
    );

    deleteImage(req.body.story_id);

    res.status(StatusCodes.OK).json({ file: req.file.id });
  }); */

const deleteImage = (filename) => {
  if (!filename) return console.log("no image filename");
  gfs.delete({ filename: filename }, (err) => {
    if (err) {
      console.log("couldnt delete image");
    }
  });
};

export default router;
