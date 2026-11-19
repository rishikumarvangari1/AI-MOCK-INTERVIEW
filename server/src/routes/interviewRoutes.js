const express = require("express");
const router = express.Router();

const {
  startInterview,
  saveAnswers,
  submitAnswer,
  completeInterview,
  getInterviewResults,
  logIntegrityEvent,
  getIntegrityReport,
  getInterviewAnalytics,
  getInterviewHistory,
  getInterviewById,
  deleteInterview,
} = require("../controllers/interviewcontroller");

const authMiddleware = require("../middleware/authMiddleware");
const { validateObjectId } = require("../middleware/securityMiddleware");

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Interview API is working",
    availableEndpoints: {
      start: "POST /api/interviews/start",
      saveAnswers: "PUT /api/interviews/:interviewId/answers",
      submitAnswer: "POST /api/interviews/:interviewId/answer",
      submit: "POST /api/interviews/:interviewId/submit",
      complete: "POST /api/interviews/:interviewId/complete",
      results: "GET /api/interviews/:interviewId/results",
      integrity: "GET/POST /api/interviews/:interviewId/integrity",
      history: "GET /api/interviews/history",
      analytics: "GET /api/interviews/analytics",
      details: "GET /api/interviews/:interviewId",
      delete: "DELETE /api/interviews/:interviewId",
    },
  });
});

router.post("/start", authMiddleware, startInterview);
router.get("/history", authMiddleware, getInterviewHistory);
router.get("/analytics", authMiddleware, getInterviewAnalytics);

router.put(
  "/:interviewId/answers",
  authMiddleware,
  validateObjectId("interviewId"),
  saveAnswers
);
router.post(
  "/:interviewId/answer",
  authMiddleware,
  validateObjectId("interviewId"),
  submitAnswer
);
router.post(
  "/:interviewId/submit",
  authMiddleware,
  validateObjectId("interviewId"),
  completeInterview
);
router.post(
  "/:interviewId/complete",
  authMiddleware,
  validateObjectId("interviewId"),
  completeInterview
);
router.get(
  "/:interviewId/results",
  authMiddleware,
  validateObjectId("interviewId"),
  getInterviewResults
);
router.post(
  "/:interviewId/integrity",
  authMiddleware,
  validateObjectId("interviewId"),
  logIntegrityEvent
);
router.get(
  "/:interviewId/integrity",
  authMiddleware,
  validateObjectId("interviewId"),
  getIntegrityReport
);
router.get(
  "/:interviewId",
  authMiddleware,
  validateObjectId("interviewId"),
  getInterviewById
);
router.delete(
  "/:interviewId",
  authMiddleware,
  validateObjectId("interviewId"),
  deleteInterview
);

module.exports = router;
