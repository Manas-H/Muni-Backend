const express = require("express");
const router = express.Router();
const {
  createOrUpdateStepController,
  getStepsController,
} = require("../controllers/stepController");
const authenticate = require("../middleware/authenticate");

// Route to create a new step
router.post("/steps", authenticate, createOrUpdateStepController);

// Route to get steps for the logged-in user
router.get("/steps", authenticate, getStepsController);

module.exports = router;
