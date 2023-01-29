import express from "express";
const router = express.Router();
import {
  createStory,
  getMyStories,
  getMyChapters,
  editChapter,
  saveChapter,
  createChapter,
} from "../controllers/myStoryController.js";

//for image upload
import multer from "multer";
const storage = multer.memoryStorage();
/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
}); */
const upload = multer({ storage: storage });
/* const upload = multer({ dest: "./upload" }); */

router.route("/:story_id/:chapter_id").get(editChapter).patch(saveChapter);
router.route("/:id").get(getMyChapters).post(createChapter);
router.route("/").post(upload.single("cover"), createStory).get(getMyStories);

export default router;
