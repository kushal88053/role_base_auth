const express = require("express");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const userData = req.userData;

  try {
    const newUser = new User(userData);
    const result = await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        primary_number: newUser.primary_number,
        secondary_number: newUser.secondary_number,
        salt: newUser.salt,
        password: newUser.password,
        role: newUser.role,
        age: newUser.age,
        dob: newUser.dob,
        createdBy: newUser.createdBy,
        _id: result._id,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, phone, password } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { primary_number: phone }],
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(password, user.salt);

  if (hashedPassword !== user.password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const { password: _, salt: __, ...userDetails } = user.toObject();

  const token = jwt.sign({ ...userDetails }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Set your desired expiry here
  });

  return res.status(200).json({ token, user: userDetails });
};

const adminregister = async (req, res) => {
  const userData = req.body;

  try {
    const newUser = new User(userData);
    const result = await newUser.save();

    return res.status(201).json({
      message: "admin registered successfully",
      user: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        primary_number: newUser.primary_number,
        secondary_number: newUser.secondary_number,
        role: "admin",
        age: newUser.age,
        dob: newUser.dob,
        _id: result._id,
      },
      result,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
module.exports = {
  register,
  login,
  adminregister,
};
