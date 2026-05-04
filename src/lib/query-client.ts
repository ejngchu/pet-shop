'use client';

import { QueryClient, isServer } from '@tanstack/react-query';

/**
 * QueryClient factory for SSR support.
 * 
 * Creates a new QueryClient instance. On the server, this creates a unique
 * client per request to prevent data leakage between requests.
 * On the client, this reuses the same client to maintain cached data.
 * 
 * SSR Pattern:
 * - Use prefetchQuery in Server Components to pre-load data
 * - Pass pre-fetched data via HydrationBoundary to dehydrate state
 * - Client hydrates the dehydrated state on mount
 * 
 * Query Keys Reference:
 * - ['pets', 'list'] - Pet listing
 * - ['pets', 'detail', id] - Pet details by ID
 * - ['cart'] - Shopping cart
 * - ['user'] - User data
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 60 second stale time for e-commerce data
        // Reduces refetch frequency for better UX
        staleTime: 60000,
        // Disable refetch on window focus for better UX
        // Prevents unexpected data refresh when user switches tabs
        refetchOnWindowFocus: false,
      },
    },
  });
}

// Browser QueryClient singleton
// Cache the client to persist across热 updates in development
let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Returns the appropriate QueryClient for the current environment.
 * 
 * On server: creates a new client per request
 * On browser: reuses cached client or creates new one
 */
export function getQueryClient() {
  if (!isServer) {
    // Browser environment - reuse or create client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
  
  // Server environment - create unique client per request
  // This prevents data leakage between concurrent requests
  return makeQueryClient();
}