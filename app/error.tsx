'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }: { reset: () => void }) { return <main id="main" className="container error-page"><h1>Something didn’t load.</h1><p>Please try again, or return to the homepage.</p><div className="button-row"><button onClick={reset} className="button primary">Try again</button><Link href="/" className="button secondary">Return home</Link></div></main>; }
