"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import {
  useAuthedUserInfoQuery,
  useTwoFactorAuthenticationMutation,
} from "~/lib/data-access";
import { useI18n } from "~/lib/i18n";
import { twoFactorAuthenticationValidator } from "~/lib/validators";
import AuthCard from "../../_components/auth-card";

export default function TwoFactorAuthenticationPage() {
  const { data, isLoading } = useAuthedUserInfoQuery();
  const router = useRouter();
  const [countDown, setCountDown] = useState(60 * 5); // 5 minutes

  const { values } = useI18n();

  const form = useForm({
    schema: twoFactorAuthenticationValidator,
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const { mutate, isPending, error } = useTwoFactorAuthenticationMutation({
    onSuccess: (data) => {
      localStorage.removeItem("email");
      localStorage.setItem("access-token", data.token);
      router.replace("/dashboard");
    },
  });

  if (!isLoading && data?.First) router.replace("/reset-password");
  // if (!isLoading && data !== undefined && !data.First) router.replace("/");

  useEffect(() => {
    if (localStorage.getItem("email") === null) return router.replace("/login");
    form.setValue("email", localStorage.getItem("email") ?? "");
  }, [form, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutesRemaining = Math.floor(countDown / 60);
  const secondsRemaining = countDown % 60;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <AuthCard
          title={values["auth.2fa.title"]}
          subtitle={values["auth.2fa.subtitle"]}
          content={
            <div className="space-y-6 text-white">
              {error !== null && (
                <p className="text-lg text-[#E21D1D]">
                  {values[("errors." + error.message) as keyof typeof values]}
                </p>
              )}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={values["auth.2fa.code.placeholder"]}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-base text-[#3678B1]">
                {values["auth.2fa.code.valid-for"]}{" "}
                {minutesRemaining.toString().padStart(2, "0")}
                {":"}
                {secondsRemaining.toString().padStart(2, "0")}
              </p>
            </div>
          }
          primaryButton={
            <Button type="submit" disabled={isPending} className="w-full">
              {values[isPending ? "loading" : "auth.2fa.primary-button"]}
            </Button>
          }
          secondaryButton={
            <Link
              href="/login"
              onClick={() => {
                localStorage.removeItem("email");
              }}
            >
              <Button variant="link">
                {values["auth.2fa.secondary-button"]}
              </Button>
            </Link>
          }
        />
      </form>
    </Form>
  );
}
