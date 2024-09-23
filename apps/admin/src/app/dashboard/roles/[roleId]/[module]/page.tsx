"use client";

import { useParams } from "next/navigation";

import type { AccessLevelModule } from "~/lib/data-access";
import { useGetRoleQuery } from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { BreadcrumbTitle } from "../../../_components/dashboard-title";

type Module = Exclude<AccessLevelModule, "serviceProviders" | "wallets">;

export default function RoleAccessLevels() {
  const loading = useAccessLevelGuard("roles");
  const { values } = useI18n();
  const { roleId, module } = useParams<{ roleId: string; module: Module }>();

  const { data, isLoading: isLoadingRoleData } = useGetRoleQuery({ roleId });

  if (loading) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <BreadcrumbTitle
        sections={[
          {
            title: values["dashboard.roles.role.title"] + data?.Name,
            href: `/dashboard/roles/${roleId}`,
            isLoading: isLoadingRoleData,
          },
          {
            title: values[`dashboard.roles.role.modules.${module}`],
            href: `/dashboard/roles/${roleId}/${module}`,
            isLoading: isLoadingRoleData,
          },
        ]}
        showLoadingIndicator={isLoadingRoleData}
      />
      <div className="flex-1 overflow-auto">WIP</div>
    </div>
  );
}
