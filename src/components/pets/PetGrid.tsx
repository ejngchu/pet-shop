'use client';

import { motion } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';
import PetCard from './PetCard';
import type { Pet } from './types';

/**
 * PetGrid - Responsive grid component for displaying pets
 * Layout: 1 column mobile, 2 columns tablet, 3 columns desktop
 * Features: FadeIn stagger animation, loading skeleton state
 * 
 * @example
 * ```tsx
 * <PetGrid pets={pets} loading={isLoading} />
 * ```
 */
interface PetGridProps {
  /** Array of pet data to display */
  pets: Pet[];
  /** Whether to show loading skeleton */
  loading?: boolean;
}

/**
 * Skeleton card for loading state
 */
function PetCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card">
      {/* Image skeleton */}
      <div className="aspect-square">
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Name skeleton */}
        <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4" />
        
        {/* Breed skeleton */}
        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/2" />

        {/* Age and Price skeleton */}
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-1/4" />
          <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-1/4" />
        </div>

        {/* Description skeleton */}
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />

        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

/**
 * Item variants for stagger animation
 */
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function PetGrid({ pets, loading = false }: PetGridProps) {
  // Show skeleton grid while loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <PetCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // Empty state
  if (pets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🐾</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No pets found
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters to find more pets
        </p>
      </div>
    );
  }

  // Pet grid with stagger animation
  return (
    <FadeIn stagger={0.1} duration={0.4}>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        {pets.map((pet) => (
          <motion.div key={pet.id} variants={itemVariants}>
            <PetCard pet={pet} />
          </motion.div>
        ))}
      </motion.div>
    </FadeIn>
  );
}