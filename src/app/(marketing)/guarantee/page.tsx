'use client';

import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useState } from 'react';

/**
 * FAQ item data
 */
const faqItems = [
  {
    question: 'What does the health guarantee cover?',
    answer:
      'Our 30-day health guarantee covers genetic defects and hereditary conditions. If your pet develops any health issues within 30 days of adoption due to pre-existing conditions, we will provide treatment, replacement, or full refund at our discretion.',
  },
  {
    question: 'How do I file a return?',
    answer:
      'To file a return, contact us within 7 days of adoption. The pet must be in healthy condition and returned in their original container/crate. Contact our support team at 555-PETS-HELP to initiate the return process.',
  },
  {
    question: 'Is vaccination included?',
    answer:
      'Yes! All pets are fully vaccinated before adoption. This includes Rabies, Distemper, and Parvovirus vaccines. We provide complete vaccination records with your new companion.',
  },
];

/**
 * Certification data
 */
const certifications = [
  { name: 'AKC Certified', icon: '🏆' },
  { name: 'USDA Licensed', icon: '📋' },
  { name: 'ISO 9001', icon: '✓' },
];

/**
 * FAQ Item component
 */
function FAQItem({
  question,
  answer,
  isExpanded,
  onToggle,
}: {
  question: string;
  answer: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 text-left flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <span className="font-medium text-gray-900 dark:text-gray-100">{question}</span>
        <span className="text-2xl text-brand-500 ml-4">{isExpanded ? '−' : '+'}</span>
      </button>
      {isExpanded && (
        <div className="px-5 py-4 bg-white dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-300">{answer}</p>
        </div>
      )}
    </div>
  );
}

/**
 * Service Guarantee Page
 * Displays all service guarantees, policies, and support information
 */
export default function GuaranteePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-brand-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-100">Service Guarantee</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-700 px-4 md:px-8 py-16">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Service Guarantee
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Your peace of mind is our priority
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-16">
        {/* Guarantee Cards Grid */}
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 30-Day Health Guarantee */}
            <Card variant="elevated" padding="lg" className="bg-brand-50 dark:bg-gray-800">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                30-Day Health Guarantee
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We stand behind the health of every pet. Our comprehensive guarantee covers
                genetic defects and hereditary conditions for 30 days after adoption.
                If any issues arise, we offer treatment, replacement, or full refund.
              </p>
            </Card>

            {/* Vaccination Records */}
            <Card variant="elevated" padding="lg" className="bg-brand-50 dark:bg-gray-800">
              <div className="text-4xl mb-4">💉</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                All Pets Vaccinated
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Every pet receives complete vaccinations before joining their forever home:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Rabies Vaccine
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Distemper Vaccine
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Parvovirus Vaccine
                </li>
              </ul>
            </Card>

            {/* 7-Day Return Policy */}
            <Card variant="elevated" padding="lg" className="bg-brand-50 dark:bg-gray-800">
              <div className="text-4xl mb-4">🔄</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                7-Day Return Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Changed your mind? No worries. Our flexible return policy allows returns within 7 days
                with these conditions:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Pet must be healthy
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-500">✓</span> Original container/crate
                </li>
              </ul>
            </Card>
          </div>
        </FadeIn>

        {/* 24/7 Support Section */}
        <FadeIn>
          <Card variant="outlined" padding="lg">
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Round-the-Clock Support
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We&apos;re here for you 24 hours a day, 7 days a week. Reach out anytime
                through any of these channels:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-xl">📱</span>
                  <span className="font-medium">555-PETS-HELP</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-xl">✉️</span>
                  <a href="mailto:support@petshop.com" className="hover:text-brand-500 transition-colors">
                    support@petshop.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-xl">💬</span>
                  <span className="font-medium">Live Chat</span>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* Quality Certifications */}
        <FadeIn>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Quality Certifications
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {certifications.map((cert) => (
                  <Badge
                    key={cert.name}
                    variant="success"
                    size="md"
                    className="px-4 py-2 text-base"
                  >
                    {`${cert.icon} ${cert.name}`}
                  </Badge>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* FAQ Section */}
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  isExpanded={expandedFaq === index}
                  onToggle={() => toggleFaq(index)}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Contact CTA */}
        <FadeIn>
          <Card variant="elevated" padding="lg" className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Questions? Contact us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
              Our support team is ready to help with any questions about our guarantees,
              policies, or the adoption process. Don&apos;t hesitate to reach out!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg">
                Contact Support
              </Button>
              <Button variant="secondary" size="lg">
                File a Claim
              </Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}