'use client';

/**
 * Marketing layout - wraps marketing pages (home, about, store-info, guarantee)
 * Includes Header navigation and Footer
 */
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
