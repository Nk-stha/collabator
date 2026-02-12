"use client";

import React from "react";
import { PayoutView } from "@/components/dashboard/payout-view";
import { PayoutDetailPanel } from "@/components/dashboard/payout-detail-panel";
import { useApi } from "@/hooks/use-api";
import { payoutService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import type { Transaction } from "@/components/dashboard/transaction-table";
import type { Payout } from "@/lib/types";

export default function FranchisePayouts() {
  const [selectedPayout, setSelectedPayout] = React.useState<Payout | null>(null);

  const { data: response, loading, error, refetch } = useApi(() => 
    payoutService.getFranchisePayouts({ page: 1, page_size: 20 })
  );

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!response?.data) return <EmptyState message="No payouts found" />;

  const { results, pagination } = response.data;
  const summary = response.data.summary || { pending_amount: 0, total_paid: 0 };
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
    <>
      <PayoutView 
        stats={stats} 
        transactions={transactions} 
        totalTransactions={totalCount}
        onTransactionClick={handleTransactionClick}
      />
      <PayoutDetailPanel 
        payout={selectedPayout}
        onClose={() => setSelectedPayout(null)}
      />
    </>
  );
}
