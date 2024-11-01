"use client";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table, {
  ColumnHeader,
} from "~/app/dashboard/_components/dashboard-table";
import { useGetDashboardUsersTitleQuery } from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { BreadcrumbTitle } from "../../_components/dashboard-title";

const columnHelper = createColumnHelper<{
  currency: string;
  rate: string;
  validUntil: string;
}>();

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
    cell: (info) => info.getValue(),
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
  const loading = useAccessLevelGuard({
    general: {
      module: "settings",
    },
  });
  const { values } = useI18n();

  const { isLoading: isLoadingTitle } =
    useGetDashboardUsersTitleQuery(undefined);
  const table = useReactTable({
    data: [
      {
        currency: "USD",
        rate: "1.00",
        validUntil: "2022-01-01",
      },
      {
        currency: "EUR",
        rate: "0.85",
        validUntil: "2022-01-01",
      },
    ],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <BreadcrumbTitle
        sections={[
          {
            title: values["service-providers.settings.title"],
            href: `/dashboard/settings`,
            isLoading: false,
          },
          {
            title: values["service-providers.settings.exchange-rates.title"],
            href: `/dashboard/settings/exchange-rates`,
            isLoading: false,
          },
        ]}
        showLoadingIndicator={isLoadingTitle}
      />
      <div className="flex-1 overflow-auto">
        <Table table={table} />
      </div>
    </div>
  );
}
