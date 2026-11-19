const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret-key-at-least-32-chars-long";

const AssistantConversation = require("../src/models/AssistantConversation");
const Interview = require("../src/models/Interview");
const Resume = require("../src/models/resume");
const CareerPlan = require("../src/models/CareerPlan");
const { createApp } = require("../src/app");
const { createTestClient } = require("./helpers/httpTestClient");
const { setProviderOverride } = require("../src/services/aiService");
const {
  computeResumeDomainRecommendations,
} = require("../src/services/resumeParserService");
const { buildStructuredReport } = require("../src/controllers/interviewcontroller");

describe("Master Upgrade — AI Assistant, Resume Domain Matching & 70% Threshold Banding", () => {
  let request;
  let token;
  const userId = "507f1f77bcf86cd799439011";
  let convDoc = null;
  const originals = {};

  function makeChain(fn) {
    const c = {
      sort() { return c; },
      limit() { return c; },
      then(res, rej) {
        Promise.resolve().then(fn).then(res, rej);
      },
    };
    return c;
  }

  before(() => {
    const app = createApp({ rateLimits: { generalMax: 500, authMax: 50 } });
    request = createTestClient(app);
    token = jwt.sign({ id: userId, role: "student" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    originals.convFindOne = AssistantConversation.findOne;
    originals.convUpdate = AssistantConversation.findOneAndUpdate;
    originals.interviewFind = Interview.find;
    originals.resumeFindOne = Resume.findOne;
    originals.careerFindOne = CareerPlan.findOne;

    AssistantConversation.findOne = async () => convDoc;
    AssistantConversation.findOneAndUpdate = async (_q, update) => {
      const messages = update.$set ? update.$set.messages : update.messages;
      convDoc = { userId, messages };
      return convDoc;
    };
    Interview.find = () =>
      makeChain(() => [
        {
          domain: "Python Developer",
          score: 82,
          isComplete: true,
          report: {
            readiness: "Above-Average Domain Readiness",
            topics: [{ topic: "Decorators", status: "weak", percent: 40 }],
          },
        },
      ]);
    Resume.findOne = () =>
      makeChain(() => ({
        originalName: "data-cv.pdf",
        version: 1,
        atsReport: { overallScore: 81 },
        parsed: { skills: ["Python", "SQL", "Pandas", "Machine Learning"] },
        domainRecommendations: [
          { domain: "Data Scientist", matchPercentage: 84 },
        ],
      }));
    CareerPlan.findOne = async () => ({
      targetRole: "Data Scientist",
      durationDays: 30,
      roadmapMilestones: [{ status: "done" }, { status: "todo" }],
    });
  });

  after(() => {
    AssistantConversation.findOne = originals.convFindOne;
    AssistantConversation.findOneAndUpdate = originals.convUpdate;
    Interview.find = originals.interviewFind;
    Resume.findOne = originals.resumeFindOne;
    CareerPlan.findOne = originals.careerFindOne;
    setProviderOverride(null);
  });

  it("computeResumeDomainRecommendations dynamically ranks domains based on actual resume evidence", () => {
    const dataRecs = computeResumeDomainRecommendations(
      "Built analytics dashboards and ML models using Python, SQL, Pandas, NumPy, Scikit-learn, TensorFlow, and Power BI.",
      ["Python", "SQL", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Power BI"]
    );
    const frontendRecs = computeResumeDomainRecommendations(
      "Built responsive SPAs with HTML, CSS, JavaScript, TypeScript, React, Next.js, and Tailwind CSS.",
      ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"]
    );

    assert.ok(
      ["data-scientist", "data-analyst", "ml-engineer"].includes(dataRecs[0].domainId)
    );
    assert.ok(
      ["frontend", "web-developer", "fullstack"].includes(frontendRecs[0].domainId)
    );
    assert.notEqual(dataRecs[0].domainId, frontendRecs[0].domainId);
  });

  it("applies 70% above-average threshold, performance bands, and readiness decisions accurately", () => {
    const above = buildStructuredReport({
      domain: "Python Developer",
      questions: [
        { id: 1, text: "Q1", level: "beginner", topic: "Core Python" },
        { id: 2, text: "Q2", level: "intermediate", topic: "Decorators" },
      ],
      evaluations: [
        { questionId: 1, score: 9, maxScore: 10, verdict: "correct" },
        { questionId: 2, score: 7, maxScore: 10, verdict: "correct" },
      ],
      aiSummary: {},
    });

    assert.equal(above.percentage, 80);
    assert.equal(above.isAboveAverage, true);
    assert.equal(above.performanceBand, "Very Good");
    assert.equal(above.readiness, "Above-Average Domain Readiness");
  });

  it("AI Website Assistant uses authorized user context, persists turns, and clears history", async () => {
    let capturedSystem = "";
    setProviderOverride(async ({ system }) => {
      capturedSystem = system;
      return "Based on your Python Developer interview (82%), focus next on Decorators (40%) at /dashboard/roadmap.";
    });

    const chatRes = await request("/api/assistant/chat", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message: "What should I improve after my last Python interview?",
      }),
    });
    const chatBody = await chatRes.json();
    assert.equal(chatRes.status, 200);
    assert.equal(chatBody.source, "ai");
    assert.ok(capturedSystem.includes("Python Developer (82%"));
    assert.ok(chatBody.reply.includes("Decorators"));

    const histRes = await request("/api/assistant/history", {
      headers: { authorization: `Bearer ${token}` },
    });
    const histBody = await histRes.json();
    assert.equal(histRes.status, 200);
    assert.equal(histBody.messages.length, 2);

    const clearRes = await request("/api/assistant/history", {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    assert.equal(clearRes.status, 200);
  });
});
