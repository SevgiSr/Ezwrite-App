import express from "express";
const router = express.Router();
import {
  getByCategory,
  getByQuery,
  getByDate,
  getByLength,
  addChapterConv,
  voteChapter,
  unvoteChapter,
  incrementViewCount,
  addParagraphConv,
  getAll,
  setProgress,
  getProgress,
  addToReadingList,
  createReadingList,
  addStoryConv,
  getLibrary,
  deleteChapterConv,
  deleteParagraphConv,
  deleteStoryConv,
  setCurrentChapter,
  getByTag,
  addConvComment,
  deleteConvComment,
  getTagSuggestions,
  getRecommendations,
  requestCollab,
} from "../controllers/storyController.js";

router.route("/recommendations").get(getRecommendations);
router.route("/library").get(getLibrary);
router.route("/:category").get(getByCategory);
router.route("/search/all").get(getAll);
router.route("/search/:query").get(getByQuery);
router.route("/search/tags/:tag").get(getByTag);
router.route("/suggestions/tags").get(getTagSuggestions);
router.route("/length/:length").get(getByLength);
router.route("/date/:date").get(getByDate);
router.route("/story/:story_id/:conv_id").delete(deleteStoryConv);
router.route("/story/:id").post(addStoryConv);

router.route("/readingLists/:readingListId").patch(addToReadingList);
router.route("/readingLists").post(createReadingList);

router.route("/collaborations/:story_id/:user_id").patch(requestCollab);

router
  .route("/:story_id/chapters/:chapter_id/conversations/:conv_id")
  .delete(deleteChapterConv);
router
  .route("/:story_id/chapters/:chapter_id/conversations")
  .post(addChapterConv);

router.route("/progress/:story_id").get(getProgress);
router
  .route("/progress/:story_id/:chapter_id")
  .post(setProgress)
  .patch(setCurrentChapter);

router
  .route("/:story_id/vote/chapters/:chapter_id")
  .patch(voteChapter)
  .delete(unvoteChapter);

router
  .route("/:story_id/paragraphs/:paragraph_id/conversations/:conv_id")
  .delete(deleteParagraphConv);

router
  .route("/:story_id/paragraphs/:paragraph_id/conversations")
  .post(addParagraphConv);

router.route("/:story_id/conversations/:conv_id").post(addConvComment);
router
  .route("/:story_id/conversations/:conv_id/comments/:comment_id")
  .delete(deleteConvComment);

router.route("/view/:story_id/:chapter_id").post(incrementViewCount);

export default router;
