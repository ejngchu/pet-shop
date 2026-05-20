'use client';

/**
 * Auth layout - wraps authentication pages (login, register)
 * Uses Header and NavBar for consistent navigation
 */
import Header from '@/components/navigation/Header';
import NavBar from '@/components/navigation/NavBar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center pb-20">{children}</main>
      <NavBar />
    </div>
  );
}
