"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

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
import { useGetAuthedUserInfoQuery, useLoginMutation } from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useI18n } from "~/lib/i18n";
import { loginValidator } from "~/lib/validators";
import AuthCard from "../_components/auth-card";
import { Input } from "../_components/auth-input";
import { PasswordInput } from "../_components/auth-password-input";

export default function LoginPage() {
  const router = useRouter();
  const { values } = useI18n();
  const errors = useErrors();

  const { data, isLoading } = useGetAuthedUserInfoQuery(undefined);

  const form = useForm({
    schema: loginValidator,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutate, error, isPending } = useLoginMutation({
    onSuccess: () => {
      localStorage.setItem("email", form.getValues().email);
      router.push("/login/2fa");
    },
  });

  if (!isLoading && data) return router.replace("/dashboard");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <AuthCard
          title={values["auth.login.title"]}
          content={
            <div className="space-y-6 text-white">
              {error !== null && (
                <p className="text-lg text-[#E21D1D]">
                  {errors[error.message]}
                </p>
              )}
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
                    <FormMessage />
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
                  </FormItem>
                )}
              />
            </div>
          }
          primaryButton={
            <Button type="submit" className="w-full" disabled={isPending}>
              {values[isPending ? "loading" : "auth.login.title"]}
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
