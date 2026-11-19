const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { validateObjectId } = require("../middleware/securityMiddleware");
const {
  listNotifications,
  markNotificationRead,
  markAllRead,
} = require("../controllers/notificationController");

router.get("/", authMiddleware, listNotifications);
router.patch("/read-all", authMiddleware, markAllRead);
router.patch(
  "/:notificationId/read",
  authMiddleware,
  validateObjectId("notificationId"),
  markNotificationRead
);

module.exports = router;
