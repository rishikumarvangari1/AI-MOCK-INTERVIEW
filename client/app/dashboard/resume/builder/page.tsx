"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";

type BuilderDraft = {
  title: string;
  template: "classic" | "modern" | "compact";
  contact: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  skills: string[];
  experience: Array<{
    company: string;
    role: string;
    period: string;
    bullets: string[];
  }>;
  projects: Array<{
    name: string;
    tech: string;
    bullets: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    period: string;
  }>;
};

const EMPTY_DRAFT: BuilderDraft = {
  title: "My ATS Resume",
  template: "classic",
  contact: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
  },
  summary: "",
  skills: [],
  experience: [],
  projects: [],
  education: [],
};

function ResumeBuilderWorkspace() {
  const [draft, setDraft] = useState<BuilderDraft>(EMPTY_DRAFT);
  const [skillsCsv, setSkillsCsv] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    apiRequest<{ draft: BuilderDraft }>("/api/resume-builder")
      .then((res) => {
        if (!active) return;
        const loaded = { ...EMPTY_DRAFT, ...res.draft };
        setDraft(loaded);
        setSkillsCsv((loaded.skills || []).join(", "));
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load resume builder draft."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSave() {
    if (saving) return;
    setError("");
    setNotice("");
    const skills = skillsCsv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = { ...draft, skills };
    setDraft(payload);

    try {
      setSaving(true);
      await apiRequest("/api/resume-builder", {
        method: "PUT",
        body: payload,
      });
      setNotice("ATS resume draft saved.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save resume draft."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-6xl h-96 animate-pulse rounded-2xl bg-gray-200" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-8 text-gray-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="no-print flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              ATS Resume Builder & PDF Export
            </p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
              Build & Export ATS-Clean PDF Resume
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/resume"
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Resume Analyzer
            </Link>
            <button
              type="button"
              disabled={saving}
              onClick={() => void handleSave()}
              className="rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full bg-gray-900 px-5 py-2 text-xs font-bold text-white hover:bg-gray-800"
            >
              🖨 Export PDF
            </button>
          </div>
        </div>

        {error && (
          <div role="alert" className="no-print mt-4 rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">
            {error}
          </div>
        )}
        {notice && (
          <div role="status" className="no-print mt-4 rounded-xl bg-green-50 px-4 py-3 text-xs text-green-800">
            {notice}
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Editor Column */}
          <section className="no-print space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={draft.contact.fullName}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    contact: { ...draft.contact, fullName: e.target.value },
                  })
                }
                className="rounded-xl border border-gray-200 px-3 py-2 text-xs"
              />
              <input
                type="email"
                placeholder="Email"
                value={draft.contact.email}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    contact: { ...draft.contact, email: e.target.value },
                  })
                }
                className="rounded-xl border border-gray-200 px-3 py-2 text-xs"
              />
              <input
                type="text"
                placeholder="Phone"
                value={draft.contact.phone}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    contact: { ...draft.contact, phone: e.target.value },
                  })
                }
                className="rounded-xl border border-gray-200 px-3 py-2 text-xs"
              />
              <input
                type="text"
                placeholder="Location"
                value={draft.contact.location}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    contact: { ...draft.contact, location: e.target.value },
                  })
                }
                className="rounded-xl border border-gray-200 px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700">
                Professional Summary
              </label>
              <textarea
                rows={3}
                value={draft.summary}
                onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                placeholder="Concise 2-3 sentence summary highlighting role focus and impact..."
                className="mt-1 w-full rounded-xl border border-gray-200 p-3 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700">
                Technical Skills (comma-separated)
              </label>
              <input
                type="text"
                value={skillsCsv}
                onChange={(e) => setSkillsCsv(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-xs"
              />
            </div>

            {/* Experience Builder */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-gray-700">Experience</h2>
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      experience: [
                        ...draft.experience,
                        { company: "", role: "", period: "", bullets: [""] },
                      ],
                    })
                  }
                  className="text-xs font-semibold text-blue-600"
                >
                  + Add Role
                </button>
              </div>
              <div className="mt-2 space-y-3">
                {draft.experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Role"
                        value={exp.role}
                        onChange={(e) => {
                          const next = [...draft.experience];
                          next[idx] = { ...exp, role: e.target.value };
                          setDraft({ ...draft, experience: next });
                        }}
                        className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const next = [...draft.experience];
                          next[idx] = { ...exp, company: e.target.value };
                          setDraft({ ...draft, experience: next });
                        }}
                        className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="2024 – Present"
                        value={exp.period}
                        onChange={(e) => {
                          const next = [...draft.experience];
                          next[idx] = { ...exp, period: e.target.value };
                          setDraft({ ...draft, experience: next });
                        }}
                        className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="One impact bullet per line..."
                      value={exp.bullets.join("\n")}
                      onChange={(e) => {
                        const next = [...draft.experience];
                        next[idx] = {
                          ...exp,
                          bullets: e.target.value.split("\n"),
                        };
                        setDraft({ ...draft, experience: next });
                      }}
                      className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Builder */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-gray-700">Projects</h2>
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      projects: [
                        ...draft.projects,
                        { name: "", tech: "", bullets: [""] },
                      ],
                    })
                  }
                  className="text-xs font-semibold text-blue-600"
                >
                  + Add Project
                </button>
              </div>
              <div className="mt-2 space-y-3">
                {draft.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-3"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={proj.name}
                        onChange={(e) => {
                          const next = [...draft.projects];
                          next[idx] = { ...proj, name: e.target.value };
                          setDraft({ ...draft, projects: next });
                        }}
                        className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Tech stack"
                        value={proj.tech}
                        onChange={(e) => {
                          const next = [...draft.projects];
                          next[idx] = { ...proj, tech: e.target.value };
                          setDraft({ ...draft, projects: next });
                        }}
                        className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="One bullet per line..."
                      value={proj.bullets.join("\n")}
                      onChange={(e) => {
                        const next = [...draft.projects];
                        next[idx] = {
                          ...proj,
                          bullets: e.target.value.split("\n"),
                        };
                        setDraft({ ...draft, projects: next });
                      }}
                      className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Printable ATS Live Preview */}
          <article className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none">
            <header className="border-b border-gray-300 pb-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                {draft.contact.fullName || "Your Name"}
              </h2>
              <p className="mt-1 text-xs text-gray-600">
                {[
                  draft.contact.email,
                  draft.contact.phone,
                  draft.contact.location,
                ]
                  .filter(Boolean)
                  .join(" · ") || "email@example.com · Location"}
              </p>
            </header>

            {draft.summary && (
              <section className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  Summary
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-gray-700">
                  {draft.summary}
                </p>
              </section>
            )}

            {skillsCsv.trim() && (
              <section className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  Technical Skills
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-gray-700">
                  {skillsCsv}
                </p>
              </section>
            )}

            {draft.experience.length > 0 && (
              <section className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  Experience
                </h3>
                <div className="mt-2 space-y-3">
                  {draft.experience.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-bold text-gray-900">
                        <span>
                          {exp.role} {exp.company ? `— ${exp.company}` : ""}
                        </span>
                        <span className="font-normal text-gray-500">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-gray-700">
                        {exp.bullets.filter(Boolean).map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {draft.projects.length > 0 && (
              <section className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  Projects
                </h3>
                <div className="mt-2 space-y-3">
                  {draft.projects.map((proj, idx) => (
                    <div key={idx}>
                      <p className="text-xs font-bold text-gray-900">
                        {proj.name}{" "}
                        {proj.tech && (
                          <span className="font-normal text-gray-500">
                            ({proj.tech})
                          </span>
                        )}
                      </p>
                      <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-gray-700">
                        {proj.bullets.filter(Boolean).map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}

export default function ResumeBuilderPage() {
  return (
    <ProtectedRoute>
      <ResumeBuilderWorkspace />
    </ProtectedRoute>
  );
}
