'use client';

import { useInView, motion, Variants, UseInViewOptions } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type Direction = 'left' | 'right' | 'top' | 'bottom';

interface SlideInProps {
  children: ReactNode;
  direction?: Direction;
  duration?: number;
  delay?: number;
  viewport?: { once?: boolean; margin?: UseInViewOptions['margin'] };
  className?: string;
}

/**
 * SlideIn - Slide in animation from specified direction
 * Use for: Cart sidebar (from right), mobile menus (from bottom), modals
 */
export default function SlideIn({
  children,
  direction = 'right',
  duration = 0.3,
  delay = 0,
  viewport = { once: true },
  className = '',
}: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: viewport.once, margin: viewport.margin });

  const getInitialPosition = (dir: Direction): { x: string; y: string } => {
    switch (dir) {
      case 'left':
        return { x: '-100%', y: '0%' };
      case 'right':
        return { x: '100%', y: '0%' };
      case 'top':
        return { x: '0%', y: '-100%' };
      case 'bottom':
        return { x: '0%', y: '100%' };
      default:
        return { x: '100%', y: '0%' };
    }
  };

  const initialPosition = getInitialPosition(direction);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: initialPosition.x,
      y: initialPosition.y,
    },
    visible: {
      opacity: 1,
      x: '0%',
      y: '0%',
      transition: {
        duration,
        delay,
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