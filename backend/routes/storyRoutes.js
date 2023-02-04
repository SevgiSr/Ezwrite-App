import express from "express";
const router = express.Router();
import {
  getByCategory,
  getByQuery,
  getStory,
  getChapter,
} from "../controllers/storyController.js";

router.route("/:category").get(getByCategory);
router.route("/search/:query").get(getByQuery);
router.route("/story/:id").get(getStory);
router.route("/story/:story_id/:chapter_id").get(getChapter);

export default router;
