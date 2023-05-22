import { StatusCodes } from "http-status-codes";
import Story from "../db/models/Story.js";
import User from "../db/models/User.js";
import Chapter from "../db/models/Chapter.js";
import { BadRequestError } from "../errors/index.js";
import fs from "fs";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { countChapterVotes } from "./storyController.js";
import { Configuration, OpenAIApi } from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import checkPermissions from "../utils/checkPermissions.js";
import Paragraph from "../db/models/Paragraph.js";

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
  // Sort stories based on creation or update time in descending order (from farthest to nearest)
  const sortedStories = myStories.sort((a, b) => {
    const aTime = new Date(a.updatedAt);
    const bTime = new Date(b.updatedAt);

    // Compare the time values to sort in descending order
    if (aTime > bTime) {
      return -1;
    } else if (aTime < bTime) {
      return 1;
    } else {
      return 0;
    }
  });

  res.status(StatusCodes.OK).json({ myStories: sortedStories });
};

const getMyStory = async (req, res) => {
  const myStory = await Story.findById(req.params.story_id).populate({
    path: "author chapters",
  });

  res.status(StatusCodes.OK).json({ myStory });
};

const createStory = async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !category) {
    throw new BadRequestError("please provide all values");
  }

  req.body.author = req.user.userId;

  const story = await Story.create(req.body);

  const chapter = await Chapter.create({
    content: "",
    story: story._id,
    author: req.user.userId,
  });

  story.chapters.push(chapter._id);
  await story.save();

  await User.findOneAndUpdate(
    { _id: req.user.userId },
    { $push: { stories: story._id } },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(StatusCodes.CREATED).json({ story });
};

const deleteStory = async (req, res) => {
  const story = await Story.findOne({ _id: req.params.story_id });

  checkPermissions(req.user.userId, story.author._id);
  await story.delete();
  res.status(StatusCodes.OK);
};

const updateStory = async (req, res) => {
  const { title, category } = req.body;

  if (!title || !category) {
    throw new BadRequestError("please provide all values");
  }

  const story = await Story.findOneAndUpdate(
    { _id: req.params.story_id },
    { ...req.body },
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
  const { chapter, divArray } = req.body;

  const chapterObj = await Chapter.findById(req.params.chapter_id);
  for (let i = 0; i < chapterObj.paragraphs.length; i++) {
    await Paragraph.findByIdAndDelete(chapterObj.paragraphs[i]._id);
  }

  const paragraphs = divArray.map((div) => new Paragraph({ content: div }));
  paragraphs.forEach((div) => div.save());

  chapterObj.title = chapter.title;
  chapterObj.content = chapter.content;
  chapterObj.paragraphs = paragraphs;
  chapterObj.save();

  res.status(StatusCodes.OK).json({ updatedChapter: chapterObj });
};

const createChapter = async (req, res) => {
  const story = await Story.findById(req.params.story_id);
  checkPermissions(req.user.userId, story.author._id);

  const chapter = await Chapter.create({
    content: "",
    author: req.user.userId,
    story: story._id,
  });

  story.chapters.push(chapter._id);
  await story.save();

  res.status(StatusCodes.OK).json({ newStory: story, chapter });
};

const sendGptPrompt = async (req, res) => {
  const user = await User.findById(req.user.userId).select("GPTKey");

  const configuration = new Configuration({
    apiKey: user.GPTKey,
  });

  const openai = new OpenAIApi(configuration);

  const { style, content, length } = req.body.prompt;
  console.log(req.body.prompt);
  let GPTresponse;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: `You'll take user's input and write a paragraph consisting of exactyle ${length} amount of sentences and in ${style} manner of what user described in the input. Paragraph should be more valuable in terms of literature.`,
        },
        { role: "user", content: content },
      ],
    });

    GPTresponse = completion.data.choices[0].message.content;
  } catch (error) {
    console.log(error.message);
  }

  res.status(StatusCodes.OK).json({ GPTresponse });
};

export {
  getMyStories,
  createStory,
  deleteStory,
  getMyChapters,
  editChapter,
  saveChapter,
  createChapter,
  getMyStory,
  updateStory,
  sendGptPrompt,
};
