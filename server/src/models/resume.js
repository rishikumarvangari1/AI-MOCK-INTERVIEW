const mongoose = require("mongoose");

const jdMatchSchema = new mongoose.Schema(
  {
    targetRole: { type: String, trim: true, maxlength: 120, default: "" },
    jobDescriptionSnippet: { type: String, default: "" },
    matchScore: { type: Number, min: 0, max: 100, default: 0 },
    matchedKeywords: { type: [String], default: [] },
    missingKeywords: { type: [String], default: [] },
    suggestions: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const rewriteSchema = new mongoose.Schema(
  {
    targetRole: { type: String, trim: true, maxlength: 120, default: "" },
    summaryRewrite: { type: String, default: "" },
    bulletRewrites: [
      {
        original: { type: String, default: "" },
        improved: { type: String, default: "" },
        rationale: { type: String, default: "" },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    version: {
      type: Number,
      default: 1,
      min: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    fileHash: {
      type: String,
      default: "",
      index: true,
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    mimeType: {
      type: String,
      required: true,
    },
    fileSizeBytes: {
      type: Number,
      default: 0,
      min: 0,
    },
    resumeText: {
      type: String,
      required: true,
    },
    characterCount: {
      type: Number,
      default: 0,
    },
    wordCount: {
      type: Number,
      default: 0,
    },
    parsed: {
      contact: {
        hasEmail: { type: Boolean, default: false },
        hasPhone: { type: Boolean, default: false },
        hasLinkedin: { type: Boolean, default: false },
        hasGithub: { type: Boolean, default: false },
      },
      sections: { type: [String], default: [] },
      skills: { type: [String], default: [] },
      bulletCount: { type: Number, default: 0 },
      quantifiedBulletCount: { type: Number, default: 0 },
      experienceYearsEstimate: { type: Number, default: null },
    },
    analysis: {
      type: String,
      default: "",
    },
    atsReport: {
      overallScore: { type: Number, min: 0, max: 100, default: null },
      sectionScores: {
        formatting: { type: Number, min: 0, max: 100, default: 0 },
        impact: { type: Number, min: 0, max: 100, default: 0 },
        keywords: { type: Number, min: 0, max: 100, default: 0 },
        completeness: { type: Number, min: 0, max: 100, default: 0 },
        clarity: { type: Number, min: 0, max: 100, default: 0 },
      },
      strengths: { type: [String], default: [] },
      weaknesses: { type: [String], default: [] },
      missingInfo: { type: [String], default: [] },
      atsSuggestions: { type: [String], default: [] },
      recommendedRoles: { type: [String], default: [] },
      actionPlan: { type: [String], default: [] },
      analyzedAt: { type: Date, default: null },
    },
    jdMatches: {
      type: [jdMatchSchema],
      default: [],
    },
    domainRecommendations: {
      type: [
        {
          domainId: { type: String, required: true },
          domain: { type: String, required: true },
          matchPercentage: { type: Number, min: 0, max: 100, default: 0 },
          supportingSkills: { type: [String], default: [] },
          missingSkills: { type: [String], default: [] },
          rationale: { type: String, default: "" },
          uncertaintyNote: { type: String, default: "" },
        },
      ],
      default: [],
    },
    rewrites: {
      type: [rewriteSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

resumeSchema.index({ userId: 1, createdAt: -1 });
resumeSchema.index({ userId: 1, isActive: 1 });

module.exports = mongoose.model("resume", resumeSchema);
