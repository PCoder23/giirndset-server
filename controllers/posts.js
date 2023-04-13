import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

const router = express.Router();
export const getPost = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(409).json({
      message: "not Working Brothahhh",
    });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPostMessage = new PostMessage({
    ...post,
    creatorId: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`no id ${id}`);
  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "post khatam bhai" });
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {
      creator,
      title,
      message,
      tags,
      selectedFile,
      _id: id,
    };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
