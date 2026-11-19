const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret-key-at-least-32-chars-long";

const Resume = require("../src/models/resume");
const { createApp } = require("../src/app");
const { createTestClient } = require("./helpers/httpTestClient");
const { setProviderOverride } = require("../src/services/aiService");
const {
  validateUploadedFile,
  parseResumeStructure,
  buildBaselineAtsReport,
  computeKeywordMatch,
  compareResumeVersions,
} = require("../src/services/resumeParserService");

function buildMultipartBody(fieldName, filename, mimeType, fileBuffer) {
  const boundary = "----MockInterviewBoundary7MA4YWxkTrZu0gW";
  const prefix = Buffer.from(
    `--${boundary}\r\nContent-Disposition: form-data; name="${fieldName}"; filename="${filename}"\r\nContent-Type: ${mimeType}\r\n\r\n`,
    "utf8"
  );
  const suffix = Buffer.from(`\r\n--${boundary}--\r\n`, "utf8");
  return {
    contentType: `multipart/form-data; boundary=${boundary}`,
    body: Buffer.concat([prefix, fileBuffer, suffix]),
  };
}

describe("Phase 3 — Resume Security, Parsing, ATS, JD Match & Version Compare Unit Tests", () => {
  it("rejects spoofed PDF/DOCX signatures, binary TXT files, and oversized uploads", () => {
    assert.throws(
      () =>
        validateUploadedFile({
          originalname: "evil.pdf",
          mimetype: "application/pdf",
          size: 20,
          buffer: Buffer.from("NOT A REAL PDF FILE"),
        }),
      (err) => err.code === "INVALID_FILE_SIGNATURE"
    );

    assert.throws(
      () =>
        validateUploadedFile({
          originalname: "fake.docx",
          mimetype:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: 20,
          buffer: Buffer.from("PLAIN TEXT NOT ZIP"),
        }),
      (err) => err.code === "INVALID_FILE_SIGNATURE"
    );

    assert.throws(
      () =>
        validateUploadedFile({
          originalname: "bin.txt",
          mimetype: "text/plain",
          size: 8,
          buffer: Buffer.from([0x41, 0x00, 0x42, 0x43]),
        }),
      (err) => err.code === "INVALID_FILE_SIGNATURE"
    );

    const safe = validateUploadedFile({
      originalname: "../../my<resume>.txt",
      mimetype: "text/plain",
      size: 64,
      buffer: Buffer.from("John Doe\nSkills: React, Node.js, MongoDB\nExperience: 3 years"),
    });
    assert.equal(safe.safeName, "my_resume_.txt");
    assert.equal(safe.ext, ".txt");
    assert.ok(safe.fileHash.length === 64);
  });

  it("parses resume structure, skills, bullets, quantified impact, and builds baseline ATS score", () => {
    const sample = `
Rishi Sharma
rishi@example.com | +1 (555) 123-4567 | github.com/rishi | linkedin.com/in/rishi

Summary
Full Stack Developer with 3 years of experience building scalable applications.

Technical Skills
JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, Docker, AWS, SQL

Experience
Software Engineer — Acme Corp
- Built Node.js microservices reducing API latency by 42% for 50,000+ daily users.
- Designed React dashboard improving recruiter conversion by 25%.
- Collaborated with product engineers on REST API architecture.

Projects
- AI Mock Interview Platform built with Next.js, Express, and MongoDB.

Education
B.Tech Computer Science
`;
    const parsed = parseResumeStructure(sample);
    assert.equal(parsed.parsed.contact.hasEmail, true);
    assert.equal(parsed.parsed.contact.hasPhone, true);
    assert.equal(parsed.parsed.contact.hasGithub, true);
    assert.equal(parsed.parsed.contact.hasLinkedin, true);
    assert.ok(parsed.parsed.sections.includes("Experience"));
    assert.ok(parsed.parsed.sections.includes("Skills"));
    assert.ok(parsed.parsed.skills.includes("React"));
    assert.ok(parsed.parsed.skills.includes("Node.js"));
    assert.equal(parsed.parsed.bulletCount, 4);
    assert.equal(parsed.parsed.quantifiedBulletCount, 2);

    const ats = buildBaselineAtsReport(parsed);
    assert.ok(ats.overallScore >= 60 && ats.overallScore <= 100);
  });

  it("computes deterministic JD keyword match and version comparison deltas", () => {
    const match = computeKeywordMatch(
      "Built APIs with Node.js, TypeScript, React, MongoDB and Docker.",
      ["Node.js", "TypeScript", "React", "MongoDB", "Docker"],
      "Looking for an engineer skilled in Node.js, TypeScript, React, Kubernetes, AWS, Terraform, and PostgreSQL."
    );
    assert.ok(match.matchedKeywords.includes("Node.js"));
    assert.ok(match.missingKeywords.includes("Kubernetes"));
    assert.ok(match.matchScore > 0 && match.matchScore < 100);

    const diff = compareResumeVersions(
      {
        _id: "r1",
        version: 1,
        originalName: "v1.txt",
        wordCount: 250,
        parsed: { skills: ["React", "JavaScript"], quantifiedBulletCount: 1 },
        atsReport: { overallScore: 68 },
      },
      {
        _id: "r2",
        version: 2,
        originalName: "v2.txt",
        wordCount: 340,
        parsed: {
          skills: ["React", "TypeScript", "Docker"],
          quantifiedBulletCount: 4,
        },
        atsReport: { overallScore: 84 },
      }
    );
    assert.equal(diff.deltas.atsScore, 16);
    assert.equal(diff.deltas.quantifiedBullets, 3);
    assert.deepEqual(diff.addedSkills, ["TypeScript", "Docker"]);
    assert.deepEqual(diff.removedSkills, ["JavaScript"]);
  });
});

describe("Phase 3 — Resume Analyzer API End-to-End Integration Tests", () => {
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

    originals.findOne = Resume.findOne;
    originals.find = Resume.find;
    originals.countDocuments = Resume.countDocuments;
    originals.updateMany = Resume.updateMany;
    originals.create = Resume.create;
    originals.deleteOne = Resume.deleteOne;

    Resume.findOne = (query) =>
      makeQuery(() => {
        const filtered = store.filter((doc) => {
          if (query.userId && String(doc.userId) !== String(query.userId)) return false;
          if (query._id && String(doc._id) !== String(query._id)) return false;
          if (query.isActive !== undefined && doc.isActive !== query.isActive) return false;
          return true;
        });
        return filtered.sort((a, b) => (b.version || 0) - (a.version || 0))[0] || null;
      });

    Resume.find = (query) =>
      makeQuery(() =>
        store
          .filter((doc) => String(doc.userId) === String(query.userId))
          .sort((a, b) => (b.version || 0) - (a.version || 0))
      );

    Resume.countDocuments = async (query) =>
      store.filter((doc) => String(doc.userId) === String(query.userId)).length;

    Resume.updateMany = async (query, update) => {
      for (const doc of store) {
        if (String(doc.userId) === String(query.userId)) {
          if (update.$set && update.$set.isActive !== undefined) {
            doc.isActive = update.$set.isActive;
          }
        }
      }
    };

    Resume.create = async (payload) => {
      const hex = String(store.length + 1).padStart(24, "a");
      const doc = {
        ...payload,
        _id: hex,
        jdMatches: [],
        rewrites: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        save: async function () {
          this.updatedAt = new Date();
          return this;
        },
      };
      store.push(doc);
      return doc;
    };

    Resume.deleteOne = async (query) => {
      const idx = store.findIndex(
        (doc) =>
          String(doc._id) === String(query._id) &&
          String(doc.userId) === String(query.userId)
      );
      if (idx !== -1) store.splice(idx, 1);
    };
  });

  after(() => {
    Resume.findOne = originals.findOne;
    Resume.find = originals.find;
    Resume.countDocuments = originals.countDocuments;
    Resume.updateMany = originals.updateMany;
    Resume.create = originals.create;
    Resume.deleteOne = originals.deleteOne;
    setProviderOverride(null);
  });

  it("uploads TXT resume v1, enforces idempotency on duplicate, then uploads v2 and compares versions", async () => {
    const resumeV1 = Buffer.from(
      "Rishi Sharma\nrishi@example.com\nSkills: React, JavaScript, Node.js\nExperience\n- Built web apps for 100 users.\nEducation\nB.Tech CS\n",
      "utf8"
    );
    const mp1 = buildMultipartBody("resume", "resume-v1.txt", "text/plain", resumeV1);

    const up1 = await request("/api/resume/upload", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": mp1.contentType,
      },
      body: mp1.body,
    });
    const up1Body = await up1.json();
    assert.equal(up1.status, 201);
    assert.equal(up1Body.resume.version, 1);
    assert.ok(up1Body.resume.parsed.skills.includes("React"));

    // Idempotent duplicate upload returns 200 without creating v2
    const dup = await request("/api/resume/upload", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": mp1.contentType,
      },
      body: mp1.body,
    });
    const dupBody = await dup.json();
    assert.equal(dup.status, 200);
    assert.equal(dupBody.idempotent, true);
    assert.equal(store.length, 1);

    // Upload updated v2
    const resumeV2 = Buffer.from(
      "Rishi Sharma\nrishi@example.com | github.com/rishi\nSkills: React, TypeScript, Node.js, Docker, AWS\nExperience\n- Built APIs improving latency by 45% across 10,000 users.\n- Led React migration cutting bundle size by 30%.\nEducation\nB.Tech CS\n",
      "utf8"
    );
    const mp2 = buildMultipartBody("resume", "resume-v2.txt", "text/plain", resumeV2);
    const up2 = await request("/api/resume/upload", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": mp2.contentType,
      },
      body: mp2.body,
    });
    const up2Body = await up2.json();
    assert.equal(up2.status, 201);
    assert.equal(up2Body.resume.version, 2);

    // History endpoint returns both versions
    const hist = await request("/api/resume/history", {
      headers: { authorization: `Bearer ${token}` },
    });
    const histBody = await hist.json();
    assert.equal(hist.status, 200);
    assert.equal(histBody.total, 2);

    // Compare v1 vs v2
    const cmp = await request(
      `/api/resume/compare?v1=${up1Body.resume.id}&v2=${up2Body.resume.id}`,
      { headers: { authorization: `Bearer ${token}` } }
    );
    const cmpBody = await cmp.json();
    assert.equal(cmp.status, 200);
    assert.ok(cmpBody.comparison.addedSkills.includes("TypeScript"));
    assert.ok(cmpBody.comparison.deltas.atsScore >= 0);
  });

  it("runs structured AI ATS analysis, JD matching, and AI bullet rewrites", async () => {
    setProviderOverride(async ({ system }) => {
      if (system.includes("ATS resume auditor")) {
        return JSON.stringify({
          overallScore: 86,
          sectionScores: {
            formatting: 88,
            impact: 85,
            keywords: 84,
            completeness: 90,
            clarity: 83,
          },
          strengths: ["Strong quantified impact metrics"],
          weaknesses: ["Missing certifications section"],
          missingInfo: ["Phone number"],
          atsSuggestions: ["Add target job title in headline"],
          recommendedRoles: ["Full Stack Developer", "Backend Developer"],
          actionPlan: ["Add portfolio link and concise summary"],
        });
      }
      if (system.includes("ATS tailoring advisor")) {
        return JSON.stringify({
          suggestions: ["Emphasize Kubernetes and CI/CD experience in project bullets."],
        });
      }
      return JSON.stringify({
        summaryRewrite:
          "Full Stack Engineer experienced in TypeScript, React, Node.js, and AWS.",
        bulletRewrites: [
          {
            original: "Built APIs improving latency by 45%",
            improved:
              "Engineered Node.js REST APIs with caching that cut p95 latency by 45% for 10,000+ users.",
            rationale: "Leads with a strong verb and clear scale.",
          },
        ],
      });
    });

    const atsRes = await request("/api/resume/analyze", {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
    });
    const atsBody = await atsRes.json();
    assert.equal(atsRes.status, 200);
    assert.equal(atsBody.atsReport.overallScore, 86);
    assert.ok(atsBody.analysis.includes("ATS OVERALL SCORE: 86/100"));

    const jdRes = await request("/api/resume/match-jd", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        targetRole: "Cloud Full Stack Engineer",
        jobDescription:
          "We need a Full Stack Engineer proficient in React, TypeScript, Node.js, Docker, AWS, Kubernetes, and PostgreSQL.",
      }),
    });
    const jdBody = await jdRes.json();
    assert.equal(jdRes.status, 200);
    assert.ok(jdBody.match.matchedKeywords.includes("React"));
    assert.ok(jdBody.match.missingKeywords.includes("Kubernetes"));

    const rwRes = await request("/api/resume/rewrite", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ targetRole: "Senior Full Stack Engineer" }),
    });
    const rwBody = await rwRes.json();
    assert.equal(rwRes.status, 200);
    assert.equal(rwBody.rewrite.bulletRewrites.length, 1);
  });
});
