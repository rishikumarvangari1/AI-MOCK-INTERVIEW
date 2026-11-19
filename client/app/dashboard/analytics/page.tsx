"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type Range = "7d" | "30d" | "90d" | "all";

type AnalyticsData = {
  range: Range;
  summary: {
    completedInterviews: number;
    averageInterviewScore: number | null;
    resumesAnalyzed: number;
    trackedJobs: number;
  };
  interviewTrend: Array<{ id: string; date: string; domain: string; score: number }>;
  domainPerformance: Array<{
    domain: string;
    averageScore: number;
    bestScore: number;
    attempts: number;
  }>;
  topicBreakdown: Array<{ topic: string; averagePercent: number; attempts: number }>;
  resumeQualityHistory: Array<{
    id: string;
    version: number;
    name: string;
    date: string;
    atsScore: number;
  }>;
  jobMatches: Array<{ id: string; label: string; matchScore: number; status: string }>;
  roadmapStats: {
    durationDays: number;
    done: number;
    inProgress: number;
    todo: number;
    total: number;
  };
};

function AnalyticsWorkspace() {
  const [range, setRange] = useState<Range>("30d");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    apiRequest<AnalyticsData>(`/api/analytics/overview?range=${range}`)
      .then((res) => {
        if (!active) return;
        setData(res);
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof Error ? err.message : "Unable to load analytics."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [range]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true, max: 100 } },
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-8 text-gray-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Performance Intelligence
            </p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
              Career & Interview Analytics
            </h1>
          </div>

          <div className="flex gap-1.5 rounded-full border border-gray-200 bg-white p-1">
            {(["7d", "30d", "90d", "all"] as Range[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setLoading(true);
                  setRange(opt);
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase transition ${
                  range === opt
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 animate-pulse">
            <div className="h-64 rounded-2xl bg-gray-200" />
            <div className="h-64 rounded-2xl bg-gray-200" />
          </div>
        ) : (
          <>
            <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  label: "Completed Interviews",
                  val: data?.summary.completedInterviews ?? 0,
                  href: "/dashboard/history",
                },
                {
                  label: "Avg Interview Score",
                  val:
                    data?.summary.averageInterviewScore !== null &&
                    data?.summary.averageInterviewScore !== undefined
                      ? `${data.summary.averageInterviewScore}%`
                      : "—",
                  href: "/dashboard/interview",
                },
                {
                  label: "Resumes Analyzed",
                  val: data?.summary.resumesAnalyzed ?? 0,
                  href: "/dashboard/resume",
                },
                {
                  label: "Jobs Tracked",
                  val: data?.summary.trackedJobs ?? 0,
                  href: "/dashboard/jobs",
                },
              ].map((card) => (
                <Link
                  key={card.label}
                  href={card.href}
                  className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
                >
                  <p className="text-xs text-gray-500 group-hover:text-indigo-700">
                    {card.label}
                  </p>
                  <p className="mt-2 text-2xl font-extrabold text-gray-900">
                    {card.val}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-indigo-600">
                    View details →
                  </p>
                </Link>
              ))}
            </section>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              {/* Interview Score Trend */}
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900">
                  Interview Score History
                </h2>
                <div className="mt-4 h-60">
                  {data && data.interviewTrend.length > 0 ? (
                    <Line
                      options={chartOptions}
                      data={{
                        labels: data.interviewTrend.map((i) => i.date),
                        datasets: [
                          {
                            label: "Score (%)",
                            data: data.interviewTrend.map((i) => i.score),
                            borderColor: "#2563eb",
                            backgroundColor: "rgba(37, 99, 235, 0.15)",
                            tension: 0.3,
                          },
                        ],
                      }}
                    />
                  ) : (
                    <p className="flex h-full items-center justify-center text-xs text-gray-400">
                      Complete an interview to populate score trends.
                    </p>
                  )}
                </div>
              </section>

              {/* Domain Performance */}
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900">
                  Domain-Wise Performance
                </h2>
                <div className="mt-4 h-60">
                  {data && data.domainPerformance.length > 0 ? (
                    <Bar
                      options={chartOptions}
                      data={{
                        labels: data.domainPerformance.map((d) => d.domain),
                        datasets: [
                          {
                            label: "Avg Score (%)",
                            data: data.domainPerformance.map((d) => d.averageScore),
                            backgroundColor: "#6366f1",
                            borderRadius: 6,
                          },
                        ],
                      }}
                    />
                  ) : (
                    <p className="flex h-full items-center justify-center text-xs text-gray-400">
                      No domain performance data in this date range.
                    </p>
                  )}
                </div>
              </section>

              {/* Resume Quality History */}
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900">
                  Resume ATS Quality History
                </h2>
                <div className="mt-4 h-60">
                  {data && data.resumeQualityHistory.length > 0 ? (
                    <Bar
                      options={chartOptions}
                      data={{
                        labels: data.resumeQualityHistory.map(
                          (r) => `v${r.version} (${r.date})`
                        ),
                        datasets: [
                          {
                            label: "ATS Estimate",
                            data: data.resumeQualityHistory.map((r) => r.atsScore),
                            backgroundColor: "#06b6d4",
                            borderRadius: 6,
                          },
                        ],
                      }}
                    />
                  ) : (
                    <p className="flex h-full items-center justify-center text-xs text-gray-400">
                      Upload and analyze resumes to track ATS progression.
                    </p>
                  )}
                </div>
              </section>

              {/* Learning Roadmap Progress */}
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900">
                  Learning Roadmap Progress ({data?.roadmapStats.durationDays ?? 30}-Day Plan)
                </h2>
                <div className="mt-4 h-60">
                  {data && data.roadmapStats.total > 0 ? (
                    <Doughnut
                      options={{ responsive: true, maintainAspectRatio: false }}
                      data={{
                        labels: ["Completed", "In Progress", "To Do"],
                        datasets: [
                          {
                            data: [
                              data.roadmapStats.done,
                              data.roadmapStats.inProgress,
                              data.roadmapStats.todo,
                            ],
                            backgroundColor: ["#16a34a", "#f59e0b", "#cbd5e1"],
                          },
                        ],
                      }}
                    />
                  ) : (
                    <p className="flex h-full items-center justify-center text-xs text-gray-400">
                      Generate a learning roadmap to visualize task progress.
                    </p>
                  )}
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <AnalyticsWorkspace />
    </ProtectedRoute>
  );
}
