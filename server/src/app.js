const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { getConfig, validateConfig } = require("./config/env");
const { DOMAINS } = require("./config/domains");
const {
  securityHeaders,
  requestContext,
  createRateLimiter,
  notFoundHandler,
  errorHandler,
} = require("./middleware/securityMiddleware");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profileRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const careerRoutes = require("./routes/careerRoutes");
const jobRoutes = require("./routes/jobRoutes");
const resumeBuilderRoutes = require("./routes/resumeBuilderRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const assistantRoutes = require("./routes/assistantRoutes");
const adminRoutes = require("./routes/adminRoutes");

function createApp(options = {}) {
  const config = getConfig();
  const app = express();

  app.disable("x-powered-by");

  // Security headers and request correlation/logging
  app.use(securityHeaders);
  app.use(requestContext);

  // Scoped CORS allowlist
  const allowedOrigins = new Set(config.corsOrigins);
  app.use(
    cors({
      origin(origin, callback) {
        // Allow non-browser / same-origin / test requests with no Origin header
        if (!origin || allowedOrigins.has(origin)) {
          return callback(null, true);
        }
        if (!config.isProduction && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
          return callback(null, true);
        }
        return callback(null, false);
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
    })
  );

  // Body parsing with explicit size caps
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // Rate limiters (can be relaxed/customized in tests via options)
  const rateLimits = options.rateLimits || {};
  const generalLimiter = createRateLimiter({
    windowMs: rateLimits.windowMs ?? 15 * 60 * 1000,
    max: rateLimits.generalMax ?? 300,
    keyPrefix: "api",
  });
  const authLimiter = createRateLimiter({
    windowMs: rateLimits.windowMs ?? 15 * 60 * 1000,
    max: rateLimits.authMax ?? 30,
    keyPrefix: "auth",
    message: "Too many authentication attempts. Please wait before trying again.",
  });

  app.use("/api", generalLimiter);

  // Home route
  app.get("/", (_req, res) => {
    res.status(200).send("AI Mock Interview Backend is running successfully!");
  });

  // Health & operational diagnostics (never exposes secrets)
  app.get("/api/health", (_req, res) => {
    const check = validateConfig({ requireDatabase: false });
    res.status(200).json({
      success: true,
      message: "Backend is running",
      database:
        mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
      aiProviders: check.providers,
      timestamp: new Date().toISOString(),
    });
  });

  // Canonical Domain Catalog
  app.get("/api/domains", (_req, res) => {
    res.status(200).json({
      success: true,
      count: DOMAINS.length,
      domains: DOMAINS,
    });
  });

  // Domain API routes
  app.use("/api/auth", authLimiter, authRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/dashboard", dashboardRoutes);
  app.use("/api/interviews", interviewRoutes);
  app.use("/api/resume", resumeRoutes);
  app.use("/api/career", careerRoutes);
  app.use("/api/jobs", jobRoutes);
  app.use("/api/resume-builder", resumeBuilderRoutes);
  app.use("/api/notifications", notificationRoutes);
  app.use("/api/analytics", analyticsRoutes);
  app.use("/api/assistant", assistantRoutes);
  app.use("/api/admin", adminRoutes);

  // Structured 404 & global error handler
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
