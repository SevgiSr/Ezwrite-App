import Story from "../db/models/Story.js";
import Comment from "../db/models/Comment.js";
import Chapter from "../db/models/Chapter.js";
import User from "../db/models/User.js";
import { StatusCodes } from "http-status-codes";
import Vote from "../db/models/Vote.js";
import Progress from "../db/models/Progress.js";
import Paragraph from "../db/models/Paragraph.js";
import ReadingList from "../db/models/ReadingList.js";

const populateStory = {
  path: "story",
  populate: [
    { path: "author" },
    { path: "chapters", select: "title votesCount views" },
  ],
};

const populateChapters = {
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

export async function getStoryVotes(story) {
  const totalVotes = story.chapters?.reduce(
    (total, chapter) => {
      total.upvotes += chapter.votesCount.upvotes;
      total.downvotes += chapter.votesCount.downvotes;
      return total;
    },
    { upvotes: 0, downvotes: 0 }
  );

  return totalVotes;
}

export async function getStoryViews(story) {
  const totalViews = story.chapters?.reduce((total, chapter) => {
    total += chapter.views;
    return total;
  }, 0);

  return totalViews;
}

const addMyVote = async (progress, userId) => {
  try {
    const iterateProgress = JSON.parse(JSON.stringify(progress));

    await Promise.all(
      iterateProgress.chapters?.map(async (chapter) => {
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

    return iterateProgress;
  } catch (error) {
    console.log(error);
  }
};

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

const getAll = async (req, res) => {
  const stories = await Story.find();
  res.status(StatusCodes.OK).json({ stories });
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

// when user waits more thn 5 seconds in a chapter update progress to have array of chapter_id's 5 chapter forward in that story
// then you can populate those chapters field
// getProgress would be cached meaning 5 chapters would be cached
// otherwise you would have to find the story populate some of the chapters, send those chapters back cache them and do that 3564758 times

const getStory = async (req, res) => {
  const { id } = req.params;
  const story = await Story.findById(id)
    .populate("author chapters")
    .populate({
      path: "progress",
      match: { user: req.user.userId },
      populate: { path: "chapter" },
    });

  const storyVotes = await getStoryVotes(story);
  story.storyVotes = storyVotes;
  const storyViews = await getStoryViews(story);
  story.storyViews = storyViews;

  res.status(StatusCodes.OK).json({ story });
};

const getProgress = async (req, res) => {
  console.log("getting progress");
  let progress;
  let editedProgress;

  progress = await Progress.findOne({
    user: req.user.userId,
    story: req.params.story_id,
  })
    .populate(populateStory)
    .populate(populateChapters);

  if (!progress) {
    console.log("no progress");
    const story = await Story.findById(req.params.story_id);
    const chapters = story.chapters.slice(0, 5);
    const newProgress = await Progress.create({
      user: req.user.userId,
      story: req.params.story_id,
      chapters: chapters,
    });

    progress = await Progress.findById(newProgress._id)
      .populate(populateStory)
      .populate(populateChapters);

    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { storiesProgress: progress._id } },
      { upsert: true }
    );

    await Story.findByIdAndUpdate(
      req.params.story_id,
      { $push: { progress: progress._id } },
      { upsert: true }
    );

    editedProgress = await addMyVote(progress, req.user.userId);

    return res.status(StatusCodes.OK).json({ progress: editedProgress });
  }

  editedProgress = await addMyVote(progress, req.user.userId);

  res.status(StatusCodes.OK).json({ progress: editedProgress });
};

const setProgress = async (req, res) => {
  console.log("setting progress");
  const { story_id, chapter_id } = req.params;
  const story = await Story.findById(story_id).populate(populateChapters);

  const chapterIndex = story.chapters.findIndex(
    (chapter) => String(chapter._id) === chapter_id
  );

  const chapters = story.chapters.slice(chapterIndex, chapterIndex + 5);

  let progress = await Progress.findOne({
    user: req.user.userId,
    story: story_id,
  })
    .populate(populateStory)
    .populate(populateChapters);

  progress.chapters = chapters;

  await progress.save();

  const editedProgress = await addMyVote(progress, req.user.userId);

  res.status(StatusCodes.OK).json({ progress: editedProgress });
};

const addChapterConv = async (req, res) => {
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

const addParagraphConv = async (req, res) => {
  const { comment_content } = req.body;
  const comment = await Comment.create({
    author: req.user.userId,
    content: comment_content,
    subcomments: [],
  });

  const newConv = await Comment.findById(comment._id)
    .populate("author")
    .populate({ path: "subcomments", populate: "author" });

  const updatedParagraph = await Paragraph.findOneAndUpdate(
    { _id: req.params.paragraph_id },
    { $push: { comments: comment._id } },
    { upsert: true, new: true, runValidators: true }
  ).populate({
    path: "comments",
    populate: [
      { path: "author", model: "User" },
      { path: "subcomments", populate: { path: "author", model: "User" } },
    ],
  });

  res
    .status(StatusCodes.OK)
    .json({ updatedParagraph, newConvs: updatedParagraph.comments });
};

const addStoryConv = async (req, res) => {
  const { comment_content } = req.body;
  const comment = await Comment.create({
    author: req.user.userId,
    content: comment_content,
    subcomments: [],
  });

  const newConv = await Comment.findById(comment._id)
    .populate("author")
    .populate({ path: "subcomments", populate: "author" });

  await Story.findOneAndUpdate(
    { _id: req.params.id },
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

  const chapter = await Chapter.findById(req.params.chapter_id);

  //if vote exists, no need to create new one, just change the value
  if (vote) {
    vote.value = Number(req.body.vote_value); // update the vote value
    await vote.save(); // save the updated vote document
  } else {
    console.log("new vote");
    vote = await Vote.create({
      user: req.user.userId,
      chapter: req.params.chapter_id,
      value: Number(req.body.vote_value),
    }); // create a new vote document if one does not exist
    //save the vote to CHapter ONLY if you created a new one
    await chapter.votes.push(vote._id);
  }

  chapter.votesCount = await countChapterVotes(chapter._id);
  await chapter.save();
  const story = await Story.findById(req.params.story_id).populate({
    path: "chapters",
    select: "votesCount",
  });
  story.votesCount = await getStoryVotes(story);
  await story.save();

  res.status(StatusCodes.OK).json({ value: Number(req.body.vote_value) });
};

const unvoteChapter = async (req, res) => {
  //find your vote no matter what value it has
  const vote = await Vote.findOne({
    user: req.user.userId,
    chapter: req.params.chapter_id,
  });

  const chapter = await Chapter.findById(req.params.chapter_id);

  //take the vote back from chapter and delete vote object
  if (vote) {
    await chapter.votes.pull(vote._id);
    await vote.remove();
    chapter.votesCount = await countChapterVotes(chapter._id);

    await chapter.save();
    const story = await Story.findById(req.params.story_id).populate({
      path: "chapters",
      select: "votesCount",
    });
    story.votesCount = await getStoryVotes(story);
    await story.save();
  }

  res.status(StatusCodes.OK).json({ newChapter: chapter });
};

const incrementViewCount = async (req, res) => {
  console.log("incremeting view");
  await Chapter.findOneAndUpdate(
    { _id: req.params.chapter_id },
    { $inc: { views: 1 } }
  );
  await Story.findOneAndUpdate(
    { _id: req.params.story_id },
    { $inc: { views: 1 } }
  );
  res.status(StatusCodes.OK);
};

const createReadingList = async (req, res) => {
  const { title, story_id } = req.body;
  const readingList = await ReadingList.create({ title });
  if (story_id) {
    readingList.stories.push(story_id);
    readingList.save();
  }
  await User.findOneAndUpdate(
    { _id: req.user.userId },
    { $push: { readingLists: readingList._id } },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ readingList });
};

const addToReadingList = async (req, res) => {
  const readingList = await ReadingList.findByIdAndUpdate(
    req.params.readingListId,
    {
      $push: { stories: req.body.story_id },
    },
    { upsert: true, new: true, runValidators: true }
  );
  res.status(StatusCodes.OK);
};

export {
  getByCategory,
  getByQuery,
  getStory,
  getByDate,
  getByLength,
  addChapterConv,
  addParagraphConv,
  voteChapter,
  unvoteChapter,
  incrementViewCount,
  getAll,
  setProgress,
  getProgress,
  createReadingList,
  addToReadingList,
  addStoryConv,
};
