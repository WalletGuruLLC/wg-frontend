"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRightLeft, Settings, SquareUserRound, Users } from "lucide-react";

import {
  useGetAuthedUserAccessLevelsQuery,
  useGetProviderQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { BreadcrumbTitle } from "../../_components/dashboard-title";

const SECTIONS = [
  {
    id: "users",
    i18nTitleKey: "service-providers.home.sections.users.label",
    path: "/users",
    moduleId: null,
    Icon: Users,
  },
  {
    id: "roles",
    i18nTitleKey: "service-providers.home.sections.roles.label",
    path: "/roles",
    moduleId: null,
    Icon: SquareUserRound,
  },
  {
    id: "settings",
    i18nTitleKey: "service-providers.home.sections.settings.label",
    path: "/settings",
    moduleId: null,
    Icon: Settings,
  },
  {
    id: "transactions",
    i18nTitleKey: "service-providers.home.sections.transactions.label",
    path: "/transactions",
    moduleId: null,
    Icon: ArrowRightLeft,
  },
] as const;

export default function ServiceProviderPage() {
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
            title: values["service-providers.home.title.section-1"],
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
      <div className="flex w-full">
        {SECTIONS.map((section) => (
          <Link
            key={section.id}
            href={`/dashboard/service-providers/${providerId}${section.path}`}
            className="m-3 flex h-[200px] flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
          >
            <section.Icon size={32} strokeWidth={0.75} color="#3678B1" />
            <span className="text-2xl">{values[section.i18nTitleKey]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
