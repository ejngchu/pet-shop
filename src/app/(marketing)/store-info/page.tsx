'use client';

import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

/**
 * Business hours data
 */
const businessHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
];

/**
 * Store photos data
 */
const storePhotos = [
  { src: 'https://placehold.co/400x300/e67e00/ffffff?text=Store+Front', alt: 'Store front view' },
  { src: 'https://placehold.co/400x300/8b4513/ffffff?text=Inside+1', alt: 'Inside view 1' },
  { src: 'https://placehold.co/400x300/5a3d2b/ffffff?text=Inside+2', alt: 'Inside view 2' },
];

/**
 * Store Info Page - Location, hours, contact, and directions
 */
export default function StoreInfoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <FadeIn>
        <div className="bg-gray-50 py-3 px-4 md:px-8">
          <p className="text-sm text-gray-600">
            Home &gt; Store Info
          </p>
        </div>
      </FadeIn>

      {/* Page Heading */}
      <FadeIn delay={0.1}>
        <section className="py-16 px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-500 mb-4">
            Our Store
          </h1>
          <p className="text-xl text-gray-600">
            Visit us today!
          </p>
        </section>
      </FadeIn>

      {/* Map and Store Details Section */}
      <FadeIn delay={0.2}>
        <section className="py-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Map Placeholder */}
              <div className="bg-gray-300 rounded-lg h-64 md:h-96 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Map Loading...</span>
              </div>

              {/* Right: Store Details */}
              <div className="space-y-4">
                <Card variant="default" padding="lg">
                  <div className="space-y-4">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📍</span>
                      <div>
                        <p className="font-semibold text-gray-900">Address</p>
                        <p className="text-gray-700">123 Pet Street, Pet City, PC 12345</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📞</span>
                      <div>
                        <p className="font-semibold text-gray-900">Phone</p>
                        <p className="text-gray-700">555-PETS-123</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">✉️</span>
                      <div>
                        <p className="font-semibold text-gray-900">Email</p>
                        <p className="text-gray-700">info@petshop.com</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Business Hours */}
                <Card variant="default" padding="lg">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">Business Hours</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {businessHours.map((item) => (
                      <div key={item.day} className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{item.day}</span>
                        <span className="text-gray-700">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Parking Info */}
                <Card variant="default" padding="lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🅿️</span>
                    <div>
                      <p className="font-semibold text-gray-900">Parking</p>
                      <p className="text-gray-700">Free parking available in front of store</p>
                    </div>
                  </div>
                </Card>

                {/* Public Transport */}
                <Card variant="default" padding="lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🚌</span>
                    <div>
                      <p className="font-semibold text-gray-900">Public Transport</p>
                      <p className="text-gray-700">Bus lines 42, 15 stop at our door</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Store Photos Section */}
      <FadeIn delay={0.3}>
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Store
            </h2>
            <div className="flex flex-row gap-4 overflow-x-auto pb-4">
              {storePhotos.map((photo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-lg overflow-hidden"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-48 w-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* CTA Section */}
      <FadeIn delay={0.4}>
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Visit Us Today!
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  Directions
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}