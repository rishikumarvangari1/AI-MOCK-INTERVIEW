"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";

type ResumeTab = "ats" | "jd" | "rewrite" | "history";

type AtsReport = {
  overallScore: number | null;
  sectionScores: {
    formatting: number;
    impact: number;
    keywords: number;
    completeness: number;
    clarity: number;
  };
  strengths: string[];
  weaknesses: string[];
  missingInfo: string[];
  atsSuggestions: string[];
  recommendedRoles: string[];
  actionPlan: string[];
  analyzedAt: string | null;
};

type JdMatch = {
  _id?: string;
  targetRole: string;
  jobDescriptionSnippet: string;
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  createdAt: string;
};

type RewriteEntry = {
  _id?: string;
  targetRole: string;
  summaryRewrite: string;
  bulletRewrites: Array<{
    original: string;
    improved: string;
    rationale: string;
  }>;
  createdAt: string;
};

type DomainRecommendation = {
  domainId: string;
  domain: string;
  matchPercentage: number;
  supportingSkills: string[];
  missingSkills: string[];
  rationale: string;
  uncertaintyNote?: string;
};

type ResumeItem = {
  id: string;
  version: number;
  isActive: boolean;
  originalName: string;
  mimeType: string;
  fileSizeBytes: number;
  characterCount: number;
  wordCount: number;
  resumeText?: string;
  parsed?: {
    contact: {
      hasEmail: boolean;
      hasPhone: boolean;
      hasLinkedin: boolean;
      hasGithub: boolean;
    };
    sections: string[];
    skills: string[];
    bulletCount: number;
    quantifiedBulletCount: number;
    experienceYearsEstimate: number | null;
  } | null;
  atsReport?: AtsReport | null;
  domainRecommendations?: DomainRecommendation[];
  analysis?: string;
  jdMatches: JdMatch[];
  rewrites: RewriteEntry[];
  uploadedAt: string;
  updatedAt: string;
};

type VersionComparison = {
  from: {
    id: string;
    version: number;
    originalName: string;
    atsScore: number | null;
    wordCount: number;
    skillCount: number;
    quantifiedBullets: number;
  };
  to: {
    id: string;
    version: number;
    originalName: string;
    atsScore: number | null;
    wordCount: number;
    skillCount: number;
    quantifiedBullets: number;
  };
  deltas: {
    atsScore: number | null;
    wordCount: number;
    skillCount: number;
    quantifiedBullets: number;
  };
  addedSkills: string[];
  removedSkills: string[];
};

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTS = [".pdf", ".docx", ".txt"];

function formatDate(iso?: string | null) {
  if (!iso) return "Not yet";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Recent";
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function scoreColor(score: number) {
  if (score >= 80) return "text-green-700 bg-green-50 border-green-200";
  if (score >= 60) return "text-blue-700 bg-blue-50 border-blue-200";
  if (score >= 40) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-red-700 bg-red-50 border-red-200";
}

function ResumeAnalyzerWorkspace() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<ResumeTab>("ats");
  const [resume, setResume] = useState<ResumeItem | null>(null);
  const [history, setHistory] = useState<ResumeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [matchingJd, setMatchingJd] = useState(false);
  const [rewriting, setRewriting] = useState(false);
  const [comparing, setComparing] = useState(false);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // JD Matcher form
  const [jdRole, setJdRole] = useState("");
  const [jdText, setJdText] = useState("");

  // Rewrite form
  const [rewriteRole, setRewriteRole] = useState("Full Stack Software Engineer");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Version Comparison
  const [compareV1, setCompareV1] = useState("");
  const [compareV2, setCompareV2] = useState("");
  const [comparison, setComparison] = useState<VersionComparison | null>(null);

  const refreshHistory = useCallback(async () => {
    try {
      const hist = await apiRequest<{ resumes: ResumeItem[] }>(
        "/api/resume/history?limit=20"
      );
      setHistory(hist.resumes || []);
      if (hist.resumes.length >= 2) {
        setCompareV1((prev) => prev || hist.resumes[1].id);
        setCompareV2((prev) => prev || hist.resumes[0].id);
      }
    } catch {
      // Keep existing state if history fetch fails
    }
  }, []);

  useEffect(() => {
    let active = true;
    Promise.allSettled([
      apiRequest<{ resume: ResumeItem }>("/api/resume/me"),
      apiRequest<{ resumes: ResumeItem[] }>("/api/resume/history?limit=20"),
    ])
      .then(([meResult, histResult]) => {
        if (!active) return;
        if (meResult.status === "fulfilled") {
          setResume(meResult.value.resume);
        } else {
          setResume(null);
        }
        if (histResult.status === "fulfilled") {
          const list = histResult.value.resumes || [];
          setHistory(list);
          if (list.length >= 2) {
            setCompareV1(list[1].id);
            setCompareV2(list[0].id);
          }
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleFileUpload(file: File | null | undefined) {
    if (!file || uploading) return;
    setError("");
    setNotice("");

    const lower = file.name.toLowerCase();
    if (!ALLOWED_EXTS.some((ext) => lower.endsWith(ext))) {
      setError("Only PDF, DOCX, and TXT resume files are supported.");
      return;
    }

    if (file.size > MAX_BYTES) {
      setError("Resume file must be 5 MB or smaller.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      const res = await apiRequest<{
        message: string;
        resume: ResumeItem;
      }>("/api/resume/upload", {
        method: "POST",
        body: formData,
        timeoutMs: 45_000,
      });

      setResume(res.resume);
      setNotice(res.message);
      await refreshHistory();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload resume."
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleAnalyze() {
    if (!resume || analyzing) return;
    setError("");
    setNotice("");
    try {
      setAnalyzing(true);
      const res = await apiRequest<{
        message: string;
        resume: ResumeItem;
      }>(`/api/resume/${resume.id}/analyze`, {
        method: "POST",
        timeoutMs: 90_000,
      });
      setResume(res.resume);
      setNotice(res.message);
      await refreshHistory();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "AI ATS analysis failed."
      );
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleMatchJd(e: React.FormEvent) {
    e.preventDefault();
    if (!resume || matchingJd) return;
    setError("");
    setNotice("");

    if (jdText.trim().length < 30) {
      setError("Please paste at least 30 characters of a job description.");
      return;
    }

    try {
      setMatchingJd(true);
      const res = await apiRequest<{
        message: string;
        jdMatches: JdMatch[];
      }>(`/api/resume/${resume.id}/match-jd`, {
        method: "POST",
        body: {
          targetRole: jdRole.trim() || "Target Role",
          jobDescription: jdText.trim(),
        },
        timeoutMs: 60_000,
      });

      setResume((prev) =>
        prev ? { ...prev, jdMatches: res.jdMatches } : prev
      );
      setNotice(res.message);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Job description matching failed."
      );
    } finally {
      setMatchingJd(false);
    }
  }

  async function handleRewrite(e: React.FormEvent) {
    e.preventDefault();
    if (!resume || rewriting) return;
    setError("");
    setNotice("");

    try {
      setRewriting(true);
      const res = await apiRequest<{
        message: string;
        rewrites: RewriteEntry[];
      }>(`/api/resume/${resume.id}/rewrite`, {
        method: "POST",
        body: { targetRole: rewriteRole.trim() || "Software Engineer" },
        timeoutMs: 90_000,
      });
      setResume((prev) =>
        prev ? { ...prev, rewrites: res.rewrites } : prev
      );
      setNotice(res.message);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate rewrites."
      );
    } finally {
      setRewriting(false);
    }
  }

  async function handleSetActive(id: string) {
    setError("");
    setNotice("");
    try {
      const res = await apiRequest<{ message: string; resume: ResumeItem }>(
        `/api/resume/${id}/active`,
        { method: "PATCH" }
      );
      setResume(res.resume);
      setNotice(res.message);
      await refreshHistory();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not switch active version."
      );
    }
  }

  async function handleDeleteVersion(id: string) {
    setError("");
    setNotice("");
    try {
      await apiRequest(`/api/resume/${id}`, { method: "DELETE" });
      setNotice("Resume version deleted.");
      const hist = await apiRequest<{ resumes: ResumeItem[] }>(
        "/api/resume/history?limit=20"
      );
      const remaining = hist.resumes || [];
      setHistory(remaining);
      if (remaining.length > 0) {
        const activeRes = await apiRequest<{ resume: ResumeItem }>(
          "/api/resume/me"
        );
        setResume(activeRes.resume);
      } else {
        setResume(null);
      }
      setComparison(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete resume version."
      );
    }
  }

  async function handleCompare() {
    if (!compareV1 || !compareV2 || compareV1 === compareV2 || comparing) {
      setError("Select two different resume versions to compare.");
      return;
    }
    setError("");
    try {
      setComparing(true);
      const res = await apiRequest<{ comparison: VersionComparison }>(
        `/api/resume/compare?v1=${compareV1}&v2=${compareV2}`
      );
      setComparison(res.comparison);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to compare versions."
      );
    } finally {
      setComparing(false);
    }
  }

  function copyText(key: string, text: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    }
  }

  const ats = resume?.atsReport;

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-8 text-gray-900">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-800 px-8 py-9 text-white shadow-lg">
          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                📄 First-Class Career Tool
              </span>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
                AI Resume Analyzer & ATS Studio
              </h1>
              <p className="mt-2 text-sm leading-6 text-emerald-50">
                Upload PDF, DOCX, or TXT resumes for ATS scoring, keyword gap
                matching against real job descriptions, STAR bullet rewrites,
                and side-by-side version comparison.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => void handleFileUpload(e.target.files?.[0])}
                className="hidden"
                aria-label="Upload resume file"
              />

              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-teal-800 shadow-md hover:bg-emerald-50 disabled:opacity-60"
              >
                {uploading ? "Processing file..." : "⬆ Upload Resume (PDF / DOCX / TXT)"}
              </button>

              <Link
                href="/dashboard/resume/builder"
                className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/20"
              >
                ✍️ ATS Resume Builder
              </Link>

              {resume && (
                <Link
                  href={`/dashboard/interview?resumeId=${resume.id}`}
                  className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/20"
                >
                  🎤 Practice Interview from Resume →
                </Link>
              )}
            </div>
          </div>
        </section>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700"
          >
            {error}
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800"
          >
            {notice}
          </div>
        )}

        {loading ? (
          <div className="mt-8 space-y-4 animate-pulse">
            <div className="h-28 rounded-2xl bg-gray-200" />
            <div className="h-72 rounded-2xl bg-gray-200" />
          </div>
        ) : !resume ? (
          /* Empty State Upload Dropzone */
          <section className="mt-8 rounded-3xl border-2 border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              📄
            </div>
            <h2 className="mt-4 text-lg font-bold text-gray-900">
              Upload your first resume to begin
            </h2>
            <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-gray-500">
              Supports text-based PDF, DOCX, and TXT files up to 5 MB. We
              validate file signatures, parse your sections and skills
              instantly, and store version history securely.
            </p>
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="mt-6 rounded-full bg-blue-600 px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {uploading ? "Uploading & Parsing..." : "Select Resume File"}
            </button>
          </section>
        ) : (
          <>
            {/* Active Resume Summary Strip */}
            <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                    Active · v{resume.version}
                  </span>
                  <h2 className="text-sm font-bold text-gray-900">
                    {resume.originalName}
                  </h2>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {resume.wordCount} words · {resume.parsed?.skills.length ?? 0}{" "}
                  detected skills · {resume.parsed?.quantifiedBulletCount ?? 0}/
                  {resume.parsed?.bulletCount ?? 0} quantified bullets · Uploaded{" "}
                  {formatDate(resume.uploadedAt)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {ats?.overallScore !== null && ats?.overallScore !== undefined && (
                  <span
                    className={`rounded-full border px-4 py-1.5 text-xs font-extrabold ${scoreColor(
                      ats.overallScore
                    )}`}
                  >
                    ATS Score: {ats.overallScore}/100
                  </span>
                )}

                <button
                  type="button"
                  disabled={analyzing}
                  onClick={() => void handleAnalyze()}
                  className="rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
                >
                  {analyzing
                    ? "Running Deep AI Audit..."
                    : ats?.analyzedAt
                      ? "Re-run AI ATS Audit"
                      : "✨ Run AI Deep ATS Audit"}
                </button>

                {resume.analysis && (
                  <button
                    type="button"
                    onClick={() => {
                      const blob = new Blob([resume.analysis || ""], {
                        type: "text/markdown;charset=utf-8",
                      });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `resume-ats-report-v${resume.version}.md`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    ⬇ Download Report
                  </button>
                )}
              </div>
            </section>

            <p className="mt-3 text-[11px] text-gray-500">
              <strong>Transparency Note:</strong> ATS compatibility scores are
              estimates based on observable resume structure and keyword signals,
              not guaranteed recruiter outcomes. Scanned image-only PDFs require
              text-based exports when OCR is unavailable.
            </p>

            {/* Feature Tabs */}
            <nav
              aria-label="Resume analyzer sections"
              className="mt-6 flex flex-wrap gap-2 border-b border-gray-200 pb-3"
            >
              {(
                [
                  { id: "ats", label: "📊 ATS Quality & Skills" },
                  {
                    id: "jd",
                    label: `🎯 Job Description Matcher (${resume.jdMatches.length})`,
                  },
                  {
                    id: "rewrite",
                    label: `✍️ AI Bullet Rewriter (${resume.rewrites.length})`,
                  },
                  {
                    id: "history",
                    label: `🕘 Version History & Compare (${history.length})`,
                  },
                ] as Array<{ id: ResumeTab; label: string }>
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* TAB 1: ATS QUALITY & PARSED PROFILE */}
            {activeTab === "ats" && (
              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {/* Score Breakdown */}
                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900">
                    ATS Score Breakdown
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {ats?.analyzedAt
                      ? `AI audited on ${formatDate(ats.analyzedAt)}`
                      : "Baseline structural score — run AI Deep Audit for full feedback"}
                  </p>

                  <div className="mt-5 space-y-3.5">
                    {(
                      [
                        ["Formatting", ats?.sectionScores.formatting ?? 0],
                        ["Quantified Impact", ats?.sectionScores.impact ?? 0],
                        ["Keyword Density", ats?.sectionScores.keywords ?? 0],
                        ["Completeness", ats?.sectionScores.completeness ?? 0],
                        ["Clarity", ats?.sectionScores.clarity ?? 0],
                      ] as Array<[string, number]>
                    ).map(([label, val]) => (
                      <div key={label}>
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-gray-700">{label}</span>
                          <span className="font-bold text-gray-900">{val}%</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Extracted Skills */}
                  <div className="mt-6 border-t border-gray-100 pt-5">
                    <h4 className="text-xs font-bold text-gray-800">
                      Detected Skills ({resume.parsed?.skills.length ?? 0})
                    </h4>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {(resume.parsed?.skills || []).length > 0 ? (
                        resume.parsed!.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400">
                          No standard technical skills detected yet.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact & Section Checklist */}
                  <div className="mt-5 border-t border-gray-100 pt-5">
                    <h4 className="text-xs font-bold text-gray-800">
                      Structure Checks
                    </h4>
                    <ul className="mt-2 space-y-1.5 text-xs text-gray-600">
                      <li>
                        {resume.parsed?.contact.hasEmail ? "✅" : "⚠️"} Email
                        address
                      </li>
                      <li>
                        {resume.parsed?.contact.hasPhone ? "✅" : "⚠️"} Phone
                        number
                      </li>
                      <li>
                        {resume.parsed?.contact.hasGithub ? "✅" : "⚠️"} GitHub
                        link
                      </li>
                      <li>
                        {resume.parsed?.contact.hasLinkedin ? "✅" : "⚠️"}{" "}
                        LinkedIn link
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Detailed Audit Findings */}
                <section className="space-y-6 lg:col-span-2">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-green-200 bg-white p-5 shadow-sm">
                      <h3 className="text-sm font-bold text-green-800">
                        Strengths
                      </h3>
                      <ul className="mt-3 space-y-2 text-xs leading-5 text-gray-700">
                        {(ats?.strengths || []).length > 0 ? (
                          ats!.strengths.map((item, i) => (
                            <li key={`${i}-${item}`}>• {item}</li>
                          ))
                        ) : (
                          <li className="text-gray-400">
                            Run AI Deep ATS Audit to see detailed strengths.
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm">
                      <h3 className="text-sm font-bold text-amber-800">
                        Weaknesses & Gaps
                      </h3>
                      <ul className="mt-3 space-y-2 text-xs leading-5 text-gray-700">
                        {(ats?.weaknesses || []).length > 0 ? (
                          ats!.weaknesses.map((item, i) => (
                            <li key={`${i}-${item}`}>• {item}</li>
                          ))
                        ) : (
                          <li className="text-gray-400">
                            No major weaknesses flagged yet.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900">
                      ATS Optimization & Action Plan
                    </h3>
                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-600">
                          ATS Suggestions
                        </h4>
                        <ul className="mt-2 space-y-2 text-xs leading-5 text-gray-700">
                          {(ats?.atsSuggestions || []).map((item, i) => (
                            <li key={`${i}-${item}`}>• {item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-gray-600">
                          Recommended Target Roles
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {(ats?.recommendedRoles || []).length > 0 ? (
                            ats!.recommendedRoles.map((role) => (
                              <span
                                key={role}
                                className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
                              >
                                {role}
                              </span>
                            ))
                          ) : (
                            <p className="text-xs text-gray-400">
                              Run AI Deep ATS Audit for role recommendations.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Evidence-Based Career Domain Recommendations */}
                  <div className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">
                          🎯 Recommended Career Domains Based on Your Resume
                        </h3>
                        <p className="mt-0.5 text-xs text-gray-500">
                          Computed from observable skills and keywords extracted from your uploaded CV.
                        </p>
                      </div>
                      <Link
                        href="/dashboard/roadmap"
                        className="rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-100"
                      >
                        View Skill Gaps & Roadmap →
                      </Link>
                    </div>

                    {(resume.domainRecommendations || []).length > 0 ? (
                      <div className="mt-4 space-y-4">
                        {resume.domainRecommendations!.map((rec, idx) => (
                          <div
                            key={rec.domainId}
                            className={`rounded-xl border p-4 ${
                              idx === 0
                                ? "border-indigo-300 bg-indigo-50/40"
                                : "border-gray-200 bg-gray-50/60"
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                {idx === 0 && (
                                  <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                                    Top Match
                                  </span>
                                )}
                                <h4 className="text-sm font-bold text-gray-900">
                                  {rec.domain}
                                </h4>
                              </div>
                              <span
                                className={`rounded-full border px-3 py-0.5 text-xs font-extrabold ${scoreColor(
                                  rec.matchPercentage
                                )}`}
                              >
                                {rec.matchPercentage}% Compatibility
                              </span>
                            </div>

                            {rec.rationale && (
                              <p className="mt-2 text-xs leading-5 text-gray-700">
                                {rec.rationale}
                              </p>
                            )}

                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              <div>
                                <p className="text-[11px] font-bold text-emerald-800">
                                  Supporting Skills Found ({rec.supportingSkills.length})
                                </p>
                                <div className="mt-1.5 flex flex-wrap gap-1.5">
                                  {rec.supportingSkills.length > 0 ? (
                                    rec.supportingSkills.map((skill) => (
                                      <span
                                        key={skill}
                                        className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800"
                                      >
                                        ✓ {skill}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-[11px] text-gray-400">
                                      No direct core skills detected yet
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div>
                                <p className="text-[11px] font-bold text-amber-800">
                                  Missing Skills to Learn ({rec.missingSkills.length})
                                </p>
                                <div className="mt-1.5 flex flex-wrap gap-1.5">
                                  {rec.missingSkills.length > 0 ? (
                                    rec.missingSkills.slice(0, 6).map((skill) => (
                                      <span
                                        key={skill}
                                        className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800"
                                      >
                                        + {skill}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-[11px] text-emerald-700">
                                      Strong coverage of core topics
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {rec.uncertaintyNote && (
                              <p className="mt-2.5 text-[11px] italic text-gray-500">
                                Note: {rec.uncertaintyNote}
                              </p>
                            )}

                            <div className="mt-3 flex flex-wrap gap-2">
                              <Link
                                href={`/dashboard/interview?domain=${encodeURIComponent(
                                  rec.domainId
                                )}&resumeId=${encodeURIComponent(resume.id)}`}
                                className="rounded-full bg-blue-600 px-4 py-1.5 text-[11px] font-semibold text-white hover:bg-blue-700"
                              >
                                Start 10-Question {rec.domain} Interview →
                              </Link>
                              <Link
                                href="/dashboard/skills"
                                className="rounded-full border border-gray-300 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-gray-700 hover:bg-gray-50"
                              >
                                Inspect Skill Gaps
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-xs text-gray-500">
                        Upload a resume with technical skills or click &quot;Run AI Deep ATS Audit&quot; to generate evidence-based domain compatibility recommendations.
                      </p>
                    )}
                  </div>
                </section>
              </div>
            )}

            {/* TAB 2: JOB DESCRIPTION MATCHER */}
            {activeTab === "jd" && (
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <form
                  onSubmit={handleMatchJd}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-sm font-bold text-gray-900">
                    Match Against a Target Job Description
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Paste any job posting to get keyword coverage, missing
                    skills, and tailored positioning tips.
                  </p>

                  <div className="mt-4">
                    <label
                      htmlFor="jd-role"
                      className="block text-xs font-semibold text-gray-700"
                    >
                      Target Job Title
                    </label>
                    <input
                      id="jd-role"
                      type="text"
                      value={jdRole}
                      onChange={(e) => setJdRole(e.target.value)}
                      placeholder="e.g. Backend Software Engineer"
                      className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="jd-text"
                      className="block text-xs font-semibold text-gray-700"
                    >
                      Job Description
                    </label>
                    <textarea
                      id="jd-text"
                      rows={9}
                      value={jdText}
                      onChange={(e) => setJdText(e.target.value)}
                      placeholder="Paste the full job requirements and responsibilities here..."
                      className="mt-1.5 w-full rounded-xl border border-gray-200 p-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={matchingJd}
                    className="mt-4 rounded-full bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {matchingJd ? "Analyzing Match..." : "Calculate Keyword Match →"}
                  </button>
                </form>

                <section className="space-y-4">
                  {resume.jdMatches.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                      <p className="text-sm font-semibold text-gray-800">
                        No JD matches yet
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Paste a job description on the left to inspect matched
                        and missing keywords.
                      </p>
                    </div>
                  ) : (
                    resume.jdMatches.map((match, idx) => (
                      <article
                        key={match._id || `${idx}-${match.targetRole}`}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">
                              {match.targetRole}
                            </h4>
                            <p className="text-[11px] text-gray-400">
                              {formatDate(match.createdAt)}
                            </p>
                          </div>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-extrabold ${scoreColor(
                              match.matchScore
                            )}`}
                          >
                            {match.matchScore}% Match
                          </span>
                        </div>

                        <div className="mt-4">
                          <p className="text-[11px] font-bold text-green-700">
                            Matched Keywords ({match.matchedKeywords.length})
                          </p>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {match.matchedKeywords.map((kw) => (
                              <span
                                key={kw}
                                className="rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] font-semibold text-green-700"
                              >
                                ✓ {kw}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-[11px] font-bold text-amber-700">
                            Missing Keywords ({match.missingKeywords.length})
                          </p>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {match.missingKeywords.length > 0 ? (
                              match.missingKeywords.map((kw) => (
                                <span
                                  key={kw}
                                  className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800"
                                >
                                  + {kw}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-green-700">
                                All detected JD keywords are covered!
                              </span>
                            )}
                          </div>
                        </div>

                        {match.suggestions.length > 0 && (
                          <ul className="mt-4 space-y-1.5 border-t border-gray-100 pt-3 text-xs leading-5 text-gray-700">
                            {match.suggestions.map((tip, i) => (
                              <li key={`${i}-${tip}`}>• {tip}</li>
                            ))}
                          </ul>
                        )}
                      </article>
                    ))
                  )}
                </section>
              </div>
            )}

            {/* TAB 3: AI REWRITER */}
            {activeTab === "rewrite" && (
              <div className="mt-6 space-y-6">
                <form
                  onSubmit={handleRewrite}
                  className="flex flex-wrap items-end gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="min-w-[240px] flex-1">
                    <label
                      htmlFor="rw-role"
                      className="block text-xs font-semibold text-gray-700"
                    >
                      Tailor Rewrites For Role
                    </label>
                    <input
                      id="rw-role"
                      type="text"
                      value={rewriteRole}
                      onChange={(e) => setRewriteRole(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={rewriting}
                    className="rounded-full bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {rewriting
                      ? "Generating Rewrites..."
                      : "✨ Generate STAR Bullet Rewrites"}
                  </button>
                </form>

                {resume.rewrites.length === 0 ? (
                  <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <p className="text-sm font-semibold text-gray-800">
                      No rewrites generated yet
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Enter your target role above to generate a stronger summary
                      and action-oriented impact bullets without fabricating facts.
                    </p>
                  </div>
                ) : (
                  resume.rewrites.map((rw, rIdx) => (
                    <section
                      key={rw._id || `${rIdx}-${rw.targetRole}`}
                      className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-900">
                          Rewrites for {rw.targetRole}
                        </h3>
                        <span className="text-xs text-gray-400">
                          {formatDate(rw.createdAt)}
                        </span>
                      </div>

                      {rw.summaryRewrite && (
                        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-blue-800">
                              Suggested Professional Summary
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                copyText(`sum-${rIdx}`, rw.summaryRewrite)
                              }
                              className="text-xs font-semibold text-blue-700 underline"
                            >
                              {copiedKey === `sum-${rIdx}` ? "Copied!" : "Copy"}
                            </button>
                          </div>
                          <p className="mt-2 text-xs leading-6 text-gray-800">
                            {rw.summaryRewrite}
                          </p>
                        </div>
                      )}

                      <div className="space-y-3">
                        {rw.bulletRewrites.map((bullet, bIdx) => (
                          <div
                            key={`${rIdx}-${bIdx}`}
                            className="rounded-xl border border-gray-200 p-4"
                          >
                            {bullet.original && (
                              <p className="text-xs text-gray-500 line-through">
                                {bullet.original}
                              </p>
                            )}
                            <div className="mt-2 flex items-start justify-between gap-3">
                              <p className="text-xs font-semibold leading-5 text-gray-900">
                                {bullet.improved}
                              </p>
                              <button
                                type="button"
                                onClick={() =>
                                  copyText(
                                    `bul-${rIdx}-${bIdx}`,
                                    bullet.improved
                                  )
                                }
                                className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-700 hover:bg-gray-200"
                              >
                                {copiedKey === `bul-${rIdx}-${bIdx}`
                                  ? "Copied"
                                  : "Copy"}
                              </button>
                            </div>
                            {bullet.rationale && (
                              <p className="mt-2 text-[11px] text-emerald-700">
                                Why it works: {bullet.rationale}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  ))
                )}
              </div>
            )}

            {/* TAB 4: VERSION HISTORY & COMPARE */}
            {activeTab === "history" && (
              <div className="mt-6 space-y-6">
                {history.length >= 2 && (
                  <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900">
                      Compare Two Resume Versions
                    </h3>
                    <div className="mt-4 flex flex-wrap items-end gap-4">
                      <div className="min-w-[200px] flex-1">
                        <label
                          htmlFor="cmp-v1"
                          className="block text-xs font-semibold text-gray-600"
                        >
                          Earlier Version
                        </label>
                        <select
                          id="cmp-v1"
                          value={compareV1}
                          onChange={(e) => setCompareV1(e.target.value)}
                          className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs"
                        >
                          {history.map((item) => (
                            <option key={item.id} value={item.id}>
                              v{item.version} — {item.originalName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="min-w-[200px] flex-1">
                        <label
                          htmlFor="cmp-v2"
                          className="block text-xs font-semibold text-gray-600"
                        >
                          Newer Version
                        </label>
                        <select
                          id="cmp-v2"
                          value={compareV2}
                          onChange={(e) => setCompareV2(e.target.value)}
                          className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs"
                        >
                          {history.map((item) => (
                            <option key={item.id} value={item.id}>
                              v{item.version} — {item.originalName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        disabled={comparing}
                        onClick={() => void handleCompare()}
                        className="rounded-full bg-gray-900 px-5 py-2 text-xs font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
                      >
                        {comparing ? "Comparing..." : "Compare Versions"}
                      </button>
                    </div>

                    {comparison && (
                      <div className="mt-5 grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:grid-cols-3">
                        <div>
                          <p className="text-[11px] font-semibold text-gray-500">
                            ATS Score Change
                          </p>
                          <p className="mt-1 text-xl font-extrabold text-gray-900">
                            {comparison.deltas.atsScore !== null
                              ? `${comparison.deltas.atsScore >= 0 ? "+" : ""}${comparison.deltas.atsScore} pts`
                              : "N/A"}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            v{comparison.from.version} ({comparison.from.atsScore ?? "—"}) →
                            v{comparison.to.version} ({comparison.to.atsScore ?? "—"})
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold text-gray-500">
                            Added Skills
                          </p>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {comparison.addedSkills.length > 0 ? (
                              comparison.addedSkills.map((s) => (
                                <span
                                  key={s}
                                  className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-800"
                                >
                                  + {s}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400">None</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold text-gray-500">
                            Quantified Bullets Change
                          </p>
                          <p className="mt-1 text-xl font-extrabold text-gray-900">
                            {comparison.deltas.quantifiedBullets >= 0 ? "+" : ""}
                            {comparison.deltas.quantifiedBullets}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            Word count delta: {comparison.deltas.wordCount >= 0 ? "+" : ""}
                            {comparison.deltas.wordCount}
                          </p>
                        </div>
                      </div>
                    )}
                  </section>
                )}

                <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900">
                    All Uploaded Versions ({history.length})
                  </h3>

                  <ul className="mt-4 divide-y divide-gray-100">
                    {history.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-wrap items-center justify-between gap-3 py-3.5"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-bold text-gray-700">
                              v{item.version}
                            </span>
                            <p className="text-sm font-semibold text-gray-900">
                              {item.originalName}
                            </p>
                            {item.isActive && (
                              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-bold text-green-700">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {item.wordCount} words · ATS{" "}
                            {item.atsReport?.overallScore ?? "—"} · Uploaded{" "}
                            {formatDate(item.uploadedAt)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {!item.isActive && (
                            <button
                              type="button"
                              onClick={() => void handleSetActive(item.id)}
                              className="rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                            >
                              Set Active
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => void handleDeleteVersion(item.id)}
                            className="rounded-full border border-red-200 px-3.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default function ResumeAnalyzerPage() {
  return (
    <ProtectedRoute>
      <ResumeAnalyzerWorkspace />
    </ProtectedRoute>
  );
}
