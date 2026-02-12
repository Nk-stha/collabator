"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";

export interface Transaction {
  id: string;
  date: string;
  method: {
    type: "E-Sewa" | "Bank Transfer";
    icon: string; // Material symbol name
  };
  amount: number;
  status: "COMPLETED" | "PENDING" | "FAILED";
}

interface TransactionTableProps {
  transactions: Transaction[];
  totalTransactions: number;
  className?: string;
  onRowClick?: (transactionId: string) => void;
}

export function TransactionTable({
  transactions,
  totalTransactions,
  className,
  onRowClick,
}: TransactionTableProps) {
  return (
    <div
      className={cn(
        "bg-card-bg/40 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden border-white/[0.05]",
        className
      )}
    >
      <div className="px-8 py-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.01]">
        <h3 className="text-lg font-bold flex items-center gap-2 text-white">
          <span className="material-symbols-outlined text-primary">
            receipt_long
          </span>
          Transaction History
        </h3>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
              search
            </span>
            <input
              className="bg-app-bg border border-border-dark rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary transition-all w-full text-white placeholder-gray-500"
              placeholder="Search ID..."
              type="text"
            />
          </div>
          <button className="p-2 border border-border-dark rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5">
              <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Payout ID
              </th>
              <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Date
              </th>
              <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Method
              </th>
              <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Amount
              </th>
              <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                Status
              </th>
              <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                onClick={() => onRowClick?.(tx.id)}
                className={cn(
                  "transition-colors group",
                  onRowClick ? "hover:bg-white/[0.02] cursor-pointer" : "hover:bg-white/[0.02]"
                )}
              >
                <td className="px-8 py-5 font-mono text-sm text-gray-300">
                  {tx.id}
                </td>
                <td className="px-8 py-5 text-sm text-gray-400">{tx.date}</td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-6 w-6 rounded flex items-center justify-center border",
                        tx.method.type === "E-Sewa"
                          ? "bg-primary/10 border-primary/20"
                          : "bg-blue-500/10 border-blue-500/20"
                      )}
                    >
                      <span
                        className={cn(
                          "material-symbols-outlined text-[14px]",
                          tx.method.type === "E-Sewa"
                            ? "text-primary"
                            : "text-blue-400"
                        )}
                      >
                        {tx.method.icon}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-200">
                      {tx.method.type}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-bold text-white">
                  NPR {tx.amount.toLocaleString()}
                </td>
                <td className="px-8 py-5">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center w-fit gap-1.5 border",
                      tx.status === "COMPLETED"
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : "bg-accent-orange/10 border-accent-orange/20 text-accent-orange"
                    )}
                  >
                    <span
                      className={cn(
                        "w-1 h-1 rounded-full",
                        tx.status === "COMPLETED"
                          ? "bg-primary"
                          : "bg-accent-orange animate-pulse"
                      )}
                    ></span>
                    {tx.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick?.(tx.id);
                    }}
                    className="text-gray-500 hover:text-primary text-xs font-bold transition-colors flex items-center gap-1 ml-auto"
                  >
                    <span className="material-symbols-outlined text-lg">
                      visibility
                    </span>
                    View Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-white/5">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            onClick={() => onRowClick?.(tx.id)}
            className={cn(
              "p-4 transition-colors",
              onRowClick ? "hover:bg-white/[0.02] cursor-pointer active:bg-white/[0.05]" : ""
            )}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                    Payout ID
                  </p>
                  <p className="font-mono text-sm text-gray-300">{tx.id}</p>
                </div>
                <span
                  className={cn(
                    "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1.5 border whitespace-nowrap ml-2",
                    tx.status === "COMPLETED"
                      ? "bg-primary/10 border-primary/20 text-primary"
                      : "bg-accent-orange/10 border-accent-orange/20 text-accent-orange"
                  )}
                >
                  <span
                    className={cn(
                      "w-1 h-1 rounded-full",
                      tx.status === "COMPLETED"
                        ? "bg-primary"
                        : "bg-accent-orange animate-pulse"
                    )}
                  ></span>
                  {tx.status}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                    Date
                  </p>
                  <p className="text-sm text-gray-300">{tx.date}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                    Amount
                  </p>
                  <p className="text-sm font-bold text-white">
                    NPR {tx.amount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Method */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Method
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-6 w-6 rounded flex items-center justify-center border",
                      tx.method.type === "E-Sewa"
                        ? "bg-primary/10 border-primary/20"
                        : "bg-blue-500/10 border-blue-500/20"
                    )}
                  >
                    <span
                      className={cn(
                        "material-symbols-outlined text-[14px]",
                        tx.method.type === "E-Sewa"
                          ? "text-primary"
                          : "text-blue-400"
                      )}
                    >
                      {tx.method.icon}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    {tx.method.type}
                  </span>
                </div>
              </div>

              {/* View Button */}
              {onRowClick && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRowClick(tx.id);
                  }}
                  className="w-full mt-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">
                    visibility
                  </span>
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-8 py-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
        <span className="text-xs text-gray-500">
          Showing {transactions.length} of {totalTransactions} transactions
        </span>
        <div className="flex gap-2">
          <button
            className="p-2 border border-border-dark rounded-lg text-gray-500 hover:text-white disabled:opacity-30 hover:bg-white/5 transition-all"
            disabled
          >
            <span className="material-symbols-outlined text-lg">
              chevron_left
            </span>
          </button>
          <button className="p-2 border border-border-dark rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all">
            <span className="material-symbols-outlined text-lg">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
