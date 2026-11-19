const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    dayRange: { type: String, default: "Days 1-3" },
    title: { type: String, required: true, trim: true, maxlength: 140 },
    topic: { type: String, default: "", trim: true, maxlength: 100 },
    objective: { type: String, default: "" },
    codingTask: { type: String, default: "" },
    miniProject: { type: String, default: "" },
    revisionNote: { type: String, default: "" },
    priority: { type: Number, enum: [1, 2, 3], default: 2 },
    duration: { type: String, default: "3 days" },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },
    resources: { type: [String], default: [] },
  },
  { _id: false }
);

const careerPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    targetRole: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "Full Stack Developer",
    },
    durationDays: {
      type: Number,
      enum: [7, 15, 30, 60, 90],
      default: 30,
    },
    recommendations: [
      {
        role: { type: String, required: true },
        fitScore: { type: Number, min: 0, max: 100, default: 70 },
        rationale: { type: String, default: "" },
        missingSkills: { type: [String], default: [] },
      },
    ],
    roadmapMilestones: {
      type: [milestoneSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CareerPlan", careerPlanSchema);
