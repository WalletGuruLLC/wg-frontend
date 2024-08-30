"use client";

import { redirect } from "next/navigation";

import type { AccessLevelModule } from "./data-access";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
} from "./data-access";

export function useAuthGuard() {
  const { data, isLoading } = useGetAuthedUserInfoQuery(undefined);

  if (!isLoading && !data) return redirect("/login");
  if (!isLoading && data?.first) return redirect("/reset-password");

  return isLoading;
}

export function useAccessLevelGuard(module: AccessLevelModule) {
  const { data, isLoading } = useGetAuthedUserAccessLevelsQuery(undefined);

  if (!isLoading && !data?.[module].includes("view"))
    return redirect("/dashboard");

  return isLoading;
}
