"use client";

import { useRouter } from "next/navigation";

import type { AccessLevelModule } from "./data-access";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
} from "./data-access";

export function useAuthGuard() {
  const router = useRouter();
  const { data, isLoading } = useGetAuthedUserInfoQuery(undefined);

  if (!isLoading && !data) return router.replace("/login");
  if (!isLoading && data?.first) return router.replace("/reset-password");

  return isLoading;
}

export function useAccessLevelGuard(module: AccessLevelModule) {
  const router = useRouter();
  const { data, isLoading } = useGetAuthedUserAccessLevelsQuery(undefined);

  if (!isLoading && !data?.[module].includes("view"))
    return router.replace("/dashboard");

  return isLoading;
}
