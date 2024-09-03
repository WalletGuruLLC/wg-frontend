"use client";

import type { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@wg-frontend/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@wg-frontend/ui/select";

import type { I18nKey } from "~/lib/i18n";
import { SelectTrigger } from "~/components/select";
import { useI18n } from "~/lib/i18n";

export default function Table<TData>({ table }: { table: Table<TData> }) {
  return (
    <table className="w-full">
      <thead className="bg-[#F5F5F5]">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="text-left">
            {headerGroup.headers.map((header, idx) => (
              <th
                key={header.id}
                className={cn(
                  "px-4 py-2 text-left text-lg font-bold",
                  idx === 0 && "rounded-l-full",
                  idx + 1 === headerGroup.headers.length && "rounded-r-full",
                  (
                    header.column.columnDef.meta as
                      | { main: boolean }
                      | undefined
                  )?.main && "w-full flex-1",
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="h-12 border-b">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-4 font-semibold">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ColumnHeader({ i18nKey }: { i18nKey: I18nKey }) {
  const { value } = useI18n(i18nKey);
  return value;
}

export function PaginationFooter(props: {
  count: {
    total: number;
    firstRowIdx: number;
    lastRowIdx: number;
  };
  items: string;
  onItemsChange: (items: string) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}) {
  const { values } = useI18n();

  return (
    <div className="flex flex-row items-center space-x-8 text-sm">
      <div className="flex-1" />
      <div className="flex flex-row items-center space-x-1">
        <p>{values["dashboard.roles.table.items-label"]}</p>
        <div>
          <Select onValueChange={props.onItemsChange} value={props.items}>
            <SelectTrigger className="border-none bg-[#F5F5F5]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        {props.count.firstRowIdx}
        {" - "}
        {props.count.lastRowIdx}
        {values["dashboard.roles.table.items-count-separator"]}
        {props.count.total}
      </div>
      <div className="flex flex-row items-center space-x-2">
        <ChevronLeft
          strokeWidth={1.2}
          className={cn(
            "text-gray-500",
            props.canPreviousPage && "cursor-pointer text-black",
          )}
          onClick={() => {
            if (props.canPreviousPage) props.onPreviousPage();
          }}
        />
        <ChevronRight
          strokeWidth={1.2}
          className={cn(
            "text-gray-500",
            props.canNextPage && "cursor-pointer text-black",
          )}
          onClick={() => {
            if (props.canNextPage) props.onNextPage();
          }}
        />
      </div>
      <div className="w-[10%]" />
    </div>
  );
}
