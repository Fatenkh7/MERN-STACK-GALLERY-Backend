import express from "express";
const router = express.Router();
import auth from "../middleware/auth-token.js";
import { post, getAll, deleteInbox, getByEmail, deleteInboxEmail } from "../controllers/inbox.js";

router.post("/", post);
router.get("/", auth, getAll);
router.delete("/id/:id", auth, deleteInbox);
router.delete("/:email", auth, deleteInboxEmail);
router.get("/:email", auth, getByEmail);

export default router;
