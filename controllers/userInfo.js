import express from "express";
import userInformation from "../models/userInformation.js";
import domainModel from "../models/domain.js";
const router = express.Router();

export const getUserInfo = async (req, res) => {
  try {
    const id = req.userId;
    const data = await userInformation.findOne({ userId: id });
    // if (!data) return res.status(401).json({ message: "No Information" });
    res.status(200).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getUserInfoById = async (req, res) => {
  try {
    const id = req.params;
    const data = await userInformation.findOne({ userId: id });
    // if (!data) return res.status(401).json({ message: "No Information" });
    res.status(200).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const postUserInfo = async (req, res) => {
  try {
    const {
      userName,
      name,
      description,
      skills,
      linkedinLink,
      githubLink,
      imageLink,
    } = req.body;
    const id = req.userId;
    const userInfo = new userInformation({
      userName,
      name,
      description,
      skills,
      linkedinLink,
      githubLink,
      imageLink,
      userId: id,
    });
    await userInfo.save();
    res.status(201).json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error });
  }
};

export const joinedDomains = async (req, res) => {
  try {
    const id = req.userId;
    const userInfo = await userInformation.findOne({ userId: id });
    if (!userInfo) return res.status(401).json({ message: "Not a valid id" });
    const joinedDomains = await domainModel.find({
      _id: { $in: userInfo.joinedDomains },
    });
    res.status(200).json(joinedDomains);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

// export const joinedDomains = async (req, res) => {
//   try {
//     const id = req.userId;
//     console.log(1);
//     const data = await userInformation.findOne({ userId: id });
//     console.log(1);
//     // if (!data) return res.status(401).json({ message: "No Information" });
//     console.log(1);
//     res.status(200).json(data);
//     console.log(1);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

export default router;
