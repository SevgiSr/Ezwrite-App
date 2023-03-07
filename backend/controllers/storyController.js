import Story from "../db/models/Story.js";
import Comment from "../db/models/Comment.js";
import Chapter from "../db/models/Chapter.js";
import User from "../db/models/User.js";
import { StatusCodes } from "http-status-codes";
import Vote from "../db/models/Vote.js";
import Progress from "../db/models/Progress.js";

export async function countChapterVotes(chapter_id) {
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
  const users = await User.find({ name: { $regex: query, $options: "i" } });
  res.status(StatusCodes.OK).json({ stories, users });
};

const getByLength = async (req, res) => {
  const { length } = req.params;
  const stories = await Story.find({ chapters: { $size: length } }).populate(
    "author"
  );

  res.status(StatusCodes.OK).json({ stories });
};

const getByDate = async (req, res) => {
  let query = Story.find();

  // Set the time range for the query based on the input parameter
  switch (req.params.date) {
    case "today":
      query.where("updatedAt").gte(new Date().setHours(0, 0, 0, 0));
      break;
    case "this week":
      query
        .where("updatedAt")
        .gte(new Date(new Date().setDate(new Date().getDate() - 7)));
      break;
    case "this month":
      query
        .where("updatedAt")
        .gte(new Date(new Date().setMonth(new Date().getMonth() - 1)));
      break;
    case "this year":
      query
        .where("updatedAt")
        .gte(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
      break;
    default:
      return Promise.reject(new Error(`Invalid time range: ${timeRange}`));
  }

  const stories = await query.exec();
  res.status(StatusCodes.OK).json({ stories });
};

const getStory = async (req, res) => {
  const { id } = req.params;
  const story = await Story.findById(id).populate("author chapters");
  story.chapters.map((c) => {
    const votes = countChapterVotes(c._id);
    c.votes = votes;
  });

  res.status(StatusCodes.OK).json({ story });
};

const getProgress = async (req, res) => {
  const progress = await Progress.findOne({
    user: req.user.userId,
    story: req.params.story_id,
  });

  res.status(StatusCodes.OK).json({ chapter_id: progress.chapter });
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
  let vote = await Vote.findOne({
    user: req.user.userId,
    chapter: req.params.chapter_id,
  });

  //if vote exists, no need to create new one, just change the value
  if (vote) {
    vote.value = Number(req.body.vote_value); // update the vote value
    await vote.save(); // save the updated vote document
  } else {
    vote = await Vote.create({
      user: req.user.userId,
      chapter: req.params.chapter_id,
      value: Number(req.body.vote_value),
    }); // create a new vote document if one does not exist
    //save the vote to CHapter ONLY if you created a new one
    await Chapter.findOneAndUpdate(
      { _id: req.params.chapter_id },
      { $push: { votes: vote._id } },
      { upsert: true, new: true, runValidators: true }
    );
  }

  res.status(StatusCodes.OK).json({ value: Number(req.body.vote_value) });
};

const unvoteChapter = async (req, res) => {
  //find your vote no matter what value it has
  const vote = await Vote.findOne({
    user: req.user.userId,
    chapter: req.params.chapter_id,
  });

  let newChapter;
  //take the vote back from chapter and delete vote object
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

const incrementViewCount = async (req, res) => {
  console.log("incremeting view");
  await Chapter.findOneAndUpdate(
    { _id: req.params.chapter_id },
    { $inc: { views: 1 } }
  );
  console.log("success");
  res.status(StatusCodes.OK);
};

export {
  getByCategory,
  getByQuery,
  getStory,
  getByDate,
  getByLength,
  getChapter,
  addChapterConv,
  voteChapter,
  unvoteChapter,
  incrementViewCount,
};
