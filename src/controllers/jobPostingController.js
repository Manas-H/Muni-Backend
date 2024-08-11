const jobPostingService = require("../services/jobPostingService");
const jwt = require("jsonwebtoken");

const createJobPosting = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const jobPosting = await jobPostingService.createJobPosting(
      req.body,
      userId
    );
    res.status(201).json(jobPosting);
  } catch (error) {
    console.log("This is services error create", error);
    res.status(400).json({ error: error.message });
  }
};

const getJobPostings = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const jobPostings = await jobPostingService.getJobPostings(userId);
    res.status(200).json(jobPostings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getJobPostingById = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const jobPostingId = req.params.id; // Get the ID from the request parameters

    // Fetch job posting by ID
    const jobPosting = await jobPostingService.getJobPostingById(jobPostingId);

    if (!jobPosting || jobPosting.userId.toString() !== userId) {
      return res.status(404).json({ error: "JobPosting not found" });
    }

    res.status(200).json(jobPosting);
  } catch (error) {
    console.log("this is error", error);
    res.status(400).json({ error: error.message });
  }
};

const updateJobPosting = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const jobPostingId = req.params.id; // Get the ID from the request parameters

    const jobPosting = await jobPostingService.updateJobPosting(
      jobPostingId,
      req.body
    );

    if (!jobPosting || jobPosting.userId.toString() !== userId) {
      return res.status(404).json({ error: "JobPosting not found" });
    }
    console.log("this is updated data controller", jobPosting)
    res.status(200).json(jobPosting);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteJobPosting = async (req, res) => {
  try {
    const jobPostingId = req.params.id; // Get the ID from the request parameters
    const jobPosting = await jobPostingService.deleteJobPosting(jobPostingId);

    if (!jobPosting) {
      return res.status(404).json({ error: "JobPosting not found" });
    }
    res.status(200).json({ message: "JobPosting deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createJobPosting,
  getJobPostings,
  getJobPostingById,
  updateJobPosting,
  deleteJobPosting,
};
