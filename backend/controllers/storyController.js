import Story from "../db/models/Story.js";
import Comment from "../db/models/Comment.js";
import Chapter from "../db/models/Chapter.js";
import User from "../db/models/User.js";
import { StatusCodes } from "http-status-codes";
import Vote from "../db/models/Vote.js";
import Progress from "../db/models/Progress.js";
import Paragraph from "../db/models/Paragraph.js";
import ReadingList from "../db/models/ReadingList.js";
import Trie from "../utils/Trie.js";

function populateStory(mode) {
  const populateOptions = {
    path: "story",
    populate: [
      { path: "author" },
      { path: "tags" },
      {
        path: "chapters",
        select: "title votesCount views",
      },
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
    ],
  };

  if (mode === "read") {
    populateOptions.populate[1].match = { visibility: "published" };
  } else {
    populateOptions.options = { excludeVisibilityCheck: true };
  }
  return populateOptions;
}

function populateChapters(mode) {
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
  if (mode === "read") {
    populateOptions.match = { visibility: "published" };
  }
  return populateOptions;
}

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

export async function getChapterComments(chapter) {
  let totalComments = 0;

  totalComments = chapter.paragraphs?.reduce((total, paragraph) => {
    for (const comment of paragraph.comments) {
      total += comment.subcomments.length;
    }
    total += paragraph.comments.length;
    return total;
  }, 0);

  for (const comment of chapter.comments) {
    totalComments += comment.subcomments.length;
  }
  totalComments += chapter.comments.length;

  return totalComments;
}

export async function getStoryComments(story) {
  let totalComments = 0;

  for (let i = 0; i < story.chapters?.length; i++) {
    const chapterComments = await getChapterComments(story.chapters[i]);
    totalComments += chapterComments;
  }

  for (const comment of story.comments) {
    totalComments += comment.subcomments.length;
  }
  totalComments += story.comments.length;

  return totalComments;
}

async function calculateStoryScore(story) {
  const { views, votesCount } = story;
  const { upvotes, downvotes } = votesCount;
  const comments = await getStoryComments(story);
  console.log(views, votesCount, upvotes, downvotes, comments);
  if (views === 0) {
    return 0; // To avoid division by zero
  }
  let score = (2 * upvotes + 1.5 * comments - downvotes) / views;
  return score;
}

async function updateStoryScore(story_id) {
  const story = await Story.findById(story_id).populate([
    {
      path: "chapters",
      populate: [
        { path: "paragraphs", populate: "comments" },
        { path: "comments" },
      ],
    },
    { path: "comments" },
  ]);
  const score = await calculateStoryScore(story);
  story.score = score;
  await story.save();
  console.log("STORY SCORE: " + story.score);
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
  try {
    const { category } = req.params;
    const stories = await Story.find({
      category,
    }).populate("author progress tags");

    res.status(StatusCodes.OK).json({ stories });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByQuery = async (req, res) => {
  try {
    const { query } = req.params;
    const stories = await Story.find({
      title: { $regex: query, $options: "i" },
    }).populate("author progress tags");
    const users = await User.find({ name: { $regex: query, $options: "i" } });
    res.status(StatusCodes.OK).json({ stories, users });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const stories = await Story.find({
      tags: { $in: tag },
    }).populate("author progress tags");
    res.status(StatusCodes.OK).json({ stories });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async (req, res) => {
  /*   console.log("deleting");
  await User.updateMany({}, { $set: { activity: [] } });
  await User.updateMany({}, { $set: { notifications: [] } });
  await Notification.deleteMany();
 */
  try {
    const stories = await Story.find().populate("author progress tags");

    res.status(StatusCodes.OK).json({ stories });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByLength = async (req, res) => {
  try {
    const { length } = req.params;
    const stories = await Story.find({ chapters: { $size: length } }).populate(
      "author progress tags"
    );

    res.status(StatusCodes.OK).json({ stories });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByDate = async (req, res) => {
  try {
    let query = Story.find().populate("author progress tags");

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
  } catch (error) {
    throw new Error(error.message);
  }
};

// when user waits more thn 5 seconds in a chapter update progress to have array of chapter_id's 5 chapter forward in that story
// then you can populate those chapters field
// getProgress would be cached meaning 5 chapters would be cached
// otherwise you would have to find the story populate some of the chapters, send those chapters back cache them and do that 3564758 times

const getProgress = async (req, res) => {
  try {
    console.log("getting progress");
    let progress;
    let editedProgress;
    let mode = "read";

    const story = await Story.findById(req.params.story_id, null, {
      excludeVisibilityCheck: true,
    });

    if (String(story.author._id) === String(req.user.userId)) {
      mode = "preview";
    }

    progress = await Progress.findOne({
      user: req.user.userId,
      story: req.params.story_id,
    }).populate([
      populateStory(mode),
      populateChapters(mode),
      {
        path: "user",
        populate: {
          path: "readingLists",
          populate: { path: "stories", populate: "author" },
        },
      },
    ]);

    if (!progress || !progress.chapters || progress.chapters.length === 0) {
      console.log("no progress");
      const chapters = story.chapters.slice(0, 5);

      const newProgress = await Progress.create({
        user: req.user.userId,
        story: req.params.story_id,
        chapters: chapters,
      });

      progress = await Progress.findById(newProgress._id).populate([
        populateStory(mode),
        populateChapters(mode),
        {
          path: "user",
          populate: {
            path: "readingLists",
            populate: { path: "stories", populate: "author" },
          },
        },
      ]);

      await Story.updateOne(
        { _id: req.params.story_id },
        { $push: { progress: progress._id } },
        { runValidators: true }
      );

      editedProgress = await addMyVote(progress, req.user.userId);

      return res
        .status(StatusCodes.OK)
        .json({ progress: editedProgress, mode });
    }

    editedProgress = await addMyVote(progress, req.user.userId);

    res.status(StatusCodes.OK).json({ progress: editedProgress, mode });
  } catch (error) {
    throw new Error(error.message);
  }
};

const setProgress = async (req, res) => {
  try {
    console.log("setting progress");
    const { story_id, chapter_id } = req.params;
    let mode = "read";

    const story = await Story.findById(story_id, null, {
      excludeVisibilityCheck: true,
    });

    if (String(story.author._id) === req.user.userId) {
      mode = "preview";
    }

    const chapterIndex = story.chapters.findIndex(
      (chapter) => String(chapter._id) === chapter_id
    );

    const chapters = story.chapters.slice(
      chapterIndex < 3 ? 0 : chapterIndex - 2,
      chapterIndex + 5
    );

    const progress = await Progress.findOne({
      user: req.user.userId,
      story: story_id,
    });

    progress.chapters = chapters;

    await progress.save();

    await progress.populate([
      populateStory(mode),
      populateChapters(mode),
      {
        path: "user",
        populate: {
          path: "readingLists",
          populate: { path: "stories", populate: "author" },
        },
      },
    ]);

    const editedProgress = await addMyVote(progress, req.user.userId);

    res.status(StatusCodes.OK).json({ progress: editedProgress, mode });
  } catch (error) {
    throw new Error(error.message);
  }
};

const setCurrentChapter = async (req, res) => {
  try {
    const { story_id, chapter_id } = req.params;
    await Progress.updateOne(
      {
        user: req.user.userId,
        story: story_id,
      },
      { currentChapter: chapter_id },
      { new: true, runValidators: true }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const addChapterConv = async (req, res) => {
  try {
    const { comment_content } = req.body;
    const comment = await Comment.create({
      author: req.user.userId,
      content: comment_content,
      subcomments: [],
    });

    const newConv = await Comment.findById(comment._id)
      .populate("author")
      .populate({ path: "subcomments", populate: "author" });

    await Chapter.updateOne(
      { _id: req.params.chapter_id },
      { $push: { comments: comment._id } },
      { runValidators: true }
    );

    await updateStoryScore(req.params.story_id);

    res.status(StatusCodes.OK).json({ newConv });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteChapterConv = async (req, res) => {
  try {
    const conv = await Comment.findById(req.params.conv_id);

    if (conv) {
      for (let commentId of conv.subcomments) {
        await Comment.findByIdAndRemove(commentId);
      }
      await Chapter.findByIdAndUpdate(req.params.chapter_id, {
        $pull: { comments: conv._id },
      });

      await conv.delete();
    }

    await updateStoryScore(req.params.story_id);
    res
      .status(StatusCodes.OK)
      .json({ message: "comment deleted successfully." });
  } catch (error) {
    throw new Error(error.message);
  }
};

const addParagraphConv = async (req, res) => {
  try {
    const { comment_content } = req.body;
    const comment = await Comment.create({
      author: req.user.userId,
      content: comment_content,
      subcomments: [],
    });

    await Paragraph.updateOne(
      { _id: req.params.paragraph_id },
      { $push: { comments: comment._id } },
      { new: true, runValidators: true }
    );

    await updateStoryScore(req.params.story_id);

    res.status(StatusCodes.OK).json({ comment });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteParagraphConv = async (req, res) => {
  try {
    const conv = await Comment.findById(req.params.conv_id);

    if (conv) {
      for (let commentId of conv.subcomments) {
        await Comment.findByIdAndRemove(commentId);
      }
      await Paragraph.findByIdAndUpdate(req.params.paragraph_id, {
        $pull: { comments: conv._id },
      });

      await conv.delete();
    }

    await updateStoryScore(req.params.story_id);

    res
      .status(StatusCodes.OK)
      .json({ message: "comment deleted successfully." });
  } catch (error) {
    throw new Error(error.message);
  }
};

const addStoryConv = async (req, res) => {
  try {
    const { comment_content } = req.body;
    const comment = await Comment.create({
      author: req.user.userId,
      content: comment_content,
      subcomments: [],
    });

    const newConv = await Comment.findById(comment._id)
      .populate("author")
      .populate({ path: "subcomments", populate: "author" });

    await Story.updateOne(
      { _id: req.params.id },
      { $push: { comments: comment._id } },
      { runValidators: true }
    );

    await updateStoryScore(req.params.id);

    res.status(StatusCodes.OK).json({ newConv });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteStoryConv = async (req, res) => {
  try {
    const conv = await Comment.findById(req.params.conv_id);

    if (conv) {
      for (let commentId of conv.subcomments) {
        await Comment.findByIdAndRemove(commentId);
      }
      await Story.findByIdAndUpdate(req.params.story_id, {
        $pull: { comments: conv._id },
      });

      await conv.delete();

      await updateStoryScore(req.params.story_id);
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "comment deleted successfully." });
  } catch (error) {
    throw new Error(error.message);
  }
};

const addConvComment = async (req, res) => {
  try {
    const { comment_content } = req.body;
    const { conv_id, story_id } = req.params;

    const comment = await Comment.create({
      author: req.user.userId,
      content: comment_content,
      subcomments: [],
    });
    console.log(req.params.conv_id);
    const newConv = await Comment.findOneAndUpdate(
      { _id: conv_id },
      { $push: { subcomments: comment._id } },
      { new: true, runValidators: true }
    )
      .populate("author")
      .populate({ path: "subcomments", populate: "author" });

    await updateStoryScore(story_id);
    res.status(StatusCodes.OK).json({ newConv });
  } catch (error) {
    throw new Error(error.message);
  }
};

//FOR ALL OF CONVERSATIONS' SUBCOMMENTS
const deleteConvComment = async (req, res) => {
  try {
    const { conv_id, comment_id, story_id } = req.params;

    // First, remove the subcomment document
    await Comment.findByIdAndRemove(comment_id);

    // Then, remove the reference to the subcomment from the parent comment
    await Comment.findByIdAndUpdate(conv_id, {
      $pull: { subcomments: comment_id },
    });

    await updateStoryScore(story_id);

    res
      .status(StatusCodes.OK)
      .json({ message: "Subcomment deleted successfully." });
  } catch (error) {
    throw new Error(error.message);
  }
};

const voteChapter = async (req, res) => {
  try {
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

    await updateStoryScore(story._id);

    res.status(StatusCodes.OK).json({ value: Number(req.body.vote_value) });
  } catch (error) {
    throw new Error(error.message);
  }
};

const unvoteChapter = async (req, res) => {
  try {
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
      await updateStoryScore(story._id);
    }

    res.status(StatusCodes.OK).json({ newChapter: chapter });
  } catch (error) {
    throw new Error(error.message);
  }
};

const incrementViewCount = async (req, res) => {
  try {
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
  } catch (error) {
    throw new Error(error.message);
  }
};

const getLibrary = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate({
      path: "readingLists",
      populate: { path: "stories", populate: "author" },
    });

    const continueReading = await Progress.find({
      user: req.user.userId,
    }).populate({ path: "story", populate: "author" });

    const editedContinueReading = continueReading.map((progress) => {
      const chapterIndex = progress.story?.chapters.findIndex(
        (chapter) =>
          chapter._id.toString() === progress.chapters[0]._id.toString()
      );
      return {
        ...progress._doc,
        chapterIndex,
      };
    });

    const readingLists = user.readingLists;

    res
      .status(StatusCodes.OK)
      .json({ readingLists, continueReading: editedContinueReading });
  } catch (error) {
    throw new Error(error.message);
  }
};

const createReadingList = async (req, res) => {
  try {
    const { title, story_id } = req.body;

    if (title && title !== "") {
      const readingList = await ReadingList.create({ title });

      if (story_id) {
        readingList.stories.push(story_id);
        await readingList.save();
      }
      await User.updateOne(
        { _id: req.user.userId },
        { $push: { readingLists: readingList._id } },
        { runValidators: true }
      );
    }

    res.status(StatusCodes.OK).json({ readingList });
  } catch (error) {
    throw new Error(error.message);
  }
};

const addToReadingList = async (req, res) => {
  try {
    const readingList = await ReadingList.findByIdAndUpdate(
      req.params.readingListId,
      {
        $addToSet: { stories: req.body.story_id },
      },
      { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({ readingList });
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  getByCategory,
  getByQuery,
  getByDate,
  getByLength,
  getByTag,
  addChapterConv,
  addParagraphConv,
  voteChapter,
  unvoteChapter,
  incrementViewCount,
  getAll,
  setProgress,
  getProgress,
  getLibrary,
  createReadingList,
  addToReadingList,
  addStoryConv,
  deleteChapterConv,
  deleteParagraphConv,
  deleteStoryConv,
  setCurrentChapter,
  deleteConvComment,
  addConvComment,
};
