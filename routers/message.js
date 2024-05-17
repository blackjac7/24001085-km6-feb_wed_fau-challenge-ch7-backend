const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");
const { authMiddleware } = require("../middlewares/auth");

router
  .route("/")
  .get(authMiddleware, messageController.getAllMessages)
  .post(authMiddleware, messageController.createMessage);

router
  .route("/:id")
  .get(authMiddleware, messageController.getMessageById)
  .put(authMiddleware, messageController.updateMessage)
  .delete(authMiddleware, messageController.deleteMessage);

module.exports = router;
