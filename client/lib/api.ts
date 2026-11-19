import { getToken, logout as clearAuth } from "@/lib/auth";

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export class ApiError extends Error {
  status: number;
  code: string;
  details?: unknown;
  data?: Record<string, unknown>;

  constructor(
    message: string,
    options: {
      status: number;
      code?: string;
      details?: unknown;
      data?: Record<string, unknown>;
    }
  ) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.code = options.code || "API_ERROR";
    this.details = options.details;
    this.data = options.data;
  }
}

export type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  timeoutMs?: number;
  skipAuth?: boolean;
};

export async function apiRequest<T = Record<string, unknown>>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const {
    body,
    timeoutMs = 30_000,
    skipAuth = false,
    headers: rawHeaders,
    ...rest
  } = options;

  const headers = new Headers(rawHeaders);
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  if (!isFormData && body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!skipAuth) {
    const token = getToken();
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const url = path.startsWith("http")
    ? path
    : `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  let response: Response;

  try {
    response = await fetch(url, {
      ...rest,
      headers,
      body:
        body === undefined
          ? undefined
          : isFormData || typeof body === "string"
            ? (body as BodyInit)
            : JSON.stringify(body),
      signal:
        rest.signal ??
        (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal
          ? AbortSignal.timeout(timeoutMs)
          : undefined),
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      throw new ApiError("The request timed out. Please try again.", {
        status: 408,
        code: "REQUEST_TIMEOUT",
      });
    }

    throw new ApiError(
      "Unable to reach the server. Please check that the backend is running.",
      {
        status: 0,
        code: "NETWORK_ERROR",
      }
    );
  }

  const data = (await response.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;

  if (!response.ok) {
    if (response.status === 401 && !skipAuth && typeof window !== "undefined") {
      clearAuth();
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    const message =
      (typeof data.message === "string" && data.message) ||
      (typeof data.error === "string" && data.error) ||
      `Request failed with status ${response.status}.`;

    throw new ApiError(message, {
      status: response.status,
      code: typeof data.code === "string" ? data.code : "API_ERROR",
      details: data.details,
      data,
    });
  }

  return data as T;
}
