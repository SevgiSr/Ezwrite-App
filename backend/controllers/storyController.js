import Story from "../db/models/Story.js";
import { StatusCodes } from "http-status-codes";

const getByCategory = async (req, res) => {
  const { category } = req.params;
  const stories = await Story.find({ category }).populate("author");

  res.status(StatusCodes.OK).json({ stories });
};

const getByQuery = async (req, res) => {
  const { query } = req.params;
  const stories = await Story.find({ title: { $regex: query, $options: "i" } });
  res.status(StatusCodes.OK).json({ stories });
};

const getStory = async (req, res) => {
  const { id } = req.params;
  const story = await Story.findById(id).populate("author chapters");
  res.status(StatusCodes.OK).json({ story });
};

const getChapter = async (req, res) => {
  const { story_id, chapter_id } = req.params;
  const story = await Story.findById(story_id).populate("chapters author");
  const author = story.author;
  const chapter = story.chapters.find(
    (chapter) => String(chapter._id) === chapter_id
  );
  console.log(chapter);
  res.status(StatusCodes.OK).json({ chapter, author });
};

export { getByCategory, getByQuery, getStory, getChapter };
