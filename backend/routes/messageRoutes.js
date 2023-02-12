import express from "express";
import {
  sendMessage,
  openPrivateConv,
} from "../controllers/messageController.js";
const router = express.Router();

router.route("/:username").post(sendMessage).get(openPrivateConv);

export default router;
