"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontent";
import "../login/page.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoggedIn, isLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [isLoading, isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2 || trimmedName.length > 80) {
      setError("Full name must be between 2 and 80 characters.");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6 || password.length > 128) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!consentAccepted) {
      setError("Please accept the Terms of Service and Privacy Policy to continue.");
      return;
    }

    try {
      setLoading(true);
      await register(trimmedName, trimmedEmail, password);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-background-shape shape-one" aria-hidden="true" />
      <div className="login-background-shape shape-two" aria-hidden="true" />
      <div className="login-background-shape shape-three" aria-hidden="true" />

      <section className="login-card" aria-labelledby="register-heading">
        <div className="login-logo">
          <span>AI</span>
        </div>

        <div className="login-heading">
          <h1 id="register-heading">Create Your Account</h1>
          <p>Start practicing interviews & analyzing resumes for free</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="login-form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Rishi Sharma"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              autoComplete="name"
              disabled={loading}
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              autoComplete="email"
              disabled={loading}
              required
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                autoComplete="new-password"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="login-form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
              autoComplete="new-password"
              disabled={loading}
              required
            />
          </div>

          <label className="mb-4 flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-gray-600">
            <input
              type="checkbox"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="font-semibold text-blue-600 underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-semibold text-blue-600 underline">
                Privacy Policy
              </Link>
              , including AI processing of resumes and interview responses.
            </span>
          </label>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-submit-button"
          >
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <span aria-hidden="true"> →</span>}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign in
          </Link>
        </p>

        <div className="login-footer">
          <span>AI MOCK INTERVIEW</span>
          <p>Practice smarter. Interview better.</p>
        </div>
      </section>
    </main>
  );
}
