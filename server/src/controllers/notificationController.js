const Notification = require("../models/Notification");
const logger = require("../utils/logger");

exports.listNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    let items = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(25);

    if (!items.length) {
      const welcome = await Notification.create({
        userId,
        type: "reminder",
        title: "Welcome to AI Career Intelligence",
        message:
          "Upload your resume in the Resume Analyzer and complete your first mock interview to unlock full skill readiness tracking.",
        actionUrl: "/dashboard/resume",
        read: false,
      });
      items = [welcome];
    }

    const unreadCount = items.filter((n) => !n.read).length;

    return res.status(200).json({
      success: true,
      unreadCount,
      notifications: items,
    });
  } catch (error) {
    logger.error("notifications_list_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "NOTIFICATIONS_FETCH_FAILED",
      message: "Unable to load notifications.",
    });
  }
};

exports.markNotificationRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notificationId } = req.params;

    const updated = await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { $set: { read: true } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        code: "NOT_FOUND",
        message: "Notification not found.",
      });
    }

    return res.status(200).json({
      success: true,
      notification: updated,
    });
  } catch (error) {
    logger.error("notification_read_failed", { requestId: req.requestId, error });
    return res.status(500).json({
      success: false,
      code: "NOTIFICATION_UPDATE_FAILED",
      message: "Unable to update notification.",
    });
  }
};

exports.markAllRead = async (req, res) => {
  try {
    const userId = req.user.id;
    await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
    return res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
    });
  } catch (error) {
    logger.error("notifications_read_all_failed", {
      requestId: req.requestId,
      error,
    });
    return res.status(500).json({
      success: false,
      code: "NOTIFICATION_UPDATE_FAILED",
      message: "Unable to mark notifications as read.",
    });
  }
};
