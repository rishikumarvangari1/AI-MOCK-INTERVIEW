const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "resume_upload",
        "resume_analyze",
        "jd_match",
        "interview_start",
        "interview_complete",
        "roadmap_update",
        "job_tracked",
        "profile_update",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140,
    },
    detail: {
      type: String,
      trim: true,
      maxlength: 280,
      default: "",
    },
    href: {
      type: String,
      trim: true,
      default: "/dashboard",
    },
  },
  { timestamps: true }
);

activitySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Activity", activitySchema);
