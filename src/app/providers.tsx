'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { useState } from 'react';

/**
 * Providers component - wraps the application with client-side providers.
 * 
 * This component initializes the QueryClient for the current environment
 * and provides it to the React Query context.
 * 
 * SSR Pattern with HydrationBoundary:
 * 1. Server Component prefetches data using prefetchQuery
 * 2. Server Component dehydrates state using dehydrate (from @tanstack/react-query)
 * 3. Pass dehydrated state to HydrationBoundary
 * 4. This component hydrates the pre-fetched data on the client
 * 
 * Usage:
 * ```tsx
 * // In layout.tsx (Server Component)
 * import { getQueryClient } from '@/lib/query-client';
 * import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
 * 
 * export default async function RootLayout({ children }) {
 *   const queryClient = getQueryClient();
 *   await queryClient.prefetchQuery({
 *     queryKey: ['pets', 'list'],
 *     queryFn: () => fetchPets(),
 *   });
 * 
 *   return (
 *     <html>
 *       <body>
 *         <Providers>
 *           <HydrationBoundary state={dehydrate(queryClient)}>
 *             {children}
 *           </HydrationBoundary>
 *         </Providers>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  // Once the component mounts, use the browser's QueryClient
  // This ensures we don't share state with the server
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}