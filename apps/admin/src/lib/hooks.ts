"use client";

import { redirect } from "next/navigation";

import { useAuthedUserInfoQuery } from "./data-access";

export function useAuthGuard() {
  const { data, isLoading } = useAuthedUserInfoQuery();

  if (!isLoading && !data) return redirect("/login");

  return isLoading;
}
