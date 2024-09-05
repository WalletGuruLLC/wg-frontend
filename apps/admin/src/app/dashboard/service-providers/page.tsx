"use client";

import type { ReactNode } from "react";
import type { z } from "zod";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
//import { useAddOrEditProviderMutation, useGetAuthedUserAccessLevelsQuery, useGetCountryCodesQuery, useGetProvidersQuery } from "~/lib/data-access";
//import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { PlusCircle, Search } from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { DialogFooter } from "@wg-frontend/ui/dialog";
import { Form, useForm } from "@wg-frontend/ui/form";
import { toast } from "@wg-frontend/ui/toast";

import type { paginationAndSearchValidator } from "~/lib/validators";
import { Button } from "~/components/button";
import Title from "~/components/title";
//import { addOrEditProviderValidator, type paginationAndSearchValidator } from "~/lib/validators";
import {
  useAddOrEditProviderMutation,
  useGetAuthedUserAccessLevelsQuery,
  useGetProvidersQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { addOrEditProviderValidator } from "~/lib/validators";
import Dialog from "../_components/dashboard-dialog";
import { Input } from "../_components/dashboard-input";
//import Table from "../_components/dashboard-table";
import {
  //ColumnHeader,
  PaginationFooter,
} from "../_components/dashboard-table";

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

  //const  dataTable: data.providers ?? [];

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
  const lastRowIdx = firstRowIdx + 1 - 1;

  if (loading || isLoadingAccessLevels) return null;
  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <Title
        title={values["dashboard.service-provider.title"]}
        isLoading={isLoading}
      />
      <div className="flex flex-row items-center space-x-6">
        <div className="relative flex-1">
          <Input
            placeholder={values["dashboard.users.search.placeholder"]}
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
                  {values["dashboard.users.add-button"]}
                </p>
                <PlusCircle strokeWidth={0.75} className="size-6" />
              </Button>
            }
          />
        )}
      </div>
      <div className="flex-1 overflow-auto"></div>
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

function AddOrEditDialog(props: {
  provider?: {
    id: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    einNumber: string;
    country: string;
    city: string;
    zipCode: string;
    companyAddress: string;
    walletAddress: string;
    logo: string;
    contactinformation: string;
    active: boolean;
  };
  trigger: ReactNode;
}) {
  const { values } = useI18n();
  const [isOpen, _, close, toggle] = useBooleanHandlers();

  const form = useForm({
    schema: addOrEditProviderValidator,
    defaultValues: {
      providerId: props.provider?.id ?? "",
      name: props.provider?.name ?? "",
      description: props.provider?.description ?? "",
      email: props.provider?.email ?? "",
      phone: props.provider?.phone ?? "",
      einNumber: props.provider?.einNumber ?? "",
      country: props.provider?.country ?? "",
      city: props.provider?.city ?? "",
      zipCode: props.provider?.zipCode ?? "",
      companyAddress: props.provider?.companyAddress ?? "",
      walletAddress: props.provider?.walletAddress ?? "",
      logo: props.provider?.logo ?? "",
      contactinformation: props.provider?.contactinformation ?? "",
    },
  });
  const { mutate, isPending } = useAddOrEditProviderMutation({
    onError: () => {
      //onError: (error) => {
      toast.error("Error");
      //toast.error(values[`errors.${error.message}` as I18nKey]);
    },
    onSuccess: () => {
      toast.success("Success");
      //toast.success(values[`${valuesPrefix}.toast.success` as const]);
      close();
      form.reset();
    },
  });
  /* 
   TODO selects 
   const { data: dataRoles } = useGetActiveRolesQuery({
    providerId: "EMPTY",
  });
   */
  // const { data: dataCountryCodes } = useGetCountryCodesQuery(undefined);

  const valuesPrefix =
    `dashboard.users.${props.provider ? "edit" : "add"}-dialog` as const;

  useEffect(() => {
    if (props.provider) {
      form.reset({
        providerId: props.provider.id,
        name: props.provider.name,
        description: props.provider.description,
        email: props.provider.email,
        phone: props.provider.phone,
        einNumber: props.provider.einNumber,
        country: props.provider.country,
        city: props.provider.city,
        zipCode: props.provider.zipCode,
        companyAddress: props.provider.companyAddress,
        walletAddress: props.provider.walletAddress,
        logo: props.provider.logo,
        contactinformation: props.provider.contactinformation,
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
