"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  useForm,
} from "@wg-frontend/ui/form";
import { toast } from "@wg-frontend/ui/toast";

import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import {
  useResendCodeMutation,
  useTwoFactorAuthenticationMutation,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useI18n } from "~/lib/i18n";
import { twoFactorAuthenticationValidator } from "~/lib/validators";
import AuthCard from "../../_components/auth-card";
import { Input } from "../../_components/auth-input";

const COUNTDOWN_TIME = 60 * 5; // 5 minutes

export default function TwoFactorAuthenticationPage() {
  const router = useRouter();
  const [countDown, setCountDown] = useState(COUNTDOWN_TIME);

  const { values } = useI18n();
  const errors = useErrors();

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
      if (data.user.type === "WALLET") {
        router.replace("/login");
        return toast.error(values["auth.2fa.errors.unauthorized"], {
          style: {
            border: "1px solid #E21D1D",
          },
        });
      }
      localStorage.setItem("access-token", data.token);
      if (data.user.first) return router.replace("/reset-password");
      return router.replace("/dashboard");
    },
  });
  const { mutate: resendCode, isPending: isSending } = useResendCodeMutation({
    onSuccess: () => {
      setCountDown(COUNTDOWN_TIME);
    },
  });

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
                  {errors[error.message]}
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
                {countDown <= 0 ? (
                  "00:00"
                ) : (
                  <>
                    {minutesRemaining.toString().padStart(2, "0")}
                    {":"}
                    {secondsRemaining.toString().padStart(2, "0")}
                  </>
                )}
              </p>
            </div>
          }
          primaryButton={
            <Button type="submit" disabled={isPending} className="w-full">
              {values[isPending ? "loading" : "auth.2fa.primary-button"]}
            </Button>
          }
          secondaryButton={
            <Button
              variant="link"
              disabled={isSending}
              type="button"
              onClick={() => {
                const email = localStorage.getItem("email");
                if (email) resendCode({ email });
              }}
            >
              {values[isSending ? "loading" : "auth.2fa.secondary-button"]}
            </Button>
          }
        />
      </form>
    </Form>
  );
}
