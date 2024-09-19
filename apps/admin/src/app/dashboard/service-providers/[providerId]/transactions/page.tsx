"use client";

import { useParams } from "next/navigation";

import {
  useGetAuthedUserAccessLevelsQuery,
  useGetProviderQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { BreadcrumbTitle } from "../../../_components/dashboard-title";

export default function ServiceProviderTransactionsPage() {
  const loading = useAccessLevelGuard("serviceProviders");
  const { values } = useI18n();
  const { providerId } = useParams<{ providerId: string }>();

  const { isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);
  const { data, isLoading: isLoadingProviderData } = useGetProviderQuery({
    providerId,
  });

  if (loading || isLoadingAccessLevels) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <BreadcrumbTitle
        sections={[
          {
            title: values["service-providers.home.title"],
            href: "/dashboard/service-providers",
            isLoading: false,
          },
          {
            title: data?.name,
            href: `/dashboard/service-providers/${providerId}`,
            isLoading: isLoadingProviderData,
          },
          {
            title: values["service-providers.transactions.title"],
            href: `/dashboard/service-providers/${providerId}/transactions`,
            isLoading: false,
          },
        ]}
      />
      <p>Feature coming soon! Stay tuned</p>
    </div>
  );
}
