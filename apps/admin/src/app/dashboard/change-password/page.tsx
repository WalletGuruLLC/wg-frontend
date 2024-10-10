"use client";

import { Card } from "@wg-frontend/ui/card";
import { Form, FormControl, FormField, useForm } from "@wg-frontend/ui/form";

import { PasswordInput } from "~/app/(auth)/_components/auth-password-input";
import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import { useI18n } from "~/lib/i18n";
import { changePasswordValidator } from "~/lib/validators";
import { FormItem, FormLabel } from "../_components/dashboard-form";

export default function ChangePasswordPage() {
  const { values } = useI18n();

  const form = useForm({
    schema: changePasswordValidator,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
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
            onSubmit={form.handleSubmit((data) => console.log(data))}
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
              <Button type="submit" disabled={false}>
                {
                  // values[
                  //   isPending ? "loading" : "dashboard.change-password.primary-button"
                  // ]
                  values["dashboard.change-password.primary-button"]
                }
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
