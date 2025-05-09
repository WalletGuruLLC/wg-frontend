"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { toast } from "@wg-frontend/ui/toast";

import type {
  AccessLevel,
  ModuleId,
  UseGetRoleAccessLevelsQueryOutput,
} from "~/lib/data-access";
import { Button } from "~/components/button";
import {
  ACCESS_LEVELS_BINARY_ORDERED,
  accessLevelsToNumber,
  useGetProviderQuery,
  useGetRoleAccessLevelsQuery,
  useGetRoleQuery,
  useSaveRoleModuleAccessLevelMutation,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { Checkbox } from "../../../../_components/dashboard-checkbox";
import Table, { ColumnHeader } from "../../../../_components/dashboard-table";
import { BreadcrumbTitle } from "../../../../_components/dashboard-title";

function Actions({
  module,
  accessLevels,
}: {
  module: ModuleId;
  accessLevels: AccessLevel[];
}) {
  const { roleId } = useParams<{ roleId: string }>();
  const { value, values } = useI18n(
    "service-providers.roles.role.table.actions.save",
  );
  const errors = useErrors();

  const { mutate, isPending } = useSaveRoleModuleAccessLevelMutation({
    onSuccess: () => {
      toast.success(values["service-providers.roles.role.success-toast"]);
    },
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
  });

  return (
    <Button
      className="font-medium no-underline"
      variant="link"
      disabled={isPending}
      onClick={() => {
        mutate({
          roleId,
          module,
          accessLevel: accessLevelsToNumber(accessLevels),
        });
      }}
    >
      {value}
    </Button>
  );
}

function ModuleColumnValue({
  module,
  textFallback,
}: {
  module: ModuleId;
  textFallback: string;
}) {
  const { value } = useI18n(`service-providers.roles.role.modules.${module}`);
  return (
    <span className="font-normal text-black">{value ?? textFallback}</span>
  );
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
  data: UseGetRoleAccessLevelsQueryOutput[number];
  setData: (data: AccessLevel[]) => void;
}>();

const columns = [
  columnHelper.display({
    id: "module",
    header: () => (
      <ColumnHeader i18nKey="service-providers.roles.role.table.modules.header" />
    ),
    cell: (info) => (
      <ModuleColumnValue
        module={info.row.original.data.module}
        textFallback={info.row.original.data.description}
      />
    ),
  }),
  columnHelper.display({
    id: "view",
    header: () => (
      <ColumnHeader i18nKey="service-providers.roles.role.table.view.header" />
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
      <ColumnHeader i18nKey="service-providers.roles.role.table.add.header" />
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
      <ColumnHeader i18nKey="service-providers.roles.role.table.edit.header" />
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
      <ColumnHeader i18nKey="service-providers.roles.role.table.inactive.header" />
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
      <ColumnHeader i18nKey="service-providers.roles.role.table.all.header" />
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
      <ColumnHeader i18nKey="service-providers.roles.table.header.actions" />
    ),
    cell: (info) => (
      <Actions
        module={info.row.original.data.module}
        accessLevels={info.row.original.data.accessLevels}
      />
    ),
  }),
];

export default function ServiceProviderRoleAccessLevels() {
  const { providerId, roleId } = useParams<{
    providerId: string;
    roleId: string;
  }>();
  const loading = useAccessLevelGuard({
    general: {
      module: "serviceProviders",
    },
    providers: {
      id: providerId,
      module: "roles",
    },
  });
  const { values } = useI18n();
  const [state, setState] = useState<
    {
      data: UseGetRoleAccessLevelsQueryOutput[number];
      setData: (data: AccessLevel[]) => void;
    }[]
  >([]);
  const { data: roleAccessLevelsData, isLoading } = useGetRoleAccessLevelsQuery(
    { roleId, isProvider: true },
  );
  const { data, isLoading: isLoadingRoleData } = useGetRoleQuery({ roleId });
  const { data: providerData, isLoading: isLoadingProviderData } =
    useGetProviderQuery({
      providerId,
    });

  const table = useReactTable({
    data: state,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (roleAccessLevelsData) {
      setState(
        roleAccessLevelsData.map((d) => ({
          data: d,
          setData: (newData) => {
            setState((prev) =>
              prev.map((p) =>
                p.data.module === d.module
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
  }, [roleAccessLevelsData]);

  if (loading) return null;

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
            title: providerData?.name,
            href: `/dashboard/service-providers/${providerId}`,
            isLoading: isLoadingProviderData,
          },
          {
            title: values["service-providers.roles.title"],
            href: `/dashboard/service-providers/${providerId}/roles`,
            isLoading: false,
          },
          {
            title: data?.Name,
            href: `/dashboard/service-providers/${providerId}/roles/${data?.Id}`,
            isLoading: isLoadingRoleData,
          },
        ]}
        showLoadingIndicator={isLoading}
      />
      <div className="flex-1 overflow-auto">
        <Table table={table} />
      </div>
    </div>
  );
}
