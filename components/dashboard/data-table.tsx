"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  onRowClick?: (row: T) => void;
  pagination?: boolean;
  pageSize?: number;
}

export function DataTable<T>({
  columns,
  data,
  className,
  onRowClick,
  pagination = false,
  pageSize = 10,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = pagination ? data.slice(startIndex, endIndex) : data;

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click bubbling
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click bubbling
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className={cn("w-full flex flex-col", className)}>
      <div className="w-full overflow-x-auto rounded-xl border border-border bg-surface">
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
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-text-muted text-sm"
                >
                  No data available
                </td>
              </tr>
            ) : (
              currentData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn(
                    "hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick && onRowClick(row)}
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

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <p className="text-sm text-text-muted">
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{" "}
            {data.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="p-2 border border-border rounded-lg text-text-muted hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-text-muted font-medium px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-2 border border-border rounded-lg text-text-muted hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5 transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
