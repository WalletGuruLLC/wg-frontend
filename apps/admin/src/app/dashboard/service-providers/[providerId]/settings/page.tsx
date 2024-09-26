"use client";

import type { z } from "zod";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";

import type { ProviderSetting } from "~/lib/data-access";
import type { paginationAndSearchValidator } from "~/lib/validators";
import { Input } from "~/app/dashboard/_components/dashboard-input";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "~/app/dashboard/_components/dashboard-table";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetProviderQuery,
  useGetProviderSettingsQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { BreadcrumbTitle } from "../../../_components/dashboard-title";

const columnHelper = createColumnHelper<ProviderSetting>();

const columns = [
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.table.header.name" />
    ),
  }),
  columnHelper.accessor("key", {
    id: "key",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.table.header.key" />
    ),
  }),
  columnHelper.accessor("cost", {
    id: "amount",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.table.header.amount" />
    ),
  }),
  columnHelper.accessor("cost", {
    id: "amount",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.table.header.amount" />
    ),
  }),
  columnHelper.accessor("frequency", {
    id: "frequency",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.table.header.frequency" />
    ),
  }),
  columnHelper.accessor("interval", {
    id: "interval",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.table.header.interval" />
    ),
  }),
  columnHelper.accessor("seconds", {
    id: "seconds",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.table.header.seconds" />
    ),
  }),
  columnHelper.accessor("active", {
    id: "active",
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.table.header.is-active" />
    ),
    cell: (_) => "-",
    // <SwitchActiveStatusDialog
    //   wallet={{
    //     id: info.row.original.id,
    //     isActive: info.getValue(),
    //   }}
    // />
  }),
  columnHelper.display({
    id: "actions",
    header: () => (
      <ColumnHeader i18nKey="dashboard.wallet-management.table.header.actions" />
    ),
    cell: (_) => "-",
    // <Actions
    //   wallet={{
    //     id: info.row.original.id,
    //     name: info.row.original.name,
    //     walletType: info.row.original.walletType,
    //     walletAddress: info.row.original.walletAddress,
    //   }}
    // />
  }),
];

export default function ServiceProviderSettingsPage() {
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

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paginationAndSearch: z.infer<typeof paginationAndSearchValidator> = {
    page: searchParams.get("page") ?? "1",
    items: searchParams.get("items") ?? "10",
    search: searchParams.get("search") ?? "",
  };

  const { data, isLoading } = useGetProviderSettingsQuery({
    ...paginationAndSearch,
    providerId,
  });
  const { data: providerData, isLoading: isLoadingProviderData } =
    useGetProviderQuery({ providerId });
  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);

  const table = useReactTable({
    data: data?.data ?? [],
    columns: columns
      .filter(
        (c) =>
          c.id !== "actions" ||
          accessLevelsData?.providers[providerId]?.settings.includes("edit"),
      )
      .filter(
        (c) =>
          c.id !== "active" ||
          accessLevelsData?.providers[providerId]?.settings.includes(
            "inactive",
          ),
      ),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  function handlePaginationAndSearchChange(
    newPaginationAndSearch: Partial<
      z.infer<typeof paginationAndSearchValidator>
    >,
  ) {
    const params = new URLSearchParams(searchParams);
    for (const key in newPaginationAndSearch) {
      const val =
        newPaginationAndSearch[key as keyof typeof newPaginationAndSearch];
      if (val) {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    }
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  const firstRowIdx =
    Number(paginationAndSearch.items) * Number(paginationAndSearch.page) -
    Number(paginationAndSearch.items) +
    1;
  const lastRowIdx = firstRowIdx + table.getRowModel().rows.length - 1;

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
            title: providerData?.name,
            href: `/dashboard/service-providers/${providerId}`,
            isLoading: isLoadingProviderData,
          },
          {
            title: values["service-providers.settings.title"],
            href: `/dashboard/service-providers/${providerId}/settings`,
            isLoading: false,
          },
        ]}
        showLoadingIndicator={isLoading}
      />
      <div className="flex flex-row items-center space-x-6">
        <div className="relative flex-1">
          <Input
            placeholder={
              values["service-providers.settings.search.placeholder"]
            }
            className="rounded-full border border-black"
            name="search"
            onChange={(e) =>
              handlePaginationAndSearchChange({
                ...paginationAndSearch,
                search: e.target.value,
                page: "1",
              })
            }
            value={paginationAndSearch.search}
          />
          <Search
            className="absolute right-4 top-1/2 size-6 -translate-y-1/2 transform"
            strokeWidth={0.75}
          />
        </div>
        {/* {accessLevelsData?.providers.wallets.includes("add") && (
          <AddOrEditDialog
            trigger={
              <Button className="flex h-max flex-row items-center space-x-2">
                <p className="flex-1 text-lg font-light">
                  {values["dashboard.wallet-management.add-button"]}
                </p>
                <PlusCircle strokeWidth={0.75} className="size-6" />
              </Button>
            }
          />
        )} */}
      </div>
      <div className="flex-1 overflow-auto">
        <Table table={table} />
      </div>
      <div>
        <PaginationFooter
          count={{
            total: data?.total ?? 0,
            firstRowIdx,
            lastRowIdx,
          }}
          items={paginationAndSearch.items ?? "10"}
          onItemsChange={(items) =>
            handlePaginationAndSearchChange({
              ...paginationAndSearch,
              items,
              page: "1",
            })
          }
          canPreviousPage={paginationAndSearch.page !== "1"}
          canNextPage={data?.data.length === Number(paginationAndSearch.items)}
          onPreviousPage={() =>
            handlePaginationAndSearchChange({
              ...paginationAndSearch,
              page: String(Number(paginationAndSearch.page) - 1),
            })
          }
          onNextPage={() =>
            handlePaginationAndSearchChange({
              ...paginationAndSearch,
              page: String(Number(paginationAndSearch.page) + 1),
            })
          }
        />
      </div>
    </div>
  );
}
