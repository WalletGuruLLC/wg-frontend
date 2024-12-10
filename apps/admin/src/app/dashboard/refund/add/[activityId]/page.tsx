"use client";

import { useParams, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  useForm,
} from "@wg-frontend/ui/form";
import { toast } from "@wg-frontend/ui/toast";

import {
  FormItem,
  FormLabel,
} from "~/app/dashboard/_components/dashboard-form";
import { Input } from "~/app/dashboard/_components/dashboard-input";
import { Textarea } from "~/app/dashboard/_components/dashboard-textarea";
import {
  BreadcrumbTitle,
  SimpleTitle,
} from "~/app/dashboard/_components/dashboard-title";
import { Button } from "~/components/button";
import {
  useAddRefundMutation,
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useI18n } from "~/lib/i18n";
import { disputeValidator } from "~/lib/validators";

export default function AddRefundPage() {
  const router = useRouter();
  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);
  const { values } = useI18n();
  const errors = useErrors();
  const { activityId } = useParams<{ activityId: string }>();
  const { data: dataUser } = useGetAuthedUserInfoQuery(undefined);
  const form = useForm({
    schema: disputeValidator,
    defaultValues: {
      activityId: activityId,
      amount: "",
      description: "",
      serviceProviderId:
        dataUser?.type === "PROVIDER" ? dataUser.serviceProviderId : "",
    },
  });
  const { mutate, isPending } = useAddRefundMutation({
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      toast.success(values[`refund.toast.success`]);
      close();
      form.reset();
      router.replace("/dashboard");
    },
  });
  return (isLoadingAccessLevels ||
    accessLevelsData?.general.refunds.includes("add")) == false ? (
    void router.replace("/dashboard")
  ) : (
    <div className="-mt-2">
      <BreadcrumbTitle
        sections={[
          {
            title: "←",
            href: "/dashboard/refund",
            isLoading: false,
          },
        ]}
      />
      <SimpleTitle
        title={values["refund-title"]}
        showLoadingIndicator={false}
      />
      <p className="mt-6">
        {values["refund-activity-label"] + " " + activityId}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="w-1/2 space-y-4"
        >
          <div className="flex w-full flex-col">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="mt-6 w-full pr-8">
                  <FormLabel className="mb-0">
                    {values["refund-add-amount-label"]}
                  </FormLabel>
                  <FormControl className="-mt-5">
                    <Input
                      className="mt-0"
                      type="number"
                      placeholder={values["refund-add-amount-placeholder"]}
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-2 w-full pr-8">
                  <FormLabel className="mb-0">
                    {values["refund-add-description-label"]}
                  </FormLabel>
                  <FormControl className="-mt-5">
                    <Textarea className="mt-0" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="ml-auto mr-8 mt-5 w-auto p-2 pl-4 pr-4"
              type="submit"
              disabled={isPending}
            >
              {values[isPending ? "loading" : "refund-add-button"]}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
