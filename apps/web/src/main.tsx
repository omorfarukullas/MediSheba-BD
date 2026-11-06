import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, createTrpcClient } from './lib/trpc';
import { useAuthStore } from './stores/auth.store';
import App from './App';
import './index.css';

// Initialize auth store listeners (runs the onAuthStateChanged bootstrap)
import './stores/auth.store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 min
      retry: 1,
    },
  },
});

function Root() {
  const token = useAuthStore((s) => s.token);
  const [trpcClient] = React.useState(() =>
    createTrpcClient(() => useAuthStore.getState().token)
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
