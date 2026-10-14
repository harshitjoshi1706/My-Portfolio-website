import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in new tab)</span></a>;
}
export function SectionHeading({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: string; children?: ReactNode }) {
  return <div className="section-heading"><div><p className="eyebrow"><span>{number}</span> / {eyebrow}</p><h2>{title}</h2></div>{children && <div className="section-intro">{children}</div>}</div>;
}
export function Tags({ items }: { items: string[] }) { return <ul className="tags" aria-label="Technologies">{items.map(item => <li key={item}>{item}</li>)}</ul>; }
export function BackLink() { return <Link className="text-link" href="/#projects">← Back to projects</Link>; }
