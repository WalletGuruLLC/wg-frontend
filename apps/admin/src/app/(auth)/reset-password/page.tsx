"use client";

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
import { useI18n } from "~/lib/i18n";
import { resetPasswordValidator } from "~/lib/validators";
import AuthCard from "../_components/auth-card";

export default function ResetPasswordPage() {
  const { values } = useI18n();

  const form = useForm({
    schema: resetPasswordValidator,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <AuthCard
          title={values["auth.reset-password.title"]}
          content={
            <div className="space-y-6 text-white">
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
                    <FormMessage>{/* TODO */}</FormMessage>
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
                    <FormMessage>
                      {
                        values[
                          "auth.reset-password.new-password.errors.invalid"
                        ]
                      }
                    </FormMessage>
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
                    <FormMessage>
                      {
                        values[
                          "auth.reset-password.confirm-password.errors.passwords-not-match"
                        ]
                      }
                    </FormMessage>
                  </FormItem>
                )}
              />
              <p className="text-base text-[#3678B1]">
                {values["auth.reset-password.information-label"]}
              </p>
            </div>
          }
          primaryButton={
            <Button type="submit" className="w-full">
              {values["auth.reset-password.primary-button"]}
            </Button>
          }
        />
      </form>
    </Form>
  );
}
