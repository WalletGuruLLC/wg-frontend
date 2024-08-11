import type { QueryClientConfig } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  QueryClientProvider as _QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

export * from "@tanstack/react-query";

export default function createQueryClientProvider(config?: QueryClientConfig) {
  const queryClient = new QueryClient(config);

  function QueryClientProvider({ children }: { children: ReactNode }) {
    return (
      <_QueryClientProvider client={queryClient}>
        {children}
      </_QueryClientProvider>
    );
  }

  return QueryClientProvider;
}
