const BuiltResume = require("../models/BuiltResume");
const User = require("../models/User");
const Resume = require("../models/resume");
const logger = require("../utils/logger");

const VALID_TEMPLATES = new Set(["classic", "modern", "compact"]);

exports.getBuiltResume = async (req, res) => {
  try {
    const userId = req.user.id;
    let draft = await BuiltResume.findOne({ userId });

    if (!draft) {
      const [user, activeResume] = await Promise.all([
        User.findById(userId).select("-password"),
        Resume.findOne({ userId, isActive: true }).sort({ updatedAt: -1 }),
      ]);

      const mergedSkills = [
        ...new Set([
          ...(user?.profile?.skills || []),
          ...(activeResume?.parsed?.skills || []),
        ]),
      ].slice(0, 25);

      draft = await BuiltResume.create({
        userId,
        title: `${user?.name || "Candidate"} — ATS Resume`,
        template: "classic",
        contact: {
          fullName: user?.name || "",
          email: user?.email || "",
          location: user?.profile?.location || "",
          linkedin: user?.profile?.linkedinUrl || "",
          github: user?.profile?.githubUrl || "",
          portfolio: user?.profile?.portfolioUrl || "",
        },
        summary: user?.profile?.bio || "",
        skills: mergedSkills,
        experience: [],
        projects: [],
        education: user?.profile?.education
          ? [{ institution: user.profile.education, degree: "", period: "" }]
          : [],
      });
    }

    return res.status(200).json({
      success: true,
      draft,
    });
  } catch (error) {
    logger.error("resume_builder_get_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "RESUME_BUILDER_FETCH_FAILED",
      message: "Unable to load resume builder draft.",
    });
  }
};

exports.saveBuiltResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const body = req.body && typeof req.body === "object" ? req.body : {};

    const template = VALID_TEMPLATES.has(body.template)
      ? body.template
      : "classic";

    const cleanBullets = (arr) =>
      Array.isArray(arr)
        ? arr.map((s) => String(s || "").trim()).filter(Boolean).slice(0, 8)
        : [];

    const payload = {
      userId,
      title: String(body.title || "My ATS Resume").trim().slice(0, 120),
      template,
      contact: {
        fullName: String(body.contact?.fullName || "").trim().slice(0, 100),
        email: String(body.contact?.email || "").trim().slice(0, 160),
        phone: String(body.contact?.phone || "").trim().slice(0, 40),
        location: String(body.contact?.location || "").trim().slice(0, 120),
        linkedin: String(body.contact?.linkedin || "").trim().slice(0, 240),
        github: String(body.contact?.github || "").trim().slice(0, 240),
        portfolio: String(body.contact?.portfolio || "").trim().slice(0, 240),
      },
      summary: String(body.summary || "").trim().slice(0, 1200),
      skills: Array.isArray(body.skills)
        ? body.skills.map((s) => String(s || "").trim()).filter(Boolean).slice(0, 35)
        : [],
      experience: Array.isArray(body.experience)
        ? body.experience.slice(0, 10).map((item) => ({
            company: String(item?.company || "").trim().slice(0, 120),
            role: String(item?.role || "").trim().slice(0, 120),
            period: String(item?.period || "").trim().slice(0, 80),
            bullets: cleanBullets(item?.bullets),
          }))
        : [],
      projects: Array.isArray(body.projects)
        ? body.projects.slice(0, 10).map((item) => ({
            name: String(item?.name || "").trim().slice(0, 120),
            tech: String(item?.tech || "").trim().slice(0, 200),
            bullets: cleanBullets(item?.bullets),
          }))
        : [],
      education: Array.isArray(body.education)
        ? body.education.slice(0, 5).map((item) => ({
            institution: String(item?.institution || "").trim().slice(0, 160),
            degree: String(item?.degree || "").trim().slice(0, 160),
            period: String(item?.period || "").trim().slice(0, 80),
          }))
        : [],
    };

    const draft = await BuiltResume.findOneAndUpdate({ userId }, payload, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });

    return res.status(200).json({
      success: true,
      message: "Resume draft saved.",
      draft,
    });
  } catch (error) {
    logger.error("resume_builder_save_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "RESUME_BUILDER_SAVE_FAILED",
      message: "Unable to save resume builder draft.",
    });
  }
};
