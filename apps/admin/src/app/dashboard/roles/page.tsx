"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CircleCheck, PlusCircle, Search, TriangleAlert } from "lucide-react";
import { z } from "zod";

import { Form, FormControl, FormField, useForm } from "@wg-frontend/ui/form";

import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import { useI18n } from "~/lib/i18n";
import ConfirmDialog from "../_components/dashboard-confirm-dialog";
import Dialog from "../_components/dashboard-dialog";
import { FormItem, FormLabel } from "../_components/dashboard-form";
import { Input } from "../_components/dashboard-input";
import { Switch } from "../_components/dashboard-switch";
import Table from "../_components/dashboard-table";

interface Role {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

const roles: Role[] = [
  {
    id: "Admin",
    name: "Admin",
    description: "Admin Desc",
    isActive: true,
  },
  {
    id: "Marketing",
    name: "Marketing",
    description: "Marketing Desc",
    isActive: true,
  },
  {
    id: "Sales",
    name: "Sales",
    description: "Sales Desc",
    isActive: false,
  },
  {
    id: "Support",
    name: "Support",
    description: "Support Desc",
    isActive: true,
  },
];

const columnHelper = createColumnHelper<Role>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Role",
    meta: {
      main: true,
    },
  }),
  columnHelper.accessor("isActive", {
    header: "Active",
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
    header: "Actions",
    cell: (info) => (
      <div className="flex flex-row space-x-4">
        <AddOrEditDialog
          role={{
            id: info.row.original.id,
            name: info.row.original.name,
            description: info.row.original.description,
          }}
          trigger={
            <Button className="font-semibold no-underline" variant="link">
              Edit
            </Button>
          }
        />
        <Link href={`/dashboard/roles/${info.row.original.id}`}>
          <Button className="font-semibold no-underline" variant="link">
            Access
          </Button>
        </Link>
      </div>
    ),
  }),
];

export default function RolesPage() {
  const table = useReactTable({
    data: roles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full space-y-10">
      <h1 className="text-2xl font-semibold text-[#3A3A3A]">Roles</h1>
      <div className="flex flex-row items-center space-x-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search"
            className="rounded-full border border-black"
          />
          <Search
            className="absolute right-4 top-1/2 size-6 -translate-y-1/2 transform"
            strokeWidth={0.75}
          />
        </div>
        <AddOrEditDialog
          trigger={
            <Button className="flex h-max w-48 flex-row items-center">
              <p className="flex-1 text-lg font-light">Add Role</p>
              <PlusCircle strokeWidth={0.75} className="size-6" />
            </Button>
          }
        />
      </div>
      <Table table={table} />
      <div>
        <AddOrEditDialog
          role={{
            id: "1",
            name: "Admin",
            description: "Admin role",
          }}
          trigger={<Button>Open Edit</Button>}
        />
      </div>
      <div>
        <SwitchActiveStatusDialog
          role={{
            id: "1",
            name: "Admin",
            isActive: true,
          }}
        />
        <SwitchActiveStatusDialog
          role={{
            id: "2",
            name: "Admin2",
            isActive: false,
          }}
        />
      </div>
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

  const form = useForm({
    schema: z.object({
      name: z.string().min(1),
      description: z.string().min(1),
    }),
    defaultValues: {
      name: props.role?.name ?? "",
      description: props.role?.description ?? "",
    },
  });
  const valuesPrefix =
    `dashboard.roles.${props.role ? "edit" : "add"}-dialog` as const;

  return (
    <Dialog
      trigger={props.trigger}
      actions={[
        <Button className="w-full" type="submit" key="1">
          {values[`${valuesPrefix}.primary-button`]}
        </Button>,
      ]}
      ariaDescribedBy="add-or-edit-dialog"
    >
      <div className="space-y-9">
        <h1 className="text-3xl font-light">
          {values[`${valuesPrefix}.title`]}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => console.log(data))}
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
  const valuesPrexif =
    `dashboard.roles.${props.role.isActive ? "inactive-dialog" : "activate-dialog"}` as const;

  return (
    <ConfirmDialog
      trigger={<Switch checked={props.role.isActive} />}
      actions={[
        <Button className="w-full" key="yes">
          {values[`${valuesPrexif}.primary-button`]}
        </Button>,
        <Button className="w-full" variant="secondary" key="no">
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
