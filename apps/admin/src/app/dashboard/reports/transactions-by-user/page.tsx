"use client";

import type { ReactNode } from "react";
import type { z } from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

import type { Transactions } from "~/lib/data-access";
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
  useGetAuthedUserInfoQuery,
  useGetDashboardUsersTitleQuery,
  useGetTransactionsByUserQuery,
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
  console.log(transactionsByUserParameters);

  return (
    <div className="flex flex-row space-x-4">
      <DetailsDialog
        role={{
          id: transactionsByUserParameters.id,
          name: "some name",
          description: "some description",
        }} //Se agrega este objeto para pasar el lint mientras se termina la funcionalidad de este reporte
        //id={transactionsByUserParameters.id}
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

const columnHelper = createColumnHelper<Transactions>();
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
  columnHelper.accessor("state", {
    id: "state",
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

  const form = useForm({
    schema: transactionsByUserValidator,
  });

  const { data: title } = useGetDashboardUsersTitleQuery(undefined);
  const { data: userInfo } = useGetAuthedUserInfoQuery(undefined);
  const {
    data: transactionsData,
    isLoading,
    refetch,
  } = useGetTransactionsByUserQuery({
    ...paginationAndSearch,
    ...form.getValues(),
  });

  const table = useReactTable({
    data: transactionsData?.transactions ?? [],
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

  const firstRowIdx =
    Number(paginationAndSearch.items) * Number(paginationAndSearch.page) -
    Number(paginationAndSearch.items) +
    1;
  const lastRowIdx = firstRowIdx + table.getRowModel().rows.length - 1;

  console.log(form.watch("endDate"));

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => refetch())}>
            <div className="flex flex-row flex-wrap gap-4">
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
                              !field.value && "text-[#A1A1A1]",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "yyyy/MM/dd")
                            ) : (
                              <span>yyyy/mm/dd</span>
                            )}
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
                            {
                              after: form.watch("endDate")
                                ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                  form.watch("endDate")!
                                : new Date(),
                            },
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

                              !field.value && "text-[#A1A1A1]",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "yyyy/MM/dd")
                            ) : (
                              <span>yyyy/mm/dd</span>
                            )}
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
                          disabled={
                            form.watch("startDate")
                              ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                [{ before: form.watch("startDate")! }]
                              : []
                          }
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
                        <SelectItem value="IncomingPayment">
                          IncomingPayment
                        </SelectItem>
                        <SelectItem value="OutgoingPayment">
                          OutgoingPayment
                        </SelectItem>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="providerIds"
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
              {form.watch("startDate")
                ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  format(form.watch("startDate")!, "MMMM do, yyyy")
                : values[
                    "dashboard.reports.sections-transactions-by-user.period.no-start-selected"
                  ]}{" "}
              -{" "}
              {form.watch("endDate")
                ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  format(form.watch("endDate")!, "MMMM do, yyyy")
                : values[
                    "dashboard.reports.sections-transactions-by-user.period.no-end-selected"
                  ]}
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
          <span className="ml-[75%] text-lg">
            Total | {transactionsData?.totalPrice}
          </span>
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
            transactionsData?.transactions.length ===
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
    </div>
  );
}

const columnHelperDetails = createColumnHelper<Transactions>();
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
  columnHelperDetails.accessor("startDate", {
    id: "startDate",
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
  const [isOpen, _, __, toggle] = useBooleanHandlers();
  const detailsData: Transactions[] = [
    {
      type: "HOLA",
      description: "PRUEBA",
      startDate: "1/11/2024 11:08:05",
      endDate: "1/11/2024 11:08:05",
      id: "1/11/2024 11:08:05",
      amount: "-50",
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
      key={props.role?.id ?? "details"}
      isOpen={isOpen}
      contentClassName="max-w-3xl"
      toggleOpen={toggle}
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
          Activity ID: 2583-1234-5678-0000
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
