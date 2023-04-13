import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import UserModel from "../models/user.js";
const secret = "heaven";
const router = express.Router();

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const oldUser = await UserModel.findOne({ email });

    if (!oldUser) return res.status(400).json({ message: "No user Found" });

    const isCorrectPassword = bcrypt.compare(password, oldUser.password);

    if (!isCorrectPassword)
      return res.status(400).json({ message: "Password Not Correct" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "168h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User Already Exist" });

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(1);
    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    console.log(2);
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    console.log(3);
    res.status(201).json({ result, token });
    console.log(4);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
