const Interview = require("../models/Interview");
const Resume = require("../models/resume");
const JobApplication = require("../models/JobApplication");
const CareerPlan = require("../models/CareerPlan");
const Activity = require("../models/Activity");
const logger = require("../utils/logger");

function cutoffForRange(range) {
  const now = Date.now();
  if (range === "7d") return new Date(now - 7 * 24 * 60 * 60 * 1000);
  if (range === "30d") return new Date(now - 30 * 24 * 60 * 60 * 1000);
  if (range === "90d") return new Date(now - 90 * 24 * 60 * 60 * 1000);
  return null;
}

exports.getAnalyticsOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    const range = ["7d", "30d", "90d", "all"].includes(req.query.range)
      ? req.query.range
      : "30d";
    const cutoff = cutoffForRange(range);
    const dateFilter = cutoff ? { createdAt: { $gte: cutoff } } : {};

    const [interviews, resumes, jobs, careerPlan, activities] = await Promise.all([
      Interview.find({ userId, ...dateFilter }).sort({ createdAt: 1 }).limit(100),
      Resume.find({ userId, ...dateFilter }).sort({ createdAt: 1 }).limit(30),
      JobApplication.find({ userId, ...dateFilter }).sort({ createdAt: 1 }).limit(50),
      CareerPlan.findOne({ userId }),
      Activity.find({ userId }).sort({ createdAt: -1 }).limit(12),
    ]);

    const completedInterviews = interviews.filter((i) => i.isComplete);

    const interviewTrend = completedInterviews.map((item) => ({
      id: String(item._id),
      date: new Date(item.createdAt).toISOString().slice(0, 10),
      domain: item.domain,
      score: item.score || 0,
      mode: item.mode || "adaptive",
    }));

    const domainMap = new Map();
    const topicMap = new Map();

    for (const item of completedInterviews) {
      const dKey = item.domain || "General";
      const dEntry = domainMap.get(dKey) || { domain: dKey, sum: 0, count: 0, best: 0 };
      dEntry.sum += item.score || 0;
      dEntry.count += 1;
      if ((item.score || 0) > dEntry.best) dEntry.best = item.score || 0;
      domainMap.set(dKey, dEntry);

      for (const t of item.report?.topics || []) {
        const tEntry = topicMap.get(t.topic) || { topic: t.topic, sum: 0, count: 0 };
        tEntry.sum += Number(t.percent) || 0;
        tEntry.count += 1;
        topicMap.set(t.topic, tEntry);
      }
    }

    const domainPerformance = [...domainMap.values()].map((d) => ({
      domain: d.domain,
      averageScore: Math.round(d.sum / Math.max(1, d.count)),
      bestScore: d.best,
      attempts: d.count,
    }));

    const topicBreakdown = [...topicMap.values()]
      .map((t) => ({
        topic: t.topic,
        averagePercent: Math.round(t.sum / Math.max(1, t.count)),
        attempts: t.count,
      }))
      .sort((a, b) => b.averagePercent - a.averagePercent);

    const resumeQualityHistory = resumes.map((r) => ({
      id: String(r._id),
      version: r.version || 1,
      name: r.originalName,
      date: new Date(r.createdAt).toISOString().slice(0, 10),
      atsScore: r.atsReport?.overallScore ?? 0,
      skillCount: r.parsed?.skills?.length || 0,
    }));

    const jobMatches = jobs
      .filter((j) => typeof j.matchScore === "number")
      .map((j) => ({
        id: String(j._id),
        label: `${j.company} (${j.role})`,
        matchScore: j.matchScore,
        status: j.status,
      }));

    const milestones = careerPlan?.roadmapMilestones || [];
    const roadmapStats = {
      durationDays: careerPlan?.durationDays || 30,
      done: milestones.filter((m) => m.status === "done").length,
      inProgress: milestones.filter((m) => m.status === "in_progress").length,
      todo: milestones.filter((m) => m.status === "todo").length,
      total: milestones.length,
    };

    return res.status(200).json({
      success: true,
      range,
      summary: {
        completedInterviews: completedInterviews.length,
        averageInterviewScore: completedInterviews.length
          ? Math.round(
              completedInterviews.reduce((s, i) => s + (i.score || 0), 0) /
                completedInterviews.length
            )
          : null,
        resumesAnalyzed: resumes.length,
        trackedJobs: jobs.length,
      },
      interviewTrend,
      domainPerformance,
      topicBreakdown,
      resumeQualityHistory,
      jobMatches,
      roadmapStats,
      recentActivities: activities,
    });
  } catch (error) {
    logger.error("analytics_overview_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "ANALYTICS_FETCH_FAILED",
      message: "Unable to load analytics overview.",
    });
  }
};
