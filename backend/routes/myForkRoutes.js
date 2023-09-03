import express from "express";
const router = express.Router();

import {
  createChapter,
  deleteChapter,
  deleteFork,
  getMyForks,
  getPullRequests,
  restoreChapterHistory,
  saveChapter,
  sendPullRequest,
} from "../controllers/myForkController.js";

router.route("/delete/:fork_id").delete(deleteFork);
router.route("/pull/:fork_id").patch(sendPullRequest).get(getPullRequests);

router.route("/history/:fork_id/:chapter_id").patch(restoreChapterHistory);

router.route("/:fork_id/:chapter_id").patch(saveChapter).delete(deleteChapter);

router.route("/:fork_id").patch(createChapter);
router.route("/").get(getMyForks);

export default router;
