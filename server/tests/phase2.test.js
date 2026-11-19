const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret-key-at-least-32-chars-long";

const User = require("../src/models/User");
const Interview = require("../src/models/Interview");
const Resume = require("../src/models/resume");
const { createApp } = require("../src/app");
const { createTestClient } = require("./helpers/httpTestClient");
const {
  computeProfileCompleteness,
} = require("../src/controllers/profileController");
const { buildDashboardSummary } = require("../src/controllers/dashboardController");

describe("Phase 2 — Profile & Dashboard Unit Tests", () => {
  it("computeProfileCompleteness computes percentage and missing prompts accurately", () => {
    const empty = computeProfileCompleteness({ profile: {} });
    assert.equal(empty.percent, 0);
    assert.equal(empty.missing.length, 5);

    const complete = computeProfileCompleteness({
      profile: {
        headline: "Full Stack Engineer",
        targetRoles: ["Backend Engineer"],
        skills: ["Node.js", "TypeScript", "MongoDB"],
        education: "B.Tech CS",
        bio: "Building scalable web platforms.",
      },
    });
    assert.equal(complete.percent, 100);
    assert.equal(complete.missing.length, 0);
  });

  it("buildDashboardSummary aggregates stats, domain progress, resume status, and readiness score", () => {
    const summary = buildDashboardSummary({
      user: {
        profile: {
          headline: "CS Senior",
          targetRoles: ["Full Stack Developer"],
          skills: ["React", "Node.js", "SQL"],
          education: "BS CS",
          bio: "Ready to ship.",
        },
      },
      interviews: [
        {
          _id: "i1",
          domain: "Full Stack Developer",
          score: 80,
          duration: 600,
          questionsAnswered: 5,
          isComplete: true,
          createdAt: new Date("2026-11-16T10:00:00Z"),
        },
        {
          _id: "i2",
          domain: "Full Stack Developer",
          score: 90,
          duration: 900,
          questionsAnswered: 6,
          isComplete: true,
          createdAt: new Date("2026-11-17T10:00:00Z"),
        },
        {
          _id: "i3",
          domain: "Python Developer",
          score: 0,
          duration: 120,
          questionsAnswered: 1,
          isComplete: false,
          createdAt: new Date("2026-11-17T11:00:00Z"),
        },
      ],
      resumes: [
        {
          _id: "r1",
          originalName: "rishi-resume.pdf",
          resumeText: "Experienced developer",
          isActive: true,
          atsReport: { overallScore: 84 },
          updatedAt: new Date("2026-11-17T12:00:00Z"),
        },
      ],
    });

    assert.equal(summary.stats.totalInterviews, 3);
    assert.equal(summary.stats.completedInterviews, 2);
    assert.equal(summary.stats.averageScore, 85);
    assert.equal(summary.stats.bestScore, 90);
    assert.equal(summary.stats.totalPracticeSeconds, 1620);
    assert.equal(summary.stats.latestAtsScore, 84);
    assert.equal(summary.stats.readinessScore, Math.round(85 * 0.5 + 84 * 0.3 + 100 * 0.2));
    assert.equal(summary.latestResume.originalName, "rishi-resume.pdf");
    assert.equal(summary.domainProgress[0].domain, "Full Stack Developer");
    assert.equal(summary.domainProgress[0].averageScore, 85);
  });
});

describe("Phase 2 — Profile, Consent & Dashboard API Integration Tests", () => {
  let request;
  let token;
  let mockUser;

  const originals = {};

  before(() => {
    const app = createApp({ rateLimits: { generalMax: 500, authMax: 50 } });
    request = createTestClient(app);

    const userId = "507f1f77bcf86cd799439011";
    token = jwt.sign({ id: userId, role: "student" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    mockUser = {
      _id: userId,
      name: "Rishi Sharma",
      email: "rishi@example.com",
      role: "student",
      profile: {
        headline: "Aspiring Engineer",
        bio: "",
        experienceLevel: "student",
        targetRoles: [],
        skills: [],
        education: "",
        location: "",
        linkedinUrl: "",
        githubUrl: "",
        portfolioUrl: "",
      },
      preferences: {
        emailReminders: true,
        reminderCadence: "weekly",
        voiceInterviewsEnabled: true,
        videoInterviewsEnabled: false,
      },
      consent: {
        aiProcessingAccepted: true,
        aiProcessingAcceptedAt: new Date(),
        localMediaOnly: true,
        analyticsOptIn: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      save: async function () {
        this.updatedAt = new Date();
        return this;
      },
    };

    originals.userFindById = User.findById;
    originals.interviewFind = Interview.find;
    originals.resumeFind = Resume.find;

    User.findById = (id) => ({
      select: async () => (String(id) === userId ? mockUser : null),
    });

    Interview.find = () => ({
      sort: () => ({
        limit: async () => [
          {
            _id: "507f1f77bcf86cd799439022",
            domain: "Backend Developer",
            score: 78,
            duration: 420,
            questionsAnswered: 4,
            isComplete: true,
            createdAt: new Date(),
          },
        ],
        then: (resolve) =>
          resolve([
            {
              _id: "507f1f77bcf86cd799439022",
              domain: "Backend Developer",
              score: 78,
            },
          ]),
      }),
    });

    Resume.find = () => ({
      sort: () => ({
        limit: async () => [],
        then: (resolve) => resolve([]),
      }),
    });
  });

  after(() => {
    User.findById = originals.userFindById;
    Interview.find = originals.interviewFind;
    Resume.find = originals.resumeFind;
  });

  it("blocks unauthenticated access to /api/profile and /api/dashboard/summary", async () => {
    const r1 = await request("/api/profile");
    const r2 = await request("/api/dashboard/summary");
    assert.equal(r1.status, 401);
    assert.equal(r2.status, 401);
  });

  it("GET /api/profile returns sanitized user profile and completeness", async () => {
    const res = await request("/api/profile", {
      headers: { authorization: `Bearer ${token}` },
    });
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.user.email, "rishi@example.com");
    assert.equal(body.user.password, undefined);
    assert.equal(typeof body.completeness.percent, "number");
  });

  it("PATCH /api/profile validates bad URLs/enums and persists valid updates", async () => {
    const badRes = await request("/api/profile", {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        profile: { githubUrl: "javascript:alert(1)" },
      }),
    });
    assert.equal(badRes.status, 400);

    const okRes = await request("/api/profile", {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "Rishi S.",
        profile: {
          headline: "Backend Engineer",
          experienceLevel: "entry",
          targetRoles: ["Backend Developer", "Full Stack Developer"],
          skills: ["Node.js", "Express", "MongoDB", "node.js"],
          githubUrl: "https://github.com/rishi",
        },
        preferences: {
          reminderCadence: "daily",
        },
      }),
    });
    const okBody = await okRes.json();

    assert.equal(okRes.status, 200);
    assert.equal(okBody.user.name, "Rishi S.");
    assert.deepEqual(okBody.user.profile.skills, ["Node.js", "Express", "MongoDB"]);
    assert.equal(okBody.user.preferences.reminderCadence, "daily");
  });

  it("PATCH /api/profile/consent updates consent flags and GET /api/profile/export exports data", async () => {
    const consentRes = await request("/api/profile/consent", {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        localMediaOnly: true,
        analyticsOptIn: true,
      }),
    });
    const consentBody = await consentRes.json();
    assert.equal(consentRes.status, 200);
    assert.equal(consentBody.consent.analyticsOptIn, true);

    const exportRes = await request("/api/profile/export", {
      headers: { authorization: `Bearer ${token}` },
    });
    const exportBody = await exportRes.json();
    assert.equal(exportRes.status, 200);
    assert.equal(exportBody.success, true);
    assert.ok(exportBody.exportedAt);
    assert.equal(exportBody.account.email, "rishi@example.com");
  });

  it("DELETE /api/profile requires explicit DELETE confirmation text", async () => {
    const res = await request("/api/profile", {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ confirmText: "wrong" }),
    });
    assert.equal(res.status, 400);
  });

  it("GET /api/dashboard/summary returns live aggregated stats for authenticated user", async () => {
    const res = await request("/api/dashboard/summary", {
      headers: { authorization: `Bearer ${token}` },
    });
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.success, true);
    assert.equal(body.stats.totalInterviews, 1);
    assert.equal(body.stats.averageScore, 78);
    assert.equal(body.recentInterviews.length, 1);
  });
});
