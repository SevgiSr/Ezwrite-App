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
  getFeed,
  addToFollowerFeed,
} from "../controllers/messageController.js";
const router = express.Router();

router
  .route("/notifications")
  .get(getNotifications)
  .patch(readNotifications)
  .post(sendNotification);

router
  .route("/notifications/collab")
  .get(getCollabNotifications)
  .patch(readCollabNotifications);

router.route("/inbox").get(getPrivateConvs);
router.route("/feed").get(getFeed).post(addToFollowerFeed);
router.route("/:username").post(sendMessage).get(openPrivateConv);

export default router;
