const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const messageRouter = require("./message");

router.use("/auth", authRouter);
router.use("/messages", messageRouter);

module.exports = router;
