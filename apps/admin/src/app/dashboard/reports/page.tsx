"use client";

import Link from "next/link";
import { ArrowRightLeft, Calendar, DollarSign, User } from "lucide-react";

import { useGetDashboardUsersTitleQuery } from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { SimpleTitle } from "../_components/dashboard-title";

export default function ServiceProviderPage() {
  const loading = useAccessLevelGuard({
    general: {
      module: "settings", // DUDA
    },
  });
  const { values } = useI18n();
  const { data: title, isLoading: isLoadingTitle } =
    useGetDashboardUsersTitleQuery(undefined);

  if (loading) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <SimpleTitle
        title={`${title ?? ""} ${values["dashboard.reports.title"]}`}
        showLoadingIndicator={isLoadingTitle}
      />
      <div className="flex w-full">
        <Link
          href={`/dashboard/reports/created-by-user`}
          className="m-3 flex h-[200px] min-w-60 flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <User size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["dashboard.reports.sections.transactions-by-user"]}
          </span>
        </Link>
        <Link
          href={`/dashboard/reports/created-by-provider`}
          className="m-3 flex h-[200px] min-w-60 flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <Calendar size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["dashboard.reports.sections.transactions-by-provider"]}
          </span>
        </Link>
        <Link
          href={`/dashboard/reports/revenue`}
          className="m-3 flex h-[200px] min-w-60 flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <DollarSign size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["dashboard.reports.sections.revenue"]}
          </span>
        </Link>
        <Link
          href={`/dashboard/reports/clear-payments`}
          className="m-3 flex h-[200px] min-w-60 flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <ArrowRightLeft size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["dashboard.reports.sections.clear-payments"]}
          </span>
        </Link>
      </div>
    </div>
  );
}
