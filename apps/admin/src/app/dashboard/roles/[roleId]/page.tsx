"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

import { Button } from "@wg-frontend/ui/button";
import { Checkbox } from "@wg-frontend/ui/checkbox";
import { toast } from "@wg-frontend/ui/toast";

import type {
  AccessLevelAction,
  AccessLevelModule,
  UseGetRoleQueryOutput,
} from "~/lib/data-access";
import type { I18nKey } from "~/lib/i18n";
import {
  ACCESS_LEVELS_ACTIONS_BINARY_ORDERED,
  ACCESS_LEVELS_MAP,
  convertAccessLevel,
  useGetRoleQuery,
  useSaveRoleModuleAccessLevelMutation,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import Table, { ColumnHeader } from "../../_components/dashboard-table";

function Actions({
  module,
  accessLevels,
}: {
  module: AccessLevelModule;
  accessLevels: AccessLevelAction[];
}) {
  const { roleId } = useParams<{ roleId: string }>();
  const { value, values } = useI18n("dashboard.roles.role.table.actions.save");

  const { mutate, isPending } = useSaveRoleModuleAccessLevelMutation({
    onSuccess: () => {
      toast.success(values["dashboard.roles.role.success-toast"]);
    },
    onError: (error) => {
      toast.error(values[`errors.${error.message}` as I18nKey]);
    },
  });

  return (
    <Button
      className="font-semibold no-underline"
      variant="link"
      disabled={isPending}
      onClick={() => {
        mutate({
          roleId,
          moduleId: Object.keys(ACCESS_LEVELS_MAP).find(
            (k) =>
              ACCESS_LEVELS_MAP[k as keyof typeof ACCESS_LEVELS_MAP] === module,
          ) as keyof typeof ACCESS_LEVELS_MAP,
          accessLevel: convertAccessLevel(accessLevels),
        });
      }}
    >
      {value}
    </Button>
  );
}

function ModuleColumnValue({ module }: { module: AccessLevelModule }) {
  const { value } = useI18n(`dashboard.roles.role.modules.${module}`);
  return <span className="font-semibold text-black">{value}</span>;
}

function CheckboxCell({
  accessLevels,
  action,
  setData,
}: {
  accessLevels: AccessLevelAction[];
  action: AccessLevelAction;
  setData: (data: AccessLevelAction[]) => void;
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
      className="rounded-sm border-black data-[state=checked]:bg-white data-[state=checked]:text-black"
    />
  );
}

function AllCheckboxCell({
  accessLevels,
  setData,
}: {
  accessLevels: AccessLevelAction[];
  setData: (data: AccessLevelAction[]) => void;
}) {
  return (
    <Checkbox
      checked={
        accessLevels.length === ACCESS_LEVELS_ACTIONS_BINARY_ORDERED.length
      }
      onCheckedChange={(newChecked: boolean) => {
        setData(newChecked ? [...ACCESS_LEVELS_ACTIONS_BINARY_ORDERED] : []);
      }}
      className="rounded-sm border-black data-[state=checked]:bg-white data-[state=checked]:text-black"
    />
  );
}

const columnHelper = createColumnHelper<{
  data: UseGetRoleQueryOutput[number];
  setData: (data: AccessLevelAction[]) => void;
}>();

const columns = [
  columnHelper.display({
    id: "module",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.role.table.modules.header" />
    ),
    cell: (info) => (
      <ModuleColumnValue module={info.row.original.data.module} />
    ),
  }),
  columnHelper.display({
    id: "view",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.role.table.view.header" />
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
      <ColumnHeader i18nKey="dashboard.roles.role.table.add.header" />
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
      <ColumnHeader i18nKey="dashboard.roles.role.table.edit.header" />
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
      <ColumnHeader i18nKey="dashboard.roles.role.table.inactive.header" />
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
      <ColumnHeader i18nKey="dashboard.roles.role.table.all.header" />
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
      <ColumnHeader i18nKey="dashboard.roles.table.header.actions" />
    ),
    cell: (info) => (
      <Actions
        module={info.row.original.data.module}
        accessLevels={info.row.original.data.accessLevels}
      />
    ),
  }),
];

export default function RoleAccessLevels() {
  const loading = useAccessLevelGuard("roles");
  const { values } = useI18n();
  const { roleId } = useParams<{ roleId: string }>();
  const searchParams = useSearchParams();
  const [state, setState] = useState<
    {
      data: UseGetRoleQueryOutput[number];
      setData: (data: AccessLevelAction[]) => void;
    }[]
  >([]);
  const { data, isLoading } = useGetRoleQuery({ roleId });

  const table = useReactTable({
    data: state,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (data) {
      setState(
        data.map((d) => ({
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
  }, [data]);

  if (loading) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <h1 className="flex flex-row items-center space-x-2 text-2xl font-semibold text-[#3A3A3A]">
        <span>
          {values["dashboard.roles.role.title"]}
          {searchParams.get("name") ?? ""}
        </span>
        {isLoading && <Loader2 className="animate-spin" />}
      </h1>
      <div className="flex-1 overflow-auto">
        <Table table={table} />
      </div>
    </div>
  );
}
