"use client";

import type { z } from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowRightLeft,
  Asterisk,
  BadgeCheck,
  BadgeX,
  CircleCheck,
  Lock,
  Search,
  ShieldAlert,
  TriangleAlert,
  Unlock,
  UserIcon,
} from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { Button } from "@wg-frontend/ui/button";
import { toast } from "@wg-frontend/ui/toast";

import type { User } from "~/lib/data-access";
import type { paginationAndSearchValidator } from "~/lib/validators";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
  useGetUsersQuery,
  useToggleUserStatusMutation,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import ConfirmDialog from "../_components/dashboard-confirm-dialog";
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

/*
function Actions({
  user,
}: {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    role: {
      id: string;
      name: string;
    };
    email: string;
    phone: string;
    first: boolean;
  };
}) {
  const { value } = useI18n("dashboard.users.table.actions.edit");
  */
function Actions({
  user,
}: {
  user: {
    state: number;
    active: string;
  };
}) {
  const { values } = useI18n();
  const IconComponent = user.state === 3 ? BadgeCheck : BadgeX;
  const titleKyc =
    user.state === 3
      ? values["dashboard.wallet-users.tooltip.validated"]
      : values["dashboard.wallet-users.tooltip.invalid"];
  const WalletComponent =
    user.active === "undefined"
      ? ShieldAlert
      : user.active === "true"
        ? Unlock
        : Lock;

  const titleWallet =
    user.active === "undefined"
      ? values["dashboard.wallet-users.tooltip.no-wallet"]
      : user.active === "true"
        ? values["dashboard.wallet-users.tooltip.lock-wallet"]
        : values["dashboard.wallet-users.tooltip.unlock-wallet"];
  const walletInactive = !user.active ? true : false;
  return (
    <div className="flex">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="hover:bg-transparent hover:text-[#3678B1]"
              disabled={walletInactive}
            >
              <WalletComponent
                strokeWidth={0.75}
                className="size-6 font-semibold"
                stroke="#3678B1"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{titleWallet}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="hover:bg-transparent hover:text-[#3678B1]"
            >
              <Asterisk
                stroke="#3678B1"
                strokeWidth={0.75}
                className="size-6 font-semibold"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {values["dashboard.wallet-users.tooltip.reset"]}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="hover:bg-transparent hover:text-[#3678B1]"
            >
              <UserIcon
                stroke="#3678B1"
                strokeWidth={0.75}
                className="size-6 font-semibold"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {values["dashboard.wallet-users.tooltip.details"]}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="hover:bg-transparent hover:text-[#3678B1]"
            >
              <IconComponent
                stroke="#3678B1"
                strokeWidth={0.75}
                className="size-6 font-semibold"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{titleKyc}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="hover:bg-transparent hover:text-[#3678B1]"
            >
              <ArrowRightLeft
                stroke="#3678B1"
                strokeWidth={0.75}
                className="size-6 font-semibold"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {values["dashboard.wallet-users.tooltip.transactions"]}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    /*
    <AddOrEditDialog
      user={{
        ...user,
        phone: (user.phone as string | undefined) ?? "+1-",
      }}
      trigger={
        <Button className="font-normal no-underline" variant="link">
          {value}
        </Button>
      }
    />*/
  );
}

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => {
      const user = info.row.original;
      return `${user.firstName || ""} ${user.lastName || ""}`.trim() || "-";
    },
    header: () => (
      <ColumnHeader i18nKey="dashboard.wallet-users.table.header.name" />
    ),
  }),
  columnHelper.accessor("wallet", {
    id: "wallet",
    cell: (info) => {
      const wallet = info.getValue();
      if (wallet?.walletAddress) {
        return wallet.walletAddress.replace("https://walletguru.me/", "");
      }
      return "-";
    },
    header: () => (
      <ColumnHeader i18nKey="dashboard.wallet-users.table.header.wallet" />
    ),
  }),
  columnHelper.accessor(
    (row) => {
      const wallet = row.wallet;
      const balance =
        (wallet?.postedCredits ?? 0) - (wallet?.postedDebits ?? 0);
      return balance;
    },
    {
      id: "balance",
      cell: (info) => {
        const balance = info.getValue();
        const asset = info.row.original.asset;
        const currencyCode = asset?.code ?? "USD";
        const scale = asset?.scale ?? 2;
        const formattedBalance = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currencyCode,
          minimumFractionDigits: scale,
          maximumFractionDigits: scale,
        }).format(balance / Math.pow(10, scale));
        return `${formattedBalance}`;
      },
      header: () => (
        <ColumnHeader i18nKey="dashboard.wallet-users.table.header.balance" />
      ),
    },
  ),
  columnHelper.accessor(
    (row) => {
      const wallet = row.wallet;
      const reserved = wallet?.pendingDebits ?? 0;
      return reserved;
    },
    {
      id: "reserved",
      cell: (info) => {
        const balance = info.getValue();
        const asset = info.row.original.asset;
        const formattedReserved = new Intl.NumberFormat("en-En", {
          minimumFractionDigits: asset?.scale ?? 0,
          maximumFractionDigits: asset?.scale ?? 0,
        }).format(balance || 0);
        return `${formattedReserved} ${asset?.code ?? ""}`;
      },
      header: () => (
        <ColumnHeader i18nKey="dashboard.wallet-users.table.header.reserved" />
      ),
    },
  ),
  columnHelper.accessor(
    (row) => {
      const wallet = row.wallet;
      const available =
        (wallet?.postedCredits ?? 0) -
        ((wallet?.pendingDebits ?? 0) + (wallet?.postedDebits ?? 0));
      return available;
    },
    {
      id: "available",
      cell: (info) => {
        const balance = info.getValue();
        const asset = info.row.original.asset;
        const formattedAvailable = new Intl.NumberFormat("en-En", {
          minimumFractionDigits: asset?.scale ?? 0,
          maximumFractionDigits: asset?.scale ?? 0,
        }).format(balance || 0);
        return `${formattedAvailable} ${asset?.code ?? ""}`;
      },
      header: () => (
        <ColumnHeader i18nKey="dashboard.wallet-users.table.header.available" />
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
      header: () => (
        <ColumnHeader i18nKey="dashboard.wallet-users.table.header.time" />
      ),
    },
  ),
  columnHelper.accessor("active", {
    id: "active",
    header: () => (
      <ColumnHeader i18nKey="dashboard.users.table.header.is-active" />
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
  columnHelper.display({
    id: "actions",
    header: () => (
      <ColumnHeader i18nKey="dashboard.users.table.header.actions" />
    ),
    cell: (info) => (
      <Actions
        user={{
          state: info.row.original.state,
          active: String(info.row.original.wallet?.active),
        }}
      />
      /*
      <Actions 
        user={{
          id: info.row.original.id,
          firstName: info.row.original.firstName,
          lastName: info.row.original.lastName,
          email: info.row.original.email,
          phone: info.row.original.phone,
          role: {
            id: info.row.original.roleId,
            name: info.row.original.roleName,
          },
          first: info.row.original.first,
        }}
      />*/
    ),
  }),
];

export default function WalletUsersPage() {
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

  const { data: dataUser, isLoading: userIsLoading } =
    useGetAuthedUserInfoQuery(undefined);

  const { data, isLoading } = useGetUsersQuery({
    ...paginationAndSearch,
    type: !userIsLoading && dataUser ? "WALLET" : "WALLET",
  });
  /* const { data: title, isLoading: isLoadingTitle } =
    useGetDashboardUsersTitleQuery(undefined);*/
  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);

  const table = useReactTable({
    data: data?.users ?? [],
    columns: columns
      .filter(
        (c) =>
          c.id !== "actions" ||
          accessLevelsData?.general.users.includes("edit"),
      )
      .filter(
        (c) =>
          c.id !== "active" ||
          accessLevelsData?.general.users.includes("inactive"),
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

  const firstRowIdx =
    Number(paginationAndSearch.items) * Number(paginationAndSearch.page) -
    Number(paginationAndSearch.items) +
    1;
  const lastRowIdx = firstRowIdx + table.getRowModel().rows.length - 1;

  if (loading || isLoadingAccessLevels) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <SimpleTitle
        // title={`${title ?? ""} ${values["dashboard.wallet-users.title"]}`}
        title={`${values["dashboard.wallet-users.title"]}`}
        //showLoadingIndicator={isLoading || isLoadingTitle}
        showLoadingIndicator={isLoading}
      />
      <div className="flex flex-row items-center space-x-6">
        <div className="relative w-10/12">
          <Input
            placeholder={values["dashboard.users.search.placeholder"]}
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
/*
function AddOrEditDialog(props: {
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: {
      id: string;
      name: string;
    };
    first: boolean;
  };
  trigger: ReactNode;
}) {
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, close, toggle] = useBooleanHandlers();

  const { data: dataUser } = useGetAuthedUserInfoQuery(undefined);

  const form = useForm({
    schema: addOrEditUserValidator,
    defaultValues: {
      firstName: props.user?.firstName ?? "",
      lastName: props.user?.lastName ?? "",
      email: props.user?.email ?? "",
      phone: props.user?.phone ?? "",
      roleId: props.user?.role.id ?? "",
      serviceProviderId: dataUser?.serviceProviderId ?? "EMPTY",
      type: dataUser?.type ?? "PLATFORM",
      userId: props.user?.id,
    },
  });

  const { mutate, isPending } = useAddOrEditUserMutation({
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      toast.success(values[`${valuesPrefix}.toast.success` as const]);
      close();
      form.reset();
    },
  });
  const { data: dataRoles } = useGetActiveRolesQuery({
    providerId: dataUser?.serviceProviderId ?? "EMPTY",
  });

  const { data: dataCountryCodes } = useGetCountryCodesQuery(undefined);

  const valuesPrefix =
    `dashboard.users.${props.user ? "edit" : "add"}-dialog` as const;

  // This useEffect is used to reset the form when the role prop changes because the form is not unmounted when dialog closes
  useEffect(() => {
    if (props.user) {
      form.reset({
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        email: props.user.email,
        phone: props.user.phone,
        roleId: props.user.role.id,
        userId: props.user.id,
        serviceProviderId: dataUser?.serviceProviderId ?? "EMPTY",
        type: dataUser?.type ?? "PLATFORM",
      });
    }
  }, [props.user, form, dataUser?.serviceProviderId, dataUser?.type]);

  return (
    <Dialog
      key={props.user?.id ?? "add"}
      isOpen={isOpen}
      toggleOpen={() => {
        form.reset();
        toggle();
      }}
      trigger={props.trigger}
      ariaDescribedBy="add-or-edit-dialog"
    >
      <div className="space-y-9">
        <h1 className="text-3xl font-light">
          {values[`${valuesPrefix}.title`]}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-9"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {values[`${valuesPrefix}.first-name.label`]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        values[`${valuesPrefix}.first-name.placeholder`]
                      }
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {values[`${valuesPrefix}.last-name.label`]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        values[`${valuesPrefix}.last-name.placeholder`]
                      }
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{values[`${valuesPrefix}.email.label`]}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={values[`${valuesPrefix}.email.placeholder`]}
                      required
                      disabled={props.user && !props.user.first}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{values[`${valuesPrefix}.phone.label`]}</FormLabel>
                  <div className="flex flex-row items-center space-x-2">
                    <div>
                      <Select
                        onValueChange={(value) => {
                          field.onChange({
                            target: {
                              value:
                                value + "-" + (field.value.split("-")[1] ?? ""),
                            },
                          });
                        }}
                        defaultValue={field.value.split("-")[0]}
                      >
                        <SelectTrigger
                          className={cn(
                            "rounded-none border-transparent border-b-black",
                            !field.value.split("-")[0] && "text-[#A1A1A1]",
                          )}
                        >
                          <SelectValue
                            className="h-full"
                            placeholder={
                              values[`${valuesPrefix}.phone.code-placeholder`]
                            }
                          >
                            {field.value.split("-")[0]}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {!dataCountryCodes && (
                            <Loader2
                              className="animate-spin"
                              strokeWidth={0.75}
                            />
                          )}
                          {dataCountryCodes?.map((country) => (
                            <SelectItem
                              key={country.code}
                              value={country.dial_code}
                            >
                              {country.name} {country.dial_code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <FormControl>
                        <Input
                          placeholder={
                            values[`${valuesPrefix}.phone.phone-placeholder`]
                          }
                          required
                          inputMode="numeric"
                          onChange={(e) => {
                            field.onChange({
                              target: {
                                value:
                                  (field.value.split("-")[0] ?? "") +
                                  "-" +
                                  e.target.value,
                              },
                            });
                          }}
                          value={field.value.split("-")[1] ?? ""}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{values[`${valuesPrefix}.role.label`]}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "rounded-none border-transparent border-b-black",
                          !field.value && "text-[#A1A1A1]",
                        )}
                      >
                        <SelectValue
                          placeholder={
                            values[`${valuesPrefix}.role.placeholder`]
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!dataRoles && (
                        <Loader2 className="animate-spin" strokeWidth={0.75} />
                      )}
                      {dataRoles?.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-9">
              <Button className="w-full" type="submit" disabled={isPending}>
                {
                  values[
                    isPending
                      ? "loading"
                      : (`${valuesPrefix}.primary-button` as const)
                  ]
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </Dialog>
  );
} */

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
    `dashboard.users.${props.user.isActive ? "inactive-dialog" : "activate-dialog"}` as const;

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
            className="h-12 w-12"
            color="#3678B1"
          />
        ) : (
          <CircleCheck
            strokeWidth={0.75}
            className="h-12 w-12"
            color="#3678B1"
          />
        )
      }
      title={values[`${valuesPrexif}.title`]}
      description={<span>{values[`${valuesPrexif}.description`]}</span>}
    />
  );
}
