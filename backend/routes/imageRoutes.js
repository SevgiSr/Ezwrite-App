import express from "express";
const router = express.Router();

import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
dotenv.config();
import mongoose from "mongoose";

const conn = mongoose.connection;

let gfs_images;
conn.once("open", () => {
  gfs_images = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  console.log("connected");
});

let gfs_covers;
conn.once("open", () => {
  gfs_covers = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "covers",
  });
  console.log("connected");
});

router.route("/:filename").get((req, res) => {
  if (!req.params.filename) {
    return res.status(400).send("no image id");
  }
  gfs_images.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      console.log("could not find the file");
      return res.status(404).send("no files exists");
    }

    gfs_images.openDownloadStreamByName(req.params.filename).pipe(res);

    /* gfs.openDownloadStreamByName().pipe(res); */
  });
});

router.route("/cover/:filename").get((req, res) => {
  console.log("in");
  if (!req.params.filename) {
    console.log("no filename");
    return res.status(400).send("no image id");
  }
  gfs_covers.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      console.log("could not find the file");
      return res.status(404).send("no files exists");
    }
    console.log("found");
    gfs_covers.openDownloadStreamByName(req.params.filename).pipe(res);

    /* gfs.openDownloadStreamByName().pipe(res); */
  });
});

export default router;
