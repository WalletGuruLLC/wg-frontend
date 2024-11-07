"use client";

import type { ReactNode } from "react";
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
import { format } from "date-fns";
import { CalendarIcon, Download } from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { cn } from "@wg-frontend/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  useForm,
} from "@wg-frontend/ui/form";
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

import type {
  DetailsTransactionByUser,
  ReportsByUser,
} from "~/lib/data-access";
import type { paginationAndSearchValidator } from "~/lib/validators";
import { Input } from "~/app/dashboard/_components/dashboard-input";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "~/app/dashboard/_components/dashboard-table";
import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import { SelectTrigger } from "~/components/select";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
  useGetDashboardUsersTitleQuery,
  useGetProviderPaymentParametersQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { transactionsByUserValidator } from "~/lib/validators";
import { Calendar } from "../../_components/dashboard-calendar";
import Dialog from "../../_components/dashboard-dialog";
import { FormLabel } from "../../_components/dashboard-form";
import { SimpleTitle } from "../../_components/dashboard-title";

function Actions({
  transactionsByUserParameters,
}: {
  transactionsByUserParameters: {
    id: string;
  };
}) {
  const { values } = useI18n();

  return (
    <div className="flex flex-row space-x-4">
      <DetailsDialog
        id={transactionsByUserParameters.id}
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
    </div>
  );
}

const columnHelper = createColumnHelper<ReportsByUser>();
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
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.description" />
    ),
  }),
  columnHelper.accessor("startdate", {
    id: "startdate",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.start" />
    ),
  }),
  columnHelper.accessor("enddate", {
    id: "enddate",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.finish" />
    ),
  }),
  columnHelper.accessor("state", {
    id: "state",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.state" />
    ),
  }),
  columnHelper.accessor("ammount", {
    id: "ammount",
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.ammount" />
    ),
    cell: (info) => (
      <span className={info.getValue() < 0 ? "text-red-600" : "text-black"}>
        {info.getValue() + " " + info.row.original.currency}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.actions" />
    ),
    cell: (info) => (
      <Actions
        transactionsByUserParameters={{
          id: info.row.original.id,
        }}
      />
    ),
  }),
];

export default function TransactionsByUserPage() {
  const { providerId } = useParams<{ providerId: string }>();
  const loading = useAccessLevelGuard({
    general: {
      module: "reports",
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

  const { data } = useGetProviderPaymentParametersQuery({
    ...paginationAndSearch,
    serviceProviderId: providerId,
  });
  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);
  const { data: title, isLoading: isLoadingTitle } =
    useGetDashboardUsersTitleQuery(undefined);
  const { data: userInfo } = useGetAuthedUserInfoQuery(undefined);

  const reportData: ReportsByUser[] = [
    {
      id: "hola",
      type: "HOLA",
      description: "PRUEBA",
      startdate: "1/11/2024 11:08:05",
      enddate: "1/11/2024 11:08:05",
      state: "Active",
      ammount: -50,
      currency: "USD",
    },
    {
      id: "hola2",
      type: "HOLA2",
      description: "PRUEBA2",
      startdate: "1/11/2024 11:08:05",
      enddate: "1/11/2024 11:08:05",
      state: "Active",
      ammount: 100,
      currency: "EUR",
    },
  ];

  const total = reportData.reduce(
    (acumulador, report) => acumulador + report.ammount,
    0,
  );

  const table = useReactTable({
    data: reportData,
    columns: columns.filter(
      (c) =>
        c.id !== "actions" ||
        accessLevelsData?.general.reports.includes("edit"),
    ),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const form = useForm({
    schema: transactionsByUserValidator,
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
      <SimpleTitle
        title={
          (title ?? "") +
          " " +
          values["dashboard.reports.sections.transactions-by-user"]
        }
        showLoadingIndicator={isLoadingTitle}
      />
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => console.log(data))}>
            <div className="flex flex-row flex-wrap space-x-4">
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem className="min-w-60 flex-1 space-y-0">
                    <FormLabel className="font-normal">
                      {
                        values[
                          "dashboard.reports.sections-transactions-by-user.search.wallet-address.label"
                        ]
                      }
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          values[
                            "dashboard.reports.sections-transactions-by-user.search.wallet-address.placeholder"
                          ]
                        }
                        className="rounded-lg border border-black"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1 self-end">
                    <FormLabel className="font-normal">
                      {
                        values[
                          "dashboard.reports.sections-transactions-by-user.search.start-date.label"
                        ]
                      }
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "relative h-11 min-w-44 justify-start rounded-lg border border-black pl-3 text-left text-sm font-normal",
                              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                              !field.value && "text-[#A1A1A1]",
                            )}
                          >
                            {
                              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                              field.value ? (
                                format(field.value, "yyyy/MM/dd")
                              ) : (
                                <span>yyyy/mm/dd</span>
                              )
                            }
                            <CalendarIcon
                              className="absolute right-2 size-5"
                              strokeWidth={0.95}
                            />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={[
                            { after: form.watch("endDate") },
                            { after: new Date() },
                          ]}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1 self-end">
                    <FormLabel className="font-normal">
                      {
                        values[
                          "dashboard.reports.sections-transactions-by-user.search.end-date.label"
                        ]
                      }
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "relative h-11 min-w-44 justify-start rounded-lg border border-black pl-3 text-left text-sm font-normal",
                              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                              !field.value && "text-[#A1A1A1]",
                            )}
                          >
                            {
                              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                              field.value ? (
                                format(field.value, "yyyy/MM/dd")
                              ) : (
                                <span>yyyy/mm/dd</span>
                              )
                            }
                            <CalendarIcon
                              className="absolute right-2 size-5"
                              strokeWidth={0.95}
                            />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={{
                            before: form.watch("startDate"),
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="font-normal">
                      {
                        values[
                          "dashboard.reports.sections-transactions-by-user.search.type.label"
                        ]
                      }
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "rounded-lg border border-black",
                            !field.value && "text-gray-400",
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
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Provider">Provider</SelectItem>
                        <SelectItem value="Platform">Platform</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="font-normal">
                      {
                        values[
                          "dashboard.reports.sections-transactions-by-user.search.state.label"
                        ]
                      }
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "rounded-lg border border-black",
                            !field.value && "text-[#A1A1A1]",
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
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Buenos Aires">
                          Buenos Aires
                        </SelectItem>
                        <SelectItem value="Cordoba">Cordoba</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem className="min-w-60 flex-1 space-y-0">
                    <FormLabel className="font-normal">
                      {
                        values[
                          "dashboard.reports.sections-transactions-by-user.search.provider.label"
                        ]
                      }
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "rounded-lg border border-black",
                            !field.value && "text-gray-400",
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
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Rodrigo Provider 1">
                          Rodrigo Provider 1
                        </SelectItem>
                        <SelectItem value="Rodrigo Provider 2">
                          Rodrigo Provider 2
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="h-max self-end">
                <p className="flex-1 text-lg font-light">
                  {
                    values[
                      "dashboard.reports.sections.transactions-by-user.search-button"
                    ]
                  }
                </p>
              </Button>
            </div>
          </form>
        </Form>
        <div className="flex flex-row justify-between">
          <div>
            <p>
              {
                values[
                  "dashboard.reports.sections-transactions-by-user.user.label"
                ]
              }
              : {userInfo?.firstName} {userInfo?.lastName}
            </p>
            <p>
              {
                values[
                  "dashboard.reports.sections-transactions-by-user.period.label"
                ]
              }
              :{" "}
              {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                form.watch("startDate")
                  ? format(form.watch("startDate"), "MMMM do, yyyy")
                  : values[
                      "dashboard.reports.sections-transactions-by-user.period.no-start-selected"
                    ]
              }{" "}
              -{" "}
              {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                form.watch("endDate")
                  ? format(form.watch("endDate"), "MMMM do, yyyy")
                  : values[
                      "dashboard.reports.sections-transactions-by-user.period.no-end-selected"
                    ]
              }
            </p>
          </div>
          <Button className="px-2" variant="secondary">
            <Download strokeWidth={0.75} className="size-6" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <Table table={table} />
      </div>
      <div>
        <div className="flex">
          <span className="ml-[75%] text-lg">Total | {total}</span>
        </div>

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
          canNextPage={
            data?.paymentParameters.length === Number(paginationAndSearch.items)
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
    </div>
  );
}

const columnHelperDetails = createColumnHelper<DetailsTransactionByUser>();
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
  columnHelperDetails.accessor("amount", {
    id: "amount",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.ammount" />
    ),
  }),
  columnHelperDetails.accessor("date", {
    id: "date",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.details.date" />
    ),
  }),
  columnHelperDetails.accessor("state", {
    id: "state",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.state" />
    ),
  }),
];

function DetailsDialog(props: {
  role?: {
    id: string;
    name: string;
    description: string;
  };
  trigger: ReactNode;
}) {
  const { values } = useI18n();
  const [isOpen, _, close, toggle] = useBooleanHandlers();
  const detailsData: DetailsTransactionByUser[] = [
    {
      type: "HOLA",
      description: "PRUEBA",
      date: "1/11/2024 11:08:05",
      amount: -50,
      state: "Active",
    },
  ];
  const tableDetails = useReactTable({
    data: detailsData,
    columns: columnsDetails,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <Dialog
      key={props.role?.id ?? "add"}
      isOpen={isOpen}
      contentClassName="max-w-3xl"
      toggleOpen={() => {
        toggle();
      }}
      trigger={props.trigger}
      ariaDescribedBy="service-transaction-details"
    >
      <div className="space-y-7">
        <h1 className="text-2xl font-light">
          {
            values[
              "dashboard.reports.sections.transactions-by-user.details.header"
            ]
          }
        </h1>
        <div className="flex flex-row items-center justify-between">
          Session ID: 2583-1234-5678-0000
          <Button className="px-2" variant="secondary">
            <Download strokeWidth={0.75} className="size-6" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <Table table={tableDetails} />
        </div>
      </div>
    </Dialog>
  );
}
