'use client';

import { useCartStore } from '@/stores/cart-store';
import PetImage from '@/components/pets/PetImage';
import SlideIn from '@/components/animations/SlideIn';
import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

const SHIPPING_COST = 25;

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const shipping = SHIPPING_COST;
  const total = subtotal + shipping;

  const handleRemove = (productId: string) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeItem(productId);
    }
  };

  const handleQuantityChange = (productId: string, currentQty: number, newQty: number, stock: number) => {
    if (newQty < 1 || newQty > stock) return;
    updateQuantity(productId, newQty);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <SlideIn direction="right">
          <div className="text-center py-16">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any pets to your cart yet.</p>
            <Link href="/pets">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </SlideIn>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SlideIn direction="right">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
          <div className="h-px bg-gray-200 mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <FadeIn stagger={0.1}>
              <div className="space-y-4">
                {items.map((item) => {
                  const itemTotal = item.product.price * item.quantity;
                  const isDecreaseDisabled = item.quantity <= 1;
                  const isIncreaseDisabled = item.quantity >= item.product.stock;

                  return (
                    <Card key={item.product.id} variant="outlined" padding="md" className="flex flex-col sm:flex-row gap-4 sm:items-center">
                      {/* Pet Image */}
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <PetImage
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Stock: {item.product.stock} available
                        </p>
                        <p className="text-lg font-semibold text-brand-500 mt-2">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={isDecreaseDisabled}
                          onClick={() => handleQuantityChange(
                            item.product.id,
                            item.quantity,
                            item.quantity - 1,
                            item.product.stock
                          )}
                          aria-label="Decrease quantity"
                        >
                          −
                        </Button>
                        <span className="w-8 text-center font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={isIncreaseDisabled}
                          onClick={() => handleQuantityChange(
                            item.product.id,
                            item.quantity,
                            item.quantity + 1,
                            item.product.stock
                          )}
                          aria-label="Increase quantity"
                        >
                          +
                        </Button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right min-w-[80px]">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-lg font-bold text-brand-500">
                          ${itemTotal.toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemove(item.product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        🗑️
                      </button>
                    </Card>
                  );
                })}
              </div>
            </FadeIn>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/pets" className="flex-1">
                <Button variant="secondary" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/checkout" className="flex-1">
                <Button variant="primary" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <Card variant="elevated" padding="lg" className="sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                
                <div className="h-px bg-gray-200 my-4" />
                
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-brand-500">${total.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-4 text-center">
                Shipping cost may vary at checkout
              </p>
            </Card>
          </div>
        </div>
      </SlideIn>
    </div>
  );
}