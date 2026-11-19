const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "ai"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const StructuredQuestionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    text: { type: String, required: true },
    domain: { type: String, default: "" },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    topic: { type: String, default: "General" },
    expectedConcepts: { type: [String], default: [] },
    referenceAnswer: { type: String, default: "" },
    evaluationCriteria: { type: String, default: "" },
    source: {
      type: String,
      enum: ["ai", "fallback_bank"],
      default: "ai",
    },
    sampleInput: { type: String, default: "" },
    sampleOutput: { type: String, default: "" },
    testCases: [
      {
        input: { type: String, default: "" },
        expected: { type: String, default: "" },
      },
    ],
  },
  { _id: false }
);

const IntegrityEventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "tab_switch",
        "window_blur",
        "fullscreen_exit",
        "paste_blocked",
        "copy_blocked",
        "timer_expired",
        "network_interruption",
      ],
      required: true,
    },
    detail: { type: String, default: "", maxlength: 300 },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const EvaluationSchema = new mongoose.Schema(
  {
    questionId: { type: Number, required: true },
    score: { type: Number, min: 0, max: 10, default: 0 },
    maxScore: { type: Number, default: 10 },
    finalScore: { type: Number, min: 0, max: 100, default: 0 },
    semanticRelevance: { type: Number, min: 0, max: 100, default: 0 },
    technicalCorrectness: { type: Number, min: 0, max: 100, default: 0 },
    completeness: { type: Number, min: 0, max: 100, default: 0 },
    clarity: { type: Number, min: 0, max: 100, default: 0 },
    practicalApplication: { type: Number, min: 0, max: 100, default: 0 },
    classification: {
      type: String,
      enum: [
        "Excellent",
        "Very Good",
        "Good",
        "Average",
        "Needs Improvement",
        "Poor",
        "Incorrect",
      ],
      default: "Average",
    },
    verdict: {
      type: String,
      enum: ["correct", "partial", "incorrect"],
      default: "partial",
    },
    expectedAnswer: { type: String, default: "" },
    keyConcepts: { type: [String], default: [] },
    missingConcepts: { type: [String], default: [] },
    mistakes: { type: [String], default: [] },
    correctnessAnalysis: { type: String, default: "" },
    didWell: { type: String, default: "" },
    improve: { type: String, default: "" },
    suggestedAnswer: { type: String, default: "" },
  },
  { _id: false }
);

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      trim: true,
      index: true,
      default: "",
    },
    domainId: {
      type: String,
      trim: true,
      default: "fullstack",
    },
    domain: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    mode: {
      type: String,
      enum: ["adaptive", "structured"],
      default: "structured",
    },
    interviewType: {
      type: String,
      enum: ["technical", "hr", "behavioral", "mixed", "coding"],
      default: "technical",
    },
    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard", "beginner", "intermediate", "advanced", "mixed"],
      default: "mixed",
    },
    codingLanguage: {
      type: String,
      trim: true,
      default: "javascript",
    },
    questionSource: {
      type: String,
      enum: ["ai", "fallback_bank"],
      default: "ai",
    },
    jobDescriptionSnippet: {
      type: String,
      default: "",
      maxlength: 1200,
    },
    questionCount: {
      type: Number,
      default: 10,
      min: 1,
      max: 10,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    timeLimitSeconds: {
      type: Number,
      default: 1800,
      min: 60,
      max: 7200,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    answerUpdatedAt: {
      type: [Number],
      default: [],
    },
    integrityEvents: {
      type: [IntegrityEventSchema],
      default: [],
    },
    integritySummary: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    readinessStatus: {
      type: String,
      enum: ["PENDING", "RECOMMENDED", "NEEDS IMPROVEMENT"],
      default: "PENDING",
    },
    skillGaps: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    domainRecommendations: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    learningRoadmap: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "resume",
      default: null,
    },
    resumeTailored: {
      type: Boolean,
      default: false,
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    duration: {
      type: Number,
      default: 0,
      min: 0,
    },
    questionsAnswered: {
      type: Number,
      default: 0,
      min: 0,
    },
    messages: [MessageSchema],
    questions: {
      type: [StructuredQuestionSchema],
      default: [],
    },
    answers: {
      type: [String],
      default: [],
    },
    evaluations: {
      type: [EvaluationSchema],
      default: [],
    },
    report: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    feedback: {
      type: String,
      default: "",
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

interviewSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Interview", interviewSchema);
