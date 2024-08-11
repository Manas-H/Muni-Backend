const express = require("express");
const router = express.Router();
const jobPostingController = require("../controllers/jobPostingController");
const authenticate = require("../middleware/authenticate");

router.post(
  "/job-postings",
  jobPostingController.createJobPosting,
  authenticate
);
router.get("/job-postings", jobPostingController.getJobPostings, authenticate);
router.get(
  "/job-postings/:id",
  jobPostingController.getJobPostingById,
  authenticate
);
router.put(
  "/job-postings/:id",
  jobPostingController.updateJobPosting,
  authenticate
);
router.delete(
  "/job-postings/:id",
  jobPostingController.deleteJobPosting,
  authenticate
);

module.exports = router;
