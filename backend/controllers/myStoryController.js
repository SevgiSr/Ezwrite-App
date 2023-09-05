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
import Tag from "../db/models/Tag.js";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import mongoose from "mongoose";

import { client, trie } from "../server.js";

import { BadRequestError } from "../errors/index.js";
import fs from "fs";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import he from "he";
import { v4 as uuidv4 } from "uuid";

const window = new JSDOM("").window;
const DOMPurifySanitizer = DOMPurify(window);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import checkPermissions from "../utils/checkPermissions.js";
import Trie from "../utils/Trie.js";
import Fork from "../db/models/Fork.js";

const getTags = async (req, res) => {
  try {
    console.log("getting tags");
    const { prefix } = req.query;
    console.log("prefix: ", prefix);
    const suggestions = trie.searchPrefix(prefix);
    console.log("suggestions: ", suggestions);

    await client.set("test", "value", function (err, reply) {
      console.log(err); // Check if there's an error
      console.log(reply); // If connected properly, it should log 'OK'
    });
    console.log(client);
    const getTagCount = async (tag) => {
      try {
        console.log("getting count for tag: ", tag);
        const count = await client.hGet("tags", tag);
        console.log("got count: ", count);
        return { tag, count: Number(count) };
      } catch (err) {
        console.log("error getting count: ", err);
        throw err;
      }
    };

    const tagCounts = await Promise.all(suggestions.map(getTagCount));
    console.log("tagCounts before sorting: ", tagCounts);
    tagCounts.sort((a, b) => b.count - a.count);
    console.log("tagCounts after sorting: ", tagCounts);
    res.json({ tagCounts });
  } catch (error) {
    console.log("error in getTags: ", error);
    res.status(500).json({ error: error.toString() });
  }
};

export async function deleteCommentAndSubcomments(commentId) {
  const comment = await Comment.findById(commentId);

  if (comment) {
    if (comment?.subcomments) {
      for (let subcommentId of comment.subcomments) {
        await Comment.findByIdAndRemove(subcommentId);
      }
    }

    await comment.delete();
  }
}

const recalculateChapterCounts = async (story) => {
  try {
    // Get the story and populate its chapters
    await story.populate("chapters");

    console.log("storyyyy1");

    // Initialize counters
    let draftCount = 0;
    let publishedCount = 0;

    // Iterate over chapters and count based on visibility
    story.chapters.forEach((chapter) => {
      if (chapter.visibility === "draft") {
        draftCount += 1;
      } else if (chapter.visibility === "published") {
        publishedCount += 1;
      }
    });

    console.log("storyyy2");

    if (publishedCount > 0) {
      story.visibility = "published";
    } else if (publishedCount === 0) {
      story.visibility = "draft";
    }

    // Update story document with new counts
    story.chapterCount.draft = draftCount;
    story.chapterCount.published = publishedCount;

    console.log("storyyyy3");

    console.log(story);

    await story.save();

    console.log("storyyy4");

    console.log("Chapter counts recalculated successfully.");
  } catch (err) {
    throw new Error(err.message);
  }
};

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
  try {
    const myStories = await Story.find({ author: req.user.userId }, null, {
      excludeVisibilityCheck: true,
    })
      .populate([
        {
          path: "author",
        },
        { path: "chapters", populate: "paragraphs" },
        { path: "tags" },
      ])
      .sort("-updatedAt");

    res.status(StatusCodes.OK).json({ myStories });
  } catch (error) {
    throw new Error(error.message);
  }
};

const createStory = async (req, res) => {
  try {
    console.log("creating story");
    const { title, tags } = req.body;

    console.log(req.body);

    console.log(tags);

    if (!title) {
      throw new BadRequestError("please provide all values");
    }

    req.body.author = req.user.userId;

    let tagDocs = await Promise.all(
      tags.map(async (tag) => {
        let foundTag = await Tag.findOne({ name: tag });
        if (foundTag) {
          foundTag.count++;
          await foundTag.save();
          return foundTag;
        } else {
          return await Tag.create({ name: tag, count: 1 });
        }
      })
    );
    req.body.tags = tagDocs;

    const story = new Story(req.body);
    console.log(story);

    const chapter = await Chapter.create({
      content: "",
      author: req.user.userId,
    });

    story.chapters.push(chapter._id);
    await story.save();

    await User.updateOne(
      { _id: req.user.userId },
      { $push: { stories: story._id } },
      { runValidators: true }
    );

    console.log("story tagssssssssssssssssss");
    console.log(story.tags);

    res.status(StatusCodes.CREATED).json({ story });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteStory = async (req, res) => {
  console.log("delete story");
  try {
    const story = await Story.findOne(
      {
        _id: req.params.story_id,
        author: req.user.userId,
      },
      null,
      { excludeVisibilityCheck: true }
    );

    if (story) {
      // Delete all chapters and their paragraphs
      if (story?.chapters) {
        for (let chapterId of story.chapters) {
          let chapter = await Chapter.findById(chapterId);

          if (chapter?.paragraphs) {
            //delete paragraphs and their comments
            for (let paragraphId of chapter.paragraphs) {
              const paragraph = await Paragraph.findById(paragraphId);

              if (paragraph?.comments) {
                for (let commentId of paragraph.comments) {
                  await deleteCommentAndSubcomments(commentId);
                }
              }
              await Paragraph.findByIdAndRemove(paragraphId);
            }
          }

          if (chapter?.votes) {
            //delete chapter cotes
            for (let voteId of chapter.votes) {
              await Vote.findByIdAndRemove(voteId);
            }
          }

          if (chapter?.comments) {
            //delete chapter comments
            for (let commentId of chapter.comments) {
              await deleteCommentAndSubcomments(commentId);
            }
          }

          await Chapter.findByIdAndRemove(chapterId);
        }
      }

      if (story?.progress) {
        // Delete all progress documents
        for (let progressId of story.progress) {
          await Progress.findByIdAndRemove(progressId);
        }
      }

      if (story?.comments) {
        // Delete all comment documents
        for (let commentId of story.comments) {
          await deleteCommentAndSubcomments(commentId);
        }
      }

      if (story?.tags) {
        // Delete all progress documents
        for (let tagId of story.tags) {
          const tag = await Tag.findById(tagId);
          tag.count--;
          if (tag.count === 0) {
            await tag.remove();
          } else {
            await tag.save();
          }
        }
      }

      await User.updateOne(
        { _id: req.user.userId },
        { $pull: { stories: story._id } }
      );

      await ReadingList.updateMany({}, { $pull: { stories: story._id } });

      await story.delete();
    }

    res.status(StatusCodes.OK).json({ response: "deleted!" });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStory = async (req, res) => {
  try {
    const { title, tags } = req.body;

    if (!title) {
      throw new BadRequestError("please provide all values");
    }

    const story = await Story.findOne(
      {
        _id: req.params.story_id,
        author: req.user.userId,
      },
      null,
      { excludeVisibilityCheck: true }
    );

    if (!story) {
      throw new BadRequestError("Story not found");
    }

    const currentTagNames = story.tags.map((tag) => tag.name);

    //tags are in mongoose object form
    const tagsToRemove = story.tags.filter((tag) => !tags.includes(tag.name));
    //tags are just in name form
    const tagsToAdd = tags.filter((tag) => !currentTagNames.includes(tag));

    // Decrease the count of tags and remove from the story. (if count is 0 delete tag object)
    const removedTagsPromise = Promise.all(
      tagsToRemove.map(async (tag) => {
        const foundTag = await Tag.findOne({ name: tag.name });
        if (foundTag) {
          foundTag.count--;
          if (foundTag.count === 0) {
            await foundTag.remove();
          } else {
            await foundTag.save();
          }
        }
      })
    );

    // Create or increment the count of the new tags and add to the story
    const addedTagsPromise = Promise.all(
      tagsToAdd.map(async (tag) => {
        // if tag doesn't exist, new one with count 1 will be created because of upsert:true
        let foundTag = await Tag.findOneAndUpdate(
          { name: tag },
          { $inc: { count: 1 } },
          { new: true, upsert: true }
        );
        story.tags.push(foundTag);
      })
    );

    // Wait for all the promises to resolve. istead of putting await in front of each of them make them run parallel (faster)
    await Promise.all([removedTagsPromise, addedTagsPromise]);

    Object.assign(story, req.body);
    story.tags = story.tags.filter((tag) => !tagsToRemove.includes(tag));
    await story.save();

    console.log(story.tags.map((tag) => tag.name));

    res.status(StatusCodes.CREATED).json({ story });
  } catch (error) {
    throw new Error(error.message);
  }
};

const saveChapter = async (req, res) => {
  try {
    const { title, paragraphContents } = req.body;

    //backend sanitizes by default. unsanitize it
    const decodedParagraphContents = paragraphContents?.map((content) =>
      he.decode(content)
    );

    const chapterObj = await Chapter.findOne({
      _id: req.params.chapter_id,
      author: req.user.userId,
    });

    for (let paragraphId of chapterObj.paragraphs) {
      const paragraph = await Paragraph.findById(paragraphId);
      if (paragraph) {
        for (let commentId of paragraph.comments) {
          await deleteCommentAndSubcomments(commentId);
        }
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

    const history = {};
    history._id = uuidv4();
    history.title = title;
    history.content = content;
    history.paragraphs = paragraphs;
    history.createdAt = new Date();

    chapterObj.history.push(history);
    await chapterObj.save();

    res.status(StatusCodes.OK).json({ updatedChapter: chapterObj });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const restoreChapterHistory = async (req, res) => {
  try {
    const { story_id, chapter_id } = req.params;
    const { history_id } = req.body;

    const chapter = await Chapter.findOne({
      _id: chapter_id,
      author: req.user.userId,
    });

    console.log(history_id);

    const history = chapter.history.find((h) => h._id === history_id);

    console.log(history);

    chapter.title = history.title;
    chapter.content = history.content;
    chapter.paragraphs = history.paragraphs;

    await chapter.save();

    res.status(StatusCodes.OK).json({ updatedChapter: chapter });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const deleteChapter = async (req, res) => {
  try {
    const { story_id, chapter_id } = req.params;
    console.log("amkkkkkkkkkkkkkk");
    console.log("deletiing");
    console.log(story_id, chapter_id);
    const chapter = await Chapter.findOne({
      _id: chapter_id,
      author: req.user.userId,
    });

    if (chapter) {
      const story = await Story.findOneAndUpdate(
        { _id: story_id },
        {
          $pull: { chapters: chapter._id },
        },
        { runValidators: true }
      );

      await recalculateChapterCounts(story);

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

      await chapter.delete();
    }

    res.status(StatusCodes.OK).json({ msg: "chapter deleted!" });
  } catch (error) {
    throw new Error(error.message);
  }
};

const createChapter = async (req, res) => {
  console.log("creating");
  try {
    const story = await Story.findOne(
      { _id: String(req.params.story_id), author: req.user.userId },
      null,
      {
        excludeVisibilityCheck: true,
      }
    );

    const chapter = await Chapter.create({
      content: "",
      author: req.user.userId,
    });

    story.chapters.push(chapter._id);
    await story.save();

    await recalculateChapterCounts(story);

    res
      .status(StatusCodes.OK)
      .json({ story_id: String(story._id), chapter_id: String(chapter._id) });
  } catch (error) {
    throw new Error(error.message);
  }
};

const publishChapter = async (req, res) => {
  try {
    const { chapter_id, story_id } = req.params;
    const story = await Story.findById(story_id, null, {
      excludeVisibilityCheck: true,
    });

    await Chapter.updateOne(
      { _id: chapter_id, author: req.user.userId },
      { $set: { visibility: "published" } },
      { runValidators: true }
    );

    await recalculateChapterCounts(story);

    res.status(StatusCodes.OK).json({ msg: "chapter published!" });
  } catch (error) {
    throw new Error(error.message);
  }
};

const unpublishChapter = async (req, res) => {
  try {
    const { chapter_id, story_id } = req.params;
    const story = await Story.findById(story_id, null, {
      excludeVisibilityCheck: true,
    });

    await Chapter.updateOne(
      { _id: chapter_id, author: req.user.userId },
      { $set: { visibility: "draft" } },
      { runValidators: true }
    );

    await recalculateChapterCounts(story);

    res.status(StatusCodes.OK).json({ msg: "chapter unpublished!" });
  } catch (error) {
    throw new Error(error.message);
  }
};

const grantCollaboratorAccess = async (req, res) => {
  try {
    console.log("GRANTINGGGGGGG");
    const { story_id, user_id } = req.params;
    const user = await User.findById(user_id);
    const mainUser = await User.findById(req.user.userId);

    if (user_id === req.user.userId) {
      throw new Error("You cannot grant yourself collaborator access.");
    }

    if (user.forkedStories.find((f) => f.story == story_id)) {
      throw new Error("This user is already a collaborator.");
    }

    const story = await Story.findById(story_id).populate({
      path: "chapters",
      populate: "paragraphs",
    });

    const newChapters = await Promise.all(
      story.chapters.map(async (chapter) => {
        // Deep clone the chapter object
        const chapterData = JSON.parse(JSON.stringify(chapter.toObject()));

        // Reset the comments for each paragraph
        chapterData.paragraphs.forEach((p) => {
          p.comments = [];
        });

        // Remove the original MongoDB _id so a new one is generated
        delete chapterData._id;

        // Create new chapter instance with the modified data
        const newChapter = new Chapter({
          author: user_id,
          content: chapterData.content,
          title: chapterData.title,
          paragraphs: chapterData.paragraphs,
        });
        return newChapter.save();
      })
    );

    const newChapterIds = newChapters.map((chapter) => chapter._id);

    story.collaborators.push(user_id);
    await story.save();

    const newFork = await Fork.create({
      story: story_id,
      collaborator: user_id,
      chapters: newChapterIds,
    });

    const fork = await Fork.findById(newFork._id).populate(
      "story collaborator"
    );

    user.forkedStories.push(fork._id);
    user.pendingForkRequests = user.pendingForkRequests.filter(
      (r) => r._id != story_id
    );
    mainUser.collabRequests = mainUser.collabRequests.filter(
      (c) => !(c.story._id == story_id && c.user._id == user_id)
    );

    await user.save();
    await mainUser.save();

    res.status(StatusCodes.OK).json({ fork: fork });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const revokeCollaboratorAccess = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getPendingForkRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res
      .status(StatusCodes.OK)
      .json({ pendingForkRequests: user.pendingForkRequests });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getCollabRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    console.log(user.collabRequests);
    user.pullRequests = [];
    await user.save();
    res.status(StatusCodes.OK).json({ collabRequests: user.collabRequests });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const mergeFork = async (req, res) => {
  try {
    const { fork_id } = req.params;
    const fork = await Fork.findById(fork_id).populate("chapters");
    const story = await Story.findById(fork.story);
    const user = await User.findById(req.user.userId);

    story.forkHistory.push(story.chapters);

    // create new chaptrs, dont assign fork chapters to story chapters directly
    // or from now on the collaborator will be able to change chapters without pull request
    const newChapters = await Promise.all(
      fork.chapters.map(async (chapter) => {
        const chapterData = chapter.toObject();
        delete chapterData._id;
        const newChapter = new Chapter(chapterData);
        newChapter.author = req.user.userId;
        return newChapter.save();
      })
    );

    const newChapterIds = newChapters.map((chapter) => chapter._id);

    story.chapters = newChapterIds;

    user.pullRequests = user.pullRequests.filter((p) => p !== fork_id);

    await story.save();
    await user.save();

    console.log(user.pullRequests);

    res.status(StatusCodes.OK).json({ story });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export {
  getMyStories,
  createStory,
  deleteStory,
  saveChapter,
  restoreChapterHistory,
  createChapter,
  updateStory,
  deleteChapter,
  publishChapter,
  unpublishChapter,
  getTags,
  grantCollaboratorAccess,
  revokeCollaboratorAccess,
  getPendingForkRequests,
  getCollabRequests,
  mergeFork,
};

/* 
DONE WITH ADJUSTING CODE FOR CORRECT DELETION

*/
