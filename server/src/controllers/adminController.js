const User = require("../models/User");
const Interview = require("../models/Interview");
const Resume = require("../models/resume");
const JobApplication = require("../models/JobApplication");
const AdminAuditLog = require("../models/AdminAuditLog");
const QuestionBankItem = require("../models/QuestionBankItem");
const { DOMAINS } = require("../config/domains");
const { validateConfig } = require("../config/env");
const logger = require("../utils/logger");

async function recordAudit(actorId, action, targetType, targetId, summary) {
  try {
    await AdminAuditLog.create({
      actorId,
      action,
      targetType,
      targetId: String(targetId || ""),
      summary,
    });
  } catch {
    // Do not break primary admin flow if audit store fails in unit test stub
  }
}

exports.getAdminOverview = async (req, res) => {
  try {
    const [totalUsers, totalInterviews, completedInterviews, totalResumes, totalJobs] =
      await Promise.all([
        User.countDocuments({}),
        Interview.countDocuments({}),
        Interview.countDocuments({ isComplete: true }),
        Resume.countDocuments({}),
        JobApplication.countDocuments({}),
      ]);

    const configCheck = validateConfig({ requireDatabase: false });

    return res.status(200).json({
      success: true,
      metrics: {
        totalUsers,
        totalInterviews,
        completedInterviews,
        totalResumes,
        totalJobs,
        domainCount: DOMAINS.length,
      },
      aiProviders: configCheck.providers,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error("admin_overview_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "ADMIN_OVERVIEW_FAILED",
      message: "Unable to load admin overview.",
    });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({})
        .select("name email role createdAt updatedAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments({}),
    ]);

    return res.status(200).json({
      success: true,
      count: users.length,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      users: users.map((u) => ({
        id: String(u._id),
        name: u.name,
        email: u.email,
        role: u.role || "student",
        createdAt: u.createdAt,
      })),
    });
  } catch (error) {
    logger.error("admin_list_users_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "ADMIN_USERS_FAILED",
      message: "Unable to load users.",
    });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const role = req.body?.role;

    if (!["student", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: 'Role must be "student" or "admin".',
      });
    }

    if (String(userId) === String(req.user.id) && role !== "admin") {
      return res.status(400).json({
        success: false,
        code: "SELF_DEMOTION_BLOCKED",
        message: "Administrators cannot remove their own admin role.",
      });
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: { role } },
      { new: true }
    ).select("name email role createdAt");

    if (!updated) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found.",
      });
    }

    await recordAudit(
      req.user.id,
      "USER_ROLE_UPDATED",
      "user",
      updated._id,
      `Updated ${updated.email} role to ${role}`
    );

    logger.info("admin_role_changed", {
      requestId: req.requestId,
      actorId: req.user.id,
      targetUserId: String(updated._id),
      newRole: role,
    });

    return res.status(200).json({
      success: true,
      message: "User role updated.",
      user: {
        id: String(updated._id),
        name: updated.name,
        email: updated.email,
        role: updated.role,
      },
    });
  } catch (error) {
    logger.error("admin_update_role_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "ADMIN_ROLE_UPDATE_FAILED",
      message: "Unable to update user role.",
    });
  }
};

exports.listAuditLogs = async (req, res) => {
  try {
    const logs = await AdminAuditLog.find({}).sort({ createdAt: -1 }).limit(40);
    return res.status(200).json({
      success: true,
      count: logs.length,
      logs,
    });
  } catch (error) {
    logger.error("admin_audit_logs_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "ADMIN_AUDIT_FAILED",
      message: "Unable to load audit logs.",
    });
  }
};

exports.listQuestionBank = async (req, res) => {
  try {
    const filter = {};
    if (typeof req.query.domainId === "string" && req.query.domainId.trim()) {
      filter.domainId = req.query.domainId.trim().toLowerCase();
    }
    const items = await QuestionBankItem.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);
    return res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    logger.error("admin_qbank_list_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "QUESTION_BANK_FETCH_FAILED",
      message: "Unable to load question bank.",
    });
  }
};

exports.createQuestionBankItem = async (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const domainId =
      typeof body.domainId === "string" ? body.domainId.trim().toLowerCase() : "";
    const text = typeof body.text === "string" ? body.text.trim() : "";

    if (!domainId || text.length < 10) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "domainId and a question text (at least 10 characters) are required.",
      });
    }

    const level = ["beginner", "intermediate", "advanced"].includes(body.level)
      ? body.level
      : "intermediate";
    const interviewType = [
      "technical",
      "hr",
      "behavioral",
      "mixed",
      "coding",
    ].includes(body.interviewType)
      ? body.interviewType
      : "technical";

    const item = await QuestionBankItem.create({
      domainId,
      text: text.slice(0, 1000),
      level,
      topic:
        typeof body.topic === "string" && body.topic.trim()
          ? body.topic.trim().slice(0, 120)
          : "Core Concepts",
      interviewType,
      createdBy: req.user.id,
    });

    await recordAudit(
      req.user.id,
      "QUESTION_BANK_ADDED",
      "question_bank",
      item._id,
      `Added ${level} ${domainId} question`
    );

    return res.status(201).json({
      success: true,
      message: "Question added to fallback bank.",
      item,
    });
  } catch (error) {
    logger.error("admin_qbank_create_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "QUESTION_BANK_CREATE_FAILED",
      message: "Unable to add question.",
    });
  }
};

exports.deleteQuestionBankItem = async (req, res) => {
  try {
    const deleted = await QuestionBankItem.findByIdAndDelete(req.params.itemId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        code: "NOT_FOUND",
        message: "Question bank item not found.",
      });
    }
    await recordAudit(
      req.user.id,
      "QUESTION_BANK_DELETED",
      "question_bank",
      deleted._id,
      `Deleted ${deleted.domainId} question`
    );
    return res.status(200).json({
      success: true,
      message: "Question deleted.",
    });
  } catch (error) {
    logger.error("admin_qbank_delete_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "QUESTION_BANK_DELETE_FAILED",
      message: "Unable to delete question.",
    });
  }
};
