const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getBuiltResume,
  saveBuiltResume,
} = require("../controllers/resumeBuilderController");

router.get("/", authMiddleware, getBuiltResume);
router.put("/", authMiddleware, saveBuiltResume);

module.exports = router;
