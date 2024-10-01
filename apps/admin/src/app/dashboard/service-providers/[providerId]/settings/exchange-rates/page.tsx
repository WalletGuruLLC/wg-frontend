"use client";

import { useParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { ExchangeRate } from "~/lib/data-access";
import Table, {
  ColumnHeader,
} from "~/app/dashboard/_components/dashboard-table";
import {
  useGetProviderExchangeRatesQuery,
  useGetProviderQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { BreadcrumbTitle } from "../../../../_components/dashboard-title";

const BASE = "USD";

const columnHelper = createColumnHelper<ExchangeRate>();

const columns = [
  columnHelper.accessor("currency", {
    id: "currency",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.exchange-rates.table.header.currency" />
    ),
  }),
  columnHelper.accessor("rate", {
    id: "rate",
    cell: (info) => info.getValue() + " " + BASE,
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.exchange-rates.table.header.rate" />
    ),
  }),
  columnHelper.accessor("validUntil", {
    id: "validUntil",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.exchange-rates.table.header.valid-until" />
    ),
  }),
];

export default function ServiceProviderExchangeRatesPage() {
  const { providerId } = useParams<{ providerId: string }>();
  const loading = useAccessLevelGuard({
    general: {
      module: "serviceProviders",
    },
    providers: {
      id: providerId,
      module: "settings",
    },
  });
  const { values } = useI18n();

  const { data: providerData, isLoading: isLoadingProviderData } =
    useGetProviderQuery({ providerId });
  const { data: exchangeRatesData, isLoading: isLoadingExchangeRatesData } =
    useGetProviderExchangeRatesQuery({ base: BASE });

  const table = useReactTable({
    data: exchangeRatesData?.exchangeRates.rates ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
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
            title: providerData?.name,
            href: `/dashboard/service-providers/${providerId}`,
            isLoading: isLoadingProviderData,
          },
          {
            title: values["service-providers.settings.title"],
            href: `/dashboard/service-providers/${providerId}/settings`,
            isLoading: false,
          },
          {
            title: values["service-providers.settings.exchange-rates.title"],
            href: `/dashboard/service-providers/${providerId}/settings/exchange-rates`,
            isLoading: false,
          },
        ]}
        showLoadingIndicator={isLoadingExchangeRatesData}
      />
      <div className="flex-1 overflow-auto">
        <Table table={table} />
      </div>
    </div>
  );
}
