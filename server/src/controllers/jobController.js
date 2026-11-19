const JobApplication = require("../models/JobApplication");
const Resume = require("../models/resume");
const { computeKeywordMatch } = require("../services/resumeParserService");
const logger = require("../utils/logger");

const VALID_STATUSES = new Set([
  "saved",
  "applied",
  "interviewing",
  "offer",
  "rejected",
]);

function isValidOptionalUrl(value) {
  if (!value) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

exports.listJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const filter = { userId };
    if (req.query.status && VALID_STATUSES.has(req.query.status)) {
      filter.status = req.query.status;
    }

    const [jobs, total] = await Promise.all([
      JobApplication.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit),
      JobApplication.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      jobs,
    });
  } catch (error) {
    logger.error("jobs_list_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "JOBS_LIST_FAILED",
      message: "Unable to load tracked jobs.",
    });
  }
};

exports.createJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Company and role are required.",
      });
    }

    const jobUrl = typeof body.jobUrl === "string" ? body.jobUrl.trim() : "";
    if (!isValidOptionalUrl(jobUrl)) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "jobUrl must be a valid http(s) URL.",
      });
    }

    const status = VALID_STATUSES.has(body.status) ? body.status : "saved";
    const jobDescription =
      typeof body.jobDescription === "string"
        ? body.jobDescription.trim().slice(0, 15000)
        : "";

    let matchScore = null;
    let matchedKeywords = [];
    let missingKeywords = [];

    if (jobDescription.length >= 20) {
      const activeResume =
        (await Resume.findOne({ userId, isActive: true }).sort({ updatedAt: -1 })) ||
        (await Resume.findOne({ userId }).sort({ updatedAt: -1 }));
      if (activeResume) {
        const match = computeKeywordMatch(
          activeResume.resumeText,
          activeResume.parsed?.skills || [],
          jobDescription
        );
        matchScore = match.matchScore;
        matchedKeywords = match.matchedKeywords;
        missingKeywords = match.missingKeywords;
      }
    }

    const job = await JobApplication.create({
      userId,
      company: company.slice(0, 120),
      role: role.slice(0, 140),
      location:
        typeof body.location === "string" && body.location.trim()
          ? body.location.trim().slice(0, 120)
          : "Remote",
      jobUrl,
      jobDescription,
      status,
      matchScore,
      matchedKeywords,
      missingKeywords,
      notes:
        typeof body.notes === "string" ? body.notes.trim().slice(0, 2000) : "",
      appliedAt: status === "applied" ? new Date() : null,
    });

    return res.status(201).json({
      success: true,
      message: "Job application added.",
      job,
    });
  } catch (error) {
    logger.error("job_create_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "JOB_CREATE_FAILED",
      message: "Unable to save job application.",
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;
    const body = req.body && typeof req.body === "object" ? req.body : {};

    const job = await JobApplication.findOne({ _id: jobId, userId });
    if (!job) {
      return res.status(404).json({
        success: false,
        code: "NOT_FOUND",
        message: "Job application not found.",
      });
    }

    if (body.status !== undefined) {
      if (!VALID_STATUSES.has(body.status)) {
        return res.status(400).json({
          success: false,
          code: "VALIDATION_ERROR",
          message: "Invalid application status.",
        });
      }
      job.status = body.status;
      if (body.status === "applied" && !job.appliedAt) {
        job.appliedAt = new Date();
      }
    }

    if (typeof body.notes === "string") {
      job.notes = body.notes.trim().slice(0, 2000);
    }
    if (typeof body.location === "string" && body.location.trim()) {
      job.location = body.location.trim().slice(0, 120);
    }

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job application updated.",
      job,
    });
  } catch (error) {
    logger.error("job_update_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "JOB_UPDATE_FAILED",
      message: "Unable to update job application.",
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;
    const deleted = await JobApplication.findOneAndDelete({
      _id: jobId,
      userId,
    });
    if (!deleted) {
      return res.status(404).json({
        success: false,
        code: "NOT_FOUND",
        message: "Job application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job application deleted.",
      deletedId: String(deleted._id),
    });
  } catch (error) {
    logger.error("job_delete_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "JOB_DELETE_FAILED",
      message: "Unable to delete job application.",
    });
  }
};
