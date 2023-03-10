import express from "express";
const router = express.Router();
import {
  createStory,
  getMyStories,
  getMyChapters,
  editChapter,
  saveChapter,
  createChapter,
  getMyStory,
} from "../controllers/myStoryController.js";

import Story from "../db/models/Story.js";

//for image upload
import multer from "multer";
import path from "path";

import { GridFsStorage } from "multer-gridfs-storage";
import { StatusCodes } from "http-status-codes";

import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const storyStorage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    console.log("middleware");
    console.log(req.params);
    return new Promise((resolve, reject) => {
      console.log("heyoooooooooo");
      const filename = req.params.story_id;
      const fileInfo = {
        filename: filename,
        bucketName: "covers",
      };
      return resolve(fileInfo);
    });
  },
});

const storyUpload = multer({
  storage: storyStorage,
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
  .route("/cover/:story_id")
  .post(storyUpload.single("file"), async (req, res) => {
    console.log("setting cover");
    console.log(req.file);
    console.log(req.file.filename);
    console.log(req.file.fileId);

    const story = await Story.findOneAndUpdate(
      { _id: req.params.story_id },
      {
        cover: {
          filename: req.file.filename,
          fileId: req.file.id,
        },
      },
      { upsert: true, new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({ file: req.file.id });
  });

router.route("/").post(createStory).get(getMyStories);
router.route("/edit/:story_id").get(getMyStory);
router.route("/:story_id").get(getMyChapters).post(createChapter);
router.route("/:story_id/:chapter_id").get(editChapter).patch(saveChapter);

export default router;
