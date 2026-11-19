class AppError extends Error {
  constructor(statusCode, message, code = "APP_ERROR", details = undefined) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
  }
}

const badRequest = (message, details) =>
  new AppError(400, message, "BAD_REQUEST", details);

const unauthorized = (message = "Authentication required") =>
  new AppError(401, message, "UNAUTHORIZED");

const forbidden = (message = "You do not have permission to perform this action") =>
  new AppError(403, message, "FORBIDDEN");

const notFound = (message = "Resource not found") =>
  new AppError(404, message, "NOT_FOUND");

const conflict = (message) => new AppError(409, message, "CONFLICT");

const unprocessable = (message, details) =>
  new AppError(422, message, "UNPROCESSABLE_ENTITY", details);

const tooManyRequests = (message = "Too many requests. Please try again later.") =>
  new AppError(429, message, "RATE_LIMITED");

const serviceUnavailable = (message = "Service temporarily unavailable") =>
  new AppError(503, message, "SERVICE_UNAVAILABLE");

module.exports = {
  AppError,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  unprocessable,
  tooManyRequests,
  serviceUnavailable,
};
