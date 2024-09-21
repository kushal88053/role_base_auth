const express = require("express");
const router = express.Router();
const {
  registrationMiddleware,
} = require("../middleware/registrationMiddleware");
const verifyToken = require("../middleware/verifyToken");

const {
  register,
  login,
  adminregister,
} = require("../controllers/authController");

router.post("/login", login);

router.post("/register", verifyToken, registrationMiddleware, register);
router.post("/adminregister", adminregister);

module.exports = router;
