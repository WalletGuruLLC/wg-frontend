"use client";

import { useRouter } from "next/navigation";

import type { ModuleId } from "./data-access";
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

export function useAccessLevelGuard({
  general,
  providers,
}: {
  general: {
    module: ModuleId;
  };
  providers?: {
    module: ModuleId;
    id: string;
  };
}) {
  const router = useRouter();
  const { data, isLoading } = useGetAuthedUserAccessLevelsQuery(undefined);

  if (!isLoading && !data?.general[general.module].includes("view"))
    return router.replace("/dashboard");
  if (
    !isLoading &&
    providers &&
    !data?.providers[providers.id]?.[providers.module].includes("view")
  )
    return router.replace(`/dashboard/service-providers/${providers.id}`);

  return isLoading;
}
