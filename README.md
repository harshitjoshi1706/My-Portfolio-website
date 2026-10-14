# Harshit Joshi — Software Engineering Portfolio

A complete static-first Next.js App Router portfolio with six project case studies, real repository-based content, a research comparison, genuine deployed-app captures, and configurable personal details.

## Local setup

Requires Node.js 22 (Node 20.9+ is supported by Next.js).

```bash
npm ci
npm run dev
```

Open http://127.0.0.1:3000. The dev script uses Webpack for compatibility with sandboxed macOS file watching. If your environment blocks filesystem notifications, run `WATCHPACK_POLLING=true npm run dev` on macOS/Linux.

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

For the browser suite, first build, then run:

```bash
npx playwright install chromium
npm run test:e2e
```

The suite checks desktop/mobile filtering, navigation, theme persistence, overflow, accessibility with axe, routes, reduced-motion CSS, and outbound link attributes. GitHub Actions runs these checks on pushes and pull requests to main. The workflow has read-only permissions and contains no deployment step.

## Edit your content

| File | Contents |
| --- | --- |
| `data/profile.ts` | Name, headline, email, phone, LinkedIn, GitHub, location, education, availability, skills, resume and paper paths |
| `data/projects.ts` | Grouped projects, descriptions, stacks, features, architecture, engineering highlights, future work, screenshots, demo URLs, research chart values |
| `data/github.json` | Cached public repository metadata and activity, with snapshot date |
| `data/evidence.json` | Inspected source paths and blob SHAs; no raw source or credentials |
| `data/assets.json` | Generated resume availability flag; do not edit manually |
| `app/globals.css` | Design tokens, dark/light themes, responsive styling |
| `public/projects/` | Genuine application screenshots; replace with newer captures as needed |
| `public/og-image.png` | Social preview artwork |

Your supplied email, phone number, and LinkedIn URL are configured. Keep dates and exact affiliated-college information editable until confirmed. Core CS topics are described as study areas. C++ and SQLite are omitted from repository-evidenced skills because they were not established by the inspected sources.

### Resume

Place the real PDF at `public/resume.pdf`, then restart development or rebuild. `predev` and `build` detect it automatically. The hero download link uses the HTML `download` attribute, and the resume section also opens the PDF in a new tab. No missing PDF link is shown before the file exists. If you change the resume path in the configuration, also update `scripts/check-assets.mjs` to detect the corresponding public file.

### Research paper

Place a supplied PDF at `public/research-paper.pdf` and set `profile.researchPaper` to `/research-paper.pdf`. It remains labeled unpublished. No paper was fabricated.

### GitHub snapshot

```bash
npm run refresh:github
```

This uses the unauthenticated public API, paginates repositories, and refreshes recent public events. It runs only when invoked, not on visitor page loads or every build. HTTP failures, timeouts, and rate limits preserve the existing snapshot. Review the new snapshot before committing. GitHub’s primary-language field is repository metadata, not a full language breakdown. No contribution counts, stars, or professional metrics are invented.

## Deploy on Vercel

1. Add `public/resume.pdf` when ready and update content.
2. Create a GitHub repository and upload this folder **only when you choose to publish it**. This task has not pushed anything or changed GitHub settings.
3. In Vercel, import the repository. Select Next.js and set the Root Directory to this project folder if it is nested in a larger repository. Install command: `npm ci`; build command: `npm run build`; leave the output directory on the Next.js default. Use Node.js 22.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS production domain, with no trailing slash. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is used as a fallback when available. No database, authentication, API token, or backend service is required.
5. Deploy when ready. Afterward, confirm all six case-study routes, resume PDF, social preview, robots.txt, and sitemap.xml. Update the URL and redeploy if your custom domain changes.

Without a configured production domain, the local sitemap is intentionally empty and the site omits canonical/social absolute URLs rather than inventing a hostname. The title, description, semantic markup, and robots route are still present.

Vercel's own Git integration may deploy subsequent pushes after you connect a repository. Configure that behavior in Vercel according to your preferences; this portfolio's CI never invokes deployment.

## Content verification

Public profile and repositories were inspected on 14 October 2026. See `VERIFICATION.md` and `data/evidence.json` for sources, scope, checks, and limits.

- SpendSmart's frontend and backend live together in one repository. Docker and CI-gated deployment are verified workflow **configuration**, not a claim that all production deployments passed.
- SecureRAG-QR uses ChromaDB; the chunking research/analyzer uses FAISS. QR recovery requires a compatible custom receiver.
- MovieCorner's two repositories are grouped. Catalog and authentication implementation are verified; broad README claims about reviews and watchlists are excluded.
- TechPulse implements CSR, SSR, and SSG. The README's expected performance table is not presented as measured findings.
- BuzzHub uses Redux and CSS. It is not labeled deployed and unverified realtime call behavior is not advertised as completed.
- RAG results use the saved primary evaluation (8,456 questions, sixteen complete configurations). Findings are dataset-specific and the paper is unpublished.
- The small face-identification repository has incomplete imports and was excluded. The empty Python repository and earlier practice repositories are not featured.

## Design and performance

Server-rendered static routes, localized client components, Next.js image optimization, zero external font requests (system sans-serif/monospace stacks), restrained Motion transitions, semantic sections, a skip link, keyboard focus styles, reduced-motion CSS, and a persistent theme toggle. No database or login is included. Lighthouse scores have not been measured or claimed.
