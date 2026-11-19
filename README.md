# AI Mock Interview & Career Intelligence Platform

Full-stack technical interview preparation and career intelligence platform built on **Next.js 16 (React 19, TypeScript, Tailwind CSS v4)** in `client/` and **Node.js / Express 5 + MongoDB / Mongoose** in `server/`.

---

## Core Platform Pillars

1. **Permanent First-Class Resume Analyzer (`/dashboard/resume`, `/api/resume/*`)**
   - Magic-byte + MIME + 5 MB validated upload for PDF, DOCX, and TXT files.
   - SHA-256 idempotency, multi-version history, side-by-side version comparison (`v1` vs `v2` score & skill deltas).
   - Structured ATS quality scoring (0–100 + 5 section dimensions), deterministic + AI Job Description keyword matching, and STAR impact bullet rewrites.
   - Companion **ATS Resume Builder & PDF Export** (`/dashboard/resume/builder`).
2. **Unified AI Mock Interview Studio (`/dashboard/interview`, `/dashboard/history`, `/api/interviews/*`)**
   - 12 canonical technical domains shared between frontend and backend (`GET /api/domains`).
   - Adaptive AI multi-turn conversation mode AND Structured Assessment mode.
   - Optional **Resume-Tailored** question generation grounded in the candidate's active CV.
   - Browser-native **Voice dictation** (Web Speech API + optional read-aloud TTS) and privacy-first **Local Camera Self-View** (explicit consent; video stays strictly local in the browser).
   - Rich Chart.js **ResultsDashboard** with 5 charts, skill gap breakdown, collapsible Q&A review, prioritized learning roadmap, and print-to-PDF export.
3. **Career Intelligence Suite (`/dashboard/career`, `/dashboard/jobs`, `/api/career/*`, `/api/jobs/*`, `/api/notifications/*`)**
   - Live Student Dashboard (`/dashboard`) computing composite Career Readiness Score.
   - Career path recommendations, verified skill inventory (Profile + Resume + Interviews), and interactive learning roadmap milestone tracker.
   - Job Matching & Application Tracker with automatic Resume-to-JD match scoring.
4. **Account, Privacy & RBAC Admin Console (`/dashboard/profile`, `/admin`, `/api/profile/*`, `/api/admin/*`)**
   - JWT authentication, `ProtectedRoute` guards, career profile editor, privacy/consent controls, one-click JSON data export, and account deletion confirmation.
   - Role-based Admin Console (`requireRole("admin")`) with platform KPIs and user role management.

---

## Architecture & Security

- **Single Backend Source of Truth:** All secrets (`MONGO_URI`, `JWT_SECRET`, `ANTHROPIC_API_KEY`, `GROQ_API_KEY`) stay strictly inside `server/`.
- **Unified AI Provider Abstraction (`server/src/services/aiService.js`):** Anthropic primary with automatic Groq fallback, timeouts, exponential backoff retries on transient 429/5xx errors, balanced JSON extraction, and prompt-injection delimiter neutralization.
- **Security Hardening:** Security headers, scoped CORS allowlist, per-route rate limiting (`RateLimit-*` + `429`), request correlation IDs (`X-Request-Id`), redacted structured operational logging, ObjectId validation middleware, and consistent `{ success, code, message, requestId }` error contracts.

---

## Quick Start

### 1. Configure Environment Variables

- **Backend:** Copy `server/.env.example` → `server/.env` and set valid values for:
  - `MONGO_URI` (replace `<username>`, `<password>`, `<cluster>` and include database name e.g. `/ai_mock_interview`)
  - `JWT_SECRET` (minimum 16+ random chars)
  - `ANTHROPIC_API_KEY` and/or `GROQ_API_KEY`
- **Frontend:** Copy `client/.env.example` → `client/.env.local`:
  - `NEXT_PUBLIC_API_URL=http://localhost:5000`
  - `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

### 2. Run Locally

```bash
# Backend (port 5000)
npm --prefix server run dev

# Frontend (port 3000)
npm --prefix client run dev
```

---

## Automated Testing & Quality Verification

```bash
# Backend unit & HTTP integration test suite (Node 24 built-in runner)
npm --prefix server test

# Frontend TypeScript check, ESLint, and production build
npx --prefix client tsc -p client/tsconfig.json --noEmit --incremental false
npm --prefix client run lint
npm --prefix client run build -- --webpack
```
