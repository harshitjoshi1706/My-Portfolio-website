export type Category = 'Full-stack' | 'AI & RAG' | 'Research';
export type Project = {
  slug: string; name: string; label: string; category: Category; summary: string;
  stack: string[]; features: string[]; overview: string; problem: string;
  architecture: string[]; engineering: { title: string; description: string }[];
  limitations: string[]; future: string[]; repos: { label: string; url: string }[];
  live?: string; image?: string; imageAlt?: string; accent: string;
};
const repo = (name: string, label = 'Source code') => ({ label, url: `https://github.com/harshitjoshi1706/${name}` });
export const projects: Project[] = [
  {
    slug: 'spendsmart', name: 'SpendSmart', label: 'Expense management, end to end', category: 'Full-stack', accent: 'blue',
    summary: 'An expense tracker that connects everyday transactions with useful spending analytics—and a repeatable engineering workflow.',
    stack: ['React', 'TypeScript', 'Express', 'MongoDB', 'Zustand', 'Docker'],
    features: ['JWT authentication & protected routes', 'Expense CRUD, categories & filtering', 'Recharts analytics & profile uploads', 'GitHub Actions checks & Docker builds'],
    overview: 'A MERN application with a typed React client and Express server in one repository. Users can record expenses, explore spending patterns, and manage their profiles.',
    problem: 'Expense records become more useful when they can be filtered, grouped, and explored over time. This project brings that workflow into one application, with authentication and user-scoped data.',
    architecture: ['React + TanStack Router', 'Zustand state + Axios', 'Express REST API + JWT', 'MongoDB + Mongoose'],
    engineering: [
      { title: 'A typed application boundary', description: 'TypeScript is used in both client and server. TanStack Router guards authenticated pages; the API checks expense ownership and validates amounts, categories, descriptions, and dates.' },
      { title: 'Analytics built from expense data', description: 'Recharts powers category and trend visualizations. Dedicated services and stores separate analytics, authentication, and expense concerns. The profile flow includes Multer-based avatar upload handling.' },
      { title: 'Checks before deployment', description: 'The committed workflow lints and builds both applications, runs backend Vitest/Supertest checks, then builds both Docker images. A main-branch deployment job depends on these checks before invoking Vercel. This verifies workflow configuration, not every production run.' },
      { title: 'Containerized local stack', description: 'Multi-stage client and server Dockerfiles and Compose configure Nginx, the API, MongoDB, and persistent upload/data volumes. Image builds are validation only; the workflow does not publish containers.' },
    ],
    limitations: ['The backend tests cover middleware, validation, authentication failures, health, and token behavior; they do not exercise a live MongoDB database.', 'Categories are predefined; custom category CRUD is not claimed.'],
    future: ['Add recurring expenses and budget goals.', 'Expand integration coverage to database-backed expense workflows.'],
    image: '/projects/spendsmart.jpg', imageAlt: 'SpendSmart deployed landing page, captured 14 October 2026', repos: [repo('SpendSmart')], live: 'https://spend-smart-neon.vercel.app',
  },
  {
    slug: 'securerag-qr', name: 'SecureRAG-QR', label: 'Local intelligence. Offline transfer.', category: 'AI & RAG', accent: 'violet',
    summary: 'A local-first document retrieval pipeline that compresses information into QR packets, with optional password-based encryption.',
    stack: ['Python', 'FastAPI', 'React', 'ChromaDB', 'Ollama', 'AES-GCM'],
    features: ['PDF extraction, chunking & embeddings', 'Fast retrieval or local AI summary', 'Zstandard compression + AES-256-GCM', 'QR fragmentation & custom recovery'],
    overview: 'A document intelligence and transfer demo built around a FastAPI backend and React/TypeScript frontend. It connects semantic retrieval to compact, recoverable QR transfers.',
    problem: 'A receiver may need a small piece of information from a large document without access to the original PDF or the sender’s retrieval system. This project packages retrieved information for offline QR-based recovery.',
    architecture: ['PDF → extraction + chunks', 'BGE embeddings → ChromaDB', 'Retrieval → optional Qwen / Ollama', 'JSON → Zstandard → optional AES-GCM', 'QR fragments → custom receiver'],
    engineering: [
      { title: 'Two explicit processing paths', description: 'Fast Retrieval returns relevant chunks without calling Ollama. AI Summary sends the retrieved context to a local Qwen model and builds a structured answer payload with source chunk references.' },
      { title: 'Layered transfer pipeline', description: 'The backend compacts JSON, compresses it with Zstandard, optionally derives a password key with Argon2id and encrypts with AES-256-GCM, then creates fragmented QR packets.' },
      { title: 'Reconstruction at the receiver', description: 'The custom receiver collects uploaded QR images, tracks fragments, reassembles packets, and requests a password for encrypted recovery. It does not require the original PDF, vector database, or LLM to recover a generated transfer.' },
    ],
    limitations: ['This is a local MCA demo system, not an independently audited security product.', 'Recovery uses a compatible custom decoder; ordinary camera apps are not assumed to decode compressed or encrypted packets.', 'Local models must first be downloaded and provisioned.'],
    future: ['Add end-to-end tests for corrupted, incomplete, and out-of-order QR transfers.', 'Evaluate resource limits across larger document collections.'],
    repos: [repo('SecureRAG-QR')],
  },
  {
    slug: 'rag-robustness', name: 'RAG Chunking Robustness', label: 'Retrieval under formatting noise', category: 'Research', accent: 'cyan',
    summary: 'A controlled comparison of four chunking strategies, paired with a Streamlit app for inspecting retrieval evidence and saved results.',
    stack: ['Python', 'FAISS', 'Sentence Transformers', 'Streamlit', 'OHRBench'],
    features: ['4 strategies × 4 noise levels', 'Hit@1, Hit@5 & MRR@100', 'Completed experiment artifacts', 'Live PDF retrieval & comparison UI'],
    overview: 'Independent academic work titled “Robustness of Text Chunking Strategies Under Controlled Formatting Noise: A Retrieval-Focused Evaluation in Lightweight RAG Pipelines.” Academic Research Project — Unpublished.',
    problem: 'Document formatting changes can disrupt text boundaries and retrieval. The experiment measures how fixed-size, recursive, semantic, and structure-aware chunkers respond to clean, mild, moderate, and severe formatting noise.',
    architecture: ['OHRBench → controlled noise', 'Four token-budgeted chunkers', 'MiniLM embeddings → FAISS', 'Retrieval → Hit@1 / Hit@5 / MRR@100', 'Saved artifacts → Streamlit dashboard'],
    engineering: [
      { title: 'A completed, bounded experiment', description: 'The saved manifest marks all sixteen configurations complete. It records all-MiniLM-L6-v2 on CPU, a uniform 254-content-token budget, 8,456 primary questions, and MRR truncated at rank 100.' },
      { title: 'Results with context', description: 'In the saved primary evaluation, severe-noise Hit@5 is 71.94% for fixed-size, 70.93% for recursive, 71.12% for semantic, and 70.78% for structure-aware. These are dataset-specific results, not a universal ranking of chunking methods.' },
      { title: 'From experiment to inspection tool', description: 'The Streamlit analyzer supports single-strategy PDF retrieval, comparison across all four chunkers, and a dashboard of saved results. It returns evidence passages rather than generated answers.' },
      { title: 'Avoiding stale evidence', description: 'The analyzer uses SHA-256 document identity and session-local workspaces. Changed PDFs or strategies invalidate affected indexes. Failed searches clear old evidence; builds publish indexes only after all requested strategies succeed.' },
    ],
    limitations: ['The paper is unpublished and has not been presented as peer-reviewed work.', 'Results describe the recorded OHRBench/MiniLM experiment only.', 'Live analyzer retrieval requires the sibling research source, model dependencies, and sufficient local resources.'],
    future: ['Evaluate additional embedding models and document collections.', 'Package the research backend as a namespaced dependency.'],
    repos: [repo('rag_chunk_robustness', 'Research source'), repo('rag_robustness_analyzer', 'Streamlit analyzer')],
  },
  {
    slug: 'moviecorner', name: 'MovieCorner', label: 'Discover the next film', category: 'Full-stack', accent: 'rose',
    summary: 'A movie discovery interface with TMDB-powered catalogs and trailers, backed by a separate authentication API.',
    stack: ['React', 'JavaScript', 'Sass', 'TMDB API', 'Express', 'MongoDB'],
    features: ['Movie & TV browsing and search', 'Details, cast & video components', 'Swiper-based hero interface', 'Registration & JWT login API'],
    overview: 'A React movie discovery frontend paired with a Node.js/Express authentication backend. The two repositories are represented as one application.',
    problem: 'Movie discovery benefits from a visual catalog and easy access to film details and trailers. MovieCorner uses TMDB for discovery data and a separate MongoDB-backed API for user registration and login.',
    architecture: ['React + React Router', 'Axios → TMDB catalog API', 'Login / signup → Express API', 'bcrypt + JWT → MongoDB users'],
    engineering: [
      { title: 'A component-based discovery interface', description: 'The source separates hero slides, movie grids, lists, detail views, cast lists, and video lists. Sass handles styling; Swiper supports the visual browsing interface.' },
      { title: 'A focused authentication service', description: 'The backend routes implement createuser, login, and getuser. Password hashing uses bcrypt, request checks use express-validator, and JWT middleware resolves the current user.' },
    ],
    limitations: ['Reviews, ratings, favorites, and watchlists are mentioned in a broad README but are not supported by the inspected backend routes, so they are not claimed.', 'Frontend availability does not establish backend authentication availability.'],
    future: ['Move legacy authentication configuration fully into environment-based settings.', 'Add end-to-end authentication tests and clearer backend documentation.'],
    image: '/projects/moviecorner.jpg', imageAlt: 'MovieCorner deployed movie catalog, captured 14 October 2026', repos: [repo('MovieCorner-frontend', 'Frontend source'), repo('moviecorner-backend', 'Backend source')], live: 'https://movie-corner-frontend.vercel.app/',
  },
  {
    slug: 'techpulse', name: 'TechPulse', label: 'One app. Three rendering models.', category: 'Research', accent: 'amber',
    summary: 'A technology news application implemented with client rendering, request-time server rendering, and static generation.',
    stack: ['React', 'Next.js', 'JavaScript', 'Express', 'CSS'],
    features: ['React CSR implementation', 'Next.js getServerSideProps', 'Next.js getStaticProps & static paths', 'Shared API, search & category views'],
    overview: 'A web rendering research project with separate CSR, SSR, and SSG frontends plus an Express articles API. The implementations provide a concrete basis for studying rendering behavior.',
    problem: 'Rendering choices affect how content reaches the browser. This project implements a comparable news application in three architectures so their loading and rendering behavior can be investigated.',
    architecture: ['Express articles API', 'React CSR → browser fetch', 'Next.js SSR → request-time HTML', 'Next.js SSG → build-time HTML'],
    engineering: [
      { title: 'Different data delivery mechanisms', description: 'The SSR homepage fetches articles in getServerSideProps and returns a recoverable error state. The SSG homepage uses getStaticProps. The CSR application retrieves data in the browser.' },
      { title: 'Shared application concerns', description: 'The implementations include reusable article components, search, category navigation, pagination, and article detail views. Rendering strategy remains a deliberate architectural variable.' },
    ],
    limitations: ['The README’s performance findings are explicitly expected trends. No measured Lighthouse results are claimed.', 'Only the supplied CSR deployment is linked; SSR and SSG deployments are not assumed.'],
    future: ['Record reproducible performance measurements under documented network and cache conditions.', 'Publish measured results alongside the benchmark procedure.'],
    image: '/projects/techpulse.jpg', imageAlt: 'TechPulse deployed CSR news page, captured 14 October 2026', repos: [repo('techpulse-research')], live: 'https://techpulse-csr.vercel.app/',
  },
  {
    slug: 'buzzhub', name: 'BuzzHub', label: 'A full-stack social platform', category: 'Full-stack', accent: 'green',
    summary: 'A MERN social application with posts, comments, user profiles, and follow relationships across a React/Redux client and REST API.',
    stack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    features: ['Post creation, editing & deletion', 'Likes, comments & saved-post routes', 'User profiles & follow interactions', 'Authenticated API & Redux state'],
    overview: 'A React and Redux social application with an Express/Mongoose backend. Source modules cover authentication, posts, profiles, comments, messages, and notifications.',
    problem: 'Social interfaces combine many related state transitions. BuzzHub explores those interactions through feature-specific Redux actions/reducers and backend controllers.',
    architecture: ['React + React Router', 'Redux actions + reducers', 'Express authenticated routes', 'Mongoose user / post / comment models'],
    engineering: [
      { title: 'Feature-oriented state and APIs', description: 'The client organizes auth, posts, comments, profiles, and messages into separate Redux modules. Corresponding Express routers apply authentication middleware around user interactions.' },
      { title: 'Social interaction model', description: 'Post routes include likes, unlike, saved posts, updates, and deletion. Profile and comment components support follow interactions and threaded activity. Messaging and Socket.IO modules exist, but runtime call behavior is not claimed as verified.' },
    ],
    limitations: ['No working public deployment was located.', 'The package manifest confirms Redux and CSS; the README’s Tailwind claim was not substantiated.'],
    future: ['Modernize the dependency stack and add interaction tests.', 'Verify messaging and notification flows before a public deployment.'],
    repos: [repo('BUZZHUB')],
  },
];
export const researchTitle = 'Robustness of Text Chunking Strategies Under Controlled Formatting Noise: A Retrieval-Focused Evaluation in Lightweight RAG Pipelines';
export const retrievalResults = [
  { strategy: 'Fixed-size', clean: 75.93, severe: 71.94 },
  { strategy: 'Recursive', clean: 76.58, severe: 70.93 },
  { strategy: 'Semantic', clean: 75.95, severe: 71.12 },
  { strategy: 'Structure-aware', clean: 76.54, severe: 70.78 },
];
