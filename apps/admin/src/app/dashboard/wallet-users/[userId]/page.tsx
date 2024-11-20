"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRightLeft,
  Asterisk,
  Ban,
  LockKeyhole,
  LockKeyholeOpen,
} from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { Card, CardContent, CardTitle } from "@wg-frontend/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  useForm,
} from "@wg-frontend/ui/form";
import { toast } from "@wg-frontend/ui/toast";

import { Button } from "~/components/button";
import {
  useGetSettingQuery,
  useGetWalletUserQuery,
  useResetPasswordIdMutation,
  useToogleWalletLockMutation,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useI18n } from "~/lib/i18n";
import { walletuserDetailValidator } from "~/lib/validators";
import ConfirmDialog from "../../_components/dashboard-confirm-dialog";
import { FormItem, FormLabel } from "../../_components/dashboard-form";
import { Input } from "../../_components/dashboard-input";
import { BreadcrumbTitle } from "../../_components/dashboard-title";

export default function UserDetailsPage() {
  const settingKey = "url-wallet";
  const { data: rootWallet } = useGetSettingQuery({
    key: settingKey,
  });
  const { values } = useI18n();
  const { userId } = useParams<{ userId: string }>();
  const { data: dataUser, isLoading } = useGetWalletUserQuery(userId);
  const walletId = dataUser?.wallet?.id ?? "";
  const isWalletActive = dataUser?.wallet?.active ?? true;
  const walletAddress = dataUser?.wallet?.walletAddress
    .replace(rootWallet?.value ?? "", "")
    .replace(/^\/+/, "");
  const form = useForm({
    schema: walletuserDetailValidator,
  });

  useEffect(() => {
    if (dataUser) {
      form.reset(dataUser);
    }
  }, [dataUser, form]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="-mt-2">
      <BreadcrumbTitle
        sections={[
          {
            title: "←",
            href: "/dashboard/wallet-users",
            isLoading: false,
          },
        ]}
      />
      <Card className="max-h-screen px-8 py-4">
        <CardTitle className="text-2xl font-normal text-[#3A3A3A]">
          {values["wallet-user.detail.title"]}
        </CardTitle>
        <CardContent>
          <Form {...form}>
            <form className="space-y-1">
              <div className="flex w-full flex-row">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full pr-8">
                      <FormLabel className="mb-0">
                        {values[`wallet-users.details.label.name`]}
                      </FormLabel>
                      <FormControl className="-mt-5">
                        <Input className="mt-0" disabled required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full pl-8">
                      <FormLabel>
                        {values[`wallet-users.details.label.lastName`]}
                      </FormLabel>
                      <FormControl>
                        <Input disabled required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-row space-x-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full pr-8">
                      <FormLabel>
                        {values[`wallet-users.details.label.phone`]}
                      </FormLabel>
                      <FormControl>
                        <Input disabled required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialSecurityNumber"
                  render={({ field }) => (
                    <FormItem className="w-full pl-8">
                      <FormLabel>
                        {
                          values[
                            `wallet-users.details.label.socialSecurityNumber`
                          ]
                        }
                      </FormLabel>
                      <FormControl>
                        <Input disabled required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-row space-x-2">
                <FormField
                  control={form.control}
                  name="identificationType"
                  render={({ field }) => (
                    <FormItem className="w-full pr-8">
                      <FormLabel>
                        {values[`wallet-users.details.label.idType`]}
                      </FormLabel>
                      <FormControl>
                        <Input disabled required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="identificationNumber"
                  render={({ field }) => (
                    <FormItem className="w-full pl-8">
                      <FormLabel>
                        {values[`wallet-users.details.label.idNumber`]}
                      </FormLabel>
                      <FormControl>
                        <Input disabled required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-row space-x-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full pr-8">
                      <FormLabel>
                        {values[`wallet-users.details.label.country`]}
                      </FormLabel>
                      <FormControl>
                        <Input disabled required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stateLocation"
                  render={({ field }) => (
                    <FormItem className="w-full pl-8">
                      <FormLabel>
                        {values[`wallet-users.details.label.state`]}
                      </FormLabel>
                      <FormControl>
                        <Input disabled required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-row space-x-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full pr-8">
                      <FormLabel>
                        {values[`wallet-users.details.label.city`]}
                      </FormLabel>
                      <FormControl>
                        <Input disabled required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="w-full pl-8">
                      <FormLabel>
                        {values[`wallet-users.details.label.zipcode`]}
                      </FormLabel>
                      <FormControl>
                        <Input disabled required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
          <div className="mt-8 flex w-full justify-center space-x-4">
            <div>
              <ResetDialog
                id={userId}
                trigger={
                  <Button type="submit">
                    <p className="flex-1 text-base font-light">
                      {values[`wallet-users.details.button.reset`]}
                    </p>

                    <Asterisk strokeWidth={0.75} className="size-6" />
                  </Button>
                }
              />
            </div>
            <div>
              <LockDialog id={walletId} lock={isWalletActive} />
            </div>
            <div>
              <Link
                key={"transactions"}
                href={`/dashboard/reports/transactions-by-user?walletAddress=${walletAddress}`}
              >
                <Button type="submit">
                  <p className="flex-1 text-base font-light">
                    {values[`wallet-users.details.button.transactions`]}
                  </p>

                  <ArrowRightLeft
                    strokeWidth={0.75}
                    className="-mt-1 ml-1 size-5"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ResetDialog(props: { id: string; trigger: ReactNode }) {
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, close, toggle] = useBooleanHandlers();
  const { mutate, isPending } = useResetPasswordIdMutation({
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      close();
      toast.success(values["wallet-users.reset-password.success"]);
    },
  });
  return (
    <ConfirmDialog
      key={"reset"}
      isOpen={isOpen}
      toggleOpen={() => {
        toggle();
      }}
      trigger={props.trigger}
      actions={[
        <Button
          className="w-full"
          key="yes"
          onClick={() => mutate({ userId: props.id })}
          disabled={isPending}
        >
          {values["wallet-users.reset-password.yes"]}
        </Button>,
        <Button
          className="w-full"
          variant="secondary"
          key="no"
          onClick={close}
          disabled={isPending}
        >
          {values["wallet-users.reset-password.no"]}
        </Button>,
      ]}
      ariaDescribedBy="switch-active-status-dialog"
      title={values["wallet-users.reset-password.title"]}
      description={
        <span>{values["wallet-users.reset-password.description"]}</span>
      }
    />
  );
}

function LockDialog(props: { id: string; lock: boolean }) {
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, close, toggle] = useBooleanHandlers();
  const [isLocked, setIsLocked] = useState(props.lock);
  const valuesLock =
    props.id === "" ? "nowallet" : (`${isLocked ? "lock" : "unlock"}` as const);
  const { mutate, isPending } = useToogleWalletLockMutation({
    onSuccess: () => {
      toast.success(
        values[`wallet-users.toast.success.${valuesLock}` as const],
      );
      setIsLocked(!isLocked);
      close();
    },
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
  });

  return (
    <ConfirmDialog
      key={props.id}
      isOpen={isOpen}
      toggleOpen={toggle}
      trigger={
        <Button type="submit" disabled={props.id === "" ? true : false}>
          <p className="flex-1 text-base font-light">
            {values[`wallet-users.details.button.${valuesLock}`]}
          </p>
          {props.id === "" ? (
            <Ban strokeWidth={0.75} className="-mt-1 ml-1 size-5" />
          ) : isLocked ? (
            <LockKeyhole strokeWidth={0.75} className="-mt-1 ml-1 size-5" />
          ) : (
            <LockKeyholeOpen strokeWidth={0.75} className="-mt-1 ml-1 size-5" />
          )}
        </Button>
      }
      actions={[
        <Button
          className="w-full"
          key="yes"
          onClick={() =>
            mutate({
              userId: props.id,
            })
          }
          disabled={isPending}
        >
          {
            values[
              isPending
                ? "loading"
                : (`wallet-users.lock.button-yes.${valuesLock}` as const)
            ]
          }
        </Button>,
        <Button
          className="w-full"
          variant="secondary"
          key="no"
          onClick={close}
          disabled={isPending}
        >
          {values[`wallet-users.lock.button-no.${valuesLock}`]}
        </Button>,
      ]}
      ariaDescribedBy="switch-active-status-dialog"
      Icon={
        isLocked ? (
          <LockKeyhole
            strokeWidth={0.75}
            className="h-10 w-10"
            color="#3678B1"
          />
        ) : (
          <LockKeyholeOpen
            strokeWidth={0.75}
            className="h-10 w-10"
            color="#3678B1"
          />
        )
      }
      title={values[`wallet-users.details.button.${valuesLock}`]}
      description={
        <span>{values[`wallet-users.lock.description.${valuesLock}`]}</span>
      }
    />
  );
}
