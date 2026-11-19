export class AIError extends Error {}

export async function askAI(
  system: string,
  user: string,
  maxTokens: number
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new AIError(
      "The AI service is not configured. Add ANTHROPIC_API_KEY to client/.env.local and restart the server."
    );
  }

  let response: Response;

  try {
    response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "claude-sonnet-4-6",
        max_tokens: maxTokens,
        system,
        messages: [{ role: "user", content: user }],
      }),
      signal: AbortSignal.timeout(100_000),
    });
  } catch {
    throw new AIError("The AI service could not be reached. Please try again.");
  }

  if (!response.ok) {
    throw new AIError(
      `The AI service returned an error (${response.status}). Please try again.`
    );
  }

  const data = await response.json();

  const text: string = (data.content ?? [])
    .filter((block: { type: string }) => block.type === "text")
    .map((block: { text: string }) => block.text)
    .join("");

  if (!text.trim()) {
    throw new AIError("The AI service returned an empty reply.");
  }

  return text;
}

export function extractJson(raw: string): unknown {
  const cleaned = raw.replace(/```json|```/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end <= start) {
    throw new Error("The AI reply did not contain JSON.");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function askAIJson(
  system: string,
  user: string,
  maxTokens = 4000
): Promise<unknown> {
  return extractJson(await askAI(system, user, maxTokens));
}

export async function withRetry<T>(task: () => Promise<T>): Promise<T> {
  try {
    return await task();
  } catch (error) {
    if (error instanceof AIError && error.message.includes("not configured")) {
      throw error;
    }

    return task();
  }
}