"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/Authcontent";

type ProfileData = {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  profile: {
    headline: string;
    bio: string;
    experienceLevel: "student" | "entry" | "mid" | "senior" | "lead";
    targetRoles: string[];
    skills: string[];
    education: string;
    location: string;
    linkedinUrl: string;
    githubUrl: string;
    portfolioUrl: string;
  };
  preferences: {
    emailReminders: boolean;
    reminderCadence: "daily" | "weekly" | "none";
    voiceInterviewsEnabled: boolean;
    videoInterviewsEnabled: boolean;
  };
  consent: {
    aiProcessingAccepted: boolean;
    aiProcessingAcceptedAt: string | null;
    localMediaOnly: boolean;
    analyticsOptIn: boolean;
  };
};

type Completeness = {
  percent: number;
  missing: string[];
};

function ProfileWorkspace() {
  const { logout, refreshUser } = useAuth();
  const [data, setData] = useState<ProfileData | null>(null);
  const [completeness, setCompleteness] = useState<Completeness>({
    percent: 0,
    missing: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Editable form states
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState<ProfileData["profile"]["experienceLevel"]>("student");
  const [targetRolesText, setTargetRolesText] = useState("");
  const [skillsText, setSkillsText] = useState("");
  const [education, setEducation] = useState("");
  const [location, setLocation] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");

  const [emailReminders, setEmailReminders] = useState(true);
  const [reminderCadence, setReminderCadence] =
    useState<ProfileData["preferences"]["reminderCadence"]>("weekly");
  const [voiceInterviewsEnabled, setVoiceInterviewsEnabled] = useState(true);
  const [videoInterviewsEnabled, setVideoInterviewsEnabled] = useState(false);

  const [aiProcessingAccepted, setAiProcessingAccepted] = useState(true);
  const [localMediaOnly, setLocalMediaOnly] = useState(true);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);

  const hydrateForm = useCallback((user: ProfileData) => {
    setData(user);
    setName(user.name);
    setHeadline(user.profile.headline);
    setBio(user.profile.bio);
    setExperienceLevel(user.profile.experienceLevel);
    setTargetRolesText(user.profile.targetRoles.join(", "));
    setSkillsText(user.profile.skills.join(", "));
    setEducation(user.profile.education);
    setLocation(user.profile.location);
    setLinkedinUrl(user.profile.linkedinUrl);
    setGithubUrl(user.profile.githubUrl);
    setPortfolioUrl(user.profile.portfolioUrl);

    setEmailReminders(user.preferences.emailReminders);
    setReminderCadence(user.preferences.reminderCadence);
    setVoiceInterviewsEnabled(user.preferences.voiceInterviewsEnabled);
    setVideoInterviewsEnabled(user.preferences.videoInterviewsEnabled);

    setAiProcessingAccepted(user.consent.aiProcessingAccepted);
    setLocalMediaOnly(user.consent.localMediaOnly);
    setAnalyticsOptIn(user.consent.analyticsOptIn);
  }, []);

  useEffect(() => {
    let active = true;
    apiRequest<{
      user: ProfileData;
      completeness: Completeness;
    }>("/api/profile")
      .then((res) => {
        if (!active) return;
        hydrateForm(res.user);
        setCompleteness(res.completeness);
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err instanceof Error ? err.message : "Unable to load your profile."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [hydrateForm]);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setError("");
    setStatusMessage("");

    const splitCsv = (val: string) =>
      val
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    try {
      setSaving(true);
      const res = await apiRequest<{
        user: ProfileData;
        completeness: Completeness;
      }>("/api/profile", {
        method: "PATCH",
        body: {
          name: name.trim(),
          profile: {
            headline: headline.trim(),
            bio: bio.trim(),
            experienceLevel,
            targetRoles: splitCsv(targetRolesText),
            skills: splitCsv(skillsText),
            education: education.trim(),
            location: location.trim(),
            linkedinUrl: linkedinUrl.trim(),
            githubUrl: githubUrl.trim(),
            portfolioUrl: portfolioUrl.trim(),
          },
          preferences: {
            emailReminders,
            reminderCadence,
            voiceInterviewsEnabled,
            videoInterviewsEnabled,
          },
        },
      });
      hydrateForm(res.user);
      setCompleteness(res.completeness);
      await refreshUser();
      setStatusMessage("Profile and preferences saved.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save profile changes."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveConsent() {
    setError("");
    setStatusMessage("");
    try {
      setSaving(true);
      await apiRequest("/api/profile/consent", {
        method: "PATCH",
        body: {
          aiProcessingAccepted,
          localMediaOnly,
          analyticsOptIn,
        },
      });
      setStatusMessage("Privacy and consent settings saved.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save consent settings."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleExportData() {
    setExporting(true);
    setError("");
    try {
      const bundle = await apiRequest<Record<string, unknown>>(
        "/api/profile/export"
      );
      const blob = new Blob([JSON.stringify(bundle, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `mockinterview-data-${new Date().toISOString().slice(0, 10)}.json`;
      anchor.click();
      URL.revokeObjectURL(url);
      setStatusMessage("Your personal data archive has been downloaded.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to export your data."
      );
    } finally {
      setExporting(false);
    }
  }

  async function handleDeleteAccount() {
    if (deleteConfirm !== "DELETE" || deleting) return;
    setDeleting(true);
    setError("");
    try {
      await apiRequest("/api/profile", {
        method: "DELETE",
        body: { confirmText: "DELETE" },
      });
      logout();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete your account."
      );
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-4xl space-y-6 animate-pulse">
          <div className="h-24 rounded-2xl bg-gray-200" />
          <div className="h-80 rounded-2xl bg-gray-200" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-8 text-gray-900">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Account & Career Identity
            </p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
              Profile & Preferences
            </h1>
          </div>

          <Link
            href="/dashboard"
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            ← Back to dashboard
          </Link>
        </div>

        {/* Completeness Bar */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-gray-700">Profile Completeness</span>
            <span className="text-blue-600">{completeness.percent}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${completeness.percent}%` }}
            />
          </div>
          {completeness.missing.length > 0 && (
            <p className="mt-2 text-xs text-gray-500">
              Next up: {completeness.missing.slice(0, 3).join(" · ")}
            </p>
          )}
        </section>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700"
          >
            {error}
          </div>
        )}

        {statusMessage && (
          <div
            role="status"
            className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-xs font-medium text-green-800"
          >
            {statusMessage}
          </div>
        )}

        {/* Career Profile & Preferences Form */}
        <form
          onSubmit={handleSaveProfile}
          className="mt-6 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div>
            <h2 className="text-base font-bold text-gray-900">Career Profile</h2>
            <p className="mt-1 text-xs text-gray-500">
              Used to tailor mock interviews, resume feedback, and career roadmaps.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="prof-name" className="block text-xs font-semibold text-gray-700">
                Full Name
              </label>
              <input
                id="prof-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="prof-email" className="block text-xs font-semibold text-gray-700">
                Email (read-only)
              </label>
              <input
                id="prof-email"
                type="email"
                value={data?.email || ""}
                disabled
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="prof-headline" className="block text-xs font-semibold text-gray-700">
                Headline
              </label>
              <input
                id="prof-headline"
                type="text"
                maxLength={140}
                placeholder="e.g. Final-year CS student targeting Full Stack roles"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="prof-level" className="block text-xs font-semibold text-gray-700">
                Experience Level
              </label>
              <select
                id="prof-level"
                value={experienceLevel}
                onChange={(e) =>
                  setExperienceLevel(
                    e.target.value as ProfileData["profile"]["experienceLevel"]
                  )
                }
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="student">Student / Intern</option>
                <option value="entry">Entry-Level (0–2 yrs)</option>
                <option value="mid">Mid-Level (2–5 yrs)</option>
                <option value="senior">Senior (5+ yrs)</option>
                <option value="lead">Staff / Lead</option>
              </select>
            </div>

            <div>
              <label htmlFor="prof-roles" className="block text-xs font-semibold text-gray-700">
                Target Roles (comma-separated)
              </label>
              <input
                id="prof-roles"
                type="text"
                placeholder="Full Stack Developer, Backend Engineer"
                value={targetRolesText}
                onChange={(e) => setTargetRolesText(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="prof-skills" className="block text-xs font-semibold text-gray-700">
                Core Skills (comma-separated)
              </label>
              <input
                id="prof-skills"
                type="text"
                placeholder="TypeScript, React, Node.js, MongoDB, SQL"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="prof-education" className="block text-xs font-semibold text-gray-700">
                Education
              </label>
              <input
                id="prof-education"
                type="text"
                maxLength={200}
                placeholder="B.Tech Computer Science, 2026"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="prof-location" className="block text-xs font-semibold text-gray-700">
                Location
              </label>
              <input
                id="prof-location"
                type="text"
                maxLength={120}
                placeholder="Bengaluru / Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="prof-bio" className="block text-xs font-semibold text-gray-700">
              Career Summary / Bio
            </label>
            <textarea
              id="prof-bio"
              rows={3}
              maxLength={600}
              placeholder="Briefly describe your projects, strengths, and career goals..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-gray-200 p-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="prof-github" className="block text-xs font-semibold text-gray-700">
                GitHub URL
              </label>
              <input
                id="prof-github"
                type="url"
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="prof-linkedin" className="block text-xs font-semibold text-gray-700">
                LinkedIn URL
              </label>
              <input
                id="prof-linkedin"
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="prof-portfolio" className="block text-xs font-semibold text-gray-700">
                Portfolio URL
              </label>
              <input
                id="prof-portfolio"
                type="url"
                placeholder="https://yourportfolio.dev"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-base font-bold text-gray-900">Interview & Reminder Preferences</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-3.5 text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={voiceInterviewsEnabled}
                  onChange={(e) => setVoiceInterviewsEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <span>Enable voice dictation in mock interviews</span>
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-3.5 text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={videoInterviewsEnabled}
                  onChange={(e) => setVideoInterviewsEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <span>Enable optional local camera self-view</span>
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-3.5 text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={emailReminders}
                  onChange={(e) => setEmailReminders(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
                <span>Receive practice reminders</span>
              </label>

              <div>
                <label htmlFor="prof-cadence" className="block text-xs font-semibold text-gray-700">
                  Reminder Cadence
                </label>
                <select
                  id="prof-cadence"
                  value={reminderCadence}
                  onChange={(e) =>
                    setReminderCadence(
                      e.target.value as ProfileData["preferences"]["reminderCadence"]
                    )
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="none">Paused</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Profile & Preferences"}
            </button>
          </div>
        </form>

        {/* Privacy, Consent & Data Governance */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">
            Privacy, Consent & Data Governance
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Control how your resumes, audio/video, and interview history are processed.
          </p>

          <div className="mt-4 space-y-3">
            <label className="flex items-start gap-3 text-xs text-gray-700">
              <input
                type="checkbox"
                checked={aiProcessingAccepted}
                onChange={(e) => setAiProcessingAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span>Allow server-side AI evaluation of my uploaded resumes and mock interview answers.</span>
            </label>

            <label className="flex items-start gap-3 text-xs text-gray-700">
              <input
                type="checkbox"
                checked={localMediaOnly}
                onChange={(e) => setLocalMediaOnly(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span>Keep camera/video feeds strictly local in my browser (never upload video recordings).</span>
            </label>

            <label className="flex items-start gap-3 text-xs text-gray-700">
              <input
                type="checkbox"
                checked={analyticsOptIn}
                onChange={(e) => setAnalyticsOptIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span>Opt in to anonymized platform quality telemetry.</span>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void handleSaveConsent()}
              disabled={saving}
              className="rounded-full bg-gray-900 px-5 py-2 text-xs font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
            >
              Save Privacy Preferences
            </button>

            <button
              type="button"
              onClick={() => void handleExportData()}
              disabled={exporting}
              className="rounded-full border border-gray-300 bg-white px-5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            >
              {exporting ? "Exporting..." : "Export My Data (JSON)"}
            </button>
          </div>

          <div className="mt-8 rounded-xl border border-red-200 bg-red-50/70 p-4">
            <h3 className="text-xs font-bold text-red-800">Danger Zone — Delete Account</h3>
            <p className="mt-1 text-xs text-red-700">
              Permanently deletes your account, all mock interviews, and all uploaded resumes.
              Type <strong>DELETE</strong> to confirm.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder='Type "DELETE"'
                aria-label="Type DELETE to confirm account deletion"
                className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs outline-none focus:border-red-400"
              />
              <button
                type="button"
                disabled={deleteConfirm !== "DELETE" || deleting}
                onClick={() => void handleDeleteAccount()}
                className="rounded-full bg-red-600 px-5 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Account Permanently"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileWorkspace />
    </ProtectedRoute>
  );
}
