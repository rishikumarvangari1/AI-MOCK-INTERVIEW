const logger = require("../../utils/logger");

const GEMINI_MODELS = [
  "gemini-flash-lite-latest",
  "gemini-3.8-flash",
  "gemini-2.5-flash-lite",
  "gemini-flash-latest",
];

async function callGemini({
  system,
  messages,
  maxTokens = 4000,
  temperature = 0.3,
  timeoutMs = 60000,
}) {
  const apiKey = (process.env.GEMINI_API_KEY || "").trim();
  if (!apiKey || /<[^>]+>/.test(apiKey)) {
    const error = new Error("Gemini API key is not configured.");
    error.code = "AI_NOT_CONFIGURED";
    error.provider = "gemini";
    error.statusCode = 503;
    error.retryable = false;
    throw error;
  }

  const configured = (process.env.GEMINI_MODEL || "").trim();
  const candidates = configured
    ? [configured, ...GEMINI_MODELS.filter((m) => m !== configured)]
    : GEMINI_MODELS;

  const contents = messages.map((m) => ({
    role: m.role === "assistant" || m.role === "ai" ? "model" : "user",
    parts: [{ text: String(m.content || "") }],
  }));

  const payload = {
    contents,
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
    },
  };

  if (system) {
    payload.systemInstruction = {
      parts: [{ text: String(system) }],
    };
  }

  let lastError = null;

  for (const model of candidates) {
    const cleanModel = model.replace(/^models\//, "");
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(timeoutMs),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const status = response.status;
        const msg = data.error?.message || `Gemini API returned status ${status}.`;

        // If deprecated or not found, try next candidate model
        if (status === 404 || status === 400 && msg.includes("no longer available")) {
          logger.warn("gemini_model_fallback", { model: cleanModel, message: msg });
          continue;
        }

        const err = new Error(msg);
        err.code = status === 429 ? "AI_RATE_LIMIT" : "AI_PROVIDER_ERROR";
        err.provider = "gemini";
        err.statusCode = status;
        err.retryable = status === 429 || status >= 500;
        throw err;
      }

      const candidate = data.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text?.trim();

      if (!text) {
        const err = new Error("Gemini returned an empty response.");
        err.code = "AI_EMPTY_RESPONSE";
        err.provider = "gemini";
        err.statusCode = 502;
        err.retryable = true;
        throw err;
      }

      return text;
    } catch (err) {
      lastError = err;
      if (err.statusCode && err.statusCode !== 404 && err.statusCode !== 503) {
        throw err;
      }
    }
  }

  throw lastError || new Error("All Gemini candidate models failed.");
}

module.exports = {
  callGemini,
  GEMINI_MODELS,
};
