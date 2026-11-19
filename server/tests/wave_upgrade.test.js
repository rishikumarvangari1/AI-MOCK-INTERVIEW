const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret-key-at-least-32-chars-long";

const User = require("../src/models/User");
const Interview = require("../src/models/Interview");
const Resume = require("../src/models/resume");
const JobApplication = require("../src/models/JobApplication");
const CareerPlan = require("../src/models/CareerPlan");
const Activity = require("../src/models/Activity");
const AdminAuditLog = require("../src/models/AdminAuditLog");
const QuestionBankItem = require("../src/models/QuestionBankItem");
const { createApp } = require("../src/app");
const { createTestClient } = require("./helpers/httpTestClient");
const { AIError, setProviderOverride } = require("../src/services/aiService");

describe("Wave A Upgrade — Forgot/Reset Password, Fallback Bank, Coding Interview, Timed Roadmaps, Analytics & Admin Audit", () => {
  let request;
  let studentToken;
  let adminToken;
  const studentId = "507f1f77bcf86cd799439011";
  const adminId = "507f1f77bcf86cd799439012";
  const originals = {};
  const auditStore = [];
  const qBankStore = [];
  let mockUser;

  function makeChain(fn) {
    const c = {
      select() { return c; },
      sort() { return c; },
      skip() { return c; },
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

    studentToken = jwt.sign(
      { id: studentId, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    adminToken = jwt.sign(
      { id: adminId, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    mockUser = {
      _id: studentId,
      name: "Rishi",
      email: "rishi@example.com",
      password: "hashed-old-password",
      role: "student",
      resetPasswordTokenHash: null,
      resetPasswordExpiresAt: null,
      profile: { skills: ["React", "TypeScript"], targetRoles: ["Full Stack Developer"] },
      save: async function () {
        return this;
      },
    };

    originals.userFindOne = User.findOne;
    originals.userFindById = User.findById;
    originals.interviewCreate = Interview.create;
    originals.interviewFind = Interview.find;
    originals.resumeFind = Resume.find;
    originals.resumeFindOne = Resume.findOne;
    originals.jobFind = JobApplication.find;
    originals.careerFindOne = CareerPlan.findOne;
    originals.careerUpdate = CareerPlan.findOneAndUpdate;
    originals.activityFind = Activity.find;
    originals.auditCreate = AdminAuditLog.create;
    originals.auditFind = AdminAuditLog.find;
    originals.qbankCreate = QuestionBankItem.create;
    originals.qbankFind = QuestionBankItem.find;
    originals.qbankDelete = QuestionBankItem.findByIdAndDelete;

    User.findOne = (query) =>
      makeChain(() => {
        if (query.email === "rishi@example.com") return mockUser;
        if (
          query.resetPasswordTokenHash &&
          query.resetPasswordTokenHash === mockUser.resetPasswordTokenHash
        ) {
          return mockUser;
        }
        return null;
      });
    User.findById = () => makeChain(() => mockUser);

    Interview.create = async (payload) => ({
      ...payload,
      _id: "507f1f77bcf86cd799439088",
      createdAt: new Date(),
    });
    Interview.find = () =>
      makeChain(() => [
        {
          _id: "507f1f77bcf86cd799439088",
          domain: "Python Developer",
          score: 82,
          mode: "structured",
          isComplete: true,
          report: { topics: [{ topic: "Core Python", percent: 85 }] },
          createdAt: new Date(),
        },
      ]);

    Resume.find = () =>
      makeChain(() => [
        {
          _id: "507f1f77bcf86cd799439077",
          version: 1,
          originalName: "cv.pdf",
          atsReport: { overallScore: 79 },
          parsed: { skills: ["Python", "SQL"] },
          createdAt: new Date(),
        },
      ]);
    Resume.findOne = () => makeChain(() => null);

    JobApplication.find = () =>
      makeChain(() => [
        {
          _id: "507f1f77bcf86cd799439066",
          company: "Acme",
          role: "Backend Dev",
          matchScore: 76,
          status: "applied",
          createdAt: new Date(),
        },
      ]);

    CareerPlan.findOne = async () => null;
    CareerPlan.findOneAndUpdate = async (_q, payload) => ({
      ...payload,
      _id: "507f1f77bcf86cd799439055",
    });

    Activity.find = () => makeChain(() => []);

    AdminAuditLog.create = async (payload) => {
      const doc = { ...payload, _id: "507f1f77bcf86cd799439044", createdAt: new Date() };
      auditStore.push(doc);
      return doc;
    };
    AdminAuditLog.find = () => makeChain(() => [...auditStore]);

    QuestionBankItem.create = async (payload) => {
      const doc = { ...payload, _id: "507f1f77bcf86cd799439033", createdAt: new Date() };
      qBankStore.push(doc);
      return doc;
    };
    QuestionBankItem.find = () => makeChain(() => [...qBankStore]);
    QuestionBankItem.findByIdAndDelete = async () => qBankStore.pop() || null;
  });

  after(() => {
    User.findOne = originals.userFindOne;
    User.findById = originals.userFindById;
    Interview.create = originals.interviewCreate;
    Interview.find = originals.interviewFind;
    Resume.find = originals.resumeFind;
    Resume.findOne = originals.resumeFindOne;
    JobApplication.find = originals.jobFind;
    CareerPlan.findOne = originals.careerFindOne;
    CareerPlan.findOneAndUpdate = originals.careerUpdate;
    Activity.find = originals.activityFind;
    AdminAuditLog.create = originals.auditCreate;
    AdminAuditLog.find = originals.auditFind;
    QuestionBankItem.create = originals.qbankCreate;
    QuestionBankItem.find = originals.qbankFind;
    QuestionBankItem.findByIdAndDelete = originals.qbankDelete;
    setProviderOverride(null);
  });

  it("completes forgot-password and reset-password flow with hashed token", async () => {
    const forgot = await request("/api/auth/forgot-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "rishi@example.com" }),
    });
    const forgotBody = await forgot.json();
    assert.equal(forgot.status, 200);
    assert.ok(forgotBody.devResetToken);
    assert.ok(mockUser.resetPasswordTokenHash);

    const reset = await request("/api/auth/reset-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        token: forgotBody.devResetToken,
        password: "newStrongPassword123",
      }),
    });
    assert.equal(reset.status, 200);
    assert.equal(mockUser.resetPasswordTokenHash, null);
  });

  it("falls back to labeled predefined coding question bank when AI provider is unavailable", async () => {
    setProviderOverride(async () => {
      throw new AIError("Provider offline", {
        code: "AI_UNAVAILABLE",
        statusCode: 503,
        retryable: false,
      });
    });

    const res = await request("/api/interviews/start", {
      method: "POST",
      headers: {
        authorization: `Bearer ${studentToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        domainId: "javascript",
        interviewType: "coding",
        codingLanguage: "typescript",
        experienceLevel: "intermediate",
        difficulty: "medium",
        questionCount: 3,
      }),
    });
    const body = await res.json();
    assert.equal(res.status, 201);
    assert.equal(body.interview.interviewType, "coding");
    assert.equal(body.interview.questionSource, "fallback_bank");
    assert.ok(body.interview.questions[0].sampleInput);
  });

  it("generates a 15-day roadmap with skill gap analysis categories", async () => {
    setProviderOverride(async () => {
      throw new AIError("Skip AI to test deterministic timed roadmap", {
        retryable: false,
      });
    });

    const res = await request("/api/career/generate", {
      method: "POST",
      headers: {
        authorization: `Bearer ${studentToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        targetRole: "Backend Developer",
        durationDays: 15,
      }),
    });
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.equal(body.durationDays, 15);
    assert.ok(body.skillGapAnalysis.disclaimer.includes("not verified mastery"));
    assert.ok(body.roadmap.milestones[0].dayRange.startsWith("Day"));
  });

  it("returns analytics overview with interview trends, resume quality, and job matches", async () => {
    const res = await request("/api/analytics/overview?range=30d", {
      headers: { authorization: `Bearer ${studentToken}` },
    });
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.equal(body.summary.completedInterviews, 1);
    assert.equal(body.interviewTrend.length, 1);
    assert.equal(body.resumeQualityHistory.length, 1);
    assert.equal(body.jobMatches.length, 1);
  });

  it("manages admin question bank and records audit logs", async () => {
    const addRes = await request("/api/admin/question-bank", {
      method: "POST",
      headers: {
        authorization: `Bearer ${adminToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        domainId: "python",
        text: "Explain Python descriptors and how @property uses them internally.",
        level: "advanced",
        topic: "OOP & Design Patterns",
      }),
    });
    assert.equal(addRes.status, 201);

    const logsRes = await request("/api/admin/audit-logs", {
      headers: { authorization: `Bearer ${adminToken}` },
    });
    const logsBody = await logsRes.json();
    assert.equal(logsRes.status, 200);
    assert.ok(logsBody.logs.some((l) => l.action === "QUESTION_BANK_ADDED"));
  });
});
