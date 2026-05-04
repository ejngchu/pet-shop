'use client';

import FadeIn from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

/**
 * About Us Page - Company story, mission, team, timeline, and CTA
 */
export default function AboutPage() {
  const teamMembers = [
    { name: 'John', role: 'CEO', initials: 'JD' },
    { name: 'Sarah', role: 'Head Groomer', initials: 'SM' },
    { name: 'Mike', role: 'Vet', initials: 'MR' },
    { name: 'Emily', role: 'Customer Support', initials: 'EK' },
  ];

  const milestones = [
    { year: '2020', event: 'Founded PetShop with a mission to help pets find loving homes' },
    { year: '2021', event: 'Reached 1,000+ adoptions milestone' },
    { year: '2022', event: 'Launched professional grooming service' },
    { year: '2023', event: 'Opened on-site veterinary clinic' },
    { year: '2024', event: 'Launched online pet supply store' },
    { year: '2026', event: 'Celebrated 10,000+ happy adoptions' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <FadeIn>
        <div className="bg-gray-50 py-3 px-4 md:px-8">
          <p className="text-sm text-gray-600">
            Home &gt; About Us
          </p>
        </div>
      </FadeIn>

      {/* Page Heading */}
      <FadeIn delay={0.1}>
        <section className="py-16 px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-500 mb-4">
            About PetShop
          </h1>
          <p className="text-xl text-gray-600">
            Your trusted pet companion since 2020
          </p>
        </section>
      </FadeIn>

      {/* Story Section */}
      <FadeIn delay={0.2}>
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Text Content */}
              <div className="md:w-1/2 space-y-4 text-left">
                <p className="text-gray-700 leading-relaxed">
                  At PetShop, our passion for pets began with a simple belief: every 
                  animal deserves a loving home. What started as a small family operation 
                  has grown into a trusted destination for families seeking their perfect 
                  pet companions.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to providing the highest quality care for every animal 
                  that passes through our doors. From comprehensive health checks to 
                  personalized grooming services, our dedicated team ensures each pet receives 
                  the attention and care they deserve.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Building lasting relationships with our community has been at the heart 
                  of our journey. We believe in transparency, ethical practices, and going 
                  above and beyond for both pets and their new families. Your trust is what 
                  drives us to keep improving every day.
                </p>
              </div>
              {/* Image Placeholder */}
              <div className="md:w-1/2">
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Our Story Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Mission & Vision */}
      <FadeIn delay={0.3}>
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Mission & Vision
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <Card variant="elevated" padding="lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-brand-500 mb-3">Mission</h3>
                  <p className="text-gray-700">
                    To connect loving families with their perfect pet companions
                  </p>
                </div>
              </Card>
              {/* Vision Card */}
              <Card variant="elevated" padding="lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔭</div>
                  <h3 className="text-xl font-semibold text-brand-500 mb-3">Vision</h3>
                  <p className="text-gray-700">
                    A world where every pet has a loving home
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Team Section */}
      <FadeIn delay={0.4}>
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.role} className="text-center">
                  {/* Avatar Placeholder */}
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-xl font-medium">
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Timeline Section */}
      <FadeIn delay={0.5}>
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Journey
            </h2>
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-brand-200" />
              
              {/* Timeline Events */}
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="relative flex items-start pl-12">
                    {/* Dot */}
                    <div className="absolute left-2 w-5 h-5 bg-brand-500 rounded-full border-4 border-white" />
                    {/* Content */}
                    <div>
                      <span className="text-xl font-bold text-brand-500">
                        {milestone.year}
                      </span>
                      <p className="text-gray-700 mt-1">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* CTA Section */}
      <FadeIn delay={0.6}>
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <Card variant="elevated" padding="lg" className="bg-brand-50 rounded-2xl">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Ready to find your pet?
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/pets">
                    <Button variant="primary" size="lg">
                      Browse Pets
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="secondary" size="lg">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}