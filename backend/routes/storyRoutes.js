import express from "express";
const router = express.Router();
import {
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
  addParagraphConv,
} from "../controllers/storyController.js";

router.route("/:category").get(getByCategory);
router.route("/search/:query").get(getByQuery);
router.route("/length/:length").get(getByLength);
router.route("/date/:date").get(getByDate);
router.route("/story/:id").get(getStory);
router.route("/story/:story_id/:chapter_id").get(getChapter);

router
  .route("/chapter/:chapter_id")
  .post(addChapterConv)
  .patch(voteChapter)
  .delete(unvoteChapter);

router.route("/chapter/comments/:paragraph_id").post(addParagraphConv);

router.route("/chapter/:chapter_id/view").post(incrementViewCount);

export default router;
