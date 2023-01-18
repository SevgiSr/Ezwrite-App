import express from "express";
const router = express.Router();
import {
  createStory,
  getMyStories,
  getMyChapters,
  editChapter,
  saveChapter,
  createChapter,
} from "../controllers/storyController.js";

router.route("/:story_id/:chapter_id").get(editChapter).patch(saveChapter);
router.route("/:id").get(getMyChapters).post(createChapter);
router.route("/").post(createStory).get(getMyStories);

export default router;
