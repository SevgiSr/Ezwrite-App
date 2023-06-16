import { StatusCodes } from "http-status-codes";
import Story from "../db/models/Story.js";
import User from "../db/models/User.js";
import Chapter from "../db/models/Chapter.js";
import Progress from "../db/models/Progress.js";
import Comment from "../db/models/Comment.js";
import Notification from "../db/models/Notification.js";
import PrivateConv from "../db/models/PrivateConv.js";
import ReadingList from "../db/models/ReadingList.js";
import Message from "../db/models/Message.js";
import Paragraph from "../db/models/Paragraph.js";
import Vote from "../db/models/Vote.js";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

import { BadRequestError } from "../errors/index.js";
import fs from "fs";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import he from "he";

const window = new JSDOM("").window;
const DOMPurifySanitizer = DOMPurify(window);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import checkPermissions from "../utils/checkPermissions.js";

async function deleteCommentAndSubcomments(commentId) {
  const comment = await Comment.findById(commentId);

  for (let subcommentId of comment.subcomments) {
    await Comment.findByIdAndRemove(subcommentId);
  }

  await Comment.findByIdAndRemove(commentId);
}

//if you use req.user.userId - secure
//if you don't, add checkPermissions()

//before adding checkPermissions users could easily change each others stories by just knowing it's id

const getMyStories = async (req, res) => {
  /*
    await Story.deleteMany();
    await ReadingList.deleteMany();
    await Progress.deleteMany();
    await Chapter.deleteMany();
    await Comment.deleteMany();
    await Message.deleteMany();
    await Notification.deleteMany();
    await Paragraph.deleteMany();
    await PrivateConv.deleteMany();
    await Vote.deleteMany();
 */
  const myStories = await Story.find({ author: req.user.userId })
    .populate({
      path: "author",
    })
    .populate({ path: "chapters", populate: "paragraphs" })
    .sort("-updatedAt");

  res.status(StatusCodes.OK).json({ myStories });
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

  await User.updateOne(
    { _id: req.user.userId },
    { $push: { stories: story._id } },
    { runValidators: true }
  );

  res.status(StatusCodes.CREATED).json({ story });
};

const deleteStory = async (req, res) => {
  const story = await Story.findOne({
    _id: req.params.story_id,
    author: req.user.userId,
  });

  if (story) {
    // Delete all chapters and their paragraphs
    for (let chapterId of story.chapters) {
      let chapter = await Chapter.findById(chapterId);

      //delete paragraphs and their comments
      for (let paragraphId of chapter.paragraphs) {
        const paragraph = await Paragraph.findById(paragraphId);

        for (let commentId of paragraph.comments) {
          await deleteCommentAndSubcomments(commentId);
        }
        await Paragraph.findByIdAndRemove(paragraphId);
      }

      //delete chapter cotes
      for (let voteId of chapter.votes) {
        await Vote.findByIdAndRemove(voteId);
      }

      //delete chapter comments
      for (let commentId of chapter.comments) {
        await deleteCommentAndSubcomments(commentId);
      }

      await Chapter.findByIdAndRemove(chapterId);
    }

    // Delete all progress documents
    for (let progressId of story.progress) {
      await Progress.findByIdAndRemove(progressId);
    }

    // Delete all comment documents
    for (let commentId of story.comments) {
      await deleteCommentAndSubcomments(commentId);
    }

    await User.updateOne(
      { _id: req.user.userId },
      { $pull: { stories: story._id } }
    );

    await ReadingList.updateMany({}, { $pull: { stories: story._id } });

    await story.delete();
  }

  res.status(StatusCodes.OK).json({ response: "deleted!" });
};

const updateStory = async (req, res) => {
  const { title, category } = req.body;

  if (!title || !category) {
    throw new BadRequestError("please provide all values");
  }

  const story = await Story.findOneAndUpdate(
    { _id: req.params.story_id },
    { ...req.body },
    { new: true, runValidators: true }
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
  const { title, paragraphContents } = req.body;

  //backend sanitizes by default. unsanitize it
  const decodedParagraphContents = paragraphContents.map((content) =>
    he.decode(content)
  );

  const chapterObj = await Chapter.findById(req.params.chapter_id);
  for (let paragraphId of chapterObj.paragraphs) {
    const paragraph = await Paragraph.findById(paragraphId);

    for (let commentId of paragraph.comments) {
      await deleteCommentAndSubcomments(commentId);
    }

    await Paragraph.findByIdAndRemove(paragraphId);
  }
  //if text is sanitized innerHTML will turn them into their original shape but in string
  // &lt; => ">"  (innerHTML)
  //if text actually looks like a tag "<p></p>" innerHTML will trun it into an actual tag
  //that's why you should sanitize user input and not sanitize the styling tags
  const paragraphs = await decodedParagraphContents.map((content) => {
    let cleanContent = DOMPurifySanitizer.sanitize(content, {
      ALLOWED_TAGS: ["h2", "b", "u", "i", "br", "p"],
    });
    return new Paragraph({ content: cleanContent });
  });

  await paragraphs.forEach((p) => p.save());

  //sanitized tags will be represented as text
  //string versions of tags will be turned into actual tags when set to innerHTMl
  const content = decodedParagraphContents
    .map((content) => {
      let cleanContent = DOMPurifySanitizer.sanitize(content, {
        ALLOWED_TAGS: ["h2", "b", "u", "i", "br", "p"],
      });
      console.log(cleanContent);
      return cleanContent;
    })
    .join("");

  chapterObj.title = title;
  chapterObj.content = content;
  chapterObj.paragraphs = paragraphs;
  await chapterObj.save();

  res.status(StatusCodes.OK).json({ updatedChapter: chapterObj });
};

const deleteChapter = async (req, res) => {
  const { story_id, chapter_id } = req.params;
  console.log("deletiing");
  console.log(story_id, chapter_id);
  const chapter = await Chapter.findById(chapter_id);
  console.log(chapter);

  if (chapter) {
    for (let paragraphId of chapter.paragraphs) {
      console.log(paragraphId);
      const paragraph = await Paragraph.findById(paragraphId);
      console.log(paragraph);

      for (let commentId of paragraph?.comments) {
        await deleteCommentAndSubcomments(commentId);
      }
      await Paragraph.findByIdAndRemove(paragraphId);
    }

    //delete chapter cotes
    for (let voteId of chapter.votes) {
      await Vote.findByIdAndRemove(voteId);
    }

    //delete chapter comments
    for (let commentId of chapter.comments) {
      await deleteCommentAndSubcomments(commentId);
    }
    await Story.updateOne(
      { _id: story_id },
      { $pull: { chapters: chapter._id } }
    );

    await chapter.delete();
  }

  res.status(StatusCodes.OK).json({ msg: "chapter deleted!" });
};

const createChapter = async (req, res) => {
  const story = await Story.findById(req.params.story_id);
  checkPermissions(req.user.userId, story.author._id);

  const chapter = await Chapter.create({
    content: "",
    author: req.user.userId,
    story: story._id,
  });

  /* 
if you don't need the updated document, 
then "updateOne" will be a more efficient choice 
as it will consume fewer resources than the "findOneAndUpdate" 
*/
  await Story.updateOne(
    { _id: req.params.story_id },
    { $push: { chapters: chapter._id } },
    { runValidators: true }
  );

  res.status(StatusCodes.OK).json({ newStory: story, chapter });
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
  deleteChapter,
};

/* 
DONE WITH ADJUSTING CODE FOR CORRECT DELETION

*/
