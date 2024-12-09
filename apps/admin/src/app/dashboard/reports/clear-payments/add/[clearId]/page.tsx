"use client";

import { useParams } from "next/navigation";

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
  useAddClearPaymentMutation,
    useGetClearPaymentByIdQuery
} from '~/lib/data-access';
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { clearPaymentValidator} from '~/lib/validators';

export default function AddClearPage() {
  const loading = useAccessLevelGuard({
    general: {
      module: "clearPayments",
    },
  });
  const { values } = useI18n();
  const errors = useErrors();

  const formatCurrency = (value: number, code: string, scale = 6) => {
    const formattedValue = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: scale,
      maximumFractionDigits: scale,
    }).format(value / Math.pow(10, scale));
    return `${formattedValue} ${code}`;
  };

  const { clearId } = useParams<{ clearId: string }>();
  // const { data: dataUser } = useGetAuthedUserInfoQuery(undefined);
  const { data: dataClearPayment } =  useGetClearPaymentByIdQuery(clearId);
  console.log(dataClearPayment);



  const form = useForm({
    schema: clearPaymentValidator,
    defaultValues: {
      id: clearId,
      month: values[(dataClearPayment?.providerRevenues.month ?? "0") as keyof typeof values ],
      transaction: `$ ${formatCurrency(dataClearPayment?.providerRevenues.value ?? 0, "USD")}`,
      fees: `$ ${formatCurrency(dataClearPayment?.providerRevenues.fees ?? 0, "USD")}`,
      amount: `$ ${formatCurrency((dataClearPayment?.providerRevenues.value ?? 0) - (dataClearPayment?.providerRevenues.fees ?? 0), "USD")}`,
      reference: "",
      notes: "",
    },
  });



  const { mutate, isPending } = useAddClearPaymentMutation({
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      toast.success(values[`refund.toast.success`]);
      close();
      form.reset();
    },
  });
  if (loading) return null;
  return (
    <div className="-mt-2">
      <BreadcrumbTitle
        sections={[
          {
            title: "←",
            href: "/dashboard/reports/clear-payments/",
            isLoading: false,
          },
        ]}
      />
      <SimpleTitle
        title={values["clear-title"]}
        showLoadingIndicator={false}
      />
      <p className="mt-6">
        {values["clear-label"] + " " + clearId}
      </p>
      <p className="mt-6">
        {values["clear-month"] + " " + values[(dataClearPayment?.providerRevenues.month ?? "0") as keyof typeof values]}
      </p>
      <p className="mt-6">
        {values["clear-transactions"] + " " + `$ ${formatCurrency(dataClearPayment?.providerRevenues.value ?? 0, "USD")}`}
      </p>
      <p className="mt-6">
        {values["clear-fees"] + " " + `$ ${formatCurrency(dataClearPayment?.providerRevenues.fees ?? 0, "USD")}`}
      </p>
      <p className="mt-6">
        {values["clear-amount"] + " " + `$ ${formatCurrency((dataClearPayment?.providerRevenues.value ?? 0) - (dataClearPayment?.providerRevenues.fees ?? 0), "USD")}`}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="w-1/2 space-y-4"
        >
          <div className="flex w-full flex-col">
            <FormField
              control={form.control}
              name="reference"
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
              name="notes"
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
