const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    jobTitle: { type: String, required: true },
    location: { type: String },
    designation: { type: String },
    industryType: { type: String },
    jobPostingType: { type: String },
    jobDescription: { type: String, required: true },
    educationDetails: {
      programs: [{ value: String, label: String }],
      specializations: [{ value: String, label: String }],
      passoutYear: { value: Number, label: Number },
      totalRequirement: { type: String },
    },
    selectedSkills: [{ type: String }],
    cutOffCriteria: [
      {
        criteria: { type: String, required: true },
        percentage: { type: String, required: true },
      },
    ],
    experience: {
      min: { type: String, required: true },
      max: { type: String, required: true },
    },
    salary: {
      min: { type: String, required: true },
      max: { type: String, required: true },
      currency: { type: String },
    },
    contactName: { type: String, required: true },
    emailId: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    expiryDate: { type: Date },
    jobVisibility: { type: String, required: true },
    assessments: {
      selectedAssessments: [
        {
          label: { type: String },
          value: {
            title: { type: String },
            questions: { type: Number },
            minutes: { type: Number },
          },
        },
      ],
      keepTestOpenFor: { type: String },
    },
    advancedFields: {
      hostInstituteName: { type: String },
      instituteLogo: { type: Object },
      bannerImage: { type: Object },
      campusRecruitingDate: { type: Date },
      applicationDeadline: { type: Date },
      mode: { type: String },
      processDates: {
        preplacement: { from: Date, to: Date },
        shortlisting: { from: Date, to: Date },
        aptitudeTest: { from: Date, to: Date },
        caseStudy: { from: Date, to: Date },
        technicalTestMCQ: { from: Date, to: Date },
        codingTest: { from: Date, to: Date },
        hackathon: { from: Date, to: Date },
        groupDiscussion: { from: Date, to: Date },
        interview: { from: Date, to: Date },
      },
      keywords: { type: String },
    },
    jobPreference: {
      fullTime: { type: Boolean, default: false },
      partTime: { type: Boolean, default: false },
      internship: { type: Boolean, default: false },
      remote: { type: Boolean, default: false },
      workFromHome: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const JobPosting = mongoose.model("JobPosting", jobPostingSchema);

module.exports = JobPosting;
