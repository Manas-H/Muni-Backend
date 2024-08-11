// src/services/authService.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Employee = require("../models/employerModel");
const University = require("../models/universityModel");

const registerUser = async (userData) => {
  // console.log("ser1 type", type);
  console.log("ser1 Data", userData);
  let UserModel;

  switch (userData.type) {
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
      throw new Error("Invalid registration type");
  }

  const user = new UserModel(userData);
  await user.save();
  return user;
};

const authenticateUser = async (email, password, type = null) => {
  const userTypes = ["student", "employer", "university"];
  const UserModel = [User, Employee, University];

  const users = await Promise.all(
    UserModel.map((model) => model.findOne({ email }))
  );

  const userMatches = users.filter((user) => user !== null);

  if (userMatches.length === 0)
    throw new Error("No user found with this email");

  // Check passwords of all matching users before proceeding
  const validUserMatches = [];
  for (const user of userMatches) {
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      validUserMatches.push(user);
    }
  }

  if (validUserMatches.length === 0) throw new Error("Invalid password");

  if (validUserMatches.length > 1 && !type) {
    return {
      multipleAccounts: true,
      accounts: userTypes.filter((_, index) => users[index] !== null),
    };
  }

  const user = type ? users[userTypes.indexOf(type)] : validUserMatches[0];
  const ActualType = type || user.type;
  const token = jwt.sign({ userId: user._id, ActualType }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });

  // console.log("token",token);
  // console.log("token",token);

  return { user, token, type: ActualType };
};

module.exports = { registerUser, authenticateUser };
