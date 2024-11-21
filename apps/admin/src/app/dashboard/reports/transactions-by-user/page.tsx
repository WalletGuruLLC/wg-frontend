"use client";

import type { ReactNode } from "react";
import type { z } from "zod";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon, Download, Loader2 } from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { cn } from "@wg-frontend/ui";
import { Label } from "@wg-frontend/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@wg-frontend/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@wg-frontend/ui/select";
import { toast } from "@wg-frontend/ui/toast";

import type { Activity, Transaction } from "~/lib/data-access";
import type {
  paginationAndSearchValidator,
  transactionsByUserValidator,
} from "~/lib/validators";
import { Input } from "~/app/dashboard/_components/dashboard-input";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "~/app/dashboard/_components/dashboard-table";
import { Button } from "~/components/button";
import { SelectTrigger } from "~/components/select";
import {
  useDownloadTransactionsByUserMutation,
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
  useGetDashboardUsersTitleQuery,
  useGetProvidersQuery,
  useGetTransactionsByUserQuery,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { Calendar } from "../../_components/dashboard-calendar";
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
                    "dashboard.reports.sections.transactions-by-user.header.actions.details"
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
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.type" />
    ),
  }),
  columnHelper.accessor("description", {
    id: "description",
    cell: (info) => info.getValue() || "-",
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.description" />
    ),
  }),
  columnHelper.accessor("startDate", {
    id: "startDate",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.start" />
    ),
  }),
  columnHelper.accessor("endDate", {
    id: "endDate",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.finish" />
    ),
  }),
  columnHelper.accessor("status", {
    id: "status",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.state" />
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
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.ammount" />
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.actions" />
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
  const errors = useErrors();

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
  const { mutate: downloadTransactions, isPending: downloading } =
    useDownloadTransactionsByUserMutation({
      onSuccess: () => {
        toast.success(
          values[
            "dashboard.reports.sections-transactions-by-user.download.success"
          ],
        );
      },
      onError: (error) => {
        toast.error(errors[error.message], {
          description: "Error code: " + error.message,
        });
      },
    });

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
      <SimpleTitle
        title={
          (title ?? "") +
          " " +
          values["dashboard.reports.sections.transactions-by-user"]
        }
        showLoadingIndicator={isLoading}
      />
      <div className="space-y-4">
        <div className="flex flex-row flex-wrap gap-4">
          <div className="min-w-60 flex-1 space-y-0">
            <Label className="font-normal">
              {
                values[
                  "dashboard.reports.sections-transactions-by-user.search.wallet-address.label"
                ]
              }
            </Label>
            <Input
              placeholder={
                values[
                  "dashboard.reports.sections-transactions-by-user.search.wallet-address.placeholder"
                ]
              }
              defaultValue={filters.walletAddress}
              onChange={(e) =>
                handleFiltersChange({
                  ...filters,
                  walletAddress: e.target.value,
                })
              }
              className="rounded-lg border border-black"
            />
          </div>

          <div className="flex flex-col space-y-1 self-end">
            <Label className="font-normal">
              {
                values[
                  "dashboard.reports.sections-transactions-by-user.search.start-date.label"
                ]
              }
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "relative h-11 min-w-44 justify-start rounded-lg border border-black pl-3 text-left text-sm font-normal",
                    !filters.startDate && "text-[#A1A1A1]",
                  )}
                >
                  {filters.startDate ? (
                    format(filters.startDate, "yyyy/MM/dd")
                  ) : (
                    <span>yyyy/mm/dd</span>
                  )}
                  <CalendarIcon
                    className="absolute right-2 size-5"
                    strokeWidth={0.95}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.startDate}
                  onSelect={(date) =>
                    handleFiltersChange({
                      ...filters,
                      startDate: date,
                    })
                  }
                  disabled={[
                    {
                      after: filters.endDate ? filters.endDate : new Date(),
                    },
                  ]}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col space-y-1 self-end">
            <Label className="font-normal">
              {
                values[
                  "dashboard.reports.sections-transactions-by-user.search.end-date.label"
                ]
              }
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "relative h-11 min-w-44 justify-start rounded-lg border border-black pl-3 text-left text-sm font-normal",

                    !filters.endDate && "text-[#A1A1A1]",
                  )}
                >
                  {filters.endDate ? (
                    format(filters.endDate, "yyyy/MM/dd")
                  ) : (
                    <span>yyyy/mm/dd</span>
                  )}
                  <CalendarIcon
                    className="absolute right-2 size-5"
                    strokeWidth={0.95}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.endDate}
                  onSelect={(date) =>
                    handleFiltersChange({
                      ...filters,
                      endDate: date,
                    })
                  }
                  disabled={
                    filters.startDate ? [{ before: filters.startDate }] : []
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-0">
            <Label className="font-normal">
              {
                values[
                  "dashboard.reports.sections-transactions-by-user.search.type.label"
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
                      `dashboard.reports.sections-transactions-by-user.search.type.placeholder`
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
                  "dashboard.reports.sections-transactions-by-user.search.state.label"
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
                      `dashboard.reports.sections-transactions-by-user.search.state.placeholder`
                    ]
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">
                  {
                    values[
                      "dashboard.reports.sections-transactions-by-user.search.state.pending"
                    ]
                  }
                </SelectItem>
                <SelectItem value="COMPLETED">
                  {
                    values[
                      "dashboard.reports.sections-transactions-by-user.search.state.completed"
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
                  "dashboard.reports.sections-transactions-by-user.search.provider.label"
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
                      `dashboard.reports.sections-transactions-by-user.search.provider.placeholder`
                    ]
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {providersData?.providers
                  .filter((p) =>
                    accessLevelsData?.providers[
                      p.id
                    ]?.transactionsByUser.includes("view"),
                  )
                  .map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                {providersData?.providers.filter((p) =>
                  accessLevelsData?.providers[
                    p.id
                  ]?.transactionsByUser.includes("view"),
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
                  "dashboard.reports.sections.transactions-by-user.search-button"
                ]
              }
            </p>
          </Button>
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <p>
              {
                values[
                  "dashboard.reports.sections-transactions-by-user.user.label"
                ]
              }
              :{" "}
              {transactionsData?.user ??
                values[
                  "dashboard.reports.sections-transactions-by-user.period.no-wallet-selected"
                ]}
            </p>
            <p>
              {
                values[
                  "dashboard.reports.sections-transactions-by-user.period.label"
                ]
              }
              :{" "}
              {filters.startDate
                ? format(filters.startDate, "MMMM do, yyyy")
                : values[
                    "dashboard.reports.sections-transactions-by-user.period.no-start-selected"
                  ]}{" "}
              -{" "}
              {filters.endDate
                ? format(filters.endDate, "MMMM do, yyyy")
                : values[
                    "dashboard.reports.sections-transactions-by-user.period.no-end-selected"
                  ]}
            </p>
          </div>
          <Button
            className="px-2"
            variant="secondary"
            disabled={downloading}
            onClick={() => {
              downloadTransactions({
                ...paginationAndSearch,
                ...filters,
              });
            }}
          >
            {downloading ? (
              <Loader2 strokeWidth={0.75} className="size-6 animate-spin" />
            ) : (
              <Download strokeWidth={0.75} className="size-6" />
            )}
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
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.type" />
    ),
  }),
  columnHelperDetails.accessor("description", {
    id: "description",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.description" />
    ),
  }),
  columnHelperDetails.accessor("date", {
    id: "date",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.details.date" />
    ),
  }),
  columnHelperDetails.accessor("status", {
    id: "status",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.state" />
    ),
  }),
  columnHelperDetails.accessor("amount", {
    id: "amount",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.ammount" />
    ),
  }),
];

function DetailsDialog(props: { activity: Activity; trigger: ReactNode }) {
  const { values } = useI18n();
  const errors = useErrors();
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
      contentClassName="max-w-3xl overflow-hidden"
      toggleOpen={toggle}
      trigger={props.trigger}
      ariaDescribedBy="service-transaction-details"
    >
      <div className="space-y-7">
        <h1 className="text-2xl font-light">{props.activity.description}</h1>
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
        <div className="h-[300px] flex-1 overflow-auto">
          <Table table={table} />
        </div>
      </div>
    </Dialog>
  );
}
