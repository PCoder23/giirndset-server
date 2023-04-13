import express from "express";

import {
  getPost,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/", deletePost);

export default router;
