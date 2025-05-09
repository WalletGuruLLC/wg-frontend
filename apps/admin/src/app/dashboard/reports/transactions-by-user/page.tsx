"use client";

import type { ReactNode } from "react";
import type { z } from "zod";
import { useEffect, useState } from "react";
import Link from "next/link";
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
  useDownloadDetailsMutation,
  useDownloadTransactionsByUserMutation,
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
  useGetDashboardUsersTitleQuery,
  useGetProvidersQuery,
  useGetTotalTransactionsByUser,
  useGetUserByWalletQuery,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { capitalizeFirstLetter } from "~/lib/utils/capitalize";
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
    cell: (info) => capitalizeFirstLetter(info.getValue()),
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
    cell: (info) =>
      info.row.original.activityId != "undefined" ? (
        <Actions activity={info.row.original} />
      ) : (
        <></>
      ),
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

  const initialPaginationAndSearch: z.infer<
    typeof paginationAndSearchValidator
  > = {
    page: "1",
    items: "10",
    search: searchParams.get("search") ?? "",
  };

  const initialFilters: z.infer<typeof transactionsByUserValidator> = {
    walletAddress: searchParams.get("walletAddress") ?? "",
    startDate: searchParams.get("startDate")
      ? new Date(Number(searchParams.get("startDate")))
      : undefined,
    endDate: searchParams.get("endDate")
      ? new Date(Number(searchParams.get("endDate")))
      : undefined,
    type: searchParams.get("type") ?? "",
    providerIds: searchParams.get("providerIds") ?? "",
    state: "COMPLETED",
    isRevenue: "false",
  };
  const paginationAndSearch = initialPaginationAndSearch;
  const [paginationFront, setPaginationFront] = useState({
    page: "1",
    items: "10",
  });
  const [filters, setFilters] = useState(initialFilters);
  const [doFetch, setDoFetch] = useState(false);
  const { data: title } = useGetDashboardUsersTitleQuery(undefined);
  const {
    data: transactionsData,
    isLoading,
    refetch,
  } = useGetTotalTransactionsByUser(
    {
      ...paginationAndSearch,
      ...filters,
    },
    {
      enabled: false,
    },
  );
  const { data: walletUser } = useGetUserByWalletQuery(filters.walletAddress);
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
    useDownloadTransactionsByUserMutation({
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

  const firstRowIdx =
    Number(paginationFront.items) * Number(paginationFront.page) -
    Number(paginationFront.items) +
    1;
  const lastRowIdx = Math.min(
    firstRowIdx + Number(paginationFront.items) - 1,
    transactionsData?.activities.length ?? 0,
  );

  const paginatedData = transactionsData?.activities.slice(
    (Number(paginationFront.page) - 1) * Number(paginationFront.items),
    Number(paginationFront.page) * Number(paginationFront.items),
  );

  const table = useReactTable({
    data: paginatedData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(
      (transactionsData?.total ?? 0) / Number(paginationFront.items),
    ),
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
  useEffect(() => {
    if (doFetch) {
      setPaginationFront((prev) => ({
        ...prev,
        page: "1",
      }));
    }
  }, [doFetch]);

  useEffect(() => {
    if (doFetch) {
      table.setOptions((prev) => ({
        ...prev,
        data: paginatedData ?? [],
      }));
    }
  }, [
    paginationFront.page,
    paginationFront.items,
    doFetch,
    paginatedData,
    table,
  ]);

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
              <span className="text-[#3C93BE]">*</span>
            </Label>
            <Input
              placeholder={
                values[
                  "dashboard.reports.sections-transactions-by-user.search.wallet-address.placeholder"
                ]
              }
              value={filters.walletAddress}
              required={true}
              className="rounded-lg border border-black"
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  walletAddress: e.target.value,
                }))
              }
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
          {userData?.type === "PLATFORM" && (
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
                  setFilters((prev) => ({ ...prev, type: value }))
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
          )}
          {
            /* Provider */
            userData?.type === "PLATFORM" && (
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
                  "dashboard.reports.sections.transactions-by-user.search-button"
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
          <div>
            <p>
              {
                values[
                  "dashboard.reports.sections-transactions-by-user.user.label"
                ]
              }
              : {walletUser?.nameUser}
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
                items: "999999",
                page: "1",
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
          items={paginationFront.items}
          onItemsChange={(items) =>
            setPaginationFront((prev) => ({ ...prev, items, page: "1" }))
          }
          canPreviousPage={paginationFront.page !== "1"}
          canNextPage={
            Number(paginationFront.page) * Number(paginationFront.items) <=
            (transactionsData?.total ?? 0)
          }
          onPreviousPage={() =>
            setPaginationFront((prev) => ({
              ...prev,
              page: String(Number(prev.page) - 1),
            }))
          }
          onNextPage={() =>
            setPaginationFront((prev) => ({
              ...prev,
              page: String(Number(prev.page) + 1),
            }))
          }
        />
      )}
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
    cell: (info) => capitalizeFirstLetter(info.getValue()),
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
  const { data: accessLevelsData } =
    useGetAuthedUserAccessLevelsQuery(undefined);
  const authRefund =
    userData?.type === "PROVIDER"
      ? accessLevelsData?.general.refunds.includes("add")
      : accessLevelsData?.general.disputes.includes("add");
  const { mutate: downloadDetails, isPending: downloaddet } =
    useDownloadDetailsMutation({
      onSuccess: (data) => {
        const csvData = data as string;
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "details.csv");
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
          {authRefund === true ? (
            <Link
              passHref
              href={
                userData?.type === "PLATFORM"
                  ? `/dashboard/dispute/add/${props.activity.activityId}`
                  : `/dashboard/refund/add/${props.activity.activityId}`
              }
            >
              <Button className="px-2">
                {userData?.type === "PLATFORM"
                  ? values["dashboard.dispute.button.details"]
                  : values["dashboard.refund.button.details"]}
              </Button>
            </Link>
          ) : (
            <></>
          )}
          <Button
            className="px-2"
            variant="secondary"
            disabled={downloaddet}
            onClick={() => {
              downloadDetails({
                items: "999999",
                page: "1",
                activityId: props.activity.activityId,
              });
            }}
          >
            {downloaddet ? (
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
