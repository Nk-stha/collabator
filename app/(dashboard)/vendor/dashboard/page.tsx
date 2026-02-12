"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/use-api";
import { dashboardService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { VendorStats } from "@/components/dashboard/vendor-stats";
import { VendorPayoutCard, PayoutActivity } from "@/components/dashboard/vendor-payout-card";
import { SupportCta } from "@/components/dashboard/support-cta";
import { GlassTable } from "@/components/dashboard/glass-table";
import { cn } from "@/lib/utils";
import { Receipt } from "lucide-react";

export default function VendorDashboard() {
  const router = useRouter();
  const [chartPeriod, setChartPeriod] = React.useState<'today' | 'week' | 'month'>('today');
  const { data: response, loading, error, refetch } = useApi(() => 
    dashboardService.getVendorDashboard()
  );

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!response?.data) return <PageLoader />;

  const dashboard = response.data;

  // Helper function to safely format numbers
  const formatNumber = (value: number | null | undefined): string => {
    return (value ?? 0).toLocaleString();
  };

  // Transform API data to stats format
  const stats = [
    {
      title: "Today's Earnings",
      value: `NPR ${formatNumber(dashboard.today?.my_share)}`,
      trend: { value: "+12.5%", isPositive: true },
      progress: 75,
    },
    {
      title: "This Week",
      value: `NPR ${formatNumber(dashboard.this_week?.my_share)}`,
      suffix: `${dashboard.this_week?.transactions ?? 0} transactions`,
      subtext: "Weekly earnings",
    },
    {
      title: "This Month",
      value: `NPR ${formatNumber(dashboard.this_month?.my_share)}`,
      icon: "trending_up",
      subtext: `${dashboard.this_month?.transactions ?? 0} transactions`,
    },
  ];

  // Mock recent transactions (API doesn't provide this)
  const RECENT_TRANSACTIONS = [
    { id: "#CG-8821", customer: "Aditya K.", duration: "2h 15m", amount: "NPR 150", status: "Completed" },
    { id: "#CG-8822", customer: "Riya S.", duration: "Active", amount: "--", status: "In Use" },
    { id: "#CG-8819", customer: "Binod T.", duration: "45m", amount: "NPR 80", status: "Completed" },
  ];

  const payoutActivity: PayoutActivity[] = [
    { 
      id: "1", 
      amount: `NPR ${formatNumber(dashboard.pending_payout)}`, 
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), 
      status: "PENDING" 
    },
    { 
      id: "2", 
      amount: `NPR ${formatNumber(dashboard.total_earnings)}`, 
      date: "Total Earnings", 
      status: "PAID" 
    },
  ];

  const transactionColumns = [
    { header: "Order ID", accessorKey: "id", className: "font-mono" },
    { header: "Customer", accessorKey: "customer" },
    { 
      header: "Duration", 
      accessorKey: "duration",
      render: (row: any) => (
        <span className={cn(row.duration === "Active" && "text-primary font-medium italic")}>
          {row.duration}
        </span>
      )
    },
    { header: "Amount", accessorKey: "amount", className: "font-bold" },
    { 
      header: "Status", 
      accessorKey: "status",
      render: (row: any) => (
        <span className={cn(
          "px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider",
          row.status === "Completed" 
            ? "bg-primary/10 text-primary" 
            : "bg-yellow-500/10 text-yellow-500"
        )}>
          {row.status}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
          <p className="text-gray-400 text-sm">
            Station: {dashboard.station.name} • {dashboard.station.code}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            STATION ONLINE
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <VendorStats stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Rental Volume + Transactions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Rental Volume Chart */}
          <div className="dashboard-card p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Rental Volume</h3>
              <div className="flex bg-white/5 rounded-lg p-1">
                <button 
                  onClick={() => setChartPeriod('today')}
                  className={cn(
                    "px-3 py-1 text-xs font-bold rounded-md transition-all",
                    chartPeriod === 'today' 
                      ? "bg-primary text-black" 
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  Today
                </button>
                <button 
                  onClick={() => setChartPeriod('week')}
                  className={cn(
                    "px-3 py-1 text-xs font-bold rounded-md transition-all",
                    chartPeriod === 'week' 
                      ? "bg-primary text-black" 
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  Week
                </button>
                <button 
                  onClick={() => setChartPeriod('month')}
                  className={cn(
                    "px-3 py-1 text-xs font-bold rounded-md transition-all",
                    chartPeriod === 'month' 
                      ? "bg-primary text-black" 
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  Month
                </button>
              </div>
            </div>

            {/* Chart Display */}
            {chartPeriod === 'today' && (
              <div className="space-y-4">
                <div className="h-64 flex items-end justify-center gap-4 px-2">
                  {(() => {
                    const maxValue = Math.max(dashboard.today.transactions, 1);
                    const height = (dashboard.today.transactions / maxValue) * 100;
                    return (
                      <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: `${height}%` }}>
                        <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">
                          {dashboard.today.transactions}
                        </span>
                      </div>
                    );
                  })()}
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-400">
                    Revenue: <span className="text-white font-bold">NPR {formatNumber(dashboard.today?.gross_revenue)}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Your Share: <span className="text-primary font-bold">NPR {formatNumber(dashboard.today?.my_share)}</span>
                  </p>
                </div>
              </div>
            )}

            {chartPeriod === 'week' && (
              <div className="space-y-4">
                <div className="h-64 flex items-end justify-center gap-4 px-2">
                  {(() => {
                    const maxValue = Math.max(dashboard.this_week.transactions, 1);
                    const height = (dashboard.this_week.transactions / maxValue) * 100;
                    return (
                      <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: `${height}%` }}>
                        <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">
                          {dashboard.this_week.transactions}
                        </span>
                      </div>
                    );
                  })()}
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-400">
                    Revenue: <span className="text-white font-bold">NPR {formatNumber(dashboard.this_week?.gross_revenue)}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Your Share: <span className="text-primary font-bold">NPR {formatNumber(dashboard.this_week?.my_share)}</span>
                  </p>
                </div>
              </div>
            )}

            {chartPeriod === 'month' && (
              <div className="space-y-4">
                <div className="h-64 flex items-end justify-center gap-4 px-2">
                  {(() => {
                    const maxValue = Math.max(dashboard.this_month.transactions, 1);
                    const height = (dashboard.this_month.transactions / maxValue) * 100;
                    return (
                      <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: `${height}%` }}>
                        <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400">
                          {dashboard.this_month.transactions}
                        </span>
                      </div>
                    );
                  })()}
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-400">
                    Revenue: <span className="text-white font-bold">NPR {formatNumber(dashboard.this_month?.gross_revenue)}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Your Share: <span className="text-primary font-bold">NPR {formatNumber(dashboard.this_month?.my_share)}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <GlassTable
            title="Recent Transactions"
            icon={<Receipt className="h-5 w-5" />}
            columns={transactionColumns}
            data={RECENT_TRANSACTIONS}
            pagination={false}
            actions={
              <a className="text-primary text-xs font-semibold hover:underline cursor-pointer">
                View All
              </a>
            }
          />
        </div>

        {/* Right Column: Payout + Support */}
        <div className="space-y-6">
          <VendorPayoutCard
            balance={`NPR ${formatNumber(dashboard.balance)}`}
            recentActivity={payoutActivity}
            onRequestPayout={() => router.push('/vendor/payouts')}
          />
          <SupportCta />
        </div>
      </div>
    </div>
  );
}
