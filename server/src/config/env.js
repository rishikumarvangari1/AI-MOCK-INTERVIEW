const PLACEHOLDER_PATTERN = /<[^>]+>/;

function parseCorsOrigins(raw) {
  if (!raw || typeof raw !== "string") {
    return ["http://localhost:3000", "http://127.0.0.1:3000"];
  }

  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function getConfig() {
  const port = Number(process.env.PORT || 5000);
  const nodeEnv = process.env.NODE_ENV || "development";
  const aiPrimaryProvider = (
    process.env.AI_PROVIDER_PRIMARY || "anthropic"
  )
    .trim()
    .toLowerCase();

  return {
    port: Number.isFinite(port) && port > 0 ? port : 5000,
    nodeEnv,
    isProduction: nodeEnv === "production",
    corsOrigins: parseCorsOrigins(process.env.CORS_ORIGIN),
    mongoUri: (process.env.MONGO_URI || "").trim(),
    jwtSecret: (process.env.JWT_SECRET || "").trim(),
    aiPrimaryProvider:
      aiPrimaryProvider === "groq" ? "groq" : "anthropic",
    anthropicApiKey: (process.env.ANTHROPIC_API_KEY || "").trim(),
    anthropicModel: (process.env.AI_MODEL || "claude-sonnet-4-6").trim(),
    groqApiKey: (process.env.GROQ_API_KEY || "").trim(),
    groqModel: (process.env.GROQ_MODEL || "llama-3.3-70b-versatile").trim(),
  };
}

function validateConfig(options = {}) {
  const { requireDatabase = true } = options;
  const config = getConfig();
  const errors = [];
  const warnings = [];

  if (requireDatabase) {
    if (!config.mongoUri) {
      errors.push(
        "MONGO_URI is missing in server/.env. See server/.env.example for the expected format."
      );
    } else if (PLACEHOLDER_PATTERN.test(config.mongoUri)) {
      errors.push(
        "MONGO_URI in server/.env still contains placeholder tokens (<...>). Replace them with your actual MongoDB credentials and host."
      );
    }
  }

  if (!config.jwtSecret || config.jwtSecret.length < 16) {
    errors.push(
      "JWT_SECRET is missing or too short (minimum 16 characters) in server/.env."
    );
  } else if (PLACEHOLDER_PATTERN.test(config.jwtSecret)) {
    errors.push("JWT_SECRET in server/.env still contains a placeholder value.");
  }

  const hasAnthropic =
    Boolean(config.anthropicApiKey) &&
    !PLACEHOLDER_PATTERN.test(config.anthropicApiKey);
  const hasGroq =
    Boolean(config.groqApiKey) &&
    !PLACEHOLDER_PATTERN.test(config.groqApiKey);

  if (!hasAnthropic && !hasGroq) {
    warnings.push(
      "Neither ANTHROPIC_API_KEY nor GROQ_API_KEY is configured. AI-powered interview and resume analysis endpoints will fail until at least one provider key is set."
    );
  } else {
    if (!hasAnthropic) {
      warnings.push(
        "ANTHROPIC_API_KEY is not configured; AI calls will fall back to Groq."
      );
    }
    if (!hasGroq) {
      warnings.push(
        "GROQ_API_KEY is not configured; Groq fallback will be unavailable."
      );
    }
  }

  return {
    config,
    valid: errors.length === 0,
    errors,
    warnings,
    providers: {
      anthropic: hasAnthropic,
      groq: hasGroq,
      primary: config.aiPrimaryProvider,
    },
  };
}

module.exports = {
  getConfig,
  validateConfig,
  parseCorsOrigins,
};
