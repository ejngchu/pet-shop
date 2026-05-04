"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Product interface representing a pet product item
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

/**
 * CartItem interface representing an item in the shopping cart
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Cart store state interface
 */
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

/**
 * Cart store hook using Zustand with persist middleware
 * Manages shopping cart state for pet products
 * @example
 * ```typescript
 * const { items, addItem, removeItem } = useCartStore();
 * ```
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      /**
       * Adds a product to the cart or increments quantity if already exists
       * @param product - The product to add
       */
      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        });
      },

      /**
       * Removes a product from the cart
       * @param productId - The ID of the product to remove
       */
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      /**
       * Updates the quantity of a product in the cart
       * @param productId - The ID of the product
       * @param quantity - The new quantity (must be >= 1)
       */
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity < 1) return;

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      /**
       * Clears all items from the cart
       */
      clearCart: () => {
        set({ items: [] });
      },

      /**
       * Gets the total number of items in the cart
       * @returns Total quantity of all items
       */
      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },

      /**
       * Gets the total price of all items in the cart
       * @returns Total price formatted to 2 decimal places
       */
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "pet-shop-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);