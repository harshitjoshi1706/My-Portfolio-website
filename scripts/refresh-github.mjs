import { writeFile } from 'node:fs/promises';
const username = 'harshitjoshi1706';
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'harshit-joshi-portfolio' };
async function get(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
  return response.json();
}
try {
  const repos = []; for(let page=1; ; page++) {const batch = await get(`/users/${username}/repos?per_page=100&page=${page}`);repos.push(...batch);if(batch.length<100)break;}
  const events = await get(`/users/${username}/events/public?per_page=10`);
  const data = { updatedAt: new Date().toISOString().slice(0,10), username, repositories: repos.filter(r=>!r.private).map(r=>({name:r.name,url:r.html_url,language:r.language,updatedAt:r.pushed_at,description:r.description,fork:r.fork})), activity:events.slice(0,5).map(e=>({type:e.type,repo:e.repo.name,url:`https://github.com/${e.repo.name}`,date:e.created_at})) };
  await writeFile(new URL('../data/github.json',import.meta.url),JSON.stringify(data,null,2)+'\n');
  console.log(`Saved ${data.repositories.length} public repositories. Review before committing.`);
} catch (error) { console.error(`Refresh unavailable: ${error.message}. Existing snapshot preserved.`);process.exitCode=1; }
