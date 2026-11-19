import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the AI Mock Interview & Career Intelligence Platform support team.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 text-gray-800">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
        Support
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
        Contact Us
      </h1>
      <p className="mt-3 text-sm leading-6 text-gray-600">
        Have feedback on mock interview questions, resume analysis, or accessibility?
        Reach out using any of the options below.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900">General Support</h2>
          <p className="mt-2 text-xs leading-5 text-gray-600">
            Account questions, bug reports, and feature requests.
          </p>
          <a
            href="mailto:support@mockinterview.ai"
            className="mt-4 inline-block text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            support@mockinterview.ai →
          </a>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900">Privacy & Data Requests</h2>
          <p className="mt-2 text-xs leading-5 text-gray-600">
            Data governance inquiries, export help, or account deletion requests.
          </p>
          <a
            href="mailto:privacy@mockinterview.ai"
            className="mt-4 inline-block text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            privacy@mockinterview.ai →
          </a>
        </div>
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
