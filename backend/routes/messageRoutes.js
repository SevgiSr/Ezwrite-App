import express from "express";
import {
  sendMessage,
  openPrivateConv,
  openNotifications,
  sendNotification,
  deleteNotifications,
} from "../controllers/messageController.js";
const router = express.Router();

router.route("/notifications/:username").post(sendNotification);

router
  .route("/notifications")
  .get(openNotifications)
  .delete(deleteNotifications);

router.route("/:username").post(sendMessage).get(openPrivateConv);

export default router;
