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
    process.env.AI_PROVIDER_PRIMARY || "gemini"
  )
    .trim()
    .toLowerCase();

  const corsRaw = process.env.CORS_ORIGIN || process.env.CLIENT_URL || "http://localhost:3000,http://127.0.0.1:3000";

  return {
    port: Number.isFinite(port) && port > 0 ? port : 5000,
    nodeEnv,
    isProduction: nodeEnv === "production",
    corsOrigins: parseCorsOrigins(corsRaw),
    clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
    mongoUri: (process.env.MONGO_URI || "").trim(),
    jwtSecret: (process.env.JWT_SECRET || "").trim(),
    aiPrimaryProvider:
      aiPrimaryProvider === "groq"
        ? "groq"
        : aiPrimaryProvider === "openrouter"
          ? "openrouter"
          : "gemini",
    geminiApiKey: (process.env.GEMINI_API_KEY || "").trim(),
    geminiModel: (process.env.GEMINI_MODEL || "gemini-flash-lite-latest").trim(),
    groqApiKey: (process.env.GROQ_API_KEY || "").trim(),
    groqModel: (process.env.GROQ_MODEL || "openai/gpt-oss-20b").trim(),
    openrouterApiKey: (process.env.OPENROUTER_API_KEY || "").trim(),
    openrouterModel: (process.env.OPENROUTER_MODEL || "liquid/lfm-3-1.7b:free").trim(),
    anthropicApiKey: (process.env.ANTHROPIC_API_KEY || "").trim(),
    anthropicModel: (process.env.AI_MODEL || "claude-sonnet-4-6").trim(),
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

  const hasGemini =
    Boolean(config.geminiApiKey) &&
    !PLACEHOLDER_PATTERN.test(config.geminiApiKey);
  const hasGroq =
    Boolean(config.groqApiKey) &&
    !PLACEHOLDER_PATTERN.test(config.groqApiKey);
  const hasOpenRouter =
    Boolean(config.openrouterApiKey) &&
    !PLACEHOLDER_PATTERN.test(config.openrouterApiKey);
  const hasAnthropic =
    Boolean(config.anthropicApiKey) &&
    !PLACEHOLDER_PATTERN.test(config.anthropicApiKey);

  if (!hasGemini && !hasGroq && !hasOpenRouter && !hasAnthropic) {
    warnings.push(
      "No external AI API key (GEMINI_API_KEY, GROQ_API_KEY, or OPENROUTER_API_KEY) is configured. The system will use its built-in offline technical knowledge engine for interview Q&A."
    );
  }

  return {
    config,
    valid: errors.length === 0,
    errors,
    warnings,
    providers: {
      gemini: hasGemini,
      groq: hasGroq,
      openrouter: hasOpenRouter,
      anthropic: hasAnthropic,
      primary: config.aiPrimaryProvider,
    },
  };
}

module.exports = {
  getConfig,
  validateConfig,
  parseCorsOrigins,
};
