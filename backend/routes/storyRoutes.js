import express from "express";
const router = express.Router();
import { createStory, getMyStories } from "../controllers/storyController.js";

router.route("/").post(createStory).get(getMyStories);

export default router;
