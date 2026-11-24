"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/Authcontent";

function SettingsWorkspace() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-8 text-gray-900">
      <div className="mx-auto max-w-3xl px-6 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Workspace Configuration
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
            Settings
          </h1>
        </div>

        {/* Appearance */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900">Appearance</h2>
          <p className="mt-1 text-xs text-gray-500">
            Switch between Light and Dark themes across the entire platform.
          </p>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setTheme("light")}
              suppressHydrationWarning
              className={`rounded-xl border px-5 py-3 text-xs font-bold transition ${
                theme === "light"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              ☀️ Light Theme
            </button>

            <button
              type="button"
              onClick={() => setTheme("dark")}
              suppressHydrationWarning
              className={`rounded-xl border px-5 py-3 text-xs font-bold transition ${
                theme === "dark"
                  ? "border-indigo-500 bg-indigo-950 text-indigo-200"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              🌙 Dark Theme
            </button>
          </div>
        </section>

        {/* Account & Security */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900">Account & Security</h2>
          <p className="mt-1 text-xs text-gray-500">
            Signed in as <strong>{user?.email}</strong> ({user?.role || "student"})
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/forgot-password"
              className="rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              🔑 Reset Password
            </Link>
            <Link
              href="/dashboard/profile"
              className="rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              🛡️ Privacy, Consent & Data Export
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              🚪 Sign Out
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsWorkspace />
    </ProtectedRoute>
  );
}
