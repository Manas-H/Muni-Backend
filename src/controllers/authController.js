const { registerUser, authenticateUser } = require("../services/authServices");
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

module.exports = { register, login, verifyAccountType };
