"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/Authcontent";
import "./page.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoggedIn, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const nextPath = searchParams.get("next");
  const safeNext =
    nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//")
      ? nextPath
      : "/dashboard";

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace(safeNext);
    }
  }, [isLoading, isLoggedIn, router, safeNext]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await login(trimmedEmail, password);
      if (safeNext !== "/dashboard") {
        router.replace(safeNext);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in right now. Please try again."
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

      <section className="login-card" aria-labelledby="login-heading">
        <div className="login-logo">
          <span>AI</span>
        </div>

        <div className="login-heading">
          <h1 id="login-heading">Welcome Back</h1>
          <p>Sign in to your AI Mock Interview account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
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
              aria-invalid={Boolean(error)}
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                autoComplete="current-password"
                disabled={loading}
                aria-invalid={Boolean(error)}
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
            {loading ? "Signing in..." : "Login"}
            {!loading && <span aria-hidden="true"> →</span>}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-600">
          <Link
            href="/forgot-password"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Forgot your password?
          </Link>
        </p>

        <p className="mt-2 text-center text-xs text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Create a free account
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[60vh] items-center justify-center bg-gray-50">
          <p className="text-sm text-gray-500">Loading login...</p>
        </main>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
