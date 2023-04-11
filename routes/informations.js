import express from "express";
const router = express.Router();
import { getInfo, setInfo } from "../controllers/informations.js";
import auth from "../middleware/auth-token.js";

router.get("/", getInfo);
router.put("/:id", auth, setInfo);


export default router;
