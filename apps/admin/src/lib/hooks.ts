"use client";

import { redirect } from "next/navigation";

import { useGetAuthedUserInfoQuery } from "./data-access";

export function useAuthGuard() {
  const { data, isLoading } = useGetAuthedUserInfoQuery(undefined);

  if (!isLoading && !data) return redirect("/login");

  return isLoading;
}
