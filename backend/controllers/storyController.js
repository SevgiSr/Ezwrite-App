import Story from "../db/models/Story.js";
import Comment from "../db/models/Comment.js";
import Chapter from "../db/models/Chapter.js";
import { StatusCodes } from "http-status-codes";
import Vote from "../db/models/Vote.js";

async function countChapterVotes(chapter_id) {
  const result = await Vote.aggregate([
    { $match: { chapter: chapter_id } }, // match votes for the specified chapter
    { $group: { _id: "$value", count: { $sum: 1 } } }, // group by value and count votes
    { $project: { _id: 0, value: "$_id", count: 1 } }, // project value and count fields
  ]);

  const votes = { upvotes: 0, downvotes: 0 };
  result.forEach(({ value, count }) => {
    if (value === 1) {
      votes.upvotes = count;
    } else {
      votes.downvotes = count;
    }
  });

  return votes;
}

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
  console.log("getting chapter");
  const { story_id, chapter_id } = req.params;
  const story = await Story.findById(story_id).populate("author");
  const chapter = await Chapter.findById(chapter_id)
    .populate({
      path: "comments",
      populate: { path: "subcomments", populate: "author" },
    })
    .populate({ path: "comments", populate: { path: "author" } });

  const author = story.author;
  const chapterConvs = chapter.comments;

  const votes = await countChapterVotes(chapter._id);
  console.log(votes);
  const vote = await Vote.findOne({
    user: req.user.userId,
    chapter: chapter._id,
  });

  let myVote;
  if (!vote) {
    myVote = 0;
  } else {
    myVote = vote.value;
  }

  res
    .status(StatusCodes.OK)
    .json({ chapter, story, votes, myVote, author, chapterConvs });
};

const addChapterConv = async (req, res) => {
  console.log(req.user.userId);
  const { comment_content } = req.body;
  const comment = await Comment.create({
    author: req.user.userId,
    content: comment_content,
    subcomments: [],
  });

  const newConv = await Comment.findById(comment._id)
    .populate("author")
    .populate({ path: "subcomments", populate: "author" });

  await Chapter.findOneAndUpdate(
    { _id: req.params.chapter_id },
    { $push: { comments: comment._id } },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ newConv });
};

const voteChapter = async (req, res) => {
  console.log("voting");
  let vote = await Vote.findOne({
    user: req.user.userId,
    chapter: req.params.chapter_id,
  });

  if (vote) {
    vote.value = Number(req.body.vote_value); // update the vote value
    await vote.save(); // save the updated vote document
  } else {
    vote = await Vote.create({
      user: req.user.userId,
      chapter: req.params.chapter_id,
      value: Number(req.body.vote_value),
    }); // create a new vote document if one does not exist
    //save the vote ONLY if you created a new one
    await Chapter.findOneAndUpdate(
      { _id: req.params.chapter_id },
      { $push: { votes: vote._id } },
      { upsert: true, new: true, runValidators: true }
    );
  }

  res.status(StatusCodes.OK).json({ value: Number(req.body.vote_value) });
};

const unvoteChapter = async (req, res) => {
  const vote = await Vote.findOne({
    user: req.user.userId,
    chapter: req.params.chapter_id,
  });
  let newChapter;
  console.log(vote);
  if (vote) {
    newChapter = await Chapter.findOneAndUpdate(
      { _id: req.params.chapter_id },
      { $pull: { votes: vote._id } },
      { upsert: true, new: true, runValidators: true }
    );
    await vote.remove();
  }

  res.status(StatusCodes.OK).json({ newChapter });
};

export {
  getByCategory,
  getByQuery,
  getStory,
  getChapter,
  addChapterConv,
  voteChapter,
  unvoteChapter,
};
