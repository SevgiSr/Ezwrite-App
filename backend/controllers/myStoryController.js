import { StatusCodes } from "http-status-codes";
import Story from "../db/models/Story.js";
import User from "../db/models/User.js";
import Chapter from "../db/models/Chapter.js";
import { BadRequestError } from "../errors/index.js";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import checkPermissions from "../utils/checkPermissions.js";

//if you use req.user.userId - secure
//if you don't, add checkPermissions()

//before adding checkPermissions users could easily change each others stories by just knowing it's id

const getMyStories = async (req, res) => {
  // jwt-auth middleware coming before sending any myStory request
  // sets userId inside req.user object if the token is verified
  /*   console.log(req.user.userId); */
  //author field in story model only had ur user's id
  // now author is an object of id and name
  const myStories = await Story.find({ author: req.user.userId }).populate({
    path: "author chapters",
  });
  res.status(StatusCodes.OK).json({ myStories });
};

const createStory = async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !category) {
    throw new BadRequestError("please provide all values");
  }

  req.body.author = req.user.userId;
  req.body.chapters = [await Chapter.create({ content: "" })];

  const story = await Story.create(req.body);

  await User.findOneAndUpdate(
    { _id: req.user.userId },
    { $push: { stories: story._id } },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(StatusCodes.CREATED).json({ story });
};

const getMyChapters = async (req, res) => {
  const story = await Story.findById(req.params.id).populate({
    path: "chapters",
    select: "title",
  });

  checkPermissions(req.user.userId, story.author._id);

  res.status(StatusCodes.OK).json({ story });
};

const editChapter = async (req, res) => {
  const story = await Story.findById(req.params.story_id).populate({
    path: "chapters",
    select: "title content",
  });

  checkPermissions(req.user.userId, story.author._id);

  const chapter = story.chapters.find(
    (chapter) => String(chapter._id) === req.params.chapter_id
  );

  res.status(StatusCodes.OK).json({ story, chapter });
};

const saveChapter = async (req, res) => {
  const updatedChapter = await Chapter.findOneAndUpdate(
    { _id: req.params.chapter_id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedChapter });
};

const createChapter = async (req, res) => {
  const story = await Story.findById(req.params.id);
  checkPermissions(req.user.userId, story.author._id);

  const chapter = await Chapter.create({ content: "" });
  const newStory = await Story.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { chapters: chapter._id } },
    { upsert: true, new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ newStory, chapter });
};

export {
  getMyStories,
  createStory,
  getMyChapters,
  editChapter,
  saveChapter,
  createChapter,
};
