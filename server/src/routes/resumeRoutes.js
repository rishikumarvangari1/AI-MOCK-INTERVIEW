const express = require("express");
const multer = require("multer");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { validateObjectId } = require("../middleware/securityMiddleware");
const {
  uploadResume,
  getMyResume,
  getResumeHistory,
  compareResumes,
  getResumeById,
  setActiveResume,
  analyzeResume,
  matchJobDescription,
  rewriteResumeBullets,
  deleteResume,
} = require("../controllers/resumeController");

const storage = multer.memoryStorage();

const fileFilter = (_req, file, callback) => {
  const allowedExtensions = [".pdf", ".docx", ".txt"];
  const dotIdx = file.originalname.lastIndexOf(".");
  const extension = dotIdx !== -1 ? file.originalname.slice(dotIdx).toLowerCase() : "";

  if (allowedExtensions.includes(extension)) {
    callback(null, true);
  } else {
    callback(new Error("Only PDF, DOCX and TXT files are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Resume Analyzer API is working",
    availableEndpoints: {
      upload: "POST /api/resume/upload",
      getActive: "GET /api/resume/me",
      history: "GET /api/resume/history",
      compare: "GET /api/resume/compare?v1=<id>&v2=<id>",
      analyze: "POST /api/resume/analyze",
      matchJd: "POST /api/resume/match-jd",
      rewrite: "POST /api/resume/rewrite",
      setActive: "PATCH /api/resume/:resumeId/active",
      delete: "DELETE /api/resume/:resumeId",
    },
  });
});

// Core active resume endpoints (backwards-compatible)
router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);
router.get("/me", authMiddleware, getMyResume);
router.get("/history", authMiddleware, getResumeHistory);
router.get("/compare", authMiddleware, compareResumes);
router.post("/analyze", authMiddleware, analyzeResume);
router.post("/match-jd", authMiddleware, matchJobDescription);
router.post("/rewrite", authMiddleware, rewriteResumeBullets);
router.delete("/me", authMiddleware, deleteResume);

// Version-specific resume endpoints
router.get("/:resumeId", authMiddleware, validateObjectId("resumeId"), getResumeById);
router.patch("/:resumeId/active", authMiddleware, validateObjectId("resumeId"), setActiveResume);
router.post("/:resumeId/analyze", authMiddleware, validateObjectId("resumeId"), analyzeResume);
router.post("/:resumeId/match-jd", authMiddleware, validateObjectId("resumeId"), matchJobDescription);
router.post("/:resumeId/rewrite", authMiddleware, validateObjectId("resumeId"), rewriteResumeBullets);
router.delete("/:resumeId", authMiddleware, validateObjectId("resumeId"), deleteResume);

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      code: err.code === "LIMIT_FILE_SIZE" ? "FILE_TOO_LARGE" : "UPLOAD_ERROR",
      message:
        err.code === "LIMIT_FILE_SIZE"
          ? "Resume file must be 5 MB or smaller."
          : err.message,
      requestId: req.requestId,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      code: "UPLOAD_ERROR",
      message: err.message || "Resume upload failed.",
      requestId: req.requestId,
    });
  }

  return next();
});

module.exports = router;
