const Groq = require("groq-sdk");
const logger = require("../../utils/logger");

const GROQ_MODELS = [
  "openai/gpt-oss-20b",
  "llama-3.1-8b-instant",
  "openai/gpt-oss-120b",
  "llama-3.3-70b-versatile",
];

async function callGroq({
  system,
  messages,
  maxTokens = 4000,
  temperature = 0.3,
  timeoutMs = 60000,
  jsonMode = false,
}) {
  const apiKey = (process.env.GROQ_API_KEY || "").trim();
  if (!apiKey || /<[^>]+>/.test(apiKey)) {
    const error = new Error("Groq API key is not configured.");
    error.code = "AI_NOT_CONFIGURED";
    error.provider = "groq";
    error.statusCode = 503;
    error.retryable = false;
    throw error;
  }

  const client = new Groq({ apiKey, timeout: timeoutMs });
  const configured = (process.env.GROQ_MODEL || "").trim();
  const candidates = configured
    ? [configured, ...GROQ_MODELS.filter((m) => m !== configured)]
    : GROQ_MODELS;

  let lastError = null;

  for (const model of candidates) {
    try {
      const isReasoningModel = model.startsWith("openai/gpt-oss");
      const effectiveMaxTokens = isReasoningModel
        ? Math.min(8000, Math.max(maxTokens, jsonMode ? 6500 : 3000))
        : maxTokens;

      const payload = {
        model,
        temperature,
        max_tokens: effectiveMaxTokens,
        messages: [
          ...(system ? [{ role: "system", content: system }] : []),
          ...messages,
        ],
        ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
        ...(isReasoningModel ? { reasoning_effort: "low" } : {}),
      };

      const completion = await client.chat.completions.create(payload);
      let text = completion.choices?.[0]?.message?.content?.trim();

      // If reasoning model returned content in reasoning field and content is empty
      if (!text && completion.choices?.[0]?.message?.reasoning) {
        text = completion.choices[0].message.reasoning.trim();
      }

      if (!text) {
        const err = new Error("Groq returned an empty response.");
        err.code = "AI_EMPTY_RESPONSE";
        err.provider = "groq";
        err.statusCode = 502;
        err.retryable = true;
        throw err;
      }

      return text;
    } catch (error) {
      const status = Number(error?.status || error?.statusCode || 500);
      const msg = error?.message || "Groq request failed.";

      if (status === 404 || status === 400 && (msg.includes("decommissioned") || msg.includes("does not exist"))) {
        logger.warn("groq_model_fallback", { model, message: msg });
        lastError = error;
        continue;
      }

      const err = new Error(msg);
      err.code = status === 429 ? "AI_RATE_LIMIT" : "AI_PROVIDER_ERROR";
      err.provider = "groq";
      err.statusCode = status;
      err.retryable = status === 429 || status >= 500;
      throw err;
    }
  }

  throw lastError || new Error("All Groq candidate models failed.");
}

module.exports = {
  callGroq,
  GROQ_MODELS,
};
