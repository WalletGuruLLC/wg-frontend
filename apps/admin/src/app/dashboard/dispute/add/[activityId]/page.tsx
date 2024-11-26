"use client";

import { useParams } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  useForm,
} from "@wg-frontend/ui/form";

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
import { disputeValidator } from "~/lib/validators";

export default function AddDisputePage() {
  const { activityId } = useParams<{ activityId: string }>();
  const form = useForm({
    schema: disputeValidator,
    defaultValues: {
      activityId: activityId,
    },
  });
  return (
    <div className="-mt-2">
      <BreadcrumbTitle
        sections={[
          {
            title: "←",
            href: "/dashboard/dispute",
            isLoading: false,
          },
        ]}
      />
      <SimpleTitle title="Dispute" showLoadingIndicator={false} />
      <p className="mt-6">Activity Id: {activityId}</p>
      <Form {...form}>
        <form className="w-1/2 space-y-4">
          <div className="flex w-full flex-col">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="mt-6 w-full pr-8">
                  <FormLabel className="mb-0">Amount:</FormLabel>
                  <FormControl className="-mt-5">
                    <Input className="mt-0" required {...field} />
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
                  <FormLabel className="mb-0">Description:</FormLabel>
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
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
