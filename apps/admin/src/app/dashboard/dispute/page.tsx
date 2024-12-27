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
import { Form, FormField, FormMessage, useForm } from "@wg-frontend/ui/form";
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

import type { Dispute } from "~/lib/data-access";
import type { paginationAndSearchValidator } from "~/lib/validators";
import { Button } from "~/components/button";
import { SelectTrigger } from "~/components/select";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
  useGetListDisputesQuery,
  useGetProvidersQuery,
  useGetSettingQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { formatCurrency } from "~/lib/utils/formatCurrency";
import { disputeValidator } from "~/lib/validators";
import { Calendar } from "../_components/dashboard-calendar";
import { FormItem, FormLabel } from "../_components/dashboard-form";
import { Input } from "../_components/dashboard-input";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "../_components/dashboard-table";
import { SimpleTitle } from "../_components/dashboard-title";

const columnHelper = createColumnHelper<Dispute>();

const columns = [
  columnHelper.accessor("userName", {
    id: "user",
    cell: (info) => {
      return info.getValue();
    },
    header: () => <ColumnHeader i18nKey="list-disputes-table-user" />,
  }),
  columnHelper.accessor("nameServiceProvider", {
    id: "provider",
    cell: (info) => {
      return info.getValue();
    },
    header: () => <ColumnHeader i18nKey="list-disputes-table-provider" />,
  }),
  columnHelper.accessor("walletAddress", {
    id: "wallet",
    cell: (info) => {
      const wallet = info.getValue();
      if (wallet) {
        return wallet.replace("/", "");
      }
      return "-";
    },
    header: () => <ColumnHeader i18nKey="list-disputes-table-wallet" />,
  }),
  columnHelper.accessor("description", {
    id: "description",
    cell: (info) => {
      const wallet = info.getValue();
      return wallet;
    },
    header: () => <ColumnHeader i18nKey="list-disputes-table-description" />,
  }),
  columnHelper.accessor("createDate", {
    id: "createDate",
    cell: (info) => {
      const dispute = info.row.original;
      return `${dispute.createDate || ""}`.trim() || "-";
    },
    header: () => <ColumnHeader i18nKey="list-disputes-table-date" />,
  }),
  columnHelper.accessor("amount", {
    id: "amount",
    cell: (info) => {
      const money = info.getValue();
      const code = "USD";
      const scale = 6;
      return formatCurrency(money, code, scale);
    },
    header: () => <ColumnHeader i18nKey="list-disputes-table-amount" />,
  }),
];

export default function ListDisputesPage() {
  const settingKey = "url-wallet";
  const { data: rootWallet } = useGetSettingQuery({
    key: settingKey,
  });
  const loading = useAccessLevelGuard({
    general: {
      module: "disputes",
    },
  });
  const { values } = useI18n();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);
  const { data: userData } = useGetAuthedUserInfoQuery(undefined);

  const isPlatformUser = userData?.type === "PLATFORM";

  const { data: providersData } = useGetProvidersQuery(
    {
      items: "10",
      type: "PROVIDER",
    },
    {
      enabled: !isLoadingAccessLevels && isPlatformUser,
    },
  );
  const paginationAndSearch: z.infer<typeof paginationAndSearchValidator> = {
    page: searchParams.get("page") ?? "1",
    items: searchParams.get("items") ?? "10",
    search: searchParams.get("search") ?? "",
  };
  const defaultValues = {
    walletAddress: rootWallet?.value + "/",
    serviceProviderId: searchParams.get("serviceProviderId") ?? "",
    startDate: searchParams.get("startDate")
      ? new Date(Number(searchParams.get("startDate")))
      : undefined,
    endDate: searchParams.get("endDate")
      ? new Date(Number(searchParams.get("endDate")))
      : undefined,
  };
  const [filters, setFilters] = useState(defaultValues);
  const [tempFilters, setTempFilters] = useState(defaultValues);

  const { data, isLoading } = useGetListDisputesQuery({
    ...paginationAndSearch,
    startDate: filters.startDate,
    endDate: filters.endDate,
    serviceProviderId: filters.serviceProviderId,
    walletAddress:
      filters.walletAddress === rootWallet?.value + "/"
        ? ""
        : filters.walletAddress,
  });
  const disputesData = (data?.disputes ?? []).map((dispute) => {
    return {
      createDate: dispute.createDate,
      updateDate: dispute.updateDate,
      serviceProviderId: dispute.serviceProviderId,
      activityId: dispute.activityId,
      description: dispute.description,
      amount: dispute.amount,
      id: dispute.id,
      userName: dispute.userName,
      nameServiceProvider: dispute.nameServiceProvider,
      walletAddress:
        dispute.walletAddress?.replace(rootWallet?.value ?? "", "") ?? "-",
    };
  });
  const table = useReactTable({
    data: disputesData,
    columns: columns.filter(
      (c) =>
        c.id !== "active" ||
        accessLevelsData?.general.disputes.includes("inactive"),
    ),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });
  const handleReset = () => {
    setFilters(defaultValues);
    setTempFilters(defaultValues);
  };
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
    schema: disputeValidator,
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
        title={`${values["list-disputes-title"]}`}
        showLoadingIndicator={isLoading}
      />
      <div className="flex flex-row items-center space-x-3">
        <div className="relative w-1/3">
          <Input
            placeholder={values["reserved-funds.search.placeholder"]}
            className="rounded-none border-transparent border-b-black"
            name="walletAddress"
            onChange={(e) =>
              setTempFilters((prev) => ({
                ...prev,
                walletAddress: rootWallet?.value + "/" + e.target.value,
              }))
            }
            value={tempFilters.walletAddress.split("/")[3]}
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
                            after: filters.endDate
                              ? filters.endDate
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
                          filters.startDate
                            ? [{ before: filters.startDate }]
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
                        name="description"
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
                                setFilters((prev) => ({
                                  ...prev,
                                  serviceProviderId: value,
                                }))
                              }
                              defaultValue={filters.serviceProviderId}
                            >
                              <SelectTrigger
                                className={cn(
                                  "rounded-none border-transparent border-b-black",
                                  !filters.serviceProviderId && "text-gray-400",
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
                <div className="flex-1">
                  <Button
                    className="mr-2 mt-7 h-max self-end"
                    onClick={() => {
                      setFilters(tempFilters);
                    }}
                  >
                    <p className="flex-1 text-sm font-light">
                      {values["wallet-users.list.button.filter"]}
                    </p>
                  </Button>
                  <Button
                    className="mt-7 h-max self-end"
                    onClick={() => {
                      handleReset();
                    }}
                  >
                    <p className="flex-1 text-sm font-light">
                      {values["wallet-users.list.button.reset"]}
                    </p>
                  </Button>
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
            data?.disputes.length === Number(paginationAndSearch.items)
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
