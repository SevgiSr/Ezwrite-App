import { StatusCodes } from "http-status-codes";
import Chapter from "../db/models/Chapter.js";
import Fork from "../db/models/Fork.js";
import Paragraph from "../db/models/Paragraph.js";
import { v4 as uuidv4 } from "uuid";
import he from "he";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import User from "../db/models/User.js";
import Story from "../db/models/Story.js";
import { deleteCommentAndSubcomments } from "./myStoryController.js";
import Vote from "../db/models/Vote.js";

const window = new JSDOM("").window;
const DOMPurifySanitizer = DOMPurify(window);

const getMyForks = async (req, res) => {
  try {
    console.log("BACKEND IS GETTIN FORKS");
    const myForks = await Fork.find({ collaborator: req.user.userId })
      .populate([
        { path: "chapters", populate: "paragraphs" },
        { path: "story" },
      ])
      .sort("-updatedAt");
    res.status(StatusCodes.OK).json({ myForks });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getPendingForkRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate({
      path: "pendingForkRequests",
      populate: "author",
    });
    res
      .status(StatusCodes.OK)
      .json({ pendingForkRequests: user.pendingForkRequests });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const deleteFork = async (req, res) => {
  try {
    const { fork_id } = req.params;

    const fork = await Fork.findOne({
      _id: fork_id,
      author: req.user.userId,
    });

    if (fork) {
      // Delete all chapters and their paragraphs
      if (fork?.chapters) {
        for (let chapterId of fork.chapters) {
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

      if (fork?.comments) {
        // Delete all comment documents
        for (let commentId of fork.comments) {
          await deleteCommentAndSubcomments(commentId);
        }
      }

      await User.updateOne(
        { _id: req.user.userId },
        { $pull: { forkedStories: fork._id, pullRequests: { fork: fork_id } } }
      );

      await Story.updateOne(
        { _id: fork.story },
        {
          $pull: {
            collaborators: req.user.userId,
            forks: fork_id,
            pullRequests: { fork: fork_id },
          },
        }
      );

      await fork.delete();
    }

    res.status(StatusCodes.OK).json({ response: "deleted!" });
  } catch (error) {
    throw new Error(error.message);
  }
};

const saveChapter = async (req, res) => {
  try {
    console.log("save chapteer");
    const { title, paragraphContents } = req.body;

    //backend sanitizes by default. unsanitize it
    const decodedParagraphContents = paragraphContents?.map((content) =>
      he.decode(content)
    );

    const chapterObj = await Chapter.findOne({
      _id: req.params.chapter_id,
      author: req.user.userId,
    });
    console.log(chapterObj);

    for (let paragraphId of chapterObj?.paragraphs) {
      await Paragraph.findByIdAndRemove(paragraphId);
    }

    //if text is sanitized innerHTML will turn them into their original shape but in string
    // &lt; => ">"  (innerHTML)
    //if text actually looks like a tag "<p></p>" innerHTML will trun it into an actual tag
    //that's why you should sanitize user input and not sanitize the styling tags
    const paragraphs = await decodedParagraphContents?.map((content) => {
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

const deleteChapter = async (req, res) => {
  try {
    const { fork_id, chapter_id } = req.params;

    const chapter = await Chapter.findOne({
      _id: chapter_id,
      author: req.user.userId,
    });

    if (chapter) {
      const fork = await Fork.findOneAndUpdate(
        { _id: fork_id },
        {
          $pull: { chapters: chapter._id },
        },
        { runValidators: true }
      );

      for (let paragraphId of chapter.paragraphs) {
        const paragraph = await Paragraph.findById(paragraphId);

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
  try {
    const { fork_id } = req.params;
    const fork = await Fork.findOne({
      _id: fork_id,
      collaborator: req.user.userId,
    });

    const chapter = await Chapter.create({
      content: "",
      author: req.user.userId,
    });

    fork.chapters.push(chapter._id);
    await fork.save();

    res.status(StatusCodes.OK).json({ fork_id, chapter_id: chapter._id });
  } catch (error) {
    throw new Error(error.message);
  }
};

const restoreChapterHistory = async (req, res) => {
  try {
    const { fork_id, chapter_id } = req.params;
    const { history_id } = req.body;

    const chapter = await Chapter.findOne({
      _id: chapter_id,
      author: req.user.userId,
    });

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

const sendPullRequest = async (req, res) => {
  try {
    const { fork_id } = req.params;
    const { title, description } = req.body;
    console.log(title, description);

    const fork = await Fork.findById(fork_id).populate("story");
    const story = await Story.findById(fork.story._id);
    const author = await User.findById(fork.story.author);

    const pullRequest = {
      title,
      description,
      fork: fork._id,
    };

    author.pullRequests.push(pullRequest);
    story.pullRequests.push(pullRequest);

    await author.save();
    await story.save();
    res.status(StatusCodes.OK).json({ msg: "request sent!" });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getPullRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate({
      path: "pullRequests.fork",
      populate: "story collaborator chapters",
    });

    res.status(StatusCodes.OK).json({ forks: user.pullRequests });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export {
  getMyForks,
  getPendingForkRequests,
  deleteFork,
  saveChapter,
  deleteChapter,
  createChapter,
  restoreChapterHistory,
  sendPullRequest,
  getPullRequests,
};
