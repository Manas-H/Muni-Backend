const {
  registerUser,
  authenticateUser,
  updateUserProfile,
  getUserProfile,
} = require("../services/authServices");
const User = require("../models/userModel");
const Employee = require("../models/employerModel");
const University = require("../models/universityModel");

const register = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    const { type, email, mobileNo } = req.body;
    console.log("auth type", type);
    console.log("auth Data", email, mobileNo);

    // Check if user already exists by email
    let UserModel;

    switch (type) {
      case "student":
        UserModel = User;
        break;
      case "employer":
        UserModel = Employee;
        break;
      case "university":
        UserModel = University;
        break;
      default:
        return res.status(400).json({ message: "Invalid registration type" });
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      console.log("Email exists");
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check if user already exists by mobile number
    const existingUserByMobile = await UserModel.findOne({ mobileNo });
    if (existingUserByMobile) {
      console.log("Number exists");
      return res
        .status(400)
        .json({ message: "Mobile number already registered" });
    }

    const user = await registerUser(req.body);
    res.status(201).json(user);
    console.log("user register data", user);
  } catch (error) {
    console.log("Registration Error", error);
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    // console.log("reqbody", req.body)
    const result = await authenticateUser(email, password, type);
    // console.log("resuklt", result);

    if (result.multipleAccounts) {
      return res.status(200).json({
        message: "Multiple accounts found",
        accounts: result.accounts.map((type) => ({ type, email })),
      });
    }

    // console.log("resuklt.type", result.type);

    res.json({ user: result.user, token: result.token, type: result.type });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const verifyAccountType = async (req, res) => {
  const { email, password, type } = req.body;
  // console.log("verify", email, password, type);

  try {
    const result = await authenticateUser(email, password, type);
    // console.log("verify", result);

    if (result.type !== type) {
      // console.log("verify type", result.type);
      // console.log("verify", type);
      // console.log("err in resulttype controller");
      return res.status(400).json({ message: "Account type mismatch" });
    }

    res.json({ user: result.user, token: result.token, type: result.type });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId, userType } = req;
    console.log(userId, userType);
    const userProfile = await getUserProfile(userId, userType);
    console.log(userProfile);
    res.json(userProfile);
  } catch (error) {
    console.log("this is error", error);
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId, userType } = req;
    const updatedProfile = await updateUserProfile(userId, userType, req.body);
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId, userType } = req;
    const { currentPassword, newPassword } = req.body;

    let UserModel;
    switch (userType) {
      case "student":
        UserModel = User;
        break;
      case "employer":
        UserModel = Employee;
        break;
      case "university":
        UserModel = University;
        break;
      default:
        return res.status(400).json({ message: "Invalid user type" });
    }

    // Verify current password
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Check if new password is the same as the current password
    const isSameAsCurrent = await user.comparePassword(newPassword);
    if (isSameAsCurrent) {
      return res
        .status(400)
        .json({
          message: "New password cannot be the same as the current password",
        });
    }

    // Validate new password
    const passwordValidationErrors = validatePassword(newPassword);
    if (passwordValidationErrors.length > 0) {
      return res
        .status(400)
        .json({ message: passwordValidationErrors.join(", ") });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Validate new password
const validatePassword = (password) => {
  const errors = [];
  if (password.length < 6)
    errors.push("Password must be at least 6 characters");
  if (!/[A-Z]/.test(password))
    errors.push("Password must include at least one uppercase letter");
  if (!/[a-z]/.test(password))
    errors.push("Password must include at least one lowercase letter");
  if (!/\d/.test(password))
    errors.push("Password must include at least one number");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    errors.push("Password must include at least one special character");
  return errors;
};
module.exports = {
  register,
  login,
  verifyAccountType,
  getUser,
  updateUser,
  changePassword,
};
