const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  requireRole,
  validateObjectId,
} = require("../middleware/securityMiddleware");
const {
  getAdminOverview,
  listUsers,
  updateUserRole,
  listAuditLogs,
  listQuestionBank,
  createQuestionBankItem,
  deleteQuestionBankItem,
} = require("../controllers/adminController");

router.use(authMiddleware, requireRole("admin"));

router.get("/overview", getAdminOverview);
router.get("/users", listUsers);
router.patch("/users/:userId/role", validateObjectId("userId"), updateUserRole);
router.get("/audit-logs", listAuditLogs);
router.get("/question-bank", listQuestionBank);
router.post("/question-bank", createQuestionBankItem);
router.delete(
  "/question-bank/:itemId",
  validateObjectId("itemId"),
  deleteQuestionBankItem
);

module.exports = router;
