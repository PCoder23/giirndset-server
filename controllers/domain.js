import express from "express";
import mongoose from "mongoose";

import domainModel from "../models/domain.js";
import PostMessage from "../models/postMessage.js";
import blogDetail from "../models/blogDetail.js";
import userInformation from "../models/userInformation.js";

const router = express.Router();

export const getDomains = async (req, res) => {
  try {
    const domains = await domainModel.find();
    res.status(200).json(domains);
  } catch (error) {
    console.log(error.message);
  }
};
export const getDomainById = async (req, res) => {
  try {
    const { id } = req.params;
    const domain = await domainModel.findById(id);
    if (!domain) return res.status(401).json({ message: "Not a valid id" });
    const blogs = await blogDetail.find({ creatorId: { $in: domain.members } });
    const posts = await PostMessage.find({
      creatorId: { $in: domain.members },
    });
    const users = await userInformation.find({
      userId: { $in: domain.members },
    });

    res.status(200).json({ domain, blogs, posts, users });
  } catch (error) {
    console.log(error.message);
  }
};

export const createDomain = async (req, res) => {
  try {
    const { domainName, domainCreator, description, logoLink } = req.body;

    const members = [domainCreator];

    const domain = await domainModel.create({
      domainName,
      domainCreator,
      description,
      logoLink,
      members,
    });

    const userInfo = await userInformation.findOne({ userId: req.userId });

    userInfo.joinedDomains.push(domain._id);

    userInfo.createdDomains.push(domain._id);

    userInfo.save();

    const blogs = await blogDetail.find({
      creatorId: { $in: domain.members },
    });
    const posts = await PostMessage.find({
      creatorId: { $in: domain.members },
    });
    const users = await userInformation.find({
      userId: { $in: domain.members },
    });
    res.status(201).json({ domain, blogs, posts, users });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteDomain = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`no id ${id}`);
    await domainModel.findByIdAndRemove(id);

    res.json({ message: "post khatam bhai" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const findDomainBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const domainName = new RegExp(searchQuery, "i");

    const domains = await domainModel.find({
      $or: [{ domainName }],
    });

    res.status(200).json(domains);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const joinDomain = async (req, res) => {
  try {
    const userId = req.userId;

    const { id } = req.params;

    const domain = await domainModel.findById(id);

    if (!domain) return res.status(409).json({ message: "Invalid" });

    const userInfo = await userInformation.findOne({ userId: userId });

    if (!userInfo) return res.status(409).json({ message: "Invalid" });

    domain.members.push(userId);

    domain.save();

    userInfo.joinedDomains.push(id);

    userInfo.save();

    const blogs = await blogDetail.find({
      creatorId: { $in: domain.members },
    });

    const posts = await PostMessage.find({
      creatorId: { $in: domain.members },
    });

    const users = await userInformation.find({
      userId: { $in: domain.members },
    });

    res.status(201).json({ domain, blogs, posts, users });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateDomain = async (req, res) => {};

export default router;
