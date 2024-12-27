"use client";

import type { ReactNode } from "react";
import type { z } from "zod";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronRight, CircleCheck, Search, TriangleAlert } from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { cn } from "@wg-frontend/ui";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  useForm,
} from "@wg-frontend/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@wg-frontend/ui/select";
import { toast } from "@wg-frontend/ui/toast";

import type { paginationAndSearchValidator } from "~/lib/validators";
import { Button } from "~/components/button";
import { SelectTrigger } from "~/components/select";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
  useGetSettingQuery,
  useGetUsersQuery,
  useResendCodeMutation,
  useSendOtpAuthenticationMutation,
  useToggleUserStatusMutation,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { formatCurrency } from "~/lib/utils/formatCurrency";
import {
  sendOtpAuthenticationValidator,
  walletusersValidator,
} from "~/lib/validators";
import ConfirmDialog from "../_components/dashboard-confirm-dialog";
import Dialog from "../_components/dashboard-dialog";
import { FormItem, FormLabel } from "../_components/dashboard-form";
import { Input } from "../_components/dashboard-input";
import { Switch } from "../_components/dashboard-switch";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "../_components/dashboard-table";
import { SimpleTitle } from "../_components/dashboard-title";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../_components/dashboard-tooltip";

const COUNTDOWN_TIME = 60 * 5; // 5 minutes

interface User {
  id: string;
  email: string;
  firstName: string;
  name: string;
  lastName: string;
  active: boolean;
  state: 0 | 1 | 2 | 3 | 4;
  wallet: {
    address: string;
    postedCredits: number;
    postedDebits: number;
    pendingCredits: number;
    pendingDebits: number;
    active: string;
  };
  asset: {
    code: string;
    scale: number;
  };
}

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => {
      const user = info.row.original;
      return `${user.firstName || ""} ${user.lastName || ""}`.trim() || "-";
    },
    header: () => <ColumnHeader i18nKey="wallet-users.table.header.name" />,
  }),
  columnHelper.accessor("wallet", {
    id: "wallet",
    cell: (info) => {
      const wallet = info.getValue();
      if (wallet.address) {
        return wallet.address.replace("/", "");
      }
      return "-";
    },
    header: () => <ColumnHeader i18nKey="wallet-users.table.header.wallet" />,
  }),
  columnHelper.accessor(
    (row) => {
      const wallet = row.wallet;
      const balance = wallet.postedCredits - wallet.postedDebits;
      return balance;
    },
    {
      id: "balance",
      cell: (info) => {
        const money = info.getValue();
        const code = info.row.original.asset.code;
        const scale = info.row.original.asset.scale;
        return formatCurrency(money, code, scale);
      },
      header: () => (
        <ColumnHeader i18nKey="wallet-users.table.header.balance" />
      ),
    },
  ),
  columnHelper.accessor(
    (row) => {
      const wallet = row.wallet;
      const reserved = wallet.pendingDebits;
      return reserved;
    },
    {
      id: "reserved",
      cell: (info) => {
        const money = info.getValue();
        const code = info.row.original.asset.code;
        const scale = info.row.original.asset.scale;
        return formatCurrency(money, code, scale);
      },
      header: () => (
        <ColumnHeader i18nKey="wallet-users.table.header.reserved" />
      ),
    },
  ),
  columnHelper.accessor(
    (row) => {
      const wallet = row.wallet;
      const available =
        wallet.postedCredits - (wallet.pendingDebits + wallet.postedDebits);
      return available;
    },
    {
      id: "available",
      cell: (info) => {
        const money = info.getValue();
        const code = info.row.original.asset.code;
        const scale = info.row.original.asset.scale;
        return formatCurrency(money, code, scale);
      },
      header: () => (
        <ColumnHeader i18nKey="wallet-users.table.header.available" />
      ),
    },
  ),
  columnHelper.accessor(
    () => {
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };
      const currentDate = new Date();
      const formattedDate = formatDate(currentDate);
      return formattedDate;
    },
    {
      id: "timestamp",
      cell: (info) => info.getValue(),
      header: () => <ColumnHeader i18nKey="wallet-users.table.header.time" />,
    },
  ),
  columnHelper.accessor("active", {
    id: "active",
    header: () => (
      <ColumnHeader i18nKey="wallet-users.table.header.is-active" />
    ),
    cell: (info) => (
      <SwitchActiveStatusDialog
        user={{
          id: info.row.original.id,
          email: info.row.original.email,
          isActive: info.getValue(),
        }}
      />
    ),
  }),
  columnHelper.accessor(
    (row) => {
      const { values } = useI18n();
      const state = row.state;
      const statesName = {
        0: values["wallet-users.state0"],
        1: values["wallet-users.state1"],
        2: values["wallet-users.state2"],
        3: values["wallet-users.state3"],
        4: values["wallet-users.state4"],
        5: values["wallet-users.state5"],
      };
      return String(statesName[state]) || values["wallet-users.state"];
    },
    {
      id: "stateName",
      cell: (info) => info.getValue(),
      header: () => <ColumnHeader i18nKey="wallet-users.table.header.state" />,
    },
  ),
  columnHelper.accessor(
    (row) => {
      const { values } = useI18n();
      const walletState = String(row.wallet.active);
      const walletStateName =
        walletState === "undefined"
          ? values["wallet-users.no-wallet"]
          : walletState === "true"
            ? values["wallet-users.active-wallet"]
            : values["wallet-users.locked-wallet"];
      return walletStateName;
    },
    {
      id: "walletName",
      cell: (info) => info.getValue(),
      header: () => <ColumnHeader i18nKey="wallet-users.table.header.wallet" />,
    },
  ),
  columnHelper.accessor(
    (info) => {
      const { values } = useI18n();
      const data = {
        user: {
          id: info.id,
          email: info.email,
          name: info.firstName + " " + info.lastName,
        },
        tooltip: values["wallet-users.tooltip.details"],
      };
      return data;
    },
    {
      id: "actions",
      cell: (data) => {
        const { user, tooltip } = data.getValue();
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ValidateOtp
                  user={user}
                  trigger={
                    <Button className="font-normal no-underline" variant="link">
                      <ChevronRight
                        stroke="#3678B1"
                        strokeWidth={0.75}
                        className="size-6 font-semibold"
                      />
                    </Button>
                  }
                />
              </TooltipTrigger>
              <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      header: () => "",
    },
  ),
];

export default function WalletUsersPage() {
  const settingKey = "url-wallet";
  const { data: rootWallet } = useGetSettingQuery({
    key: settingKey,
  });
  const loading = useAccessLevelGuard({
    general: {
      module: "users",
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
  const defaultValues = { state: "", wallet: "" };
  const [filters, setFilters] = useState(defaultValues);
  const [tempFilters, setTempFilters] = useState(defaultValues);
  const [filtered, setFiltered] = useState(false);
  const { data: dataUser, isLoading: userIsLoading } =
    useGetAuthedUserInfoQuery(undefined);

  const { data, isLoading } = useGetUsersQuery({
    ...paginationAndSearch,
    type: !userIsLoading && dataUser ? "WALLET" : "WALLET",
    state: filters.state,
    wallet: filters.wallet,
  });
  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);
  const walletUsersData = (data?.users ?? []).map((user) => {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      name: user.firstName + " " + user.lastName,
      lastName: user.lastName,
      active: user.active,
      state: user.state,
      wallet: {
        address:
          user.wallet?.walletAddress.replace(rootWallet?.value ?? "", "") ??
          "-",
        postedCredits: user.wallet?.postedCredits ?? 0,
        postedDebits: user.wallet?.postedDebits ?? 0,
        pendingCredits: user.wallet?.pendingCredits ?? 0,
        pendingDebits: user.wallet?.pendingDebits ?? 0,
        active: user.wallet?.active ?? "undefined",
      },
      asset: {
        code: user.asset?.code ?? "USD",
        scale: user.asset?.scale ?? 2,
      },
    };
  });

  const table = useReactTable({
    data: walletUsersData,
    columns: columns.filter(
      (c) =>
        c.id !== "active" ||
        accessLevelsData?.general.walletUsers.includes("inactive"),
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
    schema: walletusersValidator,
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
        title={`${values["wallet-users.title"]}`}
        showLoadingIndicator={isLoading}
      />
      <div className="flex flex-row items-center space-x-6">
        <div className="relative w-1/2">
          <Input
            placeholder={values["wallet-users.search.placeholder"]}
            className="rounded-full border border-black"
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
        <div className="relative -top-4 w-1/2">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex w-full flex-row flex-wrap space-x-2">
                <FormField
                  control={form.control}
                  name="wallet"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="text-gray-400">
                        {values["wallet-users.table.header.wallet"]}
                      </FormLabel>
                      <Select
                        value={tempFilters.wallet}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setTempFilters((prev) => ({
                            ...prev,
                            wallet: value,
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
                              placeholder={values["wallet-users.select-wallet"]}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"unlock"}>
                            {values["wallet-users.active-wallet"]}
                          </SelectItem>
                          <SelectItem value={"lock"}>
                            {values["wallet-users.locked-wallet"]}
                          </SelectItem>
                          <SelectItem value={"noWallet"}>
                            {values["wallet-users.no-wallet"]}
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
                />
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
          canNextPage={data?.users.length === Number(paginationAndSearch.items)}
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
function interpolate(
  template: string,
  variables: Record<string, string>,
): string {
  return template.replace(/{{(.*?)}}/g, (match: string, key: string) => {
    return variables[key.trim()] ?? "";
  });
}

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
