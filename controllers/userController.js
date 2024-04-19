import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { json } from "express";

const registerUser = asyncHandler(async (req, res) => {
  // check if email exists in db
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  if (userExists === null) {
    let { email, password } = req.body;
    if (password.length && password.length) {
      const person = new User({
        email: email,
        password: password,
      });
      await person.save();
      return res.status(201).json({ person });
    } else {
      return (
        res.status(400),
        json({ msg: "Please add all values in the request body " })
      );
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  // check if user email exists in db
  const user = await User.findOne({ email });
  console.log(user);
  // return user obj if their password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  // req.user was set in authMiddleware.js
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { registerUser, loginUser, getUserProfile };
