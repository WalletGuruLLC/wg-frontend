"use client";

import type { ReactNode } from "react";
import type { z } from "zod";
import { useEffect } from "react";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Calendar, CircleCheck, Loader2, TriangleAlert } from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { cn } from "@wg-frontend/ui";
import { DialogFooter } from "@wg-frontend/ui/dialog";
import { Form, FormControl, FormField, useForm } from "@wg-frontend/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@wg-frontend/ui/select";
import { toast } from "@wg-frontend/ui/toast";

import type { ReportsByUser } from "~/lib/data-access";
import type { paginationAndSearchValidator } from "~/lib/validators";
import ConfirmDialog from "~/app/dashboard/_components/dashboard-confirm-dialog";
import Dialog from "~/app/dashboard/_components/dashboard-dialog";
import {
  FormItem,
  FormLabel,
} from "~/app/dashboard/_components/dashboard-form";
import { Input } from "~/app/dashboard/_components/dashboard-input";
import { Switch } from "~/app/dashboard/_components/dashboard-switch";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "~/app/dashboard/_components/dashboard-table";
import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import { SelectTrigger } from "~/components/select";
import {
  useAddOrEditProviderPaymentParameterMutation,
  useGetAuthedUserAccessLevelsQuery,
  useGetProviderPaymentParametersQuery,
  useGetProviderQuery,
  useGetTimeIntervalsQuery,
  useToggleProviderPaymentParameterStatusMutation,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { addOrEditProviderPaymentParameterValidator } from "~/lib/validators";
import { BreadcrumbTitle } from "../../_components/dashboard-title";

function Actions({
  transactionsByUserParameters,
}: {
  transactionsByUserParameters: {
    id: string;
  };
}) {
  const { value } = useI18n(
    "dashboard.reports.sections.transactions-by-user.header.actions.details",
  );

  return (
    <div className="flex flex-row space-x-4">
      <Link
        href={
          `/dashboard/reports/transactions-by-user/` +
          transactionsByUserParameters.id
        }
      >
        <Button className="font-normal no-underline" variant="link">
          {value}
        </Button>
      </Link>
    </div>
  );
}

const columnHelper = createColumnHelper<ReportsByUser>();
const columns = [
  columnHelper.accessor("type", {
    id: "type",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.type" />
    ),
  }),
  columnHelper.accessor("description", {
    id: "description",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.description" />
    ),
  }),
  columnHelper.accessor("startdate", {
    id: "startdate",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.start" />
    ),
  }),
  columnHelper.accessor("enddate", {
    id: "enddate",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.finish" />
    ),
  }),
  columnHelper.accessor("state", {
    id: "state",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.state" />
    ),
  }),
  columnHelper.accessor("ammount", {
    id: "ammount",
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.ammount" />
    ),
    cell: (info) => (
      <span className={info.getValue() < 0 ? "text-red-600" : "text-black"}>
        {info.getValue() + " " + info.row.original.currency}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => (
      <ColumnHeader i18nKey="dashboard.reports.sections.transactions-by-user.header.actions" />
    ),
    cell: (info) => (
      <Actions
        transactionsByUserParameters={{
          id: info.row.original.id,
        }}
      />
    ),
  }),
];

export default function ServiceProviderPaymentParametersPage() {
  const { providerId } = useParams<{ providerId: string }>();
  const loading = useAccessLevelGuard({
    general: {
      module: "reports",
    },
  });
  const { values } = useI18n();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const paginationAndSearch: z.infer<typeof paginationAndSearchValidator> = {
    page: searchParams.get("page") ?? "1",
    items: searchParams.get("items") ?? "10",
    search: searchParams.get("search") ?? "",
  };

  const { data, isLoading } = useGetProviderPaymentParametersQuery({
    ...paginationAndSearch,
    serviceProviderId: providerId,
  });
  const { data: providerData, isLoading: isLoadingProviderData } =
    useGetProviderQuery({ providerId });
  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);

  const reportData: ReportsByUser[] = [
    {
      id: "hola",
      type: "HOLA",
      description: "PRUEBA",
      startdate: "1",
      enddate: "2",
      state: "Active",
      ammount: -50,
      currency: "USD",
    },
    {
      id: "hola2",
      type: "HOLA2",
      description: "PRUEBA2",
      startdate: "12",
      enddate: "22",
      state: "Active",
      ammount: 100,
      currency: "EUR",
    },
  ];

  const total = reportData.reduce(
    (acumulador, report) => acumulador + report.ammount,
    0,
  );

  const table = useReactTable({
    data: reportData,
    columns: columns.filter(
      (c) =>
        c.id !== "actions" ||
        accessLevelsData?.general.reports.includes("edit"),
    ),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

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
  const lastRowIdx = firstRowIdx + table.getRowModel().rows.length - 1;

  if (loading || isLoadingAccessLevels) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <BreadcrumbTitle
        sections={[
          {
            title: values["dashboard.layout.nav.reports"],
            href: "/dashboard/reports",
            isLoading: false,
          },
          {
            title: values["dashboard.reports.sections.transactions-by-user"],
            href: `/dashboard/reports/created-by-user}`,
            isLoading: isLoadingProviderData,
          },
        ]}
        showLoadingIndicator={isLoading}
      />
      <div className="flex flex-row space-x-6 align-baseline">
        <div className="flex-1">
          {
            values[
              "dashboard.reports.sections-transactions-by-user.search.wallet-address.label"
            ]
          }
          <Input
            placeholder={
              values[
                "dashboard.reports.sections-transactions-by-user.search.wallet-address.placeholder"
              ]
            }
            className="rounded-full border border-black"
            name="search"
            onChange={(e) =>
              handlePaginationAndSearchChange({
                ...paginationAndSearch,
                search: e.target.value,
                page: "1",
              })
            }
            defaultValue={paginationAndSearch.search}
          />
        </div>
        <div className="flex-1">
          {
            values[
              "dashboard.reports.sections-transactions-by-user.search.period.label"
            ]
          }
          <div className="relative flex-1">
            <Input
              placeholder={
                values[
                  "dashboard.reports.sections-transactions-by-user.search.period.placeholder"
                ]
              }
              className="rounded-full border border-black"
              name="search"
              onChange={(e) =>
                handlePaginationAndSearchChange({
                  ...paginationAndSearch,
                  search: e.target.value,
                  page: "1",
                })
              }
              defaultValue={paginationAndSearch.search}
            />
            <Calendar
              className="absolute right-4 top-1/2 size-6 -translate-y-1/2 transform"
              strokeWidth={0.75}
            />
          </div>
        </div>
        <div>
          {
            values[
              "dashboard.reports.sections-transactions-by-user.search.type.label"
            ]
          }
          <Select>
            <SelectTrigger
              className={cn("rounded-full border border-black text-gray-400")}
            >
              <SelectValue
                placeholder={
                  values[
                    `dashboard.reports.sections-transactions-by-user.search.type.placeholder`
                  ]
                }
              />
            </SelectTrigger>
          </Select>
        </div>
        <div>
          {
            values[
              "dashboard.reports.sections-transactions-by-user.search.state.label"
            ]
          }
          <Select>
            <SelectTrigger
              className={cn("rounded-full border border-black text-gray-400")}
            >
              <SelectValue
                placeholder={
                  values[
                    `dashboard.reports.sections-transactions-by-user.search.state.placeholder`
                  ]
                }
              />
            </SelectTrigger>
          </Select>
        </div>
        <div>
          {
            values[
              "dashboard.reports.sections-transactions-by-user.search.provider.label"
            ]
          }
          <Select>
            <SelectTrigger
              className={cn("rounded-full border border-black text-gray-400")}
            >
              <SelectValue
                placeholder={
                  values[
                    `dashboard.reports.sections-transactions-by-user.search.provider.placeholder`
                  ]
                }
              />
            </SelectTrigger>
          </Select>
        </div>
        <Button className="flex h-max flex-row items-center space-x-2">
          <p className="flex-1 text-lg font-light">
            {
              values[
                "dashboard.reports.sections.transactions-by-user.search-button"
              ]
            }
          </p>
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        <Table table={table} />
      </div>
      <div>
        <div className="flex">
          <span className="ml-[75%] text-lg">Total | {total}</span>
        </div>

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
            data?.paymentParameters.length === Number(paginationAndSearch.items)
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
  paymentParameter?: {
    id: string;
    name: string;
    cost: string;
    interval: string;
    frequency: string;
  };
  serviceProviderId: string;
  trigger: ReactNode;
}) {
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, close, toggle] = useBooleanHandlers();

  const form = useForm({
    schema: addOrEditProviderPaymentParameterValidator,
    defaultValues: {
      name: props.paymentParameter?.name ?? "",
      cost: props.paymentParameter?.cost ?? "",
      timeIntervalId: props.paymentParameter?.interval ?? "",
      frequency: props.paymentParameter?.frequency ?? "",
      serviceProviderId: props.serviceProviderId,
      paymentParameterId: props.paymentParameter?.id,
    },
  });

  const { data: timeInvervals } = useGetTimeIntervalsQuery(undefined);

  const { mutate, isPending } = useAddOrEditProviderPaymentParameterMutation({
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      toast.success(values[`${valuesPrefix}.toast.success` as const]);
      close();
      form.reset();
    },
  });

  const valuesPrefix =
    `service-providers.settings.payment-parameters.${props.paymentParameter ? "edit" : "add"}-dialog` as const;

  // This useEffect is used to reset the form when the role prop changes because the form is not unmounted when dialog closes
  useEffect(() => {
    if (props.paymentParameter) {
      form.reset({
        name: props.paymentParameter.name,
        cost: props.paymentParameter.cost,
        timeIntervalId: props.paymentParameter.interval,
        frequency: props.paymentParameter.frequency,
        serviceProviderId: props.serviceProviderId,
        paymentParameterId: props.paymentParameter.id,
      });
    }
  }, [props.paymentParameter, form, props.serviceProviderId]);

  return (
    <Dialog
      key={props.paymentParameter?.id ?? "add"}
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
            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {values[`${valuesPrefix}.name.label`]}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={values[`${valuesPrefix}.name.placeholder`]}
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
                name="cost"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {values[`${valuesPrefix}.cost.label`]}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={values[`${valuesPrefix}.cost.placeholder`]}
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="timeIntervalId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {values[`${valuesPrefix}.interval.label`]}
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
                              values[`${valuesPrefix}.interval.placeholder`]
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {!timeInvervals && (
                          <Loader2
                            className="animate-spin"
                            strokeWidth={0.75}
                          />
                        )}
                        {timeInvervals?.map((ti) => (
                          <SelectItem key={ti.id} value={ti.id}>
                            {ti.name}
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
                name="frequency"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {values[`${valuesPrefix}.frequency.label`]}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          values[`${valuesPrefix}.frequency.placeholder`]
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
  paymentParameter: {
    id: string;
    isActive: boolean;
  };
}) {
  const { providerId } = useParams<{ providerId: string }>();
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, close, toggle] = useBooleanHandlers();

  const { mutate, isPending } = useToggleProviderPaymentParameterStatusMutation(
    {
      onSuccess: () => {
        toast.success(values[`${valuesPrexif}.toast.success` as const]);
        close();
      },
      onError: (error) => {
        toast.error(errors[error.message], {
          description: "Error code: " + error.message,
        });
      },
    },
  );

  const valuesPrexif =
    `service-providers.settings.payment-parameters.${props.paymentParameter.isActive ? "inactive-dialog" : "activate-dialog"}` as const;

  return (
    <ConfirmDialog
      key={props.paymentParameter.id}
      isOpen={isOpen}
      toggleOpen={toggle}
      trigger={<Switch checked={props.paymentParameter.isActive} />}
      actions={[
        <Button
          className="w-full"
          key="yes"
          onClick={() =>
            mutate({
              serviceProviderId: providerId,
              paymentParameterId: props.paymentParameter.id,
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
        props.paymentParameter.isActive ? (
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
