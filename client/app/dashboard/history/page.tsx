"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";
import { DOMAINS } from "@/lib/domains";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

type HistoryItem = {
  id: string;
  domainId: string;
  domain: string;
  mode: "adaptive" | "structured";
  difficulty: string;
  resumeTailored: boolean;
  score: number;
  duration: number;
  questionsAnswered: number;
  questionCount: number;
  isComplete: boolean;
  performanceBand?: string | null;
  selectionDecision?: string | null;
  integrityRiskLevel?: string | null;
  fitLabel: string | null;
  createdAt: string;
};

type HistoryResponse = {
  count: number;
  total: number;
  page: number;
  totalPages: number;
  interviews: HistoryItem[];
};

type AnalyticsResponse = {
  hasComparison: boolean;
  totalCompleted: number;
  averageScore?: number;
  bestScore?: number;
  message?: string;
  comparison?: {
    previousId: string;
    previousDomain: string;
    previousScore: number;
    previousReadiness: string;
    latestId: string;
    latestDomain: string;
    latestScore: number;
    latestReadiness: string;
    scoreImprovement: number;
    previousWeakTopics: number;
    latestWeakTopics: number;
    weaknessReduction: number;
  } | null;
  scoreTimeline: Array<{
    attempt: number;
    id: string;
    domain: string;
    score: number;
    performanceBand: string;
    selectionDecision: string;
    date: string;
  }>;
  topicProgress: Array<{
    topic: string;
    previousPercent: number | null;
    latestPercent: number;
    delta: number | null;
  }>;
};

function formatDuration(sec: number) {
  if (!sec || sec < 60) return `${Math.max(0, sec)}s`;
  return `${Math.round(sec / 60)}m`;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Recent";
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function HistoryWorkspace() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [domainFilter, setDomainFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams({
      page: String(page),
      limit: "10",
    });
    if (domainFilter) params.set("domain", domainFilter);
    if (statusFilter) params.set("status", statusFilter);
    if (sortBy === "score") params.set("sort", "score");

    Promise.allSettled([
      apiRequest<HistoryResponse>(`/api/interviews/history?${params.toString()}`),
      apiRequest<AnalyticsResponse>("/api/interviews/analytics"),
    ])
      .then(([histRes, anaRes]) => {
        if (!active) return;
        if (histRes.status === "fulfilled") {
          setItems(histRes.value.interviews || []);
          setTotal(histRes.value.total || 0);
          setTotalPages(histRes.value.totalPages || 1);
          setError("");
        } else {
          setError(
            histRes.reason instanceof Error
              ? histRes.reason.message
              : "Unable to load interview history."
          );
        }
        if (anaRes.status === "fulfilled") {
          setAnalytics(anaRes.value);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [page, domainFilter, statusFilter, sortBy, reloadTick]);

  async function handleDelete(id: string) {
    try {
      await apiRequest(`/api/interviews/${id}`, { method: "DELETE" });
      setReloadTick((t) => t + 1);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete session."
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-8 text-gray-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Interview History &amp; Performance Comparison
            </p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
              My Interview Sessions ({total})
            </h1>
          </div>

          <Link
            href="/dashboard/interview"
            className="rounded-full bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
          >
            + Start Live 10-Question Interview
          </Link>
        </div>

        {/* SECTION 20: ATTEMPT-OVER-ATTEMPT PERFORMANCE COMPARISON */}
        {analytics && (
          <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">
              Performance Comparison Across Attempts
            </h2>

            {!analytics.hasComparison ? (
              <div className="mt-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 text-xs leading-5 text-indigo-950">
                <p className="font-bold">
                  {analytics.totalCompleted === 1
                    ? "1 completed interview recorded — complete a second interview to unlock comparison charts."
                    : "No completed interviews yet."}
                </p>
                <p className="mt-1 text-indigo-800">
                  {analytics.message ||
                    "We never display fabricated comparison metrics. Once you complete at least 2 interviews, previous vs. latest score delta, topic-wise progress, and weakness reduction will appear automatically."}
                </p>
              </div>
            ) : (
              analytics.comparison && (
                <div className="mt-4 space-y-6">
                  <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-5">
                    <Link
                      href={`/dashboard/interview?id=${analytics.comparison.previousId}`}
                      className="block rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/40"
                    >
                      <p className="text-[11px] font-semibold text-gray-500">
                        Previous Score →
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-gray-900">
                        {analytics.comparison.previousScore}%
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {analytics.comparison.previousDomain}
                      </p>
                    </Link>

                    <Link
                      href={`/dashboard/interview?id=${analytics.comparison.latestId}`}
                      className="block rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/40"
                    >
                      <p className="text-[11px] font-semibold text-gray-500">
                        Latest Score →
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-indigo-700">
                        {analytics.comparison.latestScore}%
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {analytics.comparison.latestDomain}
                      </p>
                    </Link>

                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <p className="text-[11px] font-semibold text-gray-500">
                        Score Improvement
                      </p>
                      <p
                        className={`mt-1 text-2xl font-extrabold ${
                          analytics.comparison.scoreImprovement >= 0
                            ? "text-emerald-700"
                            : "text-red-600"
                        }`}
                      >
                        {analytics.comparison.scoreImprovement >= 0 ? "+" : ""}
                        {analytics.comparison.scoreImprovement}%
                      </p>
                      <p className="text-[11px] text-gray-500">
                        vs previous attempt
                      </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <p className="text-[11px] font-semibold text-gray-500">
                        Weakness Reduction
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-gray-900">
                        {analytics.comparison.weaknessReduction >= 0 ? "-" : "+"}
                        {Math.abs(analytics.comparison.weaknessReduction)} topics
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {analytics.comparison.previousWeakTopics} →{" "}
                        {analytics.comparison.latestWeakTopics} weak
                      </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <p className="text-[11px] font-semibold text-gray-500">
                        Readiness Change
                      </p>
                      <p className="mt-1 text-xs font-extrabold text-indigo-800">
                        {analytics.comparison.previousReadiness}
                      </p>
                      <p className="text-xs font-extrabold text-emerald-700">
                        → {analytics.comparison.latestReadiness}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-gray-100 p-4">
                      <p className="mb-3 text-xs font-bold text-gray-800">
                        Score Progression Across Completed Attempts
                      </p>
                      <div className="relative h-56">
                        <Line
                          data={{
                            labels: analytics.scoreTimeline.map(
                              (item) => `#${item.attempt} ${item.domain.slice(0, 12)}`
                            ),
                            datasets: [
                              {
                                label: "Interview Score (%)",
                                data: analytics.scoreTimeline.map((i) => i.score),
                                borderColor: "#4f46e5",
                                backgroundColor: "rgba(79,70,229,0.15)",
                                tension: 0.3,
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            animation: false,
                            scales: {
                              y: { min: 0, max: 100 },
                            },
                          }}
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 p-4">
                      <p className="mb-3 text-xs font-bold text-gray-800">
                        Latest Topic Performance Comparison
                      </p>
                      <div className="relative h-56">
                        {analytics.topicProgress.length > 0 ? (
                          <Bar
                            data={{
                              labels: analytics.topicProgress.map((t) => t.topic),
                              datasets: [
                                {
                                  label: "Latest (%)",
                                  data: analytics.topicProgress.map(
                                    (t) => t.latestPercent
                                  ),
                                  backgroundColor: "#0891b2",
                                  borderRadius: 6,
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              animation: false,
                              scales: { y: { min: 0, max: 100 } },
                            }}
                          />
                        ) : (
                          <p className="flex h-full items-center justify-center text-xs text-gray-400">
                            Topic breakdown will populate as topics repeat across attempts.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </section>
        )}

        {/* FILTERS */}
        <section className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <select
            aria-label="Filter by domain"
            value={domainFilter}
            onChange={(e) => {
              setLoading(true);
              setPage(1);
              setDomainFilter(e.target.value);
            }}
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs"
          >
            <option value="">All Domains</option>
            {DOMAINS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => {
              setLoading(true);
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs"
          >
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in_progress">In Progress</option>
          </select>

          <select
            aria-label="Sort sessions"
            value={sortBy}
            onChange={(e) => {
              setLoading(true);
              setPage(1);
              setSortBy(e.target.value);
            }}
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs"
          >
            <option value="recent">Newest First</option>
            <option value="score">Highest Score</option>
          </select>
        </section>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
          >
            {error}
          </div>
        )}

        {/* INTERVIEW HISTORY LIST */}
        <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          {loading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-16 rounded-xl bg-gray-100" />
              <div className="h-16 rounded-xl bg-gray-100" />
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-semibold text-gray-800">
                No matching interview sessions
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Start a live 10-question mock interview or adjust your filters above.
              </p>
              <Link
                href="/dashboard/interview"
                className="mt-4 inline-block rounded-full bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                Start Practicing
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-4 py-4"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold text-gray-900">
                        {item.domain}
                      </h2>
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold capitalize text-gray-600">
                        {item.questionCount}Q · {item.difficulty}
                      </span>
                      {item.selectionDecision && (
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                            item.selectionDecision === "RECOMMENDED"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {item.selectionDecision}
                        </span>
                      )}
                      {item.integrityRiskLevel && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                          {item.integrityRiskLevel}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatDate(item.createdAt)} · {item.questionsAnswered}/
                      {item.questionCount} answered · {formatDuration(item.duration)}
                      {item.performanceBand ? ` · ${item.performanceBand}` : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.isComplete
                          ? "bg-indigo-50 text-indigo-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {item.isComplete ? `${item.score}/100` : "In progress"}
                    </span>

                    <Link
                      href={`/dashboard/interview?id=${item.id}`}
                      className="rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
                    >
                      {item.isComplete ? "View Results" : "Resume"}
                    </Link>

                    <button
                      type="button"
                      onClick={() => void handleDelete(item.id)}
                      className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-full border border-gray-200 px-4 py-1.5 font-semibold text-gray-700 disabled:opacity-40"
              >
                ← Previous
              </button>
              <span className="text-gray-500">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-full border border-gray-200 px-4 py-1.5 font-semibold text-gray-700 disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function InterviewHistoryPage() {
  return (
    <ProtectedRoute>
      <HistoryWorkspace />
    </ProtectedRoute>
  );
}
