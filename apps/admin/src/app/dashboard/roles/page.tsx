"use client";

import type { ReactNode } from "react";
import type { z } from "zod";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { DialogFooter } from "@wg-frontend/ui/dialog";
import { Form, FormControl, FormField, useForm } from "@wg-frontend/ui/form";
import { toast } from "@wg-frontend/ui/toast";

import type { Role } from "~/lib/data-access";
import type { I18nKey } from "~/lib/i18n";
import type { paginationAndSearchValidator } from "~/lib/validators";
import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import {
  useAddOrEditRoleMutation,
  useGetAuthedUserAccessLevelsQuery,
  useGetRolesQuery,
  useToggleRoleStatusMutation,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { addOrEditRoleValidator } from "~/lib/validators";
import ConfirmDialog from "../_components/dashboard-confirm-dialog";
import Dialog from "../_components/dashboard-dialog";
import { FormItem, FormLabel } from "../_components/dashboard-form";
import { Input } from "../_components/dashboard-input";
import { Switch } from "../_components/dashboard-switch";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "../_components/dashboard-table";

function Actions({
  role,
}: {
  role: {
    id: string;
    name: string;
    description: string;
  };
}) {
  const { values } = useI18n();

  return (
    <div className="flex flex-row space-x-4">
      <AddOrEditDialog
        role={role}
        trigger={
          <Button className="font-semibold no-underline" variant="link">
            {values["dashboard.roles.table.actions.edit"]}
          </Button>
        }
      />
      <Link href={`/dashboard/roles/${role.id}`}>
        <Button className="font-semibold no-underline" variant="link">
          {values["dashboard.roles.table.actions.access"]}
        </Button>
      </Link>
    </div>
  );
}

const columnHelper = createColumnHelper<Role>();

const columns = [
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <ColumnHeader i18nKey="dashboard.roles.table.header.role" />,
    meta: {
      main: true,
    },
  }),
  columnHelper.accessor("active", {
    id: "active",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.table.header.is-active" />
    ),
    cell: (info) => (
      <SwitchActiveStatusDialog
        role={{
          id: info.row.original.id,
          name: info.row.original.name,
          isActive: info.getValue(),
        }}
      />
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.table.header.actions" />
    ),
    cell: (info) => (
      <Actions
        role={{
          id: info.row.original.id,
          name: info.row.original.name,
          description: info.row.original.description,
        }}
      />
    ),
  }),
];

export default function RolesPage() {
  const loading = useAccessLevelGuard("roles");
  const { value } = useI18n("dashboard.roles.add-button");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paginationAndSearch: z.infer<typeof paginationAndSearchValidator> = {
    page: searchParams.get("page") ?? "1",
    items: searchParams.get("items") ?? "10",
    search: searchParams.get("search") ?? "",
  };

  const { data, isLoading } = useGetRolesQuery(paginationAndSearch);
  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);

  const table = useReactTable({
    data: data?.roles ?? [],
    columns: columns.filter(
      (c) =>
        c.id === "name" ||
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        (c.id === "actions" && accessLevelsData?.roles.includes("edit")) ||
        (c.id === "active" && accessLevelsData?.roles.includes("inactive")),
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
    <div className="w-full space-y-10 pb-4">
      <h1 className="flex flex-row items-center space-x-2 text-2xl font-semibold text-[#3A3A3A]">
        <span>Roles</span>
        {isLoading && <Loader2 className="animate-spin" />}
      </h1>
      <div className="flex flex-row items-center space-x-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search"
            className="rounded-full border border-black"
            onChange={(e) =>
              handlePaginationAndSearchChange({
                ...paginationAndSearch,
                search: e.target.value,
                page: "1",
              })
            }
          />
          <Search
            className="absolute right-4 top-1/2 size-6 -translate-y-1/2 transform"
            strokeWidth={0.75}
          />
        </div>
        {accessLevelsData?.roles.includes("add") && (
          <AddOrEditDialog
            trigger={
              <Button className="flex h-max w-48 flex-row items-center">
                <p className="flex-1 text-lg font-light">{value}</p>
                <PlusCircle strokeWidth={0.75} className="size-6" />
              </Button>
            }
          />
        )}
      </div>
      <Table table={table} />
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
        canNextPage={data?.roles.length === Number(paginationAndSearch.items)}
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

function AddOrEditDialog(props: {
  role?: {
    id: string;
    name: string;
    description: string;
  };
  trigger: ReactNode;
}) {
  const { values } = useI18n();
  const [isOpen, _, close, toggle] = useBooleanHandlers();

  const form = useForm({
    schema: addOrEditRoleValidator,
    defaultValues: {
      name: props.role?.name ?? "",
      description: props.role?.description ?? "",
      providerId: "EMPTY",
      roleId: props.role?.id,
    },
  });

  const { mutate, isPending } = useAddOrEditRoleMutation({
    onError: (error) => {
      toast.error(values[`errors.${error.message}` as I18nKey]);
    },
    onSuccess: () => {
      toast.success(values[`${valuesPrefix}.toast.success` as const]);
      close();
      form.reset();
    },
  });

  const valuesPrefix =
    `dashboard.roles.${props.role ? "edit" : "add"}-dialog` as const;

  // This useEffect is used to reset the form when the role prop changes because the form is not unmounted when dialog closes
  useEffect(() => {
    if (props.role) {
      form.reset({
        name: props.role.name,
        description: props.role.description,
        providerId: "EMPTY",
        roleId: props.role.id,
      });
    }
  }, [props.role, form]);

  return (
    <Dialog
      key={props.role?.id ?? "add"}
      isOpen={isOpen}
      toggleOpen={toggle}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{values[`${valuesPrefix}.name.label`]}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={values[`${valuesPrefix}.name.placeholder`]}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {values[`${valuesPrefix}.description.label`]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        values[`${valuesPrefix}.description.placeholder`]
                      }
                      required
                      type="textarea"
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
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
  role: {
    id: string;
    name: string;
    isActive: boolean;
  };
}) {
  const { values } = useI18n();
  const [isOpen, _, close, toggle] = useBooleanHandlers();

  const { mutate, isPending } = useToggleRoleStatusMutation({
    onSuccess: () => {
      toast.success(values[`${valuesPrexif}.toast.success` as const]);
      close();
    },
    onError: (error) => {
      toast.error(values[`errors.${error.message}` as I18nKey]);
    },
  });

  const valuesPrexif =
    `dashboard.roles.${props.role.isActive ? "inactive-dialog" : "activate-dialog"}` as const;

  return (
    <ConfirmDialog
      key={props.role.id}
      isOpen={isOpen}
      toggleOpen={toggle}
      trigger={<Switch checked={props.role.isActive} />}
      actions={[
        <Button
          className="w-full"
          key="yes"
          onClick={() => mutate({ roleId: props.role.id })}
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
        props.role.isActive ? (
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
      description={
        <>
          <span>{values[`${valuesPrexif}.description.first`]}</span>
          <span>{props.role.name}</span>
          <span>{values[`${valuesPrexif}.description.second`]}</span>
        </>
      }
    />
  );
}
