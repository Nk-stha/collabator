"use client";

import React, { useState } from "react";
import { PayoutView } from "@/components/dashboard/payout-view";
import { PayoutDetailPanel } from "@/components/dashboard/payout-detail-panel";
import { RequestPayoutModal } from "@/components/dashboard/request-payout-modal";
import { VendorPayoutList } from "@/components/dashboard/vendor-payout-list";
import { VendorPayoutDetailPanel } from "@/components/dashboard/vendor-payout-detail-panel";
import { useApi } from "@/hooks/use-api";
import { payoutService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/components/dashboard/transaction-table";
import type { Payout, VendorPayout } from "@/lib/types";
import { Wallet, Users } from "lucide-react";

type TabType = 'my-payouts' | 'vendor-payouts';

export default function FranchisePayouts() {
  const [activeTab, setActiveTab] = useState<TabType>('my-payouts');
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [selectedVendorPayout, setSelectedVendorPayout] = useState<VendorPayout | null>(null);
  const [isRequestPayoutModalOpen, setIsRequestPayoutModalOpen] = useState(false);

  // Fetch franchise's own payouts
  const { data: franchiseResponse, loading: franchiseLoading, error: franchiseError, refetch: refetchFranchise } = useApi(() => 
    payoutService.getFranchisePayouts({ page: 1, page_size: 20 })
  );

  // Fetch vendor payouts
  const { data: vendorResponse, loading: vendorLoading, error: vendorError, refetch: refetchVendor } = useApi(() => 
    payoutService.getFranchiseVendorPayouts({ page: 1, page_size: 20 })
  );

  const handleRequestPayoutSuccess = () => {
    refetchFranchise();
  };

  // My Payouts Tab Content
  const renderMyPayouts = () => {
    if (franchiseLoading) return <PageLoader />;
    if (franchiseError) return <ErrorDisplay error={franchiseError} onRetry={refetchFranchise} />;
    if (!franchiseResponse?.data) return <EmptyState message="No payouts found" />;

    const { results, pagination } = franchiseResponse.data;
    const summary = franchiseResponse.data.summary || { pending_amount: 0, total_paid: 0 };
    const totalCount = pagination.total_count;

    // Map API payouts to transaction format
    const transactions: Transaction[] = results.map((payout) => ({
      id: payout.id,
      date: new Date(payout.requested_at).toLocaleDateString('en-CA'),
      method: {
        type: payout.bank_name ? "Bank Transfer" : "E-Sewa",
        icon: payout.bank_name ? "account_balance" : "phone_iphone",
      },
      amount: payout.net_amount,
      status: payout.status === 'COMPLETED' ? 'COMPLETED' : 
              payout.status === 'PENDING' ? 'PENDING' : 'FAILED',
    }));

    // Calculate stats from API data
    const stats = [
      {
        title: "Total Earned",
        value: (summary.total_paid + summary.pending_amount).toLocaleString(),
        unit: "NPR",
        icon: "account_balance_wallet",
        trend: {
          value: "12.5%",
          label: "",
          isPositive: true,
          icon: "trending_up",
        },
      },
      {
        title: "Pending Amount",
        value: summary.pending_amount.toLocaleString(),
        unit: "NPR",
        icon: "payments",
        trend: {
          value: "Current",
          label: "",
          isPositive: undefined,
        },
      },
      {
        title: "Total Paid",
        value: summary.total_paid.toLocaleString(),
        unit: "NPR",
        icon: "history",
        highlight: true,
        trend: {
          value: results.length > 0 ? new Date(results[0].processed_at || results[0].requested_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "N/A",
          label: "",
          icon: "calendar_today",
        },
      },
    ];

    const handleTransactionClick = (transactionId: string) => {
      const payout = results.find(p => p.id === transactionId);
      if (payout) {
        setSelectedPayout(payout);
      }
    };

    return (
      <PayoutView 
        stats={stats} 
        transactions={transactions} 
        totalTransactions={totalCount}
        onTransactionClick={handleTransactionClick}
        onWithdrawClick={() => setIsRequestPayoutModalOpen(true)}
      />
    );
  };

  // Vendor Payouts Tab Content
  const renderVendorPayouts = () => {
    if (vendorLoading) return <PageLoader />;
    if (vendorError) return <ErrorDisplay error={vendorError} onRetry={refetchVendor} />;
    if (!vendorResponse?.data) return <EmptyState message="No vendor payouts found" />;

    const { results, pagination } = vendorResponse.data;

    // Calculate summary from results since API doesn't provide it
    const pendingAmount = results
      .filter(p => p.status === 'PENDING' || p.status === 'APPROVED' || p.status === 'PROCESSING')
      .reduce((sum, p) => sum + p.net_amount, 0);
    
    const totalPaid = results
      .filter(p => p.status === 'COMPLETED')
      .reduce((sum, p) => sum + p.net_amount, 0);

    const totalAmount = results.reduce((sum, p) => sum + p.net_amount, 0);

    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Sub-Vendor Payouts
          </h1>
          <p className="text-gray-500 text-sm max-w-md mt-2">
            Manage payout requests from your sub-vendors.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-primary/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Total</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                NPR {totalAmount.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 font-medium">Total Amount</p>
            </div>
          </div>

          <div className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-yellow-500/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-yellow-400" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Pending</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                NPR {pendingAmount.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 font-medium">Pending Payouts</p>
            </div>
          </div>

          <div className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-green-500/20 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Completed</span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                NPR {totalPaid.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 font-medium">Total Paid</p>
            </div>
          </div>
        </div>

        {/* Vendor Payouts List */}
        <VendorPayoutList 
          payouts={results}
          onPayoutClick={(payout) => setSelectedVendorPayout(payout)}
        />

        {/* Pagination Info */}
        {pagination.total_count > 0 && (
          <div className="text-center text-sm text-gray-400">
            Showing {results.length} of {pagination.total_count} payout requests
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-primary/20 p-1 inline-flex gap-1">
        <button
          onClick={() => setActiveTab('my-payouts')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all",
            activeTab === 'my-payouts'
              ? "bg-primary text-black shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          <Wallet className="h-4 w-4" />
          My Payouts
        </button>
        <button
          onClick={() => setActiveTab('vendor-payouts')}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all",
            activeTab === 'vendor-payouts'
              ? "bg-primary text-black shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          )}
        >
          <Users className="h-4 w-4" />
          Sub-Vendor Payouts
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'my-payouts' ? renderMyPayouts() : renderVendorPayouts()}

      {/* Modals */}
      <PayoutDetailPanel 
        payout={selectedPayout}
        onClose={() => setSelectedPayout(null)}
      />
      
      <VendorPayoutDetailPanel
        payout={selectedVendorPayout}
        onClose={() => setSelectedVendorPayout(null)}
        onActionSuccess={() => {
          refetchVendor();
          setSelectedVendorPayout(null);
        }}
      />
      
      <RequestPayoutModal
        isOpen={isRequestPayoutModalOpen}
        onClose={() => setIsRequestPayoutModalOpen(false)}
        onSuccess={handleRequestPayoutSuccess}
        availableBalance={franchiseResponse?.data?.summary?.pending_amount || 0}
      />
    </div>
  );
}
