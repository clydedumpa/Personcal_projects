# Clyde Dumpa MVP

Single-page Next.js portfolio with a profile-driven digital twin chat.

## Commands

```bash
npm run dev
npm run lint
npm run test:unit
npm run test:e2e
npm run build
```

## Environment

- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`
- `OPENROUTER_MODELS`

The chat route uses OpenRouter for the digital twin.

Optional:

- `NEXT_PUBLIC_KANBAN_STUDIO_URL` adds a live "Open live app" link to the Kanban Studio portfolio card.

## Deploy

Recommended host: Vercel

1. Push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. If the repo contains the parent `site/` folder, set the Vercel Root Directory to `site/frontend`.
4. Add `OPENROUTER_API_KEY` in the Vercel project environment settings.
5. Optionally add `OPENROUTER_MODEL` or `OPENROUTER_MODELS`.
6. If Kanban Studio is deployed separately, add `NEXT_PUBLIC_KANBAN_STUDIO_URL` with that public URL.
7. Deploy.

## Updating portfolio items

Portfolio cards are data-driven in `src/content/profile.ts`.

1. Update the `portfolio` array with a title, summary, highlights, and optional link.
2. Commit and push to `main`.
3. If Vercel is connected, the site redeploys automatically.
