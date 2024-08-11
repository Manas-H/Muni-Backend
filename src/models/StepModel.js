const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    step: { type: Number, required: true },
    title: { type: String, maxlength: 50, required: true },
    description: { type: String, maxlength: 100, required: true },
  },
  { timestamps: true }
);

const Step = mongoose.model("Step", stepSchema);

module.exports = Step;
