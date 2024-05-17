const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const messageRouter = require("./message");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/messages", messageRouter);

module.exports = router;
