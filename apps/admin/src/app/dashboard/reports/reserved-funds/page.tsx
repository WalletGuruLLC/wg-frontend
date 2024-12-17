"use client";

import type { z } from "zod";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";

import { cn } from "@wg-frontend/ui";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  useForm,
} from "@wg-frontend/ui/form";
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

import type { ReservedFund } from "~/lib/data-access";
import type { paginationAndSearchValidator } from "~/lib/validators";
import { Button } from "~/components/button";
import { SelectTrigger } from "~/components/select";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
  useGetProvidersQuery,
  useGetReservedFundsQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { reservedFundsValidator } from "~/lib/validators";
import { Calendar } from "../../_components/dashboard-calendar";
import { FormItem, FormLabel } from "../../_components/dashboard-form";
import { Input } from "../../_components/dashboard-input";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "../../_components/dashboard-table";
import { SimpleTitle } from "../../_components/dashboard-title";

const formatCurrency = (value: number, code: string, scale: number) => {
  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: scale,
    maximumFractionDigits: scale,
  }).format(value / Math.pow(10, scale));
  return `${formattedValue} ${code}`;
};

const columnHelper = createColumnHelper<ReservedFund>();

const columns = [
  columnHelper.accessor("provider", {
    id: "provider",
    cell: (info) => {
      return info.getValue();
    },
    header: () => <ColumnHeader i18nKey="reserved-funds-provider" />,
  }),
  columnHelper.accessor("ownerUser", {
    id: "wallet",
    cell: (info) => {
      const wallet = info.getValue();
      if (wallet) {
        return wallet.replace("/", "");
      }
      return "-";
    },
    header: () => <ColumnHeader i18nKey="reserved-funds-user" />,
  }),
  columnHelper.accessor("incomingAmount", {
    id: "amount",
    cell: (info) => {
      const money = info.getValue();
      const code = money.assetCode;
      const scale = money.assetScale;
      const amount = Number(money.value);
      const status = String(info.row.original.status);
      return (
        <div className={status === "false" ? "text-red-600" : ""}>
          {formatCurrency(amount, code, scale)}
        </div>
      );
    },
    header: () => <ColumnHeader i18nKey="reserved-funds-amount" />,
  }),
  columnHelper.accessor("createdAt", {
    id: "created",
    cell: (info) => {
      const wallet = info.getValue();
      return wallet;
    },
    header: () => <ColumnHeader i18nKey="reserved-funds-created" />,
  }),
  columnHelper.accessor("expiresAt", {
    id: "expire",
    cell: (info) => {
      const dispute = info.row.original;
      return `${dispute.expiresAt || ""}`.trim() || "-";
    },
    header: () => <ColumnHeader i18nKey="reserved-funds-expire" />,
  }),
];

export default function ReservedFundsPage() {
  const loading = useAccessLevelGuard({
    general: {
      module: "reservedFunds",
    },
  });
  const { values } = useI18n();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);
  const { data: userData } = useGetAuthedUserInfoQuery(undefined);
  const { data: providersData } = useGetProvidersQuery(
    {
      items: "10",
      type: "PLATFORM",
    },
    {
      enabled: !isLoadingAccessLevels,
    },
  );
  const paginationAndSearch: z.infer<typeof paginationAndSearchValidator> = {
    page: searchParams.get("page") ?? "1",
    items: searchParams.get("items") ?? "10",
    search: searchParams.get("search") ?? "",
  };
  const defaultValues = {
    serviceProviderId: searchParams.get("serviceProviderId") ?? "",
    startDate: searchParams.get("startDate")
      ? new Date(Number(searchParams.get("startDate")))
      : undefined,
    endDate: searchParams.get("endDate")
      ? new Date(Number(searchParams.get("endDate")))
      : undefined,
    status: "",
  };
  const [filters, setFilters] = useState(defaultValues);
  const [tempFilters, setTempFilters] = useState(defaultValues);
  const [filtered, setFiltered] = useState(false);

  const { data, isLoading } = useGetReservedFundsQuery({
    ...paginationAndSearch,
    ...filters,
  });
  const incomingData = (data?.incomingPayments ?? []).map((incoming) => {
    return {
      type: incoming.type,
      id: incoming.id,
      provider: incoming.provider,
      ownerUser: incoming.ownerUser,
      status: incoming.status,
      state: incoming.state,
      incomingAmount: {
        value: incoming.incomingAmount.value,
        assetCode: incoming.incomingAmount.assetCode,
        assetScale: incoming.incomingAmount.assetScale,
        _Typename: incoming.incomingAmount._Typename,
      },
      createdAt: incoming.createdAt,
      expiresAt: incoming.expiresAt,
    };
  });
  const table = useReactTable({
    data: incomingData,
    columns: columns.filter(
      (c) =>
        c.id !== "active" ||
        accessLevelsData?.general.disputes.includes("inactive"),
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
  const form = useForm({
    schema: reservedFundsValidator,
    defaultValues: {},
  });
  const firstRowIdx =
    Number(paginationAndSearch.items) * Number(paginationAndSearch.page) -
    Number(paginationAndSearch.items) +
    1;
  const lastRowIdx = firstRowIdx + table.getRowModel().rows.length - 1;

  if (loading || isLoadingAccessLevels) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <SimpleTitle
        title={`${values["reserved-funds-title"]}`}
        showLoadingIndicator={isLoading}
      />
      <div className="flex flex-row items-center space-x-3">
        <div className="relative w-1/4">
          <Input
            placeholder={values["wallet-users.search.placeholder"]}
            className="rounded-none border-transparent border-b-black"
            name="search"
            onChange={(e) =>
              handlePaginationAndSearchChange({
                ...paginationAndSearch,
                search: e.target.value,
                page: "1",
              })
            }
            defaultValue={paginationAndSearch.search}
          />

          <Search
            className="absolute right-4 top-1/2 size-6 -translate-y-1/2 transform"
            strokeWidth={0.75}
          />
        </div>
        <div className="relative -top-4 w-2/3">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex w-full flex-row flex-wrap space-x-2">
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
                          "relative h-11 min-w-44 justify-start rounded-none border-transparent border-b-black pl-3 text-left text-sm font-normal",
                          !tempFilters.startDate && "text-[#A1A1A1]",
                        )}
                      >
                        {tempFilters.startDate ? (
                          format(tempFilters.startDate, "yyyy-MM-dd")
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
                        selected={tempFilters.startDate}
                        onSelect={(date) =>
                          setTempFilters((prev) => ({
                            ...prev,
                            startDate: date ?? undefined,
                          }))
                        }
                        disabled={[
                          {
                            after: tempFilters.endDate
                              ? tempFilters.endDate
                              : new Date(),
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
                          "relative h-11 min-w-44 justify-start rounded-none border-transparent border-b-black pl-3 text-left text-sm font-normal",

                          !tempFilters.endDate && "text-[#A1A1A1]",
                        )}
                      >
                        {tempFilters.endDate ? (
                          format(tempFilters.endDate, "yyyy-MM-dd")
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
                        selected={tempFilters.endDate}
                        onSelect={(date) =>
                          setTempFilters((prev) => ({
                            ...prev,
                            endDate: date ?? undefined,
                          }))
                        }
                        disabled={
                          tempFilters.startDate
                            ? [{ before: tempFilters.startDate }]
                            : []
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
                      <FormField
                        control={form.control}
                        name="serviceProviderId"
                        render={() => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-gray-400">
                              {
                                values[
                                  "dashboard.reports.sections-transactions-by-user.search.provider.label"
                                ]
                              }
                            </FormLabel>

                            <Select
                              onValueChange={(value) =>
                                setTempFilters((prev) => ({
                                  ...prev,
                                  serviceProviderId: value,
                                }))
                              }
                              defaultValue={tempFilters.serviceProviderId}
                            >
                              <SelectTrigger
                                className={cn(
                                  "rounded-none border-transparent border-b-black",
                                  !tempFilters.serviceProviderId &&
                                    "text-gray-400",
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
                                    ]?.disputes.includes("view"),
                                  )
                                  .map((provider) => (
                                    <SelectItem
                                      key={provider.id}
                                      value={provider.id}
                                    >
                                      {provider.name}
                                    </SelectItem>
                                  ))}
                                {providersData?.providers.filter((p) =>
                                  accessLevelsData?.providers[
                                    p.id
                                  ]?.disputes.includes("view"),
                                ).length === 0 && (
                                  <SelectItem value="no" disabled>
                                    No providers available
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )
                }
                {
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-gray-400">
                          {values["wallet-users.table.header.state"]}
                        </FormLabel>
                        <Select
                          value={tempFilters.status}
                          onValueChange={(value) => {
                            setTempFilters((prev) => ({
                              ...prev,
                              status: value,
                            }));
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                "rounded-none border-transparent border-b-black",
                              )}
                            >
                              <SelectValue
                                className="h-full"
                                placeholder={
                                  values["wallet-users.select-state"]
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={"0"}>
                              {values["reserved-funds-state0"]}
                            </SelectItem>
                            <SelectItem value={"true"}>
                              {values["reserved-funds-state1"]}
                            </SelectItem>
                            <SelectItem value={"false"}>
                              {values["reserved-funds-state2"]}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                }
                <div className="flex-1">
                  {filtered ? (
                    <Button
                      className="mt-7 h-max self-end"
                      onClick={() => {
                        setFilters(defaultValues);
                        setTempFilters(defaultValues);
                        form.reset(defaultValues);
                        setFiltered(false);
                      }}
                    >
                      <p className="flex-1 text-sm font-light">
                        {values["wallet-users.list.button.reset"]}
                      </p>
                    </Button>
                  ) : (
                    <Button
                      className="mt-7 h-max self-end"
                      onClick={() => {
                        console.log("temp", tempFilters);
                        form
                          .handleSubmit(() => {
                            setFilters(tempFilters);
                          })()
                          .then(() => {
                            setFiltered(true);
                          })
                          .catch(() => {
                            toast.error(
                              values["wallet-users.toast.error.filtering"],
                            );
                          });
                        console.log("filters", filters);
                      }}
                    >
                      <p className="flex-1 text-sm font-light">
                        {values["wallet-users.list.button.filter"]}
                      </p>
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <Table table={table} />
      </div>
      <div>
        <PaginationFooter
          count={{
            total: data?.totalItems ?? 0,
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
            incomingData.length === Number(paginationAndSearch.items ?? 0)
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
