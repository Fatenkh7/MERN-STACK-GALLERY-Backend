import express from 'express'
const router = express.Router()
import { getAll, addReview, editRedview, deleteReview } from "../controllers/reviews.js"
import auth from "../middleware/auth-token.js"

router.get("/", getAll)
router.post("/add", addReview)
router.patch("/edit/:username",auth, editRedview)
router.delete("/:username", auth,deleteReview)

export default router;
