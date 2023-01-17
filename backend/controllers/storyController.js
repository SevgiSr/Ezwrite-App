import { StatusCodes } from "http-status-codes";
import Story from "../db/models/Story.js";
import { BadRequestError } from "../errors/index.js";

const getMyStories = async (req, res) => {
  // jwt-auth middleware coming before sending any myStory request
  // sets userId inside req.user object if the token is verified
  console.log(req.user.userId);
  //author field in story model only had ur user's id
  // now author is an object of id and name
  const myStories = await Story.find({ author: req.user.userId }).populate({
    path: "author",
    select: "name",
  });
  console.log(myStories);
  res.status(StatusCodes.OK).json({ myStories });
};

const createStory = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    throw new BadRequestError("please provide all values");
  }

  req.body.author = req.user.userId;
  req.body.chapters = [];

  const story = await Story.create(req.body);

  res.status(StatusCodes.CREATED).json({ story });
};

const createChapter = async (req, res) => {};

const updateStory = async (req, res) => {
  const { chapterTitle, chapterContent } = req.body;
};

export { getMyStories, createStory };
