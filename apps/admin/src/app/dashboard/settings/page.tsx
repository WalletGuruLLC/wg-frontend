"use client";

import Link from "next/link";
import { ArrowRightLeft, Shuffle } from "lucide-react";

import { useGetDashboardUsersTitleQuery } from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { SimpleTitle } from "../_components/dashboard-title";

export default function ServiceProviderPage() {
  const loading = useAccessLevelGuard({
    general: {
      module: "settings",
    },
  });
  const { values } = useI18n();
  const { data: title, isLoading: isLoadingTitle } =
    useGetDashboardUsersTitleQuery(undefined);

  if (loading) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <SimpleTitle
        title={`${title ?? ""} ${values["dashboard.settings.title"]}`}
        showLoadingIndicator={isLoadingTitle}
      />
      <div className="flex w-full">
        <Link
          href={`/dashboard/settings/payment-parameters`}
          className="m-3 flex h-[200px] flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <ArrowRightLeft size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["service-providers.settings.sections.payment-parameters"]}
          </span>
        </Link>
        <Link
          href={`/dashboard/settings/exchange-rates`}
          className="m-3 flex h-[200px] flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <Shuffle size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["service-providers.settings.sections.exchange-rates"]}
          </span>
        </Link>
      </div>
    </div>
  );
}
