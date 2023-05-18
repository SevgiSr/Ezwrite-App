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
} from "../controllers/storyController.js";

router.route("/:category").get(getByCategory);
router.route("/search/all").get(getAll);
router.route("/search/:query").get(getByQuery);
router.route("/length/:length").get(getByLength);
router.route("/date/:date").get(getByDate);
router.route("/story/:id").get(getStory);
router.route("/story/:story_id/:chapter_id");

router.route("/progress/:story_id").get(getProgress);
router.route("/progress/:story_id/:chapter_id").post(setProgress);

router
  .route("/chapter/:chapter_id")
  .post(addChapterConv)
  .patch(voteChapter)
  .delete(unvoteChapter);

router.route("/chapter/comments/:paragraph_id").post(addParagraphConv);

router.route("/chapter/:chapter_id/view").post(incrementViewCount);

export default router;
