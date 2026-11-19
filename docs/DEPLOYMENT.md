# Production Deployment Guide

## Architecture Overview

- **Frontend (`client/`):** Next.js 16 (React 19 + TypeScript + Tailwind CSS v4) — deploy on **Vercel**.
- **Backend (`server/`):** Node.js 20+/24 + Express 5 — deploy on **Render** or **Railway**.
- **Database:** Managed **MongoDB Atlas** (M0 free tier or M10+ dedicated cluster).

---

## 1. Deploy Backend (`server/`) on Render / Railway

1. Create a new Web Service connected to this repository with **Root Directory**: `server`.
2. Configure build & start commands:
   - **Build Command:** `npm ci`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
3. Set production environment variables (never commit secrets):
   - `NODE_ENV=production`
   - `PORT=5000` (or platform-injected `PORT`)
   - `CORS_ORIGIN=https://your-frontend.vercel.app`
   - `MONGO_URI=mongodb+srv://...`
   - `JWT_SECRET=<64-char random hex>`
   - `AI_PROVIDER_PRIMARY=anthropic` (or `groq`)
   - `ANTHROPIC_API_KEY=sk-ant-...`
   - `AI_MODEL=claude-sonnet-4-6`
   - `GROQ_API_KEY=gsk_...`
   - `GROQ_MODEL=llama-3.3-70b-versatile`
4. Verify `GET https://<your-backend>/api/health` returns `"database": "Connected"` and `aiProviders` reflects configured providers.

---

## 2. Deploy Frontend (`client/`) on Vercel

1. Import the repository in Vercel with **Root Directory**: `client`.
2. Configure build commands:
   - **Install Command:** `npm ci`
   - **Build Command:** `npm run build`
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL=https://<your-backend-domain>`
   - `NEXT_PUBLIC_SITE_URL=https://<your-frontend-domain>`
4. Deploy and update `CORS_ORIGIN` on the backend to include your exact Vercel production URL.

---

## 3. Production Security Checklist

- [ ] `NODE_ENV=production` enabled on backend (disables `devResetToken` preview in `/api/auth/forgot-password` and enforces strict CORS allowlist).
- [ ] `MONGO_URI` uses least-privilege Atlas database user and TLS.
- [ ] `JWT_SECRET` rotated with >= 256-bit cryptographically random key.
- [ ] Rate limiting thresholds tuned for expected user traffic.
- [ ] Real API keys are stored strictly in hosting provider secret managers, never in git or client bundles.
