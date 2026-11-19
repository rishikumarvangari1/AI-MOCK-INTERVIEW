"use client";

import React, { useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import "../login/page.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [devToken, setDevToken] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError("");
    setMessage("");
    setDevToken("");

    if (!email.trim()) {
      setError("Please enter your account email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await apiRequest<{
        message: string;
        devResetToken?: string;
      }>("/api/auth/forgot-password", {
        method: "POST",
        body: { email: email.trim() },
        skipAuth: true,
      });
      setMessage(res.message);
      if (res.devResetToken) setDevToken(res.devResetToken);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to request password reset."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="forgot-heading">
        <div className="login-logo">
          <span>AI</span>
        </div>

        <div className="login-heading">
          <h1 id="forgot-heading">Reset Password</h1>
          <p>Enter your email to generate a secure 30-minute reset token</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="forgot-email">Email Address</label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-xs leading-5 text-green-800"
            >
              <p>{message}</p>
              {devToken && (
                <div className="mt-2 border-t border-green-200 pt-2">
                  <p className="font-semibold">
                    Dev Mode Preview Token (SMTP not configured):
                  </p>
                  <code className="mt-1 block break-all rounded bg-white p-1.5 text-[11px] text-gray-800">
                    {devToken}
                  </code>
                  <Link
                    href={`/reset-password?token=${encodeURIComponent(devToken)}`}
                    className="mt-2 inline-block font-bold text-blue-700 underline"
                  >
                    Continue to Reset Password →
                  </Link>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-submit-button"
          >
            {loading ? "Requesting..." : "Request Reset Link"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-600">
          Remembered your password?{" "}
          <Link href="/login" className="font-semibold text-blue-600">
            Back to login
          </Link>
        </p>
      </section>
    </main>
  );
}
