const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  logger.error("unhandled_error", {
    path: req.originalUrl,
    method: req.method,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  const statusCode = err.statusCode || (err.name === "ValidationError" ? 400 : 500);
  const message = err.isOperational || process.env.NODE_ENV === "development"
    ? err.message
    : "An unexpected server error occurred.";

  res.status(statusCode).json({
    success: false,
    message,
    code: err.code || "INTERNAL_SERVER_ERROR",
  });
}

module.exports = { errorHandler };
