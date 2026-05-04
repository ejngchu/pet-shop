'use client';

import PageTransition from '@/components/animations/PageTransition';

/**
 * Template - wraps all page content with page transition animations
 * Uses PageTransition component for fade-in/out when navigating between routes
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}