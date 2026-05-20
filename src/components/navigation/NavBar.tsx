"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";

/**
 * Mobile bottom navigation bar
 * Fixed at bottom on mobile, hidden on md+ screens
 * Shows Home, Pets, Cart (with badge), and Account
 */
export default function NavBar() {
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  // Auth state
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: (
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
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      href: "/pets",
      label: "Pets",
      icon: (
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
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      ),
    },
    {
      href: "/cart",
      label: "Cart",
      icon: (
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
      ),
      hasBadge: true,
    },
    {
      href: isAuthenticated() ? "#" : "/login",
      label: isAuthenticated() ? (user?.name?.split(" ")[0] || user?.email?.split("@")[0] || "Account") : "Account",
      icon: isAuthenticated() ? (
        // Avatar when logged in
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white text-xs font-bold">
          {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"}
        </div>
      ) : (
        // Login icon when not logged in
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
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
      isAuthButton: isAuthenticated(),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.slice(0, 3).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-col items-center justify-center px-3 py-2 transition-colors ${
              isActive(item.href)
                ? "text-brand-500"
                : "text-gray-500"
            }`}
            aria-label={item.label}
          >
            <div className="relative flex items-center justify-center">
              {item.icon}
              {item.hasBadge && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </div>
            <span className="mt-1 text-xs font-medium">{item.label}</span>
            {isActive(item.href) && (
              <span className="absolute -bottom-px left-1/2 h-0.5 w-8 -translate-x-1/2 bg-brand-500" />
            )}
          </Link>
        ))}

        {/* Account / Auth Button - rendered separately for special handling */}
        {isAuthenticated() ? (
          <button
            onClick={logout}
            className={`relative flex flex-col items-center justify-center px-3 py-2 transition-colors text-gray-500`}
            aria-label="Logout"
          >
            <div className="relative flex items-center justify-center">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"}
              </div>
            </div>
            <span className="mt-1 text-xs font-medium">Logout</span>
          </button>
        ) : (
          <Link
            href="/login"
            className={`relative flex flex-col items-center justify-center px-3 py-2 transition-colors ${
              isActive("/login")
                ? "text-brand-500"
                : "text-gray-500"
            }`}
            aria-label="Account"
          >
            <div className="relative flex items-center justify-center">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <span className="mt-1 text-xs font-medium">Account</span>
            {isActive("/login") && (
              <span className="absolute -bottom-px left-1/2 h-0.5 w-8 -translate-x-1/2 bg-brand-500" />
            )}
          </Link>
        )}
      </div>
    </nav>
  );
}