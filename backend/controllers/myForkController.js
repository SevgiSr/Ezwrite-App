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

const deleteFork = async (req, res) => {
  console.log("delete fork");
  try {
    const fork = await Fork.findOne({
      _id: req.params.fork_id,
      collaborator: req.user.userId,
    });

    if (fork) {
      // Delete all chapters and their paragraphs
      if (fork?.chapters) {
        for (let chapterId of fork.chapters) {
          let chapter = await Chapter.findById(chapterId);

          if (chapter?.paragraphs) {
            //delete paragraphs and their comments
            for (let paragraphId of chapter.paragraphs) {
              await Paragraph.findByIdAndRemove(paragraphId);
            }
          }
          await Chapter.findByIdAndRemove(chapterId);
        }
      }

      await User.updateOne(
        { _id: req.user.userId },
        { $pull: { forkedStories: fork._id } }
      );

      await Story.updateOne(
        { _id: req.user.userId },
        { $pull: { forks: fork._id, collaborators: req.user.userId } }
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
      await Fork.updateOne(
        { _id: fork_id },
        {
          $pull: { chapters: chapter._id },
        },
        { runValidators: true }
      );

      for (let paragraphId of chapter.paragraphs) {
        await Paragraph.findByIdAndRemove(paragraphId);
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
    const fork = await Fork.findById(fork_id).populate("story");
    const user = await User.findById(fork.story.author);
    user.pullRequests.push(fork_id);
    await user.save();
    res.status(StatusCodes.OK).json({ msg: "request sent!" });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getPullRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const forks = await Fork.find({ _id: { $in: user.pullRequests } }).populate(
      "story collaborator chapters"
    );
    res.status(StatusCodes.OK).json({ forks });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export {
  getMyForks,
  deleteFork,
  saveChapter,
  deleteChapter,
  createChapter,
  restoreChapterHistory,
  sendPullRequest,
  getPullRequests,
};
