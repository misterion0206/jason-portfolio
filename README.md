# Yu-Chien (Jason) Chen — Portfolio

Personal portfolio and résumé site for a **.NET full-stack software engineer**, deployed at
**[jasonchen.website](https://www.jasonchen.website)**.

It presents experience, projects, and skills in three languages, serves a one-page ATS-friendly
résumé PDF, and includes an AI assistant that can answer visitor questions and navigate the page —
grounded strictly in the typed data in this repository.

## Features

- **Multilingual** — English, Traditional Chinese, and Spanish (`src/i18n/ui.ts`)
- **Light / dark / system themes** with no flash on load (`next-themes`)
- **AI chat widget** — Google Gemini with function calling, able to scroll to a section or open a
  link on the visitor's behalf
- **Résumé pipeline** — a maintainable HTML source compiled to a verified one-page PDF
- **Machine-readable profile** — `/llms.txt`, `Person` JSON-LD, sitemap, robots, OG image
- **Analytics** — Vercel Analytics

## Tech stack

| Area      | Technologies                                            |
| --------- | ------------------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19, TypeScript            |
| Styling   | Tailwind CSS v4                                         |
| Animation | Framer Motion                                           |
| AI        | `@google/genai` (Gemini), function calling              |
| Infra     | Upstash Redis (rate limiting), Vercel Analytics, Vercel |

## Getting started

```bash
npm ci
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

### Environment variables

Set these in `.env.local` for local development and in the Vercel project settings for deployment.
**Never commit real values** — `.env.example` documents the keys only.

| Variable            | Required           | Purpose                                                              |
| ------------------- | ------------------ | -------------------------------------------------------------------- |
| `GEMINI_API_KEY`    | yes, for the chat  | Server-side Google Gemini API key. Never exposed to the browser.      |
| `KV_REST_API_URL`   | yes, for the chat  | Upstash Redis REST URL, used for per-IP rate limiting on `/api/chat`. |
| `KV_REST_API_TOKEN` | yes, for the chat  | Upstash Redis REST token.                                            |

The rest of the site renders without these; only the chat widget needs them. `/api/chat` is
restricted to same-origin requests and limited to 10 messages per IP per hour.

The chat model is pinned to a Gemini free-tier model in `src/app/api/chat/route.ts`. Leave it pinned
— switching models can move this from free to paid.

## Content model

All profile content is typed and centralized, so the site, the résumé PDF, `/llms.txt`, the JSON-LD
block, and the chatbot cannot drift apart.

| File                     | Holds                                                               |
| ------------------------ | ------------------------------------------------------------------- |
| `src/data/profile.ts`    | **Single source of truth** — name, title, email, phone, location, links, education, summary |
| `src/data/experience.ts` | Employment history with localized bullets                           |
| `src/data/projects.ts`   | Projects, tech lists, demo/case-study links                         |
| `src/data/skills.ts`     | Skill categories                                                    |
| `src/data/resume.ts`     | Résumé URL, cache-busting version, and download filename            |
| `src/i18n/ui.ts`         | All UI copy for `en` / `zh` / `es`                                  |
| `src/lib/chatContext.ts` | Builds the chatbot system prompt from the files above               |

To change the contact email, edit `profile.email` in `src/data/profile.ts` — nothing else hardcodes it.

Only list a technology that is actually used in the corresponding repository. The résumé and this
site are job-application materials; unverifiable claims are a liability.

## Regenerating the résumé PDF

The PDF is generated, not hand-edited. The source is `resume/resume.html`.

```bash
# 1. Edit the content
#    resume/resume.html          — résumé body
#    src/data/profile.ts         — name, title, contact details, links

# 2. Rebuild public/resume.pdf
npm run resume:build

# 3. Bump RESUME_VERSION in src/data/resume.ts to today's date
#    (cache-busts the ?v= query string so visitors get the new file)
```

`npm run resume:build` renders the template with values from `src/data/profile.ts` and prints it via
an already-installed headless Chrome or Edge — no Puppeteer, no PDF library, nothing added to
`package.json`. If the browser isn't found automatically, set `CHROME_PATH`:

```bash
CHROME_PATH="/path/to/chrome" npm run resume:build
```

The build **fails** if the result is not exactly one US-Letter page, which is the constraint most
likely to break when content is added.

See [`resume/README.md`](resume/README.md) for the layout rules and the full verification checklist.

## Verification

```bash
npm run lint                  # ESLint
npx tsc --noEmit              # TypeScript
npm run build                 # production build
npm run resume:build          # regenerate + validate the résumé PDF
```

There is no automated test suite in this repository; verification is lint, typecheck, build, and the
résumé checks above.

## Deployment

Deployed on **Vercel**, built from `main`. Pushing to `main` triggers a production deployment; pull
requests get preview deployments.

Deployment checklist:

- Set `GEMINI_API_KEY`, `KV_REST_API_URL`, and `KV_REST_API_TOKEN` in the Vercel project
- The custom domain `jasonchen.website` must match `profile.siteUrl` in `src/data/profile.ts`,
  which drives canonical URLs, the sitemap, JSON-LD, and `/llms.txt`
- After replacing `public/resume.pdf`, bump `RESUME_VERSION` or visitors keep the cached copy

## Project structure

```
resume/resume.html          résumé source (compiled to public/resume.pdf)
scripts/build-resume.mjs    dependency-free PDF generator + page-count guard
src/app/                    App Router pages, API route, llms.txt, sitemap, OG image
src/components/             UI components
src/data/                   typed content (profile, experience, projects, skills)
src/i18n/ui.ts              en / zh / es copy
src/lib/chatContext.ts      chatbot system prompt, derived from src/data
```
