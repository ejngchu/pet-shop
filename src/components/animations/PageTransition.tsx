'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  duration?: number;
}

/**
 * PageTransition - provides fade-in/out animation when navigating between pages
 * Uses AnimatePresence with mode="wait" to animate route changes
 * Should be used in app/template.tsx for page-level transitions
 */
export default function PageTransition({
  children,
  duration = 0.3,
}: PageTransitionProps) {
  const pathname = usePathname();

  const motionProps: MotionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration, ease: 'easeOut' },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} {...motionProps}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}