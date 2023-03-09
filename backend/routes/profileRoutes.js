import express from "express";
const router = express.Router();
import {
  addProfileConv,
  getProfile,
  followProfile,
  unfollowProfile,
  getProfileConv,
  editProfile,
  getProfileActivity,
} from "../controllers/profileController.js";

router.route("/:username").get(getProfile).patch(editProfile);
router.route("/:username/follow").get(followProfile);
router.route("/:username/unfollow").get(unfollowProfile);
router
  .route("/:username/conversations")
  .get(getProfileConv)
  .post(addProfileConv);

router.route("/:username/activity").get(getProfileActivity);

export default router;
