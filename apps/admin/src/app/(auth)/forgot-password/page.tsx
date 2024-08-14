"use client";

import Link from "next/link";
import { z } from "zod";

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
import AuthCard from "../_components/auth-card";

const validator = z.object({
  code: z.string().min(1, "auth.forgot-password.code.errors.invalid"),
});

export default function ForgotPasswordPage() {
  const { values } = useI18n();

  const form = useForm({
    schema: validator,
    defaultValues: {
      code: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
        })}
      >
        <AuthCard
          title={values["auth.forgot-password.title"]}
          subtitle={values["auth.forgot-password.subtitle"]}
          content={
            <div className="space-y-6 text-white">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder={
                          values["auth.forgot-password.code.placeholder"]
                        }
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {values["auth.forgot-password.code.errors.invalid"]}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          }
          primaryButton={
            <Button type="submit" className="w-full">
              {values["auth.forgot-password.primary-button"]}
            </Button>
          }
          secondaryButton={
            <Link href="/login">
              <Button variant="link">
                {values["auth.forgot-password.secondary-button"]}
              </Button>
            </Link>
          }
        />
      </form>
    </Form>
  );
}
