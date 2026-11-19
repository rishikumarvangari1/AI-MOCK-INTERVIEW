const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getCareerOverview,
  generateCareerPlan,
  updateRoadmapMilestone,
} = require("../controllers/careerController");

router.get("/overview", authMiddleware, getCareerOverview);
router.post("/generate", authMiddleware, generateCareerPlan);
router.patch("/roadmap/:milestoneId", authMiddleware, updateRoadmapMilestone);

module.exports = router;
