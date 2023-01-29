import express from "express";
const router = express.Router();
import { getByCategory } from "../controllers/storyController.js";

router.route("/:category").get(getByCategory);

export default router;
