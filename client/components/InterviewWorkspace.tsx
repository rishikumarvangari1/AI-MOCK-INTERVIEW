"use client";

import Link from "next/link";
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { DOMAINS, resolveDomain } from "@/lib/domains";
import ResultsDashboard from "@/app/interview/ResultsDashboard";

type Phase =
  | "setup"
  | "loading"
  | "session"
  | "review"
  | "evaluating"
  | "results"
  | "error";
type Mode = "structured" | "adaptive";
type InterviewType = "technical" | "hr" | "behavioral" | "mixed" | "coding";
type ExperienceLevel = "beginner" | "intermediate" | "advanced";
type Difficulty = "mixed" | "easy" | "medium" | "hard";

type IntegritySummary = {
  tabSwitches: number;
  focusLosses: number;
  fullscreenExits: number;
  pasteAttempts: number;
  copyAttempts: number;
  totalEvents: number;
  riskLevel: "LOW RISK" | "MODERATE RISK" | "HIGH RISK";
  note?: string;
};

type InterviewQuestion = {
  id: number;
  text: string;
  domain?: string;
  level: "beginner" | "intermediate" | "advanced";
  topic: string;
  source?: "ai" | "fallback_bank";
  sampleInput?: string;
  sampleOutput?: string;
  testCases?: Array<{ input: string; expected: string }>;
};

type InterviewSessionData = {
  id: string;
  sessionId?: string;
  domainId: string;
  domain: string;
  domainTitle: string;
  mode: Mode;
  interviewType?: InterviewType;
  experienceLevel?: ExperienceLevel;
  difficulty: Difficulty;
  codingLanguage?: string;
  questionSource?: "ai" | "fallback_bank";
  questionCount: number;
  resumeTailored: boolean;
  remainingSeconds?: number;
  timeLimitSeconds?: number;
  score: number;
  duration: number;
  questionsAnswered: number;
  status: "in_progress" | "completed";
  isComplete: boolean;
  questions: InterviewQuestion[];
  answers: string[];
  evaluations?: unknown[];
  report?: unknown;
  integritySummary?: IntegritySummary;
  feedback?: string;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult:
    | ((event: {
        results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal?: boolean }>;
      }) => void)
    | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

const LEVEL_STYLES: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-800",
  intermediate: "bg-amber-100 text-amber-800",
  advanced: "bg-rose-100 text-rose-800",
};

const RISK_STYLES: Record<string, string> = {
  "LOW RISK": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "MODERATE RISK": "bg-amber-100 text-amber-800 border-amber-200",
  "HIGH RISK": "bg-red-100 text-red-800 border-red-200",
};

function formatTimer(seconds: number) {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function countWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

function InterviewSessionInner() {
  const router = useRouter();
  const params = useSearchParams();

  const idParam = params.get("id");
  const domainParam = params.get("domain");
  const resumeIdParam = params.get("resumeId");

  const resolvedInitial = resolveDomain(domainParam);

  // Setup state (derived cleanly from ?domain= unless manually changed)
  const [manualDomain, setManualDomain] = useState<string | null>(null);
  const selectedDomain = manualDomain ?? resolvedInitial?.id ?? "python";
  const setSelectedDomain = (nextId: string) => setManualDomain(nextId);
  const [domainSearch, setDomainSearch] = useState("");
  const [customDomainName, setCustomDomainName] = useState("");
  const [interviewType, setInterviewType] = useState<InterviewType>("technical");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("intermediate");
  const [codingLanguage, setCodingLanguage] = useState("javascript");
  const [jobDescription, setJobDescription] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("mixed");
  const [questionCount] = useState<number>(10);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(30);
  const [useResume, setUseResume] = useState<boolean>(Boolean(resumeIdParam));
  const [allowPasteAccommodation, setAllowPasteAccommodation] = useState(false);
  const [rulesAcknowledged, setRulesAcknowledged] = useState(true);
  const [activeConflict, setActiveConflict] = useState<{
    id: string;
    domain: string;
  } | null>(null);
  const loadedInterviewIdRef = useRef<string | null>(null);

  // Live session state
  const [phase, setPhase] = useState<Phase>(idParam ? "loading" : "setup");
  const [interview, setInterview] = useState<InterviewSessionData | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(1800);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Draft save & confirmation UI
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [lastSavedTime, setLastSavedTime] = useState<string>("");
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [error, setError] = useState("");

  // Anti-cheating / integrity UI
  const [integrity, setIntegrity] = useState<IntegritySummary>({
    tabSwitches: 0,
    focusLosses: 0,
    fullscreenExits: 0,
    pasteAttempts: 0,
    copyAttempts: 0,
    totalEvents: 0,
    riskLevel: "LOW RISK",
  });
  const [integrityWarning, setIntegrityWarning] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const enteredFullscreenRef = useRef(false);

  // Voice & optional local-only camera states
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const speechSupported = useSyncExternalStore(
    () => () => {},
    () => {
      const w = window as unknown as Record<string, unknown>;
      return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
    },
    () => false
  );

  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraConsentGiven, setCameraConsentGiven] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoSubmittedRef = useRef(false);
  const submittingRef = useRef(false);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraEnabled(false);
  }, []);

  const stopVoice = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore
    }
    setListening(false);
  }, []);

  useEffect(() => {
    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
      stopCamera();
      stopVoice();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [stopCamera, stopVoice]);

  const recordIntegrity = useCallback(
    async (
      type:
        | "tab_switch"
        | "window_blur"
        | "fullscreen_exit"
        | "paste_blocked"
        | "copy_blocked"
        | "timer_expired"
        | "network_interruption",
      detail: string,
      warningText?: string
    ) => {
      if (!interview || interview.isComplete) return;
      if (warningText) setIntegrityWarning(warningText);

      try {
        const res = await apiRequest<{ integritySummary: IntegritySummary }>(
          `/api/interviews/${interview.id}/integrity`,
          {
            method: "POST",
            body: { type, detail },
            timeoutMs: 10_000,
          }
        );
        if (res.integritySummary) {
          setIntegrity(res.integritySummary);
        }
      } catch {
        // Never disrupt the candidate if telemetry call transiently fails
      }
    },
    [interview]
  );

  // Load existing interview by ?id= (never synchronously mutates state when !idParam)
  useEffect(() => {
    if (!idParam) {
      loadedInterviewIdRef.current = null;
      return;
    }

    // Skip redundant reload if we already just started and hydrated this exact session ID
    if (loadedInterviewIdRef.current === idParam) {
      return;
    }

    let active = true;

    apiRequest<{ interview: InterviewSessionData }>(`/api/interviews/${idParam}`)
      .then((res) => {
        if (!active) return;
        const data = res.interview;
        loadedInterviewIdRef.current = data.id;
        setInterview(data);
        setElapsedSeconds(data.duration || 0);
        setRemainingSeconds(
          typeof data.remainingSeconds === "number"
            ? data.remainingSeconds
            : data.timeLimitSeconds || 1800
        );
        if (data.integritySummary) {
          setIntegrity(data.integritySummary);
        }

        if (data.isComplete && data.report) {
          setPhase("results");
          return;
        }

        const loadedAnswers = (data.questions || []).map(
          (_q, i) => (data.answers || [])[i] || ""
        );
        setAnswers(loadedAnswers);
        const firstEmpty = loadedAnswers.findIndex((a) => !a.trim());
        setCurrentIdx(firstEmpty === -1 ? 0 : firstEmpty);
        setPhase("session");
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof Error ? err.message : "Could not load interview session."
        );
        setPhase("error");
      });

    return () => {
      active = false;
    };
  }, [idParam]);

  // Persist a single draft answer to the backend with monotonic clientUpdatedAt guard
  const persistAnswer = useCallback(
    async (idx: number, text: string) => {
      if (!interview || interview.isComplete) return;
      setSaveState("saving");
      try {
        const res = await apiRequest<{
          remainingSeconds?: number;
          savedAt?: string;
        }>(`/api/interviews/${interview.id}/answers`, {
          method: "PUT",
          body: {
            questionIndex: idx,
            answer: text,
            clientUpdatedAt: Date.now(),
            durationSeconds: elapsedSeconds,
          },
          timeoutMs: 20_000,
        });
        if (typeof res.remainingSeconds === "number") {
          setRemainingSeconds(res.remainingSeconds);
        }
        setSaveState("saved");
        setLastSavedTime(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        );
      } catch {
        setSaveState("error");
      }
    },
    [interview, elapsedSeconds]
  );

  // Submit entire interview for final AI evaluation
  const handleFinalSubmit = useCallback(
    async (options: { timerExpired?: boolean; allowUnanswered?: boolean } = {}) => {
      if (!interview || submittingRef.current) return;
      submittingRef.current = true;
      stopVoice();
      stopCamera();
      setConfirmSubmit(false);
      setFieldError("");

      if (typeof document !== "undefined" && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      setPhase("evaluating");

      try {
        const res = await apiRequest<{ interview: InterviewSessionData }>(
          `/api/interviews/${interview.id}/submit`,
          {
            method: "POST",
            body: {
              answers,
              durationSeconds: elapsedSeconds,
              timerExpired: Boolean(options.timerExpired),
              allowUnanswered: Boolean(options.allowUnanswered || options.timerExpired),
              requireAllAnswers: !(options.allowUnanswered || options.timerExpired),
            },
            timeoutMs: 120_000,
          }
        );

        setInterview(res.interview);
        setPhase("results");
      } catch (err) {
        setFieldError(
          err instanceof Error ? err.message : "Failed to submit and evaluate interview."
        );
        setPhase("review");
      } finally {
        submittingRef.current = false;
      }
    },
    [interview, answers, elapsedSeconds, stopVoice, stopCamera]
  );

  // Server-authoritative live countdown timer
  useEffect(() => {
    if (phase !== "session" && phase !== "review") return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (!autoSubmittedRef.current) {
            autoSubmittedRef.current = true;
            void handleFinalSubmit({ timerExpired: true, allowUnanswered: true });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, handleFinalSubmit]);

  // Anti-cheating listeners: visibilitychange, window blur, fullscreenchange
  useEffect(() => {
    if (phase !== "session" && phase !== "review") return;

    const handleVisibility = () => {
      if (document.hidden) {
        void recordIntegrity(
          "tab_switch",
          `Tab hidden while on Q${currentIdx + 1}`,
          "Tab switch detected and recorded in the session integrity log. Stay on the interview tab to keep a clean integrity report."
        );
      }
    };

    const handleBlur = () => {
      if (!document.hidden) {
        void recordIntegrity(
          "window_blur",
          `Browser window lost focus on Q${currentIdx + 1}`,
          "Window focus change detected and logged."
        );
      }
    };

    const handleFullscreenChange = () => {
      const activeFs = Boolean(document.fullscreenElement);
      setIsFullscreen(activeFs);
      if (activeFs) {
        enteredFullscreenRef.current = true;
      } else if (enteredFullscreenRef.current) {
        void recordIntegrity(
          "fullscreen_exit",
          `Exited full-screen mode on Q${currentIdx + 1}`,
          "Full-screen mode exited. Click 'Enter Full-Screen' in the header to resume distraction-free mode."
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [phase, currentIdx, recordIntegrity]);

  async function toggleFullscreen() {
    if (typeof document === "undefined") return;
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        enteredFullscreenRef.current = true;
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIntegrityWarning("Full-screen mode is not supported or was blocked by your browser.");
    }
  }

  function handleAnswerChange(nextText: string) {
    setConfirmClear(false);
    setFieldError("");
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentIdx] = nextText;
      return copy;
    });

    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      void persistAnswer(currentIdx, nextText);
    }, 900);
  }

  async function jumpToQuestion(targetIdx: number) {
    if (!interview) return;
    const bounded = Math.max(0, Math.min(interview.questions.length - 1, targetIdx));
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
      autosaveTimerRef.current = null;
    }
    const currentText = answers[currentIdx] || "";
    void persistAnswer(currentIdx, currentText);
    setConfirmClear(false);
    setFieldError("");
    setCurrentIdx(bounded);
    if (phase === "review") setPhase("session");
  }

  async function handleStartSession(e: React.FormEvent, forceNew = false) {
    e.preventDefault();
    if (!rulesAcknowledged) {
      setFieldError("Please acknowledge the interview rules and monitoring disclosure.");
      return;
    }

    setPhase("loading");
    setError("");
    setFieldError("");
    setActiveConflict(null);
    autoSubmittedRef.current = false;

    try {
      const domainPayload =
        selectedDomain === "custom" && customDomainName.trim()
          ? customDomainName.trim()
          : selectedDomain;

      const res = await apiRequest<{
        interviewId: string;
        interview: InterviewSessionData;
      }>("/api/interviews/start", {
        method: "POST",
        body: {
          domainId: domainPayload,
          mode: "structured",
          interviewType,
          experienceLevel,
          difficulty,
          codingLanguage,
          jobDescription: jobDescription.trim(),
          questionCount,
          timeLimitSeconds: timeLimitMinutes * 60,
          useResume,
          preventDuplicateSession: !forceNew,
          ...(resumeIdParam ? { resumeId: resumeIdParam } : {}),
        },
        timeoutMs: 90_000,
      });

      const sess = res.interview;
      loadedInterviewIdRef.current = res.interviewId;
      setInterview(sess);
      setAnswers((sess.questions || []).map(() => ""));
      setCurrentIdx(0);
      setElapsedSeconds(0);
      setRemainingSeconds(sess.remainingSeconds || timeLimitMinutes * 60);
      if (sess.integritySummary) setIntegrity(sess.integritySummary);
      setIntegrityWarning("");
      setPhase("session");
      router.replace(`/dashboard/interview?id=${res.interviewId}`);
    } catch (err: unknown) {
      const apiErr = err as Error & {
        code?: string;
        data?: { activeInterviewId?: string; activeDomain?: string };
      };
      if (apiErr?.code === "ACTIVE_SESSION_EXISTS" && apiErr?.data?.activeInterviewId) {
        setActiveConflict({
          id: apiErr.data.activeInterviewId,
          domain: apiErr.data.activeDomain || "Previous Interview",
        });
        setPhase("setup");
        return;
      }
      setError(
        err instanceof Error ? err.message : "Failed to start mock interview."
      );
      setPhase("error");
    }
  }

  async function toggleCamera() {
    setCameraError("");
    if (cameraEnabled) {
      stopCamera();
      return;
    }
    if (!cameraConsentGiven) {
      setCameraError(
        "Confirm the explicit local-only video consent checkbox first. We never record or analyze your video."
      );
      return;
    }
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera preview is not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      setCameraEnabled(true);
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      }, 50);
    } catch {
      setCameraError("Camera permission was denied or no webcam was detected.");
    }
  }

  function toggleVoiceDictation() {
    setVoiceError("");
    if (listening) {
      stopVoice();
      return;
    }
    if (typeof window === "undefined") return;
    const w = window as unknown as Record<string, new () => SpeechRecognitionLike>;
    const SpeechRec = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRec) {
      setVoiceError("Voice dictation is unavailable in this browser.");
      return;
    }
    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        let spoken = "";
        for (let i = 0; i < event.results.length; i += 1) {
          const item = event.results[i];
          if (item && item[0]?.transcript) spoken += `${item[0].transcript} `;
        }
        const cleaned = spoken.trim();
        if (cleaned) {
          const existing = answers[currentIdx] || "";
          handleAnswerChange(existing ? `${existing.trim()} ${cleaned}` : cleaned);
        }
      };
      recognition.onerror = (event) => {
        setVoiceError(`Voice input paused (${event.error}).`);
        setListening(false);
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
      recognition.start();
      setListening(true);
    } catch {
      setVoiceError("Could not start microphone dictation.");
      setListening(false);
    }
  }

  function readQuestionAloud(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  /* ----- RENDER PHASES ----- */
  const effectivePhase: Phase =
    !idParam && phase !== "loading" && phase !== "error"
      ? "setup"
      : idParam && !interview && phase === "setup"
        ? "loading"
        : phase;

  if (effectivePhase === "loading") {
    return (
      <main className="flex min-h-[65vh] flex-col items-center justify-center gap-4 bg-gray-50 px-6">
        <div className="h-11 w-11 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        <p className="text-sm font-semibold text-gray-800">
          Generating 10 domain-specific interview questions...
        </p>
        <p className="text-xs text-gray-500">
          Preparing progressive difficulty (Basic → Intermediate → Advanced → Scenarios) &amp; server timer.
        </p>
      </main>
    );
  }

  if (effectivePhase === "evaluating") {
    return (
      <main className="flex min-h-[65vh] flex-col items-center justify-center gap-4 bg-gray-50 px-6 text-center">
        <div className="h-11 w-11 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        <h1 className="text-lg font-bold text-gray-900">
          Evaluating all 10 answers with AI Semantic Engine...
        </h1>
        <p className="max-w-md text-xs leading-6 text-gray-500">
          Computing 50% semantic relevance + technical accuracy, completeness, clarity,
          skill gap analysis, alternative career domain suitability, and your 5-level learning roadmap.
        </p>
      </main>
    );
  }

  if (effectivePhase === "error") {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-lg font-bold text-gray-900">
            Unable to load interview session
          </h1>
          <p className="mt-2 text-xs leading-6 text-red-600">{error}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setPhase("setup");
                router.replace("/dashboard/interview");
              }}
              className="rounded-full bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              Configure New Interview
            </button>
            <Link
              href="/dashboard"
              className="rounded-full border border-gray-300 px-5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (effectivePhase === "results" && interview && interview.report) {
    return (
      <ResultsDashboard
        interview={
          interview as unknown as Parameters<typeof ResultsDashboard>[0]["interview"]
        }
        onRetake={() => {
          loadedInterviewIdRef.current = null;
          setInterview(null);
          setAnswers([]);
          setManualDomain(interview.domainId);
          setPhase("setup");
          router.replace(`/dashboard/interview?domain=${interview.domainId}`);
        }}
      />
    );
  }

  /* ----- SETUP PHASE ----- */
  if (effectivePhase === "setup" || !interview) {
    const selectedDomainMeta = DOMAINS.find((d) => d.id === selectedDomain);
    const activeDomainLabel =
      selectedDomain === "custom"
        ? customDomainName.trim() || "Custom Role"
        : selectedDomainMeta?.title || "Python Developer";
    const filteredDomains = domainSearch.trim()
      ? DOMAINS.filter(
          (d) =>
            d.title.toLowerCase().includes(domainSearch.trim().toLowerCase()) ||
            d.description.toLowerCase().includes(domainSearch.trim().toLowerCase())
        )
      : DOMAINS;

    return (
      <main className="min-h-screen bg-gray-50 pb-16 pt-8 text-gray-900">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Live AI Mock Interview Studio · 10-Question Assessment
              </p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
                Configure Your Live Interview Session
              </h1>
            </div>
            <Link
              href="/dashboard"
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Dashboard
            </Link>
          </div>

          {activeConflict && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-950">
              <div>
                <strong className="block font-bold">
                  Active interview already in progress ({activeConflict.domain})
                </strong>
                <span>
                  Multiple active sessions are protected to prevent accidental duplicates. Resume it or explicitly launch a fresh 10-question session.
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    router.replace(`/dashboard/interview?id=${activeConflict.id}`)
                  }
                  className="rounded-full bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700"
                >
                  Resume Active Session
                </button>
                <button
                  type="button"
                  onClick={(e) => void handleStartSession(e, true)}
                  className="rounded-full border border-amber-400 bg-white px-4 py-2 font-semibold text-amber-900 hover:bg-amber-100"
                >
                  Start New Anyway
                </button>
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => void handleStartSession(e, false)}
            className="mt-6 space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
          >
            {/* Instant Top Quick-Start Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {selectedDomainMeta?.icon || "✨"}
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                    Ready to Begin
                  </p>
                  <p className="text-sm font-extrabold text-gray-900">
                    {activeDomainLabel} · {questionCount} Questions · {timeLimitMinutes}m Timer
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="rounded-full bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
              >
                ▶ Start Live 10-Question Interview →
              </button>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                  1. Choose Career Domain ({DOMAINS.length} domains + Custom)
                </label>
                <input
                  type="search"
                  value={domainSearch}
                  onChange={(e) => setDomainSearch(e.target.value)}
                  placeholder="Search domains (e.g. Python, Cloud, SQL)..."
                  aria-label="Search career domains"
                  className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:bg-slate-800 sm:w-64"
                />
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDomains.map((domain) => (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => setSelectedDomain(domain.id)}
                    className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                      selectedDomain === domain.id
                        ? "border-indigo-500 bg-indigo-50/80 ring-2 ring-indigo-200 dark:border-indigo-500 dark:bg-indigo-950/60 dark:ring-indigo-900/50"
                        : "border-gray-200 bg-white hover:border-gray-300 dark:border-slate-800 dark:bg-slate-800/80 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className="text-xl">{domain.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold text-gray-900 dark:text-slate-100">
                        {domain.title}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-4 text-gray-500 dark:text-slate-400">
                        {domain.description}
                      </span>
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setSelectedDomain("custom")}
                  className={`flex items-start gap-3 rounded-2xl border border-dashed p-3.5 text-left transition-all duration-200 ${
                    selectedDomain === "custom"
                      ? "border-indigo-500 bg-indigo-50/80 ring-2 ring-indigo-200 dark:border-indigo-500 dark:bg-indigo-950/60 dark:ring-indigo-900/50"
                      : "border-gray-300 bg-white hover:border-gray-400 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-slate-600 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="text-xl">✨</span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold text-gray-900 dark:text-slate-100">
                      Custom Role / Domain
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-4 text-gray-500 dark:text-slate-400">
                      Type any specialized engineering role or stack
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {selectedDomain === "custom" && (
              <div>
                <label
                  htmlFor="custom-domain"
                  className="block text-xs font-bold text-gray-700 dark:text-slate-300"
                >
                  Custom Role / Domain Name
                </label>
                <input
                  id="custom-domain"
                  type="text"
                  value={customDomainName}
                  onChange={(e) => setCustomDomainName(e.target.value)}
                  placeholder="e.g. Embedded Rust Engineer, Site Reliability Engineer"
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:ring-indigo-900/40"
                />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label
                  htmlFor="int-type"
                  className="block text-xs font-bold text-gray-700 dark:text-slate-300"
                >
                  2. Interview Format
                </label>
                <select
                  id="int-type"
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value as InterviewType)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="technical">Technical (10 Questions)</option>
                  <option value="coding">Coding Challenge (Code Editor)</option>
                  <option value="behavioral">Behavioral (STAR)</option>
                  <option value="hr">HR Screening</option>
                  <option value="mixed">Mixed Technical + Scenarios</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="int-exp"
                  className="block text-xs font-bold text-gray-700 dark:text-slate-300"
                >
                  3. Experience Level
                </label>
                <select
                  id="int-exp"
                  value={experienceLevel}
                  onChange={(e) =>
                    setExperienceLevel(e.target.value as ExperienceLevel)
                  }
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="beginner">Fresher / Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Senior / Advanced</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="int-diff"
                  className="block text-xs font-bold text-gray-700 dark:text-slate-300"
                >
                  4. Difficulty Curve
                </label>
                <select
                  id="int-diff"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="mixed">Progressive (Q1-3 Basic → Q9-10 Scenario)</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="int-timer"
                  className="block text-xs font-bold text-gray-700 dark:text-slate-300"
                >
                  5. Countdown Timer
                </label>
                <select
                  id="int-timer"
                  value={timeLimitMinutes}
                  onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value={20}>20 Minutes (Fast-Paced)</option>
                  <option value={30}>30 Minutes (Standard 10Q)</option>
                  <option value={45}>45 Minutes (Extended)</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {interviewType === "coding" && (
                <div>
                  <label
                    htmlFor="int-lang"
                    className="block text-xs font-bold text-gray-700 dark:text-slate-300"
                  >
                    Coding Language
                  </label>
                  <select
                    id="int-lang"
                    value={codingLanguage}
                    onChange={(e) => setCodingLanguage(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="sql">SQL</option>
                    <option value="cpp">C++</option>
                  </select>
                </div>
              )}

              <div className={interviewType === "coding" ? "" : "sm:col-span-2"}>
                <label
                  htmlFor="int-jd"
                  className="block text-xs font-bold text-gray-700 dark:text-slate-300"
                >
                  Optional Job Description Context
                </label>
                <input
                  id="int-jd"
                  type="text"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Optional: paste key requirements to tailor your 10 questions"
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-gray-900 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
                />
              </div>
            </div>

            {/* Resume Tailoring */}
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-950">
              <input
                type="checkbox"
                checked={useResume}
                onChange={(e) => setUseResume(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-emerald-300 text-emerald-600"
              />
              <span>
                <strong className="block font-bold">
                  Tailor interview questions to my active Resume
                </strong>
                Probes real projects and technologies from your uploaded CV without modifying your Resume Analyzer history.
              </span>
            </label>

            {/* Transparent Rules & Privacy-Conscious Integrity Notice (Section 9) */}
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 text-xs leading-5 text-indigo-950">
              <p className="font-bold text-indigo-900">
                🛡️ Live Interview Rules &amp; Transparent Integrity Policy
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-indigo-900/90">
                <li>
                  <strong>Collect-All-10 First:</strong> Exactly 10 questions are asked. No scores, correct answers, or AI feedback are revealed until you click <strong>Final Submit Interview</strong>.
                </li>
                <li>
                  <strong>50% Semantic Weighted Evaluation:</strong> Answers are evaluated on Semantic Relevance (50%), Technical Correctness (20%), Completeness (15%), Clarity (10%), and Practical Application (5%).
                </li>
                <li>
                  <strong>Server-Authoritative Timer &amp; Autosave:</strong> Drafts autosave continuously and refreshing the page will not reset your countdown clock.
                </li>
                <li>
                  <strong>Privacy-Conscious Monitoring:</strong> Tab switches, window focus changes, full-screen exits, and copy/paste blocks are logged transparently in your integrity summary. We <strong>never</strong> secretly activate cameras or microphones, never record video, and never run facial recognition. Browser telemetry is informational and never auto-rejects candidates.
                </li>
              </ul>

              <div className="mt-3 flex flex-col gap-2 border-t border-indigo-200/70 pt-3">
                <label className="flex cursor-pointer items-center gap-2 font-semibold text-indigo-950">
                  <input
                    type="checkbox"
                    checked={rulesAcknowledged}
                    onChange={(e) => setRulesAcknowledged(e.target.checked)}
                    className="h-4 w-4 rounded border-indigo-300 text-indigo-600"
                  />
                  I understand the 10-question assessment rules and transparent integrity monitoring.
                </label>

                <label className="flex cursor-pointer items-center gap-2 text-[11px] text-indigo-800">
                  <input
                    type="checkbox"
                    checked={allowPasteAccommodation}
                    onChange={(e) => setAllowPasteAccommodation(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-indigo-300 text-indigo-600"
                  />
                  Accessibility accommodation: enable assistive paste tools (still logged transparently).
                </label>
              </div>
            </div>

            {fieldError && (
              <p role="alert" className="text-xs font-semibold text-red-600">
                {fieldError}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5">
              <p className="text-xs text-gray-500">
                10 progressive questions · {timeLimitMinutes}m server timer · Full 8-chart AI report upon submission
              </p>
              <button
                type="submit"
                className="rounded-full bg-indigo-600 px-7 py-3 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Start Live 10-Question Interview →
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  /* ----- LIVE SESSION & REVIEW PHASES ----- */
  const totalQuestions = interview.questions.length || 10;
  const answeredCount = answers.filter((a) => a && a.trim().length > 0).length;
  const progressPercent = Math.round(((currentIdx + 1) / Math.max(1, totalQuestions)) * 100);
  const currentQuestion = interview.questions[currentIdx];
  const currentAnswer = answers[currentIdx] || "";
  const isTimerLow = remainingSeconds <= 300;

  return (
    <main className="min-h-screen bg-slate-50 pb-14 pt-4 text-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* SECTION 16 HEADER */}
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-sm font-extrabold text-white">
              AI
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-sm font-extrabold text-gray-900">
                  {interview.domainTitle}
                </h1>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  Live Interview · No Early Answers
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                {answeredCount}/{totalQuestions} answered ·{" "}
                {saveState === "saving"
                  ? "Saving draft..."
                  : saveState === "saved" && lastSavedTime
                    ? `Draft saved at ${lastSavedTime}`
                    : saveState === "error"
                      ? "Autosave retrying..."
                      : "Autosave active"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div
              aria-live="polite"
              className={`rounded-full border px-3.5 py-1.5 text-xs font-extrabold tabular-nums ${
                isTimerLow
                  ? "animate-pulse border-red-300 bg-red-50 text-red-700"
                  : "border-gray-200 bg-gray-50 text-gray-800"
              }`}
            >
              ⏱ {formatTimer(remainingSeconds)} left
            </div>

            <button
              type="button"
              onClick={() => void toggleFullscreen()}
              className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              {isFullscreen ? "Exit Full-Screen" : "⛶ Full-Screen"}
            </button>

            <Link
              href="/dashboard/history"
              className="rounded-full border border-red-200 bg-red-50/70 px-3.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              Exit Session
            </Link>
          </div>
        </header>

        {/* Integrity Alert Banner */}
        {integrityWarning && (
          <div
            role="alert"
            className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs text-amber-900"
          >
            <span>⚠️ {integrityWarning}</span>
            <button
              type="button"
              onClick={() => setIntegrityWarning("")}
              className="shrink-0 font-bold text-amber-800 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Fallback Question Bank Banner */}
        {interview.questionSource === "fallback_bank" && (
          <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs text-blue-900">
            ℹ️ Questions loaded from the verified domain question bank while live question generation was temporarily busy.
          </div>
        )}

        {/* REVIEW ALL ANSWERS PHASE */}
        {phase === "review" ? (
          <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Pre-Submission Review
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-gray-900">
                  Review All {totalQuestions} Answers Before Final Submit
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {answeredCount} of {totalQuestions} questions answered. AI evaluation, reference answers, and scores unlock immediately after submission.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPhase("session")}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                ← Return to Questions
              </button>
            </div>

            {answeredCount < totalQuestions && (
              <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-950">
                <strong>
                  {totalQuestions - answeredCount} question(s) are still unanswered.
                </strong>{" "}
                Unanswered questions receive strictly 0 marks. Jump back to complete them or explicitly confirm submitting with blanks.
              </div>
            )}

            <div className="mt-5 space-y-3">
              {interview.questions.map((q, idx) => {
                const text = (answers[idx] || "").trim();
                const words = countWords(text);
                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border p-4 ${
                      text
                        ? "border-emerald-200 bg-emerald-50/30"
                        : "border-amber-200 bg-amber-50/40"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-extrabold text-gray-900">
                            Q{idx + 1}.
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                              LEVEL_STYLES[q.level] || "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {q.level}
                          </span>
                          <span className="text-[11px] font-medium text-gray-500">
                            {q.topic}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              text
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {text ? `Answered (${words} words)` : "Unanswered (0 marks)"}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs font-semibold text-gray-800">
                          {q.text}
                        </p>
                        {text && (
                          <p className="mt-2 line-clamp-3 rounded-lg bg-white p-2.5 text-xs leading-5 text-gray-600 ring-1 ring-gray-100">
                            {text}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => void jumpToQuestion(idx)}
                        className="shrink-0 rounded-full border border-indigo-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-50"
                      >
                        {text ? "Edit Answer" : "Write Answer"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {fieldError && (
              <div
                role="alert"
                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700"
              >
                {fieldError}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5">
              <p className="text-xs text-gray-500">
                Integrity status:{" "}
                <strong className="text-gray-800">{integrity.riskLevel}</strong> ·{" "}
                {integrity.tabSwitches} tab switches · {integrity.fullscreenExits} full-screen exits
              </p>

              {!confirmSubmit ? (
                <button
                  type="button"
                  onClick={() => setConfirmSubmit(true)}
                  className="rounded-full bg-indigo-600 px-7 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-700"
                >
                  Final Submit Interview →
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-2.5">
                  <span className="text-xs font-bold text-indigo-950">
                    Confirm final submission? Answers lock after submit.
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      void handleFinalSubmit({
                        allowUnanswered: answeredCount < totalQuestions,
                      })
                    }
                    className="rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
                  >
                    Yes, Submit &amp; Evaluate
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmSubmit(false)}
                    className="rounded-full border border-gray-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </section>
        ) : (
          /* ACTIVE QUESTION ENTRY LAYOUT (MAIN + SIDEBAR) */
          <div className="mt-5 grid gap-6 lg:grid-cols-12">
            {/* MAIN QUESTION & ANSWER EDITOR */}
            <section className="space-y-4 lg:col-span-8">
              {/* Progress Bar */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                  <span className="text-indigo-700">
                    Question {currentIdx + 1} of {totalQuestions}
                  </span>
                  <span className="text-gray-600">Progress: {progressPercent}%</span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Protected Question Card (Copy blocked) */}
              {currentQuestion && (
                <article
                  onCopy={(e) => {
                    e.preventDefault();
                    void recordIntegrity(
                      "copy_blocked",
                      `Attempted to copy prompt text on Q${currentIdx + 1}`,
                      "Copying interview question text is disabled during live assessments."
                    );
                  }}
                  className="select-none rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase ${
                          LEVEL_STYLES[currentQuestion.level] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {currentQuestion.level}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                        Topic: {currentQuestion.topic}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => readQuestionAloud(currentQuestion.text)}
                      className="rounded-full border border-gray-200 px-3 py-1 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      {speaking ? "⏹ Stop Reading" : "🔊 Read Aloud"}
                    </button>
                  </div>

                  <h2 className="mt-4 text-base font-bold leading-7 text-gray-900 dark:text-white sm:text-lg">
                    {currentQuestion.text}
                  </h2>

                  {currentQuestion.sampleInput && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-mono text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                      <p>
                        <strong>Sample Input:</strong> {currentQuestion.sampleInput}
                      </p>
                      {currentQuestion.sampleOutput && (
                        <p className="mt-1">
                          <strong>Expected Output:</strong>{" "}
                          {currentQuestion.sampleOutput}
                        </p>
                      )}
                    </div>
                  )}
                </article>
              )}

              {/* Answer Editor */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label
                    htmlFor="answer-editor"
                    className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400"
                  >
                    Your Answer (Question {currentIdx + 1})
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {speechSupported && (
                      <button
                        type="button"
                        onClick={toggleVoiceDictation}
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                          listening
                            ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        }`}
                      >
                        {listening ? "⏹ Stop Voice" : "🎙️ Dictate Answer"}
                      </button>
                    )}

                    {!confirmClear ? (
                      <button
                        type="button"
                        disabled={!currentAnswer}
                        onClick={() => setConfirmClear(true)}
                        className="rounded-full border border-gray-200 px-3 py-1 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        Clear Answer
                      </button>
                    ) : (
                      <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-700">
                        Clear?
                        <button
                          type="button"
                          onClick={() => {
                            handleAnswerChange("");
                            void persistAnswer(currentIdx, "");
                            setConfirmClear(false);
                          }}
                          className="underline"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmClear(false)}
                          className="text-gray-600 underline"
                        >
                          No
                        </button>
                      </span>
                    )}
                  </div>
                </div>

                <textarea
                  id="answer-editor"
                  rows={interview.interviewType === "coding" ? 13 : 9}
                  value={currentAnswer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  onPaste={(e) => {
                    if (!allowPasteAccommodation) {
                      e.preventDefault();
                      void recordIntegrity(
                        "paste_blocked",
                        `Paste blocked in answer field on Q${currentIdx + 1}`,
                        "Pasting into answer fields is disabled during standard live assessments. Write your explanation in your own words."
                      );
                    } else {
                      void recordIntegrity(
                        "paste_blocked",
                        `Accessibility paste used on Q${currentIdx + 1}`
                      );
                    }
                  }}
                  placeholder={
                    interview.interviewType === "coding"
                      ? `Write your ${interview.codingLanguage || "code"} solution and explain time/space complexity...`
                      : "Write a clear, structured explanation covering core concepts, trade-offs, and a practical example..."
                  }
                  className={`mt-3 w-full rounded-2xl border border-gray-200 p-4 text-sm leading-6 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:focus:ring-indigo-900/40 ${
                    interview.interviewType === "coding"
                      ? "bg-slate-950 font-mono text-emerald-300"
                      : "bg-white text-gray-900 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500"
                  }`}
                />

                {voiceError && (
                  <p className="mt-2 text-[11px] text-amber-700">{voiceError}</p>
                )}

                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>
                      <strong>{countWords(currentAnswer)}</strong> words
                    </span>
                    <span>
                      <strong>{currentAnswer.length}</strong> / 8,000 characters
                    </span>
                  </div>
                  <span>
                    {allowPasteAccommodation
                      ? "Accessibility paste enabled"
                      : "Paste disabled per live interview rules"}
                  </span>
                </div>

                {/* SECTION 16 FOOTER ACTIONS */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={currentIdx === 0}
                      onClick={() => void jumpToQuestion(currentIdx - 1)}
                      className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      ← Previous
                    </button>

                    <button
                      type="button"
                      onClick={() => void persistAnswer(currentIdx, currentAnswer)}
                      className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-900/60 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/60"
                    >
                      Save Answer
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {currentIdx < totalQuestions - 1 ? (
                      <button
                        type="button"
                        onClick={() => void jumpToQuestion(currentIdx + 1)}
                        className="rounded-full bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm"
                      >
                        Next Question →
                      </button>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => {
                        void persistAnswer(currentIdx, currentAnswer);
                        setPhase("review");
                      }}
                      className="rounded-full bg-gray-900 px-5 py-2 text-xs font-bold text-white hover:bg-gray-800 shadow-sm dark:bg-indigo-600 dark:hover:bg-indigo-500"
                    >
                      Review &amp; Submit ({answeredCount}/{totalQuestions})
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 16 SIDEBAR: NAVIGATION, STATUS & INTEGRITY */}
            <aside className="space-y-4 lg:col-span-4">
              {/* Question Navigator */}
              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                  Question Navigation
                </h3>
                <p className="mt-1 text-xs text-gray-600 dark:text-slate-300">
                  Answered: <strong>{answeredCount}</strong> / {totalQuestions}
                </p>

                <div className="mt-4 grid grid-cols-5 gap-2">
                  {interview.questions.map((q, idx) => {
                    const hasAns = Boolean((answers[idx] || "").trim());
                    const isCurrent = idx === currentIdx;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => void jumpToQuestion(idx)}
                        className={`flex h-10 items-center justify-center rounded-xl border text-xs font-bold transition ${
                          isCurrent
                            ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                            : hasAns
                              ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300"
                              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        }`}
                        title={`Q${idx + 1}: ${q.topic} (${hasAns ? "Answered" : "Unanswered"})`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" /> Current
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Answered
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-gray-300" /> Pending
                  </span>
                </div>
              </div>

              {/* Live Integrity Status Card */}
              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Integrity Status
                  </h3>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${
                      RISK_STYLES[integrity.riskLevel] || RISK_STYLES["LOW RISK"]
                    }`}
                  >
                    {integrity.riskLevel}
                  </span>
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl bg-gray-50 p-2.5">
                    <dt className="text-[11px] text-gray-500">Tab Switches</dt>
                    <dd className="mt-0.5 font-extrabold text-gray-900">
                      {integrity.tabSwitches}
                    </dd>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-2.5">
                    <dt className="text-[11px] text-gray-500">Focus Losses</dt>
                    <dd className="mt-0.5 font-extrabold text-gray-900">
                      {integrity.focusLosses}
                    </dd>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-2.5">
                    <dt className="text-[11px] text-gray-500">Full-Screen Exits</dt>
                    <dd className="mt-0.5 font-extrabold text-gray-900">
                      {integrity.fullscreenExits}
                    </dd>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-2.5">
                    <dt className="text-[11px] text-gray-500">Clipboard Alerts</dt>
                    <dd className="mt-0.5 font-extrabold text-gray-900">
                      {integrity.pasteAttempts + integrity.copyAttempts}
                    </dd>
                  </div>
                </dl>

                <p className="mt-3 text-[11px] leading-4 text-gray-500">
                  Informational telemetry only — never auto-rejects candidates and never secretly activates camera/mic.
                </p>
              </div>

              {/* Optional Explicit-Consent Local Camera Self-View */}
              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Optional Self-View Practice Camera
                </h3>
                <p className="mt-1 text-[11px] leading-4 text-gray-500">
                  Strictly local to your browser. Never uploaded, recorded, or analyzed.
                </p>

                <label className="mt-3 flex cursor-pointer items-center gap-2 text-[11px] text-gray-700">
                  <input
                    type="checkbox"
                    checked={cameraConsentGiven}
                    onChange={(e) => setCameraConsentGiven(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gray-300"
                  />
                  Enable local-only camera self-view
                </label>

                <button
                  type="button"
                  onClick={() => void toggleCamera()}
                  className="mt-2.5 w-full rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  {cameraEnabled ? "Turn Off Camera" : "📷 Start Local Self-View"}
                </button>

                {cameraError && (
                  <p className="mt-2 text-[11px] text-amber-700">{cameraError}</p>
                )}

                {cameraEnabled && (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="mt-3 h-36 w-full rounded-xl bg-black object-cover"
                  />
                )}
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default function InterviewWorkspace() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[60vh] items-center justify-center bg-gray-50">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        </main>
      }
    >
      <InterviewSessionInner />
    </Suspense>
  );
}
