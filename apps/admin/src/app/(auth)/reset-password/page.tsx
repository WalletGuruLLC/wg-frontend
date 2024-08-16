"use client";

import { redirect } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  useForm,
} from "@wg-frontend/ui/form";

import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import { PasswordInput } from "~/components/password-input";
import {
  useAuthedUserInfoQuery,
  useResetPasswordMutation,
} from "~/lib/data-access";
import { useI18n } from "~/lib/i18n";
import { resetPasswordValidator } from "~/lib/validators";
import AuthCard from "../_components/auth-card";

export default function ResetPasswordPage() {
  const { data, isLoading } = useAuthedUserInfoQuery();

  const { values } = useI18n();

  const form = useForm({
    schema: resetPasswordValidator,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending, error } = useResetPasswordMutation({
    onSuccess: () => {
      console.log("Password reset successfully");
    },
  });

  if (!isLoading && !data?.First) redirect("/");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <AuthCard
          title={values["auth.reset-password.title"]}
          content={
            <div className="space-y-6 text-white">
              {error !== null && (
                <p className="text-lg text-[#E21D1D]">
                  {values[("errors." + error.message) as keyof typeof values]}
                </p>
              )}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder={
                          values[
                            "auth.reset-password.current-password.placeholder"
                          ]
                        }
                        required
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder={
                          values["auth.reset-password.new-password.placeholder"]
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder={
                          values[
                            "auth.reset-password.confirm-password.placeholder"
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
              <p className="text-base text-[#3678B1]">
                {values["auth.reset-password.information-label"]}
              </p>
            </div>
          }
          primaryButton={
            <Button type="submit" disabled={isPending} className="w-full">
              {
                values[
                  isPending ? "loading" : "auth.reset-password.primary-button"
                ]
              }
            </Button>
          }
        />
      </form>
    </Form>
  );
}
