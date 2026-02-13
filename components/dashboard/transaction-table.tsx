"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");

  // Safe transaction accessor with null checks
  const getTransactionData = (tx: Transaction | null | undefined) => {
    if (!tx) return null;
    return {
      id: tx.id ?? '',
      date: tx.date ?? 'N/A',
      method: {
        type: tx.method?.type ?? 'Bank Transfer',
        icon: tx.method?.icon ?? 'account_balance',
      },
      amount: tx.amount ?? 0,
      status: tx.status ?? 'PENDING',
    };
  };

  // Filter transactions by search query
  const filteredTransactions = (transactions ?? []).filter((tx) => {
    if (!searchQuery) return true;
    const data = getTransactionData(tx);
    if (!data) return false;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      data.id.toLowerCase().includes(searchLower) ||
      data.date.toLowerCase().includes(searchLower) ||
      data.method.type.toLowerCase().includes(searchLower) ||
      data.status.toLowerCase().includes(searchLower)
    );
  });

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
              placeholder="Search transactions..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-gray-400">
            {searchQuery ? 'No transactions match your search' : 'No transactions found'}
          </p>
        </div>
      ) : (
        <>
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
                {filteredTransactions.map((tx) => {
                  const data = getTransactionData(tx);
                  if (!data) return null;
                  
                  return (
                    <tr
                      key={data.id}
                      onClick={() => onRowClick?.(data.id)}
                      className={cn(
                        "transition-colors group",
                        onRowClick ? "hover:bg-white/[0.02] cursor-pointer" : "hover:bg-white/[0.02]"
                      )}
                    >
                      <td className="px-8 py-5 font-mono text-sm text-gray-300">
                        {data.id}
                      </td>
                      <td className="px-8 py-5 text-sm text-gray-400">{data.date}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "h-6 w-6 rounded flex items-center justify-center border",
                              data.method.type === "E-Sewa"
                                ? "bg-primary/10 border-primary/20"
                                : "bg-blue-500/10 border-blue-500/20"
                            )}
                          >
                            <span
                              className={cn(
                                "material-symbols-outlined text-[14px]",
                                data.method.type === "E-Sewa"
                                  ? "text-primary"
                                  : "text-blue-400"
                              )}
                            >
                              {data.method.icon}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-200">
                            {data.method.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-white">
                        NPR {data.amount.toLocaleString()}
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center w-fit gap-1.5 border",
                            data.status === "COMPLETED"
                              ? "bg-primary/10 border-primary/20 text-primary"
                              : "bg-accent-orange/10 border-accent-orange/20 text-accent-orange"
                          )}
                        >
                          <span
                            className={cn(
                              "w-1 h-1 rounded-full",
                              data.status === "COMPLETED"
                                ? "bg-primary"
                                : "bg-accent-orange animate-pulse"
                            )}
                          ></span>
                          {data.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onRowClick?.(data.id);
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
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-white/5">
            {filteredTransactions.map((tx) => {
              const data = getTransactionData(tx);
              if (!data) return null;
              
              return (
                <div
                  key={data.id}
                  onClick={() => onRowClick?.(data.id)}
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
                        <p className="font-mono text-sm text-gray-300">{data.id}</p>
                      </div>
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1.5 border whitespace-nowrap ml-2",
                          data.status === "COMPLETED"
                            ? "bg-primary/10 border-primary/20 text-primary"
                            : "bg-accent-orange/10 border-accent-orange/20 text-accent-orange"
                        )}
                      >
                        <span
                          className={cn(
                            "w-1 h-1 rounded-full",
                            data.status === "COMPLETED"
                              ? "bg-primary"
                              : "bg-accent-orange animate-pulse"
                          )}
                        ></span>
                        {data.status}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                          Date
                        </p>
                        <p className="text-sm text-gray-300">{data.date}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                          Amount
                        </p>
                        <p className="text-sm font-bold text-white">
                          NPR {data.amount.toLocaleString()}
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
                            data.method.type === "E-Sewa"
                              ? "bg-primary/10 border-primary/20"
                              : "bg-blue-500/10 border-blue-500/20"
                          )}
                        >
                          <span
                            className={cn(
                              "material-symbols-outlined text-[14px]",
                              data.method.type === "E-Sewa"
                                ? "text-primary"
                                : "text-blue-400"
                            )}
                          >
                            {data.method.icon}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-200">
                          {data.method.type}
                        </span>
                      </div>
                    </div>

                    {/* View Button */}
                    {onRowClick && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRowClick(data.id);
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
              );
            })}
          </div>
        </>
      )}

      {/* Footer */}
      <div className="px-8 py-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
        <span className="text-xs text-gray-500">
          Showing {filteredTransactions.length} of {totalTransactions} transactions
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
