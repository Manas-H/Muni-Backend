// src/routes/authRoutes.js
const express = require("express");
const {
  register,
  login,
  verifyAccountType,
  updateUser,
  getUser,
  changePassword,
} = require("../controllers/authController");
const router = express.Router();
const verifyToken = require("../middleware/authenticate");

router.post("/register", register);
router.post("/login", login);
router.post("/verify-account-type", verifyAccountType);
router.get("/get-profile", verifyToken, getUser);
router.put("/update-profile", verifyToken, updateUser);
router.post("/change-password", verifyToken, changePassword);

module.exports = router;
