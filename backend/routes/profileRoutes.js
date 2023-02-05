import express from "express";
const router = express.Router();
import {
  addProfileConv,
  getProfile,
  getProfileConv,
  editProfile,
} from "../controllers/profileController.js";

router.route("/:username").get(getProfile).patch(editProfile);
router
  .route("/:username/conversations")
  .get(getProfileConv)
  .post(addProfileConv);

export default router;
