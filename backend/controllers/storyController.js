import Story from "../db/models/Story.js";
import Comment from "../db/models/Comment.js";
import Chapter from "../db/models/Chapter.js";
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
  const story = await Story.findById(story_id).populate({
    path: "chapters author",
    populate: { path: "comments", populate: "subcomments" },
  });
  const author = story.author;
  const chapter = story.chapters.find(
    (chapter) => String(chapter._id) === chapter_id
  );
  res.status(StatusCodes.OK).json({ chapter, author });
};

const addChapterConv = async (req, res) => {
  console.log(req.user.userId);
  const { comment_content } = req.body;
  const comment = await Comment.create({
    author: req.user.userId,
    content: comment_content,
    subcomments: [],
  });

  await Chapter.findOneAndUpdate(
    { _id: req.params.chapter_id },
    { $push: { comments: comment._id } },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(StatusCodes.OK);
};

export { getByCategory, getByQuery, getStory, getChapter, addChapterConv };
