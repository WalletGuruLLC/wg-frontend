"use client";

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
import { Input } from "~/components/input";
import { useI18n } from "~/lib/i18n";
import AuthCard from "../../_components/auth-card";

const validator = z.object({
  code: z.string().min(1, "auth.2fa.code.errors.invalid"),
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
          title={values["auth.2fa.title"]}
          subtitle={values["auth.2fa.subtitle"]}
          content={
            <div className="space-y-6 text-white">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={values["auth.2fa.code.placeholder"]}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {values["auth.2fa.code.errors.invalid"]}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <p className="text-base text-[#3678B1]">
                {values["auth.2fa.code.valid-for"]}
                {" 00:30"}
              </p>
            </div>
          }
          primaryButton={
            <Button type="submit" className="w-full">
              {values["auth.2fa.primary-button"]}
            </Button>
          }
          secondaryButton={
            <Button variant="link">
              {values["auth.2fa.secondary-button"]}
            </Button>
          }
        />
      </form>
    </Form>
  );
}
