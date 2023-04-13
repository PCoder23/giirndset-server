import express from "express";
import {
  getUserInfo,
  postUserInfo,
  joinedDomains,
  getUserInfoById,
} from "../controllers/userInfo.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getUserInfo);
router.get("/joineddomains", auth, joinedDomains);
router.get("/:id", getUserInfoById);
router.post("/", auth, postUserInfo);

export default router;
