"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/Authcontent";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
};

const SUGGESTED_QUESTIONS = [
  "How is my 50% semantic interview score calculated?",
  "How do I upload and analyze my resume?",
  "Which career domain suits me?",
  "What does RECOMMENDED vs NEEDS IMPROVEMENT mean?",
  "Where can I see my 5-level learning roadmap?",
];

const INTERVIEW_PROCESS_SUGGESTIONS = [
  "How does the countdown timer work?",
  "How do I review all 10 answers before submitting?",
  "Are my answers autosaved?",
];

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm your AI Career Assistant. Ask me anything about mock interviews, scoring rules, resume analysis, skill gaps, career domains, or your learning roadmap.",
};

function formatMsgTime(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function AIAssistantInner() {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const interviewIdParam = searchParams.get("id");

  // Detect active live interview page (when ?id= is open on /interview or /dashboard/interview)
  const isInterviewPage =
    (pathname.includes("/dashboard/interview") || pathname === "/interview") &&
    Boolean(interviewIdParam);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open || !isLoggedIn) return;
    let active = true;
    apiRequest<{ messages: ChatMessage[] }>("/api/assistant/history")
      .then((res) => {
        if (!active) return;
        if (Array.isArray(res.messages) && res.messages.length > 0) {
          setMessages([WELCOME_MESSAGE, ...res.messages]);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [open, isLoggedIn]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, sending]);

  async function sendQuestion(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setError("");
    setInput("");
    const nowIso = new Date().toISOString();
    const userMsg: ChatMessage = {
      role: "user",
      content: trimmed,
      timestamp: nowIso,
    };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setSending(true);

    try {
      const res = await apiRequest<{
        reply: string;
        source: string;
        timestamp?: string;
      }>("/api/assistant/chat", {
        method: "POST",
        body: {
          message: trimmed,
          pageContext: `${pathname}${interviewIdParam ? `?id=${interviewIdParam}` : ""}`,
          history: nextHistory.slice(-6),
        },
        timeoutMs: 45_000,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.reply,
          timestamp: res.timestamp || new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "The AI assistant is temporarily unreachable. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  async function handleClear() {
    setMessages([WELCOME_MESSAGE]);
    setError("");
    if (isLoggedIn) {
      try {
        await apiRequest("/api/assistant/history", { method: "DELETE" });
      } catch {
        // ignore clear error
      }
    }
  }

  const activeSuggestions = isInterviewPage
    ? INTERVIEW_PROCESS_SUGGESTIONS
    : SUGGESTED_QUESTIONS;

  return (
    <div className="no-print fixed bottom-5 right-5 z-50">
      {open && (
        <section
          aria-label="AI Website Assistant"
          className="mb-3 flex h-[510px] max-h-[82vh] w-[370px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                🤖
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">
                  AI Career Assistant
                </p>
                <p className="text-[10px] text-indigo-100">
                  {isInterviewPage
                    ? "Interview Guard · Process help only"
                    : isLoggedIn
                      ? "Context-aware · Synced to your profile"
                      : "Platform guide · Sign in for personal insights"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => void handleClear()}
                title="Clear conversation"
                className="rounded-lg px-2 py-1 text-[11px] font-semibold text-white/90 hover:bg-white/15"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close AI Assistant"
                className="rounded-lg px-2 py-1 text-xs font-bold text-white hover:bg-white/15"
              >
                ✕
              </button>
            </div>
          </div>

          {isInterviewPage && (
            <div className="border-b border-amber-200 bg-amber-50 px-3.5 py-2 text-[11px] font-medium text-amber-900">
              🛡️ During an active interview, technical answers and reference solutions are disabled. Process help (timer, autosave, review, submit) remains available.
            </div>
          )}

          {/* Message Feed */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-3.5"
          >
            {messages.map((msg, idx) => (
              <div
                key={`${idx}-${msg.role}`}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[86%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-xs leading-5 ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-indigo-600 text-white"
                      : "rounded-bl-sm border border-gray-200 bg-white text-gray-800 shadow-xs"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.timestamp && (
                  <span className="mt-1 px-1 text-[10px] text-gray-400">
                    {formatMsgTime(msg.timestamp)}
                  </span>
                )}
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-500">
                  Thinking...
                </div>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700"
              >
                {error}
              </div>
            )}

            {messages.length <= 2 && !sending && (
              <div className="pt-1">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Suggested questions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeSuggestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void sendQuestion(q)}
                      className="rounded-full border border-indigo-200 bg-white px-2.5 py-1 text-[11px] font-medium text-indigo-700 transition hover:bg-indigo-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendQuestion(input);
            }}
            className="flex items-center gap-2 border-t border-gray-200 bg-white p-2.5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isInterviewPage
                  ? "Ask about timer, autosave, or submitting..."
                  : "Ask about interviews, resumes, roadmaps..."
              }
              aria-label="Message AI Assistant"
              disabled={sending}
              className="flex-1 rounded-full border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-700 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </section>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
        className="ml-auto flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 px-5 py-3 text-xs font-bold text-white shadow-xl transition hover:scale-105"
      >
        <span aria-hidden="true">🤖</span>
        <span>{open ? "Close Assistant" : "AI Assistant"}</span>
      </button>
    </div>
  );
}

export default function AIAssistantWidget() {
  return (
    <Suspense fallback={null}>
      <AIAssistantInner />
    </Suspense>
  );
}
