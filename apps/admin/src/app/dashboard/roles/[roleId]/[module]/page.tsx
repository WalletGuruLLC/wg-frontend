"use client";

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

import { toast } from "@wg-frontend/ui/toast";

import type {
  AccessLevel,
  ModuleId,
  UseGetRoleProvidersAccessLevelsQueryOutput,
} from "~/lib/data-access";
import type { paginationAndSearchValidator } from "~/lib/validators";
import { Checkbox } from "~/app/dashboard/_components/dashboard-checkbox";
import { Input } from "~/app/dashboard/_components/dashboard-input";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "~/app/dashboard/_components/dashboard-table";
import { Button } from "~/components/button";
import {
  ACCESS_LEVELS_BINARY_ORDERED,
  accessLevelsToNumber,
  useGetRoleProvidersAccessLevelsQuery,
  useGetRoleQuery,
  useSaveRoleProviderModuleAccessLevelMutation,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { BreadcrumbTitle } from "../../../_components/dashboard-title";

type Module = Exclude<ModuleId, "serviceProviders" | "wallets">;

function Actions({
  serviceProviderId,
  accessLevels,
}: {
  serviceProviderId: string;
  accessLevels: AccessLevel[];
}) {
  const { roleId, module } = useParams<{ roleId: string; module: Module }>();
  const { value, values } = useI18n(
    "dashboard.roles.role.module.table.actions.save",
  );
  const errors = useErrors();

  const { mutate, isPending } = useSaveRoleProviderModuleAccessLevelMutation({
    onSuccess: () => {
      toast.success(values["dashboard.roles.role.success-toast"]);
    },
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
  });

  return (
    <div className="flex flex-row space-x-4">
      <Button
        className="font-normal no-underline"
        variant="link"
        disabled={isPending}
        onClick={() => {
          mutate({
            roleId,
            module,
            accessLevel: accessLevelsToNumber(accessLevels),
            serviceProvider: serviceProviderId,
          });
        }}
      >
        {value}
      </Button>
    </div>
  );
}

function ProvidersColumnValue({ name }: { name: string }) {
  return <span className="font-normal text-black">{name}</span>;
}

function CheckboxCell({
  accessLevels,
  action,
  setData,
}: {
  accessLevels: AccessLevel[];
  action: AccessLevel;
  setData: (data: AccessLevel[]) => void;
}) {
  return (
    <Checkbox
      checked={accessLevels.includes(action)}
      onCheckedChange={(newChecked: boolean) => {
        setData(
          newChecked
            ? [...accessLevels, action]
            : accessLevels.filter((al) => al !== action),
        );
      }}
    />
  );
}

function AllCheckboxCell({
  accessLevels,
  setData,
}: {
  accessLevels: AccessLevel[];
  setData: (data: AccessLevel[]) => void;
}) {
  return (
    <Checkbox
      checked={accessLevels.length === ACCESS_LEVELS_BINARY_ORDERED.length}
      onCheckedChange={(newChecked: boolean) => {
        setData(newChecked ? [...ACCESS_LEVELS_BINARY_ORDERED] : []);
      }}
    />
  );
}

const columnHelper = createColumnHelper<{
  data: UseGetRoleProvidersAccessLevelsQueryOutput[number];
  setData: (data: AccessLevel[]) => void;
}>();

const columns = [
  columnHelper.display({
    id: "providers",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.role.module.table.providers.header" />
    ),
    cell: (info) => (
      <ProvidersColumnValue
        name={info.row.original.data.serviceProvider.name}
      />
    ),
  }),
  columnHelper.display({
    id: "view",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.role.module.table.view.header" />
    ),
    cell: (info) => (
      <CheckboxCell
        action="view"
        accessLevels={info.row.original.data.accessLevels}
        setData={info.row.original.setData}
      />
    ),
  }),
  columnHelper.display({
    id: "add",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.role.module.table.add.header" />
    ),
    cell: (info) => (
      <CheckboxCell
        action="add"
        accessLevels={info.row.original.data.accessLevels}
        setData={info.row.original.setData}
      />
    ),
  }),
  columnHelper.display({
    id: "edit",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.role.module.table.edit.header" />
    ),
    cell: (info) => (
      <CheckboxCell
        action="edit"
        accessLevels={info.row.original.data.accessLevels}
        setData={info.row.original.setData}
      />
    ),
  }),
  columnHelper.display({
    id: "inactive",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.role.module.table.inactive.header" />
    ),
    cell: (info) => (
      <CheckboxCell
        action="inactive"
        accessLevels={info.row.original.data.accessLevels}
        setData={info.row.original.setData}
      />
    ),
  }),
  columnHelper.display({
    id: "all",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.role.module.table.all.header" />
    ),
    cell: (info) => (
      <AllCheckboxCell
        accessLevels={info.row.original.data.accessLevels}
        setData={info.row.original.setData}
      />
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.role.module.table.action.header" />
    ),
    cell: (info) => (
      <Actions
        serviceProviderId={info.row.original.data.serviceProvider.id}
        accessLevels={info.row.original.data.accessLevels}
      />
    ),
  }),
];

export default function RoleAccessLevels() {
  const loading = useAccessLevelGuard("roles");
  const { values } = useI18n();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { roleId, module } = useParams<{ roleId: string; module: Module }>();
  const [state, setState] = useState<
    {
      data: UseGetRoleProvidersAccessLevelsQueryOutput[number];
      setData: (data: AccessLevel[]) => void;
    }[]
  >([]);

  const paginationAndSearch: z.infer<typeof paginationAndSearchValidator> = {
    page: searchParams.get("page") ?? "1",
    items: searchParams.get("items") ?? "10",
    search: searchParams.get("search") ?? "",
  };

  const { data: roleData, isLoading: isLoadingRoleData } = useGetRoleQuery({
    roleId,
  });
  const { data, isLoading } = useGetRoleProvidersAccessLevelsQuery({
    roleId,
    module,
    ...paginationAndSearch,
  });

  const table = useReactTable({
    data: state,
    columns,
    getCoreRowModel: getCoreRowModel(),
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

  useEffect(() => {
    if (data) {
      setState(
        data.map((d) => ({
          data: d,
          setData: (newData) => {
            setState((prev) =>
              prev.map((p) =>
                p.data.serviceProvider.id === d.serviceProvider.id
                  ? {
                      ...p,
                      data: {
                        ...p.data,
                        accessLevels: newData,
                      },
                    }
                  : p,
              ),
            );
          },
        })),
      );
    }
  }, [data]);

  const firstRowIdx =
    Number(paginationAndSearch.items) * Number(paginationAndSearch.page) -
    Number(paginationAndSearch.items) +
    1;
  const lastRowIdx = firstRowIdx + table.getRowModel().rows.length - 1;

  if (loading) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <BreadcrumbTitle
        sections={[
          {
            title:
              values["dashboard.roles.role.title"] + (roleData?.Name ?? ""),
            href: `/dashboard/roles/${roleId}`,
            isLoading: isLoadingRoleData,
          },
          {
            title: values[`dashboard.roles.role.modules.${module}`],
            href: `/dashboard/roles/${roleId}/${module}`,
            isLoading: false,
          },
        ]}
        showLoadingIndicator={isLoadingRoleData || isLoading}
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
            value={paginationAndSearch.search}
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {" "}
        <Table table={table} />
      </div>
      <div>
        <PaginationFooter
          count={{
            total: state[0]?.data.total ?? 0,
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
          canNextPage={state.length === Number(paginationAndSearch.items)}
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
