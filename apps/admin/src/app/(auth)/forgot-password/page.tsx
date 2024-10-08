"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
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
import {
  useForgotPasswordCodeStepMutation,
  useForgotPasswordEmailStepMutation,
  useGetAuthedUserInfoQuery,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useI18n } from "~/lib/i18n";
import {
  forgotPasswordCodeStepValidator,
  forgotPasswordEmailStepValidator,
} from "~/lib/validators";
import AuthCard from "../_components/auth-card";
import { Input } from "../_components/auth-input";
import { PasswordInput } from "../_components/auth-password-input";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { data, isLoading } = useGetAuthedUserInfoQuery(undefined);

  const [email, setEmail] = useState<string | null>(null);

  if (!isLoading && data) return router.replace("/dashboard");

  return email === null ? (
    <EmailStep setEmail={setEmail} />
  ) : (
    <CodeStep setEmail={setEmail} email={email} />
  );
}

interface Props {
  setEmail: Dispatch<SetStateAction<string | null>>;
}

function EmailStep({ setEmail }: Props) {
  const { values } = useI18n();
  const errors = useErrors();

  const form = useForm({
    schema: forgotPasswordEmailStepValidator,
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending, error } = useForgotPasswordEmailStepMutation({
    onSuccess: () => {
      setEmail(form.getValues().email);
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <AuthCard
          title={values["auth.forgot-password.email-step.title"]}
          subtitle={values["auth.forgot-password.email-step.subtitle"]}
          secondaryButton={
            <Link href="/login">
              <Button variant="link">
                {values["auth.forgot-password.email-step.secondary-button"]}
              </Button>
            </Link>
          }
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
                        placeholder={
                          values[
                            "auth.forgot-password.email-step.email.placeholder"
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
            </div>
          }
          primaryButton={
            <Button type="submit" disabled={isPending} className="w-full">
              {
                values[
                  isPending
                    ? "loading"
                    : "auth.forgot-password.email-step.primary-button"
                ]
              }
            </Button>
          }
        />
      </form>
    </Form>
  );
}

function CodeStep({
  setEmail,
  email,
}: Props & {
  email: string;
}) {
  const { values } = useI18n();
  const router = useRouter();

  const form = useForm({
    schema: forgotPasswordCodeStepValidator,
    defaultValues: {
      email,
      confirmationCode: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending, error } = useForgotPasswordCodeStepMutation({
    onSuccess: () => {
      setEmail(null);
      localStorage.removeItem("access-token");
      void router.replace("/login");
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <AuthCard
          title={values["auth.forgot-password.code-step.title"]}
          content={
            <div className="space-y-6 text-white">
              {error !== null && (
                <p className="text-lg text-[#E21D1D]">
                  {values[("errors." + error.message) as keyof typeof values]}
                </p>
              )}
              <FormField
                control={form.control}
                name="confirmationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={
                          values[
                            "auth.forgot-password.code-step.code.placeholder"
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
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder={
                          values[
                            "auth.forgot-password.code-step.new-password.placeholder"
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder={
                          values[
                            "auth.forgot-password.code-step.confirm-password.placeholder"
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
                {values["auth.forgot-password.code-step.information-label"]}
              </p>
            </div>
          }
          primaryButton={
            <Button type="submit" disabled={isPending} className="w-full">
              {
                values[
                  isPending
                    ? "loading"
                    : "auth.forgot-password.code-step.primary-button"
                ]
              }
            </Button>
          }
          secondaryButton={
            <Button variant="link" onClick={() => setEmail(null)}>
              {values["auth.forgot-password.code-step.secondary-button"]}
            </Button>
          }
        />
      </form>
    </Form>
  );
}
