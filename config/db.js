require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.DB_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
