"use client";

import type { ReactNode } from "react";
import { CircleCheck, TriangleAlert } from "lucide-react";
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

export default function RolesPage() {
  return (
    <div>
      <div>
        <AddOrEditDialog
          role={{
            id: "1",
            name: "Admin",
            description: "Admin role",
          }}
          trigger={<Button>Open Edit</Button>}
        />
        <AddOrEditDialog trigger={<Button>Open Add</Button>} />
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
        <Button className="w-full" type="submit" key="yes">
          {values[`${valuesPrexif}.primary-button`]}
        </Button>,
        <Button className="w-full" type="submit" variant="secondary" key="no">
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
