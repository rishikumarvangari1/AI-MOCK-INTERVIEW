# Database Architecture & Setup Guide (MongoDB / Mongoose)

The platform persists all core domain data in **MongoDB** using **Mongoose 8** schemas located in `server/src/models/`.

## Collections & Ownership Model

Every private collection includes `userId` (indexed `ObjectId` ref `User`), timestamps (`createdAt`, `updatedAt`), and strict ownership enforcement (`{ _id, userId }`) on every read, update, and delete operation.

| Model File | Collection | Key Indexes & Constraints | Purpose |
|---|---|---|---|
| `User.js` | `users` | `email` (`unique`), `password` (`select: false`), `resetPasswordTokenHash` (`select: false`) | Auth credentials, RBAC `role`, profile, preferences, consent |
| `resume.js` | `resumes` | `{ userId: 1, createdAt: -1 }`, `{ userId: 1, isActive: 1 }`, `fileHash` | Multi-version uploaded resumes, parsed structure, ATS reports, JD matches, rewrites |
| `Interview.js` | `interviews` | `{ userId: 1, createdAt: -1 }` | Adaptive/Structured/Coding interview sessions, transcripts, evaluations, reports |
| `CareerPlan.js` | `careerplans` | `userId` (`unique`) | Target role, recommendations, 7/15/30/60/90-day roadmap milestones |
| `JobApplication.js` | `jobapplications` | `{ userId: 1, updatedAt: -1 }` | Job pipeline tracker with computed resume keyword match scores |
| `BuiltResume.js` | `builtresumes` | `userId` (`unique`) | Structured ATS resume builder drafts |
| `Notification.js` | `notifications` | `{ userId: 1, read: 1, createdAt: -1 }` | In-app reminders and milestone alerts |
| `Activity.js` | `activities` | `{ userId: 1, createdAt: -1 }` | User activity timeline for dashboard & analytics |
| `AdminAuditLog.js` | `adminauditlogs` | `{ createdAt: -1 }` | Immutable audit log of administrative actions |
| `QuestionBankItem.js` | `questionbankitems` | `domainId` | Admin-curated fallback interview questions |

## Local / Atlas Setup

1. Create a free MongoDB Atlas cluster (or run MongoDB locally via Docker: `docker run -d -p 27017:27017 --name mockinterview-mongo mongo:7`).
2. Copy `server/.env.example` to `server/.env`.
3. Set `MONGO_URI` with real credentials and an explicit database name (no `<...>` placeholders):
   ```env
   MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/ai_mock_interview?retryWrites=true&w=majority
   ```
   Or for local Docker MongoDB:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/ai_mock_interview
   ```
4. Boot the server (`npm --prefix server run dev`). Startup env validation in `server/src/config/env.js` immediately verifies `MONGO_URI` and `JWT_SECRET` before binding the port.

## Promoting an Admin User

To grant admin access to an existing registered user in MongoDB shell / Compass:
```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```
Sign out and sign back in so a fresh JWT containing `role: "admin"` is issued.
