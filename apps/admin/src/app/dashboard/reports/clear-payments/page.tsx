"use client";

import type { z } from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@wg-frontend/ui";
import { Label } from "@wg-frontend/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@wg-frontend/ui/select";

import type { ClearPayment } from "~/lib/data-access";
import type {
  clearPaymentsValidator,
  paginationAndSearchValidator,
} from "~/lib/validators";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "~/app/dashboard/_components/dashboard-table";
import { Button } from "~/components/button";
import { SelectTrigger } from "~/components/select";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetClearPaymentsQuery,
  useGetDashboardUsersTitleQuery,
  useGetProviderQuery,
  useGetProvidersQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { SimpleTitle } from "../../_components/dashboard-title";

// function Actions({ clear }: { clear: ClearPayment }) {
//   const { values } = useI18n();
//
//   return (
//     <div className="flex flex-row space-x-4">
//       {clear.id && (
//         <DetailsDialog
//           activity={clear}
//           trigger={
//             <Button
//               className="flex h-max flex-row items-center space-x-2"
//               variant="link"
//             >
//               <p className="flex-1 text-lg font-light">
//                 {
//                   values[
//                     "dashboard.reports.sections.clear-payments.header.actions.details"
//                   ]
//                 }
//               </p>
//             </Button>
//           }
//         />
//       )}
//     </div>
//   );
// }

const formatCurrency = (value: number, code: string, scale = 6) => {
  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: scale,
    maximumFractionDigits: scale,
  }).format(value / Math.pow(10, scale));
  return `${formattedValue} ${code}`;
};

const getDataProvider = (providerId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading: isLoadingProviderData } = useGetProviderQuery({
    providerId,
  });
  return { data, isLoadingProviderData };
};

const columnHelper = createColumnHelper<ClearPayment>();

function getTranslation(s: string) {
  const { values } = useI18n();
  // @ts-ignore
  return values[s];
}

const columns = [
  columnHelper.accessor("year", {
    id: "year",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections-clear-payments.search.year.label" />
    ),
  }),
  columnHelper.accessor("month", {
    id: "month",
    cell: (info) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return getTranslation(`${info.getValue()}`);
    },
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.month" />
    ),
  }),
  columnHelper.accessor("serviceProviderId", {
    id: "provider",
    cell: (info) => {
      const { data, isLoadingProviderData } = getDataProvider(info.getValue());
      return isLoadingProviderData ? "Loading..." : data?.name;
    },
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.provider" />
    ),
  }),
  columnHelper.accessor("value", {
    id: "value",
    cell: (info) => {
      return `$ ${formatCurrency(info.getValue(), "USD")}`;
    },
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.transactions" />
    ),
  }),
  columnHelper.accessor("fees", {
    id: "fees",
    cell: (info) => {
      return `$ ${formatCurrency(info.getValue(), "USD")}`;
    },
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.fees" />
    ),
  }),
  columnHelper.accessor("value", {
    id: "value",
    cell: (info) => {
      return `$ ${formatCurrency(info.getValue() - info.row.original.fees, "USD")}`;
    },
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.ammount" />
    ),
  }),
  columnHelper.accessor("state", {
    id: "state",
    cell: (info) => (
      <span className={info.getValue() ? "text-[#FF0000]" : ""}>
        {info.getValue() ? "Cleared" : "Clear payment"}
      </span>
    ),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.status" />
    ),
  }),
  columnHelper.display({
    id: "details",
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.actions.details" />
    ),
    // cell: (info) => <Actions clear={info.row.original} />,
  }),
];

export default function ClearPaymentPage() {
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

  const filters: z.infer<typeof clearPaymentsValidator> = {
    month: searchParams.get("month") ?? "",
    year: searchParams.get("year") ?? "",
    providerId: searchParams.get("providerId") ?? "",
    status: searchParams.get("status") ?? "",
  };

  const { data: title } = useGetDashboardUsersTitleQuery(undefined);
  const {
    data: clearData,
    isLoading,
    refetch,
  } = useGetClearPaymentsQuery({
    ...paginationAndSearch,
    ...filters,
  });

  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);
  const { data: providersData } = useGetProvidersQuery(
    {
      items: "99",
      type: "PLATFORM",
    },
    {
      enabled: !isLoadingAccessLevels,
    },
  );

  const table = useReactTable({
    data: clearData?.clearPayments ?? [],
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
    newFilters: Partial<z.infer<typeof clearPaymentsValidator>>,
  ) {
    const params = new URLSearchParams(searchParams);
    for (const key in newFilters) {
      const val = newFilters[key as keyof typeof newFilters];
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
                  "dashboard.reports.sections-clear-payments.search.month.label"
                ]
              }
            </Label>
            <Select
              onValueChange={(value) =>
                handleFiltersChange({
                  ...filters,
                  month: value,
                })
              }
              defaultValue={filters.month}
            >
              <SelectTrigger
                className={cn(
                  "rounded-lg border border-black",
                  !filters.month && "text-gray-400",
                )}
              >
                <SelectValue
                  placeholder={
                    values[
                      `dashboard.reports.sections-clear-payments.search.month.label`
                    ]
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">
                  {
                    values[
                      "dashboard.reports.sections-clear-payments.search.state.all"
                    ]
                  }
                </SelectItem>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-0">
            <Label className="font-normal">
              {
                values[
                  "dashboard.reports.sections-clear-payments.search.year.label"
                ]
              }
            </Label>
            <Select
              onValueChange={(value) =>
                handleFiltersChange({
                  ...filters,
                  year: value,
                })
              }
              defaultValue={filters.year}
            >
              <SelectTrigger
                className={cn(
                  "rounded-lg border border-black",
                  !filters.year && "text-gray-400",
                )}
              >
                <SelectValue
                  placeholder={
                    values[
                      `dashboard.reports.sections-clear-payments.search.year.label`
                    ]
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">
                  {
                    values[
                      "dashboard.reports.sections-clear-payments.search.state.all"
                    ]
                  }
                </SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
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
                  providerId: value,
                })
              }
              defaultValue={filters.providerId}
            >
              <SelectTrigger
                className={cn(
                  "rounded-lg border border-black",
                  !filters.providerId && "text-gray-400",
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
                    accessLevelsData?.providers[p.id]?.clearPayments.includes(
                      "view",
                    ),
                  )
                  .map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                {providersData?.providers.filter((p) =>
                  accessLevelsData?.providers[p.id]?.clearPayments.includes(
                    "view",
                  ),
                ).length === 0 && (
                  <SelectItem value="no" disabled>
                    No providers available
                  </SelectItem>
                )}
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
                  status: value,
                })
              }
              defaultValue={filters.status}
            >
              <SelectTrigger
                className={cn(
                  "rounded-lg border border-black",
                  !filters.status && "text-[#A1A1A1]",
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
                <SelectItem value="ALL">
                  {
                    values[
                      "dashboard.reports.sections-clear-payments.search.state.all"
                    ]
                  }
                </SelectItem>
                <SelectItem value="false">
                  {
                    values[
                      "dashboard.reports.sections-clear-payments.search.state.pending"
                    ]
                  }
                </SelectItem>
                <SelectItem value="true">
                  {
                    values[
                      "dashboard.reports.sections-clear-payments.search.state.completed"
                    ]
                  }
                </SelectItem>
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
          total: clearData?.total ?? 0,
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
          clearData?.clearPayments.length === Number(paginationAndSearch.items)
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
//
// const columnHelperDetails = createColumnHelper<ClearPayment>();
// const columnsDetails = [
//   columnHelperDetails.accessor("month", {
//     id: "month",
//     cell: (info) => info.getValue(),
//     header: () => (
//       <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.month" />
//     ),
//   }),
//   columnHelperDetails.accessor("serviceProviderId", {
//     id: "provider",
//     cell: (info) => info.getValue(),
//     header: () => (
//       <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.provider" />
//     ),
//   }),
//   columnHelperDetails.accessor("value", {
//     id: "amount",
//     cell: (info) => info.getValue(),
//     header: () => (
//       <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.ammount" />
//     ),
//   }),
//   columnHelperDetails.accessor("fees", {
//     id: "date",
//     cell: (info) => info.getValue(),
//     header: () => (
//       <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.details.date" />
//     ),
//   }),
//   columnHelperDetails.accessor("state", {
//     id: "status",
//     cell: (info) => info.getValue(),
//     header: () => (
//       <ColumnHeader i18nKey="dashboard.reports.sections.clear-payments.header.actions.details" />
//     ),
//   }),
// ];

// function DetailsDialog(props: { activity: ClearPayment; trigger: ReactNode }) {
//   const { values } = useI18n();
//   const [isOpen, _, __, toggle] = useBooleanHandlers();
//   const { data: userData } = useGetAuthedUserInfoQuery(undefined);
//   const table = useReactTable({
//     data: props.activity,
//     columns: columnsDetails,
//     getCoreRowModel: getCoreRowModel(),
//     manualPagination: true,
//   });
//
//   return (
//     <Dialog
//       key={props.activity.id}
//       isOpen={isOpen}
//       contentClassName="max-w-3xl max-h-3xl"
//       toggleOpen={toggle}
//       trigger={props.trigger}
//       ariaDescribedBy="service-transaction-details"
//     >
//       <div className="space-y-7">
//         <h1 className="text-2xl font-light">
//           {values["dashboard.reports.sections.clear-payments.details.header"]}
//         </h1>
//         <div className="flex flex-row items-center justify-between">
//           ClearPayment ID: {props.activity.id}
//           <Link
//             passHref
//             href={
//               userData?.type === "PLATFORM"
//                 ? `/dashboard/dispute/${props.activity.id}`
//                 : `/dashboard/refund/${props.activity.id}`
//             }
//           >
//             <Button className="px-2">
//               {userData?.type === "PLATFORM"
//                 ? values["dashboard.dispute.button.details"]
//                 : values["dashboard.refund.button.details"]}
//             </Button>
//           </Link>
//           <Button className="px-2" variant="secondary">
//             <Download strokeWidth={0.75} className="size-6" />
//           </Button>
//         </div>
//         <div className="flex-1 overflow-auto">
//           <Table table={table} />
//         </div>
//       </div>
//     </Dialog>
//   );
// }
