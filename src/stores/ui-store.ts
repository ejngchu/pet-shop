"use client";

import { create } from "zustand";

/**
 * Theme type for the application
 */
export type Theme = "light" | "dark";

/**
 * UI store state interface
 */
interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

/**
 * UI store hook using Zustand
 * Manages UI state including theme and sidebar visibility
 * @example
 * ```typescript
 * const { theme, toggleTheme, sidebarOpen } = useUIStore();
 * ```
 */
export const useUIStore = create<UIState>((set) => ({
  theme: "light",
  sidebarOpen: false,

  /**
   * Toggles between light and dark theme
   */
  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    }));
  },

  /**
   * Toggles sidebar visibility
   */
  toggleSidebar: () => {
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    }));
  },
}));