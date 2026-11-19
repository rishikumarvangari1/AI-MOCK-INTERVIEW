const crypto = require("node:crypto");
const CareerPlan = require("../models/CareerPlan");
const User = require("../models/User");
const Resume = require("../models/resume");
const Interview = require("../models/Interview");
const { DOMAINS } = require("../config/domains");
const { askAIJson } = require("../services/aiService");
const logger = require("../utils/logger");

const VALID_STATUSES = new Set(["todo", "in_progress", "done"]);
const VALID_DURATIONS = new Set([7, 15, 30, 60, 90]);

function buildSkillGapAnalysis(skillInventory, recommendations) {
  const strong = [];
  const intermediate = [];
  const beginner = [];
  const missing = [];
  const recommended = [];

  for (const item of skillInventory) {
    const base = {
      skill: item.skill,
      evidence:
        item.verifiedScore !== null
          ? `Assessed in mock interviews (${item.verifiedScore}%)`
          : item.sources.includes("resume")
            ? "Extracted from resume text (unassessed proficiency)"
            : "Listed in user profile (unassessed proficiency)",
      assessed: item.verifiedScore !== null,
      verifiedScore: item.verifiedScore,
      sources: item.sources,
      estimatedTime: item.verifiedScore !== null && item.verifiedScore >= 75 ? "Ongoing practice" : "1-2 weeks",
    };

    if (item.verifiedScore !== null) {
      if (item.verifiedScore >= 75) strong.push({ ...base, priority: "low" });
      else if (item.verifiedScore >= 50) intermediate.push({ ...base, priority: "medium" });
      else beginner.push({ ...base, priority: "high" });
    } else {
      intermediate.push({ ...base, priority: "medium" });
    }
  }

  const ownedLower = new Set(skillInventory.map((s) => s.skill.toLowerCase()));
  const topMissing = recommendations[0]?.missingSkills || [];
  for (const gap of topMissing) {
    if (!ownedLower.has(gap.toLowerCase())) {
      missing.push({
        skill: gap,
        evidence: "Not detected on resume or verified in interviews",
        assessed: false,
        priority: "high",
        whyItMatters: `Core requirement for ${recommendations[0]?.role || "your target role"}.`,
        exercises: [`Build a small hands-on exercise focused on ${gap}`],
        miniProject: `Create a portfolio feature demonstrating ${gap}`,
        estimatedTime: "1-2 weeks",
      });
    }
  }

  const secondarySkills = recommendations
    .slice(1, 3)
    .flatMap((r) => r.missingSkills || [])
    .filter(
      (s, i, arr) =>
        !ownedLower.has(s.toLowerCase()) &&
        !missing.some((m) => m.skill.toLowerCase() === s.toLowerCase()) &&
        arr.indexOf(s) === i
    )
    .slice(0, 5);

  for (const recSkill of secondarySkills) {
    recommended.push({
      skill: recSkill,
      evidence: "Recommended adjacent skill for career growth",
      assessed: false,
      priority: "medium",
      whyItMatters: "Broadens role eligibility across related engineering tracks.",
      estimatedTime: "1 week",
    });
  }

  return {
    disclaimer:
      "Keywords extracted from resumes indicate listed experience, not verified mastery. Complete domain interviews to verify proficiency.",
    strong,
    intermediate,
    beginner,
    missing,
    recommended,
  };
}

function buildTimedMilestones(targetRole, durationDays, recommendations, interviews) {
  const days = VALID_DURATIONS.has(Number(durationDays)) ? Number(durationDays) : 30;
  const totalSlots = days <= 7 ? 4 : days <= 15 ? 5 : days <= 30 ? 6 : 8;
  const stepDays = Math.max(1, Math.floor(days / totalSlots));

  const topics = [];
  for (const interview of interviews || []) {
    if (!interview.isComplete || !Array.isArray(interview.report?.roadmap)) continue;
    for (const item of interview.report.roadmap) {
      if (item?.topic && !topics.includes(item.topic)) topics.push(item.topic);
    }
  }
  for (const gap of recommendations[0]?.missingSkills || []) {
    if (!topics.includes(gap)) topics.push(gap);
  }
  const defaults = [
    `${targetRole} Core Fundamentals`,
    "Data Structures & Practical Coding",
    "System Design & Architecture",
    "Resume Impact & ATS Optimization",
    "Mock Interview Simulation & Review",
    "Portfolio Capstone & Final Revision",
  ];
  for (const d of defaults) {
    if (!topics.includes(d)) topics.push(d);
  }

  return topics.slice(0, totalSlots).map((topic, idx) => {
    const startDay = idx * stepDays + 1;
    const endDay = idx === totalSlots - 1 ? days : Math.min(days, (idx + 1) * stepDays);
    return {
      id: crypto.randomUUID(),
      dayRange: startDay === endDay ? `Day ${startDay}` : `Days ${startDay}-${endDay}`,
      title: idx === totalSlots - 1 ? `Revision & Mock Loop: ${topic}` : `Master ${topic}`,
      topic,
      objective: `Build demonstrable fluency in ${topic} tailored for ${targetRole} interviews.`,
      codingTask: `Solve 3 targeted coding or applied scenario exercises on ${topic}.`,
      miniProject: `Ship a small, documented example applying ${topic} end-to-end.`,
      revisionNote: `Summarize key trade-offs and common pitfalls in ${topic} in 5 bullets.`,
      priority: idx < 2 ? 1 : idx < 4 ? 2 : 3,
      duration: `${endDay - startDay + 1} day${endDay - startDay === 0 ? "" : "s"}`,
      status: "todo",
      resources: [
        `Official ${topic} documentation`,
        `Practice ${targetRole} mock interview on ${topic}`,
      ],
    };
  });
}

function buildSkillInventory({ user, resume, interviews }) {
  const skillMap = new Map();

  const addSkill = (name, source, score = null) => {
    const clean = String(name || "").trim();
    if (!clean) return;
    const key = clean.toLowerCase();
    const existing = skillMap.get(key) || {
      skill: clean,
      sources: new Set(),
      interviewScores: [],
    };
    existing.sources.add(source);
    if (typeof score === "number" && Number.isFinite(score)) {
      existing.interviewScores.push(score);
    }
    skillMap.set(key, existing);
  };

  for (const s of user?.profile?.skills || []) addSkill(s, "profile");
  for (const s of resume?.parsed?.skills || []) addSkill(s, "resume");

  for (const interview of interviews || []) {
    if (!interview.isComplete) continue;
    for (const topic of interview.report?.topics || []) {
      addSkill(topic.topic, "interview", topic.percent);
    }
  }

  return [...skillMap.values()]
    .map((entry) => {
      const avg = entry.interviewScores.length
        ? Math.round(
            entry.interviewScores.reduce((a, b) => a + b, 0) /
              entry.interviewScores.length
          )
        : null;
      const level =
        avg !== null
          ? avg >= 75
            ? "strong"
            : avg >= 50
              ? "developing"
              : "needs_focus"
          : entry.sources.has("resume")
            ? "listed_on_resume"
            : "self_reported";

      return {
        skill: entry.skill,
        sources: [...entry.sources],
        verifiedScore: avg,
        level,
      };
    })
    .sort((a, b) => (b.verifiedScore ?? -1) - (a.verifiedScore ?? -1));
}

function buildDeterministicRecommendations(skillInventory, targetRole) {
  const owned = new Set(skillInventory.map((s) => s.skill.toLowerCase()));

  return DOMAINS.map((domain) => {
    const focusTerms = domain.focus
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const matched = focusTerms.filter((term) =>
      [...owned].some((s) => term.toLowerCase().includes(s) || s.includes(term.toLowerCase()))
    );
    const missing = focusTerms.filter((t) => !matched.includes(t)).slice(0, 4);
    const baseFit = Math.min(
      95,
      Math.max(
        42,
        Math.round(45 + (matched.length / Math.max(1, focusTerms.length)) * 50)
      )
    );
    const roleBoost =
      targetRole && domain.title.toLowerCase().includes(targetRole.toLowerCase())
        ? 8
        : 0;

    return {
      role: domain.title,
      domainId: domain.id,
      fitScore: Math.min(98, baseFit + roleBoost),
      rationale:
        matched.length > 0
          ? `Matches your existing strengths in ${matched.slice(0, 3).join(", ")}.`
          : `High-growth career track focusing on ${domain.focus}.`,
      missingSkills: missing,
    };
  })
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 5);
}

function buildDeterministicMilestones(targetRole, recommendations, interviews) {
  const milestones = [];
  const topRec = recommendations[0];

  // Pull weak topics from completed interviews first
  for (const interview of interviews || []) {
    if (!interview.isComplete || !Array.isArray(interview.report?.roadmap)) continue;
    for (const item of interview.report.roadmap.slice(0, 3)) {
      if (milestones.some((m) => m.topic.toLowerCase() === String(item.topic).toLowerCase())) {
        continue;
      }
      milestones.push({
        id: crypto.randomUUID(),
        title: `Master ${item.topic}`,
        topic: item.topic,
        priority: [1, 2, 3].includes(item.priority) ? item.priority : 1,
        duration: item.duration || "1-2 weeks",
        status: "todo",
        resources: Array.isArray(item.resources) ? item.resources.slice(0, 3) : [],
      });
    }
  }

  for (const gap of topRec?.missingSkills || []) {
    if (milestones.length >= 6) break;
    milestones.push({
      id: crypto.randomUUID(),
      title: `Build hands-on proficiency in ${gap}`,
      topic: gap,
      priority: milestones.length < 2 ? 1 : 2,
      duration: "2 weeks",
      status: "todo",
      resources: [
        `Official ${gap} documentation`,
        `Build a portfolio project featuring ${gap} for ${targetRole}`,
      ],
    });
  }

  if (milestones.length === 0) {
    milestones.push(
      {
        id: crypto.randomUUID(),
        title: `Complete 3 ${targetRole} mock interviews`,
        topic: "Interview Readiness",
        priority: 1,
        duration: "1 week",
        status: "todo",
        resources: ["AI Mock Interview Studio"],
      },
      {
        id: crypto.randomUUID(),
        title: "Achieve 80+ ATS score in Resume Analyzer",
        topic: "Resume Optimization",
        priority: 1,
        duration: "3 days",
        status: "todo",
        resources: ["Resume Analyzer & JD Matcher"],
      }
    );
  }

  return milestones;
}

const getCareerOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    const [user, resume, interviews, existingPlan] = await Promise.all([
      User.findById(userId).select("-password"),
      Resume.findOne({ userId, isActive: true }).sort({ updatedAt: -1 }),
      Interview.find({ userId }).sort({ createdAt: -1 }).limit(20),
      CareerPlan.findOne({ userId }),
    ]);

    const targetRole =
      existingPlan?.targetRole ||
      user?.profile?.targetRoles?.[0] ||
      "Full Stack Developer";

    const skillInventory = buildSkillInventory({ user, resume, interviews });
    const deterministicRecs = buildDeterministicRecommendations(
      skillInventory,
      targetRole
    );

    let plan = existingPlan;
    if (!plan) {
      plan = await CareerPlan.create({
        userId,
        targetRole,
        durationDays: 30,
        recommendations: deterministicRecs,
        roadmapMilestones: buildTimedMilestones(
          targetRole,
          30,
          deterministicRecs,
          interviews
        ),
      });
    }

    const milestones = plan.roadmapMilestones || [];
    const doneCount = milestones.filter((m) => m.status === "done").length;
    const roadmapProgress = milestones.length
      ? Math.round((doneCount / milestones.length) * 100)
      : 0;
    const nextTask = milestones.find((m) => m.status !== "done") || null;
    const recs =
      plan.recommendations?.length > 0 ? plan.recommendations : deterministicRecs;

    return res.status(200).json({
      success: true,
      targetRole: plan.targetRole,
      durationDays: plan.durationDays || 30,
      skillInventory,
      skillGapAnalysis: buildSkillGapAnalysis(skillInventory, recs),
      recommendations: recs,
      roadmap: {
        durationDays: plan.durationDays || 30,
        progress: roadmapProgress,
        completedCount: doneCount,
        totalCount: milestones.length,
        nextTaskId: nextTask?.id || null,
        milestones,
      },
    });
  } catch (error) {
    logger.error("career_overview_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "CAREER_OVERVIEW_FAILED",
      message: "Unable to load career intelligence overview.",
    });
  }
};

const generateCareerPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const requestedRole =
      typeof body.targetRole === "string" && body.targetRole.trim()
        ? body.targetRole.trim().slice(0, 120)
        : "";

    const [user, resume, interviews] = await Promise.all([
      User.findById(userId).select("-password"),
      Resume.findOne({ userId, isActive: true }).sort({ updatedAt: -1 }),
      Interview.find({ userId }).sort({ createdAt: -1 }).limit(15),
    ]);

    const requestedDuration = Number(body.durationDays);
    const durationDays = VALID_DURATIONS.has(requestedDuration)
      ? requestedDuration
      : 30;

    const targetRole =
      requestedRole || user?.profile?.targetRoles?.[0] || "Full Stack Developer";
    const skillInventory = buildSkillInventory({ user, resume, interviews });
    const fallbackRecs = buildDeterministicRecommendations(
      skillInventory,
      targetRole
    );
    const fallbackMilestones = buildTimedMilestones(
      targetRole,
      durationDays,
      fallbackRecs,
      interviews
    );

    let recommendations = fallbackRecs;
    let roadmapMilestones = fallbackMilestones;

    try {
      const aiPlan = await askAIJson(
        `You are a career intelligence strategist. Return ONLY valid JSON with no markdown:
{
  "recommendations": [{"role":"...","fitScore":80,"rationale":"...","missingSkills":["..."]}],
  "milestones": [{"title":"...","topic":"...","priority":1,"duration":"2 weeks","resources":["..."]}]
}`,
        JSON.stringify({
          targetRole,
          experienceLevel: user?.profile?.experienceLevel || "student",
          skills: skillInventory.slice(0, 20),
          completedInterviews: interviews
            .filter((i) => i.isComplete)
            .map((i) => ({ domain: i.domain, score: i.score })),
        }),
        { maxTokens: 1400, temperature: 0.25 }
      );

      if (Array.isArray(aiPlan?.recommendations) && aiPlan.recommendations.length) {
        recommendations = aiPlan.recommendations.slice(0, 5).map((r) => ({
          role: String(r.role || targetRole).trim(),
          fitScore: Math.max(0, Math.min(100, Math.round(Number(r.fitScore) || 70))),
          rationale: String(r.rationale || "").trim(),
          missingSkills: Array.isArray(r.missingSkills)
            ? r.missingSkills.map(String).slice(0, 6)
            : [],
        }));
      }

      if (Array.isArray(aiPlan?.milestones) && aiPlan.milestones.length) {
        roadmapMilestones = aiPlan.milestones.slice(0, 8).map((m) => ({
          id: crypto.randomUUID(),
          title: String(m.title || "").trim(),
          topic: String(m.topic || targetRole).trim(),
          priority: [1, 2, 3].includes(Number(m.priority)) ? Number(m.priority) : 2,
          duration: String(m.duration || "2 weeks").trim(),
          status: "todo",
          resources: Array.isArray(m.resources)
            ? m.resources.map(String).slice(0, 4)
            : [],
        })).filter((m) => m.title);
      }
    } catch {
      // Deterministic recommendations & milestones remain intact as reliable fallback
    }

    const plan = await CareerPlan.findOneAndUpdate(
      { userId },
      {
        userId,
        targetRole,
        durationDays,
        recommendations,
        roadmapMilestones,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      success: true,
      message: `${durationDays}-day career plan & learning roadmap updated.`,
      targetRole: plan.targetRole,
      durationDays: plan.durationDays || durationDays,
      skillInventory,
      skillGapAnalysis: buildSkillGapAnalysis(skillInventory, plan.recommendations),
      recommendations: plan.recommendations,
      roadmap: {
        durationDays: plan.durationDays || durationDays,
        progress: 0,
        completedCount: 0,
        totalCount: plan.roadmapMilestones.length,
        nextTaskId: plan.roadmapMilestones[0]?.id || null,
        milestones: plan.roadmapMilestones,
      },
    });
  } catch (error) {
    logger.error("career_generate_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "CAREER_GENERATE_FAILED",
      message: "Unable to generate career plan.",
    });
  }
};

const updateRoadmapMilestone = async (req, res) => {
  try {
    const userId = req.user.id;
    const { milestoneId } = req.params;
    const status = req.body?.status;

    if (!VALID_STATUSES.has(status)) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: 'Status must be "todo", "in_progress", or "done".',
      });
    }

    const plan = await CareerPlan.findOne({ userId });
    if (!plan) {
      return res.status(404).json({
        success: false,
        code: "NOT_FOUND",
        message: "Career plan not found.",
      });
    }

    const target = (plan.roadmapMilestones || []).find(
      (m) => m.id === milestoneId
    );
    if (!target) {
      return res.status(404).json({
        success: false,
        code: "NOT_FOUND",
        message: "Milestone not found.",
      });
    }

    target.status = status;
    await plan.save();

    const doneCount = plan.roadmapMilestones.filter(
      (m) => m.status === "done"
    ).length;
    const progress = plan.roadmapMilestones.length
      ? Math.round((doneCount / plan.roadmapMilestones.length) * 100)
      : 0;

    return res.status(200).json({
      success: true,
      message: "Milestone status updated.",
      progress,
      milestone: target,
    });
  } catch (error) {
    logger.error("roadmap_milestone_update_failed", {
      requestId: req.requestId,
      error,
    });
    return res.status(500).json({
      success: false,
      code: "ROADMAP_UPDATE_FAILED",
      message: "Unable to update milestone.",
    });
  }
};

module.exports = {
  getCareerOverview,
  generateCareerPlan,
  updateRoadmapMilestone,
  buildSkillInventory,
};
