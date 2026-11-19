const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret-key-at-least-32-chars-long";

const Interview = require("../src/models/Interview");
const Resume = require("../src/models/resume");
const { createApp } = require("../src/app");
const { createTestClient } = require("./helpers/httpTestClient");
const { setProviderOverride } = require("../src/services/aiService");
const { buildStructuredReport } = require("../src/controllers/interviewcontroller");

describe("Phase 4 — Interview Engine Unit & End-to-End Integration Tests", () => {
  let request;
  let token;
  const userId = "507f1f77bcf86cd799439011";
  const store = [];
  const originals = {};

  function makeQuery(itemsFn) {
    const chain = {
      sort() {
        return chain;
      },
      skip() {
        return chain;
      },
      limit() {
        return chain;
      },
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
    originals.findOneAndDelete = Interview.findOneAndDelete;
    originals.resumeFindOne = Resume.findOne;

    Interview.create = async (payload) => {
      const id = String(store.length + 1).padStart(24, "b");
      const doc = {
        ...payload,
        _id: id,
        createdAt: new Date(Date.now() - 120_000),
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

    Interview.countDocuments = async (query) =>
      store.filter((doc) => String(doc.userId) === String(query.userId)).length;

    Interview.findOneAndDelete = async (query) => {
      const idx = store.findIndex(
        (doc) =>
          String(doc._id) === String(query._id) &&
          String(doc.userId) === String(query.userId)
      );
      if (idx === -1) return null;
      return store.splice(idx, 1)[0];
    };

    Resume.findOne = (query) =>
      makeQuery(() =>
        String(query.userId) === userId
          ? {
              _id: "507f1f77bcf86cd799439099",
              userId,
              resumeText: "Experienced in React, Node.js, PostgreSQL, and Docker.",
            }
          : null
      );
  });

  after(() => {
    Interview.create = originals.create;
    Interview.findOne = originals.findOne;
    Interview.find = originals.find;
    Interview.countDocuments = originals.countDocuments;
    Interview.findOneAndDelete = originals.findOneAndDelete;
    Resume.findOne = originals.resumeFindOne;
    setProviderOverride(null);
  });

  it("buildStructuredReport computes accurate totals, fit tier, topic breakdown, and fallback roadmap", () => {
    const report = buildStructuredReport({
      domain: "Backend Developer",
      questions: [
        { id: 1, text: "Q1", level: "beginner", topic: "REST APIs" },
        { id: 2, text: "Q2", level: "advanced", topic: "Databases" },
      ],
      evaluations: [
        { questionId: 1, score: 8, maxScore: 10, verdict: "correct" },
        { questionId: 2, score: 4, maxScore: 10, verdict: "partial" },
      ],
      aiSummary: {
        strengths: ["Strong REST fundamentals"],
        weaknesses: ["Needs deeper indexing knowledge"],
        overallFeedback: "Good overall start.",
        careerReadiness: "Practice SQL indexing.",
        recommendations: ["Study B-trees"],
        roadmap: [],
      },
    });

    assert.equal(report.totalScore, 12);
    assert.equal(report.maxScore, 20);
    assert.equal(report.percentage, 60);
    assert.equal(report.performanceBand, "Average");
    assert.equal(report.isAboveAverage, false);
    assert.equal(report.correct, 1);
    assert.equal(report.partial, 1);
    assert.ok(report.roadmap.some((r) => r.topic === "Databases" && r.priority === 1));
  });

  it("runs complete structured + resume-tailored interview lifecycle: start -> guard 0-answer complete -> answer -> complete -> history -> delete", async () => {
    setProviderOverride(async ({ system }) => {
      if (system.includes("hiring for")) {
        return JSON.stringify({
          questions: [
            {
              text: "Explain how event loop phases work in Node.js.",
              level: "beginner",
              topic: "Node.js & REST API Design",
            },
            {
              text: "How would you design rate limiting for a distributed API?",
              level: "intermediate",
              topic: "System Design & Deployment",
            },
            {
              text: "Explain how MongoDB compound indexes affect query plans.",
              level: "advanced",
              topic: "Databases & Schema Modeling",
            },
          ],
        });
      }

      return JSON.stringify({
        evaluations: [
          {
            questionId: 1,
            score: 7,
            expectedAnswer: "Timers, poll, check phases with microtasks between.",
            keyConcepts: ["Event loop", "Microtasks"],
            correctnessAnalysis: "Accurate explanation.",
            didWell: "Clear microtask distinction.",
            improve: "Mention libuv threadpool.",
            suggestedAnswer: "Node.js runs timers, I/O callbacks, poll, check...",
          },
        ],
        strengths: ["Clear Node.js runtime knowledge"],
        weaknesses: ["Could elaborate on scaling edge cases"],
        overallFeedback: "Strong interview performance.",
        careerReadiness: "Ready for entry/mid full-stack loops.",
        recommendations: ["Practice distributed caching scenarios"],
        roadmap: [
          {
            topic: "System Design & Deployment",
            priority: 2,
            why: "Build fluency in distributed rate limiters.",
            concepts: ["Token bucket", "Sliding window"],
            exercises: ["Design a Redis rate limiter"],
            miniProject: "Express Redis limiter middleware",
            resources: ["Designing Data-Intensive Applications"],
            duration: "1 week",
          },
        ],
      });
    });

    // 1. Start structured resume-tailored interview
    const startRes = await request("/api/interviews/start", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        domainId: "fullstack",
        mode: "structured",
        difficulty: "mixed",
        questionCount: 3,
        useResume: true,
      }),
    });
    const startBody = await startRes.json();
    assert.equal(startRes.status, 201);
    assert.equal(startBody.interview.resumeTailored, true);
    assert.equal(startBody.interview.questions.length, 3);
    const interviewId = startBody.interviewId;

    // 2. Completing with 0 answers is blocked (400)
    const zeroComplete = await request(`/api/interviews/${interviewId}/complete`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
    });
    assert.equal(zeroComplete.status, 400);

    // 3. Submit answer for question 0
    const ansRes = await request(`/api/interviews/${interviewId}/answer`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        questionIndex: 0,
        answer: "Node.js processes timers, I/O poll, and check phases with microtasks drained in between.",
        durationSeconds: 95,
      }),
    });
    const ansBody = await ansRes.json();
    assert.equal(ansRes.status, 200);
    assert.equal(ansBody.questionsAnswered, 1);

    // 4. Complete interview and verify structured report + idempotent re-complete
    const compRes = await request(`/api/interviews/${interviewId}/complete`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ durationSeconds: 180 }),
    });
    const compBody = await compRes.json();
    assert.equal(compRes.status, 200);
    assert.equal(compBody.duration, 180);
    assert.ok(compBody.report.fit.label);
    assert.equal(compBody.interview.evaluations.length, 1);

    const idemComplete = await request(`/api/interviews/${interviewId}/complete`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
    });
    const idemBody = await idemComplete.json();
    assert.equal(idemComplete.status, 200);
    assert.equal(idemBody.idempotent, true);

    // 5. History returns the session
    const histRes = await request("/api/interviews/history?status=completed", {
      headers: { authorization: `Bearer ${token}` },
    });
    const histBody = await histRes.json();
    assert.equal(histRes.status, 200);
    assert.equal(histBody.count, 1);

    // 6. Delete interview
    const delRes = await request(`/api/interviews/${interviewId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    assert.equal(delRes.status, 200);
  });
});
