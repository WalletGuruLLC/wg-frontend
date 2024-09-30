"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRightLeft, DollarSign, Shuffle } from "lucide-react";

import { useGetProviderQuery } from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { BreadcrumbTitle } from "../../../_components/dashboard-title";

const SECTIONS = [
  {
    id: "payment-parameters",
    i18nTitleKey: "service-providers.settings.sections.payment-parameters",
    path: "/payment-parameters",
    Icon: ArrowRightLeft,
  },
  {
    id: "fee",
    i18nTitleKey: "service-providers.settings.sections.fee",
    path: "/fee",
    Icon: DollarSign,
  },
  {
    id: "exchange-rates",
    i18nTitleKey: "service-providers.settings.sections.exchange-rates",
    path: "/exchange-rates",
    Icon: Shuffle,
  },
] as const;

export default function ServiceProviderPage() {
  const { providerId } = useParams<{ providerId: string }>();
  const loading = useAccessLevelGuard({
    general: {
      module: "serviceProviders",
    },
    providers: {
      module: "settings",
      id: providerId,
    },
  });
  const { values } = useI18n();
  const { data, isLoading: isLoadingProviderData } = useGetProviderQuery({
    providerId,
  });

  if (loading) return null;

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
            title: values["service-providers.settings.title"],
            href: `/dashboard/service-providers/${providerId}/settings`,
            isLoading: false,
          },
        ]}
      />
      <div className="flex w-full">
        {SECTIONS.map((section) => (
          <Link
            key={section.id}
            href={`/dashboard/service-providers/${providerId}/settings${section.path}`}
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
