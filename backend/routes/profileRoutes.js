import express from "express";
const router = express.Router();
import {
  addProfileConv,
  getProfile,
  followProfile,
  unfollowProfile,
  getProfileConv,
  editProfile,
  getProfileSettings,
  deleteProfileConv,
  getAllUsers,
  deleteConvComment,
  addConvComment,
} from "../controllers/profileController.js";

router.route("/explore/all").get(getAllUsers);
router.route("/settings").get(getProfileSettings);

router
  .route("/conversations/:conv_id/comments/:comment_id")
  .delete(deleteConvComment);

router.route("/conversations/:conv_id").post(addConvComment);

router.route("/:username/conversations/:conv_id").delete(deleteProfileConv);
router
  .route("/:username/conversations")
  .get(getProfileConv)
  .post(addProfileConv);
router.route("/:username/follow").get(followProfile);
router.route("/:username/unfollow").get(unfollowProfile);
router.route("/:username").get(getProfile).patch(editProfile);

export default router;
