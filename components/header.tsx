'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
const links = [['Projects', '/#projects'], ['Research', '/#research'], ['About', '/#about'], ['Contact', '/#contact']];
export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    nav.current?.querySelector('a')?.focus();
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('portfolio-theme', next); } catch { /* Storage is optional. */ }
  }
  return <header className="site-header"><div className="header-inner"><Link href="/" aria-label="Harshit Joshi home" className="brand"><span className="brand-mark">h<span>j</span><i>.</i></span><span>HARSHIT JOSHI</span></Link>
    <nav ref={nav} id="main-navigation" aria-label="Main navigation" className={open ? 'navigation open' : 'navigation'}>{links.map(([label, href]) => <Link href={href} key={label} onClick={() => setOpen(false)}>{label}</Link>)}</nav>
    <div className="header-actions"><button className="icon-button theme-toggle" onClick={toggleTheme} aria-label="Toggle light or dark theme"><Sun className="sun-icon" size={19} aria-hidden="true"/><Moon className="moon-icon" size={19} aria-hidden="true"/></button><Link href="/#contact" className="header-contact">Let’s talk <ArrowUpRight size={16} aria-hidden="true"/></Link><button ref={menuButton} className="icon-button mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X size={22}/> : <Menu size={22}/>}</button></div>
  </div></header>;
}
