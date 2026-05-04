'use client';

import { useInView, motion, Variants, UseInViewOptions } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  stagger?: number;
  viewport?: { once?: boolean; margin?: UseInViewOptions['margin'] };
  className?: string;
}

/**
 * FadeIn - Wrapper component that fades in children with optional stagger
 * Uses useInView to trigger animation when element enters viewport
 * Use for: Hero sections, grid items, list items
 */
export default function FadeIn({
  children,
  duration = 0.3,
  delay = 0,
  stagger = 0,
  viewport = { once: true },
  className = '',
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: viewport.once, margin: viewport.margin });

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration,
        delay,
        staggerChildren: stagger,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}