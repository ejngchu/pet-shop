'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

/**
 * NotFound - Custom 404 page for invalid pet IDs
 * Displayed when accessing non-existent pet detail page
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* 404 Icon */}
          <div className="text-8xl mb-4">🐾</div>
          
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pet Not Found
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The pet you are looking for doesn&apos;t exist in our shop. 
            They might have found their forever home already!
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pets">
              <Button variant="primary" size="lg">
                Browse All Pets
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="lg">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}