"use client";

//import type { ReactNode } from "react";
import type { z } from "zod";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
//import Link from "next/link";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";

//import { Download } from "lucide-react";

//import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { cn } from "@wg-frontend/ui";
import { Label } from "@wg-frontend/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@wg-frontend/ui/select";
import { toast } from "@wg-frontend/ui/toast";

import type { Revenue } from "~/lib/data-access";
import type {
  paginationAndSearchValidator,
  revenueValidator,
  transactionsByUserValidator,
} from "~/lib/validators";
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
  useGetProvidersQuery,
  useGetRevenueQuery,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
// import Dialog from "../../_components/dashboard-dialog";
import { SimpleTitle } from "../../_components/dashboard-title";

/*
function Actions({ activity }: { activity: Revenue }) {
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
*/
const columnHelper = createColumnHelper<Revenue>();
const columns = [
  columnHelper.accessor("provider", {
    id: "provider",
    cell: (info) => info.getValue() ?? "-",
    header: () => <ColumnHeader i18nKey="revenue-table-provider" />,
  }),
  columnHelper.accessor("startDate", {
    id: "startDate",
    cell: (info) => info.getValue(),
    header: () => <ColumnHeader i18nKey="revenue-table-start" />,
  }),
  columnHelper.accessor("endDate", {
    id: "endDate",
    cell: (info) => info.getValue(),
    header: () => <ColumnHeader i18nKey="revenue-table-end" />,
  }),
  columnHelper.accessor("amount", {
    id: "amount",
    cell: (info) => (
      <span className={info.getValue().startsWith("-") ? "text-[#FF0000]" : ""}>
        {info.getValue()}
      </span>
    ),
    header: () => <ColumnHeader i18nKey="revenue-table-amount" />,
  }),
  /*
  columnHelper.display({
    id: "actions",
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.actions" />
    ),
    cell: (info) => <Actions activity={info.row.original} />,
  }),
  */
];

export default function RevenuePage() {
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

  const filters: z.infer<typeof revenueValidator> = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
    type: "OutgoingPayment",
    providerIds: searchParams.get("providerIds") ?? "",
    isRevenue: true,
  };

  const {
    data: transactions,
    isLoading,
    refetch,
  } = useGetRevenueQuery({
    ...paginationAndSearch,
    ...filters,
  });
  console.log("trans", transactions);
  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);
  const { data: userData } = useGetAuthedUserInfoQuery(undefined);
  const { data: providersData } = useGetProvidersQuery(
    {
      items: "99",
      type: "PLATFORM",
    },
    {
      enabled: !isLoadingAccessLevels,
    },
  );
  const downloading = false;
  //const { mutate: downloadTransactions, isPending: downloading } =
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
    data: transactions?.revenues ?? [],
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

  useEffect(() => {
    if (userData?.type === "PROVIDER")
      handleFiltersChange({
        ...filters,
        providerIds: userData.serviceProviderId,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        title={values["revenue-title"]}
        showLoadingIndicator={isLoading}
      />
      <div className="space-y-4">
        <div className="flex flex-row flex-wrap gap-4">
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
            )
          }
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
            /*onClick={() => {
              downloadTransactions({
                ...paginationAndSearch,
                ...filters,
              });
            }}*/
          >
            {/* downloading ? (
              <Loader2 strokeWidth={0.75} className="size-6 animate-spin" />
            ) : (
              <Download strokeWidth={0.75} className="size-6" />
            )*/}
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <Table table={table} />
      </div>
      <PaginationFooter
        count={{
          total: transactions?.total ?? 0,
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
          transactions?.revenues.length === Number(paginationAndSearch.items)
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
/*
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
  columnHelperDetails.accessor("amount", {
    id: "amount",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.ammount" />
    ),
  }),
];
*/
/*
function DetailsDialog(props: { activity: Revenue; trigger: ReactNode }) {
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, __, toggle] = useBooleanHandlers();

  const { data: userData } = useGetAuthedUserInfoQuery(undefined);
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
*/
