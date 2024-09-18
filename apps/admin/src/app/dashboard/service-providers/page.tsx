"use client";

import type { ReactNode } from "react";
import type { z } from "zod";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CircleCheck,
  Eye,
  PencilLine,
  PlusCircle,
  Search,
  TriangleAlert,
  Upload,
} from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { cn } from "@wg-frontend/ui";
import { Card } from "@wg-frontend/ui/card";
import { DialogFooter } from "@wg-frontend/ui/dialog";
import { Form, FormControl, FormField, useForm } from "@wg-frontend/ui/form";
import { Label } from "@wg-frontend/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@wg-frontend/ui/select";
import { toast } from "@wg-frontend/ui/toast";

import type { paginationAndSearchValidator } from "~/lib/validators";
import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import { SelectTrigger } from "~/components/select";
import {
  useAddOrEditProviderMutation,
  useGetAuthedUserAccessLevelsQuery,
  useGetCountriesQuery,
  useGetProvidersQuery,
  useGetStatesQuery,
  useToggleProviderStatusMutation,
  useUploadProviderImageMutation,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { addOrEditServiceProviderValidator } from "~/lib/validators";
import ConfirmDialog from "../_components/dashboard-confirm-dialog";
import Dialog from "../_components/dashboard-dialog";
import { FormItem, FormLabel } from "../_components/dashboard-form";
import { Input } from "../_components/dashboard-input";
import { Switch } from "../_components/dashboard-switch";
import { PaginationFooter } from "../_components/dashboard-table";
import { SimpleTitle } from "../_components/dashboard-title";

export default function ServiceProvidersPage() {
  const loading = useAccessLevelGuard("serviceProviders");
  const { values } = useI18n();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paginationAndSearch: z.infer<typeof paginationAndSearchValidator> = {
    page: searchParams.get("page") ?? "1",
    items: searchParams.get("items") ?? "10",
    search: searchParams.get("search") ?? "",
  };

  const { data, isLoading } = useGetProvidersQuery({
    ...paginationAndSearch,
    type: "PLATFORM",
  });

  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);

  function handlePaginationAndSearchChange(
    newPaginationAndSearch: Partial<
      z.infer<typeof paginationAndSearchValidator>
    >,
  ) {
    const params = new URLSearchParams(searchParams);
    for (const key in newPaginationAndSearch) {
      const val =
        newPaginationAndSearch[key as keyof typeof newPaginationAndSearch];
      if (val) {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    }
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  const firstRowIdx =
    Number(paginationAndSearch.items) * Number(paginationAndSearch.page) -
    Number(paginationAndSearch.items) +
    1;
  const lastRowIdx = firstRowIdx + (data?.providers.length ?? -1) - 1;

  if (loading || isLoadingAccessLevels) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <SimpleTitle
        title={values["service-providers.title"]}
        showLoadingIndicator={isLoading}
      />
      <div className="flex flex-row items-center space-x-6">
        <div className="relative flex-1">
          <Input
            placeholder={values["service-providers.search.placeholder"]}
            className="rounded-full border border-black"
            onChange={(e) =>
              handlePaginationAndSearchChange({
                ...paginationAndSearch,
                search: e.target.value,
                page: "1",
              })
            }
            value={paginationAndSearch.search}
          />
          <Search
            className="absolute right-4 top-1/2 size-6 -translate-y-1/2 transform"
            strokeWidth={0.75}
          />
        </div>
        {accessLevelsData?.users.includes("add") && (
          <AddOrEditDialog
            trigger={
              <Button className="flex h-max flex-row items-center space-x-2">
                <p className="flex-1 text-lg font-light">
                  {values["service-providers.add-button"]}
                </p>
                <PlusCircle strokeWidth={0.75} className="size-6" />
              </Button>
            }
          />
        )}
      </div>
      <div className="flex-1 overflow-auto">
        <div className="m-2 grid grid-cols-2 gap-10 sm:grid-cols-3">
          {data?.providers.map((provider) => (
            <Card
              key={provider.id}
              className="flex flex-col justify-between overflow-hidden pb-3 pl-2 pr-2 pt-3"
            >
              <Image
                src={provider.imageUrl}
                className="h-[200px] w-full object-contain"
                alt={`${provider.name} logo`}
                width={100}
                height={100}
                priority
              />
              <div>
                <h6 className="text-xs">
                  {values["service-providers.card.label"]}
                </h6>
                <span className="text-lg">{provider.name}</span>
                <div className="flex justify-start gap-3">
                  <AddOrEditDialog
                    trigger={
                      <PencilLine
                        strokeWidth={0.75}
                        className="size-6 cursor-pointer"
                      />
                    }
                    provider={{
                      id: provider.id,
                      companyName: provider.name,
                      ein: provider.eINNumber,
                      country: provider.country,
                      city: provider.city,
                      zipCode: provider.zipCode,
                      companyAddress: provider.companyAddress,
                      walletAddress: provider.walletAddress,
                    }}
                  />
                  <Link href={`/dashboard/service-providers/${provider.id}`}>
                    <Eye strokeWidth={0.75} className="size-6" />
                  </Link>
                  <SwitchActiveStatusDialog
                    provider={{
                      id: provider.id,
                      isActive: provider.active,
                    }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <PaginationFooter
          count={{
            total: data?.total ?? 0,
            firstRowIdx,
            lastRowIdx,
          }}
          items={paginationAndSearch.items ?? "10"}
          onItemsChange={(items) =>
            handlePaginationAndSearchChange({
              ...paginationAndSearch,
              items,
              page: "1",
            })
          }
          canPreviousPage={paginationAndSearch.page !== "1"}
          canNextPage={
            data?.providers.length === Number(paginationAndSearch.items)
          }
          onPreviousPage={() =>
            handlePaginationAndSearchChange({
              ...paginationAndSearch,
              page: String(Number(paginationAndSearch.page) - 1),
            })
          }
          onNextPage={() =>
            handlePaginationAndSearchChange({
              ...paginationAndSearch,
              page: String(Number(paginationAndSearch.page) + 1),
            })
          }
        />
      </div>
    </div>
  );
}

const WALLET_ADDRESS_BASE_URL = "www.walletguru.me/";
function AddOrEditDialog(props: {
  provider?: {
    id: string;
    companyName: string;
    ein: string;
    country: string;
    city: string;
    zipCode: string;
    companyAddress: string;
    walletAddress: string;
  };
  trigger: ReactNode;
}) {
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, close, toggle] = useBooleanHandlers();
  const [file, setFile] = useState<File | undefined>(undefined);
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
    },
  });

  const { data: countries } = useGetCountriesQuery(undefined);
  const { data: states } = useGetStatesQuery(
    {
      country: form.watch("country"),
    },
    {
      enabled: !!form.watch("country"),
    },
  );

  const { mutate, isPending } = useAddOrEditProviderMutation({
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: (data) => {
      if (file)
        void uploadImage({
          file,
          id: data.id,
        });
      toast.success(values[`${valuesPrefix}.toast.success`]);
      close();
      form.reset();
    },
  });

  const { mutate: uploadImage } = useUploadProviderImageMutation({
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      toast.success(values[`${valuesPrefix}.toast.success`]);
    },
    onMutate: (data) => {
      console.log("uploiading", data.file);
    },
  });

  const valuesPrefix =
    `service-providers.${props.provider ? "edit" : "add"}-dialog` as const;

  useEffect(() => {
    if (props.provider) {
      form.reset({
        providerId: props.provider.id,
        name: props.provider.companyName,
        einNumber: props.provider.ein,
        country: props.provider.country,
        city: props.provider.city,
        zipCode: props.provider.zipCode,
        companyAddress: props.provider.companyAddress,
        walletAddress: props.provider.walletAddress,
      });
    }
  }, [props.provider, form]);

  return (
    <Dialog
      key={props.provider?.id ?? "add"}
      isOpen={isOpen}
      toggleOpen={() => {
        form.reset();
        toggle();
      }}
      trigger={props.trigger}
      ariaDescribedBy="add-or-edit-dialog"
      contentClassName="max-w-2xl"
    >
      <div className="space-y-9">
        <h1 className="text-3xl font-light">
          {values[`${valuesPrefix}.title`]}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-9"
          >
            <div className="flex w-full flex-row space-x-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {values[`${valuesPrefix}.company-name.label`]}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          values[`${valuesPrefix}.company-name.placeholder`]
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
                name="einNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{values[`${valuesPrefix}.ein.label`]}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={values[`${valuesPrefix}.ein.placeholder`]}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-row space-x-3">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {values[`${valuesPrefix}.country.label`]}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "rounded-none border-transparent border-b-black",
                            !field.value && "text-[#A1A1A1]",
                          )}
                        >
                          <SelectValue
                            placeholder={
                              values[`${valuesPrefix}.country.placeholder`]
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries?.map((country) => (
                          <SelectItem key={country.iso2} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {values[`${valuesPrefix}.city.label`]}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            "rounded-none border-transparent border-b-black",
                            !field.value && "text-[#A1A1A1]",
                          )}
                        >
                          <SelectValue
                            placeholder={
                              values[`${valuesPrefix}.city.placeholder`]
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states?.map((state) => (
                          <SelectItem
                            key={state.country.iso3 + state.code}
                            value={state.name}
                          >
                            {state.name}
                          </SelectItem>
                        ))}
                        {(!states || states.length === 0) && (
                          <SelectItem value="None">None</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-row space-x-3">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {values[`${valuesPrefix}.zip-code.label`]}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          values[`${valuesPrefix}.zip-code.placeholder`]
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
                name="companyAddress"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {values[`${valuesPrefix}.company-address.label`]}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          values[`${valuesPrefix}.company-address.placeholder`]
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
            <div className="flex w-full flex-row space-x-3">
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>
                      {values[`${valuesPrefix}.wallet-address.label`]}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          values[`${valuesPrefix}.wallet-address.placeholder`]
                        }
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-1/2 self-center">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                  {WALLET_ADDRESS_BASE_URL}
                  {form.watch("walletAddress")}
                </p>
              </div>
            </div>
            <div className="w-full">
              <Label className="text-xs font-light">
                {values[`${valuesPrefix}.company-logo.label`]}
              </Label>
              <div>
                <Label
                  htmlFor="company-logo"
                  className="flex h-24 w-full items-center justify-center rounded-xl border border-black"
                >
                  <div className="flex flex-row justify-center space-x-4">
                    <p
                      className={cn(
                        "self-center text-sm font-light text-[#A1A1A1]",
                        file && "text-black",
                      )}
                    >
                      {file?.name ??
                        values[`${valuesPrefix}.company-logo.placeholder`]}
                    </p>
                    <Upload strokeWidth={0.75} className="size-6 self-center" />
                    <Button
                      variant="secondary"
                      type="button"
                      className="pointer-events-none font-light text-[#A1A1A1]"
                    >
                      {values[`${valuesPrefix}.company-logo.button`]}
                    </Button>
                  </div>
                </Label>
                <Input
                  type="file"
                  id="company-logo"
                  name="company-logo"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    setFile(e.target.files?.[0]);
                  }}
                  className="hidden"
                />
              </div>
            </div>
            <DialogFooter className="pt-9">
              <Button className="w-full" type="submit" disabled={isPending}>
                {
                  values[
                    isPending
                      ? "loading"
                      : (`${valuesPrefix}.primary-button` as const)
                  ]
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </Dialog>
  );
}

function SwitchActiveStatusDialog(props: {
  provider: {
    id: string;
    isActive: boolean;
  };
}) {
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, close, toggle] = useBooleanHandlers();

  const { mutate, isPending } = useToggleProviderStatusMutation({
    onSuccess: () => {
      toast.success(values[`${valuesPrexif}.toast.success` as const]);
      close();
    },
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
  });

  const valuesPrexif =
    `service-providers.${props.provider.isActive ? "inactive-dialog" : "activate-dialog"}` as const;

  return (
    <ConfirmDialog
      key={props.provider.id}
      isOpen={isOpen}
      toggleOpen={toggle}
      trigger={<Switch checked={props.provider.isActive} />}
      actions={[
        <Button
          className="w-full"
          key="yes"
          onClick={() =>
            mutate({
              providerId: props.provider.id,
              active: !props.provider.isActive,
            })
          }
          disabled={isPending}
        >
          {
            values[
              isPending
                ? "loading"
                : (`${valuesPrexif}.primary-button` as const)
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
          {values[`${valuesPrexif}.secondary-button`]}
        </Button>,
      ]}
      ariaDescribedBy="switch-active-status-dialog"
      Icon={
        props.provider.isActive ? (
          <TriangleAlert
            strokeWidth={0.75}
            className="h-12 w-12"
            color="#3678B1"
          />
        ) : (
          <CircleCheck
            strokeWidth={0.75}
            className="h-12 w-12"
            color="#3678B1"
          />
        )
      }
      title={values[`${valuesPrexif}.title`]}
      description={<span>{values[`${valuesPrexif}.description`]}</span>}
    />
  );
}
