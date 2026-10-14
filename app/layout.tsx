import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { ExternalLink } from '@/components/ui';
import { profile, siteUrl } from '@/data/profile';
import './globals.css';
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: 'Harshit Joshi — Software Engineer', template: '%s | Harshit Joshi' },
  description: 'Harshit Joshi’s software engineering portfolio: full-stack applications, backend systems, and independent AI/RAG research. MCA student in Delhi, graduating in 2027.',
  authors: [{ name: profile.name }],
  ...(siteUrl ? { alternates: { canonical: '/' } } : {}),
  openGraph: { title: 'Harshit Joshi — Software Engineer', description: 'Full-stack development · Backend systems · AI & RAG', type: 'website', locale: 'en_IN', siteName: 'Harshit Joshi', ...(siteUrl ? { url: siteUrl, images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Harshit Joshi — Software Engineer' }] } : {}) },
  twitter: { card: 'summary_large_image', title: 'Harshit Joshi — Software Engineer', description: 'Full-stack applications, backend systems, and AI/RAG research.', ...(siteUrl ? { images: ['/og-image.png'] } : {}) },
  icons: { icon: '/icon.svg' },
};
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='light'?'light':'dark'}catch{document.documentElement.dataset.theme='dark'}`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-scroll-behavior="smooth" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }}/></head><body><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<footer className="site-footer"><div className="container footer-inner"><div><strong>Harshit Joshi<span>.</span></strong><p>Built with curiosity. Refined through practice.</p></div><div className="footer-links"><ExternalLink href={profile.github}>GitHub</ExternalLink><ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink><a href={`mailto:${profile.email}`}>Email ↗</a></div><small>© {new Date().getFullYear()} Harshit Joshi</small></div></footer></body></html>;
}
