"use client";

import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export function DataTable<T>({ columns, data, className }: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-xl border border-border bg-surface", className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border bg-gray-50/50 dark:bg-white/5">
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-4 text-sm font-semibold text-text-primary whitespace-nowrap"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-text-muted text-sm"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 text-sm text-text-muted whitespace-nowrap"
                  >
                    {column.render
                      ? column.render(row)
                      : (row[column.accessorKey as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
