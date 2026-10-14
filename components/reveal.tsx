'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { y: [12, 0] }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45 }}>{children}</motion.div>;
}
