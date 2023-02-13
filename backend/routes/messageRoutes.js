import express from "express";
import {
  sendMessage,
  openPrivateConv,
  openNotifications,
  sendNotification,
} from "../controllers/messageController.js";
const router = express.Router();

router.route("/notifications/:username").post(sendNotification);

router.route("/notifications").get(openNotifications);

router.route("/:username").post(sendMessage).get(openPrivateConv);

export default router;
