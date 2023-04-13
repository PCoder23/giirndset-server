import express from "express";

import {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
} from "../controllers/blogs.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", auth, createBlog);
router.patch("/:id", auth, updateBlog);
router.delete("/", auth, deleteBlog);

export default router;
