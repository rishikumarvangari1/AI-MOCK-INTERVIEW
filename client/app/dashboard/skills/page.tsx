"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";

type GapItem = {
  skill: string;
  evidence: string;
  assessed: boolean;
  priority?: string;
  whyItMatters?: string;
  exercises?: string[];
  miniProject?: string;
  estimatedTime?: string;
};

type SkillGapResponse = {
  targetRole: string;
  skillGapAnalysis: {
    disclaimer: string;
    strong: GapItem[];
    intermediate: GapItem[];
    beginner: GapItem[];
    missing: GapItem[];
    recommended: GapItem[];
  };
};

function SkillBucket({
  title,
  badgeClass,
  items,
  emptyText,
}: {
  title: string;
  badgeClass: string;
  items: GapItem[];
  emptyText: string;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badgeClass}`}>
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="mt-3 text-xs text-gray-400">{emptyText}</p>
      ) : (
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div
              key={item.skill}
              className="rounded-xl border border-gray-100 bg-gray-50 p-3.5 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-gray-900">{item.skill}</span>
                {item.estimatedTime && (
                  <span className="text-[11px] text-gray-500">
                    ⏱️ {item.estimatedTime}
                  </span>
                )}
              </div>
              <p className="mt-1 text-[11px] text-gray-600">{item.evidence}</p>
              {item.whyItMatters && (
                <p className="mt-1 text-[11px] text-indigo-700">
                  Why it matters: {item.whyItMatters}
                </p>
              )}
              {item.miniProject && (
                <p className="mt-1 text-[11px] text-emerald-700">
                  Mini-project: {item.miniProject}
                </p>
              )}
              <div className="mt-2.5 flex flex-wrap gap-2">
                <Link
                  href={`/dashboard/interview?domain=${encodeURIComponent(item.skill)}`}
                  className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-50"
                >
                  Practice {item.skill} →
                </Link>
                <Link
                  href="/dashboard/roadmap"
                  className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100"
                >
                  Add to Roadmap
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function SkillsWorkspace() {
  const [data, setData] = useState<SkillGapResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    apiRequest<SkillGapResponse>("/api/career/overview")
      .then((res) => {
        if (active) setData(res);
      })
      .catch((err) => {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Unable to load skill gaps."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const gap = data?.skillGapAnalysis;

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-8 text-gray-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
              Evidence-Based Skill Gap Analysis
            </p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
              Skill Inventory vs {data?.targetRole || "Target Role"}
            </h1>
          </div>

          <Link
            href="/dashboard/roadmap"
            className="rounded-full bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
          >
            Open Learning Roadmap →
          </Link>
        </div>

        {gap?.disclaimer && (
          <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-3 text-xs text-blue-900">
            <strong>Transparency Note:</strong> {gap.disclaimer}
          </div>
        )}

        {error && (
          <div role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-xs text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 animate-pulse">
            <div className="h-48 rounded-2xl bg-gray-200" />
            <div className="h-48 rounded-2xl bg-gray-200" />
          </div>
        ) : gap ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <SkillBucket
              title="Missing High-Priority Skills"
              badgeClass="bg-red-100 text-red-700"
              items={gap.missing}
              emptyText="No critical missing skills identified for your current target."
            />
            <SkillBucket
              title="Strong (Interview-Verified)"
              badgeClass="bg-emerald-100 text-emerald-700"
              items={gap.strong}
              emptyText="Complete mock interviews scoring 75%+ to verify strong skills."
            />
            <SkillBucket
              title="Intermediate / Resume-Evidenced"
              badgeClass="bg-blue-100 text-blue-700"
              items={gap.intermediate}
              emptyText="Upload a resume or add profile skills to populate this tier."
            />
            <SkillBucket
              title="Beginner / Needs Reinforcement"
              badgeClass="bg-amber-100 text-amber-800"
              items={gap.beginner}
              emptyText="No weak interview topics flagged yet."
            />
            <div className="md:col-span-2">
              <SkillBucket
                title="Recommended Next-Step Skills"
                badgeClass="bg-purple-100 text-purple-700"
                items={gap.recommended}
                emptyText="Refresh your career plan to discover adjacent high-leverage skills."
              />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default function SkillsPage() {
  return (
    <ProtectedRoute>
      <SkillsWorkspace />
    </ProtectedRoute>
  );
}
