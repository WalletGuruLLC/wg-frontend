"use client";

import { useUserData } from "~/lib/data-access";

export default function LoginPage() {
  const { data, isLoading, error } = useUserData({ id: "1" });

  console.log({ data, isLoading, error });

  return <div>LoginPage</div>;
}
