import express from "express";
const router = express.Router();

import {
  createChapter,
  deleteChapter,
  deleteFork,
  getMyForks,
  getPendingForkRequests,
  getPullRequests,
  restoreChapterHistory,
  saveChapter,
  sendPullRequest,
} from "../controllers/myForkController.js";
import {
  addChapterConv,
  addConvComment,
  addParagraphConv,
  deleteChapterConv,
  deleteConvComment,
  deleteParagraphConv,
  getFork,
} from "../controllers/forkController.js";

router.route("/pending").get(getPendingForkRequests);
router.route("/delete/:fork_id").delete(deleteFork);
router.route("/pull/:fork_id").patch(sendPullRequest).get(getPullRequests);

router.route("/history/:fork_id/:chapter_id").patch(restoreChapterHistory);

router
  .route("/:fork_id/chapters/:chapter_id/conversations/:conv_id")
  .delete(deleteChapterConv);
router
  .route("/:fork_id/chapters/:chapter_id/conversations")
  .post(addChapterConv);

router
  .route("/:fork_id/paragraphs/:paragraph_id/conversations/:conv_id")
  .delete(deleteParagraphConv);

router
  .route("/:fork_id/paragraphs/:paragraph_id/conversations")
  .post(addParagraphConv);

router.route("/:fork_id/conversations/:conv_id").post(addConvComment);
router
  .route("/:fork_id/conversations/:conv_id/comments/:comment_id")
  .delete(deleteConvComment);

router.route("/:fork_id/:chapter_id").patch(saveChapter).delete(deleteChapter);

router.route("/:fork_id").patch(createChapter).get(getFork);

router.route("/").get(getMyForks);

export default router;
