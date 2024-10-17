"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRightLeft, DollarSign, KeySquare } from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { DialogFooter } from "@wg-frontend/ui/dialog";
import { Form, FormControl, FormField, useForm } from "@wg-frontend/ui/form";
import { toast } from "@wg-frontend/ui/toast";

import Dialog from "~/app/dashboard/_components/dashboard-dialog";
import {
  FormItem,
  FormLabel,
} from "~/app/dashboard/_components/dashboard-form";
import { Input } from "~/app/dashboard/_components/dashboard-input";
import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import {
  useAddOrEditProviderFeeMutation,
  useGetProviderFeeQuery,
  useGetProviderKeysQuery,
  useGetProviderQuery,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { addOrEditProviderFeeValidator } from "~/lib/validators";
import { BreadcrumbTitle } from "../../../_components/dashboard-title";

export default function ServiceProviderPage() {
  const { providerId } = useParams<{ providerId: string }>();
  const loading = useAccessLevelGuard({
    general: {
      module: "serviceProviders",
    },
    providers: {
      module: "settings",
      id: providerId,
    },
  });
  const { values } = useI18n();
  const { data, isLoading: isLoadingProviderData } = useGetProviderQuery({
    providerId,
  });
  const { data: fee } = useGetProviderFeeQuery({ providerId });

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
            title: data?.name,
            href: `/dashboard/service-providers/${providerId}`,
            isLoading: isLoadingProviderData,
          },
          {
            title: values["service-providers.settings.title"],
            href: `/dashboard/service-providers/${providerId}/settings`,
            isLoading: false,
          },
        ]}
      />
      <div className="flex w-full">
        <Link
          href={`/dashboard/service-providers/${providerId}/settings/payment-parameters`}
          className="m-3 flex h-[200px] flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <ArrowRightLeft size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["service-providers.settings.sections.payment-parameters"]}
          </span>
        </Link>
        <SetFeeDialog
          fee={
            fee
              ? {
                  id: String(fee.id),
                  percent: String(fee.percent),
                  comission: String(fee.comission),
                  base: String(fee.base),
                }
              : undefined
          }
          trigger={
            <div className="m-3 flex h-[200px] flex-1 cursor-pointer flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center">
              <DollarSign size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["service-providers.settings.sections.fee"]}
              </span>
            </div>
          }
        />
        <KeyDialog
          trigger={
            <div className="m-3 flex h-[200px] flex-1 cursor-pointer flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center">
              <KeySquare size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["service-providers.settings.sections.key"]}
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
}

function SetFeeDialog(props: {
  fee?: {
    id: string;
    percent: string;
    comission: string;
    base: string;
  };
  trigger: ReactNode;
}) {
  const { values } = useI18n();
  const { providerId } = useParams<{ providerId: string }>();
  const errors = useErrors();
  const [isOpen, _, close, toggle] = useBooleanHandlers();

  const form = useForm({
    schema: addOrEditProviderFeeValidator,
    defaultValues: {
      serviceProviderId: providerId,
      percent: props.fee?.percent ?? "",
      comission: props.fee?.comission ?? "",
      base: props.fee?.base ?? "",
      feeId: props.fee?.id ?? "",
    },
  });

  const { mutate, isPending } = useAddOrEditProviderFeeMutation({
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      toast.success(
        values[`service-providers.settings.fee.dialog.toast.success`],
      );
      close();
      form.reset();
    },
  });

  // This useEffect is used to reset the form when the role prop changes because the form is not unmounted when dialog closes
  useEffect(() => {
    if (props.fee) {
      form.reset({
        base: props.fee.base,
        comission: props.fee.comission,
        percent: props.fee.percent,
        feeId: props.fee.id,
        serviceProviderId: providerId,
      });
    }
  }, [props.fee, form, providerId]);

  return (
    <Dialog
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
          {values[`service-providers.settings.fee.dialog.title`]}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-9"
          >
            <FormField
              control={form.control}
              name="percent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      values[
                        `service-providers.settings.fee.dialog.percent.label`
                      ]
                    }
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        values[
                          `service-providers.settings.fee.dialog.percent.placeholder`
                        ]
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
              name="comission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      values[
                        `service-providers.settings.fee.dialog.commission.label`
                      ]
                    }
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        values[
                          `service-providers.settings.fee.dialog.commission.placeholder`
                        ]
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
              name="base"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {values[`service-providers.settings.fee.dialog.base.label`]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        values[
                          `service-providers.settings.fee.dialog.base.placeholder`
                        ]
                      }
                      required
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
                      : (`service-providers.settings.fee.dialog.primary-button` as const)
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

function KeyDialog(props: { trigger: ReactNode }) {
  const { values } = useI18n();
  const [isOpen, _, _close, toggle] = useBooleanHandlers();
  const { data: keys, isLoading } = useGetProviderKeysQuery(undefined);

  if (isLoading) return null;
  return (
    <Dialog
      isOpen={isOpen}
      toggleOpen={() => {
        toggle();
      }}
      trigger={props.trigger}
      ariaDescribedBy="key-dialog"
    >
      <div className="space-y-9 p-3">
        <h1 className="text-3xl font-light">
          {values[`service-providers.settings.key.dialog.title`]}
        </h1>

        <div className="columns-sm">
          <p></p>
          {values[`service-providers.settings.key.dialog.secretKey.label`]}
          <span className="mb-4">
            {keys?.secretKey
              ? keys.secretKey
              : values[`service-providers.settings.key.dialog.no-key`]}
          </span>
          <br />
          {values[`service-providers.settings.key.dialog.publicKey.label`]}
          <span>
            {keys?.publicKey
              ? keys.publicKey
              : values[`service-providers.settings.key.dialog.no-key`]}
          </span>
        </div>
      </div>
    </Dialog>
  );
}
