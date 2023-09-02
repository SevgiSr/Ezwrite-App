import express from "express";
const router = express.Router();

import {
  createChapter,
  deleteChapter,
  deleteFork,
  getMyForks,
  restoreChapterHistory,
  saveChapter,
} from "../controllers/myForkController.js";

router.route("/delete/:fork_id").delete(deleteFork);

router.route("/:fork_id/:chapter_id").patch(saveChapter).delete(deleteChapter);

router.route("/history/:fork_id/:chapter_id").patch(restoreChapterHistory);
router.route("/:fork_id").patch(createChapter);
router.route("/").get(getMyForks);

export default router;
