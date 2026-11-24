"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/Authcontent";
import ProtectedRoute from "@/components/ProtectedRoute";
import DomainPicker from "@/components/DomainPicker";
import { apiRequest } from "@/lib/api";
import { DOMAINS } from "@/lib/domains";

type Tab = "history" | "resume";

type DashboardSummary = {
  stats: {
    totalInterviews: number;
    completedInterviews: number;
    averageScore: number | null;
    bestScore: number | null;
    totalPracticeSeconds: number;
    resumeCount: number;
    latestAtsScore: number | null;
    readinessScore: number;
  };
  recentInterviews: Array<{
    id: string;
    domain: string;
    score: number;
    questionsAnswered: number;
    duration: number;
    isComplete: boolean;
    createdAt: string;
  }>;
  latestResume: {
    id: string;
    originalName: string;
    characterCount: number;
    hasAnalysis: boolean;
    atsScore: number | null;
    uploadedAt: string;
  } | null;
  domainProgress: Array<{
    domain: string;
    attempts: number;
    completed: number;
    averageScore: number;
    bestScore: number;
  }>;
  profileCompleteness: {
    percent: number;
    missing: string[];
  };
};

function formatDuration(seconds: number): string {
  if (!seconds || seconds < 60) return `${Math.max(0, Math.round(seconds))}s`;
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem ? `${hrs}h ${rem}m` : `${hrs}h`;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Recent";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatCard({
  title,
  icon,
  value,
  subtitle,
  tint,
  href,
}: {
  title: string;
  icon: string;
  value: string;
  subtitle: string;
  tint: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-500 group-hover:text-blue-700">
          {title}
        </p>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-base ${tint}`}
        >
          {icon}
        </span>
      </div>
      <p className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        {value}
      </p>
      <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500">
        <span>{subtitle}</span>
        <span className="font-semibold text-blue-600 opacity-0 transition group-hover:opacity-100">
          Open →
        </span>
      </div>
    </Link>
  );
}

function DashboardContent() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("history");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSummary = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest<DashboardSummary>("/api/dashboard/summary");
      setSummary(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load live dashboard metrics."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    apiRequest<DashboardSummary>("/api/dashboard/summary")
      .then((data) => {
        if (active) setSummary(data);
      })
      .catch((err) => {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load live dashboard metrics."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const firstName = user?.name?.trim().split(" ")[0] || "Candidate";
  const stats = summary?.stats;
  const featuredDomains = DOMAINS.slice(0, 6);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-8">
        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-8 py-10 shadow-lg">
          <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-20 right-32 h-44 w-44 rounded-full bg-indigo-400/20" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="text-sm font-medium text-blue-100">
                Welcome back, {firstName}
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Ready for your next career milestone?
              </h1>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                Practice domain-specific AI interviews, optimize your resume with
                ATS intelligence, and track measurable skill readiness.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className="rounded-full bg-white px-6 py-3 text-xs font-bold text-blue-700 shadow-md transition hover:bg-blue-50 dark:bg-white dark:text-blue-700 dark:hover:bg-slate-100"
                >
                  Start Mock Interview →
                </button>

                <Link
                  href="/dashboard/resume"
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold text-white transition hover:bg-white/20"
                >
                  📄 Open Resume Analyzer
                </Link>
              </div>
            </div>

            <Link
              href="/dashboard/skills"
              className="block rounded-2xl border border-white/20 bg-white/10 px-6 py-5 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-100">
                Career Readiness →
              </p>
              <p className="mt-1 text-4xl font-extrabold">
                {loading ? "—" : `${stats?.readinessScore ?? 0}%`}
              </p>
              <p className="mt-1 text-xs text-blue-100">
                Profile {summary?.profileCompleteness.percent ?? 0}% complete
              </p>
            </Link>
          </div>
        </section>

        {error && (
          <div
            role="alert"
            className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-xs text-red-700"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => void loadSummary()}
              className="rounded-full bg-red-600 px-4 py-1.5 font-semibold text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Live Stats Grid */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Sessions"
            icon="📋"
            value={loading ? "…" : String(stats?.totalInterviews ?? 0)}
            subtitle={`${stats?.completedInterviews ?? 0} completed`}
            tint="bg-blue-50"
            href="/dashboard/history"
          />
          <StatCard
            title="Average Score"
            icon="📊"
            value={
              loading
                ? "…"
                : stats?.averageScore !== null && stats?.averageScore !== undefined
                  ? `${stats.averageScore}%`
                  : "—"
            }
            subtitle={
              stats?.bestScore !== null && stats?.bestScore !== undefined
                ? `Best score: ${stats.bestScore}%`
                : "Complete an interview to score"
            }
            tint="bg-green-50"
            href="/dashboard/analytics"
          />
          <StatCard
            title="Resume ATS Score"
            icon="📄"
            value={
              loading
                ? "…"
                : stats?.latestAtsScore !== null &&
                    stats?.latestAtsScore !== undefined
                  ? `${stats.latestAtsScore}/100`
                  : summary?.latestResume
                    ? "Uploaded"
                    : "—"
            }
            subtitle={
              summary?.latestResume
                ? summary.latestResume.originalName
                : "Upload in Resume Analyzer"
            }
            tint="bg-amber-50"
            href="/dashboard/resume"
          />
          <StatCard
            title="Practice Time"
            icon="⏱️"
            value={
              loading
                ? "…"
                : formatDuration(stats?.totalPracticeSeconds ?? 0)
            }
            subtitle="Total interview practice"
            tint="bg-purple-50"
            href="/dashboard/interview"
          />
        </section>

        {/* Quick Domain Start */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Start by Domain
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Jump straight into a technical mock interview
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all {DOMAINS.length} domains →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {featuredDomains.map((domain) => (
              <Link
                key={domain.id}
                href={`/dashboard/interview?domain=${domain.id}`}
                className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/50"
              >
                <span className="text-2xl">{domain.icon}</span>
                <span className="mt-2 text-xs font-semibold text-gray-800 dark:text-slate-200">
                  {domain.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Main 2-Column Workspace */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Left 2 cols: Recent Sessions + Resume Snapshot */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 dark:border-slate-800">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("history")}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    activeTab === "history"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  📋 Recent Interviews
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("resume")}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    activeTab === "resume"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  📄 Resume Analyzer
                </button>
              </div>

              <Link
                href={
                  activeTab === "history"
                    ? "/dashboard/history"
                    : "/dashboard/resume"
                }
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {activeTab === "history" ? "View all sessions →" : "Open analyzer →"}
              </Link>
            </div>

            {activeTab === "history" ? (
              loading ? (
                <div className="mt-5 space-y-3 animate-pulse">
                  <div className="h-14 rounded-xl bg-gray-100" />
                  <div className="h-14 rounded-xl bg-gray-100" />
                </div>
              ) : summary && summary.recentInterviews.length > 0 ? (
                <ul className="mt-4 divide-y divide-gray-100">
                  {summary.recentInterviews.map((session) => (
                    <li key={session.id}>
                      <Link
                        href={`/dashboard/interview?id=${session.id}`}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl px-2 py-3.5 transition hover:bg-gray-50"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {session.domain}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {formatDate(session.createdAt)} ·{" "}
                            {session.questionsAnswered} answered ·{" "}
                            {formatDuration(session.duration)}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                              session.isComplete
                                ? "bg-green-50 text-green-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {session.isComplete
                              ? `Score: ${session.score}%`
                              : "In progress"}
                          </span>

                          <span className="text-xs font-semibold text-blue-600">
                            {session.isComplete ? "Report →" : "Resume →"}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-10 text-center">
                  <p className="text-sm font-semibold text-gray-800">
                    No mock interviews yet
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Start your first technical session to get AI scoring and a
                    personalized skill roadmap.
                  </p>
                  <button
                    type="button"
                    onClick={() => setPickerOpen(true)}
                    className="mt-4 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    Start First Interview
                  </button>
                </div>
              )
            ) : loading ? (
              <div className="mt-5 h-28 animate-pulse rounded-xl bg-gray-100" />
            ) : summary?.latestResume ? (
              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {summary.latestResume.originalName}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Uploaded {formatDate(summary.latestResume.uploadedAt)} ·{" "}
                      {summary.latestResume.characterCount.toLocaleString()} chars
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    {summary.latestResume.atsScore !== null
                      ? `ATS ${summary.latestResume.atsScore}/100`
                      : summary.latestResume.hasAnalysis
                        ? "Analyzed"
                        : "Ready for ATS Audit"}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/dashboard/resume"
                    className="rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    Open Full Resume Analyzer →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center">
                <p className="text-sm font-semibold text-gray-800">
                  No resume analyzed yet
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Upload your PDF, DOCX, or TXT resume for ATS scoring, keyword
                  matching, and AI bullet rewrites.
                </p>
                <Link
                  href="/dashboard/resume"
                  className="mt-4 inline-block rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  Upload Resume
                </Link>
              </div>
            )}
          </section>

          {/* Right column: Domain Progress & Account */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900">
                Domain Performance
              </h2>
              {summary && summary.domainProgress.length > 0 ? (
                <div className="mt-4 space-y-2.5">
                  {summary.domainProgress.map((item) => (
                    <Link
                      key={item.domain}
                      href={`/dashboard/interview?domain=${encodeURIComponent(item.domain)}`}
                      className="block rounded-xl p-2 transition hover:bg-blue-50/60"
                    >
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-gray-700">
                          {item.domain}
                        </span>
                        <span className="font-bold text-gray-900">
                          {item.averageScore}%
                        </span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${Math.min(100, item.averageScore)}%` }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-xs leading-5 text-gray-500">
                  Domain mastery bars will appear here once you complete your
                  first mock interview.
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900">
                Profile & Quick Links
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                {user?.email}
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/dashboard/profile"
                  className="rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  👤 Edit Profile ({summary?.profileCompleteness.percent ?? 0}%)
                </Link>
                <Link
                  href="/dashboard/resume"
                  className="rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  📄 Resume Analyzer
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-xl border border-red-100 px-3.5 py-2.5 text-left text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  🚪 Sign out
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <DomainPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </main>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
