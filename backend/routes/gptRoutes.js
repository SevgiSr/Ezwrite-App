import express from "express";
import { sendGptPrompt, streamTokens } from "../controllers/gptController.js";

const router = express.Router();

router.route("/prompt").post(sendGptPrompt);
router.route("/stream").get(streamTokens);

export default router;
