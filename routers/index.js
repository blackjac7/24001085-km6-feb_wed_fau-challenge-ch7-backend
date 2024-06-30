const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const messageRouter = require("./message");
const airportController = require("../controllers/airport");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/messages", messageRouter);
router.get("/airports", airportController.getAirports);

module.exports = router;
