# REST API Reference

Base URL (local development): `http://localhost:5001` (configurable via `PORT` in `server/.env` and `NEXT_PUBLIC_API_URL` in `client/.env.local`)

All JSON error responses follow a consistent envelope:
```json
{
  "success": false,
  "code": "ERROR_CODE",
  "message": "Human-readable explanation",
  "requestId": "uuid-v4"
}
```

Protected routes require header: `Authorization: Bearer <jwt>`.

---

## Health & Domains
- `GET /` — Service status text
- `GET /api/health` — Database connection status, AI provider availability, timestamp
- `GET /api/domains` — Canonical 22-domain catalog with topics and aliases

## Authentication (`/api/auth`)
- `POST /api/auth/register` — `{ name, email, password }` → `201 { success, token, user }`
- `POST /api/auth/login` — `{ email, password }` → `200 { success, token, user }`
- `POST /api/auth/forgot-password` — `{ email }` → `200 { success, message }` (returns `devResetToken` in non-production when SMTP is unconfigured)
- `POST /api/auth/reset-password` — `{ token, password }` → `200 { success, message }`
- `GET /api/auth/me` *(Auth)* — Current authenticated user

## Profile, Preferences & Privacy (`/api/profile`)
- `GET /api/profile` *(Auth)* — Profile, preferences, consent flags, completeness score
- `PATCH /api/profile` *(Auth)* — Update career profile, links, skills, and reminder/media preferences
- `PATCH /api/profile/consent` *(Auth)* — Update AI processing, local-media-only, and analytics consent
- `GET /api/profile/export` *(Auth)* — Export complete user data archive as JSON
- `DELETE /api/profile` *(Auth)* — `{ confirmText: "DELETE" }` permanently deletes user + resumes + interviews

## Dashboard & Analytics
- `GET /api/dashboard/summary` *(Auth)* — Aggregated KPIs, recent interviews, active resume snapshot, domain progress, readiness score
- `GET /api/analytics/overview?range=7d|30d|90d|all` *(Auth)* — Interview trend series, domain performance, topic strengths, resume ATS history, job match scores, roadmap stats, recent activities

## Resume Analyzer (`/api/resume`) — Permanent First-Class Feature
- `POST /api/resume/upload` *(Auth, multipart `resume`)* — Magic-byte + MIME + 5 MB validated upload (PDF/DOCX/TXT), SHA-256 idempotency, multi-version persistence, baseline ATS score, and evidence-based `domainRecommendations[]`
- `GET /api/resume/me` *(Auth)* — Active resume with parsed structure, ATS report, `domainRecommendations`, JD matches, rewrites
- `GET /api/resume/history?page=1&limit=10` *(Auth)* — Paginated version history
- `GET /api/resume/compare?v1=<id>&v2=<id>` *(Auth)* — Side-by-side ATS score, skill, and bullet delta comparison
- `GET /api/resume/:resumeId` *(Auth)* — Specific owned resume version
- `PATCH /api/resume/:resumeId/active` *(Auth)* — Switch active version
- `POST /api/resume/analyze` & `POST /api/resume/:resumeId/analyze` *(Auth)* — Deep AI structured ATS audit
- `POST /api/resume/match-jd` & `POST /api/resume/:resumeId/match-jd` *(Auth)* — `{ targetRole, jobDescription }` keyword & gap match
- `POST /api/resume/rewrite` & `POST /api/resume/:resumeId/rewrite` *(Auth)* — `{ targetRole }` STAR bullet & summary rewrites
- `DELETE /api/resume/me` & `DELETE /api/resume/:resumeId` *(Auth)* — Delete owned version (auto-promotes next latest if active)

## Resume Builder (`/api/resume-builder`)
- `GET /api/resume-builder` *(Auth)* — Load saved ATS builder draft (auto-seeded from Profile + Active Resume)
- `PUT /api/resume-builder` *(Auth)* — Save structured resume draft

## AI Mock Interviews (`/api/interviews`)
- `POST /api/interviews/start` *(Auth)* — `{ domainId, mode (default "structured"), interviewType, experienceLevel, difficulty, codingLanguage, questionCount (default 10), timeLimitSeconds (default 1800), useResume, resumeId, jobDescription, preventDuplicateSession }` — Generates 10 progressive questions with hidden server-side reference answers (NEVER exposed before submit) + server-authoritative countdown timer.
- `PUT /api/interviews/:interviewId/answers` *(Auth)* — `{ questionIndex, answer, clientUpdatedAt, durationSeconds }` or `{ answers: [...] }` — Debounced autosave with stale-overwrite protection.
- `POST /api/interviews/:interviewId/answer` *(Auth)* — Backward-compatible single answer endpoint.
- `POST /api/interviews/:interviewId/submit` & `POST /api/interviews/:interviewId/complete` *(Auth)* — Evaluates all 10 answers after submission using the 50% Semantic Relevance weighted rubric (`50% semantic, 20% technical, 15% completeness, 10% clarity, 5% practical`), computes `Overall Score = Sum / 10` (max 100), selection decision (`RECOMMENDED` / `NEEDS IMPROVEMENT`), skill gaps (`HIGH/MEDIUM/LOW`), AI-estimated alternative career domains, 5-level learning roadmap, and integrity report (idempotent on duplicate calls).
- `GET /api/interviews/:interviewId/results` *(Auth)* — Returns full post-submission results & reference answers (`409 INTERVIEW_NOT_SUBMITTED` before final submit).
- `POST /api/interviews/:interviewId/integrity` & `GET /api/interviews/:interviewId/integrity` *(Auth)* — Logs and retrieves transparent browser integrity telemetry (`tab_switch`, `window_blur`, `fullscreen_exit`, `paste_blocked`, `copy_blocked`, `timer_expired`) with `LOW RISK` / `MODERATE RISK` / `HIGH RISK` classification.
- `GET /api/interviews/history?page=1&limit=12&domain=&status=&sort=` *(Auth)* — Paginated, filterable session history with performance bands, selection decisions, and integrity risk levels.
- `GET /api/interviews/analytics` *(Auth)* — Attempt-over-attempt performance comparison (previous vs latest score, improvement delta, weakness reduction, score timeline, topic progress; honest empty state when `< 2` completed sessions).
- `GET /api/interviews/:interviewId` *(Auth)* — Single owned interview (redacts hidden reference answers and evaluations until submitted).
- `DELETE /api/interviews/:interviewId` *(Auth)* — Delete owned interview.

## Career Intelligence, Skill Gaps & Roadmaps (`/api/career`)
- `GET /api/career/overview` *(Auth)* — Skill inventory, 5-tier Skill Gap Analysis (`strong`, `intermediate`, `beginner`, `missing`, `recommended`), career recommendations, and active roadmap
- `POST /api/career/generate` *(Auth)* — `{ targetRole, durationDays: 7|15|30|60|90 }`
- `PATCH /api/career/roadmap/:milestoneId` *(Auth)* — `{ status: "todo"|"in_progress"|"done" }`

## Job Matching & Tracker (`/api/jobs`)
- `GET /api/jobs?status=&page=1&limit=20` *(Auth)* — Paginated tracked jobs
- `POST /api/jobs` *(Auth)* — Create tracked job + auto-score against active Resume
- `PATCH /api/jobs/:jobId` *(Auth)* — Update pipeline stage, location, or notes
- `DELETE /api/jobs/:jobId` *(Auth)* — Delete tracked job

## Notifications (`/api/notifications`)
- `GET /api/notifications` *(Auth)* — Recent notifications + `unreadCount`
- `PATCH /api/notifications/:notificationId/read` *(Auth)* — Mark single notification read
- `PATCH /api/notifications/read-all` *(Auth)* — Mark all notifications read

## AI Website Assistant (`/api/assistant`)
- `POST /api/assistant/chat` *(Public or Auth)* — `{ message, pageContext }` → Context-aware platform guide & interview/resume mentor. Uses the signed-in user's real resume skills, domain recommendations, and recent interview history when authenticated; persists conversation history to `AssistantConversation`.
- `GET /api/assistant/history` *(Auth)* — Returns persisted assistant messages for the authenticated user.
- `DELETE /api/assistant/history` *(Auth)* — Clears the authenticated user's persisted assistant conversation history.

## Admin Console (`/api/admin` — Requires `role: "admin"`)
- `GET /api/admin/overview` — Platform KPIs & AI provider status
- `GET /api/admin/users?page=1&limit=20` — Paginated user directory (password excluded)
- `PATCH /api/admin/users/:userId/role` — Update user role (`student` | `admin`; blocks self-demotion; logged)
- `GET /api/admin/audit-logs` — Recent administrative audit trail
- `GET /api/admin/question-bank` — List custom fallback question bank entries
- `POST /api/admin/question-bank` — Add custom fallback question (logged)
- `DELETE /api/admin/question-bank/:itemId` — Delete custom fallback question (logged)
