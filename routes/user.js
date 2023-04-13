import express from "express";
import { signIn, signUp } from "../controllers/user.js";

const router = express.Router();

router.use("/signUp", signUp);
router.use("/signIn", signIn);

export default router;
