const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);

module.exports = router;
