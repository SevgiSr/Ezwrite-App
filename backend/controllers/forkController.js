import Vote from "../db/models/Vote.js";
import Fork from "../db/models/Fork.js";
import Comment from "../db/models/Comment.js";
import Paragraph from "../db/models/Paragraph.js";
import Chapter from "../db/models/Chapter.js";
import {
  handleAddChapterConv,
  handleAddConvComment,
  handleAddParagraphConv,
  handleDeleteChapterConv,
  handleDeleteConvComment,
  handleDeleteParagraphConv,
} from "./commentControllers.js";
import { StatusCodes } from "http-status-codes";

function populateStory() {
  const populateOptions = {
    path: "story",
    populate: "author collaborators",
  };
  return populateOptions;
}

function populateChapters() {
  const populateOptions = {
    path: "chapters",
    populate: [
      {
        path: "comments",
        populate: [
          { path: "author", model: "User" },
          {
            path: "subcomments",
            populate: { path: "author", model: "User" },
          },
        ],
      },
      {
        path: "paragraphs",
        populate: {
          path: "comments",
          populate: [
            { path: "author", model: "User" },
            {
              path: "subcomments",
              populate: { path: "author", model: "User" },
            },
          ],
        },
      },
    ],
  };

  return populateOptions;
}

const addMyVote = async (fork, userId) => {
  try {
    const iterateFork = JSON.parse(JSON.stringify(fork));

    await Promise.all(
      iterateFork.chapters?.map(async (chapter) => {
        const vote = await Vote.findOne({
          user: userId,
          chapter: chapter._id,
        });

        let myVote;
        if (!vote) {
          myVote = 0;
        } else {
          myVote = vote.value;
        }

        chapter.myVote = myVote;

        return chapter;
      })
    );

    return iterateFork;
  } catch (error) {
    console.log(error);
  }
};

const getFork = async (req, res) => {
  try {
    const { fork_id } = req.params;

    let fork = await Fork.findById(fork_id).populate("story");
    console.log(req.user.userId, fork.story.author.toString());

    // if I am not author or collaborator I cannot view fork
    if (
      fork.story.author.toString() !== req.user.userId &&
      !fork.story.collaborators?.includes(req.user.userId)
    ) {
      throw new Error("You do not have permission to view this story.");
    }

    fork = await Fork.findById(fork_id).populate([
      populateStory(),
      populateChapters(),
    ]);

    const editedFork = await addMyVote(fork, req.user.userId);

    return res.status(StatusCodes.OK).json({ fork: editedFork });
  } catch (error) {
    throw new Error(error.message);
  }
};

const addChapterConv = async (req, res) => {
  await handleAddChapterConv(req, res);
};

const deleteChapterConv = async (req, res) => {
  await handleDeleteChapterConv(req, res);
};

const addParagraphConv = async (req, res) => {
  await handleAddParagraphConv(req, res);
};

const deleteParagraphConv = async (req, res) => {
  await handleDeleteParagraphConv(req, res);
};

const addConvComment = async (req, res) => {
  await handleAddConvComment(req, res);
};

//FOR ALL OF CONVERSATIONS' SUBCOMMENTS
const deleteConvComment = async (req, res) => {
  await handleDeleteConvComment(req, res);
};

export {
  getFork,
  addChapterConv,
  deleteChapterConv,
  addParagraphConv,
  deleteParagraphConv,
  addConvComment,
  deleteConvComment,
};
