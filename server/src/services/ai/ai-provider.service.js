const { callGemini } = require("./gemini.service");
const { callGroq } = require("./groq.service");
const { callOpenRouter } = require("./openrouter.service");
const logger = require("../../utils/logger");

class AIError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "AIError";
    this.code = options.code || "AI_ERROR";
    this.provider = options.provider || "unknown";
    this.statusCode = options.statusCode || 502;
    this.retryable = Boolean(options.retryable);
  }
}

const DEFAULT_TIMEOUT_MS = 60_000;
const DEFAULT_MAX_RETRIES = 2;

let providerOverride = null;

function setProviderOverride(fn) {
  providerOverride = typeof fn === "function" ? fn : null;
}

function sanitizePromptInput(text, maxLength = 18000) {
  if (typeof text !== "string") return "";

  return text
    .replace(/\u0000/g, "")
    .replace(/<\/?(resume|system|instructions|prompt)[^>]*>/gi, (match) =>
      match.replace(/</g, "[").replace(/>/g, "]")
    )
    .trim()
    .slice(0, maxLength);
}

function normalizeMessages(userOrMessages) {
  if (Array.isArray(userOrMessages)) {
    return userOrMessages
      .filter((msg) => msg && typeof msg.content === "string" && msg.content.trim())
      .map((msg) => ({
        role: msg.role === "assistant" || msg.role === "ai" ? "assistant" : "user",
        content: msg.content.trim(),
      }));
  }

  return [
    {
      role: "user",
      content: String(userOrMessages ?? "").trim(),
    },
  ];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableStatus(status) {
  return status === 408 || status === 429 || (status >= 500 && status <= 599);
}

function extractJson(text) {
  if (!text || typeof text !== "string") {
    throw new AIError("Cannot parse empty response as JSON.", {
      code: "AI_EMPTY_RESPONSE",
      statusCode: 502,
    });
  }

  // 1. Markdown code fence: ```json { ... } ``` or ``` { ... } ```
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced && fenced[1]) {
    try {
      return JSON.parse(fenced[1].trim());
    } catch {
      // continue to heuristic extraction
    }
  }

  // 2. Direct JSON parse
  try {
    return JSON.parse(text.trim());
  } catch {
    // continue to substring extraction
  }

  // 3. Substring between first '{' and last '}'
  const startObj = text.indexOf("{");
  const endObj = text.lastIndexOf("}");
  if (startObj !== -1 && endObj > startObj) {
    try {
      return JSON.parse(text.slice(startObj, endObj + 1));
    } catch {
      // continue
    }
  }

  // 4. Substring between first '[' and last ']'
  const startArr = text.indexOf("[");
  const endArr = text.lastIndexOf("]");
  if (startArr !== -1 && endArr > startArr) {
    try {
      return JSON.parse(text.slice(startArr, endArr + 1));
    } catch {
      // continue
    }
  }

  throw new AIError("Failed to extract valid JSON from AI response.", {
    code: "AI_INVALID_JSON",
    statusCode: 502,
  });
}

function getProviderOrder(preferredProvider) {
  if (preferredProvider) {
    const pref = preferredProvider.trim().toLowerCase();
    const all = [pref, "gemini", "groq", "openrouter"];
    return all.filter((v, i, a) => a.indexOf(v) === i);
  }

  const primary = (process.env.AI_PROVIDER_PRIMARY || "gemini")
    .trim()
    .toLowerCase();

  if (primary === "groq") return ["groq", "gemini", "openrouter"];
  if (primary === "openrouter") return ["openrouter", "gemini", "groq"];
  return ["gemini", "groq", "openrouter"];
}

async function withRetry(task, options = {}) {
  const { maxRetries = DEFAULT_MAX_RETRIES, baseDelayMs = 300 } = options;
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      return await task(attempt);
    } catch (error) {
      lastError = error;
      const shouldRetry =
        attempt < maxRetries &&
        (!(error instanceof AIError) || error.retryable);

      if (!shouldRetry) {
        throw error;
      }

      const delay = baseDelayMs * Math.pow(2, attempt);
      await sleep(delay);
    }
  }

  throw lastError;
}

async function askAI(system, userOrMessages, maxTokensOrOptions = 4000) {
  const options =
    typeof maxTokensOrOptions === "number"
      ? { maxTokens: maxTokensOrOptions }
      : maxTokensOrOptions || {};

  const {
    maxTokens = 4000,
    temperature = 0.3,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    preferredProvider,
    maxRetries = DEFAULT_MAX_RETRIES,
    baseDelayMs = 300,
    jsonMode = false,
  } = options;

  const messages = normalizeMessages(userOrMessages);
  if (!messages.length) {
    throw new AIError("Cannot send an empty prompt to the AI service.", {
      code: "AI_EMPTY_PROMPT",
      statusCode: 400,
      retryable: false,
    });
  }

  if (providerOverride) {
    return withRetry(
      (attempt) =>
        providerOverride({
          system,
          messages,
          maxTokens,
          temperature,
          timeoutMs,
          attempt,
        }),
      { maxRetries, baseDelayMs }
    );
  }

  const order = getProviderOrder(preferredProvider);
  const providerErrors = [];

  for (const provider of order) {
    const runner =
      provider === "gemini"
        ? callGemini
        : provider === "groq"
          ? callGroq
          : callOpenRouter;

    try {
      const result = await withRetry(
        () =>
          runner({
            system,
            messages,
            maxTokens,
            temperature,
            timeoutMs,
            jsonMode,
          }),
        { maxRetries, baseDelayMs }
      );
      return result;
    } catch (error) {
      providerErrors.push({
        provider,
        code: error?.code || "AI_ERROR",
        message: error?.message || "Unknown AI error",
      });

      logger.warn("ai_provider_failed", {
        provider,
        code: error?.code || "AI_ERROR",
        message: error?.message,
      });

      // Continue to next provider in fallback cascade
      continue;
    }
  }

  const summary = providerErrors
    .map((e) => `[${e.provider}: ${e.code} - ${e.message}]`)
    .join(", ");

  throw new AIError(
    `All configured AI providers (Gemini, Groq, OpenRouter) failed: ${summary}`,
    {
      code: "AI_ALL_PROVIDERS_FAILED",
      statusCode: 503,
      retryable: false,
    }
  );
}

async function askAIJson(system, userOrMessages, maxTokensOrOptions = 4000) {
  const options =
    typeof maxTokensOrOptions === "number"
      ? { maxTokens: maxTokensOrOptions, jsonMode: true }
      : { ...maxTokensOrOptions, jsonMode: true };

  const raw = await askAI(system, userOrMessages, options);
  return extractJson(raw);
}

async function testProvider(providerName) {
  const name = String(providerName).toLowerCase().trim();
  const runner =
    name === "gemini"
      ? callGemini
      : name === "groq"
        ? callGroq
        : name === "openrouter"
          ? callOpenRouter
          : null;

  if (!runner) {
    return { ok: false, error: `Unknown provider: ${providerName}` };
  }

  try {
    const reply = await runner({
      system: "You are a test agent.",
      messages: [{ role: "user", content: "Respond with 'PONG'" }],
      maxTokens: 20,
      timeoutMs: 10000,
    });
    return { ok: true, reply };
  } catch (err) {
    return { ok: false, error: err.message, code: err.code };
  }
}

function getProviderStatus() {
  return {
    gemini: Boolean(process.env.GEMINI_API_KEY && !/<[^>]+>/.test(process.env.GEMINI_API_KEY)),
    groq: Boolean(process.env.GROQ_API_KEY && !/<[^>]+>/.test(process.env.GROQ_API_KEY)),
    openrouter: Boolean(process.env.OPENROUTER_API_KEY && !/<[^>]+>/.test(process.env.OPENROUTER_API_KEY)),
    primary: process.env.AI_PROVIDER_PRIMARY || "gemini",
  };
}

module.exports = {
  AIError,
  askAI,
  askAIJson,
  extractJson,
  sanitizePromptInput,
  setProviderOverride,
  testProvider,
  getProviderStatus,
  getProviderOrder,
};
