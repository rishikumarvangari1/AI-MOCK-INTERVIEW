const Groq = require("groq-sdk");
const logger = require("../utils/logger");

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

async function callAnthropic({ system, messages, maxTokens, temperature, timeoutMs }) {
  const apiKey = (process.env.ANTHROPIC_API_KEY || "").trim();
  if (!apiKey || /<[^>]+>/.test(apiKey)) {
    throw new AIError("Anthropic API key is not configured.", {
      code: "AI_NOT_CONFIGURED",
      provider: "anthropic",
      statusCode: 503,
      retryable: false,
    });
  }

  let response;
  try {
    response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: (process.env.AI_MODEL || "claude-sonnet-4-6").trim(),
        max_tokens: maxTokens,
        temperature,
        system,
        messages,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    throw new AIError("Unable to reach Anthropic AI service.", {
      code: "AI_NETWORK_ERROR",
      provider: "anthropic",
      statusCode: 503,
      retryable: true,
    });
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new AIError(
      data.error?.message || `Anthropic API returned status ${response.status}.`,
      {
        code: "AI_PROVIDER_ERROR",
        provider: "anthropic",
        statusCode: response.status,
        retryable: isRetryableStatus(response.status),
      }
    );
  }

  const text = (data.content || [])
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("")
    .trim();

  if (!text) {
    throw new AIError("Anthropic returned an empty response.", {
      code: "AI_EMPTY_RESPONSE",
      provider: "anthropic",
      statusCode: 502,
      retryable: true,
    });
  }

  return text;
}

const GROQ_FALLBACK_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
  "llama-3.3-70b-versatile",
];

async function callGroq({
  system,
  messages,
  maxTokens,
  temperature,
  timeoutMs,
  jsonMode = false,
}) {
  const apiKey = (process.env.GROQ_API_KEY || "").trim();
  if (!apiKey || /<[^>]+>/.test(apiKey)) {
    throw new AIError("Groq API key is not configured.", {
      code: "AI_NOT_CONFIGURED",
      provider: "groq",
      statusCode: 503,
      retryable: false,
    });
  }

  const client = new Groq({ apiKey, timeout: timeoutMs });
  const configured = (process.env.GROQ_MODEL || "openai/gpt-oss-120b").trim();
  const candidates = [
    configured,
    ...GROQ_FALLBACK_MODELS.filter((m) => m !== configured),
  ];

  let lastError = null;
  for (const model of candidates) {
    try {
      const isReasoningModel =
        model.startsWith("openai/gpt-oss") || model.startsWith("qwen/");
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
        ...(model.startsWith("openai/gpt-oss") ? { reasoning_effort: "low" } : {}),
      };

      const completion = await client.chat.completions.create(payload);

      const text = completion.choices?.[0]?.message?.content?.trim();
      if (!text) {
        throw new AIError("Groq returned an empty response.", {
          code: "AI_EMPTY_RESPONSE",
          provider: "groq",
          statusCode: 502,
          retryable: true,
        });
      }

      return text;
    } catch (error) {
      if (error instanceof AIError) throw error;

      const status = Number(error?.status || error?.statusCode || 503);
      lastError = new AIError(error?.message || "Groq AI request failed.", {
        code: "AI_PROVIDER_ERROR",
        provider: "groq",
        statusCode: status,
        retryable: isRetryableStatus(status) || status === 503,
      });

      // Try next available Groq model if current model was deprecated/not found
      if (status === 404) {
        continue;
      }

      throw lastError;
    }
  }

  throw lastError;
}

function getProviderOrder(preferredProvider) {
  const primary = (
    preferredProvider ||
    process.env.AI_PROVIDER_PRIMARY ||
    "anthropic"
  )
    .trim()
    .toLowerCase();

  return primary === "groq" ? ["groq", "anthropic"] : ["anthropic", "groq"];
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
    const runner = provider === "groq" ? callGroq : callAnthropic;

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
        code: error?.code,
        statusCode: error?.statusCode,
        fallbackAvailable: provider !== order[order.length - 1],
      });
    }
  }

  const allUnconfigured = providerErrors.every(
    (entry) => entry.code === "AI_NOT_CONFIGURED"
  );

  if (allUnconfigured) {
    throw new AIError(
      "AI service is not configured. Add ANTHROPIC_API_KEY or GROQ_API_KEY in server/.env.",
      {
        code: "AI_NOT_CONFIGURED",
        statusCode: 503,
        retryable: false,
      }
    );
  }

  throw new AIError(
    "All configured AI providers failed to respond. Please try again shortly.",
    {
      code: "AI_UNAVAILABLE",
      statusCode: 503,
      retryable: true,
    }
  );
}

function extractJson(raw) {
  if (typeof raw !== "string" || !raw.trim()) {
    throw new AIError("The AI service returned an empty JSON response.", {
      code: "AI_INVALID_JSON",
      statusCode: 502,
      retryable: true,
    });
  }

  const cleaned = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  // First try direct parse
  try {
    return JSON.parse(cleaned);
  } catch {
    // Fall through to balanced object extraction
  }

  const firstBrace = cleaned.indexOf("{");
  if (firstBrace === -1) {
    throw new AIError("The AI response did not contain a valid JSON object.", {
      code: "AI_INVALID_JSON",
      statusCode: 502,
      retryable: true,
    });
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = firstBrace; i < cleaned.length; i += 1) {
    const ch = cleaned[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
    } else if (ch === "{") {
      depth += 1;
    } else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        try {
          return JSON.parse(cleaned.slice(firstBrace, i + 1));
        } catch {
          break;
        }
      }
    }
  }

  const lastBrace = cleaned.lastIndexOf("}");
  if (lastBrace > firstBrace) {
    try {
      return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
    } catch {
      // Throw structured error below
    }
  }

  throw new AIError("The AI response contained malformed JSON.", {
    code: "AI_INVALID_JSON",
    statusCode: 502,
    retryable: true,
  });
}

async function askAIJson(system, userOrMessages, maxTokensOrOptions = 4000) {
  const options =
    typeof maxTokensOrOptions === "number"
      ? { maxTokens: maxTokensOrOptions }
      : maxTokensOrOptions || {};

  return withRetry(
    async () => {
      const response = await askAI(system, userOrMessages, {
        ...options,
        jsonMode: true,
      });
      return extractJson(response);
    },
    {
      maxRetries: 1,
      baseDelayMs: options.baseDelayMs ?? 200,
    }
  );
}

module.exports = {
  AIError,
  askAI,
  extractJson,
  askAIJson,
  withRetry,
  sanitizePromptInput,
  setProviderOverride,
  getProviderOrder,
};
