import express from "express";
import {
  getPrivateConvs,
  sendMessage,
  openPrivateConv,
  sendNotification,
  readNotifications,
  getCollabNotifications,
  readCollabNotifications,
  getNotifications,
} from "../controllers/messageController.js";
const router = express.Router();

router.route("/notifications/:username").post(sendNotification);

router.route("/notifications").get(getNotifications).patch(readNotifications);

router
  .route("/notifications/collab")
  .get(getCollabNotifications)
  .patch(readCollabNotifications);

router.route("/inbox").get(getPrivateConvs);
router.route("/:username").post(sendMessage).get(openPrivateConv);

export default router;
