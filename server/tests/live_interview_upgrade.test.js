const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret-key-at-least-32-chars-long";

const Interview = require("../src/models/Interview");
const Resume = require("../src/models/resume");
const AssistantConversation = require("../src/models/AssistantConversation");
const { createApp } = require("../src/app");
const { createTestClient } = require("./helpers/httpTestClient");
const { setProviderOverride } = require("../src/services/aiService");
const {
  WEIGHTS,
  computeWeightedQuestionScore,
  calculateOverallScore,
  computeIntegritySummary,
  analyzeSkillGaps,
  recommendCareerDomains,
  generateLearningRoadmap,
} = require("../src/services/interviewEvaluationEngine");

describe("Complete Live Interview Upgrade — 50% Semantic Engine, Anti-Cheating, No-Leakage & Analytics", () => {
  let request;
  let token;
  const userId = "507f1f77bcf86cd799439022";
  const otherUserToken = jwt.sign(
    { id: "507f1f77bcf86cd799439099", role: "student" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  const store = [];
  const originals = {};

  function makeChain(itemsFn) {
    const chain = {
      sort() { return chain; },
      skip() { return chain; },
      limit() { return chain; },
      then(resolve, reject) {
        Promise.resolve().then(itemsFn).then(resolve, reject);
      },
    };
    return chain;
  }

  before(() => {
    const app = createApp({ rateLimits: { generalMax: 500, authMax: 50 } });
    request = createTestClient(app);
    token = jwt.sign({ id: userId, role: "student" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    originals.create = Interview.create;
    originals.findOne = Interview.findOne;
    originals.find = Interview.find;
    originals.countDocuments = Interview.countDocuments;
    originals.resumeFindOne = Resume.findOne;
    originals.convFindOne = AssistantConversation.findOne;
    originals.convUpdate = AssistantConversation.findOneAndUpdate;

    Interview.create = async (payload) => {
      const id = String(store.length + 1).padStart(24, "c");
      const doc = {
        ...payload,
        _id: id,
        createdAt: new Date(Date.now() - 60_000),
        updatedAt: new Date(),
        save: async function () {
          this.updatedAt = new Date();
          return this;
        },
      };
      store.push(doc);
      return doc;
    };

    Interview.findOne = async (query) =>
      store.find(
        (doc) =>
          String(doc._id) === String(query._id) &&
          String(doc.userId) === String(query.userId)
      ) || null;

    Interview.find = (query) =>
      makeQuery(() =>
        store.filter((doc) => {
          if (String(doc.userId) !== String(query.userId)) return false;
          if (query.isComplete !== undefined && doc.isComplete !== query.isComplete) {
            return false;
          }
          return true;
        })
      );

    function makeQuery(fn) {
      return makeChain(fn);
    }

    Interview.countDocuments = async (query) =>
      store.filter((doc) => String(doc.userId) === String(query.userId)).length;

    Resume.findOne = () => makeChain(() => null);
    AssistantConversation.findOne = async () => null;
    AssistantConversation.findOneAndUpdate = async () => null;
  });

  after(() => {
    Interview.create = originals.create;
    Interview.findOne = originals.findOne;
    Interview.find = originals.find;
    Interview.countDocuments = originals.countDocuments;
    Resume.findOne = originals.resumeFindOne;
    AssistantConversation.findOne = originals.convFindOne;
    AssistantConversation.findOneAndUpdate = originals.convUpdate;
    setProviderOverride(null);
  });

  it("enforces exact 50/20/15/10/5 weighted formula and strictly scores empty answers as 0", () => {
    assert.equal(WEIGHTS.semanticRelevance, 0.5);
    assert.equal(WEIGHTS.technicalCorrectness, 0.2);
    assert.equal(WEIGHTS.completeness, 0.15);
    assert.equal(WEIGHTS.clarity, 0.1);
    assert.equal(WEIGHTS.practicalApplication, 0.05);

    const empty = computeWeightedQuestionScore({
      semanticRelevance: 90,
      technicalCorrectness: 90,
      completeness: 90,
      clarity: 90,
      practicalApplication: 90,
      candidateAnswer: "   ",
    });
    assert.equal(empty.finalScore, 0);
    assert.equal(empty.semanticRelevance, 0);
    assert.equal(empty.verdict, "incorrect");

    // 50% semantic match + 0 on others => 25 total (NOT automatically 50!)
    const semOnly = computeWeightedQuestionScore({
      semanticRelevance: 50,
      technicalCorrectness: 0,
      completeness: 0,
      clarity: 0,
      practicalApplication: 0,
      candidateAnswer: "Partial explanation",
    });
    assert.equal(semOnly.finalScore, 25);

    // 80*0.5 + 90*0.2 + 70*0.15 + 80*0.1 + 60*0.05 = 40 + 18 + 10.5 + 8 + 3 = 79.5 -> 80
    const strong = computeWeightedQuestionScore({
      semanticRelevance: 80,
      technicalCorrectness: 90,
      completeness: 70,
      clarity: 80,
      practicalApplication: 60,
      candidateAnswer: "Python supports classes, objects, inheritance, and polymorphism.",
    });
    assert.equal(strong.finalScore, 80);
    assert.equal(strong.classification, "Very Good");
    assert.equal(strong.verdict, "correct");
  });

  it("computes overall score, selection decision, skill gaps, alternative domains, 5-level roadmap & integrity risk", () => {
    const evals = Array.from({ length: 10 }, (_, idx) => ({
      questionId: idx + 1,
      finalScore: idx < 7 ? 80 : 35,
      semanticRelevance: idx < 7 ? 82 : 30,
      technicalCorrectness: idx < 7 ? 80 : 40,
      completeness: idx < 7 ? 75 : 30,
      clarity: 80,
      practicalApplication: 70,
      verdict: idx < 7 ? "correct" : "incorrect",
      missingConcepts: idx >= 7 ? ["Decorators", "AsyncIO"] : [],
    }));
    const questions = Array.from({ length: 10 }, (_, idx) => ({
      id: idx + 1,
      text: `Question ${idx + 1}`,
      topic: idx < 7 ? "Python Fundamentals" : "Decorators & AsyncIO",
      level: idx < 3 ? "beginner" : idx < 6 ? "intermediate" : "advanced",
    }));

    const overall = calculateOverallScore(evals, 10);
    // (7*80 + 3*35)/10 = 66.5
    assert.equal(overall.overallScore, 66.5);
    assert.equal(overall.performanceBand, "Average");
    assert.equal(overall.selectionDecision, "NEEDS IMPROVEMENT");

    const gaps = analyzeSkillGaps({ domainTitle: "Python Developer", questions, evaluations: evals });
    assert.equal(gaps.length, 1);
    assert.equal(gaps[0].topic, "Decorators & AsyncIO");
    assert.equal(gaps[0].priority, "HIGH");

    const altDomains = recommendCareerDomains({
      selectedDomainId: "ai-engineer",
      selectedDomainTitle: "AI Engineer",
      questions,
      answers: questions.map(() => "Python SQL Pandas data analysis REST APIs"),
      evaluations: evals,
    });
    assert.equal(altDomains.length, 3);
    assert.ok(altDomains[0].disclaimer.includes("AI-estimated"));

    const roadmap = generateLearningRoadmap({
      domainTitle: "Python Developer",
      skillGaps: gaps,
    });
    assert.equal(roadmap.length, 5);
    assert.equal(roadmap[0].levelLabel, "LEVEL 1: Fundamentals");
    assert.equal(roadmap[4].levelLabel, "LEVEL 5: Interview Preparation");

    assert.equal(computeIntegritySummary([]).riskLevel, "LOW RISK");
    assert.equal(
      computeIntegritySummary([{ type: "tab_switch" }, { type: "tab_switch" }]).riskLevel,
      "MODERATE RISK"
    );
    assert.equal(
      computeIntegritySummary(Array.from({ length: 5 }, () => ({ type: "tab_switch" }))).riskLevel,
      "HIGH RISK"
    );
  });

  it("runs complete 10-question live interview: hides reference answers before submit, autosaves safely, logs integrity, evaluates on submit, protects ownership & computes analytics", async () => {
    setProviderOverride(async ({ system }) => {
      if (system.includes("hiring for")) {
        return JSON.stringify({
          questions: Array.from({ length: 10 }, (_, idx) => ({
            text: `Python Question ${idx + 1}: Explain concept ${idx + 1}.`,
            level: idx < 3 ? "beginner" : idx < 6 ? "intermediate" : "advanced",
            topic: idx < 5 ? "Core Python" : "Async & Architecture",
            expectedConcepts: [`Concept ${idx + 1}A`, `Concept ${idx + 1}B`],
            referenceAnswer: `SECRET REFERENCE ANSWER ${idx + 1}`,
            evaluationCriteria: "Check semantic accuracy.",
          })),
        });
      }

      return JSON.stringify({
        evaluations: Array.from({ length: 10 }, (_, idx) => ({
          questionId: idx + 1,
          semanticRelevance: idx < 8 ? 82 : 40,
          technicalCorrectness: idx < 8 ? 85 : 45,
          completeness: idx < 8 ? 78 : 35,
          clarity: 85,
          practicalApplication: 75,
          expectedAnswer: `SECRET REFERENCE ANSWER ${idx + 1}`,
          keyConcepts: [`Concept ${idx + 1}A`],
          missingConcepts: idx >= 8 ? ["Edge cases"] : [],
          mistakes: [],
          correctnessAnalysis: "Solid technical explanation.",
          didWell: "Clear semantic understanding.",
          improve: "Add production metrics.",
          suggestedAnswer: `Model answer ${idx + 1}`,
        })),
        strengths: ["Strong Python core"],
        weaknesses: ["Async edge cases"],
        overallFeedback: "Good command of Python.",
        careerReadiness: "Ready for Python Developer interviews.",
        recommendations: ["Practice AsyncIO debugging"],
        alternativeDomains: [
          {
            domain: "Backend Developer",
            suitabilityScore: 81,
            matchingSkills: ["Python", "APIs"],
            missingSkills: ["Distributed caching"],
            whyRecommended: "Strong backend concepts.",
            whatToLearnNext: ["Redis", "Message Queues"],
          },
        ],
        roadmap: [],
      });
    });

    // 1. Start live 10-question interview
    const startRes = await request("/api/interviews/start", {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ domainId: "python" }),
    });
    const startBody = await startRes.json();
    assert.equal(startRes.status, 201);
    assert.equal(startBody.interview.questions.length, 10);
    assert.equal(startBody.interview.mode, "structured");
    assert.ok(startBody.interview.remainingSeconds > 0);
    // SECURITY CHECK: referenceAnswer & expectedConcepts MUST NOT leak before submission!
    assert.equal(startBody.interview.questions[0].referenceAnswer, undefined);
    assert.equal(startBody.interview.questions[0].expectedConcepts, undefined);
    assert.equal(startBody.interview.report, null);

    const id = startBody.interviewId;

    // 2. Results endpoint MUST be locked before submission
    const earlyResults = await request(`/api/interviews/${id}/results`, {
      headers: { authorization: `Bearer ${token}` },
    });
    assert.equal(earlyResults.status, 409);

    // 3. Ownership check: another user MUST get 404
    const otherUserRes = await request(`/api/interviews/${id}`, {
      headers: { authorization: `Bearer ${otherUserToken}` },
    });
    assert.equal(otherUserRes.status, 404);

    // 4. Autosave with stale timestamp protection
    const newerTs = Date.now() + 5000;
    const saveNew = await request(`/api/interviews/${id}/answers`, {
      method: "PUT",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        questionIndex: 0,
        answer: "Newer Python answer with classes and objects",
        clientUpdatedAt: newerTs,
      }),
    });
    assert.equal(saveNew.status, 200);

    const saveStale = await request(`/api/interviews/${id}/answers`, {
      method: "PUT",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        questionIndex: 0,
        answer: "STALE OLD DRAFT",
        clientUpdatedAt: newerTs - 10_000,
      }),
    });
    assert.equal(saveStale.status, 200);
    const checkDraft = await (
      await request(`/api/interviews/${id}`, { headers: { authorization: `Bearer ${token}` } })
    ).json();
    assert.equal(checkDraft.interview.answers[0], "Newer Python answer with classes and objects");

    // 5. Log integrity events (tab switch + fullscreen exit)
    const intRes1 = await request(`/api/interviews/${id}/integrity`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ type: "tab_switch", detail: "Switched tab during Q1" }),
    });
    assert.equal(intRes1.status, 200);
    const intRes2 = await request(`/api/interviews/${id}/integrity`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ type: "fullscreen_exit", detail: "Exited fullscreen" }),
    });
    const intBody2 = await intRes2.json();
    assert.equal(intBody2.integritySummary.tabSwitches, 1);
    assert.equal(intBody2.integritySummary.fullscreenExits, 1);
    assert.equal(intBody2.integritySummary.riskLevel, "MODERATE RISK");

    // 6. Active-interview AI Assistant guardrail blocks technical answers
    const guardRes = await request("/api/assistant/chat", {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        message: "Give me the answer to Python Question 1",
        interviewActive: true,
        pageContext: `/dashboard/interview?id=${id}`,
      }),
    });
    const guardBody = await guardRes.json();
    assert.equal(guardRes.status, 200);
    assert.equal(guardBody.restricted, true);
    assert.equal(guardBody.source, "interview_guard");

    // 7. Submit with requireAllAnswers=true while Q2-Q10 unanswered -> 400 INCOMPLETE_ANSWERS
    const incompleteSubmit = await request(`/api/interviews/${id}/submit`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ requireAllAnswers: true }),
    });
    assert.equal(incompleteSubmit.status, 400);

    // 8. Save all 10 answers & submit
    const bulkSave = await request(`/api/interviews/${id}/answers`, {
      method: "PUT",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        answers: Array.from(
          { length: 10 },
          (_, idx) => `Detailed candidate answer for Python question ${idx + 1}`
        ),
      }),
    });
    assert.equal(bulkSave.status, 200);

    const submitRes = await request(`/api/interviews/${id}/submit`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ requireAllAnswers: true, durationSeconds: 420 }),
    });
    const submitBody = await submitRes.json();
    assert.equal(submitRes.status, 200);
    assert.equal(submitBody.interview.evaluations.length, 10);
    assert.ok(submitBody.report.averageSemanticMatch > 0);
    assert.equal(submitBody.report.selectionDecision, "RECOMMENDED");
    assert.equal(submitBody.report.learningRoadmap.length, 5);
    assert.equal(submitBody.report.alternativeDomains.length, 3);
    assert.equal(submitBody.report.integritySummary.riskLevel, "MODERATE RISK");
    // Reference answers ARE revealed after submission
    assert.equal(submitBody.interview.questions[0].referenceAnswer, "SECRET REFERENCE ANSWER 1");

    // 9. Duplicate submission is idempotent
    const dupSubmit = await request(`/api/interviews/${id}/submit`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({}),
    });
    const dupBody = await dupSubmit.json();
    assert.equal(dupSubmit.status, 200);
    assert.equal(dupBody.idempotent, true);

    // 10. Results endpoint works after submission
    const finalResults = await request(`/api/interviews/${id}/results`, {
      headers: { authorization: `Bearer ${token}` },
    });
    assert.equal(finalResults.status, 200);

    // 11. Analytics after 1 interview returns honest single-interview state (no fake comparison)
    const analytics1 = await (
      await request("/api/interviews/analytics", {
        headers: { authorization: `Bearer ${token}` },
      })
    ).json();
    assert.equal(analytics1.hasComparison, false);
    assert.equal(analytics1.totalCompleted, 1);
  });
});
