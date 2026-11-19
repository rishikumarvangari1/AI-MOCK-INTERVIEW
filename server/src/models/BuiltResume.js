const mongoose = require("mongoose");

const builtResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "My ATS Resume",
    },
    template: {
      type: String,
      enum: ["classic", "modern", "compact"],
      default: "classic",
    },
    contact: {
      fullName: { type: String, trim: true, maxlength: 100, default: "" },
      email: { type: String, trim: true, maxlength: 160, default: "" },
      phone: { type: String, trim: true, maxlength: 40, default: "" },
      location: { type: String, trim: true, maxlength: 120, default: "" },
      linkedin: { type: String, trim: true, maxlength: 240, default: "" },
      github: { type: String, trim: true, maxlength: 240, default: "" },
      portfolio: { type: String, trim: true, maxlength: 240, default: "" },
    },
    summary: {
      type: String,
      trim: true,
      maxlength: 1200,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: [
      {
        company: { type: String, trim: true, maxlength: 120, default: "" },
        role: { type: String, trim: true, maxlength: 120, default: "" },
        period: { type: String, trim: true, maxlength: 80, default: "" },
        bullets: { type: [String], default: [] },
      },
    ],
    projects: [
      {
        name: { type: String, trim: true, maxlength: 120, default: "" },
        tech: { type: String, trim: true, maxlength: 200, default: "" },
        bullets: { type: [String], default: [] },
      },
    ],
    education: [
      {
        institution: { type: String, trim: true, maxlength: 160, default: "" },
        degree: { type: String, trim: true, maxlength: 160, default: "" },
        period: { type: String, trim: true, maxlength: 80, default: "" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BuiltResume", builtResumeSchema);
