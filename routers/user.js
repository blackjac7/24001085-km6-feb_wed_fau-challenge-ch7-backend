const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { authMiddleware } = require("../middlewares/auth");

router.route("/:id").put(authMiddleware, userController.updateUser);

module.exports = router;
