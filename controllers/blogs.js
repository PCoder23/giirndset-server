import express from "express";
import mongoose from "mongoose";

import blogDetail from "../models/blogDetail.js";

const router = express.Router();

export const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blogDetailById = await blogDetail.findById(id);

    res.status(200).json(blogDetailById);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogDetails = await blogDetail.find();
    res.status(200).json(blogDetails);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const createBlog = async (req, res) => {
  const blog = req.body;
  const newBlogDetail = new blogDetail({
    ...blog,
    createdAt: new Date().toISOString(),
  });

  try {
    await newBlogDetail.save();
    res.status(201).json(newBlogDetail);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`no id ${id}`);
  await blogDetail.findByIdAndRemove(id);

  res.json({ message: "post khatam bhai" });
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, creator, fileLink, description, tags, BlogData } = req.body;
    // console.log(BlogData);

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    const updatedBlog = {
      title: title,
      creator: creator,
      fileLink: fileLink,
      description: description,
      BlogData: BlogData,
      _id: id,
    };
    console.log(updatedBlog);
    await blogDetail.findByIdAndUpdate(id, updatedBlog, { new: true });

    res.json(updatedBlog);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
