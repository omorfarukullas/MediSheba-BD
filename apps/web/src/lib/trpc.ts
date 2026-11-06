import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../api/src/router.js';

export const trpc = createTRPCReact<AppRouter>();

/** Call this once at app bootstrap to create the tRPC client with auth header. */
export function createTrpcClient(getToken: () => string | null) {
  return (trpc as any).createClient({
    links: [
      httpBatchLink({
        url: (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:5000/trpc',
        async headers() {
          const token = getToken();
          return token ? { Authorization: `Bearer ${token}` } : {};
        },
      }),
    ],
  });
}
