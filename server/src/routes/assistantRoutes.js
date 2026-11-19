const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  chatWithAssistant,
  getAssistantHistory,
  clearAssistantHistory,
} = require("../controllers/assistantController");

router.post("/chat", chatWithAssistant);
router.get("/history", authMiddleware, getAssistantHistory);
router.delete("/history", authMiddleware, clearAssistantHistory);

module.exports = router;
