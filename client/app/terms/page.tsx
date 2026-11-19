import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and acceptable use guidelines for the AI Mock Interview & Career Intelligence Platform.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 text-gray-800">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
        Legal
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-gray-500">
        Last updated: November 2026
      </p>

      <div className="mt-8 space-y-6 text-sm leading-7 text-gray-700">
        <section>
          <h2 className="text-base font-bold text-gray-900">1. Educational Purpose</h2>
          <p className="mt-2">
            AI Mock Interview provides practice interviews, resume feedback, and career
            preparation tools for educational purposes. Scores and recommendations are AI-assisted
            estimates and do not guarantee hiring outcomes.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900">2. Acceptable Use</h2>
          <p className="mt-2">
            You agree to upload only resumes and content you own or have permission to analyze,
            and not to attempt to abuse API rate limits, bypass authentication, or probe system
            infrastructure.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900">3. Account Security</h2>
          <p className="mt-2">
            You are responsible for maintaining the confidentiality of your account credentials
            and logging out on shared devices.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
