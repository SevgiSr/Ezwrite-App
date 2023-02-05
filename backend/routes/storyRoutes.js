import express from "express";
const router = express.Router();
import {
  getByCategory,
  getByQuery,
  getStory,
  getChapter,
  addChapterConv,
} from "../controllers/storyController.js";

router.route("/:category").get(getByCategory);
router.route("/search/:query").get(getByQuery);
router.route("/story/:id").get(getStory);
router.route("/story/:story_id/:chapter_id").get(getChapter);

router.route("/chapter/:chapter_id").post(addChapterConv);

export default router;
