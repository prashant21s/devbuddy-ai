# DevBuddy AI Architecture

DevBuddy AI is a placement-readiness platform with a Next.js App Router frontend, a PostgreSQL persistence layer, and AI/provider adapters for profile analysis, mock interviews, job matching, and personalized roadmaps.

## Runtime Shape

- Frontend: Next.js App Router, Tailwind CSS, dashboard-first UI.
- Backend for frontend: Next route handlers under `app/api/*`.
- Data: PostgreSQL via Prisma, Redis for cache/session-adjacent provider responses, Pinecone for job/resume vectors.
- AI services: Claude for interview and roadmap reasoning, OpenAI-compatible embeddings for job matching, Python/FastAPI workers for PDF and scraping-heavy analysis.
- Auth: NextAuth GitHub OAuth with Prisma-backed users.

## Core Flow

1. User connects resume, GitHub, LeetCode, and portfolio sources.
2. Source adapters normalize metrics into `ProfileAnalysis` records.
3. The score engine computes placement readiness from DSA, projects, resume, GitHub, and communication.
4. Weak areas drive the mock interview prompt and weekly roadmap.
5. Resume embeddings and normalized skills rank fetched jobs into `JobMatch` records.

## API Surface

- `POST /api/profile/analyze`: source analysis adapter entrypoint.
- `POST /api/score`: placement score formula.
- `POST /api/interview`: multi-turn mock interview response.
- `POST /api/roadmap`: weekly roadmap JSON.
- `POST /api/jobs/match`: job matching scaffold.

Current route handlers return deterministic demo data so the UI can be wired before API keys and microservices are introduced.
