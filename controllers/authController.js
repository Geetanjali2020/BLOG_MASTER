import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Database/models/User.js";
import express from "express";


export const register = async (req, res) => {
  res.render("register");
};
export const login = async (req, res) => {
  res.render("login");
};
export const doRegister = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.json({
        error: "Please fill all the fields",
      });
    }
    const user = await User.find({ email: email });
    if (user.length > 0) {
      return res.json({
        error: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: `User registered successfully `,
      token: token,
    });
  } catch (error) {
    res.json({
      error: "Something went wrong",
      message: error.message,
    });
  }
};

export const doLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user.length == 0) {
      return res.json({ error: "User not found" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.json({ error: "Invalid password" });
    }
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ user: user, token: token });
  } catch (error) {
    res.json({ error: "Something went wrong" });
  }
};