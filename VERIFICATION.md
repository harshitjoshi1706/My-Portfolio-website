# Verification report — 14 October 2026

## Completed checks

- Dependencies installed and locked (`package-lock.json`).
- ESLint and TypeScript checks passed.
- Next.js production build succeeded. Homepage, six case-study pages, 404, robots.txt, and sitemap.xml are prerendered.
- Production HTTP checks: homepage, all six cases, three application captures, favicon, social preview image, robots, and sitemap returned 200. Unknown URL returned 404. Homepage fragment links all have matching targets.
- Playwright request-only route tests: **2 passed**, covering the route matrix under both configured projects. These tests use HTTP requests and do not launch a browser.
- Native Codex browser review: desktop at 1440 pixels, tablet at 768 pixels, mobile at 390 pixels. Checked project filtering, case-study navigation, menu open/close, Escape focus restoration, research navigation, light-theme persistence after reload, and mobile overflow. The checked mobile page had equal viewport/content widths (390 pixels).
- axe-core WCAG 2 A/AA and WCAG 2.1 AA checks run against the production-rendered site through a temporary local browser harness: homepage **0 violations in dark and light**, mobile SecureRAG case study **0 violations in dark and light**. Reports are saved in `accessibility-report.json` and `accessibility-mobile-case-study.json`. The temporary harness is removed from the deliverable.
- All 30 inspected homepage external new-tab links have `noopener noreferrer`.
- SpendSmart, MovieCorner, and TechPulse live frontends returned HTTP 200 and rendered in the browser. Captures were saved from those applications; no sign-in, user data submission, or application modifications were performed.
- `npm audit --omit=dev`: **0 vulnerabilities** at verification time.

## Verification limits

- The complete Playwright browser suite is included and wired into CI, but was not run locally: macOS shell sandbox blocked Chromium’s Mach port registration. Browser interactions and axe checks above ran through the native Codex browser instead. No future GitHub Actions run is claimed as passed.
- Lighthouse has not been measured. No numeric performance, accessibility, or SEO score is claimed.
- npm's full audit reported five high-severity development dependency entries through `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. The underlying advisory is [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). npm suggested an incompatible downgrade of the lint config rather than a compatible patch; the stable current Next.js/lint versions were retained. This is outside the production dependency tree. Recheck the audit as upstream fixes become available.
- Backend availability and authenticated workflows of the featured applications were not exercised. The portfolio describes inspected code, not a full runtime certification of those projects.
- The local sitemap is empty until a real production domain is set. On Vercel, the project production hostname is a fallback; set `NEXT_PUBLIC_SITE_URL` explicitly for the canonical domain.
- Resume download/view behavior is implemented but no real PDF was supplied. The fallback is currently shown, with automatic activation at build or development startup once `public/resume.pdf` exists.

## Repository evidence

The public [GitHub profile](https://github.com/harshitjoshi1706) contained twelve public repositories at inspection. Paths and blob SHAs are recorded in `data/evidence.json`, without source contents or credentials.

| Application | Verified source and scope |
| --- | --- |
| [SpendSmart](https://github.com/harshitjoshi1706/SpendSmart) | One repo with React/TypeScript client and Express/TypeScript/Mongoose server. Manifest confirms Zustand, TanStack Router, Recharts. Auth guard, expense ownership/validation, profile upload controller inspected. Dockerfiles/Compose and four-job CI configuration inspected. Workflow configuration is not proof of a successful production run. |
| [SecureRAG-QR](https://github.com/harshitjoshi1706/SecureRAG-QR) | FastAPI/React project; pipeline implements retrieval and optional local AI generation, compression and optional encryption. README and pipeline confirm ChromaDB, Sentence Transformers, Ollama, Zstandard, Argon2id, AES-GCM, QR fragmentation and custom receiver. No universal smartphone-camera decoding claim. |
| [Chunking research](https://github.com/harshitjoshi1706/rag_chunk_robustness) + [analyzer](https://github.com/harshitjoshi1706/rag_robustness_analyzer) | Experiment runner and metric implementation inspected. Saved manifest records four strategies × four levels, MiniLM/CPU, 254-token content budget, 8,456 primary questions and all configurations complete. Chart values come from saved final_metrics.csv, rounded to two decimals. MRR is MRR@100. Work remains academic and unpublished. Analyzer returns evidence passages, not generated answers. |
| [MovieCorner frontend](https://github.com/harshitjoshi1706/MovieCorner-frontend) + [backend](https://github.com/harshitjoshi1706/moviecorner-backend) | Combined into one project. React/JavaScript/Sass, Swiper, Axios and TMDB browsing; backend Express/Mongoose/bcrypt/JWT auth routes. README examples for reviews/favorites are not treated as implementation evidence. |
| [TechPulse](https://github.com/harshitjoshi1706/techpulse-research) | Separate CSR/SSR/SSG directories and shared Express API. SSR index uses getServerSideProps; SSG uses getStaticProps. README describes expected performance trends, so no measured benchmark outcome is claimed. Only CSR demo linked. |
| [BuzzHub](https://github.com/harshitjoshi1706/BUZZHUB) | React/Redux client and Express/Mongoose API with post/comment/profile routes. Manifest does not confirm the README's Tailwind claim. Messaging/socket modules exist, but realtime call behavior was not verified. No demo link invented. |

The empty Python repo, incomplete face-identification scripts, older portfolio, and practice game are excluded from featured work. Frontend/backend and research/analyzer repository pairs are grouped, with no duplicate application cards.

No code has been pushed, repository settings changed, or production deployment created.
