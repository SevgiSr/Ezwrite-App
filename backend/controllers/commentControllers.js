import Comment from "../db/models/Comment.js";
import Paragraph from "../db/models/Paragraph.js";
import Chapter from "../db/models/Chapter.js";
import { StatusCodes } from "http-status-codes";

const handleAddChapterConv = async (req, res, countScore) => {
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

    if (countScore) {
      await countScore(req.params.story_id);
    }

    res.status(StatusCodes.OK).json({ newConv_id: newConv._id });
  } catch (error) {
    throw new Error(error.message);
  }
};

const handleDeleteChapterConv = async (req, res, countScore) => {
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

    if (countScore) {
      await countScore(req.params.story_id);
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "comment deleted successfully." });
  } catch (error) {
    throw new Error(error.message);
  }
};

const handleAddParagraphConv = async (req, res, countScore) => {
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

    if (countScore) {
      await countScore(req.params.story_id);
    }

    res.status(StatusCodes.OK).json({ newConv_id: comment._id });
  } catch (error) {
    throw new Error(error.message);
  }
};

const handleDeleteParagraphConv = async (req, res, countScore) => {
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

    if (countScore) {
      await countScore(req.params.story_id);
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "comment deleted successfully." });
  } catch (error) {
    throw new Error(error.message);
  }
};

const handleAddConvComment = async (req, res, countScore) => {
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

    if (countScore) {
      await countScore(story_id);
    }
    res.status(StatusCodes.OK).json({ newConv_id: newConv._id });
  } catch (error) {
    throw new Error(error.message);
  }
};

//FOR ALL OF CONVERSATIONS' SUBCOMMENTS
const handleDeleteConvComment = async (req, res, countScore) => {
  try {
    const { conv_id, comment_id, story_id } = req.params;

    // First, remove the subcomment document
    await Comment.findByIdAndRemove(comment_id);

    // Then, remove the reference to the subcomment from the parent comment
    await Comment.findByIdAndUpdate(conv_id, {
      $pull: { subcomments: comment_id },
    });

    if (countScore) {
      await countScore(story_id);
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Subcomment deleted successfully." });
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  handleAddChapterConv,
  handleDeleteChapterConv,
  handleAddParagraphConv,
  handleDeleteParagraphConv,
  handleAddConvComment,
  handleDeleteConvComment,
};
