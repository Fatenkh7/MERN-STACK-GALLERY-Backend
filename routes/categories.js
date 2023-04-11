import express from "express";
const router = express.Router();
import auth from "../middleware/auth-token.js";
import {
  post,
  getAll,
  editCategory,
  deleteCategory,
  getByCatName,
} from "../controllers/categories.js";

router.post("/", auth, post);
router.get("/", getAll);
router.get("/:CATEGORY", getByCatName);
router.put("/:CATEGORY", auth, editCategory);
router.delete("/:CATEGORY", auth, deleteCategory);

export default router;
