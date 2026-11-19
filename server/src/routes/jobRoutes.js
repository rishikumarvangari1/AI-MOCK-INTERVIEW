const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { validateObjectId } = require("../middleware/securityMiddleware");
const {
  listJobs,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

router.get("/", authMiddleware, listJobs);
router.post("/", authMiddleware, createJob);
router.patch("/:jobId", authMiddleware, validateObjectId("jobId"), updateJob);
router.delete("/:jobId", authMiddleware, validateObjectId("jobId"), deleteJob);

module.exports = router;
