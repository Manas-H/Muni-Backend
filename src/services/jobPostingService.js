const JobPosting = require("../models/postModel");

const createJobPosting = async (data, userId) => {
  try {
    // console.log("this is fata or userId", userId, data);
    const jobPostingData = { ...data, userId }; // Merge userId into data
    const jobPosting = new JobPosting(jobPostingData); // Pass the combined object
    return await jobPosting.save();
  } catch (error) {
    console.log("This is services error create", error);
    throw new Error(error.message);
  }
};

const getJobPostings = async (userId) => {
  try {
    return await JobPosting.find({ userId });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getJobPostingById = async (id) => {
  try {
    return await JobPosting.findById(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateJobPosting = async (id, data) => {
  try {
    return await JobPosting.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteJobPosting = async (id) => {
  try {
    return await JobPosting.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createJobPosting,
  getJobPostings,
  getJobPostingById,
  updateJobPosting,
  deleteJobPosting,
};
