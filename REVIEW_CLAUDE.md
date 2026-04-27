# Portfolio Site — Comprehensive Review
> Reviewed by Claude Sonnet 4.6 on 2026-04-22
> Project: Personal portfolio site for Clyde Dumpa (Next.js 15, React 19, Framer Motion, OpenRouter AI chat)

---

## Summary

A single-page Next.js portfolio with hero, operating modes selector, career arc, portfolio cards, credentials, and a digital twin chat. Overall quality is solid for an MVP — TypeScript strict mode, good accessibility groundwork, clean data/UI separation. The issues below are prioritized by impact.

---

## Checklist

### P0 — Critical (Fix Before Going Live)

- [ ] **Rotate the live OpenRouter API key** — The key at `site/.env` (`sk-or-v1-...`) is on disk. Revoke it, generate a new one, and store it only in the Vercel environment dashboard. Never keep live API keys in `.env` files that aren't in `.gitignore` of every enclosing git context.
  - File: `site/.env`

- [ ] **Add rate limiting to `/api/chat`** — The chat endpoint is fully public with no throttling. Any actor can call it in a loop and exhaust OpenRouter credits. Use Vercel's built-in rate limiting or an edge middleware with IP-based counters.
  - File: `site/frontend/src/app/api/chat/route.ts`

---

### P1 — High Priority

- [ ] **Add fetch timeout to the OpenRouter call** — `fetch()` at `route.ts:51` has no `signal` or timeout. A hung upstream will stall the route indefinitely. Fix: `signal: AbortSignal.timeout(15000)`.
  - File: `site/frontend/src/app/api/chat/route.ts:51`

- [ ] **Add `prefers-reduced-motion` support** — `globals.css` sets `scroll-behavior: smooth` globally with no `@media (prefers-reduced-motion: reduce)` override. None of the Framer Motion animations check for this. Users who have disabled motion in their OS settings will see all entrance animations regardless.
  - Files: `site/frontend/src/app/globals.css:15`, all Framer Motion `motion.*` elements in `portfolio-showcase.tsx`
  - Fix for CSS:
    ```css
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
    }
    ```
  - Fix for Framer Motion: use `useReducedMotion()` hook to disable transitions conditionally.

- [ ] **Add Open Graph / social metadata** — Only `title` and `description` are set in `layout.tsx`. Sharing the URL on LinkedIn or Twitter produces a plain link with no preview card. Add `og:image`, `og:type`, `og:url`, `twitter:card`, `twitter:image`.
  - File: `site/frontend/src/app/layout.tsx:5–9`

- [ ] **Add `robots.txt` and `sitemap.xml`** — The `public/` directory has none. Next.js App Router supports generating these from `app/robots.ts` and `app/sitemap.ts`.
  - File: `site/frontend/public/`

---

### P2 — Medium Priority

- [ ] **Cap message content length in `sanitizeMessages()`** — The sanitizer validates role and emptiness but does not limit individual message length. A 100,000-character message inflates the prompt and burns tokens. Add a max length check (e.g., `<= 2000` chars).
  - File: `site/frontend/src/lib/chat.ts:33–51`

- [ ] **Add HTTP security headers** — `next.config.ts` has no `headers()` export. Add at minimum: `Content-Security-Policy`, `X-Frame-Options: DENY`, `Strict-Transport-Security`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`.
  - File: `site/frontend/next.config.ts`

- [ ] **Stop forwarding raw upstream error details to the client** — `route.ts:85–89` returns the raw OpenRouter error body (`details`) to the browser. This can expose internal routing info. Strip `details` from the client response in production.
  - File: `site/frontend/src/app/api/chat/route.ts:85–89`

- [ ] **Add a "Skip to main content" link** — Keyboard users must tab through the entire sticky nav before reaching any content. Add a visually hidden skip link as the first focusable element in the `<body>`.
  - File: `site/frontend/src/app/layout.tsx`

- [ ] **Fix focus outline contrast** — The focus outline is `rgba(32, 157, 215, 0.35)` — 35% opacity. This is unlikely to pass WCAG 2.2 focus indicator contrast on some backgrounds. Increase to full opacity: `3px solid #209dd7`.
  - File: `site/frontend/src/components/portfolio-showcase.module.css:821`

- [ ] **Convert bullet-point `<p>` tags to `<ul>/<li>`** — Career highlights, portfolio highlights, and credential items use `<p>` elements with CSS pseudo-element bullets. Screen readers announce `<ul>` lists with item count. Replace with semantic lists.
  - File: `site/frontend/src/components/portfolio-showcase.tsx:309, 351, 407–425`

- [ ] **Fix DOM section order to match nav order** — The nav lists: Modes → Portfolio → Career → Credentials → Chat. The DOM renders: Modes → Career → Portfolio → Credentials → Chat. Clicking "Portfolio" in the nav skips over "Career" on screen. Reorder the DOM sections to match the nav.
  - Files: `site/frontend/src/components/portfolio-showcase.tsx:140` (nav), `:284` (career-arc), `:327` (portfolio-work)

- [ ] **Remove hardcoded Railway fallback URL in `profile.ts`** — `profile.ts:63–64` falls back to a hardcoded Railway URL for Kanban Studio. If that URL ever goes dead, a broken link will appear on the live portfolio. Change the fallback to `undefined` / empty string so the link simply doesn't render when the env var is absent.
  - File: `site/frontend/src/content/profile.ts:63–64`

---

### P3 — Low Priority / Polish

- [ ] **Add Cmd/Ctrl+Enter keyboard shortcut to submit chat** — Users expect this in textarea-based chat UIs. Add an `onKeyDown` handler.
  - File: `site/frontend/src/components/portfolio-showcase.tsx:504–511`

- [ ] **Add an error boundary for the portfolio page** — If `PortfolioShowcase` throws, the page goes blank. Add `app/error.tsx` for a graceful fallback.
  - File: `site/frontend/src/app/` (missing `error.tsx`)

- [ ] **Split `portfolio-showcase.tsx` into sub-components** — At 534 lines, the file contains the entire page: hero, nav, modes, career, portfolio, credentials, and chat. Extract into: `HeroSection`, `OperatingModesSection`, `CareerSection`, `PortfolioSection`, `CredentialsSection`, `ChatConsole`.
  - File: `site/frontend/src/components/portfolio-showcase.tsx`

- [ ] **Type `categoryId` as a union instead of `string`** — `ExperienceEntry.categoryId` is typed as `string`. It should be `"consulting" | "support" | "workplace" | "teaching"` to catch typos at compile time.
  - File: `site/frontend/src/content/profile.ts:16`

- [ ] **Move `dotenv` to `devDependencies`** — `dotenv` is a runtime dependency but is only needed locally to load the parent `site/.env`. On Vercel, env vars are injected directly. Downgrade to `devDependencies` or remove the parent-folder fallback logic once deployed.
  - File: `site/frontend/package.json:15`

- [ ] **Remove unused default Next.js scaffold assets** — `public/` contains `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` from `create-next-app`. None are used in the app.
  - File: `site/frontend/public/`

- [ ] **Add cross-browser Playwright test projects** — Only Chromium is configured. `backdrop-filter` and `mask-image` have Safari quirks. Add Firefox and WebKit projects.
  - File: `site/frontend/playwright.config.ts:14–17`

- [ ] **Align nav label text with section headings** — Nav says "Modes" / "Career" / "Credentials" but sections say "Operating modes" / "Career arc" / "Credibility stack". Minor, but inconsistent for screen reader users navigating by both.
  - Files: `site/frontend/src/components/portfolio-showcase.tsx:139` (nav), `:255` (section headings)

- [ ] **Hardcode the `HTTP-Referer` header in the OpenRouter call** — Currently reflects `request.headers.get("origin")` (user-supplied). Hardcode to the production domain for clarity.
  - File: `site/frontend/src/app/api/chat/route.ts:56`

- [ ] **Fix the `envLoaded` singleton assumption in `env.ts`** — The module-level `let envLoaded = false` guard assumes warm Lambda reuse in serverless. Since Next.js already handles `.env` loading natively, the entire `loadServerEnv()` function may be removable.
  - File: `site/frontend/src/lib/env.ts:8`

---

### P4 — Nice to Have

- [ ] **Add `aria-label="Conversation transcript"` to the chat log** — The `role="log"` element has no accessible name, making it undiscoverable for screen reader users navigating by landmarks.
  - File: `site/frontend/src/components/portfolio-showcase.tsx` (the `role="log"` div)

- [ ] **Replace `<motion.aside>` with `<motion.section>` for hero panel and chat intro** — `<aside>` is for tangentially related content. These are central UI panels.
  - File: `site/frontend/src/components/portfolio-showcase.tsx:189, 435`

- [ ] **Add favicon variants** — Add `apple-touch-icon` (180×180), `icon.png` at multiple sizes, and optionally a `manifest.json` for PWA/homescreen support.
  - File: `site/frontend/public/`

- [ ] **Add a `<link rel="canonical">` tag** — Prevents duplicate indexing if the site is ever served from multiple URLs.
  - File: `site/frontend/src/app/layout.tsx`

- [ ] **Use stable message keys in the chat transcript** — Keys like `` `${message.role}-${index}-...` `` use the array index. Assign a `crypto.randomUUID()` or incrementing ID to each message when it is created.
  - File: `site/frontend/src/components/portfolio-showcase.tsx:479`

- [ ] **Note `"Iowan Old Style"` as a macOS/iOS-only font** — This font renders as `Georgia` on Windows/Android/Linux. Either accept the platform difference or load a web font for cross-platform consistency.
  - File: `site/frontend/src/components/portfolio-showcase.module.css:191`

---

## Issue Count by Priority

| Priority | Count |
|----------|-------|
| P0 — Critical | 2 |
| P1 — High | 4 |
| P2 — Medium | 8 |
| P3 — Low / Polish | 11 |
| P4 — Nice to Have | 6 |
| **Total** | **31** |
