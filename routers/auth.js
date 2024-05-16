const express = require("express");
const router = express.Router();
const {
    register,
    login,
    profile,
    googleLogin,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/profile", profile);

module.exports = router;
