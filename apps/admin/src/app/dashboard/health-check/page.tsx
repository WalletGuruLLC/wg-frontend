"use client";

import type { ReactNode } from "react";
import type { z } from "zod";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CircleCheck, PlusCircle, Search, TriangleAlert } from "lucide-react";

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

import type { paginationAndSearchValidator } from "~/lib/validators";
import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import { SelectTrigger } from "~/components/select";
import {
  HealthCheck,
  useAddOrEditWalletMutation,
  useGetAuthedUserAccessLevelsQuery,
  useGetHealthCheckQuery,
  Wallet,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { addOrEditWalletValidator } from "~/lib/validators";
import ConfirmDialog from "../_components/dashboard-confirm-dialog";
import Dialog from "../_components/dashboard-dialog";
import { FormItem, FormLabel } from "../_components/dashboard-form";
import { Input } from "../_components/dashboard-input";
import { Switch } from "../_components/dashboard-switch";
import Table, {
  ColumnHeader,
  PaginationFooter,
} from "../_components/dashboard-table";
import { SimpleTitle } from "../_components/dashboard-title";

const columnHelper = createColumnHelper<HealthCheck>();

const columns = [
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <ColumnHeader i18nKey="dashboard.health.service" />,
  }),
  columnHelper.accessor("beats", {
    id: "beats",
    cell: (info) => {
      const roles = info.getValue();
      const isUnhealthy = roles.splice(-10).some((role) => !role.status);
      return isUnhealthy ? (
        <div className="flex h-10 max-w-40 items-center justify-center rounded-lg bg-red-500 p-2 pr-4 text-sm text-white">
          <TriangleAlert className="text-text-black-500 pr-1" /> Unhealthy
        </div>
      ) : (
        <div className="flex h-10 max-w-40 items-center justify-center rounded-lg bg-green-500 p-2 pr-4 text-sm text-white">
          <CircleCheck className="text-text-black-500 pr-1" /> Healthy
        </div>
      );
    },

    header: () => <ColumnHeader i18nKey="dashboard.health.status" />,
  }),
];

export default function HealthCheckPage() {
  const loading = useAccessLevelGuard({
    general: {
      module: "healthCheck",
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

  const { data, isLoading } = useGetHealthCheckQuery(paginationAndSearch);

  const table = useReactTable({
    data: data?.monitors ?? [],
    columns: columns,
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

  // @ts-ignore
  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <SimpleTitle
        title={values["dashboard.health.title"]}
        showLoadingIndicator={isLoading}
      />
      {/*<div className="flex flex-row items-center space-x-6">*/}
      {/*	<div className="relative flex-1">*/}
      {/*		<Input*/}
      {/*			placeholder={*/}
      {/*				values['dashboard.wallet-management.search.placeholder']*/}
      {/*			}*/}
      {/*			className="rounded-full border border-black"*/}
      {/*			name="search"*/}
      {/*			onChange={(e) =>*/}
      {/*				handlePaginationAndSearchChange({*/}
      {/*					...paginationAndSearch,*/}
      {/*					search: e.target.value,*/}
      {/*					page: '1',*/}
      {/*				})*/}
      {/*			}*/}
      {/*			defaultValue={paginationAndSearch.search}*/}
      {/*		/>*/}
      {/*		<Search*/}
      {/*			className="absolute right-4 top-1/2 size-6 -translate-y-1/2 transform"*/}
      {/*			strokeWidth={0.75}*/}
      {/*		/>*/}
      {/*	</div>*/}

      {/*</div>*/}
      <div className="flex-1 overflow-auto">
        <Table table={table} />
      </div>
      <div>
        <PaginationFooter
          count={{
            total: data?.monitors?.length ?? 0,
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
            (data?.monitors?.length ?? 0) === Number(paginationAndSearch.items)
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
