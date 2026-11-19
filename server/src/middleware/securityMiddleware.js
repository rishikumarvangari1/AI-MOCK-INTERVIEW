const crypto = require("node:crypto");
const mongoose = require("mongoose");
const logger = require("../utils/logger");
const { AppError } = require("../utils/errors");

function securityHeaders(_req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), payment=(), usb=(), bluetooth=()"
  );
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("X-XSS-Protection", "0");
  next();
}

function requestContext(req, res, next) {
  const incomingId = req.headers["x-request-id"];
  const requestId =
    typeof incomingId === "string" && /^[a-zA-Z0-9_-]{8,64}$/.test(incomingId)
      ? incomingId
      : crypto.randomUUID();

  req.requestId = requestId;
  res.setHeader("X-Request-Id", requestId);

  const startedAt = Date.now();
  res.on("finish", () => {
    logger.info("http_request", {
      requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      userId: req.user?.id || null,
    });
  });

  next();
}

function createRateLimiter(options = {}) {
  const {
    windowMs = 15 * 60 * 1000,
    max = 100,
    keyPrefix = "global",
    message = "Too many requests. Please try again later.",
  } = options;

  const buckets = new Map();

  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of buckets.entries()) {
      if (entry.resetAt <= now) {
        buckets.delete(key);
      }
    }
  }, Math.min(windowMs, 60 * 1000));

  if (typeof cleanup.unref === "function") {
    cleanup.unref();
  }

  return function rateLimiter(req, res, next) {
    const identity = req.user?.id || req.ip || req.socket?.remoteAddress || "unknown";
    const key = `${keyPrefix}:${identity}`;
    const now = Date.now();

    let entry = buckets.get(key);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      buckets.set(key, entry);
    }

    entry.count += 1;

    const remaining = Math.max(0, max - entry.count);
    const resetSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));

    res.setHeader("RateLimit-Limit", String(max));
    res.setHeader("RateLimit-Remaining", String(remaining));
    res.setHeader("RateLimit-Reset", String(resetSeconds));

    if (entry.count > max) {
      res.setHeader("Retry-After", String(resetSeconds));
      return res.status(429).json({
        success: false,
        code: "RATE_LIMITED",
        message,
        requestId: req.requestId,
      });
    }

    return next();
  };
}

function validateObjectId(paramName = "id") {
  return function objectIdMiddleware(req, res, next) {
    const value = req.params?.[paramName];
    if (!value || !mongoose.isValidObjectId(value)) {
      return res.status(400).json({
        success: false,
        code: "INVALID_ID",
        message: `Invalid ${paramName} format`,
        requestId: req.requestId,
      });
    }
    return next();
  };
}

function requireRole(...allowedRoles) {
  return function roleMiddleware(req, res, next) {
    const role = req.user?.role || "student";
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        code: "UNAUTHORIZED",
        message: "Authentication required",
        requestId: req.requestId,
      });
    }
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        code: "FORBIDDEN",
        message: "You do not have permission to access this resource",
        requestId: req.requestId,
      });
    }
    return next();
  };
}

function notFoundHandler(req, res) {
  return res.status(404).json({
    success: false,
    code: "ROUTE_NOT_FOUND",
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    requestId: req.requestId,
  });
}

function errorHandler(err, req, res, _next) {
  if (err && err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      code: "INVALID_JSON",
      message: "Request body contains malformed JSON",
      requestId: req.requestId,
    });
  }

  if (err && err.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      code: "PAYLOAD_TOO_LARGE",
      message: "Request payload exceeds the allowed size limit",
      requestId: req.requestId,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
      requestId: req.requestId,
    });
  }

  if (err && err.name === "CastError") {
    return res.status(400).json({
      success: false,
      code: "INVALID_ID",
      message: "Invalid identifier provided",
      requestId: req.requestId,
    });
  }

  if (err && err.code === 11000) {
    return res.status(409).json({
      success: false,
      code: "DUPLICATE_RECORD",
      message: "A record with this unique value already exists",
      requestId: req.requestId,
    });
  }

  if (err && err.name === "ValidationError") {
    const details = Object.values(err.errors || {}).map((item) => item.message);
    return res.status(400).json({
      success: false,
      code: "VALIDATION_ERROR",
      message: details[0] || "Validation failed",
      details,
      requestId: req.requestId,
    });
  }

  logger.error("unhandled_error", {
    requestId: req.requestId,
    path: req.originalUrl,
    method: req.method,
    error: err,
  });

  return res.status(500).json({
    success: false,
    code: "INTERNAL_ERROR",
    message: "An unexpected server error occurred",
    requestId: req.requestId,
  });
}

module.exports = {
  securityHeaders,
  requestContext,
  createRateLimiter,
  validateObjectId,
  requireRole,
  notFoundHandler,
  errorHandler,
};
