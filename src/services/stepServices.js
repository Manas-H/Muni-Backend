const Step = require("../models/StepModel");
// const jwt = require("jsonwebtoken");

// Create or update a step
const createOrUpdateStep = async (userId, step, title, description) => {
  // Find the existing step for the user and the specified step number
  let existingStep = await Step.findOne({ userId, step });

  if (existingStep) {
    // Update the existing step
    existingStep.title = title;
    existingStep.description = description;
    await existingStep.save();
    return existingStep;
  } else {
    // Create a new step
    const newStep = new Step({ userId, step, title, description });
    await newStep.save();
    return newStep;
  }
};

// Get steps for a user
const getSteps = async (userId) => {
  console.log("get steps ser", userId);
  const steps = await Step.find({ userId });
  console.log("get steps", steps);
  return steps;
};

module.exports = { createOrUpdateStep, getSteps };
