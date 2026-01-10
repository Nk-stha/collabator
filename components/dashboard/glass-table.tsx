"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import React, { useState } from "react";

interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  render?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface GlassTableProps<T> {
  title: string;
  icon?: React.ReactNode;
  columns: Column<T>[];
  data: T[];
  className?: string;
  onRowClick?: (row: T) => void;
  pagination?: boolean;
  pageSize?: number;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
}

export function GlassTable<T>({
  title,
  icon,
  columns,
  data,
  className,
  onRowClick,
  pagination = true,
  pageSize = 10,
  searchPlaceholder = "Search...",
  actions,
}: GlassTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data based on search (naive string filtering on all generic object values)
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((row) =>
      Object.values(row as any).some((val) =>
        String(val).toLowerCase().includes(lowerQuery)
      )
    );
  }, [data, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = pagination ? filteredData.slice(startIndex, endIndex) : filteredData;

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Reset page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div
      className={cn(
        "glass-panel overflow-hidden border border-white/10 rounded-2xl bg-card-bg/40 backdrop-blur-xl",
        className
      )}
    >
      <div className="px-8 py-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.01]">
        <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-gray-400">
          {icon && <span className="text-primary text-xl">{icon}</span>}
          {title}
        </h3>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
             {/* Using Lucide icon for search instead of material symbol for consistency with inputs in this codebase, 
                 but could change if strict adherence is needed. The visual effect is what matters. */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              className="bg-app-bg border border-border-dark rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary transition-all w-full text-white placeholder-gray-600 focus:outline-none"
              placeholder={searchPlaceholder}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2 border border-border-dark rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <Filter className="h-4 w-4" />
          </button>
          {actions}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-8 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap",
                    column.headerClassName
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-text-muted text-sm"
                >
                  No records found
                </td>
              </tr>
            ) : (
              currentData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn(
                    "hover:bg-white/[0.02] transition-colors group",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn("px-8 py-5 text-sm", column.className)}
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

      <div className="px-8 py-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
        <span className="text-xs text-gray-500 font-medium tracking-wide">
          Showing <span className="text-white">{filteredData.length > 0 ? startIndex + 1 : 0}</span> to{" "}
          <span className="text-white">{Math.min(endIndex, filteredData.length)}</span> of{" "}
          <span className="text-white">{filteredData.length}</span> entries
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-3 py-1.5 border border-border-dark rounded-lg text-gray-500 hover:text-white disabled:opacity-30 flex items-center gap-1 text-xs font-bold transition-all hover:bg-white/5 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            PREV
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1.5 border border-border-dark rounded-lg text-gray-500 hover:text-white disabled:opacity-30 flex items-center gap-1 text-xs font-bold transition-all hover:bg-white/5 disabled:hover:bg-transparent"
          >
            NEXT
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
