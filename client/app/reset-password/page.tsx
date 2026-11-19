"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { apiRequest } from "@/lib/api";
import "../login/page.css";

function ResetPasswordInner() {
  const params = useSearchParams();
  const [token, setToken] = useState(params.get("token") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError("");
    setSuccess("");

    if (!token.trim()) {
      setError("Reset token is required.");
      return;
    }
    if (password.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await apiRequest<{ message: string }>(
        "/api/auth/reset-password",
        {
          method: "POST",
          body: { token: token.trim(), password },
          skipAuth: true,
        }
      );
      setSuccess(res.message);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="reset-heading">
        <div className="login-logo">
          <span>AI</span>
        </div>

        <div className="login-heading">
          <h1 id="reset-heading">Choose New Password</h1>
          <p>Paste your reset token and set a strong new password</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="reset-token">Reset Token</label>
            <input
              id="reset-token"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste reset token"
              disabled={loading}
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="reset-password">New Password</label>
            <input
              id="reset-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              disabled={loading}
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="reset-confirm">Confirm New Password</label>
            <input
              id="reset-confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-xs text-green-800"
            >
              {success}{" "}
              <Link href="/login" className="font-bold text-blue-700 underline">
                Sign in now →
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-submit-button"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[60vh] items-center justify-center bg-gray-50">
          <p className="text-sm text-gray-500">Loading reset form...</p>
        </main>
      }
    >
      <ResetPasswordInner />
    </Suspense>
  );
}
