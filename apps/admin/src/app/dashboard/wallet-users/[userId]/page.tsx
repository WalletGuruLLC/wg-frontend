"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowRightLeft, Asterisk, Lock } from "lucide-react";

import { Card, CardContent, CardTitle } from "@wg-frontend/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  useForm,
} from "@wg-frontend/ui/form";

import { Button } from "~/components/button";
import { useGetWalletUserMutation } from "~/lib/data-access";
import { useI18n } from "~/lib/i18n";
import { walletuserDetailValidator } from "~/lib/validators";
import { FormItem, FormLabel } from "../../_components/dashboard-form";
import { Input } from "../../_components/dashboard-input";
import { BreadcrumbTitle } from "../../_components/dashboard-title";

export default function UserDetailsPage() {
  const { values } = useI18n();
  const { userId } = useParams<{ userId: string }>();
  interface User {
    id: string;
    name: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    socialSecurityNumber: string;
    identificationType: string;
    identificationNumber: string;
    stateLocation: string;
    country: string;
    city: string;
    zipCode: string;
  }
  const form = useForm({
    schema: walletuserDetailValidator,
    defaultValues: {},
  });
  const { mutate } = useGetWalletUserMutation({
    onSuccess: (data) => {
      form.reset(data);
    },
  });
  useEffect(() => {
    if (userId) {
      mutate({ id: userId });
    }
  }, [userId, mutate]);
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
              <Button type="submit">
                <p className="flex-1 text-base font-light">
                  {values[`wallet-users.details.button.reset`]}
                </p>

                <Asterisk strokeWidth={0.75} className="size-6" />
              </Button>
            </div>
            <div>
              <Button type="submit">
                <p className="flex-1 text-base font-light">
                  {values[`wallet-users.details.button.lock`]}
                </p>

                <Lock strokeWidth={0.75} className="-mt-1 ml-1 size-5" />
              </Button>
            </div>
            <div>
              <Button type="submit">
                <p className="flex-1 text-base font-light">
                  {values[`wallet-users.details.button.transactions`]}
                </p>

                <ArrowRightLeft
                  strokeWidth={0.75}
                  className="-mt-1 ml-1 size-5"
                />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
