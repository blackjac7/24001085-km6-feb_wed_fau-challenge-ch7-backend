const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");

router
    .route("/")
    .get(messageController.getAllMessages)
    .post(messageController.createMessage);

router
    .route("/:id")
    .get(messageController.getMessageById)
    .put(messageController.updateMessage)
    .delete(messageController.deleteMessage);

module.exports = router;
