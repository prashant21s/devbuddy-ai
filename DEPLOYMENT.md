# Deploy DevBuddy AI

This project can deploy as one Vercel app. The frontend pages and backend route handlers share the same domain, so the final result is a single website link.

## Required Production Variables

Set these in Vercel Project Settings before deploying:

- `DATABASE_URL`
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_MODEL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

Optional integrations:

- `PINECONE_API_KEY`
- `PINECONE_INDEX`
- `REDIS_URL`
- `JSEARCH_API_KEY`

## Vercel CLI

```bash
npm install
npm run build
npx vercel --prod
```

After Vercel finishes, it prints the production URL. That URL is the one-click website link.

## Current Integration Mode

Without provider keys, the app uses deterministic demo analyzers so the complete product flow still works. When `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL` are present, interview and roadmap routes call Claude through the Messages API.
