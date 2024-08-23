"use client";

import { useGetAuthedUserInfoQuery } from "~/lib/data-access";
import { useI18n } from "~/lib/i18n";

export default function DashboardPage() {
  const { data } = useGetAuthedUserInfoQuery(undefined);
  const { value } = useI18n("dashboard.home.title");

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="font-base text-4xl">
        {value} {data?.FirstName} {data?.LastName}
      </h1>
    </div>
  );
}
