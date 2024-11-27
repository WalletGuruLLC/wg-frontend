"use client";

import type { z } from "zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CircleCheck, TriangleAlert } from "lucide-react";

import type { HealthCheck } from "~/lib/data-access";
import type { paginationAndSearchValidator } from "~/lib/validators";
import { useGetHealthCheckQuery } from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
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
  const _loading = useAccessLevelGuard({
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

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <SimpleTitle
        title={values["dashboard.health.title"]}
        showLoadingIndicator={isLoading}
      />

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
