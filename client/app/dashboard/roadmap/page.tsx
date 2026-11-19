"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";

type DurationOption = 7 | 15 | 30 | 60 | 90;

type Milestone = {
  id: string;
  dayRange?: string;
  title: string;
  topic: string;
  objective?: string;
  codingTask?: string;
  miniProject?: string;
  revisionNote?: string;
  priority: number;
  duration: string;
  status: "todo" | "in_progress" | "done";
  resources: string[];
};

type RoadmapPayload = {
  targetRole: string;
  durationDays: DurationOption;
  roadmap: {
    durationDays: DurationOption;
    progress: number;
    completedCount: number;
    totalCount: number;
    nextTaskId: string | null;
    milestones: Milestone[];
  };
};

const DURATIONS: DurationOption[] = [7, 15, 30, 60, 90];

function RoadmapWorkspace() {
  const [data, setData] = useState<RoadmapPayload | null>(null);
  const [targetRole, setTargetRole] = useState("Full Stack Developer");
  const [durationDays, setDurationDays] = useState<DurationOption>(30);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    apiRequest<RoadmapPayload>("/api/career/overview")
      .then((res) => {
        if (!active) return;
        setData(res);
        setTargetRole(res.targetRole || "Full Stack Developer");
        if (DURATIONS.includes(res.durationDays)) {
          setDurationDays(res.durationDays);
        }
      })
      .catch((err) => {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Unable to load roadmap."
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

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (generating) return;
    setError("");
    setNotice("");
    try {
      setGenerating(true);
      const res = await apiRequest<RoadmapPayload & { message: string }>(
        "/api/career/generate",
        {
          method: "POST",
          body: { targetRole: targetRole.trim(), durationDays },
          timeoutMs: 60_000,
        }
      );
      setData(res);
      setNotice(res.message);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate roadmap."
      );
    } finally {
      setGenerating(false);
    }
  }

  async function updateStatus(id: string, status: Milestone["status"]) {
    try {
      const res = await apiRequest<{ progress: number; milestone: Milestone }>(
        `/api/career/roadmap/${id}`,
        { method: "PATCH", body: { status } }
      );
      setData((prev) => {
        if (!prev) return prev;
        const nextList = prev.roadmap.milestones.map((m) =>
          m.id === id ? { ...m, status: res.milestone.status } : m
        );
        const nextTask = nextList.find((m) => m.status !== "done") || null;
        return {
          ...prev,
          roadmap: {
            ...prev.roadmap,
            progress: res.progress,
            completedCount: nextList.filter((m) => m.status === "done").length,
            nextTaskId: nextTask?.id || null,
            milestones: nextList,
          },
        };
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update task status."
      );
    }
  }

  const nextTask = data?.roadmap.milestones.find(
    (m) => m.id === data.roadmap.nextTaskId
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-8 text-gray-900">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600">
          Structured Preparation Plan
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
          Personalized Learning Roadmap
        </h1>

        <form
          onSubmit={handleGenerate}
          className="mt-5 flex flex-wrap items-end gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="min-w-[220px] flex-1">
            <label
              htmlFor="rm-role"
              className="block text-xs font-semibold text-gray-700"
            >
              Target Role / Goal
            </label>
            <input
              id="rm-role"
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs"
            />
          </div>

          <div>
            <span className="block text-xs font-semibold text-gray-700">
              Timeline
            </span>
            <div className="mt-1 flex gap-1.5">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDurationDays(d)}
                  className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                    durationDays === d
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={generating}
            className="rounded-full bg-gray-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {generating ? "Generating..." : `Generate ${durationDays}-Day Plan`}
          </button>
        </form>

        {error && (
          <div role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">
            {error}
          </div>
        )}
        {notice && (
          <div role="status" className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-xs text-green-800">
            {notice}
          </div>
        )}

        {loading ? (
          <div className="mt-6 h-64 animate-pulse rounded-2xl bg-gray-200" />
        ) : data ? (
          <>
            {/* Continue from last completed task banner */}
            {nextTask && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    Continue Where You Left Off · {nextTask.dayRange || nextTask.duration}
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-900">
                    {nextTask.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void updateStatus(nextTask.id, "done")}
                  className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Mark Complete ✓
                </button>
              </div>
            )}

            {/* Progress bar */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex justify-between text-xs font-bold">
                <span>
                  {data.roadmap.durationDays}-Day Roadmap Progress (
                  {data.roadmap.completedCount}/{data.roadmap.totalCount} tasks)
                </span>
                <span className="text-emerald-700">
                  {data.roadmap.progress}%
                </span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all"
                  style={{ width: `${data.roadmap.progress}%` }}
                />
              </div>
            </div>

            {/* Tasks */}
            <div className="mt-6 space-y-4">
              {data.roadmap.milestones.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700">
                          {item.dayRange || item.duration}
                        </span>
                        <h2 className="text-sm font-bold text-gray-900">
                          {item.title}
                        </h2>
                      </div>
                      {item.objective && (
                        <p className="mt-2 text-xs text-gray-600">
                          <strong>Objective:</strong> {item.objective}
                        </p>
                      )}
                      {item.codingTask && (
                        <p className="mt-1 text-xs text-gray-600">
                          <strong>Practice / Coding Task:</strong>{" "}
                          {item.codingTask}
                        </p>
                      )}
                      {item.miniProject && (
                        <p className="mt-1 text-xs text-gray-600">
                          <strong>Mini-Project:</strong> {item.miniProject}
                        </p>
                      )}
                      {item.revisionNote && (
                        <p className="mt-1 text-xs text-gray-500">
                          <strong>Revision Checkpoint:</strong>{" "}
                          {item.revisionNote}
                        </p>
                      )}
                    </div>

                    <select
                      aria-label={`Status for ${item.title}`}
                      value={item.status}
                      onChange={(e) =>
                        void updateStatus(
                          item.id,
                          e.target.value as Milestone["status"]
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Completed ✓</option>
                    </select>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}

export default function RoadmapPage() {
  return (
    <ProtectedRoute>
      <RoadmapWorkspace />
    </ProtectedRoute>
  );
}
