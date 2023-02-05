import express from "express";
import { addConvComment } from "../controllers/convController.js";
const router = express.Router();

router.route("/:conv_id").post(addConvComment);

export default router;
