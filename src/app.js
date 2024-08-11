// src/app.js
const express = require("express");
const connectDB = require("./config/DbConfig");
const authRoute = require("./routes/authRoute");
const stepRoutes = require("./routes/StepRoute");
const jobPosting = require("./routes/jobPostingRoute");
const app = express();
const cors = require('cors');


app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/auth", authRoute);
app.use('/api', stepRoutes);
app.use('/api', jobPosting);
// Add more routes as needed

module.exports = app;
