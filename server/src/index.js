const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const connectDB = require("./config/db");
const { disconnectDB } = require("./config/db");
const { validateConfig } = require("./config/env");
const { createApp } = require("./app");
const logger = require("./utils/logger");

const startServer = async () => {
  const isProd = process.env.NODE_ENV === "production";
  const envCheck = validateConfig({ requireDatabase: isProd });

  for (const warning of envCheck.warnings) {
    logger.warn("env_warning", { message: warning });
  }

  if (!envCheck.valid) {
    for (const err of envCheck.errors) {
      logger.error("env_validation_error", { message: err });
    }
    console.error("\nConfiguration errors prevented backend startup:");
    for (const err of envCheck.errors) {
      console.error(`  - ${err}`);
    }
    console.error("See server/.env.example for required variables.\n");
    process.exit(1);
  }

  try {
    await connectDB();

    const app = createApp();
    const { port } = envCheck.config;

    const server = app.listen(port, () => {
      logger.info("server_started", {
        port,
        aiProviders: envCheck.providers,
      });
      console.log("------------------------------------");
      console.log("AI MOCK INTERVIEW BACKEND STARTED");
      console.log(`Server:     http://localhost:${port}`);
      console.log(`Health:     http://localhost:${port}/api/health`);
      console.log(`Domains:    http://localhost:${port}/api/domains`);
      console.log(`Auth:       http://localhost:${port}/api/auth`);
      console.log(`Interviews: http://localhost:${port}/api/interviews`);
      console.log(`Resume:     http://localhost:${port}/api/resume`);
      console.log("------------------------------------");
    });

    const shutdown = async (signal) => {
      logger.info("server_shutdown_started", { signal });
      server.close(async () => {
        await disconnectDB();
        process.exit(0);
      });
    };

    process.on("SIGINT", () => void shutdown("SIGINT"));
    process.on("SIGTERM", () => void shutdown("SIGTERM"));
    process.once("SIGUSR2", async () => {
      server.close(async () => {
        await disconnectDB();
        process.kill(process.pid, "SIGUSR2");
      });
    });
  } catch (error) {
    logger.error("server_startup_failed", { error });
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
