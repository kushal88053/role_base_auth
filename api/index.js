const express = require("express");
const router = express.Router();

const authRoute = require("./authRouter");
// const adminRoute = require("./adminRouter");
// const managerRoute = require("./managerRouter");
// const userRourte = require("./userRouter");

router.use("/auth", authRoute);
// router.use("/admin", adminRoute);
// router.use("/manager", managerRoute);
// router.use("/user", userRourte);

module.exports = router;
