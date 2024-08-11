// src/models/universityModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const universitySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNo: { type: String, required: true },
    job: { type: String, required: true },
    instituteType: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, default: "university" },
  },
  { timestamps: true }
);

// Hash password before saving
universitySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare hashed passwords
universitySchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const University = mongoose.model("University", universitySchema);

module.exports = University;
