export const profile = {
  name: 'Harshit Joshi',
  headline: 'Software Engineer | Full-Stack Development | Backend Systems | AI & RAG',
  introduction: 'I build full-stack applications and explore how backend systems and retrieval-augmented generation can turn complex problems into useful software.',
  about: 'I’m an MCA student in Delhi, building applications across React, Node.js, and Python. My work spans expense management, document retrieval, and experiments in web rendering. I enjoy tracing a problem from the interface to the API and data layer, then making the result easier to test and maintain.',
  github: 'https://github.com/harshitjoshi1706',
  linkedin: 'https://www.linkedin.com/in/i-am-harshit-joshi-/',
  email: 'harshitjoshi1706@gmail.com',
  phone: '+91 9266460327',
  phoneHref: 'tel:+919266460327',
  location: 'Delhi, India',
  resume: '/resume.pdf',
  researchPaper: null as string | null,
  available: true,
  education: [
    { degree: 'Master of Computer Applications', short: 'MCA', university: 'Guru Gobind Singh Indraprastha University', location: 'Delhi', dates: 'Expected 2027', description: 'Currently pursuing postgraduate studies in computer applications.' },
    { degree: 'Bachelor of Computer Applications', short: 'BCA', university: 'Guru Gobind Singh Indraprastha University', location: 'Delhi', dates: '', description: 'Undergraduate foundation in computer applications.' },
  ],
};
const configuredDomain = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
export const siteUrl = configuredDomain.replace(/\/$/, '') || null;
export const skills = [
  { name: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Zustand', 'TanStack Router', 'Recharts'] },
  { name: 'Backend & data', items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'JWT', 'MongoDB', 'ChromaDB'] },
  { name: 'Engineering tools', items: ['Git', 'GitHub', 'Docker', 'GitHub Actions', 'Vercel', 'Vitest', 'Supertest'] },
  { name: 'AI & retrieval', items: ['RAG', 'FAISS', 'Sentence Transformers', 'Ollama', 'Streamlit', 'Retrieval evaluation'] },
];
// Self-described study areas, separate from repository-evidenced implementation skills.
export const studyAreas = ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'];
