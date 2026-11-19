const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "Remote",
    },
    jobUrl: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
    jobDescription: {
      type: String,
      default: "",
      maxlength: 15000,
    },
    status: {
      type: String,
      enum: ["saved", "applied", "interviewing", "offer", "rejected"],
      default: "saved",
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },
    matchedKeywords: {
      type: [String],
      default: [],
    },
    missingKeywords: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    appliedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

jobApplicationSchema.index({ userId: 1, updatedAt: -1 });

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
