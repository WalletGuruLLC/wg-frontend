"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { z } from "zod";

import { Checkbox } from "@wg-frontend/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useForm,
} from "@wg-frontend/ui/form";

import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import { Input } from "~/components/input";
import { PasswordInput } from "~/components/password-input";
import { useI18n } from "~/lib/i18n";
import AuthCard from "../_components/auth-card";

const validator = z.object({
  email: z.string().email("auth.login.email.errors.invalid"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
      "auth.login.password.errors.invalid",
    ),
  rememberMe: z.boolean().default(false).optional(),
});

export default function LoginPage() {
  const { values } = useI18n();

  const form = useForm({
    schema: validator,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
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
          title={values["auth.login.title"]}
          content={
            <div className="space-y-6 text-white">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={values["auth.login.email.placeholder"]}
                        required
                        icon={<User strokeWidth={0.75} className="h-4 w-4" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {values["auth.login.email.errors.invalid"]}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder={values["auth.login.password.placeholder"]}
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
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-1 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="rounded-md border-white hover:border-[#3678B1] data-[state=checked]:bg-[#3678B1] data-[state=checked]:text-white"
                      />
                    </FormControl>
                    <FormLabel className="text-[#3678B1]">
                      {values["auth.login.remember-me"]}
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          }
          primaryButton={
            <Button type="submit" className="w-full">
              {values["auth.login.title"]}
            </Button>
          }
          secondaryButton={
            <Link href="/forgot-password">
              <Button variant="link">
                {values["auth.login.forgot-password"]}
              </Button>
            </Link>
          }
        />
      </form>
    </Form>
  );
}
