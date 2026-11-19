const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret-key-at-least-32-chars-long";

const User = require("../src/models/User");
const Interview = require("../src/models/Interview");
const Resume = require("../src/models/resume");
const CareerPlan = require("../src/models/CareerPlan");
const JobApplication = require("../src/models/JobApplication");
const BuiltResume = require("../src/models/BuiltResume");
const Notification = require("../src/models/Notification");
const { createApp } = require("../src/app");
const { createTestClient } = require("./helpers/httpTestClient");

describe("Phase 6 & 7 — Career Intelligence, Jobs, Builder, Notifications & Admin RBAC Tests", () => {
  let request;
  let studentToken;
  let adminToken;
  const studentId = "507f1f77bcf86cd799439011";
  const adminId = "507f1f77bcf86cd799439012";
  const jobsStore = [];
  let careerDoc = null;
  let builtDoc = null;
  const notifStore = [];
  const originals = {};

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

    originals.userFindById = User.findById;
    originals.userFind = User.find;
    originals.userCount = User.countDocuments;
    originals.userFindByIdAndUpdate = User.findByIdAndUpdate;
    originals.interviewFind = Interview.find;
    originals.interviewCount = Interview.countDocuments;
    originals.resumeFindOne = Resume.findOne;
    originals.resumeCount = Resume.countDocuments;
    originals.careerFindOne = CareerPlan.findOne;
    originals.careerCreate = CareerPlan.create;
    originals.jobFind = JobApplication.find;
    originals.jobCount = JobApplication.countDocuments;
    originals.jobCreate = JobApplication.create;
    originals.jobFindOne = JobApplication.findOne;
    originals.jobDelete = JobApplication.findOneAndDelete;
    originals.builtFindOne = BuiltResume.findOne;
    originals.builtCreate = BuiltResume.create;
    originals.builtUpdate = BuiltResume.findOneAndUpdate;
    originals.notifFind = Notification.find;
    originals.notifCreate = Notification.create;
    originals.notifUpdateMany = Notification.updateMany;

    User.findById = () =>
      makeChain(() => ({
        _id: studentId,
        name: "Rishi",
        email: "rishi@example.com",
        role: "student",
        profile: {
          skills: ["React", "Node.js", "TypeScript"],
          targetRoles: ["Full Stack Developer"],
        },
      }));
    User.find = () =>
      makeChain(() => [
        { _id: studentId, name: "Rishi", email: "rishi@example.com", role: "student", createdAt: new Date() },
        { _id: adminId, name: "Admin", email: "admin@example.com", role: "admin", createdAt: new Date() },
      ]);
    User.countDocuments = async () => 2;
    User.findByIdAndUpdate = (id, update) =>
      makeChain(() => ({
        _id: id,
        name: "Rishi",
        email: "rishi@example.com",
        role: update.$set.role,
      }));

    Interview.find = () => makeChain(() => []);
    Interview.countDocuments = async () => 4;

    Resume.findOne = () =>
      makeChain(() => ({
        _id: "507f1f77bcf86cd799439099",
        resumeText: "Experienced with React, Node.js, TypeScript, MongoDB, Docker",
        parsed: { skills: ["React", "Node.js", "TypeScript", "MongoDB", "Docker"] },
      }));
    Resume.countDocuments = async () => 3;

    CareerPlan.findOne = async () => careerDoc;
    CareerPlan.create = async (payload) => {
      careerDoc = {
        ...payload,
        _id: "507f1f77bcf86cd799439031",
        save: async () => careerDoc,
      };
      return careerDoc;
    };

    JobApplication.find = () => makeChain(() => [...jobsStore]);
    JobApplication.countDocuments = async () => jobsStore.length;
    JobApplication.create = async (payload) => {
      const doc = {
        ...payload,
        _id: String(jobsStore.length + 1).padStart(24, "c"),
        save: async function () {
          return this;
        },
      };
      jobsStore.push(doc);
      return doc;
    };
    JobApplication.findOne = async (query) =>
      jobsStore.find(
        (j) => String(j._id) === String(query._id) && String(j.userId) === String(query.userId)
      ) || null;
    JobApplication.findOneAndDelete = async (query) => {
      const idx = jobsStore.findIndex(
        (j) => String(j._id) === String(query._id) && String(j.userId) === String(query.userId)
      );
      if (idx === -1) return null;
      return jobsStore.splice(idx, 1)[0];
    };

    BuiltResume.findOne = async () => builtDoc;
    BuiltResume.create = async (payload) => {
      builtDoc = { ...payload, _id: "507f1f77bcf86cd799439041" };
      return builtDoc;
    };
    BuiltResume.findOneAndUpdate = async (_q, payload) => {
      builtDoc = { ...payload, _id: "507f1f77bcf86cd799439041" };
      return builtDoc;
    };

    Notification.find = () => makeChain(() => [...notifStore]);
    Notification.create = async (payload) => {
      const doc = { ...payload, _id: "507f1f77bcf86cd799439051", createdAt: new Date() };
      notifStore.push(doc);
      return doc;
    };
    Notification.updateMany = async () => {
      for (const n of notifStore) n.read = true;
    };
  });

  after(() => {
    User.findById = originals.userFindById;
    User.find = originals.userFind;
    User.countDocuments = originals.userCount;
    User.findByIdAndUpdate = originals.userFindByIdAndUpdate;
    Interview.find = originals.interviewFind;
    Interview.countDocuments = originals.interviewCount;
    Resume.findOne = originals.resumeFindOne;
    Resume.countDocuments = originals.resumeCount;
    CareerPlan.findOne = originals.careerFindOne;
    CareerPlan.create = originals.careerCreate;
    JobApplication.find = originals.jobFind;
    JobApplication.countDocuments = originals.jobCount;
    JobApplication.create = originals.jobCreate;
    JobApplication.findOne = originals.jobFindOne;
    JobApplication.findOneAndDelete = originals.jobDelete;
    BuiltResume.findOne = originals.builtFindOne;
    BuiltResume.create = originals.builtCreate;
    BuiltResume.findOneAndUpdate = originals.builtUpdate;
    Notification.find = originals.notifFind;
    Notification.create = originals.notifCreate;
    Notification.updateMany = originals.notifUpdateMany;
  });

  it("Career overview synthesizes skills, recommendations, and allows milestone status updates", async () => {
    const res = await request("/api/career/overview", {
      headers: { authorization: `Bearer ${studentToken}` },
    });
    const body = await res.json();
    assert.equal(res.status, 200);
    assert.ok(body.skillInventory.length >= 3);
    assert.ok(body.recommendations.length >= 3);
    assert.ok(body.roadmap.milestones.length >= 1);

    const mId = body.roadmap.milestones[0].id;
    const upd = await request(`/api/career/roadmap/${mId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${studentToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "done" }),
    });
    const updBody = await upd.json();
    assert.equal(upd.status, 200);
    assert.equal(updBody.milestone.status, "done");
    assert.ok(updBody.progress > 0);
  });

  it("Job tracker computes resume match score, updates status, and deletes cleanly", async () => {
    const createRes = await request("/api/jobs", {
      method: "POST",
      headers: {
        authorization: `Bearer ${studentToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        company: "Acme Cloud",
        role: "Full Stack Engineer",
        jobDescription: "Requires React, TypeScript, Node.js, Docker, and Kubernetes experience.",
      }),
    });
    const createBody = await createRes.json();
    assert.equal(createRes.status, 201);
    assert.ok(createBody.job.matchScore > 0);
    assert.ok(createBody.job.matchedKeywords.includes("React"));

    const jobId = createBody.job._id;
    const patchRes = await request(`/api/jobs/${jobId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${studentToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "interviewing", notes: "Recruiter screen scheduled" }),
    });
    assert.equal(patchRes.status, 200);

    const delRes = await request(`/api/jobs/${jobId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${studentToken}` },
    });
    assert.equal(delRes.status, 200);
  });

  it("Resume Builder seeds draft from profile/resume and saves updates", async () => {
    const getRes = await request("/api/resume-builder", {
      headers: { authorization: `Bearer ${studentToken}` },
    });
    const getBody = await getRes.json();
    assert.equal(getRes.status, 200);
    assert.ok(getBody.draft.skills.includes("React"));

    const saveRes = await request("/api/resume-builder", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${studentToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: "Backend ATS Resume",
        template: "modern",
        contact: { fullName: "Rishi Sharma", email: "rishi@example.com" },
        summary: "Full stack developer",
        skills: ["Node.js", "TypeScript"],
      }),
    });
    const saveBody = await saveRes.json();
    assert.equal(saveRes.status, 200);
    assert.equal(saveBody.draft.template, "modern");
  });

  it("Notifications lists welcome reminder and marks all read", async () => {
    const listRes = await request("/api/notifications", {
      headers: { authorization: `Bearer ${studentToken}` },
    });
    const listBody = await listRes.json();
    assert.equal(listRes.status, 200);
    assert.equal(listBody.unreadCount, 1);

    const readAllRes = await request("/api/notifications/read-all", {
      method: "PATCH",
      headers: { authorization: `Bearer ${studentToken}` },
    });
    assert.equal(readAllRes.status, 200);
  });

  it("Admin console enforces RBAC (403 for student, 200 for admin, blocks self-demotion)", async () => {
    const denied = await request("/api/admin/overview", {
      headers: { authorization: `Bearer ${studentToken}` },
    });
    assert.equal(denied.status, 403);

    const ok = await request("/api/admin/overview", {
      headers: { authorization: `Bearer ${adminToken}` },
    });
    const okBody = await ok.json();
    assert.equal(ok.status, 200);
    assert.equal(okBody.metrics.totalUsers, 2);

    const selfDemote = await request(`/api/admin/users/${adminId}/role`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${adminToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ role: "student" }),
    });
    assert.equal(selfDemote.status, 400);
  });
});
