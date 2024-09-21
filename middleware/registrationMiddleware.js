const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

const registrationMiddleware = async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    primary_number,
    second_number,
    password,
    age,
    dob,
    role,
  } = req.body;

  console.log(role);
  if (!first_name) {
    return res.status(400).json({ message: "First name is required" });
  }
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!primary_number) {
    return res
      .status(400)
      .json({ message: "Primary phone number is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (!age) {
    return res.status(400).json({ message: "Age is required" });
  }

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingPhone = await User.findOne({ primary_number });
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "Primary phone number already exists" });
    }

    const requestingUserRole = req.user ? req.user.role : null;
    if (requestingUserRole === "admin") {
      // Admin can create managers or users
      if (role !== "manager" && role !== "user") {
        return res.status(400).json({
          message: "Invalid role specified. Use 'manager' or 'user'.",
        });
      }
    } else if (requestingUserRole === "manager") {
      // Managers can only create users
      if (role && role !== "user") {
        return res
          .status(400)
          .json({ message: "Managers can only create users." });
      }
    } else {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }

    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(password, salt);

    req.userData = {
      first_name,
      last_name,
      email,
      primary_number,
      second_number,
      password: hashedPassword,
      salt,
      age,
      dob,
      role: role || "user",
      createdBy: req.user ? req.user._id : null,
    };

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error 123", error: error.message });
  }
};

module.exports = { registrationMiddleware };
