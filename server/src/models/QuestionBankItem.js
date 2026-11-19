const mongoose = require("mongoose");

const questionBankItemSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    topic: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "Core Concepts",
    },
    interviewType: {
      type: String,
      enum: ["technical", "hr", "behavioral", "mixed", "coding"],
      default: "technical",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuestionBankItem", questionBankItemSchema);
