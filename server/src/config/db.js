const mongoose = require("mongoose");
const logger = require("../utils/logger");

let localMongoServer = null;

async function startLocalDevMongo() {
  let MongoMemoryServer;
  try {
    ({ MongoMemoryServer } = require("mongodb-memory-server"));
  } catch {
    throw new Error(
      "mongodb-memory-server is not installed. Run `npm --prefix server install` or configure a working MONGO_URI."
    );
  }

  localMongoServer = await MongoMemoryServer.create({
    instance: {
      dbName: "ai_mock_interview",
    },
  });

  const localUri = localMongoServer.getUri("ai_mock_interview");
  await mongoose.connect(localUri, {
    serverSelectionTimeoutMS: 10000,
  });

  logger.warn("mongodb_local_dev_fallback_active", {
    database: mongoose.connection.name,
    message:
      "Connected to local dev MongoDB because MONGO_URI was unreachable.",
  });

  console.warn(
    "\n[DB Notice] MONGO_URI could not be reached. Started local dev MongoDB automatically.\n"
  );
}

const connectDB = async () => {
  const uri = (process.env.MONGO_URI || "").trim();
  const isProd = process.env.NODE_ENV === "production";

  if (!uri || /<[^>]+>/.test(uri)) {
    if (isProd) {
      throw new Error(
        "MONGO_URI is missing or contains placeholder tokens (<...>) in server/.env."
      );
    }
    await startLocalDevMongo();
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: isProd ? 10000 : 5000,
    });

    logger.info("mongodb_connected", {
      database: mongoose.connection.name,
      host: mongoose.connection.host,
    });
  } catch (error) {
    if (isProd) {
      throw error;
    }

    logger.warn("mongodb_primary_unreachable", {
      reason: error.message,
      fallback: "local_dev_mongodb",
    });

    try {
      await mongoose.disconnect();
    } catch {
      // ignore disconnect error before fallback
    }

    await startLocalDevMongo();
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
  } catch {
    // ignore close error
  }

  if (localMongoServer) {
    try {
      await localMongoServer.stop();
    } catch {
      // ignore stop error
    }
    localMongoServer = null;
  }
};

module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.disconnectDB = disconnectDB;
