import express from "express";
const router = express.Router();
import {
  addProfileConv,
  getProfile,
  followProfile,
  unfollowProfile,
  getProfileConv,
  editProfile,
} from "../controllers/profileController.js";

router.route("/:username").get(getProfile).patch(editProfile);
router.route("/:username/follow").get(followProfile);
router.route("/:username/unfollow").get(unfollowProfile);
router
  .route("/:username/conversations")
  .get(getProfileConv)
  .post(addProfileConv);

export default router;
