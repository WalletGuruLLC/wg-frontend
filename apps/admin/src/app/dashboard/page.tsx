"use client";

import { useI18n } from "~/lib/i18n";

export default function DashboardPage() {
  const { value } = useI18n("dashboard.home.title");

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="font-base text-4xl">{value} XXX</h1>
    </div>
  );
}
