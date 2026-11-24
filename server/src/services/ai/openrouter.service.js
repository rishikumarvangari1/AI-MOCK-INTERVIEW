const logger = require("../../utils/logger");

const OPENROUTER_MODELS = [
  "liquid/lfm-3-1.7b:free",
  "nvidia/nemotron-3.5-lightning:free",
  "meta-llama/llama-3.3-70b-instruct",
  "openrouter/auto",
];

async function callOpenRouter({
  system,
  messages,
  maxTokens = 4000,
  temperature = 0.3,
  timeoutMs = 60000,
  jsonMode = false,
}) {
  const apiKey = (process.env.OPENROUTER_API_KEY || "").trim();
  if (!apiKey || /<[^>]+>/.test(apiKey)) {
    const error = new Error("OpenRouter API key is not configured.");
    error.code = "AI_NOT_CONFIGURED";
    error.provider = "openrouter";
    error.statusCode = 503;
    error.retryable = false;
    throw error;
  }

  const configured = (process.env.OPENROUTER_MODEL || "").trim();
  const candidates = configured
    ? [configured, ...OPENROUTER_MODELS.filter((m) => m !== configured)]
    : OPENROUTER_MODELS;

  const payloadMessages = [
    ...(system ? [{ role: "system", content: system }] : []),
    ...messages.map((m) => ({
      role: m.role === "assistant" || m.role === "ai" ? "assistant" : "user",
      content: String(m.content || ""),
    })),
  ];

  let lastError = null;

  for (const model of candidates) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.CLIENT_URL || "http://localhost:3000",
          "X-Title": "AI Mock Interview",
        },
        body: JSON.stringify({
          model,
          messages: payloadMessages,
          max_tokens: maxTokens,
          temperature,
          ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
        }),
        signal: AbortSignal.timeout(timeoutMs),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const status = response.status;
        const msg = data.error?.message || `OpenRouter returned status ${status}.`;

        if (status === 404 || (status === 400 && msg.includes("unavailable for free"))) {
          logger.warn("openrouter_model_fallback", { model, message: msg });
          lastError = new Error(msg);
          continue;
        }

        const err = new Error(msg);
        err.code = status === 429 ? "AI_RATE_LIMIT" : "AI_PROVIDER_ERROR";
        err.provider = "openrouter";
        err.statusCode = status;
        err.retryable = status === 429 || status >= 500;
        throw err;
      }

      const text = data.choices?.[0]?.message?.content?.trim();

      if (!text) {
        const err = new Error("OpenRouter returned an empty response.");
        err.code = "AI_EMPTY_RESPONSE";
        err.provider = "openrouter";
        err.statusCode = 502;
        err.retryable = true;
        throw err;
      }

      return text;
    } catch (err) {
      lastError = err;
      if (err.statusCode && err.statusCode !== 404) {
        throw err;
      }
    }
  }

  throw lastError || new Error("All OpenRouter candidate models failed.");
}

module.exports = {
  callOpenRouter,
  OPENROUTER_MODELS,
};
