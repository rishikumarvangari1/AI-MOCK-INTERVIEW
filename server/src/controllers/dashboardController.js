const User = require("../models/User");
const Interview = require("../models/Interview");
const Resume = require("../models/resume");
const { computeProfileCompleteness } = require("./profileController");
const logger = require("../utils/logger");

function buildDashboardSummary({ user, interviews, resumes }) {
  const safeInterviews = Array.isArray(interviews) ? interviews : [];
  const safeResumes = Array.isArray(resumes) ? resumes : [];

  const completed = safeInterviews.filter((item) => item.isComplete);
  const scored = completed.filter(
    (item) => typeof item.score === "number" && Number.isFinite(item.score)
  );

  const averageScore = scored.length
    ? Math.round(
        scored.reduce((sum, item) => sum + item.score, 0) / scored.length
      )
    : null;

  const bestScore = scored.length
    ? Math.max(...scored.map((item) => item.score))
    : null;

  const totalPracticeSeconds = safeInterviews.reduce(
    (sum, item) => sum + (Number(item.duration) || 0),
    0
  );

  const activeResume =
    safeResumes.find((item) => item.isActive) || safeResumes[0] || null;

  const latestAtsScore =
    typeof activeResume?.atsReport?.overallScore === "number"
      ? activeResume.atsReport.overallScore
      : null;

  const profileCompleteness = user
    ? computeProfileCompleteness(user)
    : { percent: 0, missing: [] };

  // Composite Career Readiness Score (0-100):
  // 50% interview performance, 30% resume readiness, 20% profile completeness
  const interviewComponent = averageScore !== null ? averageScore : 0;
  const resumeComponent =
    latestAtsScore !== null
      ? latestAtsScore
      : activeResume
        ? activeResume.analysis
          ? 70
          : 40
        : 0;

  const readinessScore = Math.round(
    interviewComponent * 0.5 +
      resumeComponent * 0.3 +
      profileCompleteness.percent * 0.2
  );

  // Per-domain progress map
  const domainMap = new Map();
  for (const item of safeInterviews) {
    const key = item.domain || "General";
    const entry = domainMap.get(key) || {
      domain: key,
      attempts: 0,
      completed: 0,
      scoreSum: 0,
      bestScore: 0,
    };
    entry.attempts += 1;
    if (item.isComplete) {
      entry.completed += 1;
      const sc = Number(item.score) || 0;
      entry.scoreSum += sc;
      if (sc > entry.bestScore) entry.bestScore = sc;
    }
    domainMap.set(key, entry);
  }

  const domainProgress = [...domainMap.values()]
    .map((entry) => ({
      domain: entry.domain,
      attempts: entry.attempts,
      completed: entry.completed,
      averageScore: entry.completed
        ? Math.round(entry.scoreSum / entry.completed)
        : 0,
      bestScore: entry.bestScore,
    }))
    .sort((a, b) => b.attempts - a.attempts)
    .slice(0, 6);

  const recentInterviews = safeInterviews.slice(0, 5).map((item) => ({
    id: String(item._id),
    domain: item.domain,
    score: item.score || 0,
    questionsAnswered: item.questionsAnswered || 0,
    duration: item.duration || 0,
    isComplete: Boolean(item.isComplete),
    createdAt: item.createdAt,
  }));

  const latestResume = activeResume
    ? {
        id: String(activeResume._id),
        originalName: activeResume.originalName,
        characterCount: activeResume.resumeText?.length || 0,
        hasAnalysis: Boolean(
          activeResume.analysis || activeResume.atsReport?.overallScore
        ),
        atsScore: latestAtsScore,
        uploadedAt: activeResume.updatedAt || activeResume.createdAt,
      }
    : null;

  return {
    stats: {
      totalInterviews: safeInterviews.length,
      completedInterviews: completed.length,
      averageScore,
      bestScore,
      totalPracticeSeconds,
      resumeCount: safeResumes.length,
      latestAtsScore,
      readinessScore,
    },
    recentInterviews,
    latestResume,
    domainProgress,
    profileCompleteness,
  };
}

const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const [user, interviews, resumes] = await Promise.all([
      User.findById(userId).select("-password"),
      Interview.find({ userId }).sort({ createdAt: -1 }).limit(50),
      Resume.find({ userId }).sort({ updatedAt: -1 }).limit(20),
    ]);

    if (!user) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    const summary = buildDashboardSummary({ user, interviews, resumes });

    return res.status(200).json({
      success: true,
      ...summary,
    });
  } catch (error) {
    logger.error("dashboard_summary_failed", {
      requestId: req.requestId,
      error,
    });
    return res.status(500).json({
      success: false,
      code: "DASHBOARD_FETCH_FAILED",
      message: "Unable to load dashboard summary",
    });
  }
};

module.exports = {
  getDashboardSummary,
  buildDashboardSummary,
};
