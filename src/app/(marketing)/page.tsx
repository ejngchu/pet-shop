'use client';

import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import PageTransition from '@/components/animations/PageTransition';
import PetCard from '@/components/pets/PetCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Pet } from '@/components/pets/types';

/**
 * Mock pet data for featured pets section
 */
const featuredPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 2,
    price: 899,
    image: 'https://placehold.co/400x400/e67e00/ffffff?text=Buddy',
    species: 'dog',
    description: 'Friendly and energetic Golden Retriever puppy, great with kids and other pets.',
  },
  {
    id: '2',
    name: 'Whiskers',
    breed: 'Persian',
    age: 1,
    price: 449,
    image: 'https://placehold.co/400x400/8b4513/ffffff?text=Whiskers',
    species: 'cat',
    description: 'Adorable Persian cat with a calm temperament and beautiful fluffy coat.',
  },
  {
    id: '3',
    name: 'Max',
    breed: 'German Shepherd',
    age: 3,
    price: 799,
    image: 'https://placehold.co/400x400/5a3d2b/ffffff?text=Max',
    species: 'dog',
    description: 'Loyal and intelligent German Shepherd, perfect for active families.',
  },
  {
    id: '4',
    name: 'Fluffy',
    breed: 'Holland Lop',
    age: 1,
    price: 129,
    image: 'https://placehold.co/400x400/d4a574/ffffff?text=Fluffy',
    species: 'rabbit',
    description: 'Sweet and gentle Holland Lop bunny, loves to be cuddled and played with.',
  },
];

/**
 * Services data
 */
const services = [
  {
    icon: '🏠',
    title: 'Adoption',
    description: 'Find your perfect companion from our loving pets looking for their forever homes.',
  },
  {
    icon: '✂️',
    title: 'Grooming',
    description: 'Professional grooming services to keep your pets looking and feeling their best.',
  },
  {
    icon: '🏥',
    title: 'Veterinary',
    description: 'Expert veterinary care to ensure your pets stay healthy and happy.',
  },
];

/**
 * Testimonials data
 */
const testimonials = [
  {
    name: 'Sarah Johnson',
    date: 'March 15, 2026',
    text: 'We found our perfect match! The adoption process was smooth and the staff was incredibly helpful.',
    avatar: 'https://placehold.co/80x80/ff8c00/ffffff?text=SJ',
  },
  {
    name: 'Michael Chen',
    date: 'February 28, 2026',
    text: 'Best pet store experience ever! Our new puppy is healthy, happy, and such a joy to have.',
    avatar: 'https://placehold.co/80x80/8b4513/ffffff?text=MC',
  },
  {
    name: 'Emily Rodriguez',
    date: 'April 2, 2026',
    text: 'The grooming service is amazing. My cat comes back looking like a show winner every time!',
    avatar: 'https://placehold.co/80x80/e67e00/ffffff?text=ER',
  },
];

export default function HomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center bg-gradient-to-r from-brand-500 to-brand-700 px-4 md:px-8 lg:px-16 py-16 overflow-hidden">
          {/* Background pattern with pet placeholders */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 text-9xl">🐕</div>
            <div className="absolute bottom-20 right-20 text-9xl">🐱</div>
            <div className="absolute top-1/3 right-1/4 text-7xl">🐰</div>
            <div className="absolute bottom-1/3 left-1/4 text-7xl">🐦</div>
          </div>

          <FadeIn className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Find Your Perfect Pet Companion
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Welcome to our loving pet community. Whether you&apos;re looking for a playful puppy,
              a cuddly kitten, or a gentle bunny, we have the perfect friend waiting for you.
            </p>
            <Link href="/pets">
              <Button variant="primary" size="lg" className="shadow-lg hover:shadow-xl">
                Browse Pets
              </Button>
            </Link>
          </FadeIn>
        </section>

        {/* Featured Pets Section */}
        <section className="px-4 md:px-8 lg:px-16 py-16 bg-brand-50">
          <FadeIn>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Featured Pets
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Meet our adorable pets looking for their forever homes. Each one is waiting
                to bring joy to your family.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredPets.map((pet, index) => (
                  <FadeIn key={pet.id} delay={index * 0.1} stagger={0.1}>
                    <PetCard pet={pet} />
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Services Section */}
        <section className="px-4 md:px-8 lg:px-16 py-16 bg-white">
          <FadeIn>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Our Services
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                We provide comprehensive care for your beloved pets
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <FadeIn key={service.title} delay={index * 0.15}>
                    <Card variant="elevated" padding="lg" hover className="text-center">
                      <div className="text-5xl mb-4">{service.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">{service.description}</p>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Testimonials Section */}
        <section className="px-4 md:px-8 lg:px-16 py-16 bg-brand-50">
          <FadeIn>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                What Our Customers Say
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Happy pet owners sharing their wonderful experiences
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <FadeIn key={testimonial.name} delay={index * 0.15}>
                    <Card variant="default" padding="lg" className="flex flex-col items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full mb-4 border-4 border-brand-100"
                      />
                      <div className="text-yellow-500 mb-3 text-lg">
                        ⭐⭐⭐⭐⭐
                      </div>
                      <p className="text-gray-600 italic text-center mb-4">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.date}</p>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* About Preview Section */}
        <section className="px-4 md:px-8 lg:px-16 py-16 bg-white">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Our Pet Shop
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We are passionate about connecting loving families with their perfect pet companions.
                Our dedicated team ensures every pet receives the best care and finds a nurturing
                forever home. With years of experience in pet adoption and care, we maintain the
                highest standards of welfare for all our animal friends.
              </p>
              <Link href="/about">
                <Button variant="secondary" size="md">
                  Learn More
                </Button>
              </Link>
            </div>
          </FadeIn>
        </section>
      </div>
    </PageTransition>
  );
}