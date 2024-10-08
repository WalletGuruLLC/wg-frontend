"use client";

import { Card } from "@wg-frontend/ui/card";
import { Form, FormControl, FormField, useForm } from "@wg-frontend/ui/form";
import { toast } from "@wg-frontend/ui/toast";

import { PasswordInput } from "~/app/(auth)/_components/auth-password-input";
import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import { useChangePasswordMutation } from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useI18n } from "~/lib/i18n";
import { changePasswordValidator } from "~/lib/validators";
import { FormItem, FormLabel } from "../_components/dashboard-form";

export default function ChangePasswordPage() {
  const { values } = useI18n();
  const errors = useErrors();

  const form = useForm({
    schema: changePasswordValidator,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useChangePasswordMutation({
    onSuccess: () => {
      toast.success(values["dashboard.change-password.toast.success"]);
      form.reset();
    },
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
  });

  return (
    <div className="ml-4 w-2/3 min-w-96 md:ml-12 lg:ml-28">
      <Card className="space-y-5 rounded-[32px] px-12 py-8">
        <h1 className="text-2xl font-normal">
          {values["dashboard.change-password.title"]}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal">
                    {
                      values[
                        "dashboard.change-password.form.current-password.label"
                      ]
                    }
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={
                        values[
                          "dashboard.change-password.form.current-password.placeholder"
                        ]
                      }
                      required
                      className="border-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal">
                    {
                      values[
                        "dashboard.change-password.form.new-password.label"
                      ]
                    }
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={
                        values[
                          "dashboard.change-password.form.new-password.placeholder"
                        ]
                      }
                      required
                      className="border-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal">
                    {
                      values[
                        "dashboard.change-password.form.confirm-password.label"
                      ]
                    }
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={
                        values[
                          "dashboard.change-password.form.confirm-password.placeholder"
                        ]
                      }
                      required
                      className="border-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-[#3678B1]">
              {values["dashboard.change-password.information-label"]}
            </p>
            <div className="pt-12">
              <Button type="submit" disabled={isPending}>
                {
                  values[
                    isPending
                      ? "loading"
                      : "dashboard.change-password.primary-button"
                  ]
                }
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
