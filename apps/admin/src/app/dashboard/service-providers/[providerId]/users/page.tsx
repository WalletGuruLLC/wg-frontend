"use client";

import type { ReactNode } from "react";
import type { z } from "zod";
import { useEffect, useState } from "react";
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
import {
  CircleCheck,
  Loader2,
  PlusCircle,
  Search,
  TriangleAlert,
} from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { cn } from "@wg-frontend/ui";
import { DialogFooter } from "@wg-frontend/ui/dialog";
import { Form, FormControl, FormField, useForm } from "@wg-frontend/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@wg-frontend/ui/select";
import { toast } from "@wg-frontend/ui/toast";

import type { User } from "~/lib/data-access";
import type { paginationAndSearchValidator } from "~/lib/validators";
import { Checkbox } from "~/app/dashboard/_components/dashboard-checkbox";
import { BreadcrumbTitle } from "~/app/dashboard/_components/dashboard-title";
import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import { SelectTrigger } from "~/components/select";
import {
  useAddOrEditUserMutation,
  useGetActiveRolesQuery,
  useGetAuthedUserAccessLevelsQuery,
  useGetCountryCodesQuery,
  useGetProviderQuery,
  useGetUsersQuery,
  useToggleContactInformationMutation,
  useToggleUserStatusMutation,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { addOrEditUserValidator } from "~/lib/validators";
import ConfirmDialog from "../../../_components/dashboard-confirm-dialog";
import Dialog from "../../../_components/dashboard-dialog";
import { FormItem, FormLabel } from "../../../_components/dashboard-form";
import { Input } from "../../../_components/dashboard-input";
import { Switch } from "../../../_components/dashboard-switch";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "../../../_components/dashboard-table";

function ContactInformationCheckbox(props: {
  isContactInformation: boolean;
  userId: string;
}) {
  const { value } = useI18n(
    "service-providers.users.edit-dialog.toast.success",
  );
  const errors = useErrors();
  const [checked, setChecked] = useState(props.isContactInformation);

  const { mutate, isPending } = useToggleContactInformationMutation({
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      toast.success(value);
    },
    onMutate: () => {
      setChecked(!checked);
    },
  });

  useEffect(() => {
    setChecked(props.isContactInformation);
  }, [props.isContactInformation]);

  return (
    <Checkbox
      checked={checked}
      disabled={isPending}
      onCheckedChange={() => {
        void mutate({
          userId: props.userId,
        });
      }}
    />
  );
}

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
    serviceProviderId: string;
    first: boolean;
  };
}) {
  const { value } = useI18n("service-providers.users.table.actions.edit");

  return (
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
    />
  );
}

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("firstName", {
    id: "firstName",
    cell: (info) => info.getValue() || "-",
    header: () => (
      <ColumnHeader i18nKey="service-providers.users.table.header.first-name" />
    ),
  }),
  columnHelper.accessor("lastName", {
    id: "lastName",
    cell: (info) => info.getValue() || "-",
    header: () => (
      <ColumnHeader i18nKey="service-providers.users.table.header.last-name" />
    ),
  }),
  columnHelper.accessor("email", {
    id: "email",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.users.table.header.email" />
    ),
  }),
  columnHelper.accessor("phone", {
    id: "phone",
    cell: (info) => info.getValue() || "-",
    header: () => (
      <ColumnHeader i18nKey="service-providers.users.table.header.phone" />
    ),
  }),
  columnHelper.accessor("roleName", {
    id: "roleName",
    cell: (info) => info.getValue() || "-",
    header: () => (
      <ColumnHeader i18nKey="service-providers.users.table.header.role" />
    ),
  }),
  columnHelper.display({
    id: "contact",
    cell: (info) => (
      <ContactInformationCheckbox
        isContactInformation={!!info.row.original.contactUser}
        userId={info.row.original.id}
      />
    ),
    header: () => (
      <ColumnHeader i18nKey="service-providers.users.table.header.contact" />
    ),
  }),
  columnHelper.accessor("active", {
    id: "active",
    header: () => (
      <ColumnHeader i18nKey="service-providers.users.table.header.is-active" />
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
      <ColumnHeader i18nKey="service-providers.users.table.header.actions" />
    ),
    cell: (info) => (
      <Actions
        user={{
          id: info.row.original.id,
          firstName: info.row.original.firstName,
          lastName: info.row.original.lastName,
          email: info.row.original.email,
          phone: info.row.original.phone,
          serviceProviderId: info.row.original.serviceProviderId,
          role: {
            id: info.row.original.roleId,
            name: info.row.original.roleName,
          },
          first: info.row.original.first,
        }}
      />
    ),
  }),
];

export default function ServiceProviderUsersPage() {
  const { providerId } = useParams<{ providerId: string }>();
  const loading = useAccessLevelGuard({
    general: {
      module: "serviceProviders",
    },
    providers: {
      id: providerId,
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

  const { data, isLoading } = useGetUsersQuery({
    ...paginationAndSearch,
    type: "PROVIDER",
    serviceProviderId: providerId,
  });
  const { data: dataProvider, isLoading: isLoadingProviderData } =
    useGetProviderQuery({
      providerId,
    });
  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);

  const table = useReactTable({
    data: data?.users ?? [],
    columns: columns
      .filter(
        (c) =>
          c.id !== "actions" ||
          accessLevelsData?.providers[providerId]?.users.includes("edit"),
      )
      .filter(
        (c) =>
          c.id !== "active" ||
          accessLevelsData?.providers[providerId]?.users.includes("inactive"),
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
      <BreadcrumbTitle
        sections={[
          {
            title: values["service-providers.home.title"],
            href: "/dashboard/service-providers",
            isLoading: false,
          },
          {
            title: dataProvider?.name,
            href: `/dashboard/service-providers/${providerId}`,
            isLoading: isLoadingProviderData,
          },
          {
            title: values["service-providers.users.title"],
            href: `/dashboard/service-providers/${providerId}/users`,
            isLoading: false,
          },
        ]}
        showLoadingIndicator={isLoading}
      />
      <div className="flex flex-row items-center space-x-6">
        <div className="relative flex-1">
          <Input
            placeholder={values["service-providers.users.search.placeholder"]}
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
        {accessLevelsData?.providers[providerId]?.users.includes("add") && (
          <AddOrEditDialog
            trigger={
              <Button className="flex h-max flex-row items-center space-x-2">
                <p className="flex-1 text-lg font-light">
                  {values["service-providers.users.add-button"]}
                </p>
                <PlusCircle strokeWidth={0.75} className="size-6" />
              </Button>
            }
          />
        )}
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
    serviceProviderId: string;
    first: boolean;
  };
  trigger: ReactNode;
}) {
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, close, toggle] = useBooleanHandlers();
  const { providerId } = useParams<{ providerId: string }>();
  const form = useForm({
    schema: addOrEditUserValidator,
    defaultValues: {
      firstName: props.user?.firstName ?? "",
      lastName: props.user?.lastName ?? "",
      email: props.user?.email ?? "",
      phone: props.user?.phone ?? "",
      roleId: props.user?.role.id ?? "",
      serviceProviderId: providerId,
      type: "PROVIDER",
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
    providerId: providerId,
  });

  const { data: dataCountryCodes } = useGetCountryCodesQuery(undefined);

  const valuesPrefix =
    `service-providers.users.${props.user ? "edit" : "add"}-dialog` as const;

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
        serviceProviderId: providerId,
        type: "PROVIDER",
      });
    }
  }, [props.user, form, providerId]);

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
    `service-providers.users.${props.user.isActive ? "inactive-dialog" : "activate-dialog"}` as const;

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
