import { existsSync, writeFileSync } from 'node:fs';
writeFileSync('data/assets.json', JSON.stringify({ resumeAvailable: existsSync('public/resume.pdf') }, null, 2) + '\n');
console.log(existsSync('public/resume.pdf') ? 'Resume PDF available.' : 'Resume PDF absent; graceful fallback enabled.');
