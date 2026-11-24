"use client";

import Link from "next/link";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Radar } from "react-chartjs-2";

type TopicStatus = "strong" | "average" | "weak";
type FitKey = "excellent" | "good" | "moderate" | "needs-improvement";
type Verdict = "correct" | "partial" | "incorrect";

type SkillGapItem = {
  topic: string;
  currentUnderstanding: number;
  requiredUnderstanding: number;
  gapPercentage: number;
  priority: "HIGH" | "MEDIUM" | "LOW";
  explanation: string;
  recommendedResources: string[];
};

type AlternativeDomainItem = {
  domainId: string;
  domain: string;
  suitabilityScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  whyRecommended: string;
  whatToLearnNext: string[];
  suggestedNextInterviewDomainId?: string;
  disclaimer?: string;
};

type FiveLevelRoadmapItem = {
  level: number;
  levelLabel: string;
  topic: string;
  explanation: string;
  learningObjective: string;
  duration: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  recommendedPractice: string[];
  practicalProject: string;
  resources?: string[];
  status?: string;
};

type LegacyRoadmapItem = {
  topic: string;
  priority: number;
  duration?: string;
  why: string;
  concepts: string[];
  exercises: string[];
  miniProject?: string;
  resources: string[];
};

type IntegritySummary = {
  tabSwitches: number;
  focusLosses: number;
  fullscreenExits: number;
  pasteAttempts: number;
  copyAttempts: number;
  totalEvents: number;
  riskLevel: "LOW RISK" | "MODERATE RISK" | "HIGH RISK";
  note?: string;
  events?: Array<{ type: string; detail?: string; timestamp?: string }>;
};

type InterviewQuestion = {
  id: number;
  text: string;
  topic: string;
  level: string;
  referenceAnswer?: string;
};

type QuestionEvaluation = {
  questionId: number;
  classification?: string;
  verdict: Verdict;
  score: number;
  maxScore: number;
  finalScore?: number;
  semanticRelevance?: number;
  technicalCorrectness?: number;
  completeness?: number;
  clarity?: number;
  practicalApplication?: number;
  expectedAnswer: string;
  keyConcepts: string[];
  missingConcepts?: string[];
  mistakes?: string[];
  correctnessAnalysis: string;
  didWell: string;
  improve: string;
  suggestedAnswer: string;
};

type InterviewReport = {
  totalScore: number;
  maxScore: number;
  overallScore?: number;
  percentage: number;
  averageSemanticMatch?: number;
  performanceBand?: string;
  readiness?: string;
  selectionDecision?: "RECOMMENDED" | "NEEDS IMPROVEMENT";
  isAboveAverage?: boolean;
  aboveAverageThreshold?: number;
  performanceBreakdown?: {
    technicalKnowledge: number;
    conceptualUnderstanding: number;
    problemSolving: number;
    practicalKnowledge: number;
    communicationClarity: number;
    answerRelevance: number;
  };
  fit: {
    key: FitKey;
    label: string;
    description: string;
  };
  correct: number;
  partial: number;
  incorrect: number;
  strengths: string[];
  weaknesses: string[];
  overallFeedback: string;
  technicalLevel: string;
  careerReadiness: string;
  topics: Array<{
    topic: string;
    percent: number;
    status: TopicStatus;
  }>;
  skillGaps?: SkillGapItem[];
  alternativeDomains?: AlternativeDomainItem[];
  learningRoadmap?: FiveLevelRoadmapItem[];
  integritySummary?: IntegritySummary;
  roadmap: LegacyRoadmapItem[];
  recommendations: string[];
  disclaimer: string;
};

type PublicInterview = {
  domainId?: string;
  domainTitle: string;
  duration?: number;
  questionsAnswered?: number;
  report: InterviewReport | null;
  evaluations?: QuestionEvaluation[];
  questions: InterviewQuestion[];
  answers: string[];
  integritySummary?: IntegritySummary;
};

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

const COLOR = {
  indigo: "#4f46e5",
  cyan: "#0891b2",
  green: "#16a34a",
  blue: "#2563eb",
  amber: "#f59e0b",
  red: "#dc2626",
  track: "#e5e7eb",
};

const FIT_STYLE: Record<FitKey, { color: string; badge: string }> = {
  excellent: { color: COLOR.green, badge: "bg-green-100 text-green-800" },
  good: { color: COLOR.blue, badge: "bg-blue-100 text-blue-800" },
  moderate: { color: COLOR.amber, badge: "bg-amber-100 text-amber-800" },
  "needs-improvement": { color: COLOR.red, badge: "bg-red-100 text-red-800" },
};

const STATUS_COLOR: Record<TopicStatus, string> = {
  strong: COLOR.green,
  average: COLOR.amber,
  weak: COLOR.red,
};

const VERDICT_COLOR: Record<Verdict, string> = {
  correct: COLOR.green,
  partial: COLOR.amber,
  incorrect: COLOR.red,
};

const VERDICT_BADGE: Record<Verdict, string> = {
  correct: "bg-green-100 text-green-800",
  partial: "bg-amber-100 text-amber-800",
  incorrect: "bg-red-100 text-red-800",
};

const PRIORITY_BADGE: Record<string, string> = {
  HIGH: "bg-red-100 text-red-800 border-red-200",
  MEDIUM: "bg-amber-100 text-amber-800 border-amber-200",
  LOW: "bg-blue-100 text-blue-800 border-blue-200",
};

const RISK_BADGE: Record<string, string> = {
  "LOW RISK": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "MODERATE RISK": "bg-amber-100 text-amber-800 border-amber-200",
  "HIGH RISK": "bg-red-100 text-red-800 border-red-200",
};

function formatDuration(seconds?: number) {
  if (!seconds || seconds < 1) return "—";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

function Section({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`avoid-break rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="avoid-break rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-gray-900">
        {value}
      </p>
      {hint && <p className="mt-1 text-[11px] text-gray-500">{hint}</p>}
    </div>
  );
}

function BulletList({ items, empty }: { items: string[]; empty: string }) {
  if (!items.length) return <p className="text-xs text-gray-400">{empty}</p>;
  return (
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li
          key={`${idx}-${item}`}
          className="flex gap-2 text-xs leading-5 text-gray-700"
        >
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ResultsDashboard({
  interview,
  onRetake,
}: {
  interview: PublicInterview;
  onRetake: () => void;
}) {
  const report = interview.report;
  const evaluations: QuestionEvaluation[] = interview.evaluations ?? [];

  if (!report || !interview.evaluations) return null;

  const overallScore100 = Number.isFinite(Number(report.overallScore))
    ? Number(report.overallScore)
    : Number(report.percentage || 0);
  const aboveAverageThreshold = report.aboveAverageThreshold ?? 70;
  const isAboveAverage =
    typeof report.isAboveAverage === "boolean"
      ? report.isAboveAverage
      : overallScore100 >= aboveAverageThreshold;
  const selectionDecision =
    report.selectionDecision ||
    (isAboveAverage ? "RECOMMENDED" : "NEEDS IMPROVEMENT");
  const performanceBand = report.performanceBand || report.fit.label;
  const readinessLabel = report.readiness || report.fit.label;
  const avgSemantic =
    report.averageSemanticMatch ??
    Math.round(
      evaluations.reduce(
        (sum, e) =>
          sum +
          (Number.isFinite(Number(e.semanticRelevance))
            ? Number(e.semanticRelevance)
            : Math.round(((e.score || 0) / Math.max(1, e.maxScore || 10)) * 100)),
        0
      ) / Math.max(1, evaluations.length)
    );

  const breakdown = report.performanceBreakdown || {
    technicalKnowledge: Math.round(overallScore100),
    conceptualUnderstanding: avgSemantic,
    problemSolving: Math.round(overallScore100),
    practicalKnowledge: Math.round(overallScore100),
    communicationClarity: Math.round(overallScore100),
    answerRelevance: avgSemantic,
  };

  const topicSummaries = report.topics || [];
  const strong = topicSummaries.filter((t) => t.status === "strong");
  const average = topicSummaries.filter((t) => t.status === "average");
  const weak = topicSummaries.filter((t) => t.status === "weak");

  const integrity = report.integritySummary || interview.integritySummary;
  const skillGaps = report.skillGaps || [];
  const alternativeDomains = report.alternativeDomains || [];
  const fiveLevelRoadmap = report.learningRoadmap || [];

  const fitStyle = FIT_STYLE[report.fit.key] || FIT_STYLE.moderate;

  const qScores100 = evaluations.map((e) =>
    Number.isFinite(Number(e.finalScore))
      ? Number(e.finalScore)
      : Math.round(((e.score || 0) / Math.max(1, e.maxScore || 10)) * 100)
  );
  const qSemantic100 = evaluations.map((e, i) =>
    Number.isFinite(Number(e.semanticRelevance))
      ? Number(e.semanticRelevance)
      : qScores100[i]
  );

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false as const,
  };

  const legendBottom = {
    legend: { position: "bottom" as const, labels: { boxWidth: 12 } },
  };

  return (
    <main className="min-h-screen bg-slate-50 text-gray-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-8">
        {/* HERO REPORT BANNER */}
        <section className="avoid-break relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-700 px-8 py-9 shadow-lg">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
                AI Mock Interview Assessment · {interview.domainTitle}
              </p>

              <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-white">
                {overallScore100.toFixed(1)}
                <span className="text-2xl font-semibold text-blue-100">
                  /100
                </span>
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-block rounded-full px-4 py-1.5 text-xs font-extrabold tracking-wide ${
                    selectionDecision === "RECOMMENDED"
                      ? "bg-emerald-400 text-emerald-950"
                      : "bg-amber-300 text-amber-950"
                  }`}
                >
                  {selectionDecision === "RECOMMENDED"
                    ? "✓ RECOMMENDED"
                    : "⚠ NEEDS IMPROVEMENT"}
                </span>
                <span className="inline-block rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white">
                  Level: {performanceBand}
                </span>
                <span className="inline-block rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white">
                  {readinessLabel}
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-xs leading-5 text-blue-100">
                {report.careerReadiness}
              </p>
            </div>

            <div className="no-print flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={onRetake}
                className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-indigo-700 shadow-md hover:bg-indigo-50 dark:bg-white dark:text-indigo-700 dark:hover:bg-slate-100"
              >
                Retake Interview
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full border border-white/40 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
              >
                Save PDF Report
              </button>

              <Link
                href="/dashboard/history"
                className="rounded-full border border-white/40 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
              >
                Compare Attempts
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 10A: OVERALL PERFORMANCE KPI STRIP */}
        <section className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-4 lg:grid-cols-8">
          <StatCard
            label="Overall Score"
            value={`${overallScore100.toFixed(0)}%`}
            hint="Max 100"
          />
          <StatCard
            label="Semantic Match"
            value={`${avgSemantic}%`}
            hint="50% weight"
          />
          <StatCard
            label="Questions"
            value={`${evaluations.length}`}
            hint="Evaluated"
          />
          <StatCard
            label="Correct"
            value={String(report.correct)}
            hint="70–100%"
          />
          <StatCard
            label="Partial"
            value={String(report.partial)}
            hint="40–69%"
          />
          <StatCard
            label="Incorrect"
            value={String(report.incorrect)}
            hint="0–39%"
          />
          <StatCard
            label="Duration"
            value={formatDuration(interview.duration)}
            hint="Session time"
          />
          <StatCard
            label="Threshold"
            value={`${aboveAverageThreshold}%`}
            hint={isAboveAverage ? "Above Avg" : "Below Avg"}
          />
        </section>

        {/* SECTION 10D: 6-DIMENSION PERFORMANCE BREAKDOWN */}
        <Section
          className="mt-6"
          title="6-Dimension Performance Breakdown"
          subtitle="Weighted evaluation across semantic understanding, technical accuracy, completeness, clarity, and practical depth"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Technical Knowledge", value: breakdown.technicalKnowledge },
              { label: "Conceptual Understanding", value: breakdown.conceptualUnderstanding },
              { label: "Problem-Solving", value: breakdown.problemSolving },
              { label: "Practical Knowledge", value: breakdown.practicalKnowledge },
              { label: "Communication Clarity", value: breakdown.communicationClarity },
              { label: "Answer Relevance (Semantic)", value: breakdown.answerRelevance },
            ].map((dim) => (
              <div
                key={dim.label}
                className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5"
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-700">{dim.label}</span>
                  <span className="text-indigo-700">{dim.value}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500"
                    style={{ width: `${Math.min(100, Math.max(0, dim.value))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* SECTION 10B: ALL 8 INTERACTIVE REAL-DATA CHARTS */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Chart 1: Overall Performance Donut */}
          <Section
            title="1. Overall Performance Breakdown"
            subtitle="Distribution of Correct, Partially Correct, and Incorrect answers"
          >
            <div className="relative h-64">
              <Doughnut
                data={{
                  labels: ["Correct (70-100%)", "Partial (40-69%)", "Incorrect (0-39%)"],
                  datasets: [
                    {
                      data: [report.correct, report.partial, report.incorrect],
                      backgroundColor: [COLOR.green, COLOR.amber, COLOR.red],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{ ...baseOptions, cutout: "64%", plugins: legendBottom }}
              />
            </div>
          </Section>

          {/* Chart 2: Domain Readiness Gauge */}
          <Section
            title="2. Domain Readiness Gauge"
            subtitle={`AI-estimated readiness for ${interview.domainTitle} (threshold: ${aboveAverageThreshold}%)`}
          >
            <div className="relative h-64">
              <Doughnut
                data={{
                  labels: ["Readiness", "Remaining"],
                  datasets: [
                    {
                      data: [overallScore100, Math.max(0, 100 - overallScore100)],
                      backgroundColor: [fitStyle.color, COLOR.track],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  ...baseOptions,
                  rotation: -90,
                  circumference: 180,
                  cutout: "72%",
                  plugins: { legend: { display: false } },
                }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-10 text-center">
                <p className="text-3xl font-extrabold text-gray-900">
                  {overallScore100.toFixed(1)}%
                </p>
                <p className="text-xs font-bold text-gray-600">
                  {selectionDecision}
                </p>
              </div>
            </div>
          </Section>

          {/* Chart 3: Question-Wise Score Bar Graph */}
          <Section
            title="3. Question-Wise Score Bar Graph"
            subtitle="Weighted final score (0–100%) per question"
          >
            <div className="relative h-64">
              <Bar
                data={{
                  labels: evaluations.map((e) => `Q${e.questionId}`),
                  datasets: [
                    {
                      label: "Final Score (%)",
                      data: qScores100,
                      backgroundColor: evaluations.map((e) => VERDICT_COLOR[e.verdict]),
                      borderRadius: 6,
                    },
                  ],
                }}
                options={{
                  ...baseOptions,
                  scales: {
                    y: {
                      min: 0,
                      max: 100,
                      ticks: { callback: (v) => `${v}%` },
                    },
                  },
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          </Section>

          {/* Chart 4: Semantic Matching vs Final Score */}
          <Section
            title="4. Semantic Matching Chart (50% Component)"
            subtitle="Compares Semantic Relevance (%) vs Weighted Final Score (%) per question"
          >
            <div className="relative h-64">
              <Bar
                data={{
                  labels: evaluations.map((e) => `Q${e.questionId}`),
                  datasets: [
                    {
                      label: "Semantic Match (%)",
                      data: qSemantic100,
                      backgroundColor: COLOR.indigo,
                      borderRadius: 5,
                    },
                    {
                      label: "Final Score (%)",
                      data: qScores100,
                      backgroundColor: COLOR.cyan,
                      borderRadius: 5,
                    },
                  ],
                }}
                options={{
                  ...baseOptions,
                  scales: {
                    y: {
                      min: 0,
                      max: 100,
                      ticks: { callback: (v) => `${v}%` },
                    },
                  },
                  plugins: legendBottom,
                }}
              />
            </div>
          </Section>

          {/* Chart 5: Technical Knowledge Radar */}
          <Section
            title="5. Technical Knowledge & Competency Profile"
            subtitle="6-dimension competency map derived from all evaluated answers"
          >
            <div className="relative h-72">
              <Radar
                data={{
                  labels: [
                    "Technical",
                    "Conceptual",
                    "Problem-Solving",
                    "Practical",
                    "Clarity",
                    "Semantic",
                  ],
                  datasets: [
                    {
                      label: "Your Profile (%)",
                      data: [
                        breakdown.technicalKnowledge,
                        breakdown.conceptualUnderstanding,
                        breakdown.problemSolving,
                        breakdown.practicalKnowledge,
                        breakdown.communicationClarity,
                        breakdown.answerRelevance,
                      ],
                      backgroundColor: "rgba(79, 70, 229, 0.2)",
                      borderColor: COLOR.indigo,
                      borderWidth: 2,
                      pointBackgroundColor: COLOR.indigo,
                    },
                  ],
                }}
                options={{
                  ...baseOptions,
                  scales: {
                    r: {
                      min: 0,
                      max: 100,
                      ticks: { stepSize: 25 },
                    },
                  },
                  plugins: legendBottom,
                }}
              />
            </div>
          </Section>

          {/* Chart 6: Skills Strength & Performance Distribution */}
          <Section
            title="6. Skills Strength & Topic Distribution"
            subtitle="Topics grouped as Strong (≥70%), Developing (45–69%), or Weak (<45%)"
          >
            <div className="relative h-72">
              {topicSummaries.length > 0 ? (
                <Doughnut
                  data={{
                    labels: [
                      `Strong (${strong.length})`,
                      `Developing (${average.length})`,
                      `Weak (${weak.length})`,
                    ],
                    datasets: [
                      {
                        data: [strong.length, average.length, weak.length],
                        backgroundColor: [COLOR.green, COLOR.amber, COLOR.red],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{ ...baseOptions, plugins: legendBottom }}
                />
              ) : (
                <p className="flex h-full items-center justify-center text-xs text-gray-400">
                  No topic distribution available for this session.
                </p>
              )}
            </div>
          </Section>

          {/* Chart 7: Topic-Wise Performance Bar Chart */}
          <Section
            title="7. Topic-Wise Performance Chart"
            subtitle="Average accuracy per topic covered in your interview (red = priority gap)"
            className="lg:col-span-2"
          >
            <div
              className="relative"
              style={{ height: Math.max(220, topicSummaries.length * 42) }}
            >
              <Bar
                data={{
                  labels: topicSummaries.map((t) => t.topic),
                  datasets: [
                    {
                      label: "Topic Score (%)",
                      data: topicSummaries.map((t) => t.percent),
                      backgroundColor: topicSummaries.map(
                        (t) => STATUS_COLOR[t.status]
                      ),
                      borderRadius: 6,
                    },
                  ],
                }}
                options={{
                  ...baseOptions,
                  indexAxis: "y",
                  scales: {
                    x: {
                      min: 0,
                      max: 100,
                      ticks: { callback: (value) => `${value}%` },
                    },
                  },
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          </Section>

          {/* Chart 8: Weighted Rubric Component Averages */}
          <Section
            title="8. Performance Distribution Across Scoring Rubric"
            subtitle="Average score across the 5 weighted AI evaluation criteria"
            className="lg:col-span-2"
          >
            <div className="relative h-56">
              <Bar
                data={{
                  labels: [
                    "Semantic Relevance (50%)",
                    "Technical Correctness (20%)",
                    "Completeness (15%)",
                    "Clarity (10%)",
                    "Practical Application (5%)",
                  ],
                  datasets: [
                    {
                      label: "Average Score (%)",
                      data: [
                        avgSemantic,
                        breakdown.technicalKnowledge,
                        Math.round(
                          evaluations.reduce(
                            (s, e, i) =>
                              s +
                              (Number.isFinite(Number(e.completeness))
                                ? Number(e.completeness)
                                : qScores100[i]),
                            0
                          ) / Math.max(1, evaluations.length)
                        ),
                        breakdown.communicationClarity,
                        breakdown.practicalKnowledge,
                      ],
                      backgroundColor: [
                        COLOR.indigo,
                        COLOR.blue,
                        COLOR.cyan,
                        COLOR.green,
                        COLOR.amber,
                      ],
                      borderRadius: 8,
                    },
                  ],
                }}
                options={{
                  ...baseOptions,
                  scales: {
                    y: {
                      min: 0,
                      max: 100,
                      ticks: { callback: (v) => `${v}%` },
                    },
                  },
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          </Section>
        </div>

        {/* STRENGTHS, WEAKNESSES & INTEGRITY REPORT */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Section title="Detected Strengths">
            <BulletList
              items={report.strengths}
              empty="No clear strengths recorded yet."
            />
          </Section>

          <Section title="Detected Weaknesses">
            <BulletList
              items={report.weaknesses}
              empty="No major weaknesses flagged."
            />
          </Section>

          {/* SECTION 9F: INTEGRITY REPORT */}
          <Section
            title="Session Integrity Report"
            subtitle="Transparent browser-session telemetry"
          >
            {integrity ? (
              <div className="space-y-3">
                <span
                  className={`inline-block rounded-full border px-3 py-1 text-xs font-extrabold ${
                    RISK_BADGE[integrity.riskLevel] || RISK_BADGE["LOW RISK"]
                  }`}
                >
                  {integrity.riskLevel}
                </span>

                <dl className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-gray-50 p-2">
                    <dt className="text-[11px] text-gray-500">Tab Switches</dt>
                    <dd className="font-bold text-gray-900">
                      {integrity.tabSwitches}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2">
                    <dt className="text-[11px] text-gray-500">Focus Losses</dt>
                    <dd className="font-bold text-gray-900">
                      {integrity.focusLosses}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2">
                    <dt className="text-[11px] text-gray-500">Full-Screen Exits</dt>
                    <dd className="font-bold text-gray-900">
                      {integrity.fullscreenExits}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-2">
                    <dt className="text-[11px] text-gray-500">Clipboard Events</dt>
                    <dd className="font-bold text-gray-900">
                      {integrity.pasteAttempts + integrity.copyAttempts}
                    </dd>
                  </div>
                </dl>

                {integrity.note && (
                  <p className="text-[11px] leading-4 text-gray-500">
                    {integrity.note}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-400">
                No integrity anomalies recorded for this session.
              </p>
            )}
          </Section>
        </div>

        {/* SECTION 11: EVIDENCE-BASED AI SKILL GAP ANALYSIS */}
        <Section
          className="mt-6"
          title="AI Skill Gap Analysis"
          subtitle="Evidence-based gaps derived strictly from your submitted interview answers"
        >
          {skillGaps.length === 0 ? (
            <p className="rounded-xl bg-emerald-50 p-4 text-xs font-medium text-emerald-800">
              Strong consistency across evaluated topics — no critical gaps below the 75% mastery benchmark.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {skillGaps.map((gap) => (
                <article
                  key={gap.topic}
                  className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      {gap.topic}
                    </h3>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${
                        PRIORITY_BADGE[gap.priority] || PRIORITY_BADGE.MEDIUM
                      }`}
                    >
                      {gap.priority} PRIORITY
                    </span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-3 text-[11px] text-gray-600">
                    <span>
                      Current: <strong className="text-gray-900">{gap.currentUnderstanding}%</strong>
                    </span>
                    <span>
                      Target: <strong className="text-gray-900">{gap.requiredUnderstanding}%</strong>
                    </span>
                    <span className="font-bold text-red-600">
                      Gap: -{gap.gapPercentage}%
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-700">
                    {gap.explanation}
                  </p>

                  {gap.recommendedResources.length > 0 && (
                    <ul className="mt-2.5 space-y-1 text-[11px] text-indigo-800">
                      {gap.recommendedResources.map((res, i) => (
                        <li key={`${i}-${res}`}>→ {res}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          )}
        </Section>

        {/* SECTION 12: AI-ESTIMATED ALTERNATIVE DOMAIN RECOMMENDATIONS */}
        {alternativeDomains.length > 0 && (
          <Section
            className="mt-6"
            title="AI-Estimated Alternative Career Domain Recommendations"
            subtitle="Other technical career tracks that align with skills demonstrated in this session"
          >
            <div className="grid gap-4 md:grid-cols-3">
              {alternativeDomains.map((dom) => (
                <article
                  key={dom.domainId}
                  className="flex flex-col justify-between rounded-2xl border border-indigo-100 bg-indigo-50/30 p-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-gray-900">
                        {dom.domain}
                      </h3>
                      <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-[11px] font-extrabold text-white">
                        {dom.suitabilityScore}%
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-gray-700">
                      {dom.whyRecommended}
                    </p>

                    {dom.matchingSkills.length > 0 && (
                      <div className="mt-3">
                        <p className="text-[10px] font-bold uppercase text-emerald-700">
                          Matching Skills
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {dom.matchingSkills.map((s) => (
                            <span
                              key={s}
                              className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800"
                            >
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {dom.missingSkills.length > 0 && (
                      <div className="mt-2.5">
                        <p className="text-[10px] font-bold uppercase text-amber-700">
                          What to Learn Next
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {(dom.whatToLearnNext.length > 0
                            ? dom.whatToLearnNext
                            : dom.missingSkills
                          )
                            .slice(0, 4)
                            .map((s) => (
                              <span
                                key={s}
                                className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800"
                              >
                                + {s}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/dashboard/interview?domain=${encodeURIComponent(
                      dom.suggestedNextInterviewDomainId || dom.domainId
                    )}`}
                    className="mt-4 inline-block rounded-full bg-indigo-600 px-4 py-2 text-center text-[11px] font-bold text-white hover:bg-indigo-700"
                  >
                    Practice {dom.domain} Interview →
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-3 text-[11px] italic text-gray-500">
              {alternativeDomains[0]?.disclaimer ||
                "AI-estimated domain suitability based on responses observed in this 10-question session."}
            </p>
          </Section>
        )}

        {/* SECTION 10C: COLLAPSIBLE QUESTION-BY-QUESTION EVALUATION */}
        <Section
          className="mt-6"
          title="Question-by-Question AI Evaluation (50% Semantic Rubric)"
          subtitle="Click any question to expand/collapse detailed semantic match, technical accuracy, correct reference answer, and model response"
        >
          <div className="space-y-3">
            {interview.questions.map((question, index) => {
              const evaluation = evaluations[index];
              if (!evaluation) return null;
              const score100 = qScores100[index];
              const semPct = qSemantic100[index];

              return (
                <details
                  key={question.id}
                  open={index === 0}
                  className="avoid-break rounded-2xl border border-gray-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3.5">
                    <span className="text-sm font-semibold text-gray-900">
                      Q{question.id}. {question.text}
                    </span>

                    <div className="flex shrink-0 items-center gap-2">
                      <span className="hidden rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-700 sm:inline-block">
                        Semantic {semPct}%
                      </span>
                      {evaluation.classification && (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-700">
                          {evaluation.classification}
                        </span>
                      )}
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${VERDICT_BADGE[evaluation.verdict]}`}
                      >
                        {score100}%
                      </span>
                    </div>
                  </summary>

                  <div className="space-y-3 border-t border-gray-100 px-4 py-4 text-xs leading-5 text-gray-700">
                    <p className="text-[11px] text-gray-400">
                      Topic: {question.topic} · Level: {question.level}
                    </p>

                    {/* 5-Factor Weighted Score Breakdown */}
                    <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 sm:grid-cols-5">
                      <div>
                        <span className="block text-[10px] font-semibold text-gray-500">
                          Semantic (50%)
                        </span>
                        <strong className="text-sm text-indigo-700">
                          {evaluation.semanticRelevance ?? semPct}%
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[10px] font-semibold text-gray-500">
                          Technical (20%)
                        </span>
                        <strong className="text-sm text-blue-700">
                          {evaluation.technicalCorrectness ?? score100}%
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[10px] font-semibold text-gray-500">
                          Completeness (15%)
                        </span>
                        <strong className="text-sm text-cyan-700">
                          {evaluation.completeness ?? score100}%
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[10px] font-semibold text-gray-500">
                          Clarity (10%)
                        </span>
                        <strong className="text-sm text-emerald-700">
                          {evaluation.clarity ?? score100}%
                        </strong>
                      </div>
                      <div>
                        <span className="block text-[10px] font-semibold text-gray-500">
                          Practical (5%)
                        </span>
                        <strong className="text-sm text-amber-700">
                          {evaluation.practicalApplication ?? score100}%
                        </strong>
                      </div>
                    </div>

                    <p>
                      <strong className="text-gray-900">Your submitted answer:</strong>{" "}
                      {interview.answers[index] || (
                        <em className="text-red-600">No answer submitted (0 marks).</em>
                      )}
                    </p>

                    <p className="rounded-xl bg-blue-50/70 p-3 text-blue-950">
                      <strong>Correct reference answer:</strong>{" "}
                      {evaluation.expectedAnswer || question.referenceAnswer}
                    </p>

                    <p>
                      <strong className="text-gray-900">AI evaluation:</strong>{" "}
                      {evaluation.correctnessAnalysis}
                    </p>

                    {evaluation.missingConcepts &&
                      evaluation.missingConcepts.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-bold text-amber-800">
                            Missing concepts:
                          </span>
                          {evaluation.missingConcepts.map((c) => (
                            <span
                              key={c}
                              className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-900"
                            >
                              + {c}
                            </span>
                          ))}
                        </div>
                      )}

                    {evaluation.mistakes && evaluation.mistakes.length > 0 && (
                      <div className="rounded-xl bg-red-50 p-3 text-red-900">
                        <strong>Incorrect concepts / mistakes:</strong>
                        <ul className="mt-1 list-inside list-disc space-y-0.5">
                          {evaluation.mistakes.map((m, mIdx) => (
                            <li key={`${mIdx}-${m}`}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {evaluation.didWell && (
                      <p className="rounded-xl bg-emerald-50 p-3 text-emerald-900">
                        <strong>What you did well:</strong> {evaluation.didWell}
                      </p>
                    )}

                    <p className="rounded-xl bg-amber-50 p-3 text-amber-900">
                      <strong>Suggested improvements:</strong> {evaluation.improve}
                    </p>

                    {evaluation.suggestedAnswer && (
                      <p className="rounded-xl bg-gray-50 p-3">
                        <strong className="text-gray-900">
                          Better sample answer:
                        </strong>{" "}
                        {evaluation.suggestedAnswer}
                      </p>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </Section>

        {/* SECTION 13: 5-LEVEL PERSONALIZED AI LEARNING ROADMAP */}
        {fiveLevelRoadmap.length > 0 && (
          <Section
            className="mt-6"
            title="Personalized 5-Level AI Learning Roadmap"
            subtitle="Structured progression from Fundamentals to Interview Preparation based on your actual gaps"
          >
            <div className="space-y-4">
              {fiveLevelRoadmap.map((step) => (
                <article
                  key={step.level}
                  className="avoid-break rounded-2xl border border-gray-200 bg-gray-50/60 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-extrabold uppercase text-white">
                        {step.levelLabel}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900">
                        {step.topic}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
                          PRIORITY_BADGE[step.priority] || PRIORITY_BADGE.MEDIUM
                        }`}
                      >
                        {step.priority}
                      </span>
                      <span className="rounded-full bg-white px-3 py-0.5 text-[11px] font-semibold text-gray-600 ring-1 ring-gray-200">
                        ⏱ {step.duration}
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-700">
                    {step.explanation}
                  </p>
                  <p className="mt-1.5 text-xs text-indigo-900">
                    <strong>Learning Objective:</strong> {step.learningObjective}
                  </p>

                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-bold text-gray-800">
                        Recommended Practice
                      </p>
                      <BulletList
                        items={step.recommendedPractice}
                        empty="Practice core scenarios."
                      />
                    </div>
                    <div className="rounded-xl bg-blue-50/70 p-3 text-xs text-blue-950">
                      <strong>Practical Project:</strong>
                      <p className="mt-1 leading-5">{step.practicalProject}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        )}

        {/* FINAL RECOMMENDATIONS & TRANSPARENT DISCLAIMER */}
        <Section className="mt-6" title="Final AI Recommendations">
          <BulletList
            items={report.recommendations}
            empty="Keep practicing domain interviews regularly."
          />
        </Section>

        <p className="mt-6 rounded-xl border border-gray-200 bg-white p-4 text-center text-[11px] leading-5 text-gray-500">
          {report.disclaimer}
        </p>
      </div>
    </main>
  );
}
