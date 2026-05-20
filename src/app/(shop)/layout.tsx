'use client';

/**
 * Shop layout - wraps shop pages (pets, cart, checkout)
 * Includes Header navigation and mobile bottom nav
 */
import Header from '@/components/navigation/Header';
import NavBar from '@/components/navigation/NavBar';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-20">{children}</main>
      <NavBar />
    </div>
  );
}
