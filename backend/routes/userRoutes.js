import express from "express";
const router = express.Router();
import { getUser } from "../controllers/userController.js";

router.route("/:username").get(getUser);

export default router;
