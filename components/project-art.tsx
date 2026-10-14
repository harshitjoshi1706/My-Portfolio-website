import Image from 'next/image';
import { Database, FileText, Layers3, LockKeyhole, Network, QrCode, ScanSearch, Server, Workflow, Code2, Film, Users } from 'lucide-react';
import type { Project } from '@/data/projects';
export function ProjectArt({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.image) return <div className="project-preview screenshot"><Image src={project.image} alt={project.imageAlt || `${project.name} application screenshot`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 650px" priority={priority}/><span className="art-caption">LIVE APPLICATION CAPTURE</span></div>;
  const Icon = project.slug === 'securerag-qr' ? QrCode : project.slug === 'rag-robustness' ? Layers3 : project.slug === 'techpulse' ? Code2 : project.slug === 'moviecorner' ? Film : project.slug === 'buzzhub' ? Users : Database;
  return <div className={`project-preview art-${project.accent}`} role="img" aria-label={`${project.name} architecture illustration, not an application screenshot`}>
    <span className="art-coordinate">{project.category.toUpperCase()} / {project.slug.toUpperCase()}</span>
    <div className="art-grid"/><div className="art-symbol"><Icon size={50} strokeWidth={1.2}/></div>
    <div className="art-pipeline">{project.architecture.slice(0,3).map((step,i)=><span key={step}><i>{String(i+1).padStart(2,'0')}</i>{step}</span>)}</div>
    <span className="art-caption">ARCHITECTURE ILLUSTRATION</span>
  </div>;
}
export function HeroArchitecture() {
  return <div className="hero-visual" role="img" aria-label="Illustration connecting frontend, backend, and retrieval systems">
    <div className="visual-topline"><span><span className="tiny-dot"/> ENGINEERING EXPLORATIONS</span><span>01 — 03</span></div>
    <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
    <div className="visual-center"><span className="visual-monogram">h<span>j</span><i>.</i></span><small>BUILD. UNDERSTAND. ITERATE.</small></div>
    <div className="system-node node-frontend"><Code2 size={20}/><div><small>01 / INTERFACE</small><strong>Full-stack applications</strong></div></div>
    <div className="system-node node-backend"><Server size={20}/><div><small>02 / SYSTEMS</small><strong>APIs & backend logic</strong></div></div>
    <div className="system-node node-rag"><ScanSearch size={20}/><div><small>03 / INTELLIGENCE</small><strong>Retrieval & research</strong></div></div>
    <div className="visual-bottomline"><span>React · Node.js · Python</span><Network size={17}/></div>
  </div>;
}
export function FocusIcons({ index }: { index: number }) { const Icon = [Workflow, Database, LockKeyhole, FileText][index]; return <Icon size={22} strokeWidth={1.6} aria-hidden="true"/>; }
