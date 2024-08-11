import type { UseQueryOptions } from "@wg-frontend/data-access";
import { useQuery } from "@wg-frontend/data-access";

import customFetch from "./custom-fetch";

export function useUserData(
  input: {
    id: string;
  },
  options: Omit<UseQueryOptions, "queryFn" | "queryKey"> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["use-user-data"],
    queryFn: () => {
      return customFetch<{ name: string }>(
        "https://api.example.com/user-data/" + input.id,
      );
    },
  });
}
