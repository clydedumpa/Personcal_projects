# Process List

## 1. Requirement intake and project framing

- Read [AGENTS.md](/Users/clyde.dumpa/Documents/Projects/site/AGENTS.md) and the generated Next.js agent guidance in [AGENTS.md](/Users/clyde.dumpa/Documents/Projects/site/frontend/AGENTS.md).
- Confirmed the workspace started with only a resume PDF and no existing app implementation.
- Confirmed the chat integration should use the existing `OPENROUTER_API_KEY` from `site/.env`.

## 2. Resume extraction and content modeling

- Extracted the text from `Profile.pdf` with a local Swift `PDFKit` command.
- Converted the resume into structured website content in [src/content/profile.ts](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/content/profile.ts).
- Organized the profile into hero copy, operating modes, experience entries, certifications, education, languages, starter questions, strengths, and toolbelt items.

## 3. App scaffolding

- Created the Next.js app in `site/frontend`.
- Installed runtime and dev dependencies for motion, environment loading, unit testing, and Playwright.
- Updated package scripts in [package.json](/Users/clyde.dumpa/Documents/Projects/site/frontend/package.json) for `lint`, `test:unit`, `test:e2e`, `build`, and localhost-bound `dev` and `start`.

## 4. Core website implementation

- Replaced the default starter page with the portfolio page in [src/app/page.tsx](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/app/page.tsx).
- Added the main interactive experience in [src/components/portfolio-showcase.tsx](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/components/portfolio-showcase.tsx).
- Built the visual system and responsive layout in [src/components/portfolio-showcase.module.css](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/components/portfolio-showcase.module.css) and [src/app/globals.css](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/app/globals.css).
- Updated metadata in [src/app/layout.tsx](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/app/layout.tsx).
- Removed the unused starter stylesheet [src/app/page.module.css](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/app/page.module.css).

## 5. Digital twin chat

- Added the OpenRouter-backed route handler in [src/app/api/chat/route.ts](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/app/api/chat/route.ts).
- Added chat prompt construction and response parsing in [src/lib/chat.ts](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/lib/chat.ts).
- Added environment fallback loading in [src/lib/env.ts](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/lib/env.ts) so the app can read either `frontend/.env.local` or `site/.env`.
- Added [\.env.example](/Users/clyde.dumpa/Documents/Projects/site/frontend/.env.example).

## 6. Testing and verification setup

- Added Vitest configuration in [vitest.config.ts](/Users/clyde.dumpa/Documents/Projects/site/frontend/vitest.config.ts).
- Added test setup helpers in [test/setup.ts](/Users/clyde.dumpa/Documents/Projects/site/frontend/test/setup.ts).
- Added unit tests in [src/components/portfolio-showcase.test.tsx](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/components/portfolio-showcase.test.tsx).
- Added Playwright configuration in [playwright.config.ts](/Users/clyde.dumpa/Documents/Projects/site/frontend/playwright.config.ts).
- Added the browser integration spec in [tests/home.spec.ts](/Users/clyde.dumpa/Documents/Projects/site/frontend/tests/home.spec.ts).

## 7. Design and UX polish pass

- Performed a visual self-review using a rendered local screenshot.
- Strengthened the hero contrast and overall page readability.
- Added a sticky top navigation for section jumping.
- Added a stronger right-hand spotlight panel with strengths, toolbelt, and active-lane focus.
- Improved chat trust and live-state feedback with:
  - a trust note
  - `aria-live` transcript behavior
  - a visible pending assistant message
  - clearer focus styles

## 8. Documentation and handoff

- Replaced the starter README with the project-specific [README.md](/Users/clyde.dumpa/Documents/Projects/site/frontend/README.md).
- Added this file: [PROCESSLIST.md](/Users/clyde.dumpa/Documents/Projects/site/frontend/PROCESSLIST.md).
- Added the self-review file: [REVIEW.md](/Users/clyde.dumpa/Documents/Projects/site/frontend/REVIEW.md).

## 9. Verification performed

- Ran `npm run lint`
- Ran `npm run test:unit`
- Ran `npm run test:e2e`
- Ran `npm run build`

## 10. Live server status

- Started the production server with `npm run start`
- Final local URL: `http://127.0.0.1:3000`

## 11. Portfolio expansion update

- Added a `Portfolio` tab to the sticky top navigation.
- Added a dedicated portfolio section in [src/components/portfolio-showcase.tsx](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/components/portfolio-showcase.tsx).
- Made portfolio entries data-driven in [src/content/profile.ts](/Users/clyde.dumpa/Documents/Projects/site/frontend/src/content/profile.ts) so future work can be added without changing layout code.
- Documented the update path in [README.md](/Users/clyde.dumpa/Documents/Projects/site/frontend/README.md).
