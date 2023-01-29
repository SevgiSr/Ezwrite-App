import express from "express";
const router = express.Router();
import {
  addProfileConv,
  getProfile,
  getProfileConv,
  addConvComment,
} from "../controllers/profileController.js";

router.route("/:username").get(getProfile);
router
  .route("/:username/conversations")
  .get(getProfileConv)
  .post(addProfileConv);

router.route("/:conv_id").post(addConvComment);

export default router;
