"use client";

import type { ReactNode } from "react";
import type { z } from "zod";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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

import type { ActivityProvider, TransactionProvider } from "~/lib/data-access";
import type {
  paginationAndSearchValidator,
  transactionsByProviderValidator,
} from "~/lib/validators";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "~/app/dashboard/_components/dashboard-table";
import { Button } from "~/components/button";
import { SelectTrigger } from "~/components/select";
import {
  useDownloadTransactionsByProviderMutation,
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
  useGetDashboardUsersTitleQuery,
  useGetProvidersQuery,
  useGetTransactionsByProviderQuery,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { Calendar } from "../../_components/dashboard-calendar";
import Dialog from "../../_components/dashboard-dialog";
import { SimpleTitle } from "../../_components/dashboard-title";

function Actions({ activity }: { activity: ActivityProvider }) {
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
                    "dashboard.reports.sections.transactions-by-provider.header.actions.details"
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

const columnHelper = createColumnHelper<ActivityProvider>();
const columns = [
  columnHelper.accessor("user", {
    id: "user",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.user" />
    ),
  }),
  columnHelper.accessor("provider", {
    id: "provider",
    cell: (info) => info.getValue() || "-",
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.provider" />
    ),
  }),
  columnHelper.accessor("grossSale", {
    id: "grossSale",
    cell: (info) => (
      <span className={info.getValue().startsWith("-") ? "text-[#FF0000]" : ""}>
        {info.getValue()}
      </span>
    ),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.gross-sale" />
    ),
  }),
  columnHelper.accessor("netSale", {
    id: "netSale",
    cell: (info) => (
      <span className={info.getValue().startsWith("-") ? "text-[#FF0000]" : ""}>
        {info.getValue()}
      </span>
    ),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.net-sale" />
    ),
  }),
  columnHelper.accessor("fee", {
    id: "fee",
    cell: (info) => (
      <span className={info.getValue().startsWith("-") ? "text-[#FF0000]" : ""}>
        {info.getValue()}
      </span>
    ),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.fee" />
    ),
  }),
  columnHelper.accessor("startDate", {
    id: "startDate",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.start" />
    ),
  }),
  columnHelper.accessor("endDate", {
    id: "endDate",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.finish" />
    ),
  }),

  columnHelper.display({
    id: "actions",
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.actions" />
    ),
    cell: (info) => <Actions activity={info.row.original} />,
  }),
];

export default function TransactionsByProviderPage() {
  const loading = useAccessLevelGuard({
    general: {
      module: "transactionsByProvider",
    },
  });
  const { values } = useI18n();
  const errors = useErrors();

  const searchParams = useSearchParams();

  const initialPaginationAndSearch: z.infer<
    typeof paginationAndSearchValidator
  > = {
    page: searchParams.get("page") ?? "1",
    items: searchParams.get("items") ?? "10",
    search: searchParams.get("search") ?? "",
  };

  const initialFilters: z.infer<typeof transactionsByProviderValidator> = {
    startDate: searchParams.get("startDate")
      ? new Date(Number(searchParams.get("startDate")))
      : undefined,
    endDate: searchParams.get("endDate")
      ? new Date(Number(searchParams.get("endDate")))
      : undefined,
    providerIds: searchParams.get("providerIds") ?? "no-select",
    state: "COMPLETED",
    isRevenue: "false",
    report: "period",
    percent: 2,
    commission: 0,
    base: 0,
  };
  const [paginationAndSearch, setPaginationAndSearch] = useState(
    initialPaginationAndSearch,
  );
  const [filters, setFilters] = useState(initialFilters);
  const [doFetch, setDoFetch] = useState(false);

  const { data: title } = useGetDashboardUsersTitleQuery(undefined);
  const {
    data: transactionsData,
    isLoading,
    refetch,
  } = useGetTransactionsByProviderQuery(
    {
      ...paginationAndSearch,
      ...filters,
    },
    {
      enabled: false,
    },
  );

  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);
  const { data: userData } = useGetAuthedUserInfoQuery(undefined);
  const { data: providersData } = useGetProvidersQuery(
    {
      items: "999999",
      type: "PLATFORM",
    },
    {
      enabled: !isLoadingAccessLevels,
    },
  );
  const { mutate: downloadTransactions, isPending: downloading } =
    useDownloadTransactionsByProviderMutation({
      onSuccess: (data) => {
        const csvData = data as string;
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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
  const handleReset = () => {
    setFilters(initialFilters);
  };
  useEffect(() => {
    if (
      userData?.type === "PROVIDER" &&
      userData.serviceProviderId !== filters.providerIds
    )
      setFilters((prev) => ({
        ...prev,
        providerIds: userData.serviceProviderId,
      }));
  }, [filters, userData]);

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
          values["dashboard.reports.sections.transactions-by-provider"]
        }
        showLoadingIndicator={isLoading}
      />
      <div className="space-y-4">
        <div className="flex flex-row flex-wrap gap-4">
          <div className="flex flex-col space-y-1 self-end">
            <Label className="font-normal">
              {
                values[
                  "dashboard.reports.sections-transactions-by-provider.search.start-date.label"
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
                    format(filters.startDate, "yyyy-MM-dd")
                  ) : (
                    <span>yyyy-mm-dd</span>
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
                    setFilters((prev) => ({
                      ...prev,
                      startDate: date ?? undefined,
                    }))
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
                  "dashboard.reports.sections-transactions-by-provider.search.end-date.label"
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
                    format(filters.endDate, "yyyy-MM-dd")
                  ) : (
                    <span>yyyy-mm-dd</span>
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
                    setFilters((prev) => ({
                      ...prev,
                      endDate: date ?? undefined,
                    }))
                  }
                  disabled={
                    filters.startDate ? [{ before: filters.startDate }] : []
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {
            /* Provider */
            userData?.type === "PLATFORM" && (
              <div className="min-w-60 flex-1 space-y-0">
                <Label className="font-normal">
                  {
                    values[
                      "dashboard.reports.sections-transactions-by-provider.search.provider.label"
                    ]
                  }
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, providerIds: value }))
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
                          `dashboard.reports.sections-transactions-by-provider.search.provider.placeholder`
                        ]
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {providersData?.providers
                      .filter((p) =>
                        accessLevelsData?.providers[
                          p.id
                        ]?.transactionsByProvider.includes("view"),
                      )
                      .map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    {providersData?.providers.filter((p) =>
                      accessLevelsData?.providers[
                        p.id
                      ]?.transactionsByProvider.includes("view"),
                    ).length === 0 && (
                      <SelectItem value="no" disabled>
                        No providers available
                      </SelectItem>
                    )}
                    <SelectItem key={1} value={"no-select"}>
                      Select...
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )
          }
          <Button
            className="h-max self-end"
            onClick={async () => {
              setDoFetch(true);
              await refetch();
            }}
          >
            <p className="flex-1 text-lg font-light">
              {
                values[
                  "dashboard.reports.sections.transactions-by-provider.search-button"
                ]
              }
            </p>
          </Button>
          <Button className="h-max self-end" onClick={handleReset}>
            <p className="flex-1 text-lg font-light">
              {values["wallet-users.list.button.reset"]}
            </p>
          </Button>
        </div>
        <div className="flex flex-row justify-between">
          <div></div>
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
        {doFetch && <Table table={table} />}
      </div>
      {doFetch && (
        <PaginationFooter
          count={{
            total: transactionsData?.total ?? 0,
            firstRowIdx,
            lastRowIdx,
          }}
          items={paginationAndSearch.items ?? "10"}
          onItemsChange={(items) =>
            setPaginationAndSearch((prev) => ({ ...prev, items, page: "1" }))
          }
          canPreviousPage={paginationAndSearch.page !== "1"}
          canNextPage={
            transactionsData?.activities.length ===
            Number(paginationAndSearch.items)
          }
          onPreviousPage={() =>
            setPaginationAndSearch((prev) => ({
              ...prev,
              page: String(Number(prev.page) - 1),
            }))
          }
          onNextPage={() =>
            setPaginationAndSearch((prev) => ({
              ...prev,
              page: String(Number(prev.page) + 1),
            }))
          }
        />
      )}
    </div>
  );
}

const columnHelperDetails = createColumnHelper<TransactionProvider>();
const columnsDetails = [
  columnHelperDetails.accessor("user", {
    id: "user",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.user" />
    ),
  }),
  columnHelperDetails.accessor("provider", {
    id: "provider",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.provider" />
    ),
  }),
  columnHelperDetails.accessor("date", {
    id: "date",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.details.date" />
    ),
  }),
  columnHelperDetails.accessor("grossSale", {
    id: "grossSale",
    cell: (info) => (
      <span className={info.getValue().startsWith("-") ? "text-[#FF0000]" : ""}>
        {info.getValue()}
      </span>
    ),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.gross-sale" />
    ),
  }),
  columnHelperDetails.accessor("netSale", {
    id: "netSale",
    cell: (info) => (
      <span className={info.getValue().startsWith("-") ? "text-[#FF0000]" : ""}>
        {info.getValue()}
      </span>
    ),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.net-sale" />
    ),
  }),
  columnHelperDetails.accessor("fee", {
    id: "fee",
    cell: (info) => (
      <span className={info.getValue().startsWith("-") ? "text-[#FF0000]" : ""}>
        {info.getValue()}
      </span>
    ),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-provider.header.fee" />
    ),
  }),
];

function DetailsDialog(props: {
  activity: ActivityProvider;
  trigger: ReactNode;
}) {
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, __, toggle] = useBooleanHandlers();

  const { mutate: downloadTransactions, isPending: downloading } =
    useDownloadTransactionsByProviderMutation({
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
              "dashboard.reports.sections.transactions-by-provider.details.header"
            ]
          }
        </h1>
        <div className="flex flex-row items-center justify-between">
          Session ID: {props.activity.activityId}
          <Button
            className="px-2"
            variant="secondary"
            onClick={() => downloadTransactions({})}
          >
            {downloading ? (
              <Loader2 strokeWidth={0.75} className="size-6 animate-spin" />
            ) : (
              <Download strokeWidth={0.75} className="size-6" />
            )}
          </Button>
        </div>
        <div className="h-[300px] flex-1 overflow-auto">
          <Table table={table} />
        </div>
      </div>
    </Dialog>
  );
}
