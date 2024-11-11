"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardTitle } from "@wg-frontend/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  useForm,
} from "@wg-frontend/ui/form";

import { useI18n } from "~/lib/i18n";
import { walletuserDetailValidator } from "~/lib/validators";
import { FormItem, FormLabel } from "../../_components/dashboard-form";
import { Input } from "../../_components/dashboard-input";
import { BreadcrumbTitle } from "../../_components/dashboard-title";

//import { Input } from "../../_components/dashboard-input";

export default function UserDetailsPage() {
  const { values } = useI18n();
  interface User {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    socialSecurityNumber: string;
    identificationType: string;
    identificationNumber: string;
    stateLocation: string;
  }
  const [user, setUser] = useState<User>();
  const form = useForm({
    schema: walletuserDetailValidator,
    defaultValues: {},
  });
  useEffect(() => {
    // Recupera los datos del sessionStorage
    const storedUser = sessionStorage.getItem("walletUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        form.reset({
          id: parsedUser.id,
          name: parsedUser.name || values["wallet-users.otp.description.name"],
          firstName: parsedUser.firstName,
          lastName: parsedUser.lastName,
          email: parsedUser.email,
          phone: parsedUser.phone,
          socialSecurityNumber: parsedUser.socialSecurityNumber,
          identificationType: parsedUser.identificationType,
          identificationNumber: parsedUser.identificationNumber,
          stateLocation: parsedUser.stateLocation,
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [form, values]);

  if (!user) return <div>Loading...</div>;

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
                  name="email"
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
                  name="email"
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
                  name="email"
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
        </CardContent>
      </Card>
    </div>
  );
}
