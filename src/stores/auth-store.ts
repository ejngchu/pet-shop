"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * User interface representing an authenticated user
 */
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

/**
 * Auth store state interface
 */
interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

/**
 * Auth store hook using Zustand with persist middleware
 * Handles user authentication state with simulated email/password login
 * @example
 * ```typescript
 * const { user, login, logout } = useAuthStore();
 * ```
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      /**
       * Simulates user login with email and password
       * For demo purposes, accepts any valid email/password combination
       * @param email - User's email address
       * @param password - User's password
       * @returns Promise<boolean> - True if login successful
       */
      login: async (email: string, password: string): Promise<boolean> => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Basic validation for demo purposes
        if (!email || !password || !email.includes("@")) {
          return false;
        }

        // Create simulated user
        const user: User = {
          id: crypto.randomUUID(),
          email,
          name: email.split("@")[0],
          createdAt: new Date().toISOString(),
        };

        set({ user });
        return true;
      },

      /**
       * Logs out the current user and clears the session
       */
      logout: () => {
        set({ user: null });
      },

      /**
       * Checks if user is authenticated
       * @returns Boolean indicating authentication status
       */
      isAuthenticated: () => {
        return get().user !== null;
      },
    }),
    {
      name: "pet-shop-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);