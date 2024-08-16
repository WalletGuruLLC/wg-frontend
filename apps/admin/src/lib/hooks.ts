"use client";

import { redirect } from "next/navigation";

import { useAuthedUserInfoQuery } from "./data-access";

export function useAuthGuard() {
  const { data, isLoading } = useAuthedUserInfoQuery();

  if (!isLoading) {
    if (data === undefined) return redirect("/login");
    if (data.First) return redirect("/reset-password");
  }

  return isLoading;
}
