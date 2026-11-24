(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/history/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InterviewHistoryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/chart.js/dist/chart.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-chartjs-2/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ProtectedRoute.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/domains.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Chart"].register(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CategoryScale"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LinearScale"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PointElement"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LineElement"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BarElement"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Tooltip"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Legend"]);
function formatDuration(sec) {
    if (!sec || sec < 60) return `${Math.max(0, sec)}s`;
    return `${Math.round(sec / 60)}m`;
}
function formatDate(iso) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "Recent";
    return d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}
function HistoryWorkspace() {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [analytics, setAnalytics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [total, setTotal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [domainFilter, setDomainFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("recent");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [reloadTick, setReloadTick] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HistoryWorkspace.useEffect": ()=>{
            let active = true;
            const params = new URLSearchParams({
                page: String(page),
                limit: "10"
            });
            if (domainFilter) params.set("domain", domainFilter);
            if (statusFilter) params.set("status", statusFilter);
            if (sortBy === "score") params.set("sort", "score");
            Promise.allSettled([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/api/interviews/history?${params.toString()}`),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])("/api/interviews/analytics")
            ]).then({
                "HistoryWorkspace.useEffect": ([histRes, anaRes])=>{
                    if (!active) return;
                    if (histRes.status === "fulfilled") {
                        setItems(histRes.value.interviews || []);
                        setTotal(histRes.value.total || 0);
                        setTotalPages(histRes.value.totalPages || 1);
                        setError("");
                    } else {
                        setError(histRes.reason instanceof Error ? histRes.reason.message : "Unable to load interview history.");
                    }
                    if (anaRes.status === "fulfilled") {
                        setAnalytics(anaRes.value);
                    }
                }
            }["HistoryWorkspace.useEffect"]).finally({
                "HistoryWorkspace.useEffect": ()=>{
                    if (active) setLoading(false);
                }
            }["HistoryWorkspace.useEffect"]);
            return ({
                "HistoryWorkspace.useEffect": ()=>{
                    active = false;
                }
            })["HistoryWorkspace.useEffect"];
        }
    }["HistoryWorkspace.useEffect"], [
        page,
        domainFilter,
        statusFilter,
        sortBy,
        reloadTick
    ]);
    async function handleDelete(id) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/api/interviews/${id}`, {
                method: "DELETE"
            });
            setReloadTick((t)=>t + 1);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to delete session.");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-slate-50 pb-16 pt-8 text-gray-900",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-6xl px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-bold uppercase tracking-wider text-indigo-600",
                                    children: "Interview History & Performance Comparison"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "mt-1 text-2xl font-extrabold tracking-tight text-gray-900",
                                    children: [
                                        "My Interview Sessions (",
                                        total,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/history/page.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dashboard/interview",
                            className: "rounded-full bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700",
                            children: "+ Start Live 10-Question Interview"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/history/page.tsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/history/page.tsx",
                    lineNumber: 177,
                    columnNumber: 9
                }, this),
                analytics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-base font-bold text-gray-900",
                            children: "Performance Comparison Across Attempts"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/history/page.tsx",
                            lineNumber: 198,
                            columnNumber: 13
                        }, this),
                        !analytics.hasComparison ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 text-xs leading-5 text-indigo-950",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold",
                                    children: analytics.totalCompleted === 1 ? "1 completed interview recorded — complete a second interview to unlock comparison charts." : "No completed interviews yet."
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 204,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-indigo-800",
                                    children: analytics.message || "We never display fabricated comparison metrics. Once you complete at least 2 interviews, previous vs. latest score delta, topic-wise progress, and weakness reduction will appear automatically."
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 209,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/history/page.tsx",
                            lineNumber: 203,
                            columnNumber: 15
                        }, this) : analytics.comparison && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-3.5 lg:grid-cols-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/dashboard/interview?id=${analytics.comparison.previousId}`,
                                            className: "block rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/40",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] font-semibold text-gray-500",
                                                    children: "Previous Score →"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-2xl font-extrabold text-gray-900",
                                                    children: [
                                                        analytics.comparison.previousScore,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-gray-500",
                                                    children: analytics.comparison.previousDomain
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                            lineNumber: 218,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/dashboard/interview?id=${analytics.comparison.latestId}`,
                                            className: "block rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/40",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] font-semibold text-gray-500",
                                                    children: "Latest Score →"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-2xl font-extrabold text-indigo-700",
                                                    children: [
                                                        analytics.comparison.latestScore,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-gray-500",
                                                    children: analytics.comparison.latestDomain
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                            lineNumber: 233,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-gray-100 bg-gray-50 p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] font-semibold text-gray-500",
                                                    children: "Score Improvement"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `mt-1 text-2xl font-extrabold ${analytics.comparison.scoreImprovement >= 0 ? "text-emerald-700" : "text-red-600"}`,
                                                    children: [
                                                        analytics.comparison.scoreImprovement >= 0 ? "+" : "",
                                                        analytics.comparison.scoreImprovement,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-gray-500",
                                                    children: "vs previous attempt"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                            lineNumber: 248,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-gray-100 bg-gray-50 p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] font-semibold text-gray-500",
                                                    children: "Weakness Reduction"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-2xl font-extrabold text-gray-900",
                                                    children: [
                                                        analytics.comparison.weaknessReduction >= 0 ? "-" : "+",
                                                        Math.abs(analytics.comparison.weaknessReduction),
                                                        " topics"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-gray-500",
                                                    children: [
                                                        analytics.comparison.previousWeakTopics,
                                                        " →",
                                                        " ",
                                                        analytics.comparison.latestWeakTopics,
                                                        " weak"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                            lineNumber: 267,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-gray-100 bg-gray-50 p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] font-semibold text-gray-500",
                                                    children: "Readiness Change"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs font-extrabold text-indigo-800",
                                                    children: analytics.comparison.previousReadiness
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-extrabold text-emerald-700",
                                                    children: [
                                                        "→ ",
                                                        analytics.comparison.latestReadiness
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                            lineNumber: 281,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 217,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-6 lg:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-gray-100 p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mb-3 text-xs font-bold text-gray-800",
                                                    children: "Score Progression Across Completed Attempts"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative h-56",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                                                        data: {
                                                            labels: analytics.scoreTimeline.map((item)=>`#${item.attempt} ${item.domain.slice(0, 12)}`),
                                                            datasets: [
                                                                {
                                                                    label: "Interview Score (%)",
                                                                    data: analytics.scoreTimeline.map((i)=>i.score),
                                                                    borderColor: "#4f46e5",
                                                                    backgroundColor: "rgba(79,70,229,0.15)",
                                                                    tension: 0.3
                                                                }
                                                            ]
                                                        },
                                                        options: {
                                                            responsive: true,
                                                            maintainAspectRatio: false,
                                                            animation: false,
                                                            scales: {
                                                                y: {
                                                                    min: 0,
                                                                    max: 100
                                                                }
                                                            }
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/history/page.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                            lineNumber: 295,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-gray-100 p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mb-3 text-xs font-bold text-gray-800",
                                                    children: "Latest Topic Performance Comparison"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative h-56",
                                                    children: analytics.topicProgress.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                                                        data: {
                                                            labels: analytics.topicProgress.map((t)=>t.topic),
                                                            datasets: [
                                                                {
                                                                    label: "Latest (%)",
                                                                    data: analytics.topicProgress.map((t)=>t.latestPercent),
                                                                    backgroundColor: "#0891b2",
                                                                    borderRadius: 6
                                                                }
                                                            ]
                                                        },
                                                        options: {
                                                            responsive: true,
                                                            maintainAspectRatio: false,
                                                            animation: false,
                                                            scales: {
                                                                y: {
                                                                    min: 0,
                                                                    max: 100
                                                                }
                                                            }
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/history/page.tsx",
                                                        lineNumber: 333,
                                                        columnNumber: 27
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "flex h-full items-center justify-center text-xs text-gray-400",
                                                        children: "Topic breakdown will populate as topics repeat across attempts."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/history/page.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                            lineNumber: 327,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 294,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/history/page.tsx",
                            lineNumber: 216,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/history/page.tsx",
                    lineNumber: 197,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-6 flex flex-wrap gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            "aria-label": "Filter by domain",
                            value: domainFilter,
                            onChange: (e)=>{
                                setLoading(true);
                                setPage(1);
                                setDomainFilter(e.target.value);
                            },
                            className: "rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "All Domains"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 380,
                                    columnNumber: 13
                                }, this),
                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$domains$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAINS"].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: d.id,
                                        children: d.title
                                    }, d.id, false, {
                                        fileName: "[project]/app/dashboard/history/page.tsx",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/history/page.tsx",
                            lineNumber: 370,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            "aria-label": "Filter by status",
                            value: statusFilter,
                            onChange: (e)=>{
                                setLoading(true);
                                setPage(1);
                                setStatusFilter(e.target.value);
                            },
                            className: "rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "All Statuses"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 398,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "completed",
                                    children: "Completed"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 399,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "in_progress",
                                    children: "In Progress"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 400,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/history/page.tsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            "aria-label": "Sort sessions",
                            value: sortBy,
                            onChange: (e)=>{
                                setLoading(true);
                                setPage(1);
                                setSortBy(e.target.value);
                            },
                            className: "rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "recent",
                                    children: "Newest First"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 413,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "score",
                                    children: "Highest Score"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 414,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/history/page.tsx",
                            lineNumber: 403,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/history/page.tsx",
                    lineNumber: 369,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    role: "alert",
                    className: "mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/history/page.tsx",
                    lineNumber: 419,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm",
                    children: [
                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 animate-pulse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-16 rounded-xl bg-gray-100"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 431,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-16 rounded-xl bg-gray-100"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 432,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/history/page.tsx",
                            lineNumber: 430,
                            columnNumber: 13
                        }, this) : items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-12 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-gray-800",
                                    children: "No matching interview sessions"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 436,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs text-gray-500",
                                    children: "Start a live 10-question mock interview or adjust your filters above."
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 439,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard/interview",
                                    className: "mt-4 inline-block rounded-full bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-700",
                                    children: "Start Practicing"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 442,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/history/page.tsx",
                            lineNumber: 435,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "divide-y divide-gray-100",
                            children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex flex-wrap items-center justify-between gap-4 py-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-sm font-bold text-gray-900",
                                                            children: item.domain
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                                            lineNumber: 458,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold capitalize text-gray-600",
                                                            children: [
                                                                item.questionCount,
                                                                "Q · ",
                                                                item.difficulty
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                                            lineNumber: 461,
                                                            columnNumber: 23
                                                        }, this),
                                                        item.selectionDecision && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${item.selectionDecision === "RECOMMENDED" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`,
                                                            children: item.selectionDecision
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                                            lineNumber: 465,
                                                            columnNumber: 25
                                                        }, this),
                                                        item.integrityRiskLevel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600",
                                                            children: item.integrityRiskLevel
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                                            lineNumber: 476,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 457,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs text-gray-500",
                                                    children: [
                                                        formatDate(item.createdAt),
                                                        " · ",
                                                        item.questionsAnswered,
                                                        "/",
                                                        item.questionCount,
                                                        " answered · ",
                                                        formatDuration(item.duration),
                                                        item.performanceBand ? ` · ${item.performanceBand}` : ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                            lineNumber: 456,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `rounded-full px-3 py-1 text-xs font-bold ${item.isComplete ? "bg-indigo-50 text-indigo-700" : "bg-amber-50 text-amber-700"}`,
                                                    children: item.isComplete ? `${item.score}/100` : "In progress"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 489,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/dashboard/interview?id=${item.id}`,
                                                    className: "rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700",
                                                    children: item.isComplete ? "View Results" : "Resume"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>void handleDelete(item.id),
                                                    className: "rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50",
                                                    children: "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                                    lineNumber: 506,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/history/page.tsx",
                                            lineNumber: 488,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 452,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/history/page.tsx",
                            lineNumber: 450,
                            columnNumber: 13
                        }, this),
                        totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: page <= 1,
                                    onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                    className: "rounded-full border border-gray-200 px-4 py-1.5 font-semibold text-gray-700 disabled:opacity-40",
                                    children: "← Previous"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 521,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gray-500",
                                    children: [
                                        "Page ",
                                        page,
                                        " of ",
                                        totalPages
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 529,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: page >= totalPages,
                                    onClick: ()=>setPage((p)=>Math.min(totalPages, p + 1)),
                                    className: "rounded-full border border-gray-200 px-4 py-1.5 font-semibold text-gray-700 disabled:opacity-40",
                                    children: "Next →"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/history/page.tsx",
                                    lineNumber: 532,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/history/page.tsx",
                            lineNumber: 520,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/history/page.tsx",
                    lineNumber: 428,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/history/page.tsx",
            lineNumber: 176,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/history/page.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
_s(HistoryWorkspace, "5lxc7B0ij9xPy/Qo6FVQ9oOZcRo=");
_c = HistoryWorkspace;
function InterviewHistoryPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HistoryWorkspace, {}, void 0, false, {
            fileName: "[project]/app/dashboard/history/page.tsx",
            lineNumber: 551,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/history/page.tsx",
        lineNumber: 550,
        columnNumber: 5
    }, this);
}
_c1 = InterviewHistoryPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "HistoryWorkspace");
__turbopack_context__.k.register(_c1, "InterviewHistoryPage");
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

//# sourceMappingURL=_0xr1fzd89tud8._.js.map