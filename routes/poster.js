import express from "express";
import imageHandler from "../middleware/imagehandler.js";
import auth from "../middleware/auth-token.js";
const router = express.Router();
import {
  post,
  getAll,
  getByTitle,
  deletePoster,
  put,
} from "../controllers/poster.js";

router.get("/", getAll);
router.get("/:title", getByTitle);
// router.get("/:id", getByID);
router.post("/", auth, imageHandler, post);
router.patch("/:id", auth, imageHandler, put);
router.delete("/:id", auth, deletePoster);
export default router;
