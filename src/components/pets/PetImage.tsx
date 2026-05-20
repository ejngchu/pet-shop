'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * PetImage - Optimized image component with fallback support
 * Uses Next.js Image with fill for responsive images
 * Shows placeholder on error or while loading
 * 
 * @example
 * ```tsx
 * <PetImage
 *   src="/pets/hero.jpg"
 *   alt="Cute golden retriever puppy"
 * />
 * ```
 */
interface PetImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Additional image props */
  className?: string;
  /** Fallback placeholder image URL */
  fallbackSrc?: string;
}

const DEFAULT_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23f3f4f6" width="400" height="400"/%3E%3Ctext fill="%239ca3af" font-family="system-ui" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/text%3E%3C/svg%3E';

export default function PetImage({
  src,
  alt,
  className = '',
  fallbackSrc = DEFAULT_PLACEHOLDER,
}: PetImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (!error) {
      setError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {isLoading && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      <Image
        src={error ? fallbackSrc : currentSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-opacity duration-300"
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        placeholder={error ? 'empty' : 'blur'}
        blurDataURL={fallbackSrc}
      />
    </div>
  );
}