const SENSITIVE_KEY_PATTERN =
  /(password|passwd|secret|token|authorization|cookie|apikey|api_key|mongo_uri|resumetext)/i;

function sanitizeValue(value, depth = 0) {
  if (depth > 4) return "[MaxDepth]";
  if (value === null || value === undefined) return value;
  if (typeof value === "string") {
    return value.length > 500 ? `${value.slice(0, 500)}...[truncated]` : value;
  }
  if (typeof value !== "object") return value;
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      code: value.code,
    };
  }
  if (Array.isArray(value)) {
    return value.slice(0, 20).map((item) => sanitizeValue(item, depth + 1));
  }

  const out = {};
  for (const [key, entry] of Object.entries(value)) {
    if (SENSITIVE_KEY_PATTERN.test(key)) {
      out[key] = "[REDACTED]";
    } else {
      out[key] = sanitizeValue(entry, depth + 1);
    }
  }
  return out;
}

function log(level, event, meta = {}) {
  if (process.env.NODE_ENV === "test" && level !== "error") {
    return;
  }

  const payload = {
    timestamp: new Date().toISOString(),
    level,
    event,
    ...sanitizeValue(meta),
  };

  const line = JSON.stringify(payload);
  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}

module.exports = {
  info: (event, meta) => log("info", event, meta),
  warn: (event, meta) => log("warn", event, meta),
  error: (event, meta) => log("error", event, meta),
  sanitizeValue,
};
