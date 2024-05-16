const express = require("express");
const router = express.Router();
const messageRouter = require("./message");

router.use("/messages", messageRouter);

module.exports = router;
