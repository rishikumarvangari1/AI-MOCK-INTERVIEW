const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
  updateConsent,
  exportMyData,
  deleteAccount,
} = require("../controllers/profileController");

router.get("/", authMiddleware, getProfile);
router.patch("/", authMiddleware, updateProfile);
router.patch("/consent", authMiddleware, updateConsent);
router.get("/export", authMiddleware, exportMyData);
router.delete("/", authMiddleware, deleteAccount);

module.exports = router;
