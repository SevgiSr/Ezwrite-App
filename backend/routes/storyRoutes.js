import express from "express";
const router = express.Router();
import {
  getByCategory,
  getByQuery,
  getStory,
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
} from "../controllers/storyController.js";

router.route("/library").get(getLibrary);
router.route("/:category").get(getByCategory);
router.route("/search/all").get(getAll);
router.route("/search/:query").get(getByQuery);
router.route("/length/:length").get(getByLength);
router.route("/date/:date").get(getByDate);
router.route("/story/:story_id/:conv_id").delete(deleteStoryConv);
router.route("/story/:id").get(getStory).post(addStoryConv);

router.route("/readingLists/:readingListId").patch(addToReadingList);
router.route("/readingLists").post(createReadingList);

router.route("/chapter/:chapter_id/:conv_id").delete(deleteChapterConv);
router.route("/chapter/:chapter_id").post(addChapterConv);

router.route("/progress/:story_id").get(getProgress);
router.route("/progress/:story_id/:chapter_id").post(setProgress);

router
  .route("/vote/:story_id/:chapter_id")
  .patch(voteChapter)
  .delete(unvoteChapter);

router
  .route("/chapter/comments/:paragraph_id/:conv_id")
  .delete(deleteParagraphConv);
router.route("/chapter/comments/:paragraph_id").post(addParagraphConv);

router.route("/view/:story_id/:chapter_id").post(incrementViewCount);

export default router;
