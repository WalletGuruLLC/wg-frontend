"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

import { useIsMutating } from "@wg-frontend/data-access";
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
  ACCESS_LEVELS_MAP,
  convertAccessLevel,
  useGetRoleQuery,
  useSaveRoleModuleAccessLevelMutation,
} from "~/lib/data-access";
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
  const isPendingOther = useIsMutating({
    mutationKey: ["save-role-module-access-level"],
  });

  return (
    <Button
      className="font-semibold no-underline"
      variant="link"
      disabled={isPending || !!isPendingOther}
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
  module,
}: {
  accessLevels: AccessLevelAction[];
  action: AccessLevelAction;
  module: AccessLevelModule;
}) {
  const { roleId } = useParams<{ roleId: string }>();

  const [checked, setChecked] = useState(accessLevels.includes(action));

  const { mutate } = useSaveRoleModuleAccessLevelMutation();

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(newChecked: boolean) => {
        setChecked(newChecked);
        mutate({
          roleId,
          moduleId: Object.keys(ACCESS_LEVELS_MAP).find(
            (k) =>
              ACCESS_LEVELS_MAP[k as keyof typeof ACCESS_LEVELS_MAP] === module,
          ) as keyof typeof ACCESS_LEVELS_MAP,
          accessLevel: convertAccessLevel(
            newChecked
              ? [...accessLevels, action]
              : accessLevels.filter((a) => a !== action),
          ),
        });
      }}
      className="rounded-sm border-black data-[state=checked]:bg-white data-[state=checked]:text-black"
    />
  );
}

const columnHelper = createColumnHelper<UseGetRoleQueryOutput[number]>();

const columns = [
  columnHelper.accessor("module", {
    id: "module",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.role.table.modules.header" />
    ),
    cell: (info) => <ModuleColumnValue module={info.getValue()} />,
  }),
  columnHelper.display({
    id: "view",
    header: () => (
      <ColumnHeader i18nKey="dashboard.roles.role.table.view.header" />
    ),
    cell: (info) => (
      <CheckboxCell
        action="view"
        accessLevels={info.row.original.accessLevels}
        module={info.row.original.module}
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
        accessLevels={info.row.original.accessLevels}
        module={info.row.original.module}
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
        accessLevels={info.row.original.accessLevels}
        module={info.row.original.module}
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
        accessLevels={info.row.original.accessLevels}
        module={info.row.original.module}
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
        module={info.row.original.module}
        accessLevels={info.row.original.accessLevels}
      />
    ),
  }),
];

export default function RoleAccessLevels() {
  const { values } = useI18n();
  const { roleId } = useParams<{ roleId: string }>();
  const searchParams = useSearchParams();
  const { data, isLoading } = useGetRoleQuery({ roleId });

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
