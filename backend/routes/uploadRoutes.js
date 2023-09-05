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
let gfs_bc;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });

  gfs_bc = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "backgrounds",
  });
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

const userBcStorage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      console.log("heyoooooooooo");
      const filename = req.user.userId;
      const fileInfo = {
        filename: filename,
        bucketName: "backgrounds",
      };
      return resolve(fileInfo);
    });
  },
});

const userBcUpload = multer({
  storage: userBcStorage,
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
    const oldUser = await User.findOne({ _id: req.user.userId });

    // Update the user model
    await User.updateOne(
      { _id: req.user.userId },
      {
        profilePicture: {
          filename: req.file.filename,
          fileId: req.file.id,
        },
      },
      { new: true, runValidators: true }
    );

    // Delete the old image file
    if (oldUser && oldUser.profilePicture && oldUser.profilePicture.fileId) {
      await deleteImage(
        "profile",
        oldUser.profilePicture.filename,
        req.file.id
      );
    }

    res.status(StatusCodes.OK).json({ profilePicture: req.file.filename });
  });

router
  .route("/backgroundPicture")
  .post(userBcUpload.single("file"), async (req, res) => {
    const oldUser = await User.findOne({ _id: req.user.userId });

    // Update the user model
    await User.updateOne(
      { _id: req.user.userId },
      {
        backgroundPicture: {
          filename: req.file.filename,
          fileId: req.file.id,
        },
      },
      { new: true, runValidators: true }
    );

    // Delete the old image file
    if (
      oldUser &&
      oldUser.backgroundPicture &&
      oldUser.backgroundPicture.fileId
    ) {
      await deleteImage(
        "background",
        oldUser.backgroundPicture.filename,
        req.file.id
      );
    }

    res.status(StatusCodes.OK).json({ backgroundPicture: req.file.filename });
  });

const deleteImage = async (type, filename, newFileId) => {
  if (!filename) return console.log("No image filename");
  let gfs_var;
  if (type === "background") {
    gfs_var = gfs_bc;
  } else if (type === "profile") {
    gfs_var = gfs;
  }

  try {
    console.log("GFS OBJECTT: " + gfs_bc);
    // Find all files by filename
    gfs_var.find({ filename: filename }).toArray((err, files) => {
      if (err) {
        console.log("Couldn't find the files", err);
        return;
      }

      if (!files || files.length === 0) {
        console.log("No files with such filename");
        return;
      }

      // Loop through all files and delete them
      files.forEach((file) => {
        if (file._id.toString() !== newFileId.toString()) {
          gfs_var.delete(file._id, (err) => {
            if (err) {
              console.log("Couldn't delete the file", err);
              return;
            }
            console.log(`Successfully deleted the file with id ${file._id}`);
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export default router;
