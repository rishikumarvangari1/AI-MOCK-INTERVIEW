"use client";

import Link from "next/link";
import { useAuth } from "@/context/Authcontent";
import { DOMAINS } from "@/lib/domains";

const FEATURES = [
  {
    icon: "🎤",
    title: "Live 10-Question AI Mock Interview",
    description:
      "Collect-all-10 live interviews across 22 career domains with server-authoritative countdown timer, autosave drafts, review mode, and transparent integrity monitoring.",
    href: "/dashboard/interview",
  },
  {
    icon: "📄",
    title: "AI Resume Analyzer",
    description:
      "Upload PDF, DOCX, or TXT resumes for magic-byte validated extraction, ATS compatibility scoring, STAR bullet rewrites, and version comparison.",
    href: "/dashboard/resume",
  },
  {
    icon: "🎯",
    title: "Resume Domain Matching",
    description:
      "Discover which career domains fit your current skills and projects with transparent compatibility percentages and missing-skill explanations.",
    href: "/dashboard/resume",
  },
  {
    icon: "🧩",
    title: "Skill Gap Analysis",
    description:
      "Categorizes your skills into Strong, Intermediate, Beginner, Missing, and Recommended — separating resume keywords from verified interview mastery.",
    href: "/dashboard/skills",
  },
  {
    icon: "✅",
    title: "50% Semantic AI Answer Evaluation",
    description:
      "Evaluates meaning over exact word matching: 50% Semantic Relevance, 20% Technical Correctness, 15% Completeness, 10% Clarity, and 5% Practical Application.",
    href: "/dashboard/interview",
  },
  {
    icon: "🗺️",
    title: "Personalized Learning Roadmap",
    description:
      "Generate persistent 7, 15, 30, 60, or 90-day preparation plans with daily objectives, coding tasks, mini-projects, and revision checkpoints.",
    href: "/dashboard/roadmap",
  },
  {
    icon: "📊",
    title: "Performance Analytics & Charts",
    description:
      "Track interview score trends, per-question bar graphs, answer-distribution pie charts, resume ATS history, and domain readiness over time.",
    href: "/dashboard/analytics",
  },
  {
    icon: "🤖",
    title: "Context-Aware AI Assistant",
    description:
      "Ask the floating AI Website Assistant anything about scoring, navigation, weak interview topics, or resume improvements anytime.",
    href: "/dashboard",
  },
];

const STEPS = [
  { step: "01", title: "Upload Your Resume", desc: "Upload a PDF, DOCX, or TXT CV to extract skills, projects, and ATS signals." },
  { step: "02", title: "Select Your Career Domain", desc: "Pick from 20 career domains or use your AI-recommended best-fit domain." },
  { step: "03", title: "Complete a 10-Question Interview", desc: "Answer domain-tailored questions via text, voice dictation, or coding editor." },
  { step: "04", title: "Receive Intelligent Evaluation", desc: "Get 0–10 rubric scores, 70% above-average readiness banding, and correct answers." },
  { step: "05", title: "Identify Your Weaknesses", desc: "Review missing concepts, topic breakdowns, and evidence-backed skill gaps." },
  { step: "06", title: "Follow Your Learning Roadmap", desc: "Track 7 to 90-day study milestones, coding tasks, and portfolio mini-projects." },
  { step: "07", title: "Improve Career Readiness", desc: "Compare progress across sessions and tailor applications with Job Matching." },
];

const FAQS = [
  {
    q: "How is my mock interview score calculated?",
    a: "After you submit all 10 answers, each response is evaluated using our weighted AI rubric: Semantic Relevance (50%), Technical Correctness (20%), Completeness (15%), Clarity (10%), and Practical Application (5%). Overall Score = Sum of all 10 question scores / 10 (max 100), with 70% as the default RECOMMENDED readiness threshold.",
  },
  {
    q: "Can I view the correct answers during or after an interview?",
    a: "Reference answers, scores, and AI feedback stay strictly locked during the live session. Immediately after clicking Final Submit Interview, every question displays your answer, weighted score breakdown, correct reference answer, detailed explanation, missing concepts, and improvement tips — saved permanently in Interview History.",
  },
  {
    q: "Does an above-average score guarantee a job offer?",
    a: "No. All interview scores and ATS estimates are AI-based practice assessments designed to guide your preparation, not official employer hiring decisions.",
  },
  {
    q: "What resume formats are supported?",
    a: "PDF, DOCX, and TXT files up to 5 MB with binary signature and MIME validation. Scanned image-only PDFs are clearly flagged if readable text cannot be extracted.",
  },
];

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  const interviewHref = isLoggedIn ? "/dashboard/interview" : "/register";
  const resumeHref = isLoggedIn ? "/dashboard/resume" : "/register";

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-6 py-20 text-white sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-4 py-1.5 text-xs font-semibold text-indigo-200">
              ✨ AI-Powered Career Intelligence & Interview Platform
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              Master Your Interviews with AI Intelligence
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              Practice real-world interviews, receive intelligent feedback,
              identify your skill gaps, and discover the career path that
              matches your abilities.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href={interviewHref}
                className="rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-7 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-95"
              >
                Start Mock Interview →
              </Link>

              <a
                href="#domains"
                className="rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Explore Domains ({DOMAINS.length})
              </a>

              <Link
                href={resumeHref}
                className="rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                📄 Analyze My Resume
              </Link>

              {isLoggedIn && (
                <Link
                  href="/dashboard"
                  className="rounded-full border border-cyan-400/30 px-6 py-3.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/10"
                >
                  Open Dashboard
                </Link>
              )}
            </div>

            {/* Genuine Platform Capabilities (no fabricated user metrics) */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
              <a
                href="#domains"
                className="rounded-xl p-2 transition hover:bg-white/5"
              >
                <p className="text-2xl font-extrabold text-white">
                  {DOMAINS.length}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  Career Domains →
                </p>
              </a>
              <Link
                href={interviewHref}
                className="rounded-xl p-2 transition hover:bg-white/5"
              >
                <p className="text-2xl font-extrabold text-cyan-300">10 Qs</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  Live Rubric Loop →
                </p>
              </Link>
              <Link
                href={isLoggedIn ? "/dashboard/analytics" : "/register"}
                className="rounded-xl p-2 transition hover:bg-white/5"
              >
                <p className="text-2xl font-extrabold text-purple-300">70%</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  Readiness Benchmark →
                </p>
              </Link>
              <Link
                href={isLoggedIn ? "/dashboard/roadmap" : "/register"}
                className="rounded-xl p-2 transition hover:bg-white/5"
              >
                <p className="text-2xl font-extrabold text-emerald-300">
                  7–90d
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  Adaptive Roadmaps →
                </p>
              </Link>
            </div>
          </div>

          {/* Interactive Preview Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-bold text-white">
                    Platform Assessment Capabilities
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Click any step to open
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-300">
                  Live AI Engine
                </span>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <Link
                  href={resumeHref}
                  className="block rounded-xl border border-white/10 bg-slate-900/60 p-3.5 transition hover:border-indigo-400/50 hover:bg-slate-900/80"
                >
                  <p className="font-bold text-indigo-300">
                    1. Resume Intelligence &amp; Domain Match →
                  </p>
                  <p className="mt-1 text-slate-300">
                    Extracts skills, computes ATS estimate &amp; matches top career
                    domains with missing-skill insights.
                  </p>
                </Link>

                <Link
                  href={interviewHref}
                  className="block rounded-xl border border-white/10 bg-slate-900/60 p-3.5 transition hover:border-cyan-400/50 hover:bg-slate-900/80"
                >
                  <p className="font-bold text-cyan-300">
                    2. 10-Question Live Interview + Correct Answers →
                  </p>
                  <p className="mt-1 text-slate-300">
                    Grades every answer on 50% semantic meaning + accuracy and
                    unlocks 8 interactive charts after submission.
                  </p>
                </Link>

                <Link
                  href={isLoggedIn ? "/dashboard/skills" : "/register"}
                  className="block rounded-xl border border-white/10 bg-slate-900/60 p-3.5 transition hover:border-purple-400/50 hover:bg-slate-900/80"
                >
                  <p className="font-bold text-purple-300">
                    3. Skill Gaps, Roadmap &amp; AI Assistant →
                  </p>
                  <p className="mt-1 text-slate-300">
                    Turns real assessment weaknesses into tracked study plans
                    with 24/7 context-aware assistant help.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Complete Career Suite
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Everything you need from resume scan to interview readiness
          </h2>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feat) => (
            <Link
              key={feat.title}
              href={isLoggedIn ? feat.href : "/register"}
              className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
            >
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                  {feat.icon}
                </span>
                <h3 className="mt-4 text-sm font-bold text-gray-900 group-hover:text-indigo-700">
                  {feat.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  {feat.description}
                </p>
              </div>
              <span className="mt-4 text-xs font-semibold text-indigo-600">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 7-STEP HOW IT WORKS */}
      <section className="border-y border-gray-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-600">
            How It Works
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">
            Seven structured steps to measurable career readiness
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
              >
                <span className="text-xs font-extrabold text-indigo-600">
                  STEP {item.step}
                </span>
                <h3 className="mt-2 text-sm font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORTED DOMAINS */}
      <section id="domains" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
              {DOMAINS.length} Supported Career Tracks
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">
              Choose your target domain and start practicing
            </h2>
          </div>
          <Link
            href={interviewHref}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
          >
            Start custom domain interview →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {DOMAINS.map((domain) => (
            <Link
              key={domain.id}
              href={
                isLoggedIn
                  ? `/dashboard/interview?domain=${domain.id}`
                  : "/register"
              }
              className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-xs font-semibold text-gray-800 shadow-xs transition hover:border-indigo-400 hover:text-indigo-700"
            >
              <span aria-hidden="true">{domain.icon}</span>
              <span className="truncate">{domain.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Frequently Asked Questions
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">
            Transparent AI evaluation & resume analysis
          </h2>

          <div className="mt-6 space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
              >
                <summary className="cursor-pointer text-sm font-bold text-gray-900">
                  {faq.q}
                </summary>
                <p className="mt-2.5 text-xs leading-6 text-gray-600">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
