import Link from 'next/link';
import { Download, FileText } from 'lucide-react';
import { profile } from '@/data/profile';
import assets from '@/data/assets.json';
export function ResumeButton({ variant = 'secondary' }: { variant?: string }) {
  return assets.resumeAvailable ? <a href={profile.resume} download="Harshit-Joshi-Resume.pdf" className={`button ${variant}`}><Download size={17} aria-hidden="true"/>Download resume</a> : <Link href="/#resume" className={`button ${variant}`}><FileText size={17} aria-hidden="true"/>Resume <span className="button-note">coming soon</span></Link>;
}
export function ResumeOptions() { return assets.resumeAvailable ? <div className="button-row"><ResumeButton variant="primary"/><a href={profile.resume} target="_blank" rel="noopener noreferrer" className="button secondary">View resume<span className="sr-only"> (opens in new tab)</span></a></div> : <p className="resume-status"><span className="tiny-dot"/>Resume PDF will be available here soon. In the meantime, explore my projects or get in touch.</p>; }
