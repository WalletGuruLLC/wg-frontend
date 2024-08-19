"use client";

import type { Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import { cn } from "@wg-frontend/ui";

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
              <td key={cell.id} className="font-semibold">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}
