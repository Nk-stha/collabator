"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  CreditCard,
  User,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import type { VendorPayout } from "@/lib/types";

interface VendorPayoutListProps {
  payouts: VendorPayout[];
  onPayoutClick?: (payout: VendorPayout) => void;
}

export function VendorPayoutList({ payouts, onPayoutClick }: VendorPayoutListProps) {
  const getStatusConfig = (status: VendorPayout['status']) => {
    switch (status) {
      case 'COMPLETED':
        return {
          icon: CheckCircle2,
          color: 'text-green-400',
          bg: 'bg-green-500/10',
          border: 'border-green-500/20',
        };
      case 'PENDING':
        return {
          icon: Clock,
          color: 'text-yellow-400',
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/20',
        };
      case 'PROCESSING':
        return {
          icon: AlertCircle,
          color: 'text-blue-400',
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20',
        };
      case 'REJECTED':
        return {
          icon: XCircle,
          color: 'text-red-400',
          bg: 'bg-red-500/10',
          border: 'border-red-500/20',
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-400',
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/20',
        };
    }
  };

  if (payouts.length === 0) {
    return (
      <div className="bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 p-12 text-center">
        <div className="h-16 w-16 rounded-full bg-gray-500/10 flex items-center justify-center mx-auto mb-4">
          <DollarSign className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">No Vendor Payouts</h3>
        <p className="text-sm text-gray-400">
          No payout requests from your sub-vendors yet.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-[#171712]/60 backdrop-blur-xl rounded-2xl border border-primary/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Reference ID
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Bank Details
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Requested Date
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payouts.map((payout) => {
                const statusConfig = getStatusConfig(payout.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <tr
                    key={payout.id}
                    onClick={() => onPayoutClick?.(payout)}
                    className="hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate">
                            {payout.vendor.business_name}
                          </p>
                          <p className="text-xs text-gray-400 font-mono">
                            {payout.vendor.code}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-mono text-gray-300">
                        {payout.reference_id}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-white">
                        NPR {payout.net_amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {payout.bank_name ? (
                        <div className="text-sm">
                          <p className="text-white font-medium">{payout.bank_name}</p>
                          <p className="text-gray-400 text-xs font-mono">
                            {payout.account_number}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">N/A</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-300">
                        {new Date(payout.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border",
                          statusConfig.bg,
                          statusConfig.border,
                          statusConfig.color
                        )}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />
                        {payout.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {payouts.map((payout) => {
          const statusConfig = getStatusConfig(payout.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={payout.id}
              onClick={() => onPayoutClick?.(payout)}
              className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-primary/20 p-4 hover:bg-white/5 transition-colors cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-white truncate">
                      {payout.vendor.business_name}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">
                      {payout.vendor.code}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border shrink-0",
                    statusConfig.bg,
                    statusConfig.border,
                    statusConfig.color
                  )}
                >
                  <StatusIcon className="h-3 w-3" />
                  {payout.status}
                </span>
              </div>

              {/* Details Grid */}
              <div className="space-y-3">
                {/* Amount */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-400 font-medium">Amount</span>
                  </div>
                  <span className="text-sm font-bold text-white">
                    NPR {payout.net_amount.toLocaleString()}
                  </span>
                </div>

                {/* Reference ID */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-400 font-medium">Reference</span>
                  </div>
                  <span className="text-xs font-mono text-gray-300">
                    {payout.reference_id}
                  </span>
                </div>

                {/* Bank Details */}
                {payout.bank_name && (
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-400 font-medium">Bank Details</span>
                    </div>
                    <p className="text-sm text-white font-medium">{payout.bank_name}</p>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      {payout.account_number}
                    </p>
                    {payout.account_holder_name && (
                      <p className="text-xs text-gray-400 mt-1">
                        {payout.account_holder_name}
                      </p>
                    )}
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-400 font-medium">Requested</span>
                  </div>
                  <span className="text-xs text-gray-300">
                    {new Date(payout.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
