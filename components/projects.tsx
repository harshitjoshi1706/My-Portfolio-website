'use client';
import { Github } from '@/components/brand-icons';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { projects, type Category } from '@/data/projects';
import { ProjectArt } from './project-art';
import { Tags, ExternalLink } from './ui';
import { Reveal } from './reveal';
export function ProjectCollection() {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const visible = projects.filter(p => filter === 'All' || p.category === filter);
  return <>
    <div className="filter-row"><div className="filters" role="group" aria-label="Filter projects by category">{(['All','Full-stack','AI & RAG','Research'] as const).map(category=><button aria-pressed={filter===category} onClick={()=>setFilter(category)} key={category}>{category}{category === 'All' && <span>{projects.length}</span>}</button>)}</div><span className="filter-note" aria-live="polite">{visible.length} selected projects</span></div>
    <div className="project-grid">{visible.map((p,i)=><Reveal key={p.slug} className={p.slug === 'spendsmart' && filter === 'All' ? 'project-card featured-card' : 'project-card'}>
      <Link href={`/projects/${p.slug}`} className="preview-link" aria-label={`View ${p.name} case study`}><ProjectArt project={p} priority={i===0}/></Link>
      <div className="project-body"><div className="project-meta"><span>{p.category}</span><span>{String(projects.indexOf(p)+1).padStart(2,'0')}</span></div><h3><Link href={`/projects/${p.slug}`}>{p.name}<ArrowUpRight size={24} aria-hidden="true"/></Link></h3><p>{p.summary}</p>
        {p.slug === 'spendsmart' && filter === 'All' && <ul className="feature-list">{p.features.map(x=><li key={x}>{x}</li>)}</ul>}
        <Tags items={p.stack}/><div className="card-links"><Link className="text-link" href={`/projects/${p.slug}`}>View details <ArrowUpRight size={16} aria-hidden="true"/></Link><div><ExternalLink href={p.repos[0].url} className="text-link"><Github size={16} aria-hidden="true"/> Code</ExternalLink>{p.live && <ExternalLink href={p.live} className="text-link">Live demo</ExternalLink>}</div></div>
      </div></Reveal>)}</div>
    <div className="all-projects"><div><span className="eyebrow">ALL PROJECTS</span><p>Explore the complete source collection, including earlier experiments.</p></div><ExternalLink href={`${profile.github}?tab=repositories`} className="button secondary">All public repositories</ExternalLink></div>
  </>;
}
