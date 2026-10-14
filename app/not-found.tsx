import Link from 'next/link';
export default function NotFound() { return <main id="main" className="container error-page"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>A route less traveled.</h1><p>This page doesn’t exist. There’s plenty of real work to explore.</p><Link href="/" className="button primary">Back to the portfolio →</Link></main>; }
