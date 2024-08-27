import type {
  UseMutationOptions as _UseMutationOptions,
  UseQueryOptions as _UseQueryOptions,
  QueryClientConfig,
} from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  QueryClientProvider as _QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

export * from "@tanstack/react-query";

/**
 * @see https://tanstack.com/query/latest/docs/framework/react/reference/QueryClientProvider
 */
export default function createQueryClientProvider(config?: QueryClientConfig) {
  const queryClient = new QueryClient(config);

  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/QueryClientProvider
   */
  function QueryClientProvider({ children }: { children: ReactNode }) {
    return (
      <_QueryClientProvider client={queryClient}>
        {children}
      </_QueryClientProvider>
    );
  }

  return QueryClientProvider;
}

export type UseQueryOptions<TOutput> = Omit<
  _UseQueryOptions<TOutput>,
  "queryFn" | "queryKey"
>;

export type UseMutationOptions<TInput = unknown, TOutput = unknown> = Omit<
  _UseMutationOptions<TOutput, Error, TInput>,
  "mutationFn" | "mutationKey"
>;
