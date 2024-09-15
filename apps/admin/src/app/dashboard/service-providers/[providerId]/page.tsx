"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Card } from "@wg-frontend/ui/card";

import {
  useGetAuthedUserAccessLevelsQuery,
  useGetProviderByIdQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { BreadcrumbTitle } from "../../_components/dashboard-title";

export default function DashboardProviders() {
  const loading = useAccessLevelGuard("serviceProviders");
  const { values } = useI18n();
  //const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
  const { isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);
  const { providerId } = useParams<{ providerId: string }>();
  const { data, isLoading: isLoadingProviderData } = useGetProviderByIdQuery({
    providerId,
  });

  if (loading || isLoadingAccessLevels) return null;
  return (
    <div className="flex-1 overflow-auto">
      <BreadcrumbTitle
        sections={[
          {
            title: "Service Providers",
            href: "/dashboard/service-providers",
            isLoading: false,
          },
          {
            title: data?.name,
            href: `/dashboard/service-providers/${providerId}`,
            isLoading: isLoadingProviderData,
          },
        ]}
      />
      <div className="m-2 mb-10 grid grid-cols-2 gap-10 sm:grid-cols-3">
        <Link href={`/dashboard/service-providers/${providerId}/users`}>
          <Card>{values["dashboard.provider.users.title"]}asds</Card>
        </Link>
      </div>
    </div>
  );
}
