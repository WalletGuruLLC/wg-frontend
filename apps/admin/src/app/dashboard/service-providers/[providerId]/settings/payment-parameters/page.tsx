"use client";

import type { z } from "zod";
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
import { CircleCheck, Search, TriangleAlert } from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { toast } from "@wg-frontend/ui/toast";

import type { ProviderPaymentParameter } from "~/lib/data-access";
import type { paginationAndSearchValidator } from "~/lib/validators";
import ConfirmDialog from "~/app/dashboard/_components/dashboard-confirm-dialog";
import { Input } from "~/app/dashboard/_components/dashboard-input";
import { Switch } from "~/app/dashboard/_components/dashboard-switch";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "~/app/dashboard/_components/dashboard-table";
import { Button } from "~/components/button";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetProviderPaymentParametersQuery,
  useGetProviderQuery,
  useToggleProviderPaymentParameterStatusMutation,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { BreadcrumbTitle } from "../../../../_components/dashboard-title";

const columnHelper = createColumnHelper<ProviderPaymentParameter>();

const columns = [
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.payment-parameters.table.header.name" />
    ),
  }),
  columnHelper.accessor("id", {
    id: "id",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.payment-parameters.table.header.key" />
    ),
  }),
  columnHelper.accessor("cost", {
    id: "amount",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.payment-parameters.table.header.amount" />
    ),
  }),
  columnHelper.accessor("frequency", {
    id: "frequency",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.payment-parameters.table.header.frequency" />
    ),
  }),
  columnHelper.accessor("interval", {
    id: "interval",
    cell: (info) => info.getValue(),
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.payment-parameters.table.header.interval" />
    ),
  }),
  columnHelper.accessor("active", {
    id: "active",
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.payment-parameters.table.header.is-active" />
    ),
    cell: (info) => (
      <SwitchActiveStatusDialog
        paymentParameter={{
          id: info.row.original.id,
          isActive: info.getValue(),
        }}
      />
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: () => (
      <ColumnHeader i18nKey="service-providers.settings.payment-parameters.table.header.actions" />
    ),
    cell: (_) => "-",
    // <Actions
    //   wallet={{
    //     id: info.row.original.id,
    //     name: info.row.original.name,
    //     walletType: info.row.original.walletType,
    //     walletAddress: info.row.original.walletAddress,
    //   }}
    // />
  }),
];

export default function ServiceProviderPaymentParametersPage() {
  const { providerId } = useParams<{ providerId: string }>();
  const loading = useAccessLevelGuard({
    general: {
      module: "serviceProviders",
    },
    providers: {
      id: providerId,
      module: "settings",
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
    providerId,
  });
  const { data: providerData, isLoading: isLoadingProviderData } =
    useGetProviderQuery({ providerId });
  const { data: accessLevelsData, isLoading: isLoadingAccessLevels } =
    useGetAuthedUserAccessLevelsQuery(undefined);

  const table = useReactTable({
    data: data?.paymentParameters ?? [],
    columns: columns
      .filter(
        (c) =>
          c.id !== "actions" ||
          accessLevelsData?.providers[providerId]?.settings.includes("edit"),
      )
      .filter(
        (c) =>
          c.id !== "active" ||
          accessLevelsData?.providers[providerId]?.settings.includes(
            "inactive",
          ),
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
            title: values["service-providers.home.title"],
            href: "/dashboard/service-providers",
            isLoading: false,
          },
          {
            title: providerData?.name,
            href: `/dashboard/service-providers/${providerId}`,
            isLoading: isLoadingProviderData,
          },
          {
            title: values["service-providers.settings.title"],
            href: `/dashboard/service-providers/${providerId}/settings`,
            isLoading: false,
          },
          {
            title:
              values["service-providers.settings.payment-parameters.title"],
            href: `/dashboard/service-providers/${providerId}/settings/payment-parameters`,
            isLoading: false,
          },
        ]}
        showLoadingIndicator={isLoading}
      />
      <div className="flex flex-row items-center space-x-6">
        <div className="relative flex-1">
          <Input
            placeholder={
              values[
                "service-providers.settings.payment-parameters.search.placeholder"
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
          <Search
            className="absolute right-4 top-1/2 size-6 -translate-y-1/2 transform"
            strokeWidth={0.75}
          />
        </div>
        {/* {accessLevelsData?.providers.wallets.includes("add") && (
          <AddOrEditDialog
            trigger={
              <Button className="flex h-max flex-row items-center space-x-2">
                <p className="flex-1 text-lg font-light">
                  {values["dashboard.wallet-management.add-button"]}
                </p>
                <PlusCircle strokeWidth={0.75} className="size-6" />
              </Button>
            }
          />
        )} */}
      </div>
      <div className="flex-1 overflow-auto">
        <Table table={table} />
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
