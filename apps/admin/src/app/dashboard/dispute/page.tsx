"use client";

//import type { ReactNode } from "react";
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
import { toast } from "@wg-frontend/ui/toast";

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
import { disputeValidator } from "~/lib/validators";
import { Calendar } from "../_components/dashboard-calendar";
import { FormItem, FormLabel } from "../_components/dashboard-form";
import { Input } from "../_components/dashboard-input";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "../_components/dashboard-table";
import { SimpleTitle } from "../_components/dashboard-title";

const formatCurrency = (value: number, code: string, scale: number) => {
  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: scale,
    maximumFractionDigits: scale,
  }).format(value / Math.pow(10, scale));
  return `${formattedValue} ${code}`;
};

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
    walletAddress: "",
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
  const [filtered, setFiltered] = useState(false);

  const { data, isLoading } = useGetListDisputesQuery({
    ...paginationAndSearch,
    ...filters,
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
                {/*
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-gray-400">
                        {values["wallet-users.table.header.state"]}
                      </FormLabel>
                      <Select
                        value={tempFilters.state}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setTempFilters((prev) => ({ ...prev, state: value }));
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
                              placeholder={values["wallet-users.select-state"]}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"0"}>
                            {values["wallet-users.state0"]}
                          </SelectItem>
                          <SelectItem value={"1"}>
                            {values["wallet-users.state1"]}
                          </SelectItem>
                          <SelectItem value={"2"}>
                            {values["wallet-users.state2"]}
                          </SelectItem>
                          <SelectItem value={"3"}>
                            {values["wallet-users.state3"]}
                          </SelectItem>
                          <SelectItem value={"4"}>
                            {values["wallet-users.state4"]}
                          </SelectItem>
                          <SelectItem value={"5"}>
                            {values["wallet-users.state5"]}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />*/}
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
/*
function interpolate(
  template: string,
  variables: Record<string, string>,
): string {
  return template.replace(/{{(.*?)}}/g, (match: string, key: string) => {
    return variables[key.trim()] ?? "";
  });
}
  */
/*
function ValidateOtp(props: {
  user: {
    email: string;
    id: string;
    name: string;
  };
  trigger: ReactNode;
}) {
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, _close, toggle] = useBooleanHandlers();
  const router = useRouter();
  const [countDown, setCountDown] = useState(COUNTDOWN_TIME);

  const form = useForm({
    schema: sendOtpAuthenticationValidator,
    defaultValues: {
      email: props.user.email,
      otp: "",
    },
  });
  const { mutate: sendOtp, isPending } = useSendOtpAuthenticationMutation({
    onSuccess: () => {
      return router.replace(`/dashboard/wallet-users/${props.user.id}`);
    },
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
  });
  const { mutate: resendCode, isPending: isSending } = useResendCodeMutation({
    onSuccess: () => {
      setCountDown(COUNTDOWN_TIME);
    },
  });
  useEffect(() => {
    if (isOpen) {
      const email = props.user.email;
      resendCode({ email });
    }
  }, [isOpen, resendCode, props.user.email]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const minutesRemaining = Math.floor(countDown / 60);
  const secondsRemaining = countDown % 60;
  return (
    <Dialog
      key={props.user.id}
      isOpen={isOpen}
      toggleOpen={() => {
        toggle();
      }}
      trigger={props.trigger}
      ariaDescribedBy="send-otp"
    >
      <div className="space-y-9">
        <SimpleTitle
          title={values["wallet-users.otp.title"]}
          showLoadingIndicator={false}
        ></SimpleTitle>
        <p>
          {interpolate(values["wallet-users.otp.description"], {
            name: props.user.name,
          })}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => sendOtp(data))}>
            <div className="text-gray space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">{"OTP"}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          values["wallet-users.otp.code.placeholder"]
                        }
                        required
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-base text-[#3678B1]">
                {values["auth.2fa.code.valid-for"]}{" "}
                {countDown <= 0 ? (
                  "00:00"
                ) : (
                  <>
                    {minutesRemaining.toString().padStart(2, "0")}
                    {":"}
                    {secondsRemaining.toString().padStart(2, "0")}
                  </>
                )}
              </p>
            </div>
            <br />
            <Button type="submit" disabled={isPending} className="w-full">
              {
                values[
                  isPending ? "loading" : "wallet-users.otp.primary-button"
                ]
              }
            </Button>

            <Button
              variant="link"
              disabled={isSending}
              type="button"
              onClick={() => {
                const email = props.user.email;
                if (email) resendCode({ email });
              }}
            >
              {
                values[
                  isSending ? "loading" : "wallet-users.otp.secondary-button"
                ]
              }
            </Button>
          </form>
        </Form>
      </div>
    </Dialog>
  );
}
*/
/*
function SwitchActiveStatusDialog(props: {
  user: {
    id: string;
    email: string;
    isActive: boolean;
  };
}) {
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, close, toggle] = useBooleanHandlers();

  const { mutate, isPending } = useToggleUserStatusMutation({
    onSuccess: () => {
      toast.success(values[`${valuesPrexif}.toast.success` as const]);
      close();
    },
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
  });

  const valuesPrexif =
    `wallet-users.${props.user.isActive ? "inactive-dialog" : "activate-dialog"}` as const;

  return (
    <ConfirmDialog
      key={props.user.id}
      isOpen={isOpen}
      toggleOpen={toggle}
      trigger={<Switch checked={props.user.isActive} />}
      actions={[
        <Button
          className="w-full"
          key="yes"
          onClick={() =>
            mutate({
              userId: props.user.id,
              email: props.user.email,
              active: !props.user.isActive,
            })
          }
          disabled={isPending}
        >
          {
            values[
              isPending
                ? "loading"
                : (`${valuesPrexif}.primary-button` as const)
            ]
          }
        </Button>,
        <Button
          className="w-full"
          variant="secondary"
          key="no"
          onClick={close}
          disabled={isPending}
        >
          {values[`${valuesPrexif}.secondary-button`]}
        </Button>,
      ]}
      ariaDescribedBy="switch-active-status-dialog"
      Icon={
        props.user.isActive ? (
          <TriangleAlert
            strokeWidth={0.75}
            className="h-10 w-10"
            color="#3678B1"
          />
        ) : (
          <CircleCheck
            strokeWidth={0.75}
            className="h-10 w-10"
            color="#3678B1"
          />
        )
      }
      title={values[`${valuesPrexif}.title`]}
      description={<span>{values[`${valuesPrexif}.description`]}</span>}
    />
  );
}
*/
