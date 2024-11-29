"use client";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Download } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import type { z } from "zod";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { cn } from "@wg-frontend/ui";
import { Label } from "@wg-frontend/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@wg-frontend/ui/select";

import Table, {
  ColumnHeader,
  PaginationFooter,
} from "~/app/dashboard/_components/dashboard-table";
import { Button } from "~/components/button";
import { SelectTrigger } from "~/components/select";
import type { Activity, Transaction } from "~/lib/data-access";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
  useGetDashboardUsersTitleQuery,
  useGetProvidersQuery,
  useGetTransactionsByUserQuery
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import type {
  paginationAndSearchValidator,
  transactionsByUserValidator,
} from "~/lib/validators";
import Dialog from "../../_components/dashboard-dialog";
import { SimpleTitle } from "../../_components/dashboard-title";

function Actions({ activity }: { activity: Activity }) {
  const { values } = useI18n();

  return (
    <div className="flex flex-row space-x-4">
      {activity.activityId && (
        <DetailsDialog
          activity={activity}
          trigger={
            <Button
              className="flex h-max flex-row items-center space-x-2"
              variant="link"
            >
              <p className="flex-1 text-lg font-light">
                {
                  values[
                  "dashboard.reports.sections.clear-payments.header.actions.details"
                  ]
                }
              </p>
            </Button>
          }
        />
      )}
    </div>
  );
}

const columnHelper = createColumnHelper<Activity>();
const columns = [
  columnHelper.accessor("type", {
    id: "type",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.type" />
    ),
  }),
  columnHelper.accessor("description", {
    id: "description",
    cell: (info) => info.getValue() || "-",
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.description" />
    ),
  }),
  columnHelper.accessor("startDate", {
    id: "startDate",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.start" />
    ),
  }),
  columnHelper.accessor("endDate", {
    id: "endDate",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.finish" />
    ),
  }),
  columnHelper.accessor("status", {
    id: "status",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.state" />
    ),
  }),
  columnHelper.accessor("amount", {
    id: "amount",
    cell: (info) => (
      <span className={info.getValue().startsWith("-") ? "text-[#FF0000]" : ""}>
        {info.getValue()}
      </span>
    ),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.ammount" />
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.actions" />
    ),
    cell: (info) => <Actions activity={info.row.original} />,
  }),
];

export default function TransactionsByUserPage() {
  const loading = useAccessLevelGuard({
    general: {
      module: "transactionsByUser",
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

  const filters: z.infer<typeof transactionsByUserValidator> = {
    walletAddress: searchParams.get("walletAddress") ?? "",
    startDate: searchParams.get("startDate")
      ? new Date(Number(searchParams.get("startDate")))
      : undefined,
    endDate: searchParams.get("endDate")
      ? new Date(Number(searchParams.get("endDate")))
      : undefined,
    type: searchParams.get("type") ?? "",
    providerIds: searchParams.get("providerIds") ?? "",
    state: searchParams.get("state") ?? "",
  };

  const { data: title } = useGetDashboardUsersTitleQuery(undefined);
  const {
    data: transactionsData,
    isLoading,
    refetch,
  } = useGetTransactionsByUserQuery(
    {
      ...paginationAndSearch,
      ...filters,
    },
    {
      enabled: filters.walletAddress !== "",
    },
  );

  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);
  const { data: providersData } = useGetProvidersQuery(
    {
      items: "9999999",
      type: "PLATFORM",
    },
    {
      enabled: !isLoadingAccessLevels,
    },
  );

  const table = useReactTable({
    data: transactionsData?.activities ?? [],
    columns,
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

  function handleFiltersChange(
    newFilters: Partial<z.infer<typeof transactionsByUserValidator>>,
  ) {
    const params = new URLSearchParams(searchParams);
    for (const key in newFilters) {
      const val = newFilters[key as keyof typeof newFilters];
      if (val) {
        if (val instanceof Date) {
          params.set(key, `${val.getTime()}`);
        } else params.set(key, val);
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

  if (loading) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <div className="space-y-4">
        <div className="flex flex-row flex-wrap gap-4">
          <div className="flex flex-col space-y-1 self-end">
            <SimpleTitle
              title={
                (title ?? "") +
                " " +
                values["dashboard.reports.sections.clear-payments"]
              }
              showLoadingIndicator={isLoading}
            />
          </div>
          <div className="space-y-0">
            <Label className="font-normal">
              {
                values[
                "dashboard.reports.sections-clear-payments.search.type.label"
                ]
              }
            </Label>
            <Select
              onValueChange={(value) =>
                handleFiltersChange({
                  ...filters,
                  type: value,
                })
              }
              defaultValue={filters.type}
            >
              <SelectTrigger
                className={cn(
                  "rounded-lg border border-black",
                  !filters.type && "text-gray-400",
                )}
              >
                <SelectValue
                  placeholder={
                    values[
                    `dashboard.reports.sections-reserved-funds-by-user.search.type.placeholder`
                    ]
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IncomingPayment">Incoming</SelectItem>
                <SelectItem value="OutgoingPayment">Outgoing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-0">
            <Label className="font-normal">
              {
                values[
                "dashboard.reports.sections-clear-payments.search.state.label"
                ]
              }
            </Label>
            <Select
              onValueChange={(value) =>
                handleFiltersChange({
                  ...filters,
                  state: value,
                })
              }
              defaultValue={filters.state}
            >
              <SelectTrigger
                className={cn(
                  "rounded-lg border border-black",
                  !filters.state && "text-[#A1A1A1]",
                )}
              >
                <SelectValue
                  placeholder={
                    values[
                    `dashboard.reports.sections-clear-payments.search.state.placeholder`
                    ]
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">
                  {
                    values[
                    "dashboard.reports.sections-clear-payments.search.state.pending"
                    ]
                  }
                </SelectItem>
                <SelectItem value="COMPLETED">
                  {
                    values[
                    "dashboard.reports.sections-clear-payments.search.state.completed"
                    ]
                  }
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-60 flex-1 space-y-0">
            <Label className="font-normal">
              {
                values[
                "dashboard.reports.sections-clear-payments.search.provider.label"
                ]
              }
            </Label>
            <Select
              onValueChange={(value) =>
                handleFiltersChange({
                  ...filters,
                  providerIds: value,
                })
              }
              defaultValue={filters.providerIds}
            >
              <SelectTrigger
                className={cn(
                  "rounded-lg border border-black",
                  !filters.providerIds && "text-gray-400",
                )}
              >
                <SelectValue
                  placeholder={
                    values[
                    `dashboard.reports.sections-clear-payments.search.provider.placeholder`
                    ]
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {providersData?.providers
                  .filter((p) =>
                    accessLevelsData?.providers[p.id]?.reports.includes("view"),
                  )
                  .map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                {providersData?.providers.filter((p) =>
                  accessLevelsData?.providers[p.id]?.reports.includes("view"),
                ).length === 0 && (
                    <SelectItem value="no" disabled>
                      No providers available
                    </SelectItem>
                  )}
              </SelectContent>
            </Select>
          </div>
          <Button className="h-max self-end" onClick={() => refetch()}>
            <p className="flex-1 text-lg font-light">
              {
                values[
                "dashboard.reports.sections.clear-payments.search-button"
                ]
              }
            </p>
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <Table table={table} />
      </div>
      <PaginationFooter
        count={{
          total: transactionsData?.total ?? 0,
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
        canNextPage={
          transactionsData?.activities.length ===
          Number(paginationAndSearch.items)
        }
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
  );
}

const columnHelperDetails = createColumnHelper<Transaction>();
const columnsDetails = [
  columnHelperDetails.accessor("type", {
    id: "type",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.type" />
    ),
  }),
  columnHelperDetails.accessor("description", {
    id: "description",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.description" />
    ),
  }),
  columnHelperDetails.accessor("amount", {
    id: "amount",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.ammount" />
    ),
  }),
  columnHelperDetails.accessor("date", {
    id: "date",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.details.date" />
    ),
  }),
  columnHelperDetails.accessor("status", {
    id: "status",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.state" />
    ),
  }),
];

function DetailsDialog(props: { activity: Activity; trigger: ReactNode }) {
  const { values } = useI18n();
  const [isOpen, _, __, toggle] = useBooleanHandlers();
  const { data: userData } = useGetAuthedUserInfoQuery(undefined);
  const table = useReactTable({
    data: props.activity.transactions,
    columns: columnsDetails,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <Dialog
      key={props.activity.activityId}
      isOpen={isOpen}
      contentClassName="max-w-3xl max-h-3xl"
      toggleOpen={toggle}
      trigger={props.trigger}
      ariaDescribedBy="service-transaction-details"
    >
      <div className="space-y-7">
        <h1 className="text-2xl font-light">
          {
            values[
            "dashboard.reports.sections.clear-payments.details.header"
            ]
          }
        </h1>
        <div className="flex flex-row items-center justify-between">
          Activity ID: {props.activity.activityId}
          <Link
            passHref
            href={
              userData?.type === "PLATFORM"
                ? `/dashboard/dispute/${props.activity.activityId}`
                : `/dashboard/refund/${props.activity.activityId}`
            }
          >
            <Button className="px-2">
              {userData?.type === "PLATFORM"
                ? values["dashboard.dispute.button.details"]
                : values["dashboard.refund.button.details"]}
            </Button>
          </Link>
          <Button className="px-2" variant="secondary">
            <Download strokeWidth={0.75} className="size-6" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <Table table={table} />
        </div>
      </div>
    </Dialog>
  );
}
