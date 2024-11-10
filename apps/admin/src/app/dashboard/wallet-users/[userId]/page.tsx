"use client";

import { Card, CardContent, CardTitle } from "@wg-frontend/ui/card";

import { useI18n } from "~/lib/i18n";
import { BreadcrumbTitle } from "../../_components/dashboard-title";

//import { Input } from "../../_components/dashboard-input";

export default function userDetailsPage() {
  const { values } = useI18n(); /*
  const form = useForm({
    schema: addOrEditServiceProviderValidator,
    defaultValues: {
      providerId: props.provider?.id ?? "",
      name: props.provider?.companyName ?? "",
      einNumber: props.provider?.ein ?? "",
      country: props.provider?.country ?? "",
      city: props.provider?.city ?? "",
      zipCode: props.provider?.zipCode ?? "",
      companyAddress: props.provider?.companyAddress ?? "",
      walletAddress: props.provider?.walletAddress ?? "",
      asset: props.provider?.asset ?? "",
    },
  });*/
  return (
    <div>
      <BreadcrumbTitle
        sections={[
          {
            title: "←",
            href: "/dashboard/wallet-users",
            isLoading: false,
          },
        ]}
      />
      <Card className="px-8 py-4">
        <CardTitle className="text-2xl font-normal text-[#3A3A3A]">
          {values["wallet-user.detail.title"]}
        </CardTitle>
        <CardContent>
          {/*
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-9"
          >
          <div className="flex w-full flex-row space-x-3">

            <Input {'Jesica'}/>
          </div>
          */}
        </CardContent>
      </Card>
    </div>
  );
}
