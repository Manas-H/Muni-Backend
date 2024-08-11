const { createOrUpdateStep, getSteps } = require("../services/stepServices");
const jwt = require("jsonwebtoken");

// Create or update a step
const createOrUpdateStepController = async (req, res) => {
  const { step, title, description } = req.body;

  try {
    // Verify token and get user ID
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Call the service to create or update the step
    const stepData = await createOrUpdateStep(userId, step, title, description);
    res.status(200).json(stepData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get steps for a user
const getStepsController = async (req, res) => {
  try {
    // Verify token and get user ID
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Call the service to get steps for the user
    const steps = await getSteps(userId);
    console.log("Con get sucessful data");
    console.log("Con get sucessful", steps);
    res.status(200).json(steps);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createOrUpdateStepController, getStepsController };
