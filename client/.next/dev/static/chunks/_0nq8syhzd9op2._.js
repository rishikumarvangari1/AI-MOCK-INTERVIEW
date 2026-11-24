(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Authcontent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/Authcontent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/domains.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const FEATURES = [
    {
        icon: "🎤",
        title: "Live 10-Question AI Mock Interview",
        description: "Collect-all-10 live interviews across 22 career domains with server-authoritative countdown timer, autosave drafts, review mode, and transparent integrity monitoring.",
        href: "/dashboard/interview"
    },
    {
        icon: "📄",
        title: "AI Resume Analyzer",
        description: "Upload PDF, DOCX, or TXT resumes for magic-byte validated extraction, ATS compatibility scoring, STAR bullet rewrites, and version comparison.",
        href: "/dashboard/resume"
    },
    {
        icon: "🎯",
        title: "Resume Domain Matching",
        description: "Discover which career domains fit your current skills and projects with transparent compatibility percentages and missing-skill explanations.",
        href: "/dashboard/resume"
    },
    {
        icon: "🧩",
        title: "Skill Gap Analysis",
        description: "Categorizes your skills into Strong, Intermediate, Beginner, Missing, and Recommended — separating resume keywords from verified interview mastery.",
        href: "/dashboard/skills"
    },
    {
        icon: "✅",
        title: "50% Semantic AI Answer Evaluation",
        description: "Evaluates meaning over exact word matching: 50% Semantic Relevance, 20% Technical Correctness, 15% Completeness, 10% Clarity, and 5% Practical Application.",
        href: "/dashboard/interview"
    },
    {
        icon: "🗺️",
        title: "Personalized Learning Roadmap",
        description: "Generate persistent 7, 15, 30, 60, or 90-day preparation plans with daily objectives, coding tasks, mini-projects, and revision checkpoints.",
        href: "/dashboard/roadmap"
    },
    {
        icon: "📊",
        title: "Performance Analytics & Charts",
        description: "Track interview score trends, per-question bar graphs, answer-distribution pie charts, resume ATS history, and domain readiness over time.",
        href: "/dashboard/analytics"
    },
    {
        icon: "🤖",
        title: "Context-Aware AI Assistant",
        description: "Ask the floating AI Website Assistant anything about scoring, navigation, weak interview topics, or resume improvements anytime.",
        href: "/dashboard"
    }
];
const STEPS = [
    {
        step: "01",
        title: "Upload Your Resume",
        desc: "Upload a PDF, DOCX, or TXT CV to extract skills, projects, and ATS signals."
    },
    {
        step: "02",
        title: "Select Your Career Domain",
        desc: "Pick from 20 career domains or use your AI-recommended best-fit domain."
    },
    {
        step: "03",
        title: "Complete a 10-Question Interview",
        desc: "Answer domain-tailored questions via text, voice dictation, or coding editor."
    },
    {
        step: "04",
        title: "Receive Intelligent Evaluation",
        desc: "Get 0–10 rubric scores, 70% above-average readiness banding, and correct answers."
    },
    {
        step: "05",
        title: "Identify Your Weaknesses",
        desc: "Review missing concepts, topic breakdowns, and evidence-backed skill gaps."
    },
    {
        step: "06",
        title: "Follow Your Learning Roadmap",
        desc: "Track 7 to 90-day study milestones, coding tasks, and portfolio mini-projects."
    },
    {
        step: "07",
        title: "Improve Career Readiness",
        desc: "Compare progress across sessions and tailor applications with Job Matching."
    }
];
const FAQS = [
    {
        q: "How is my mock interview score calculated?",
        a: "After you submit all 10 answers, each response is evaluated using our weighted AI rubric: Semantic Relevance (50%), Technical Correctness (20%), Completeness (15%), Clarity (10%), and Practical Application (5%). Overall Score = Sum of all 10 question scores / 10 (max 100), with 70% as the default RECOMMENDED readiness threshold."
    },
    {
        q: "Can I view the correct answers during or after an interview?",
        a: "Reference answers, scores, and AI feedback stay strictly locked during the live session. Immediately after clicking Final Submit Interview, every question displays your answer, weighted score breakdown, correct reference answer, detailed explanation, missing concepts, and improvement tips — saved permanently in Interview History."
    },
    {
        q: "Does an above-average score guarantee a job offer?",
        a: "No. All interview scores and ATS estimates are AI-based practice assessments designed to guide your preparation, not official employer hiring decisions."
    },
    {
        q: "What resume formats are supported?",
        a: "PDF, DOCX, and TXT files up to 5 MB with binary signature and MIME validation. Scanned image-only PDFs are clearly flagged if readable text cannot be extracted."
    }
];
function HomePage() {
    _s();
    const { isLoggedIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Authcontent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const interviewHref = isLoggedIn ? "/dashboard/interview" : "/register";
    const resumeHref = isLoggedIn ? "/dashboard/resume" : "/register";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gray-50 text-gray-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-6 py-20 text-white sm:py-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": "true",
                        className: "pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": "true",
                        className: "pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-4 py-1.5 text-xs font-semibold text-indigo-200",
                                        children: "✨ AI-Powered Career Intelligence & Interview Platform"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "mt-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl",
                                        children: "Master Your Interviews with AI Intelligence"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-5 max-w-2xl text-base leading-7 text-slate-300",
                                        children: "Practice real-world interviews, receive intelligent feedback, identify your skill gaps, and discover the career path that matches your abilities."
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-8 flex flex-wrap gap-3.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: interviewHref,
                                                className: "rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 px-7 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-95",
                                                children: "Start Mock Interview →"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 130,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#domains",
                                                className: "rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20",
                                                children: [
                                                    "Explore Domains (",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAINS"].length,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 137,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: resumeHref,
                                                className: "rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20",
                                                children: "📄 Analyze My Resume"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 144,
                                                columnNumber: 15
                                            }, this),
                                            isLoggedIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/dashboard",
                                                className: "rounded-full border border-cyan-400/30 px-6 py-3.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/10",
                                                children: "Open Dashboard"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#domains",
                                                className: "rounded-xl p-2 transition hover:bg-white/5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-2xl font-extrabold text-white",
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAINS"].length
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 167,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-0.5 text-xs text-slate-400",
                                                        children: "Career Domains →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 163,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: interviewHref,
                                                className: "rounded-xl p-2 transition hover:bg-white/5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-2xl font-extrabold text-cyan-300",
                                                        children: "10 Qs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-0.5 text-xs text-slate-400",
                                                        children: "Live Rubric Loop →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 174,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: isLoggedIn ? "/dashboard/analytics" : "/register",
                                                className: "rounded-xl p-2 transition hover:bg-white/5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-2xl font-extrabold text-purple-300",
                                                        children: "70%"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-0.5 text-xs text-slate-400",
                                                        children: "Readiness Benchmark →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 183,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: isLoggedIn ? "/dashboard/roadmap" : "/register",
                                                className: "rounded-xl p-2 transition hover:bg-white/5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-2xl font-extrabold text-emerald-300",
                                                        children: "7–90d"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-0.5 text-xs text-slate-400",
                                                        children: "Adaptive Roadmaps →"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 192,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-3xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur-md",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between border-b border-white/10 pb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-bold text-white",
                                                            children: "Platform Assessment Capabilities"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[11px] text-slate-400",
                                                            children: "Click any step to open"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 214,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-300",
                                                    children: "Live AI Engine"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 218,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 209,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 space-y-3 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: resumeHref,
                                                    className: "block rounded-xl border border-white/10 bg-slate-900/60 p-3.5 transition hover:border-indigo-400/50 hover:bg-slate-900/80",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-bold text-indigo-300",
                                                            children: "1. Resume Intelligence & Domain Match →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-slate-300",
                                                            children: "Extracts skills, computes ATS estimate & matches top career domains with missing-skill insights."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: interviewHref,
                                                    className: "block rounded-xl border border-white/10 bg-slate-900/60 p-3.5 transition hover:border-cyan-400/50 hover:bg-slate-900/80",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-bold text-cyan-300",
                                                            children: "2. 10-Question Live Interview + Correct Answers →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-slate-300",
                                                            children: "Grades every answer on 50% semantic meaning + accuracy and unlocks 8 interactive charts after submission."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 244,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: isLoggedIn ? "/dashboard/skills" : "/register",
                                                    className: "block rounded-xl border border-white/10 bg-slate-900/60 p-3.5 transition hover:border-purple-400/50 hover:bg-slate-900/80",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-bold text-purple-300",
                                                            children: "3. Skill Gaps, Roadmap & AI Assistant →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-1 text-slate-300",
                                                            children: "Turns real assessment weaknesses into tracked study plans with 24/7 context-aware assistant help."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 223,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "features",
                className: "mx-auto max-w-6xl px-6 py-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-bold uppercase tracking-wider text-indigo-600",
                                children: "Complete Career Suite"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl",
                                children: "Everything you need from resume scan to interview readiness"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 274,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
                        children: FEATURES.map((feat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: isLoggedIn ? feat.href : "/register",
                                className: "group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-xl",
                                                children: feat.icon
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 287,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mt-4 text-sm font-bold text-gray-900 group-hover:text-indigo-700",
                                                children: feat.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-xs leading-5 text-gray-600",
                                                children: feat.description
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 293,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 286,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-4 text-xs font-semibold text-indigo-600",
                                        children: "Explore →"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 297,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, feat.title, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 281,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "border-y border-gray-200 bg-white px-6 py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-6xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-bold uppercase tracking-wider text-cyan-600",
                            children: "How It Works"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 308,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mt-2 text-2xl font-extrabold tracking-tight text-gray-900",
                            children: "Seven structured steps to measurable career readiness"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 311,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
                            children: STEPS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-2xl border border-gray-200 bg-gray-50 p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-extrabold text-indigo-600",
                                            children: [
                                                "STEP ",
                                                item.step
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 321,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mt-2 text-sm font-bold text-gray-900",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 324,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1.5 text-xs leading-5 text-gray-600",
                                            children: item.desc
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 327,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.step, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 317,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 315,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 307,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 306,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "domains",
                className: "mx-auto max-w-6xl px-6 py-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-end justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold uppercase tracking-wider text-purple-600",
                                        children: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAINS"].length,
                                            " Supported Career Tracks"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 340,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "mt-2 text-2xl font-extrabold tracking-tight text-gray-900",
                                        children: "Choose your target domain and start practicing"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 343,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 339,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: interviewHref,
                                className: "text-xs font-bold text-indigo-600 hover:text-indigo-700",
                                children: "Start custom domain interview →"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 347,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAINS"].map((domain)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: isLoggedIn ? `/dashboard/interview?domain=${domain.id}` : "/register",
                                className: "flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-xs font-semibold text-gray-800 shadow-xs transition hover:border-indigo-400 hover:text-indigo-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": "true",
                                        children: domain.icon
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 366,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: domain.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 367,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, domain.id, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 355,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "border-t border-gray-200 bg-white px-6 py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-4xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-bold uppercase tracking-wider text-indigo-600",
                            children: "Frequently Asked Questions"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 376,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mt-2 text-2xl font-extrabold tracking-tight text-gray-900",
                            children: "Transparent AI evaluation & resume analysis"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 379,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 space-y-3",
                            children: FAQS.map((faq)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                    className: "rounded-2xl border border-gray-200 bg-gray-50 p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                            className: "cursor-pointer text-sm font-bold text-gray-900",
                                            children: faq.q
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 389,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2.5 text-xs leading-6 text-gray-600",
                                            children: faq.a
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, faq.q, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 385,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 383,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 375,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
_s(HomePage, "Jbx0LrCfdz/EDenJV2YbpvzQ6CY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Authcontent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
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

//# sourceMappingURL=_0nq8syhzd9op2._.js.map