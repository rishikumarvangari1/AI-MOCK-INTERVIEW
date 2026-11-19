import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AI Mock Interview protects and governs your personal data, resumes, and interview sessions.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 text-gray-800">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
        Privacy & Data Governance
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-gray-500">
        Last updated: November 2026
      </p>

      <div className="mt-8 space-y-6 text-sm leading-7 text-gray-700">
        <section>
          <h2 className="text-base font-bold text-gray-900">1. Data We Collect</h2>
          <p className="mt-2">
            We store only the information needed to deliver mock interviews, resume analysis,
            and personalized career guidance: your account profile (name, email, hashed password),
            uploaded resume files/text, interview transcripts, and learning progress.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900">2. How AI Processes Your Data</h2>
          <p className="mt-2">
            When you analyze a resume or complete an interview, relevant text is sent securely
            from our backend server to configured AI providers for evaluation. API keys and
            secrets are never exposed in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900">3. Your Controls</h2>
          <p className="mt-2">
            You can view, export, or delete your resumes, interview history, and account data
            at any time from your profile settings. Optional voice and video interview features
            require explicit device permission and keep video local by default.
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
