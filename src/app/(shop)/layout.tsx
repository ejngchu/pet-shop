'use client';

/**
 * Shop layout - wraps shop pages (products, cart, checkout, etc.)
 * Includes Header with cart badge
 */
import { useCartStore } from '@/stores/cart-store';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Header will be added in Task 9 */}
          <div>
            {/* Header/Footer will be added in Task 9 */}
          </div>

          {/* Cart icon with badge */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}