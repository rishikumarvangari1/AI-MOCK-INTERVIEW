"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";
import { DOMAINS } from "@/lib/domains";

type AdminMetrics = {
  totalUsers: number;
  totalInterviews: number;
  completedInterviews: number;
  totalResumes: number;
  totalJobs: number;
  domainCount?: number;
};

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  createdAt: string;
};

type AuditLog = {
  _id: string;
  action: string;
  targetType: string;
  summary: string;
  createdAt: string;
};

type QuestionItem = {
  _id: string;
  domainId: string;
  text: string;
  level: "beginner" | "intermediate" | "advanced";
  topic: string;
};

function AdminConsoleWorkspace() {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [providers, setProviders] = useState<{
    anthropic?: boolean;
    groq?: boolean;
    primary?: string;
  } | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [qBank, setQBank] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [newDomain, setNewDomain] = useState(DOMAINS[0].id);
  const [newLevel, setNewLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [newTopic, setNewTopic] = useState("");
  const [newQuestionText, setNewQuestionText] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      apiRequest<{ metrics: AdminMetrics; aiProviders: { anthropic: boolean; groq: boolean; primary: string } }>("/api/admin/overview"),
      apiRequest<{ users: AdminUser[] }>("/api/admin/users?limit=25"),
      apiRequest<{ logs: AuditLog[] }>("/api/admin/audit-logs"),
      apiRequest<{ items: QuestionItem[] }>("/api/admin/question-bank"),
    ])
      .then(([overviewRes, usersRes, logsRes, qRes]) => {
        if (!active) return;
        setMetrics(overviewRes.metrics);
        setProviders(overviewRes.aiProviders);
        setUsers(usersRes.users || []);
        setLogs(logsRes.logs || []);
        setQBank(qRes.items || []);
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load admin console."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleRoleChange(userId: string, role: "student" | "admin") {
    setError("");
    setNotice("");
    try {
      await apiRequest(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        body: { role },
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role } : u))
      );
      setNotice("User role updated and logged.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update user role."
      );
    }
  }

  async function handleAddQuestion(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    if (newQuestionText.trim().length < 10) {
      setError("Question must be at least 10 characters.");
      return;
    }
    try {
      const res = await apiRequest<{ item: QuestionItem }>(
        "/api/admin/question-bank",
        {
          method: "POST",
          body: {
            domainId: newDomain,
            level: newLevel,
            topic: newTopic.trim() || "Core Concepts",
            text: newQuestionText.trim(),
          },
        }
      );
      setQBank((prev) => [res.item, ...prev]);
      setNewQuestionText("");
      setNewTopic("");
      setNotice("Question added to fallback bank.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to add question.");
    }
  }

  async function handleDeleteQuestion(id: string) {
    try {
      await apiRequest(`/api/admin/question-bank/${id}`, { method: "DELETE" });
      setQBank((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete item.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-8 text-gray-900">
      <div className="mx-auto max-w-6xl px-6 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
            RBAC Protected · Administrators Only
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
            Platform Administration Console
          </h1>
        </div>

        {error && (
          <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">
            {error}
          </div>
        )}
        {notice && (
          <div role="status" className="rounded-xl bg-green-50 px-4 py-3 text-xs text-green-800">
            {notice}
          </div>
        )}

        {loading ? (
          <div className="h-48 animate-pulse rounded-2xl bg-gray-200" />
        ) : (
          <>
            <section className="grid grid-cols-2 gap-4 sm:grid-cols-6">
              {[
                ["Users", metrics?.totalUsers ?? 0],
                ["Interviews", metrics?.totalInterviews ?? 0],
                ["Completed", metrics?.completedInterviews ?? 0],
                ["Resumes", metrics?.totalResumes ?? 0],
                ["Jobs", metrics?.totalJobs ?? 0],
                ["Domains", metrics?.domainCount ?? DOMAINS.length],
              ].map(([label, val]) => (
                <div
                  key={String(label)}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className="mt-2 text-2xl font-extrabold text-gray-900">
                    {val}
                  </p>
                </div>
              ))}
            </section>

            {/* AI Provider Health */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900">
                Service & AI Provider Status
              </h2>
              <div className="mt-3 flex flex-wrap gap-3 text-xs">
                <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold">
                  Primary: {providers?.primary || "anthropic"}
                </span>
                <span className={`rounded-full px-3 py-1 font-semibold ${providers?.anthropic ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                  Anthropic: {providers?.anthropic ? "Configured" : "Not configured"}
                </span>
                <span className={`rounded-full px-3 py-1 font-semibold ${providers?.groq ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                  Groq Fallback: {providers?.groq ? "Configured" : "Not configured"}
                </span>
              </div>
            </section>

            {/* User Management */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-900">
                Registered Users ({users.length})
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500">
                      <th className="py-2 pr-4">Name</th>
                      <th className="py-2 pr-4">Email</th>
                      <th className="py-2 pr-4">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td className="py-3 pr-4 font-semibold text-gray-900">
                          {u.name}
                        </td>
                        <td className="py-3 pr-4 text-gray-600">{u.email}</td>
                        <td className="py-3 pr-4">
                          <select
                            aria-label={`Role for ${u.email}`}
                            value={u.role}
                            onChange={(e) =>
                              void handleRoleChange(
                                u.id,
                                e.target.value as "student" | "admin"
                              )
                            }
                            className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold"
                          >
                            <option value="student">student</option>
                            <option value="admin">admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Question Bank Manager & Audit Logs */}
            <div className="grid gap-6 lg:grid-cols-2">
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900">
                  Fallback Question Bank ({qBank.length} custom items)
                </h2>
                <form onSubmit={handleAddQuestion} className="mt-4 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newDomain}
                      onChange={(e) => setNewDomain(e.target.value)}
                      className="rounded-xl border border-gray-200 px-3 py-2 text-xs"
                    >
                      {DOMAINS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.title}
                        </option>
                      ))}
                    </select>
                    <select
                      value={newLevel}
                      onChange={(e) =>
                        setNewLevel(
                          e.target.value as "beginner" | "intermediate" | "advanced"
                        )
                      }
                      className="rounded-xl border border-gray-200 px-3 py-2 text-xs"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Topic (e.g. Concurrency)"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs"
                  />
                  <textarea
                    rows={2}
                    placeholder="Question text..."
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-2.5 text-xs"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                  >
                    + Add Fallback Question
                  </button>
                </form>

                <ul className="mt-4 space-y-2">
                  {qBank.slice(0, 8).map((item) => (
                    <li
                      key={item._id}
                      className="flex items-start justify-between gap-2 rounded-xl bg-gray-50 p-3 text-xs"
                    >
                      <div>
                        <span className="font-bold uppercase text-blue-700">
                          {item.domainId} · {item.level}
                        </span>
                        <p className="mt-1 text-gray-800">{item.text}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => void handleDeleteQuestion(item._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900">
                  Admin Audit Logs ({logs.length})
                </h2>
                {logs.length === 0 ? (
                  <p className="mt-4 text-xs text-gray-400">
                    No administrative actions recorded yet.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-2.5">
                    {logs.slice(0, 12).map((log) => (
                      <li
                        key={log._id}
                        className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs"
                      >
                        <span className="font-bold text-gray-900">
                          {log.action}
                        </span>
                        <p className="mt-0.5 text-gray-600">{log.summary}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminConsoleWorkspace />
    </ProtectedRoute>
  );
}
