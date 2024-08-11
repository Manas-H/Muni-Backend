// src/routes/authRoutes.js
const express = require("express");
const { register, login, verifyAccountType } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-account-type", verifyAccountType);

module.exports = router;
