const User = require("../models/User");
const Interview = require("../models/Interview");
const Resume = require("../models/resume");
const logger = require("../utils/logger");

const VALID_EXPERIENCE_LEVELS = new Set([
  "student",
  "entry",
  "mid",
  "senior",
  "lead",
]);
const VALID_CADENCES = new Set(["daily", "weekly", "none"]);

function isValidOptionalHttpUrl(value) {
  if (!value) return true;
  if (typeof value !== "string" || value.length > 300) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function sanitizeStringArray(input, maxItems, maxItemLength) {
  if (!Array.isArray(input)) return null;
  const seen = new Set();
  const out = [];
  for (const item of input) {
    if (typeof item !== "string") continue;
    const trimmed = item.trim().slice(0, maxItemLength);
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
    if (out.length >= maxItems) break;
  }
  return out;
}

function serializeProfile(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role || "student",
    profile: {
      headline: user.profile?.headline || "",
      bio: user.profile?.bio || "",
      experienceLevel: user.profile?.experienceLevel || "student",
      targetRoles: Array.isArray(user.profile?.targetRoles)
        ? user.profile.targetRoles
        : [],
      skills: Array.isArray(user.profile?.skills) ? user.profile.skills : [],
      education: user.profile?.education || "",
      location: user.profile?.location || "",
      linkedinUrl: user.profile?.linkedinUrl || "",
      githubUrl: user.profile?.githubUrl || "",
      portfolioUrl: user.profile?.portfolioUrl || "",
    },
    preferences: {
      emailReminders: user.preferences?.emailReminders ?? true,
      reminderCadence: user.preferences?.reminderCadence || "weekly",
      voiceInterviewsEnabled: user.preferences?.voiceInterviewsEnabled ?? true,
      videoInterviewsEnabled: user.preferences?.videoInterviewsEnabled ?? false,
    },
    consent: {
      aiProcessingAccepted: user.consent?.aiProcessingAccepted ?? true,
      aiProcessingAcceptedAt: user.consent?.aiProcessingAcceptedAt || null,
      localMediaOnly: user.consent?.localMediaOnly ?? true,
      analyticsOptIn: user.consent?.analyticsOptIn ?? false,
    },
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function computeProfileCompleteness(user) {
  const checks = [
    { key: "headline", label: "Add a professional headline", ok: Boolean(user.profile?.headline?.trim()) },
    { key: "targetRoles", label: "Set at least one target role", ok: (user.profile?.targetRoles?.length || 0) > 0 },
    { key: "skills", label: "List your core skills", ok: (user.profile?.skills?.length || 0) >= 3 },
    { key: "education", label: "Add your education background", ok: Boolean(user.profile?.education?.trim()) },
    { key: "bio", label: "Write a short career bio", ok: Boolean(user.profile?.bio?.trim()) },
  ];

  const completed = checks.filter((c) => c.ok).length;
  const percent = Math.round((completed / checks.length) * 100);
  const missing = checks.filter((c) => !c.ok).map((c) => c.label);

  return { percent, missing };
}

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: serializeProfile(user),
      completeness: computeProfileCompleteness(user),
    });
  } catch (error) {
    logger.error("profile_get_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "PROFILE_FETCH_FAILED",
      message: "Unable to load user profile",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    if (body.name !== undefined) {
      if (typeof body.name !== "string") {
        return res.status(400).json({
          success: false,
          code: "VALIDATION_ERROR",
          message: "Name must be a string",
        });
      }
      const trimmed = body.name.trim();
      if (trimmed.length < 2 || trimmed.length > 80) {
        return res.status(400).json({
          success: false,
          code: "VALIDATION_ERROR",
          message: "Name must be between 2 and 80 characters",
        });
      }
      user.name = trimmed;
    }

    if (body.profile && typeof body.profile === "object") {
      const p = body.profile;
      user.profile = user.profile || {};

      if (p.headline !== undefined) {
        if (typeof p.headline !== "string" || p.headline.trim().length > 140) {
          return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "Headline must be 140 characters or fewer",
          });
        }
        user.profile.headline = p.headline.trim();
      }

      if (p.bio !== undefined) {
        if (typeof p.bio !== "string" || p.bio.trim().length > 600) {
          return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "Bio must be 600 characters or fewer",
          });
        }
        user.profile.bio = p.bio.trim();
      }

      if (p.experienceLevel !== undefined) {
        if (!VALID_EXPERIENCE_LEVELS.has(p.experienceLevel)) {
          return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "Invalid experience level",
          });
        }
        user.profile.experienceLevel = p.experienceLevel;
      }

      if (p.education !== undefined) {
        if (typeof p.education !== "string" || p.education.trim().length > 200) {
          return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "Education must be 200 characters or fewer",
          });
        }
        user.profile.education = p.education.trim();
      }

      if (p.location !== undefined) {
        if (typeof p.location !== "string" || p.location.trim().length > 120) {
          return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "Location must be 120 characters or fewer",
          });
        }
        user.profile.location = p.location.trim();
      }

      if (p.targetRoles !== undefined) {
        const cleaned = sanitizeStringArray(p.targetRoles, 10, 60);
        if (!cleaned) {
          return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "targetRoles must be an array of strings",
          });
        }
        user.profile.targetRoles = cleaned;
      }

      if (p.skills !== undefined) {
        const cleaned = sanitizeStringArray(p.skills, 40, 50);
        if (!cleaned) {
          return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "skills must be an array of strings",
          });
        }
        user.profile.skills = cleaned;
      }

      for (const field of ["linkedinUrl", "githubUrl", "portfolioUrl"]) {
        if (p[field] !== undefined) {
          const val = typeof p[field] === "string" ? p[field].trim() : "";
          if (!isValidOptionalHttpUrl(val)) {
            return res.status(400).json({
              success: false,
              code: "VALIDATION_ERROR",
              message: `${field} must be a valid http(s) URL`,
            });
          }
          user.profile[field] = val;
        }
      }
    }

    if (body.preferences && typeof body.preferences === "object") {
      const pref = body.preferences;
      user.preferences = user.preferences || {};

      if (pref.emailReminders !== undefined) {
        user.preferences.emailReminders = Boolean(pref.emailReminders);
      }
      if (pref.reminderCadence !== undefined) {
        if (!VALID_CADENCES.has(pref.reminderCadence)) {
          return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "Invalid reminder cadence",
          });
        }
        user.preferences.reminderCadence = pref.reminderCadence;
      }
      if (pref.voiceInterviewsEnabled !== undefined) {
        user.preferences.voiceInterviewsEnabled = Boolean(
          pref.voiceInterviewsEnabled
        );
      }
      if (pref.videoInterviewsEnabled !== undefined) {
        user.preferences.videoInterviewsEnabled = Boolean(
          pref.videoInterviewsEnabled
        );
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: serializeProfile(user),
      completeness: computeProfileCompleteness(user),
    });
  } catch (error) {
    logger.error("profile_update_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "PROFILE_UPDATE_FAILED",
      message: "Unable to update profile",
    });
  }
};

const updateConsent = async (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    user.consent = user.consent || {};

    if (body.aiProcessingAccepted !== undefined) {
      user.consent.aiProcessingAccepted = Boolean(body.aiProcessingAccepted);
      if (user.consent.aiProcessingAccepted) {
        user.consent.aiProcessingAcceptedAt = new Date();
      }
    }
    if (body.localMediaOnly !== undefined) {
      user.consent.localMediaOnly = Boolean(body.localMediaOnly);
    }
    if (body.analyticsOptIn !== undefined) {
      user.consent.analyticsOptIn = Boolean(body.analyticsOptIn);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Privacy preferences saved",
      consent: serializeProfile(user).consent,
    });
  } catch (error) {
    logger.error("consent_update_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "CONSENT_UPDATE_FAILED",
      message: "Unable to save privacy preferences",
    });
  }
};

const exportMyData = async (req, res) => {
  try {
    const userId = req.user.id;
    const [user, interviews, resumes] = await Promise.all([
      User.findById(userId).select("-password"),
      Interview.find({ userId }).sort({ createdAt: -1 }),
      Resume.find({ userId }).sort({ updatedAt: -1 }),
    ]);

    if (!user) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      exportedAt: new Date().toISOString(),
      account: serializeProfile(user),
      interviews,
      resumes,
    });
  } catch (error) {
    logger.error("data_export_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "DATA_EXPORT_FAILED",
      message: "Unable to export account data",
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    if (body.confirmText !== "DELETE") {
      return res.status(400).json({
        success: false,
        code: "CONFIRMATION_REQUIRED",
        message: 'Type "DELETE" in confirmText to permanently delete your account',
      });
    }

    const userId = req.user.id;
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    await Promise.all([
      Interview.deleteMany({ userId }),
      Resume.deleteMany({ userId }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Account and associated data deleted permanently",
    });
  } catch (error) {
    logger.error("account_delete_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "ACCOUNT_DELETE_FAILED",
      message: "Unable to delete account",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateConsent,
  exportMyData,
  deleteAccount,
  serializeProfile,
  computeProfileCompleteness,
};
