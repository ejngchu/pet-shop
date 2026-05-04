"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";

/**
 * Header navigation component for desktop
 * Displays logo, navigation links, auth buttons, and cart with badge
 */
export default function Header() {
  const pathname = usePathname();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const cartCount = getTotalItems();

  // Auth state
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pets", label: "Pets" },
    { href: "/about", label: "About" },
    { href: "/store", label: "Store" },
    { href: "/guarantee", label: "Guarantee" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-brand-500 transition-colors hover:text-brand-700"
        >
          <span className="text-brown-500">Pet</span>
          <span>Shop</span>
        </Link>

        {/* Desktop Navigation - hidden on mobile, visible on md+ */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-500 ${
                isActive(link.href)
                  ? "text-brand-500"
                  : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons and Cart */}
        <div className="hidden md:flex items-center gap-4">
          {/* Auth Buttons - show user name if authenticated, login/register if not */}
          {isAuthenticated() ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">
                {user?.name || user?.email || "Account"}
              </span>
              <button
                onClick={logout}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-500"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Register
              </Link>
            </div>
          )}

          {/* Cart Icon with Badge */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center p-2 text-gray-600 transition-colors hover:text-brand-500"
            aria-label="Shopping cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button - visible on mobile, hidden on md+ */}
        <button
          className="md:hidden flex items-center justify-center p-2 text-gray-600"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}