"use client";

import { useRouter } from "next/navigation";

import { toast } from "@wg-frontend/ui/toast";

import type { ModuleId } from "./data-access";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
} from "./data-access";
import { useI18n } from "./i18n";

export function useAuthGuard() {
  const router = useRouter();
  const { values } = useI18n();
  const { data, isLoading } = useGetAuthedUserInfoQuery(undefined);

  if (!isLoading && !data) return router.replace("/login");
  if (!isLoading && data?.first) return router.replace("/reset-password");
  if (!isLoading && data?.type === "WALLET") {
    router.replace("/login");
    return toast.error(values["auth.2fa.errors.unauthorized"], {
      style: {
        border: "1px solid #E21D1D",
      },
    });
  }

  return isLoading;
}

export function useAccessLevelGuard(module: ModuleId) {
  const router = useRouter();
  const { data, isLoading } = useGetAuthedUserAccessLevelsQuery(undefined);

  if (!isLoading && !data?.[module].includes("view"))
    return router.replace("/dashboard");

  return isLoading;
}
