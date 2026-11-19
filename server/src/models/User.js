const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      maxlength: 254,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    resetPasswordTokenHash: {
      type: String,
      default: null,
      select: false,
    },
    resetPasswordExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
    profile: {
      headline: { type: String, trim: true, maxlength: 140, default: "" },
      bio: { type: String, trim: true, maxlength: 600, default: "" },
      experienceLevel: {
        type: String,
        enum: ["student", "entry", "mid", "senior", "lead"],
        default: "student",
      },
      targetRoles: {
        type: [String],
        default: [],
      },
      skills: {
        type: [String],
        default: [],
      },
      education: { type: String, trim: true, maxlength: 200, default: "" },
      location: { type: String, trim: true, maxlength: 120, default: "" },
      linkedinUrl: { type: String, trim: true, maxlength: 300, default: "" },
      githubUrl: { type: String, trim: true, maxlength: 300, default: "" },
      portfolioUrl: { type: String, trim: true, maxlength: 300, default: "" },
    },
    preferences: {
      emailReminders: { type: Boolean, default: true },
      reminderCadence: {
        type: String,
        enum: ["daily", "weekly", "none"],
        default: "weekly",
      },
      voiceInterviewsEnabled: { type: Boolean, default: true },
      videoInterviewsEnabled: { type: Boolean, default: false },
    },
    consent: {
      aiProcessingAccepted: { type: Boolean, default: true },
      aiProcessingAcceptedAt: { type: Date, default: Date.now },
      localMediaOnly: { type: Boolean, default: true },
      analyticsOptIn: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
