"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";

type JobStatus = "saved" | "applied" | "interviewing" | "offer" | "rejected";

type JobApp = {
  _id: string;
  company: string;
  role: string;
  location: string;
  jobUrl: string;
  status: JobStatus;
  matchScore: number | null;
  matchedKeywords: string[];
  missingKeywords: string[];
  notes: string;
  updatedAt: string;
};

const STATUS_BADGE: Record<JobStatus, string> = {
  saved: "bg-gray-100 text-gray-700",
  applied: "bg-blue-50 text-blue-700",
  interviewing: "bg-amber-50 text-amber-800",
  offer: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

function JobsWorkspace() {
  const [jobs, setJobs] = useState<JobApp[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [reloadTick, setReloadTick] = useState(0);

  // Add job form
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("Remote");
  const [jobUrl, setJobUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    let active = true;
    const query = statusFilter ? `?status=${statusFilter}` : "";
    apiRequest<{ jobs: JobApp[] }>(`/api/jobs${query}`)
      .then((res) => {
        if (!active) return;
        setJobs(res.jobs || []);
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof Error ? err.message : "Unable to load job tracker."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [statusFilter, reloadTick]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    if (!company.trim() || !role.trim()) {
      setError("Company and role are required.");
      return;
    }

    setError("");
    try {
      setSaving(true);
      await apiRequest("/api/jobs", {
        method: "POST",
        body: {
          company: company.trim(),
          role: role.trim(),
          location: location.trim() || "Remote",
          jobUrl: jobUrl.trim(),
          jobDescription: jobDescription.trim(),
          notes: notes.trim(),
        },
      });
      setCompany("");
      setRole("");
      setJobUrl("");
      setJobDescription("");
      setNotes("");
      setReloadTick((t) => t + 1);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save application."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(jobId: string, status: JobStatus) {
    try {
      await apiRequest(`/api/jobs/${jobId}`, {
        method: "PATCH",
        body: { status },
      });
      setJobs((prev) =>
        prev.map((j) => (j._id === jobId ? { ...j, status } : j))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update status."
      );
    }
  }

  async function handleDelete(jobId: string) {
    try {
      await apiRequest(`/api/jobs/${jobId}`, { method: "DELETE" });
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete application."
      );
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-8 text-gray-900">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Job Matching & Application Tracker
        </h1>
        <p className="mt-1 text-xs text-gray-500">
          Track roles across your pipeline and automatically score job
          descriptions against your active Resume Analyzer CV.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
          >
            {error}
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Add Application Form */}
          <form
            onSubmit={handleCreate}
            className="space-y-3.5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-sm font-bold text-gray-900">
              + Track New Opportunity
            </h2>

            <input
              type="text"
              placeholder="Company name *"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Role title *"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-blue-500"
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-blue-500"
              />
              <input
                type="url"
                placeholder="Posting URL"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                className="rounded-xl border border-gray-200 px-3 py-2 text-xs outline-none focus:border-blue-500"
              />
            </div>

            <textarea
              rows={4}
              placeholder="Paste job description (optional — computes automatic Resume Match %)"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-3 text-xs outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Notes (referral, deadline, recruiter)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Scoring & Saving..." : "Save & Compute Resume Match"}
            </button>
          </form>

          {/* Applications List */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <h2 className="text-sm font-bold text-gray-900">
                Pipeline ({jobs.length})
              </h2>
              <select
                aria-label="Filter applications by status"
                value={statusFilter}
                onChange={(e) => {
                  setLoading(true);
                  setStatusFilter(e.target.value);
                }}
                className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs"
              >
                <option value="">All Stages</option>
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {loading ? (
              <div className="mt-4 space-y-3 animate-pulse">
                <div className="h-20 rounded-xl bg-gray-100" />
                <div className="h-20 rounded-xl bg-gray-100" />
              </div>
            ) : jobs.length === 0 ? (
              <p className="py-10 text-center text-xs text-gray-500">
                No tracked applications yet. Add one on the left to compute your
                ATS match score.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-gray-100">
                {jobs.map((job) => (
                  <li key={job._id} className="py-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-bold text-gray-900">
                            {job.role}
                          </h3>
                          <span className="text-xs font-semibold text-gray-500">
                            @ {job.company}
                          </span>
                          {job.matchScore !== null && (
                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                              {job.matchScore}% Resume Match
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {job.location}
                          {job.notes ? ` · ${job.notes}` : ""}
                        </p>
                        {job.missingKeywords.length > 0 && (
                          <p className="mt-1.5 text-[11px] text-amber-700">
                            Missing keywords:{" "}
                            {job.missingKeywords.slice(0, 5).join(", ")}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          aria-label={`Stage for ${job.company}`}
                          value={job.status}
                          onChange={(e) =>
                            void handleStatusChange(
                              job._id,
                              e.target.value as JobStatus
                            )
                          }
                          className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${STATUS_BADGE[job.status]}`}
                        >
                          <option value="saved">Saved</option>
                          <option value="applied">Applied</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="offer">Offer</option>
                          <option value="rejected">Rejected</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => void handleDelete(job._id)}
                          className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
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

export default function JobsPage() {
  return (
    <ProtectedRoute>
      <JobsWorkspace />
    </ProtectedRoute>
  );
}
