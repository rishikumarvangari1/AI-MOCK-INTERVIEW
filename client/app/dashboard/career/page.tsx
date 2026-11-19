"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";

type SkillEntry = {
  skill: string;
  sources: string[];
  verifiedScore: number | null;
  level: string;
};

type CareerRec = {
  role: string;
  domainId?: string;
  fitScore: number;
  rationale: string;
  missingSkills: string[];
};

type Milestone = {
  id: string;
  title: string;
  topic: string;
  priority: number;
  duration: string;
  status: "todo" | "in_progress" | "done";
  resources: string[];
};

type CareerOverview = {
  targetRole: string;
  skillInventory: SkillEntry[];
  recommendations: CareerRec[];
  roadmap: {
    progress: number;
    completedCount: number;
    totalCount: number;
    milestones: Milestone[];
  };
};

function CareerHubWorkspace() {
  const [data, setData] = useState<CareerOverview | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    apiRequest<CareerOverview>("/api/career/overview")
      .then((res) => {
        if (!active) return;
        setData(res);
        setTargetRole(res.targetRole || "Full Stack Developer");
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load career intelligence."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (generating) return;
    setError("");
    setNotice("");
    try {
      setGenerating(true);
      const res = await apiRequest<CareerOverview & { message: string }>(
        "/api/career/generate",
        {
          method: "POST",
          body: { targetRole: targetRole.trim() || "Full Stack Developer" },
          timeoutMs: 60_000,
        }
      );
      setData(res);
      setNotice(res.message);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refresh career plan."
      );
    } finally {
      setGenerating(false);
    }
  }

  async function handleToggleMilestone(
    milestoneId: string,
    status: Milestone["status"]
  ) {
    if (!data) return;
    setError("");
    try {
      const res = await apiRequest<{ progress: number; milestone: Milestone }>(
        `/api/career/roadmap/${milestoneId}`,
        {
          method: "PATCH",
          body: { status },
        }
      );
      setData((prev) => {
        if (!prev) return prev;
        const updated = prev.roadmap.milestones.map((m) =>
          m.id === milestoneId ? { ...m, status: res.milestone.status } : m
        );
        return {
          ...prev,
          roadmap: {
            ...prev.roadmap,
            progress: res.progress,
            completedCount: updated.filter((m) => m.status === "done").length,
            milestones: updated,
          },
        };
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update milestone."
      );
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-6xl space-y-5 animate-pulse">
          <div className="h-32 rounded-3xl bg-gray-200" />
          <div className="h-64 rounded-2xl bg-gray-200" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-8 text-gray-900">
      <div className="mx-auto max-w-6xl px-6">
        <section className="rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-700 to-cyan-700 px-8 py-9 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
            Career Intelligence Engine
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            Career Paths, Skill Gaps & Learning Roadmap
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-blue-100">
            Synthesizes your Resume Analyzer skills, completed Mock Interview
            evaluations, and career profile into an actionable progression plan.
          </p>

          <form
            onSubmit={handleGenerate}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="Target role (e.g. Full Stack Developer)"
              aria-label="Target career role"
              className="min-w-[240px] flex-1 rounded-full bg-white/95 px-5 py-2.5 text-xs font-medium text-gray-900 outline-none"
            />
            <button
              type="submit"
              disabled={generating}
              className="rounded-full bg-gray-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {generating ? "Updating Plan..." : "✨ Refresh AI Career Plan"}
            </button>
          </form>
        </section>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
          >
            {error}
          </div>
        )}
        {notice && (
          <div
            role="status"
            className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-xs text-green-800"
          >
            {notice}
          </div>
        )}

        {/* Career Recommendations */}
        <section className="mt-8">
          <h2 className="text-base font-bold text-gray-900">
            Recommended Career Tracks
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {(data?.recommendations || []).map((rec) => (
              <article
                key={rec.role}
                className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      {rec.role}
                    </h3>
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-extrabold text-blue-700">
                      {rec.fitScore}% Fit
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-gray-600">
                    {rec.rationale}
                  </p>
                  {rec.missingSkills.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[11px] font-semibold text-amber-700">
                        Priority skill gaps:
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {rec.missingSkills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] text-amber-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href={`/dashboard/interview?domain=${rec.domainId || "fullstack"}`}
                  className="mt-4 inline-block text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Practice {rec.role} interview →
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Learning Roadmap & Skill Inventory */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Interactive Learning Roadmap
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  {data?.roadmap.completedCount ?? 0} of{" "}
                  {data?.roadmap.totalCount ?? 0} milestones completed
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
                {data?.roadmap.progress ?? 0}% Complete
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-emerald-600 transition-all"
                style={{ width: `${data?.roadmap.progress ?? 0}%` }}
              />
            </div>

            <div className="mt-5 space-y-3">
              {(data?.roadmap.milestones || []).map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-gray-200 bg-gray-50/70 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-gray-600 ring-1 ring-gray-200">
                          P{item.priority} · {item.duration}
                        </span>
                        <h3 className="text-sm font-bold text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                      {item.resources.length > 0 && (
                        <p className="mt-1.5 text-xs text-gray-600">
                          Resources: {item.resources.join(" · ")}
                        </p>
                      )}
                    </div>

                    <select
                      aria-label={`Status for ${item.title}`}
                      value={item.status}
                      onChange={(e) =>
                        void handleToggleMilestone(
                          item.id,
                          e.target.value as Milestone["status"]
                        )
                      }
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Completed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">
              Verified Skill Inventory
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Aggregated from your profile, active resume, and interviews
            </p>

            {(data?.skillInventory || []).length === 0 ? (
              <p className="mt-4 text-xs text-gray-400">
                Upload a resume or add skills in your profile to build your skill
                inventory.
              </p>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {data!.skillInventory.slice(0, 15).map((entry) => (
                  <li
                    key={entry.skill}
                    className="flex items-center justify-between gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {entry.skill}
                      </p>
                      <p className="text-[10px] capitalize text-gray-500">
                        {entry.sources.join(" + ")}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-blue-700 ring-1 ring-gray-200">
                      {entry.verifiedScore !== null
                        ? `${entry.verifiedScore}%`
                        : entry.level.replace(/_/g, " ")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default function CareerPage() {
  return (
    <ProtectedRoute>
      <CareerHubWorkspace />
    </ProtectedRoute>
  );
}
