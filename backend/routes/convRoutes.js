import express from "express";
import {
  addConvComment,
  deleteConvComment,
} from "../controllers/convController.js";
const router = express.Router();

//it's better to send important data like IDs in the URL or headers.
router.route("/:conv_id/:comment_id").delete(deleteConvComment);
router.route("/:conv_id").post(addConvComment);

export default router;
