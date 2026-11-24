(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/interview/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardInterviewPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ProtectedRoute.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InterviewWorkspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InterviewWorkspace.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function DashboardInterviewPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InterviewWorkspace$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/dashboard/interview/page.tsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/interview/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = DashboardInterviewPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardInterviewPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/interview/ResultsDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResultsDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/chart.js/dist/chart.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-chartjs-2/dist/index.js [app-client] (ecmascript)");
"use client";
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Chart"].register(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ArcElement"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BarElement"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CategoryScale"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LinearScale"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PointElement"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LineElement"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RadialLinearScale"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Filler"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Tooltip"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Legend"]);
const COLOR = {
    indigo: "#4f46e5",
    cyan: "#0891b2",
    green: "#16a34a",
    blue: "#2563eb",
    amber: "#f59e0b",
    red: "#dc2626",
    track: "#e5e7eb"
};
const FIT_STYLE = {
    excellent: {
        color: COLOR.green,
        badge: "bg-green-100 text-green-800"
    },
    good: {
        color: COLOR.blue,
        badge: "bg-blue-100 text-blue-800"
    },
    moderate: {
        color: COLOR.amber,
        badge: "bg-amber-100 text-amber-800"
    },
    "needs-improvement": {
        color: COLOR.red,
        badge: "bg-red-100 text-red-800"
    }
};
const STATUS_COLOR = {
    strong: COLOR.green,
    average: COLOR.amber,
    weak: COLOR.red
};
const VERDICT_COLOR = {
    correct: COLOR.green,
    partial: COLOR.amber,
    incorrect: COLOR.red
};
const VERDICT_BADGE = {
    correct: "bg-green-100 text-green-800",
    partial: "bg-amber-100 text-amber-800",
    incorrect: "bg-red-100 text-red-800"
};
const PRIORITY_BADGE = {
    HIGH: "bg-red-100 text-red-800 border-red-200",
    MEDIUM: "bg-amber-100 text-amber-800 border-amber-200",
    LOW: "bg-blue-100 text-blue-800 border-blue-200"
};
const RISK_BADGE = {
    "LOW RISK": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "MODERATE RISK": "bg-amber-100 text-amber-800 border-amber-200",
    "HIGH RISK": "bg-red-100 text-red-800 border-red-200"
};
function formatDuration(seconds) {
    if (!seconds || seconds < 1) return "—";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}
function Section({ title, subtitle, children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `avoid-break rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-base font-bold text-gray-900",
                children: title
            }, void 0, false, {
                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this),
            subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-xs text-gray-500",
                children: subtitle
            }, void 0, false, {
                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                lineNumber: 253,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: children
            }, void 0, false, {
                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/interview/ResultsDashboard.tsx",
        lineNumber: 249,
        columnNumber: 5
    }, this);
}
_c = Section;
function StatCard({ label, value, hint }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "avoid-break rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] font-semibold uppercase tracking-wider text-gray-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-2xl font-extrabold tracking-tight text-gray-900",
                children: value
            }, void 0, false, {
                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this),
            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-[11px] text-gray-500",
                children: hint
            }, void 0, false, {
                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                lineNumber: 276,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/interview/ResultsDashboard.tsx",
        lineNumber: 269,
        columnNumber: 5
    }, this);
}
_c1 = StatCard;
function BulletList({ items, empty }) {
    if (!items.length) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "text-xs text-gray-400",
        children: empty
    }, void 0, false, {
        fileName: "[project]/app/interview/ResultsDashboard.tsx",
        lineNumber: 282,
        columnNumber: 29
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "space-y-2",
        children: items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "flex gap-2 text-xs leading-5 text-gray-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"
                    }, void 0, false, {
                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                        lineNumber: 290,
                        columnNumber: 11
                    }, this),
                    item
                ]
            }, `${idx}-${item}`, true, {
                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                lineNumber: 286,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/interview/ResultsDashboard.tsx",
        lineNumber: 284,
        columnNumber: 5
    }, this);
}
_c2 = BulletList;
function ResultsDashboard({ interview, onRetake }) {
    const report = interview.report;
    const evaluations = interview.evaluations ?? [];
    if (!report || !interview.evaluations) return null;
    const overallScore100 = Number.isFinite(Number(report.overallScore)) ? Number(report.overallScore) : Number(report.percentage || 0);
    const aboveAverageThreshold = report.aboveAverageThreshold ?? 70;
    const isAboveAverage = typeof report.isAboveAverage === "boolean" ? report.isAboveAverage : overallScore100 >= aboveAverageThreshold;
    const selectionDecision = report.selectionDecision || (isAboveAverage ? "RECOMMENDED" : "NEEDS IMPROVEMENT");
    const performanceBand = report.performanceBand || report.fit.label;
    const readinessLabel = report.readiness || report.fit.label;
    const avgSemantic = report.averageSemanticMatch ?? Math.round(evaluations.reduce((sum, e)=>sum + (Number.isFinite(Number(e.semanticRelevance)) ? Number(e.semanticRelevance) : Math.round((e.score || 0) / Math.max(1, e.maxScore || 10) * 100)), 0) / Math.max(1, evaluations.length));
    const breakdown = report.performanceBreakdown || {
        technicalKnowledge: Math.round(overallScore100),
        conceptualUnderstanding: avgSemantic,
        problemSolving: Math.round(overallScore100),
        practicalKnowledge: Math.round(overallScore100),
        communicationClarity: Math.round(overallScore100),
        answerRelevance: avgSemantic
    };
    const topicSummaries = report.topics || [];
    const strong = topicSummaries.filter((t)=>t.status === "strong");
    const average = topicSummaries.filter((t)=>t.status === "average");
    const weak = topicSummaries.filter((t)=>t.status === "weak");
    const integrity = report.integritySummary || interview.integritySummary;
    const skillGaps = report.skillGaps || [];
    const alternativeDomains = report.alternativeDomains || [];
    const fiveLevelRoadmap = report.learningRoadmap || [];
    const fitStyle = FIT_STYLE[report.fit.key] || FIT_STYLE.moderate;
    const qScores100 = evaluations.map((e)=>Number.isFinite(Number(e.finalScore)) ? Number(e.finalScore) : Math.round((e.score || 0) / Math.max(1, e.maxScore || 10) * 100));
    const qSemantic100 = evaluations.map((e, i)=>Number.isFinite(Number(e.semanticRelevance)) ? Number(e.semanticRelevance) : qScores100[i]);
    const baseOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false
    };
    const legendBottom = {
        legend: {
            position: "bottom",
            labels: {
                boxWidth: 12
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-slate-50 text-gray-900",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-6xl px-6 pb-16 pt-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "avoid-break relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-700 px-8 py-9 shadow-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10"
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 383,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex flex-col justify-between gap-6 md:flex-row md:items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold uppercase tracking-wider text-blue-100",
                                            children: [
                                                "AI Mock Interview Assessment · ",
                                                interview.domainTitle
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                            lineNumber: 387,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "mt-2 text-5xl font-extrabold tracking-tight text-white",
                                            children: [
                                                overallScore100.toFixed(1),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl font-semibold text-blue-100",
                                                    children: "/100"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                            lineNumber: 391,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 flex flex-wrap items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `inline-block rounded-full px-4 py-1.5 text-xs font-extrabold tracking-wide ${selectionDecision === "RECOMMENDED" ? "bg-emerald-400 text-emerald-950" : "bg-amber-300 text-amber-950"}`,
                                                    children: selectionDecision === "RECOMMENDED" ? "✓ RECOMMENDED" : "⚠ NEEDS IMPROVEMENT"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-block rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white",
                                                    children: [
                                                        "Level: ",
                                                        performanceBand
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-block rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white",
                                                    children: readinessLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                    lineNumber: 413,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                            lineNumber: 398,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 max-w-2xl text-xs leading-5 text-blue-100",
                                            children: report.careerReadiness
                                        }, void 0, false, {
                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                            lineNumber: 418,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                    lineNumber: 386,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "no-print flex flex-wrap gap-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: onRetake,
                                            className: "rounded-full bg-white px-5 py-2.5 text-xs font-bold text-indigo-700 shadow-md hover:bg-indigo-50",
                                            children: "Retake Interview"
                                        }, void 0, false, {
                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                            lineNumber: 424,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>window.print(),
                                            className: "rounded-full border border-white/40 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10",
                                            children: "Save PDF Report"
                                        }, void 0, false, {
                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                            lineNumber: 432,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard/history",
                                            className: "rounded-full border border-white/40 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10",
                                            children: "Compare Attempts"
                                        }, void 0, false, {
                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                            lineNumber: 440,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                    lineNumber: 423,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 385,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                    lineNumber: 382,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-4 lg:grid-cols-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Overall Score",
                            value: `${overallScore100.toFixed(0)}%`,
                            hint: "Max 100"
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 452,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Semantic Match",
                            value: `${avgSemantic}%`,
                            hint: "50% weight"
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 457,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Questions",
                            value: `${evaluations.length}`,
                            hint: "Evaluated"
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 462,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Correct",
                            value: String(report.correct),
                            hint: "70–100%"
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 467,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Partial",
                            value: String(report.partial),
                            hint: "40–69%"
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 472,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Incorrect",
                            value: String(report.incorrect),
                            hint: "0–39%"
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 477,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Duration",
                            value: formatDuration(interview.duration),
                            hint: "Session time"
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 482,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Threshold",
                            value: `${aboveAverageThreshold}%`,
                            hint: isAboveAverage ? "Above Avg" : "Below Avg"
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 487,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                    lineNumber: 451,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                    className: "mt-6",
                    title: "6-Dimension Performance Breakdown",
                    subtitle: "Weighted evaluation across semantic understanding, technical accuracy, completeness, clarity, and practical depth",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                        children: [
                            {
                                label: "Technical Knowledge",
                                value: breakdown.technicalKnowledge
                            },
                            {
                                label: "Conceptual Understanding",
                                value: breakdown.conceptualUnderstanding
                            },
                            {
                                label: "Problem-Solving",
                                value: breakdown.problemSolving
                            },
                            {
                                label: "Practical Knowledge",
                                value: breakdown.practicalKnowledge
                            },
                            {
                                label: "Communication Clarity",
                                value: breakdown.communicationClarity
                            },
                            {
                                label: "Answer Relevance (Semantic)",
                                value: breakdown.answerRelevance
                            }
                        ].map((dim)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-gray-100 bg-gray-50/70 p-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between text-xs font-bold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-700",
                                                children: dim.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 514,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-indigo-700",
                                                children: [
                                                    dim.value,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 515,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 513,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 h-2 overflow-hidden rounded-full bg-gray-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500",
                                            style: {
                                                width: `${Math.min(100, Math.max(0, dim.value))}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                            lineNumber: 518,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 517,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, dim.label, true, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 509,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                        lineNumber: 500,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                    lineNumber: 495,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 grid gap-6 lg:grid-cols-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "1. Overall Performance Breakdown",
                            subtitle: "Distribution of Correct, Partially Correct, and Incorrect answers",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-64",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Doughnut"], {
                                    data: {
                                        labels: [
                                            "Correct (70-100%)",
                                            "Partial (40-69%)",
                                            "Incorrect (0-39%)"
                                        ],
                                        datasets: [
                                            {
                                                data: [
                                                    report.correct,
                                                    report.partial,
                                                    report.incorrect
                                                ],
                                                backgroundColor: [
                                                    COLOR.green,
                                                    COLOR.amber,
                                                    COLOR.red
                                                ],
                                                borderWidth: 0
                                            }
                                        ]
                                    },
                                    options: {
                                        ...baseOptions,
                                        cutout: "64%",
                                        plugins: legendBottom
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                    lineNumber: 536,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 535,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 531,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "2. Domain Readiness Gauge",
                            subtitle: `AI-estimated readiness for ${interview.domainTitle} (threshold: ${aboveAverageThreshold}%)`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-64",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Doughnut"], {
                                        data: {
                                            labels: [
                                                "Readiness",
                                                "Remaining"
                                            ],
                                            datasets: [
                                                {
                                                    data: [
                                                        overallScore100,
                                                        Math.max(0, 100 - overallScore100)
                                                    ],
                                                    backgroundColor: [
                                                        fitStyle.color,
                                                        COLOR.track
                                                    ],
                                                    borderWidth: 0
                                                }
                                            ]
                                        },
                                        options: {
                                            ...baseOptions,
                                            rotation: -90,
                                            circumference: 180,
                                            cutout: "72%",
                                            plugins: {
                                                legend: {
                                                    display: false
                                                }
                                            }
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 558,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute inset-x-0 bottom-10 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-3xl font-extrabold text-gray-900",
                                                children: [
                                                    overallScore100.toFixed(1),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 578,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-gray-600",
                                                children: selectionDecision
                                            }, void 0, false, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 581,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 577,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 557,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 553,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "3. Question-Wise Score Bar Graph",
                            subtitle: "Weighted final score (0–100%) per question",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-64",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                    data: {
                                        labels: evaluations.map((e)=>`Q${e.questionId}`),
                                        datasets: [
                                            {
                                                label: "Final Score (%)",
                                                data: qScores100,
                                                backgroundColor: evaluations.map((e)=>VERDICT_COLOR[e.verdict]),
                                                borderRadius: 6
                                            }
                                        ]
                                    },
                                    options: {
                                        ...baseOptions,
                                        scales: {
                                            y: {
                                                min: 0,
                                                max: 100,
                                                ticks: {
                                                    callback: (v)=>`${v}%`
                                                }
                                            }
                                        },
                                        plugins: {
                                            legend: {
                                                display: false
                                            }
                                        }
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                    lineNumber: 594,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 593,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 589,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "4. Semantic Matching Chart (50% Component)",
                            subtitle: "Compares Semantic Relevance (%) vs Weighted Final Score (%) per question",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-64",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                    data: {
                                        labels: evaluations.map((e)=>`Q${e.questionId}`),
                                        datasets: [
                                            {
                                                label: "Semantic Match (%)",
                                                data: qSemantic100,
                                                backgroundColor: COLOR.indigo,
                                                borderRadius: 5
                                            },
                                            {
                                                label: "Final Score (%)",
                                                data: qScores100,
                                                backgroundColor: COLOR.cyan,
                                                borderRadius: 5
                                            }
                                        ]
                                    },
                                    options: {
                                        ...baseOptions,
                                        scales: {
                                            y: {
                                                min: 0,
                                                max: 100,
                                                ticks: {
                                                    callback: (v)=>`${v}%`
                                                }
                                            }
                                        },
                                        plugins: legendBottom
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                    lineNumber: 627,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 626,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 622,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "5. Technical Knowledge & Competency Profile",
                            subtitle: "6-dimension competency map derived from all evaluated answers",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-72",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Radar"], {
                                    data: {
                                        labels: [
                                            "Technical",
                                            "Conceptual",
                                            "Problem-Solving",
                                            "Practical",
                                            "Clarity",
                                            "Semantic"
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
                                                    breakdown.answerRelevance
                                                ],
                                                backgroundColor: "rgba(79, 70, 229, 0.2)",
                                                borderColor: COLOR.indigo,
                                                borderWidth: 2,
                                                pointBackgroundColor: COLOR.indigo
                                            }
                                        ]
                                    },
                                    options: {
                                        ...baseOptions,
                                        scales: {
                                            r: {
                                                min: 0,
                                                max: 100,
                                                ticks: {
                                                    stepSize: 25
                                                }
                                            }
                                        },
                                        plugins: legendBottom
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                    lineNumber: 666,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 665,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 661,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "6. Skills Strength & Topic Distribution",
                            subtitle: "Topics grouped as Strong (≥70%), Developing (45–69%), or Weak (<45%)",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-72",
                                children: topicSummaries.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Doughnut"], {
                                    data: {
                                        labels: [
                                            `Strong (${strong.length})`,
                                            `Developing (${average.length})`,
                                            `Weak (${weak.length})`
                                        ],
                                        datasets: [
                                            {
                                                data: [
                                                    strong.length,
                                                    average.length,
                                                    weak.length
                                                ],
                                                backgroundColor: [
                                                    COLOR.green,
                                                    COLOR.amber,
                                                    COLOR.red
                                                ],
                                                borderWidth: 0
                                            }
                                        ]
                                    },
                                    options: {
                                        ...baseOptions,
                                        plugins: legendBottom
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                    lineNumber: 716,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "flex h-full items-center justify-center text-xs text-gray-400",
                                    children: "No topic distribution available for this session."
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                    lineNumber: 734,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 714,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 710,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "7. Topic-Wise Performance Chart",
                            subtitle: "Average accuracy per topic covered in your interview (red = priority gap)",
                            className: "lg:col-span-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                style: {
                                    height: Math.max(220, topicSummaries.length * 42)
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                    data: {
                                        labels: topicSummaries.map((t)=>t.topic),
                                        datasets: [
                                            {
                                                label: "Topic Score (%)",
                                                data: topicSummaries.map((t)=>t.percent),
                                                backgroundColor: topicSummaries.map((t)=>STATUS_COLOR[t.status]),
                                                borderRadius: 6
                                            }
                                        ]
                                    },
                                    options: {
                                        ...baseOptions,
                                        indexAxis: "y",
                                        scales: {
                                            x: {
                                                min: 0,
                                                max: 100,
                                                ticks: {
                                                    callback: (value)=>`${value}%`
                                                }
                                            }
                                        },
                                        plugins: {
                                            legend: {
                                                display: false
                                            }
                                        }
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                    lineNumber: 751,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 747,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 742,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "8. Performance Distribution Across Scoring Rubric",
                            subtitle: "Average score across the 5 weighted AI evaluation criteria",
                            className: "lg:col-span-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-56",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                    data: {
                                        labels: [
                                            "Semantic Relevance (50%)",
                                            "Technical Correctness (20%)",
                                            "Completeness (15%)",
                                            "Clarity (10%)",
                                            "Practical Application (5%)"
                                        ],
                                        datasets: [
                                            {
                                                label: "Average Score (%)",
                                                data: [
                                                    avgSemantic,
                                                    breakdown.technicalKnowledge,
                                                    Math.round(evaluations.reduce((s, e, i)=>s + (Number.isFinite(Number(e.completeness)) ? Number(e.completeness) : qScores100[i]), 0) / Math.max(1, evaluations.length)),
                                                    breakdown.communicationClarity,
                                                    breakdown.practicalKnowledge
                                                ],
                                                backgroundColor: [
                                                    COLOR.indigo,
                                                    COLOR.blue,
                                                    COLOR.cyan,
                                                    COLOR.green,
                                                    COLOR.amber
                                                ],
                                                borderRadius: 8
                                            }
                                        ]
                                    },
                                    options: {
                                        ...baseOptions,
                                        scales: {
                                            y: {
                                                min: 0,
                                                max: 100,
                                                ticks: {
                                                    callback: (v)=>`${v}%`
                                                }
                                            }
                                        },
                                        plugins: {
                                            legend: {
                                                display: false
                                            }
                                        }
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                    lineNumber: 788,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 787,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 782,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                    lineNumber: 529,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 grid gap-6 lg:grid-cols-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "Detected Strengths",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BulletList, {
                                items: report.strengths,
                                empty: "No clear strengths recorded yet."
                            }, void 0, false, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 846,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 845,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "Detected Weaknesses",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BulletList, {
                                items: report.weaknesses,
                                empty: "No major weaknesses flagged."
                            }, void 0, false, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 853,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 852,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "Session Integrity Report",
                            subtitle: "Transparent browser-session telemetry",
                            children: integrity ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `inline-block rounded-full border px-3 py-1 text-xs font-extrabold ${RISK_BADGE[integrity.riskLevel] || RISK_BADGE["LOW RISK"]}`,
                                        children: integrity.riskLevel
                                    }, void 0, false, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 866,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                        className: "grid grid-cols-2 gap-2 text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg bg-gray-50 p-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                        className: "text-[11px] text-gray-500",
                                                        children: "Tab Switches"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 876,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                        className: "font-bold text-gray-900",
                                                        children: integrity.tabSwitches
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 877,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 875,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg bg-gray-50 p-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                        className: "text-[11px] text-gray-500",
                                                        children: "Focus Losses"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 882,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                        className: "font-bold text-gray-900",
                                                        children: integrity.focusLosses
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 883,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 881,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg bg-gray-50 p-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                        className: "text-[11px] text-gray-500",
                                                        children: "Full-Screen Exits"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 888,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                        className: "font-bold text-gray-900",
                                                        children: integrity.fullscreenExits
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 889,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 887,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg bg-gray-50 p-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                        className: "text-[11px] text-gray-500",
                                                        children: "Clipboard Events"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 894,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                        className: "font-bold text-gray-900",
                                                        children: integrity.pasteAttempts + integrity.copyAttempts
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 895,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 893,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 874,
                                        columnNumber: 17
                                    }, this),
                                    integrity.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] leading-4 text-gray-500",
                                        children: integrity.note
                                    }, void 0, false, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 902,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 865,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400",
                                children: "No integrity anomalies recorded for this session."
                            }, void 0, false, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 908,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 860,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                    lineNumber: 844,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                    className: "mt-6",
                    title: "AI Skill Gap Analysis",
                    subtitle: "Evidence-based gaps derived strictly from your submitted interview answers",
                    children: skillGaps.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "rounded-xl bg-emerald-50 p-4 text-xs font-medium text-emerald-800",
                        children: "Strong consistency across evaluated topics — no critical gaps below the 75% mastery benchmark."
                    }, void 0, false, {
                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                        lineNumber: 922,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 md:grid-cols-2",
                        children: skillGaps.map((gap)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "rounded-2xl border border-gray-200 bg-gray-50/70 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-bold text-gray-900",
                                                children: gap.topic
                                            }, void 0, false, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 933,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${PRIORITY_BADGE[gap.priority] || PRIORITY_BADGE.MEDIUM}`,
                                                children: [
                                                    gap.priority,
                                                    " PRIORITY"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 936,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 932,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2.5 flex flex-wrap gap-3 text-[11px] text-gray-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Current: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-gray-900",
                                                        children: [
                                                            gap.currentUnderstanding,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 947,
                                                        columnNumber: 32
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 946,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Target: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-gray-900",
                                                        children: [
                                                            gap.requiredUnderstanding,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 950,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 949,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-red-600",
                                                children: [
                                                    "Gap: -",
                                                    gap.gapPercentage,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 952,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 945,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs leading-5 text-gray-700",
                                        children: gap.explanation
                                    }, void 0, false, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 957,
                                        columnNumber: 19
                                    }, this),
                                    gap.recommendedResources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-2.5 space-y-1 text-[11px] text-indigo-800",
                                        children: gap.recommendedResources.map((res, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    "→ ",
                                                    res
                                                ]
                                            }, `${i}-${res}`, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 964,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 962,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, gap.topic, true, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 928,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                        lineNumber: 926,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                    lineNumber: 916,
                    columnNumber: 9
                }, this),
                alternativeDomains.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                    className: "mt-6",
                    title: "AI-Estimated Alternative Career Domain Recommendations",
                    subtitle: "Other technical career tracks that align with skills demonstrated in this session",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 md:grid-cols-3",
                            children: alternativeDomains.map((dom)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    className: "flex flex-col justify-between rounded-2xl border border-indigo-100 bg-indigo-50/30 p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-sm font-bold text-gray-900",
                                                            children: dom.domain
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                            lineNumber: 989,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "rounded-full bg-indigo-600 px-2.5 py-0.5 text-[11px] font-extrabold text-white",
                                                            children: [
                                                                dom.suitabilityScore,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                            lineNumber: 992,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                    lineNumber: 988,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-xs leading-5 text-gray-700",
                                                    children: dom.whyRecommended
                                                }, void 0, false, {
                                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                    lineNumber: 997,
                                                    columnNumber: 21
                                                }, this),
                                                dom.matchingSkills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-bold uppercase text-emerald-700",
                                                            children: "Matching Skills"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                            lineNumber: 1003,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 flex flex-wrap gap-1",
                                                            children: dom.matchingSkills.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800",
                                                                    children: [
                                                                        "✓ ",
                                                                        s
                                                                    ]
                                                                }, s, true, {
                                                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                    lineNumber: 1008,
                                                                    columnNumber: 29
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                            lineNumber: 1006,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                    lineNumber: 1002,
                                                    columnNumber: 23
                                                }, this),
                                                dom.missingSkills.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] font-bold uppercase text-amber-700",
                                                            children: "What to Learn Next"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                            lineNumber: 1021,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 flex flex-wrap gap-1",
                                                            children: (dom.whatToLearnNext.length > 0 ? dom.whatToLearnNext : dom.missingSkills).slice(0, 4).map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800",
                                                                    children: [
                                                                        "+ ",
                                                                        s
                                                                    ]
                                                                }, s, true, {
                                                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                    lineNumber: 1031,
                                                                    columnNumber: 31
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                            lineNumber: 1024,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                    lineNumber: 1020,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                            lineNumber: 987,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/dashboard/interview?domain=${encodeURIComponent(dom.suggestedNextInterviewDomainId || dom.domainId)}`,
                                            className: "mt-4 inline-block rounded-full bg-indigo-600 px-4 py-2 text-center text-[11px] font-bold text-white hover:bg-indigo-700",
                                            children: [
                                                "Practice ",
                                                dom.domain,
                                                " Interview →"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                            lineNumber: 1043,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, dom.domainId, true, {
                                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                    lineNumber: 983,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 981,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-[11px] italic text-gray-500",
                            children: alternativeDomains[0]?.disclaimer || "AI-estimated domain suitability based on responses observed in this 10-question session."
                        }, void 0, false, {
                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                            lineNumber: 1054,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                    lineNumber: 976,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                    className: "mt-6",
                    title: "Question-by-Question AI Evaluation (50% Semantic Rubric)",
                    subtitle: "Click any question to expand/collapse detailed semantic match, technical accuracy, correct reference answer, and model response",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: interview.questions.map((question, index)=>{
                            const evaluation = evaluations[index];
                            if (!evaluation) return null;
                            const score100 = qScores100[index];
                            const semPct = qSemantic100[index];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                open: index === 0,
                                className: "avoid-break rounded-2xl border border-gray-200 bg-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                        className: "flex cursor-pointer items-center justify-between gap-3 px-4 py-3.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold text-gray-900",
                                                children: [
                                                    "Q",
                                                    question.id,
                                                    ". ",
                                                    question.text
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1081,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex shrink-0 items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-700 sm:inline-block",
                                                        children: [
                                                            "Semantic ",
                                                            semPct,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1086,
                                                        columnNumber: 23
                                                    }, this),
                                                    evaluation.classification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-700",
                                                        children: evaluation.classification
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1090,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `rounded-full px-3 py-1 text-[11px] font-extrabold ${VERDICT_BADGE[evaluation.verdict]}`,
                                                        children: [
                                                            score100,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1094,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1085,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 1080,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 border-t border-gray-100 px-4 py-4 text-xs leading-5 text-gray-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-gray-400",
                                                children: [
                                                    "Topic: ",
                                                    question.topic,
                                                    " · Level: ",
                                                    question.level
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1103,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 sm:grid-cols-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-[10px] font-semibold text-gray-500",
                                                                children: "Semantic (50%)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                lineNumber: 1110,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-sm text-indigo-700",
                                                                children: [
                                                                    evaluation.semanticRelevance ?? semPct,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                lineNumber: 1113,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-[10px] font-semibold text-gray-500",
                                                                children: "Technical (20%)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                lineNumber: 1118,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-sm text-blue-700",
                                                                children: [
                                                                    evaluation.technicalCorrectness ?? score100,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                lineNumber: 1121,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1117,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-[10px] font-semibold text-gray-500",
                                                                children: "Completeness (15%)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                lineNumber: 1126,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-sm text-cyan-700",
                                                                children: [
                                                                    evaluation.completeness ?? score100,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                lineNumber: 1129,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1125,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-[10px] font-semibold text-gray-500",
                                                                children: "Clarity (10%)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                lineNumber: 1134,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-sm text-emerald-700",
                                                                children: [
                                                                    evaluation.clarity ?? score100,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                lineNumber: 1137,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1133,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-[10px] font-semibold text-gray-500",
                                                                children: "Practical (5%)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                lineNumber: 1142,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                className: "text-sm text-amber-700",
                                                                children: [
                                                                    evaluation.practicalApplication ?? score100,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                lineNumber: 1145,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1141,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1108,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-gray-900",
                                                        children: "Your submitted answer:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1152,
                                                        columnNumber: 23
                                                    }, this),
                                                    " ",
                                                    interview.answers[index] || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                        className: "text-red-600",
                                                        children: "No answer submitted (0 marks)."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1154,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1151,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "rounded-xl bg-blue-50/70 p-3 text-blue-950",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Correct reference answer:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1159,
                                                        columnNumber: 23
                                                    }, this),
                                                    " ",
                                                    evaluation.expectedAnswer || question.referenceAnswer
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1158,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-gray-900",
                                                        children: "AI evaluation:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1164,
                                                        columnNumber: 23
                                                    }, this),
                                                    " ",
                                                    evaluation.correctnessAnalysis
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1163,
                                                columnNumber: 21
                                            }, this),
                                            evaluation.missingConcepts && evaluation.missingConcepts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-bold text-amber-800",
                                                        children: "Missing concepts:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1171,
                                                        columnNumber: 27
                                                    }, this),
                                                    evaluation.missingConcepts.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-900",
                                                            children: [
                                                                "+ ",
                                                                c
                                                            ]
                                                        }, c, true, {
                                                            fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                            lineNumber: 1175,
                                                            columnNumber: 29
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1170,
                                                columnNumber: 25
                                            }, this),
                                            evaluation.mistakes && evaluation.mistakes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl bg-red-50 p-3 text-red-900",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Incorrect concepts / mistakes:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1187,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "mt-1 list-inside list-disc space-y-0.5",
                                                        children: evaluation.mistakes.map((m, mIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                children: m
                                                            }, `${mIdx}-${m}`, false, {
                                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                                lineNumber: 1190,
                                                                columnNumber: 29
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1188,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1186,
                                                columnNumber: 23
                                            }, this),
                                            evaluation.didWell && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "rounded-xl bg-emerald-50 p-3 text-emerald-900",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "What you did well:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1198,
                                                        columnNumber: 25
                                                    }, this),
                                                    " ",
                                                    evaluation.didWell
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1197,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "rounded-xl bg-amber-50 p-3 text-amber-900",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Suggested improvements:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1203,
                                                        columnNumber: 23
                                                    }, this),
                                                    " ",
                                                    evaluation.improve
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1202,
                                                columnNumber: 21
                                            }, this),
                                            evaluation.suggestedAnswer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "rounded-xl bg-gray-50 p-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        className: "text-gray-900",
                                                        children: "Better sample answer:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1208,
                                                        columnNumber: 25
                                                    }, this),
                                                    " ",
                                                    evaluation.suggestedAnswer
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1207,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 1102,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, question.id, true, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 1075,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                        lineNumber: 1067,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                    lineNumber: 1062,
                    columnNumber: 9
                }, this),
                fiveLevelRoadmap.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                    className: "mt-6",
                    title: "Personalized 5-Level AI Learning Roadmap",
                    subtitle: "Structured progression from Fundamentals to Interview Preparation based on your actual gaps",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: fiveLevelRoadmap.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "avoid-break rounded-2xl border border-gray-200 bg-gray-50/60 p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-extrabold uppercase text-white",
                                                        children: step.levelLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1236,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-sm font-bold text-gray-900",
                                                        children: step.topic
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1239,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1235,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${PRIORITY_BADGE[step.priority] || PRIORITY_BADGE.MEDIUM}`,
                                                        children: step.priority
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1244,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-full bg-white px-3 py-0.5 text-[11px] font-semibold text-gray-600 ring-1 ring-gray-200",
                                                        children: [
                                                            "⏱ ",
                                                            step.duration
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1251,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1243,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 1234,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs leading-5 text-gray-700",
                                        children: step.explanation
                                    }, void 0, false, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 1257,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1.5 text-xs text-indigo-900",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Learning Objective:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1261,
                                                columnNumber: 21
                                            }, this),
                                            " ",
                                            step.learningObjective
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 1260,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 grid gap-3 md:grid-cols-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] font-bold text-gray-800",
                                                        children: "Recommended Practice"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1266,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BulletList, {
                                                        items: step.recommendedPractice,
                                                        empty: "Practice core scenarios."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1269,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1265,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl bg-blue-50/70 p-3 text-xs text-blue-950",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Practical Project:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1275,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 leading-5",
                                                        children: step.practicalProject
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                        lineNumber: 1276,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                                lineNumber: 1274,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                        lineNumber: 1264,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, step.level, true, {
                                fileName: "[project]/app/interview/ResultsDashboard.tsx",
                                lineNumber: 1230,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                        lineNumber: 1228,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                    lineNumber: 1223,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                    className: "mt-6",
                    title: "Final AI Recommendations",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BulletList, {
                        items: report.recommendations,
                        empty: "Keep practicing domain interviews regularly."
                    }, void 0, false, {
                        fileName: "[project]/app/interview/ResultsDashboard.tsx",
                        lineNumber: 1287,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                    lineNumber: 1286,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-6 rounded-xl border border-gray-200 bg-white p-4 text-center text-[11px] leading-5 text-gray-500",
                    children: report.disclaimer
                }, void 0, false, {
                    fileName: "[project]/app/interview/ResultsDashboard.tsx",
                    lineNumber: 1293,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/interview/ResultsDashboard.tsx",
            lineNumber: 380,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/interview/ResultsDashboard.tsx",
        lineNumber: 379,
        columnNumber: 5
    }, this);
}
_c3 = ResultsDashboard;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Section");
__turbopack_context__.k.register(_c1, "StatCard");
__turbopack_context__.k.register(_c2, "BulletList");
__turbopack_context__.k.register(_c3, "ResultsDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/InterviewWorkspace.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InterviewWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/domains.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$interview$2f$ResultsDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/interview/ResultsDashboard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const LEVEL_STYLES = {
    beginner: "bg-emerald-100 text-emerald-800",
    intermediate: "bg-amber-100 text-amber-800",
    advanced: "bg-rose-100 text-rose-800"
};
const RISK_STYLES = {
    "LOW RISK": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "MODERATE RISK": "bg-amber-100 text-amber-800 border-amber-200",
    "HIGH RISK": "bg-red-100 text-red-800 border-red-200"
};
function formatTimer(seconds) {
    const safe = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
function countWords(text) {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
}
function InterviewSessionInner() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const idParam = params.get("id");
    const domainParam = params.get("domain");
    const resumeIdParam = params.get("resumeId");
    const resolvedInitial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveDomain"])(domainParam);
    // Setup state (derived cleanly from ?domain= unless manually changed)
    const [manualDomain, setManualDomain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedDomain = manualDomain ?? resolvedInitial?.id ?? "python";
    const setSelectedDomain = (nextId)=>setManualDomain(nextId);
    const [domainSearch, setDomainSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [customDomainName, setCustomDomainName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [interviewType, setInterviewType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("technical");
    const [experienceLevel, setExperienceLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("intermediate");
    const [codingLanguage, setCodingLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("javascript");
    const [jobDescription, setJobDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [difficulty, setDifficulty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("mixed");
    const [questionCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [timeLimitMinutes, setTimeLimitMinutes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(30);
    const [useResume, setUseResume] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Boolean(resumeIdParam));
    const [allowPasteAccommodation, setAllowPasteAccommodation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rulesAcknowledged, setRulesAcknowledged] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeConflict, setActiveConflict] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const loadedInterviewIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Live session state
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(idParam ? "loading" : "setup");
    const [interview, setInterview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentIdx, setCurrentIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [remainingSeconds, setRemainingSeconds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1800);
    const [elapsedSeconds, setElapsedSeconds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Draft save & confirmation UI
    const [saveState, setSaveState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [lastSavedTime, setLastSavedTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirmClear, setConfirmClear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmSubmit, setConfirmSubmit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [fieldError, setFieldError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Anti-cheating / integrity UI
    const [integrity, setIntegrity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        tabSwitches: 0,
        focusLosses: 0,
        fullscreenExits: 0,
        pasteAttempts: 0,
        copyAttempts: 0,
        totalEvents: 0,
        riskLevel: "LOW RISK"
    });
    const [integrityWarning, setIntegrityWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const enteredFullscreenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Voice & optional local-only camera states
    const [listening, setListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [voiceError, setVoiceError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [speaking, setSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const speechSupported = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])({
        "InterviewSessionInner.useSyncExternalStore[speechSupported]": ()=>({
                "InterviewSessionInner.useSyncExternalStore[speechSupported]": ()=>{}
            })["InterviewSessionInner.useSyncExternalStore[speechSupported]"]
    }["InterviewSessionInner.useSyncExternalStore[speechSupported]"], {
        "InterviewSessionInner.useSyncExternalStore[speechSupported]": ()=>{
            const w = window;
            return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
        }
    }["InterviewSessionInner.useSyncExternalStore[speechSupported]"], {
        "InterviewSessionInner.useSyncExternalStore[speechSupported]": ()=>false
    }["InterviewSessionInner.useSyncExternalStore[speechSupported]"]);
    const [cameraEnabled, setCameraEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cameraConsentGiven, setCameraConsentGiven] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cameraError, setCameraError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const autosaveTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const autoSubmittedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const submittingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const stopCamera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InterviewSessionInner.useCallback[stopCamera]": ()=>{
            if (streamRef.current) {
                streamRef.current.getTracks().forEach({
                    "InterviewSessionInner.useCallback[stopCamera]": (track)=>track.stop()
                }["InterviewSessionInner.useCallback[stopCamera]"]);
                streamRef.current = null;
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            setCameraEnabled(false);
        }
    }["InterviewSessionInner.useCallback[stopCamera]"], []);
    const stopVoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InterviewSessionInner.useCallback[stopVoice]": ()=>{
            try {
                recognitionRef.current?.stop();
            } catch  {
            // ignore
            }
            setListening(false);
        }
    }["InterviewSessionInner.useCallback[stopVoice]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InterviewSessionInner.useEffect": ()=>{
            return ({
                "InterviewSessionInner.useEffect": ()=>{
                    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
                    stopCamera();
                    stopVoice();
                    if (("TURBOPACK compile-time value", "object") !== "undefined" && "speechSynthesis" in window) {
                        window.speechSynthesis.cancel();
                    }
                }
            })["InterviewSessionInner.useEffect"];
        }
    }["InterviewSessionInner.useEffect"], [
        stopCamera,
        stopVoice
    ]);
    const recordIntegrity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InterviewSessionInner.useCallback[recordIntegrity]": async (type, detail, warningText)=>{
            if (!interview || interview.isComplete) return;
            if (warningText) setIntegrityWarning(warningText);
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/api/interviews/${interview.id}/integrity`, {
                    method: "POST",
                    body: {
                        type,
                        detail
                    },
                    timeoutMs: 10_000
                });
                if (res.integritySummary) {
                    setIntegrity(res.integritySummary);
                }
            } catch  {
            // Never disrupt the candidate if telemetry call transiently fails
            }
        }
    }["InterviewSessionInner.useCallback[recordIntegrity]"], [
        interview
    ]);
    // Load existing interview by ?id= (never synchronously mutates state when !idParam)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InterviewSessionInner.useEffect": ()=>{
            if (!idParam) {
                loadedInterviewIdRef.current = null;
                return;
            }
            // Skip redundant reload if we already just started and hydrated this exact session ID
            if (loadedInterviewIdRef.current === idParam) {
                return;
            }
            let active = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/api/interviews/${idParam}`).then({
                "InterviewSessionInner.useEffect": (res)=>{
                    if (!active) return;
                    const data = res.interview;
                    loadedInterviewIdRef.current = data.id;
                    setInterview(data);
                    setElapsedSeconds(data.duration || 0);
                    setRemainingSeconds(typeof data.remainingSeconds === "number" ? data.remainingSeconds : data.timeLimitSeconds || 1800);
                    if (data.integritySummary) {
                        setIntegrity(data.integritySummary);
                    }
                    if (data.isComplete && data.report) {
                        setPhase("results");
                        return;
                    }
                    const loadedAnswers = (data.questions || []).map({
                        "InterviewSessionInner.useEffect.loadedAnswers": (_q, i)=>(data.answers || [])[i] || ""
                    }["InterviewSessionInner.useEffect.loadedAnswers"]);
                    setAnswers(loadedAnswers);
                    const firstEmpty = loadedAnswers.findIndex({
                        "InterviewSessionInner.useEffect.firstEmpty": (a)=>!a.trim()
                    }["InterviewSessionInner.useEffect.firstEmpty"]);
                    setCurrentIdx(firstEmpty === -1 ? 0 : firstEmpty);
                    setPhase("session");
                }
            }["InterviewSessionInner.useEffect"]).catch({
                "InterviewSessionInner.useEffect": (err)=>{
                    if (!active) return;
                    setError(err instanceof Error ? err.message : "Could not load interview session.");
                    setPhase("error");
                }
            }["InterviewSessionInner.useEffect"]);
            return ({
                "InterviewSessionInner.useEffect": ()=>{
                    active = false;
                }
            })["InterviewSessionInner.useEffect"];
        }
    }["InterviewSessionInner.useEffect"], [
        idParam
    ]);
    // Persist a single draft answer to the backend with monotonic clientUpdatedAt guard
    const persistAnswer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InterviewSessionInner.useCallback[persistAnswer]": async (idx, text)=>{
            if (!interview || interview.isComplete) return;
            setSaveState("saving");
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/api/interviews/${interview.id}/answers`, {
                    method: "PUT",
                    body: {
                        questionIndex: idx,
                        answer: text,
                        clientUpdatedAt: Date.now(),
                        durationSeconds: elapsedSeconds
                    },
                    timeoutMs: 20_000
                });
                if (typeof res.remainingSeconds === "number") {
                    setRemainingSeconds(res.remainingSeconds);
                }
                setSaveState("saved");
                setLastSavedTime(new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }));
            } catch  {
                setSaveState("error");
            }
        }
    }["InterviewSessionInner.useCallback[persistAnswer]"], [
        interview,
        elapsedSeconds
    ]);
    // Submit entire interview for final AI evaluation
    const handleFinalSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InterviewSessionInner.useCallback[handleFinalSubmit]": async (options = {})=>{
            if (!interview || submittingRef.current) return;
            submittingRef.current = true;
            stopVoice();
            stopCamera();
            setConfirmSubmit(false);
            setFieldError("");
            if (typeof document !== "undefined" && document.fullscreenElement) {
                document.exitFullscreen().catch({
                    "InterviewSessionInner.useCallback[handleFinalSubmit]": ()=>{}
                }["InterviewSessionInner.useCallback[handleFinalSubmit]"]);
            }
            setPhase("evaluating");
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/api/interviews/${interview.id}/submit`, {
                    method: "POST",
                    body: {
                        answers,
                        durationSeconds: elapsedSeconds,
                        timerExpired: Boolean(options.timerExpired),
                        allowUnanswered: Boolean(options.allowUnanswered || options.timerExpired),
                        requireAllAnswers: !(options.allowUnanswered || options.timerExpired)
                    },
                    timeoutMs: 120_000
                });
                setInterview(res.interview);
                setPhase("results");
            } catch (err) {
                setFieldError(err instanceof Error ? err.message : "Failed to submit and evaluate interview.");
                setPhase("review");
            } finally{
                submittingRef.current = false;
            }
        }
    }["InterviewSessionInner.useCallback[handleFinalSubmit]"], [
        interview,
        answers,
        elapsedSeconds,
        stopVoice,
        stopCamera
    ]);
    // Server-authoritative live countdown timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InterviewSessionInner.useEffect": ()=>{
            if (phase !== "session" && phase !== "review") return;
            const timer = setInterval({
                "InterviewSessionInner.useEffect.timer": ()=>{
                    setElapsedSeconds({
                        "InterviewSessionInner.useEffect.timer": (prev)=>prev + 1
                    }["InterviewSessionInner.useEffect.timer"]);
                    setRemainingSeconds({
                        "InterviewSessionInner.useEffect.timer": (prev)=>{
                            if (prev <= 1) {
                                if (!autoSubmittedRef.current) {
                                    autoSubmittedRef.current = true;
                                    void handleFinalSubmit({
                                        timerExpired: true,
                                        allowUnanswered: true
                                    });
                                }
                                return 0;
                            }
                            return prev - 1;
                        }
                    }["InterviewSessionInner.useEffect.timer"]);
                }
            }["InterviewSessionInner.useEffect.timer"], 1000);
            return ({
                "InterviewSessionInner.useEffect": ()=>clearInterval(timer)
            })["InterviewSessionInner.useEffect"];
        }
    }["InterviewSessionInner.useEffect"], [
        phase,
        handleFinalSubmit
    ]);
    // Anti-cheating listeners: visibilitychange, window blur, fullscreenchange
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InterviewSessionInner.useEffect": ()=>{
            if (phase !== "session" && phase !== "review") return;
            const handleVisibility = {
                "InterviewSessionInner.useEffect.handleVisibility": ()=>{
                    if (document.hidden) {
                        void recordIntegrity("tab_switch", `Tab hidden while on Q${currentIdx + 1}`, "Tab switch detected and recorded in the session integrity log. Stay on the interview tab to keep a clean integrity report.");
                    }
                }
            }["InterviewSessionInner.useEffect.handleVisibility"];
            const handleBlur = {
                "InterviewSessionInner.useEffect.handleBlur": ()=>{
                    if (!document.hidden) {
                        void recordIntegrity("window_blur", `Browser window lost focus on Q${currentIdx + 1}`, "Window focus change detected and logged.");
                    }
                }
            }["InterviewSessionInner.useEffect.handleBlur"];
            const handleFullscreenChange = {
                "InterviewSessionInner.useEffect.handleFullscreenChange": ()=>{
                    const activeFs = Boolean(document.fullscreenElement);
                    setIsFullscreen(activeFs);
                    if (activeFs) {
                        enteredFullscreenRef.current = true;
                    } else if (enteredFullscreenRef.current) {
                        void recordIntegrity("fullscreen_exit", `Exited full-screen mode on Q${currentIdx + 1}`, "Full-screen mode exited. Click 'Enter Full-Screen' in the header to resume distraction-free mode.");
                    }
                }
            }["InterviewSessionInner.useEffect.handleFullscreenChange"];
            document.addEventListener("visibilitychange", handleVisibility);
            window.addEventListener("blur", handleBlur);
            document.addEventListener("fullscreenchange", handleFullscreenChange);
            return ({
                "InterviewSessionInner.useEffect": ()=>{
                    document.removeEventListener("visibilitychange", handleVisibility);
                    window.removeEventListener("blur", handleBlur);
                    document.removeEventListener("fullscreenchange", handleFullscreenChange);
                }
            })["InterviewSessionInner.useEffect"];
        }
    }["InterviewSessionInner.useEffect"], [
        phase,
        currentIdx,
        recordIntegrity
    ]);
    async function toggleFullscreen() {
        if (typeof document === "undefined") return;
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
                setIsFullscreen(true);
                enteredFullscreenRef.current = true;
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch  {
            setIntegrityWarning("Full-screen mode is not supported or was blocked by your browser.");
        }
    }
    function handleAnswerChange(nextText) {
        setConfirmClear(false);
        setFieldError("");
        setAnswers((prev)=>{
            const copy = [
                ...prev
            ];
            copy[currentIdx] = nextText;
            return copy;
        });
        if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
        autosaveTimerRef.current = setTimeout(()=>{
            void persistAnswer(currentIdx, nextText);
        }, 900);
    }
    async function jumpToQuestion(targetIdx) {
        if (!interview) return;
        const bounded = Math.max(0, Math.min(interview.questions.length - 1, targetIdx));
        if (autosaveTimerRef.current) {
            clearTimeout(autosaveTimerRef.current);
            autosaveTimerRef.current = null;
        }
        const currentText = answers[currentIdx] || "";
        void persistAnswer(currentIdx, currentText);
        setConfirmClear(false);
        setFieldError("");
        setCurrentIdx(bounded);
        if (phase === "review") setPhase("session");
    }
    async function handleStartSession(e, forceNew = false) {
        e.preventDefault();
        if (!rulesAcknowledged) {
            setFieldError("Please acknowledge the interview rules and monitoring disclosure.");
            return;
        }
        setPhase("loading");
        setError("");
        setFieldError("");
        setActiveConflict(null);
        autoSubmittedRef.current = false;
        try {
            const domainPayload = selectedDomain === "custom" && customDomainName.trim() ? customDomainName.trim() : selectedDomain;
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])("/api/interviews/start", {
                method: "POST",
                body: {
                    domainId: domainPayload,
                    mode: "structured",
                    interviewType,
                    experienceLevel,
                    difficulty,
                    codingLanguage,
                    jobDescription: jobDescription.trim(),
                    questionCount,
                    timeLimitSeconds: timeLimitMinutes * 60,
                    useResume,
                    preventDuplicateSession: !forceNew,
                    ...resumeIdParam ? {
                        resumeId: resumeIdParam
                    } : {}
                },
                timeoutMs: 90_000
            });
            const sess = res.interview;
            loadedInterviewIdRef.current = res.interviewId;
            setInterview(sess);
            setAnswers((sess.questions || []).map(()=>""));
            setCurrentIdx(0);
            setElapsedSeconds(0);
            setRemainingSeconds(sess.remainingSeconds || timeLimitMinutes * 60);
            if (sess.integritySummary) setIntegrity(sess.integritySummary);
            setIntegrityWarning("");
            setPhase("session");
            router.replace(`/dashboard/interview?id=${res.interviewId}`);
        } catch (err) {
            const apiErr = err;
            if (apiErr?.code === "ACTIVE_SESSION_EXISTS" && apiErr?.data?.activeInterviewId) {
                setActiveConflict({
                    id: apiErr.data.activeInterviewId,
                    domain: apiErr.data.activeDomain || "Previous Interview"
                });
                setPhase("setup");
                return;
            }
            setError(err instanceof Error ? err.message : "Failed to start mock interview.");
            setPhase("error");
        }
    }
    async function toggleCamera() {
        setCameraError("");
        if (cameraEnabled) {
            stopCamera();
            return;
        }
        if (!cameraConsentGiven) {
            setCameraError("Confirm the explicit local-only video consent checkbox first. We never record or analyze your video.");
            return;
        }
        if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
            setCameraError("Camera preview is not supported in this browser.");
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: 320,
                    height: 240,
                    facingMode: "user"
                },
                audio: false
            });
            streamRef.current = stream;
            setCameraEnabled(true);
            setTimeout(()=>{
                if (videoRef.current) videoRef.current.srcObject = stream;
            }, 50);
        } catch  {
            setCameraError("Camera permission was denied or no webcam was detected.");
        }
    }
    function toggleVoiceDictation() {
        setVoiceError("");
        if (listening) {
            stopVoice();
            return;
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const w = window;
        const SpeechRec = w.SpeechRecognition || w.webkitSpeechRecognition;
        if (!SpeechRec) {
            setVoiceError("Voice dictation is unavailable in this browser.");
            return;
        }
        try {
            const recognition = new SpeechRec();
            recognition.continuous = true;
            recognition.interimResults = false;
            recognition.lang = "en-US";
            recognition.onresult = (event)=>{
                let spoken = "";
                for(let i = 0; i < event.results.length; i += 1){
                    const item = event.results[i];
                    if (item && item[0]?.transcript) spoken += `${item[0].transcript} `;
                }
                const cleaned = spoken.trim();
                if (cleaned) {
                    const existing = answers[currentIdx] || "";
                    handleAnswerChange(existing ? `${existing.trim()} ${cleaned}` : cleaned);
                }
            };
            recognition.onerror = (event)=>{
                setVoiceError(`Voice input paused (${event.error}).`);
                setListening(false);
            };
            recognition.onend = ()=>setListening(false);
            recognitionRef.current = recognition;
            recognition.start();
            setListening(true);
        } catch  {
            setVoiceError("Could not start microphone dictation.");
            setListening(false);
        }
    }
    function readQuestionAloud(text) {
        if (("TURBOPACK compile-time value", "object") === "undefined" || !("speechSynthesis" in window)) return;
        if (speaking) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = ()=>setSpeaking(false);
        utterance.onerror = ()=>setSpeaking(false);
        setSpeaking(true);
        window.speechSynthesis.speak(utterance);
    }
    /* ----- RENDER PHASES ----- */ const effectivePhase = !idParam && phase !== "loading" && phase !== "error" ? "setup" : idParam && !interview && phase === "setup" ? "loading" : phase;
    if (effectivePhase === "loading") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex min-h-[65vh] flex-col items-center justify-center gap-4 bg-gray-50 px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-11 w-11 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"
                }, void 0, false, {
                    fileName: "[project]/components/InterviewWorkspace.tsx",
                    lineNumber: 701,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-semibold text-gray-800",
                    children: "Generating 10 domain-specific interview questions..."
                }, void 0, false, {
                    fileName: "[project]/components/InterviewWorkspace.tsx",
                    lineNumber: 702,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-gray-500",
                    children: "Preparing progressive difficulty (Basic → Intermediate → Advanced → Scenarios) & server timer."
                }, void 0, false, {
                    fileName: "[project]/components/InterviewWorkspace.tsx",
                    lineNumber: 705,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/InterviewWorkspace.tsx",
            lineNumber: 700,
            columnNumber: 7
        }, this);
    }
    if (effectivePhase === "evaluating") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex min-h-[65vh] flex-col items-center justify-center gap-4 bg-gray-50 px-6 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-11 w-11 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"
                }, void 0, false, {
                    fileName: "[project]/components/InterviewWorkspace.tsx",
                    lineNumber: 715,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-lg font-bold text-gray-900",
                    children: "Evaluating all 10 answers with AI Semantic Engine..."
                }, void 0, false, {
                    fileName: "[project]/components/InterviewWorkspace.tsx",
                    lineNumber: 716,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "max-w-md text-xs leading-6 text-gray-500",
                    children: "Computing 50% semantic relevance + technical accuracy, completeness, clarity, skill gap analysis, alternative career domain suitability, and your 5-level learning roadmap."
                }, void 0, false, {
                    fileName: "[project]/components/InterviewWorkspace.tsx",
                    lineNumber: 719,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/InterviewWorkspace.tsx",
            lineNumber: 714,
            columnNumber: 7
        }, this);
    }
    if (effectivePhase === "error") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex min-h-[65vh] items-center justify-center bg-gray-50 px-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-bold text-gray-900",
                        children: "Unable to load interview session"
                    }, void 0, false, {
                        fileName: "[project]/components/InterviewWorkspace.tsx",
                        lineNumber: 731,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs leading-6 text-red-600",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/InterviewWorkspace.tsx",
                        lineNumber: 734,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex justify-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setPhase("setup");
                                    router.replace("/dashboard/interview");
                                },
                                className: "rounded-full bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700",
                                children: "Configure New Interview"
                            }, void 0, false, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 736,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                className: "rounded-full border border-gray-300 px-5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50",
                                children: "Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 746,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InterviewWorkspace.tsx",
                        lineNumber: 735,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InterviewWorkspace.tsx",
                lineNumber: 730,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/InterviewWorkspace.tsx",
            lineNumber: 729,
            columnNumber: 7
        }, this);
    }
    if (effectivePhase === "results" && interview && interview.report) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$interview$2f$ResultsDashboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            interview: interview,
            onRetake: ()=>{
                loadedInterviewIdRef.current = null;
                setInterview(null);
                setAnswers([]);
                setManualDomain(interview.domainId);
                setPhase("setup");
                router.replace(`/dashboard/interview?domain=${interview.domainId}`);
            }
        }, void 0, false, {
            fileName: "[project]/components/InterviewWorkspace.tsx",
            lineNumber: 760,
            columnNumber: 7
        }, this);
    }
    /* ----- SETUP PHASE ----- */ if (effectivePhase === "setup" || !interview) {
        const selectedDomainMeta = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAINS"].find((d)=>d.id === selectedDomain);
        const activeDomainLabel = selectedDomain === "custom" ? customDomainName.trim() || "Custom Role" : selectedDomainMeta?.title || "Python Developer";
        const filteredDomains = domainSearch.trim() ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAINS"].filter((d)=>d.title.toLowerCase().includes(domainSearch.trim().toLowerCase()) || d.description.toLowerCase().includes(domainSearch.trim().toLowerCase())) : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAINS"];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen bg-gray-50 pb-16 pt-8 text-gray-900",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-5xl px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold uppercase tracking-wider text-indigo-600",
                                        children: "Live AI Mock Interview Studio · 10-Question Assessment"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 796,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "mt-1 text-2xl font-extrabold tracking-tight text-gray-900",
                                        children: "Configure Your Live Interview Session"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 799,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 795,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                className: "rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50",
                                children: "← Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 803,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InterviewWorkspace.tsx",
                        lineNumber: 794,
                        columnNumber: 11
                    }, this),
                    activeConflict && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-950",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "block font-bold",
                                        children: [
                                            "Active interview already in progress (",
                                            activeConflict.domain,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 814,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Multiple active sessions are protected to prevent accidental duplicates. Resume it or explicitly launch a fresh 10-question session."
                                    }, void 0, false, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 817,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 813,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>router.replace(`/dashboard/interview?id=${activeConflict.id}`),
                                        className: "rounded-full bg-amber-600 px-4 py-2 font-bold text-white hover:bg-amber-700",
                                        children: "Resume Active Session"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 822,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: (e)=>void handleStartSession(e, true),
                                        className: "rounded-full border border-amber-400 bg-white px-4 py-2 font-semibold text-amber-900 hover:bg-amber-100",
                                        children: "Start New Anyway"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 831,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 821,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InterviewWorkspace.tsx",
                        lineNumber: 812,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: (e)=>void handleStartSession(e, false),
                        className: "mt-6 space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl shadow-sm",
                                                children: selectedDomainMeta?.icon || "✨"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 849,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] font-bold uppercase tracking-wider text-indigo-600",
                                                        children: "Ready to Begin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 853,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-extrabold text-gray-900",
                                                        children: [
                                                            activeDomainLabel,
                                                            " · ",
                                                            questionCount,
                                                            " Questions · ",
                                                            timeLimitMinutes,
                                                            "m Timer"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 856,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 852,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 848,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "rounded-full bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700",
                                        children: "▶ Start Live 10-Question Interview →"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 861,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 847,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-bold uppercase tracking-wider text-gray-500",
                                                children: [
                                                    "1. Choose Career Domain (",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAINS"].length,
                                                    " domains + Custom)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 871,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "search",
                                                value: domainSearch,
                                                onChange: (e)=>setDomainSearch(e.target.value),
                                                placeholder: "Search domains (e.g. Python, Cloud, SQL)...",
                                                "aria-label": "Search career domains",
                                                className: "w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs outline-none focus:border-indigo-500 focus:bg-white sm:w-64"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 874,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 870,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3",
                                        children: [
                                            filteredDomains.map((domain)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setSelectedDomain(domain.id),
                                                    className: `flex items-start gap-3 rounded-xl border p-3.5 text-left transition ${selectedDomain === domain.id ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100" : "border-gray-200 bg-white hover:border-gray-300"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xl",
                                                            children: domain.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 895,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "block text-xs font-bold text-gray-900",
                                                                    children: domain.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                                    lineNumber: 897,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "mt-0.5 block text-[11px] leading-4 text-gray-500",
                                                                    children: domain.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                                    lineNumber: 900,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 896,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, domain.id, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 885,
                                                    columnNumber: 19
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setSelectedDomain("custom"),
                                                className: `flex items-start gap-3 rounded-xl border border-dashed p-3.5 text-left transition ${selectedDomain === "custom" ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100" : "border-gray-300 bg-white hover:border-gray-400"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xl",
                                                        children: "✨"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 915,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "block text-xs font-bold text-gray-900",
                                                                children: "Custom Role / Domain"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                                lineNumber: 917,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "mt-0.5 block text-[11px] leading-4 text-gray-500",
                                                                children: "Type any specialized engineering role or stack"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                                lineNumber: 920,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 916,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 906,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 883,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 869,
                                columnNumber: 13
                            }, this),
                            selectedDomain === "custom" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "custom-domain",
                                        className: "block text-xs font-bold text-gray-700",
                                        children: "Custom Role / Domain Name"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 930,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "custom-domain",
                                        type: "text",
                                        value: customDomainName,
                                        onChange: (e)=>setCustomDomainName(e.target.value),
                                        placeholder: "e.g. Embedded Rust Engineer, Site Reliability Engineer",
                                        className: "mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 936,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 929,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "int-type",
                                                className: "block text-xs font-bold text-gray-700",
                                                children: "2. Interview Format"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 949,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "int-type",
                                                value: interviewType,
                                                onChange: (e)=>setInterviewType(e.target.value),
                                                className: "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "technical",
                                                        children: "Technical (10 Questions)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 961,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "coding",
                                                        children: "Coding Challenge (Code Editor)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 962,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "behavioral",
                                                        children: "Behavioral (STAR)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 963,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "hr",
                                                        children: "HR Screening"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 964,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "mixed",
                                                        children: "Mixed Technical + Scenarios"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 965,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 955,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 948,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "int-exp",
                                                className: "block text-xs font-bold text-gray-700",
                                                children: "3. Experience Level"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 970,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "int-exp",
                                                value: experienceLevel,
                                                onChange: (e)=>setExperienceLevel(e.target.value),
                                                className: "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "beginner",
                                                        children: "Fresher / Beginner"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 984,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "intermediate",
                                                        children: "Intermediate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 985,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "advanced",
                                                        children: "Senior / Advanced"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 986,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 976,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 969,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "int-diff",
                                                className: "block text-xs font-bold text-gray-700",
                                                children: "4. Difficulty Curve"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 991,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "int-diff",
                                                value: difficulty,
                                                onChange: (e)=>setDifficulty(e.target.value),
                                                className: "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "mixed",
                                                        children: "Progressive (Q1-3 Basic → Q9-10 Scenario)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1003,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "easy",
                                                        children: "Easy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1004,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "medium",
                                                        children: "Medium"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1005,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "hard",
                                                        children: "Hard"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1006,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 997,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 990,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "int-timer",
                                                className: "block text-xs font-bold text-gray-700",
                                                children: "5. Countdown Timer"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1011,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "int-timer",
                                                value: timeLimitMinutes,
                                                onChange: (e)=>setTimeLimitMinutes(Number(e.target.value)),
                                                className: "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 20,
                                                        children: "20 Minutes (Fast-Paced)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1023,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 30,
                                                        children: "30 Minutes (Standard 10Q)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1024,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: 45,
                                                        children: "45 Minutes (Extended)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1025,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1017,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 1010,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 947,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 sm:grid-cols-2",
                                children: [
                                    interviewType === "coding" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "int-lang",
                                                className: "block text-xs font-bold text-gray-700",
                                                children: "Coding Language"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1033,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "int-lang",
                                                value: codingLanguage,
                                                onChange: (e)=>setCodingLanguage(e.target.value),
                                                className: "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "javascript",
                                                        children: "JavaScript"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1045,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "typescript",
                                                        children: "TypeScript"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1046,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "python",
                                                        children: "Python"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1047,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "java",
                                                        children: "Java"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1048,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "sql",
                                                        children: "SQL"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1049,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "cpp",
                                                        children: "C++"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1050,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1039,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 1032,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: interviewType === "coding" ? "" : "sm:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "int-jd",
                                                className: "block text-xs font-bold text-gray-700",
                                                children: "Optional Job Description Context"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1056,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "int-jd",
                                                type: "text",
                                                value: jobDescription,
                                                onChange: (e)=>setJobDescription(e.target.value),
                                                placeholder: "Optional: paste key requirements to tailor your 10 questions",
                                                className: "mt-1.5 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1062,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 1055,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 1030,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex cursor-pointer items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-950",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: useResume,
                                        onChange: (e)=>setUseResume(e.target.checked),
                                        className: "mt-0.5 h-4 w-4 rounded border-emerald-300 text-emerald-600"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 1075,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "block font-bold",
                                                children: "Tailor interview questions to my active Resume"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1082,
                                                columnNumber: 17
                                            }, this),
                                            "Probes real projects and technologies from your uploaded CV without modifying your Resume Analyzer history."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 1081,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 1074,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 text-xs leading-5 text-indigo-950",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-bold text-indigo-900",
                                        children: "🛡️ Live Interview Rules & Transparent Integrity Policy"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 1091,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-2 list-inside list-disc space-y-1 text-indigo-900/90",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Collect-All-10 First:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1096,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Exactly 10 questions are asked. No scores, correct answers, or AI feedback are revealed until you click ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Final Submit Interview"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1096,
                                                        columnNumber: 162
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1095,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "50% Semantic Weighted Evaluation:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1099,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Answers are evaluated on Semantic Relevance (50%), Technical Correctness (20%), Completeness (15%), Clarity (10%), and Practical Application (5%)."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1098,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Server-Authoritative Timer & Autosave:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1102,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Drafts autosave continuously and refreshing the page will not reset your countdown clock."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1101,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Privacy-Conscious Monitoring:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Tab switches, window focus changes, full-screen exits, and copy/paste blocks are logged transparently in your integrity summary. We ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "never"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 198
                                                    }, this),
                                                    " secretly activate cameras or microphones, never record video, and never run facial recognition. Browser telemetry is informational and never auto-rejects candidates."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1104,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 1094,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 flex flex-col gap-2 border-t border-indigo-200/70 pt-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex cursor-pointer items-center gap-2 font-semibold text-indigo-950",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: rulesAcknowledged,
                                                        onChange: (e)=>setRulesAcknowledged(e.target.checked),
                                                        className: "h-4 w-4 rounded border-indigo-300 text-indigo-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 19
                                                    }, this),
                                                    "I understand the 10-question assessment rules and transparent integrity monitoring."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex cursor-pointer items-center gap-2 text-[11px] text-indigo-800",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: allowPasteAccommodation,
                                                        onChange: (e)=>setAllowPasteAccommodation(e.target.checked),
                                                        className: "h-3.5 w-3.5 rounded border-indigo-300 text-indigo-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1121,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Accessibility accommodation: enable assistive paste tools (still logged transparently)."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1120,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 1109,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 1090,
                                columnNumber: 13
                            }, this),
                            fieldError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                role: "alert",
                                className: "text-xs font-semibold text-red-600",
                                children: fieldError
                            }, void 0, false, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 1133,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            "10 progressive questions · ",
                                            timeLimitMinutes,
                                            "m server timer · Full 8-chart AI report upon submission"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 1139,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "rounded-full bg-indigo-600 px-7 py-3 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700",
                                        children: "Start Live 10-Question Interview →"
                                    }, void 0, false, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 1142,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                lineNumber: 1138,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InterviewWorkspace.tsx",
                        lineNumber: 842,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InterviewWorkspace.tsx",
                lineNumber: 793,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/InterviewWorkspace.tsx",
            lineNumber: 792,
            columnNumber: 7
        }, this);
    }
    /* ----- LIVE SESSION & REVIEW PHASES ----- */ const totalQuestions = interview.questions.length || 10;
    const answeredCount = answers.filter((a)=>a && a.trim().length > 0).length;
    const progressPercent = Math.round((currentIdx + 1) / Math.max(1, totalQuestions) * 100);
    const currentQuestion = interview.questions[currentIdx];
    const currentAnswer = answers[currentIdx] || "";
    const isTimerLow = remainingSeconds <= 300;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-slate-50 pb-14 pt-4 text-gray-900",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-4 sm:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-sm font-extrabold text-white",
                                    children: "AI"
                                }, void 0, false, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1169,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-sm font-extrabold text-gray-900",
                                                    children: interview.domainTitle
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1174,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700",
                                                    children: "Live Interview · No Early Answers"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1177,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1173,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-gray-500",
                                            children: [
                                                answeredCount,
                                                "/",
                                                totalQuestions,
                                                " answered ·",
                                                " ",
                                                saveState === "saving" ? "Saving draft..." : saveState === "saved" && lastSavedTime ? `Draft saved at ${lastSavedTime}` : saveState === "error" ? "Autosave retrying..." : "Autosave active"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1181,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InterviewWorkspace.tsx",
                            lineNumber: 1168,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "aria-live": "polite",
                                    className: `rounded-full border px-3.5 py-1.5 text-xs font-extrabold tabular-nums ${isTimerLow ? "animate-pulse border-red-300 bg-red-50 text-red-700" : "border-gray-200 bg-gray-50 text-gray-800"}`,
                                    children: [
                                        "⏱ ",
                                        formatTimer(remainingSeconds),
                                        " left"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1195,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>void toggleFullscreen(),
                                    className: "rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50",
                                    children: isFullscreen ? "Exit Full-Screen" : "⛶ Full-Screen"
                                }, void 0, false, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1206,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard/history",
                                    className: "rounded-full border border-red-200 bg-red-50/70 px-3.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100",
                                    children: "Exit Session"
                                }, void 0, false, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1214,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InterviewWorkspace.tsx",
                            lineNumber: 1194,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InterviewWorkspace.tsx",
                    lineNumber: 1167,
                    columnNumber: 9
                }, this),
                integrityWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "alert",
                    className: "mt-3 flex items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs text-amber-900",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "⚠️ ",
                                integrityWarning
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InterviewWorkspace.tsx",
                            lineNumber: 1229,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setIntegrityWarning(""),
                            className: "shrink-0 font-bold text-amber-800 hover:underline",
                            children: "Dismiss"
                        }, void 0, false, {
                            fileName: "[project]/components/InterviewWorkspace.tsx",
                            lineNumber: 1230,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InterviewWorkspace.tsx",
                    lineNumber: 1225,
                    columnNumber: 11
                }, this),
                interview.questionSource === "fallback_bank" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs text-blue-900",
                    children: "ℹ️ Questions loaded from the verified domain question bank while live question generation was temporarily busy."
                }, void 0, false, {
                    fileName: "[project]/components/InterviewWorkspace.tsx",
                    lineNumber: 1242,
                    columnNumber: 11
                }, this),
                phase === "review" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold uppercase tracking-wider text-indigo-600",
                                            children: "Pre-Submission Review"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1252,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-1 text-xl font-extrabold text-gray-900",
                                            children: [
                                                "Review All ",
                                                totalQuestions,
                                                " Answers Before Final Submit"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1255,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-gray-500",
                                            children: [
                                                answeredCount,
                                                " of ",
                                                totalQuestions,
                                                " questions answered. AI evaluation, reference answers, and scores unlock immediately after submission."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1258,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1251,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setPhase("session"),
                                    className: "rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50",
                                    children: "← Return to Questions"
                                }, void 0, false, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1262,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InterviewWorkspace.tsx",
                            lineNumber: 1250,
                            columnNumber: 13
                        }, this),
                        answeredCount < totalQuestions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-950",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        totalQuestions - answeredCount,
                                        " question(s) are still unanswered."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1273,
                                    columnNumber: 17
                                }, this),
                                " ",
                                "Unanswered questions receive strictly 0 marks. Jump back to complete them or explicitly confirm submitting with blanks."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InterviewWorkspace.tsx",
                            lineNumber: 1272,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 space-y-3",
                            children: interview.questions.map((q, idx)=>{
                                const text = (answers[idx] || "").trim();
                                const words = countWords(text);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `rounded-2xl border p-4 ${text ? "border-emerald-200 bg-emerald-50/30" : "border-amber-200 bg-amber-50/40"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-start justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-extrabold text-gray-900",
                                                                children: [
                                                                    "Q",
                                                                    idx + 1,
                                                                    "."
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                                lineNumber: 1296,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${LEVEL_STYLES[q.level] || "bg-gray-100 text-gray-700"}`,
                                                                children: q.level
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                                lineNumber: 1299,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] font-medium text-gray-500",
                                                                children: q.topic
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                                lineNumber: 1306,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `rounded-full px-2.5 py-0.5 text-[10px] font-bold ${text ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`,
                                                                children: text ? `Answered (${words} words)` : "Unanswered (0 marks)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                                lineNumber: 1309,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1295,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1.5 text-xs font-semibold text-gray-800",
                                                        children: q.text
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1319,
                                                        columnNumber: 25
                                                    }, this),
                                                    text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 line-clamp-3 rounded-lg bg-white p-2.5 text-xs leading-5 text-gray-600 ring-1 ring-gray-100",
                                                        children: text
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                                        lineNumber: 1323,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1294,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void jumpToQuestion(idx),
                                                className: "shrink-0 rounded-full border border-indigo-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-50",
                                                children: text ? "Edit Answer" : "Write Answer"
                                            }, void 0, false, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1329,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InterviewWorkspace.tsx",
                                        lineNumber: 1293,
                                        columnNumber: 21
                                    }, this)
                                }, q.id, false, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1285,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/InterviewWorkspace.tsx",
                            lineNumber: 1280,
                            columnNumber: 13
                        }, this),
                        fieldError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            role: "alert",
                            className: "mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700",
                            children: fieldError
                        }, void 0, false, {
                            fileName: "[project]/components/InterviewWorkspace.tsx",
                            lineNumber: 1343,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500",
                                    children: [
                                        "Integrity status:",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "text-gray-800",
                                            children: integrity.riskLevel
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1354,
                                            columnNumber: 17
                                        }, this),
                                        " ·",
                                        " ",
                                        integrity.tabSwitches,
                                        " tab switches · ",
                                        integrity.fullscreenExits,
                                        " full-screen exits"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1352,
                                    columnNumber: 15
                                }, this),
                                !confirmSubmit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setConfirmSubmit(true),
                                    className: "rounded-full bg-indigo-600 px-7 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-700",
                                    children: "Final Submit Interview →"
                                }, void 0, false, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1359,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-bold text-indigo-950",
                                            children: "Confirm final submission? Answers lock after submit."
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1368,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>void handleFinalSubmit({
                                                    allowUnanswered: answeredCount < totalQuestions
                                                }),
                                            className: "rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-700",
                                            children: "Yes, Submit & Evaluate"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1371,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setConfirmSubmit(false),
                                            className: "rounded-full border border-gray-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1382,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1367,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InterviewWorkspace.tsx",
                            lineNumber: 1351,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InterviewWorkspace.tsx",
                    lineNumber: 1249,
                    columnNumber: 11
                }, this) : /* ACTIVE QUESTION ENTRY LAYOUT (MAIN + SIDEBAR) */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-5 grid gap-6 lg:grid-cols-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "space-y-4 lg:col-span-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center justify-between gap-2 text-xs font-bold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-indigo-700",
                                                    children: [
                                                        "Question ",
                                                        currentIdx + 1,
                                                        " of ",
                                                        totalQuestions
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1401,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: [
                                                        "Progress: ",
                                                        progressPercent,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1404,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1400,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-100",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 transition-all duration-300",
                                                style: {
                                                    width: `${progressPercent}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/InterviewWorkspace.tsx",
                                                lineNumber: 1407,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1406,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1399,
                                    columnNumber: 15
                                }, this),
                                currentQuestion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    onCopy: (e)=>{
                                        e.preventDefault();
                                        void recordIntegrity("copy_blocked", `Attempted to copy prompt text on Q${currentIdx + 1}`, "Copying interview question text is disabled during live assessments.");
                                    },
                                    className: "select-none rounded-3xl border border-gray-200 bg-white p-6 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `rounded-full px-3 py-1 text-[11px] font-bold uppercase ${LEVEL_STYLES[currentQuestion.level] || "bg-gray-100 text-gray-700"}`,
                                                            children: currentQuestion.level
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1429,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700",
                                                            children: [
                                                                "Topic: ",
                                                                currentQuestion.topic
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1437,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1428,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>readQuestionAloud(currentQuestion.text),
                                                    className: "rounded-full border border-gray-200 px-3 py-1 text-[11px] font-semibold text-gray-600 hover:bg-gray-50",
                                                    children: speaking ? "⏹ Stop Reading" : "🔊 Read Aloud"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1442,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1427,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-4 text-base font-bold leading-7 text-gray-900 sm:text-lg",
                                            children: currentQuestion.text
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1451,
                                            columnNumber: 19
                                        }, this),
                                        currentQuestion.sampleInput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-mono text-xs text-slate-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Sample Input:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1458,
                                                            columnNumber: 25
                                                        }, this),
                                                        " ",
                                                        currentQuestion.sampleInput
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1457,
                                                    columnNumber: 23
                                                }, this),
                                                currentQuestion.sampleOutput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Expected Output:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1462,
                                                            columnNumber: 27
                                                        }, this),
                                                        " ",
                                                        currentQuestion.sampleOutput
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1461,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1456,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1416,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-3xl border border-gray-200 bg-white p-6 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "answer-editor",
                                                    className: "text-xs font-bold uppercase tracking-wider text-gray-600",
                                                    children: [
                                                        "Your Answer (Question ",
                                                        currentIdx + 1,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1474,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-2",
                                                    children: [
                                                        speechSupported && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: toggleVoiceDictation,
                                                            className: `rounded-full px-3 py-1 text-[11px] font-semibold transition ${listening ? "bg-red-100 text-red-700" : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`,
                                                            children: listening ? "⏹ Stop Voice" : "🎙️ Dictate Answer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1482,
                                                            columnNumber: 23
                                                        }, this),
                                                        !confirmClear ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            disabled: !currentAnswer,
                                                            onClick: ()=>setConfirmClear(true),
                                                            className: "rounded-full border border-gray-200 px-3 py-1 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40",
                                                            children: "Clear Answer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1496,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-700",
                                                            children: [
                                                                "Clear?",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>{
                                                                        handleAnswerChange("");
                                                                        void persistAnswer(currentIdx, "");
                                                                        setConfirmClear(false);
                                                                    },
                                                                    className: "underline",
                                                                    children: "Yes"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                                    lineNumber: 1507,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setConfirmClear(false),
                                                                    className: "text-gray-600 underline",
                                                                    children: "No"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                                    lineNumber: 1518,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1505,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1480,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1473,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            id: "answer-editor",
                                            rows: interview.interviewType === "coding" ? 13 : 9,
                                            value: currentAnswer,
                                            onChange: (e)=>handleAnswerChange(e.target.value),
                                            onPaste: (e)=>{
                                                if (!allowPasteAccommodation) {
                                                    e.preventDefault();
                                                    void recordIntegrity("paste_blocked", `Paste blocked in answer field on Q${currentIdx + 1}`, "Pasting into answer fields is disabled during standard live assessments. Write your explanation in your own words.");
                                                } else {
                                                    void recordIntegrity("paste_blocked", `Accessibility paste used on Q${currentIdx + 1}`);
                                                }
                                            },
                                            placeholder: interview.interviewType === "coding" ? `Write your ${interview.codingLanguage || "code"} solution and explain time/space complexity...` : "Write a clear, structured explanation covering core concepts, trade-offs, and a practical example...",
                                            className: `mt-3 w-full rounded-2xl border border-gray-200 p-4 text-sm leading-6 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${interview.interviewType === "coding" ? "bg-slate-950 font-mono text-emerald-300" : "bg-white text-gray-900"}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1530,
                                            columnNumber: 17
                                        }, this),
                                        voiceError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-[11px] text-amber-700",
                                            children: voiceError
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1563,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: countWords(currentAnswer)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                                    lineNumber: 1569,
                                                                    columnNumber: 23
                                                                }, this),
                                                                " words"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1568,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: currentAnswer.length
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                                    lineNumber: 1572,
                                                                    columnNumber: 23
                                                                }, this),
                                                                " / 8,000 characters"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1571,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1567,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: allowPasteAccommodation ? "Accessibility paste enabled" : "Paste disabled per live interview rules"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1575,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1566,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            disabled: currentIdx === 0,
                                                            onClick: ()=>void jumpToQuestion(currentIdx - 1),
                                                            className: "rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40",
                                                            children: "← Previous"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1585,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>void persistAnswer(currentIdx, currentAnswer),
                                                            className: "rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100",
                                                            children: "Save Answer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1594,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1584,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: [
                                                        currentIdx < totalQuestions - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>void jumpToQuestion(currentIdx + 1),
                                                            className: "rounded-full bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700",
                                                            children: "Next Question →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1605,
                                                            columnNumber: 23
                                                        }, this) : null,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                void persistAnswer(currentIdx, currentAnswer);
                                                                setPhase("review");
                                                            },
                                                            className: "rounded-full bg-gray-900 px-5 py-2 text-xs font-bold text-white hover:bg-gray-800",
                                                            children: [
                                                                "Review & Submit (",
                                                                answeredCount,
                                                                "/",
                                                                totalQuestions,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1614,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1603,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1583,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1472,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InterviewWorkspace.tsx",
                            lineNumber: 1397,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "space-y-4 lg:col-span-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-3xl border border-gray-200 bg-white p-5 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xs font-bold uppercase tracking-wider text-gray-500",
                                            children: "Question Navigation"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1633,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-gray-600",
                                            children: [
                                                "Answered: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: answeredCount
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1637,
                                                    columnNumber: 29
                                                }, this),
                                                " / ",
                                                totalQuestions
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1636,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 grid grid-cols-5 gap-2",
                                            children: interview.questions.map((q, idx)=>{
                                                const hasAns = Boolean((answers[idx] || "").trim());
                                                const isCurrent = idx === currentIdx;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>void jumpToQuestion(idx),
                                                    className: `flex h-10 items-center justify-center rounded-xl border text-xs font-bold transition ${isCurrent ? "border-indigo-600 bg-indigo-600 text-white shadow-sm" : hasAns ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`,
                                                    title: `Q${idx + 1}: ${q.topic} (${hasAns ? "Answered" : "Unanswered"})`,
                                                    children: idx + 1
                                                }, q.id, false, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1645,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1640,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 flex flex-wrap gap-3 text-[11px] text-gray-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "h-2.5 w-2.5 rounded-full bg-indigo-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1666,
                                                            columnNumber: 21
                                                        }, this),
                                                        " Current"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1665,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "h-2.5 w-2.5 rounded-full bg-emerald-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1669,
                                                            columnNumber: 21
                                                        }, this),
                                                        " Answered"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1668,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "h-2.5 w-2.5 rounded-full bg-gray-300"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1672,
                                                            columnNumber: 21
                                                        }, this),
                                                        " Pending"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1671,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1664,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1632,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-3xl border border-gray-200 bg-white p-5 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xs font-bold uppercase tracking-wider text-gray-500",
                                                    children: "Integrity Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1680,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${RISK_STYLES[integrity.riskLevel] || RISK_STYLES["LOW RISK"]}`,
                                                    children: integrity.riskLevel
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1683,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1679,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                            className: "mt-3 grid grid-cols-2 gap-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl bg-gray-50 p-2.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-[11px] text-gray-500",
                                                            children: "Tab Switches"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1694,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "mt-0.5 font-extrabold text-gray-900",
                                                            children: integrity.tabSwitches
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1695,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1693,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl bg-gray-50 p-2.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-[11px] text-gray-500",
                                                            children: "Focus Losses"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1700,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "mt-0.5 font-extrabold text-gray-900",
                                                            children: integrity.focusLosses
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1701,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1699,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl bg-gray-50 p-2.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-[11px] text-gray-500",
                                                            children: "Full-Screen Exits"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1706,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "mt-0.5 font-extrabold text-gray-900",
                                                            children: integrity.fullscreenExits
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1707,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1705,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl bg-gray-50 p-2.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                            className: "text-[11px] text-gray-500",
                                                            children: "Clipboard Alerts"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1712,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                            className: "mt-0.5 font-extrabold text-gray-900",
                                                            children: integrity.pasteAttempts + integrity.copyAttempts
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                                            lineNumber: 1713,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1711,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1692,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-3 text-[11px] leading-4 text-gray-500",
                                            children: "Informational telemetry only — never auto-rejects candidates and never secretly activates camera/mic."
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1719,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1678,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-3xl border border-gray-200 bg-white p-5 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xs font-bold uppercase tracking-wider text-gray-500",
                                            children: "Optional Self-View Practice Camera"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1726,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-[11px] leading-4 text-gray-500",
                                            children: "Strictly local to your browser. Never uploaded, recorded, or analyzed."
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1729,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "mt-3 flex cursor-pointer items-center gap-2 text-[11px] text-gray-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: cameraConsentGiven,
                                                    onChange: (e)=>setCameraConsentGiven(e.target.checked),
                                                    className: "h-3.5 w-3.5 rounded border-gray-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                                    lineNumber: 1734,
                                                    columnNumber: 19
                                                }, this),
                                                "Enable local-only camera self-view"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1733,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>void toggleCamera(),
                                            className: "mt-2.5 w-full rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100",
                                            children: cameraEnabled ? "Turn Off Camera" : "📷 Start Local Self-View"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1743,
                                            columnNumber: 17
                                        }, this),
                                        cameraError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-[11px] text-amber-700",
                                            children: cameraError
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1752,
                                            columnNumber: 19
                                        }, this),
                                        cameraEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                            ref: videoRef,
                                            autoPlay: true,
                                            muted: true,
                                            playsInline: true,
                                            className: "mt-3 h-36 w-full rounded-xl bg-black object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InterviewWorkspace.tsx",
                                            lineNumber: 1756,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InterviewWorkspace.tsx",
                                    lineNumber: 1725,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InterviewWorkspace.tsx",
                            lineNumber: 1630,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InterviewWorkspace.tsx",
                    lineNumber: 1395,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/InterviewWorkspace.tsx",
            lineNumber: 1165,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/InterviewWorkspace.tsx",
        lineNumber: 1164,
        columnNumber: 5
    }, this);
}
_s(InterviewSessionInner, "9b4DMYviB7ui1/5RqCKfSzkuyNs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
_c = InterviewSessionInner;
function InterviewWorkspace() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex min-h-[60vh] items-center justify-center bg-gray-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"
            }, void 0, false, {
                fileName: "[project]/components/InterviewWorkspace.tsx",
                lineNumber: 1778,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/InterviewWorkspace.tsx",
            lineNumber: 1777,
            columnNumber: 9
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InterviewSessionInner, {}, void 0, false, {
            fileName: "[project]/components/InterviewWorkspace.tsx",
            lineNumber: 1782,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/InterviewWorkspace.tsx",
        lineNumber: 1775,
        columnNumber: 5
    }, this);
}
_c1 = InterviewWorkspace;
var _c, _c1;
__turbopack_context__.k.register(_c, "InterviewSessionInner");
__turbopack_context__.k.register(_c1, "InterviewWorkspace");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ProtectedRoute.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Authcontent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/Authcontent.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ProtectedRoute({ children, requireAdmin = false }) {
    _s();
    const { user, isLoggedIn, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Authcontent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProtectedRoute.useEffect": ()=>{
            if (isLoading) return;
            if (!isLoggedIn) {
                const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
                router.replace(`/login${next}`);
                return;
            }
            if (requireAdmin && user?.role !== "admin") {
                router.replace("/dashboard");
            }
        }
    }["ProtectedRoute.useEffect"], [
        isLoading,
        isLoggedIn,
        requireAdmin,
        user?.role,
        pathname,
        router
    ]);
    if (isLoading || !isLoggedIn) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-gray-50 px-6",
            "aria-busy": "true",
            "aria-live": "polite",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"
                }, void 0, false, {
                    fileName: "[project]/components/ProtectedRoute.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-500",
                    children: "Verifying your session..."
                }, void 0, false, {
                    fileName: "[project]/components/ProtectedRoute.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ProtectedRoute.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this);
    }
    if (requireAdmin && user?.role !== "admin") {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ProtectedRoute.tsx",
        lineNumber: 49,
        columnNumber: 10
    }, this);
}
_s(ProtectedRoute, "8ULheqakXmfqHwcIv5qAotAwCxk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Authcontent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ProtectedRoute;
var _c;
__turbopack_context__.k.register(_c, "ProtectedRoute");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/domains.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DOMAINS",
    ()=>DOMAINS,
    "resolveDomain",
    ()=>resolveDomain
]);
const DOMAINS = [
    {
        id: "python",
        title: "Python Developer",
        description: "Python, OOP, data structures, generators, decorators & AsyncIO",
        icon: "🐍",
        focus: "core Python, OOP, data structures, generators, decorators, AsyncIO, Django, FastAPI",
        topics: [
            "Core Python & Data Types",
            "OOP & Design Patterns",
            "Data Structures & Algorithms",
            "Generators, Iterators & Decorators",
            "Concurrency & AsyncIO",
            "Testing, Packaging & Performance"
        ],
        aliases: [
            "python-developer"
        ]
    },
    {
        id: "java",
        title: "Java Developer",
        description: "Java, collections, multithreading, JVM internals & Spring Boot",
        icon: "☕",
        focus: "core Java, collections, multithreading, JVM, Spring Boot, Maven, Hibernate",
        topics: [
            "Core Java & OOP",
            "Collections & Streams",
            "Multithreading & Concurrency",
            "JVM Internals & Garbage Collection",
            "Spring Boot & REST APIs",
            "Persistence & Transactions"
        ],
        aliases: [
            "java-developer"
        ]
    },
    {
        id: "fullstack",
        title: "Full Stack Developer",
        description: "Frontend, backend APIs, databases, auth, caching & deployment",
        icon: "🌐",
        focus: "JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, SQL, REST API, Docker",
        topics: [
            "JavaScript & TypeScript",
            "React & Component Architecture",
            "Node.js & REST API Design",
            "Databases & Schema Modeling",
            "Authentication & Web Security",
            "System Design & Deployment"
        ],
        aliases: [
            "full-stack",
            "full-stack-developer"
        ]
    },
    {
        id: "frontend",
        title: "Frontend Developer",
        description: "HTML5, CSS3, JavaScript, TypeScript, React, accessibility & performance",
        icon: "🎨",
        focus: "HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Vue, Angular, accessibility",
        topics: [
            "HTML Semantics & Accessibility",
            "Modern CSS & Responsive Layout",
            "JavaScript & Browser Runtime",
            "React State & Hooks",
            "Web Performance & Core Web Vitals",
            "Frontend Testing & Security"
        ],
        aliases: [
            "frontend-developer",
            "react",
            "react-developer",
            "ux-design"
        ]
    },
    {
        id: "backend",
        title: "Backend Developer",
        description: "REST/GraphQL APIs, databases, caching, queues, auth & scalability",
        icon: "⚙️",
        focus: "Node.js, Express, Python, Java, Go, REST API, GraphQL, PostgreSQL, MongoDB, Redis, Microservices",
        topics: [
            "REST & API Architecture",
            "Databases & Query Optimization",
            "Caching & Message Queues",
            "Authentication & Authorization",
            "Scalability & System Design",
            "Observability & Reliability"
        ],
        aliases: [
            "backend-developer",
            "system-design",
            "nodejs"
        ]
    },
    {
        id: "data-analyst",
        title: "Data Analyst",
        description: "SQL, Excel, statistics, KPI design, Power BI & Tableau",
        icon: "📊",
        focus: "SQL, Excel, Python, Pandas, statistics, Power BI, Tableau, data visualization",
        topics: [
            "SQL & Analytical Queries",
            "Data Cleaning & Transformation",
            "Descriptive & Inferential Statistics",
            "KPI & Business Metrics Design",
            "Data Visualization & Dashboards",
            "Stakeholder Storytelling"
        ],
        aliases: [
            "data-analytics",
            "product-management"
        ]
    },
    {
        id: "data-scientist",
        title: "Data Scientist",
        description: "Machine learning, statistics, experimentation & model evaluation",
        icon: "🔬",
        focus: "Python, Pandas, NumPy, Scikit-learn, Machine Learning, statistics, SQL, TensorFlow, PyTorch",
        topics: [
            "Probability & Statistics",
            "Feature Engineering & EDA",
            "Supervised Learning Algorithms",
            "Model Evaluation & Validation",
            "Experimentation & A/B Testing",
            "Production ML Considerations"
        ],
        aliases: [
            "data-science"
        ]
    },
    {
        id: "ml-engineer",
        title: "Machine Learning Engineer",
        description: "Production ML pipelines, feature stores, PyTorch, TensorFlow & MLOps",
        icon: "🧠",
        focus: "Python, PyTorch, TensorFlow, Scikit-learn, Machine Learning, Deep Learning, Docker, Kubernetes, MLOps",
        topics: [
            "ML Algorithms & Feature Pipelines",
            "Deep Learning Frameworks",
            "Training & Hyperparameter Tuning",
            "Model Serving & Latency Optimization",
            "Data Drift & MLOps Monitoring",
            "Distributed Training & Scaling"
        ],
        aliases: [
            "machine-learning-engineer",
            "machine-learning"
        ]
    },
    {
        id: "ai-engineer",
        title: "AI Engineer",
        description: "LLMs, RAG architectures, prompt engineering, evaluation & agents",
        icon: "🤖",
        focus: "Python, LLM, RAG, NLP, LangChain, PyTorch, Deep Learning, REST API, TypeScript",
        topics: [
            "Transformers & LLM Architecture",
            "RAG & Vector Retrieval",
            "Prompt Engineering & Structured Output",
            "LLM Evaluation & Guardrails",
            "Agentic Workflows & Tool Use",
            "Inference Latency & Cost Optimization"
        ],
        aliases: [
            "ai-ml",
            "ai-ml-engineer",
            "ai"
        ]
    },
    {
        id: "devops",
        title: "DevOps Engineer",
        description: "CI/CD pipelines, Docker, Kubernetes, Linux, Terraform & SRE",
        icon: "🚀",
        focus: "Docker, Kubernetes, CI/CD, GitHub Actions, Linux, Terraform, AWS, GCP, Azure, Git",
        topics: [
            "Linux & Shell Fundamentals",
            "Containers & Docker",
            "Kubernetes Orchestration",
            "CI/CD Pipelines & Release Strategies",
            "Monitoring, Logging & Alerting",
            "Incident Response & SRE"
        ],
        aliases: [
            "devops-engineer"
        ]
    },
    {
        id: "cloud",
        title: "Cloud Engineer",
        description: "AWS/GCP/Azure architecture, VPC networking, IAM, IaC & FinOps",
        icon: "☁️",
        focus: "AWS, GCP, Azure, Terraform, Docker, Kubernetes, Linux, networking, IAM",
        topics: [
            "Cloud Compute & Storage",
            "Networking, VPCs & Load Balancing",
            "IAM & Cloud Security",
            "Infrastructure as Code",
            "High Availability & Disaster Recovery",
            "Cost Optimization & FinOps"
        ],
        aliases: [
            "cloud-engineer"
        ]
    },
    {
        id: "software-engineer",
        title: "Software Engineer",
        description: "DSA, object-oriented design, system design, testing & clean code",
        icon: "💻",
        focus: "Data Structures, Algorithms, System Design, Git, OOP, Java, Python, JavaScript, C++, SQL",
        topics: [
            "Data Structures & Algorithms",
            "Object-Oriented Design",
            "System Design & Scalability",
            "Concurrency & Reliability",
            "Testing, Debugging & Code Quality",
            "Engineering Trade-Offs & Collaboration"
        ],
        aliases: [
            "software-engineering",
            "swe",
            "sde",
            "general"
        ]
    },
    {
        id: "dba",
        title: "Database Administrator",
        description: "Database tuning, replication, backups, security & high availability",
        icon: "🏛️",
        focus: "SQL, PostgreSQL, MySQL, MongoDB, Redis, indexing, replication, backups, performance tuning",
        topics: [
            "Schema Architecture & Normalization",
            "Indexing & Execution Plan Tuning",
            "Backup, Recovery & Point-in-Time Restore",
            "Replication, Sharding & High Availability",
            "Transactions, Locks & Concurrency",
            "Database Security & Access Control"
        ],
        aliases: [
            "database-administrator",
            "database"
        ]
    },
    {
        id: "cybersecurity",
        title: "Cybersecurity Analyst",
        description: "OWASP Top 10, AppSec, cryptography, threat modeling & incident response",
        icon: "🔐",
        focus: "OWASP, OAuth, JWT, Linux, networking, cryptography, incident response, threat modeling",
        topics: [
            "OWASP Top 10 & AppSec",
            "Authentication, Cryptography & TLS",
            "Network Security & Defense in Depth",
            "Threat Modeling & Vulnerability Assessment",
            "Detection & Incident Response",
            "Cloud & Container Security"
        ],
        aliases: [
            "cybersecurity-analyst",
            "cybersecurity-engineer",
            "security"
        ]
    },
    {
        id: "web-developer",
        title: "Web Developer",
        description: "HTML, CSS, JavaScript, responsive UI, REST APIs & web fundamentals",
        icon: "🌍",
        focus: "HTML, CSS, JavaScript, React, Tailwind CSS, Node.js, REST API, Git, accessibility",
        topics: [
            "HTML5 & Semantic Markup",
            "CSS3, Flexbox & Grid",
            "DOM & Client-Side JavaScript",
            "HTTP, REST APIs & Fetch",
            "Responsive Design & Accessibility",
            "Web Security & Deployment"
        ],
        aliases: [
            "web-dev"
        ]
    },
    {
        id: "cpp",
        title: "C++ Developer",
        description: "Modern C++, memory management, STL, pointers & multithreading",
        icon: "⚡",
        focus: "C++, Data Structures, Algorithms, memory management, STL, multithreading, Linux",
        topics: [
            "Memory Management & Smart Pointers",
            "OOP, Virtual Dispatch & Templates",
            "STL Containers & Algorithms",
            "Concurrency & Multithreading",
            "Move Semantics & Modern C++",
            "Debugging & Low-Level Performance"
        ],
        aliases: [
            "c++",
            "cpp-developer"
        ]
    },
    {
        id: "javascript",
        title: "JavaScript Developer",
        description: "ESNext, closures, prototypes, event loop, async patterns & TypeScript",
        icon: "🟨",
        focus: "JavaScript, TypeScript, Node.js, React, HTML, CSS, REST API, Jest",
        topics: [
            "Execution Context & Closures",
            "Event Loop & Asynchronous JS",
            "Prototypes & Object Model",
            "TypeScript Type System",
            "Browser & DOM Performance",
            "Testing & Error Handling"
        ],
        aliases: [
            "javascript-developer",
            "js"
        ]
    },
    {
        id: "sql",
        title: "SQL Developer",
        description: "Complex joins, CTEs, window functions, schema design & indexing",
        icon: "🗄️",
        focus: "SQL, PostgreSQL, MySQL, BigQuery, Snowflake, joins, window functions, indexing",
        topics: [
            "Joins, Subqueries & CTEs",
            "Window Functions & Aggregations",
            "Normalization & Schema Design",
            "Indexing & Query Execution Plans",
            "Transactions & Isolation Levels",
            "Data Integrity & Migrations"
        ],
        aliases: [
            "sql-developer"
        ]
    },
    {
        id: "android",
        title: "Android Developer",
        description: "Kotlin/Java, Jetpack Compose, lifecycle, offline storage & performance",
        icon: "📱",
        focus: "Kotlin, Java, Android, Jetpack Compose, REST API, SQL, Git, mobile architecture",
        topics: [
            "Activity & Fragment Lifecycle",
            "Jetpack Compose & UI Architecture",
            "Coroutines & Asynchronous Work",
            "MVVM, State & Dependency Injection",
            "Networking, Caching & Local Storage",
            "App Performance, Memory & Testing"
        ],
        aliases: [
            "android-developer",
            "mobile"
        ]
    },
    {
        id: "qa-engineer",
        title: "QA Engineer",
        description: "Test strategy, Playwright/Cypress automation, API & regression QA",
        icon: "🧪",
        focus: "Jest, Cypress, Playwright, CI/CD, REST API, SQL, Agile, JavaScript, Python",
        topics: [
            "Test Pyramid & QA Strategy",
            "API & Integration Testing",
            "UI Automation (Playwright/Cypress)",
            "Edge Cases & Exploratory Testing",
            "Performance & Load Testing",
            "Defect Triage & CI Quality Gates"
        ],
        aliases: [
            "software-testing",
            "qa",
            "testing",
            "hr",
            "behavioral"
        ]
    },
    {
        id: "computer-operator",
        title: "Computer Operator",
        description: "OS operations, office automation, backups, troubleshooting & IT workflows",
        icon: "🖥️",
        focus: "Windows, Linux, Microsoft Office, Excel, data entry, system backups, networking basics, hardware troubleshooting",
        topics: [
            "Operating Systems & File Management",
            "Office Productivity & Spreadsheets",
            "Hardware, Peripherals & Networking Basics",
            "Data Backup, Security & Hygiene",
            "Batch Processing & System Monitoring",
            "Daily IT Operations & Troubleshooting"
        ],
        aliases: [
            "computer-operations",
            "it-operator"
        ]
    },
    {
        id: "technical-support",
        title: "Technical Support Engineer",
        description: "Incident triage, SLA workflows, networking, OS diagnostics & customer care",
        icon: "🎧",
        focus: "ITSM, ticketing, Windows, Linux, DNS, TCP/IP, HTTP, SQL basics, debugging, customer communication",
        topics: [
            "Structured Troubleshooting & Root Cause Analysis",
            "Networking, DNS, HTTP & Connectivity",
            "Operating System & Application Diagnostics",
            "Ticketing, SLAs & Incident Escalation",
            "Log Inspection & Database Basics",
            "Customer Communication & De-escalation"
        ],
        aliases: [
            "tech-support",
            "support-engineer",
            "it-support"
        ]
    }
];
function resolveDomain(raw) {
    const slug = (raw ?? "").toLowerCase().trim();
    if (!/^[a-z0-9 +.#-]{1,60}$/.test(slug)) {
        return null;
    }
    const normalizedSlug = slug.replace(/\s+/g, "-");
    const matchedDomain = DOMAINS.find((domain)=>domain.id === normalizedSlug || domain.title.toLowerCase() === slug || domain.aliases.includes(normalizedSlug));
    if (matchedDomain) {
        return {
            ...matchedDomain,
            key: matchedDomain.id,
            label: matchedDomain.title
        };
    }
    const title = normalizedSlug.replace(/(^|-)(\w)/g, (_, separator, character)=>(separator ? " " : "") + character.toUpperCase());
    return {
        id: normalizedSlug,
        key: normalizedSlug,
        title,
        label: title,
        description: `Technical interview focused on ${title}`,
        icon: "✨",
        focus: `core concepts of ${title}`,
        topics: [
            `${title} Fundamentals`,
            "Core Concepts & Architecture",
            "Problem Solving & Debugging",
            "Best Practices & Testing",
            "Performance & Reliability",
            "Real-World Scenarios"
        ],
        aliases: []
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1mh53ifys4ayl._.js.map