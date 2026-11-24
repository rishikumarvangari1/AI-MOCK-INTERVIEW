const {
  WEIGHTS,
  SELECTION_DISCLAIMER,
  DOMAIN_SUITABILITY_DISCLAIMER,
  INTEGRITY_NOTE,
  performanceBandFor,
  readinessForPercentage,
  fitForPercentage,
  computeWeightedQuestionScore,
  calculateOverallScore,
  computeIntegritySummary,
  generateInterviewQuestions,
  evaluateCompleteInterview,
  analyzeSkillGaps,
  recommendCareerDomains,
  generateLearningRoadmap,
} = require("./interviewEvaluationEngine");
const { askAI, askAIJson, sanitizePromptInput } = require("./ai/ai-provider.service");
const { getFallbackQuestions } = require("../config/questionBank");
const { resolveDomain, DOMAINS } = require("../config/domains");
const logger = require("../utils/logger");

/**
 * Service orchestrating AI mock interview generation, evaluation,
 * selection recommendations, and reporting.
 */
class InterviewService {
  /**
   * Generates 10 targeted interview questions for a given domain and difficulty.
   */
  static async createQuestions({
    domain,
    difficulty = "intermediate",
    interviewType = "technical",
    experienceLevel = "intermediate",
    questionCount = 10,
    resumeSnippet = "",
  }) {
    return generateInterviewQuestions({
      domain,
      difficulty,
      interviewType,
      experienceLevel,
      questionCount,
      resumeSnippet,
    });
  }

  /**
   * Evaluates all submitted answers using multi-metric weighted evaluation
   * (50% semantic relevance, 20% correctness, 15% completeness, 10% clarity, 5% practical).
   */
  static async evaluateInterview({
    domain,
    domainId = "fullstack",
    questions = [],
    answers = [],
    evaluations = [],
    difficulty = "intermediate",
    experienceLevel = "intermediate",
    resumeSkills = [],
    integrityEvents = [],
  }) {
    return evaluateCompleteInterview({
      domain,
      domainId,
      questions,
      answers,
      evaluations,
      difficulty,
      experienceLevel,
      resumeSkills,
      integrityEvents,
    });
  }

  /**
   * Calculates overall percentage score and selection readiness status.
   * Standard threshold is 70% (configurable via ABOVE_AVERAGE_THRESHOLD).
   */
  static determineSelection(scoreOrPercentage, customThreshold = null) {
    const threshold =
      Number.isFinite(customThreshold) && customThreshold >= 40 && customThreshold <= 95
        ? customThreshold
        : Number(process.env.ABOVE_AVERAGE_THRESHOLD) || 70;

    const percentage = Math.max(0, Math.min(100, Math.round(Number(scoreOrPercentage) || 0)));
    const isSelected = percentage >= threshold;

    return {
      percentage,
      threshold,
      status: isSelected ? "Recommended" : "Needs Improvement",
      statusLabel: isSelected ? "Recommended for live rounds" : "Needs further preparation",
      readiness: readinessForPercentage(percentage, threshold),
      band: performanceBandFor(percentage),
      fit: fitForPercentage(percentage),
      disclaimer: SELECTION_DISCLAIMER,
    };
  }

  /**
   * Analyzes skill gaps based on interview performance.
   */
  static analyzeSkills({ questions, evaluations, resumeSkills = [] }) {
    return analyzeSkillGaps(questions, evaluations, resumeSkills);
  }

  /**
   * Generates a tailored learning roadmap.
   */
  static createRoadmap({ domain, overallScore, skillGaps, targetDays = 30 }) {
    return generateLearningRoadmap({
      domain,
      overallScore,
      skillGaps,
      targetDays,
    });
  }
}

module.exports = {
  InterviewService,
  WEIGHTS,
  SELECTION_DISCLAIMER,
  DOMAIN_SUITABILITY_DISCLAIMER,
  INTEGRITY_NOTE,
  performanceBandFor,
  readinessForPercentage,
  fitForPercentage,
  computeWeightedQuestionScore,
  calculateOverallScore,
  computeIntegritySummary,
  generateInterviewQuestions,
  evaluateCompleteInterview,
  analyzeSkillGaps,
  recommendCareerDomains,
  generateLearningRoadmap,
};
