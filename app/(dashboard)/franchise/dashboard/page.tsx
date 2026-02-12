"use client";

import { useApi } from "@/hooks/use-api";
import { dashboardService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { cn } from "@/lib/utils";

export default function FranchiseDashboard() {
  const { data: response, loading, error, refetch } = useApi(() => 
    dashboardService.getFranchiseDashboard()
  );

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!response?.data) {
    return <ErrorDisplay error={new Error("No data available") as any} onRetry={refetch} />;
  }

  const data = response.data;

  // Calculate percentage changes (mock for now since API doesn't provide previous period data)
  const todayVsYesterday = data.today.my_share > 0 ? "+15%" : "0%";
  const weekGrowth = data.this_week.transactions > 0 ? "+12%" : "0%";

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Franchise <span className="text-primary">Analytics</span>
          </h1>
          <p className="text-gray-400 max-w-lg">
            Real-time performance overview and network management for {data.profile.business_name}.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card-dark border border-border-dark rounded-xl hover:bg-white/5 transition-all">
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Reports</span>
          </button>
        </div>
      </header>

      {/* Profile Banner */}
      <div className="dashboard-card p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20">
            <span className="material-symbols-outlined text-4xl">business</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={cn(
                "px-2 py-0.5 rounded text-xs font-bold",
                data.profile.status === 'ACTIVE' 
                  ? "bg-primary/10 text-primary" 
                  : "bg-gray-500/10 text-gray-400"
              )}>
                {data.profile.status}
              </span>
              <span className="text-xs text-gray-500 font-mono">{data.profile.code}</span>
            </div>
            <h2 className="text-3xl font-bold">{data.profile.business_name}</h2>
            <p className="text-gray-400 mt-1">
              Revenue Share: {data.profile.revenue_share_percent}%
            </p>
          </div>
        </div>
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-8 border-l border-white/5 pl-8">
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Balance</p>
            <p className="text-xl font-bold text-primary">NPR {data.balance.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Pending</p>
            <p className="text-xl font-bold text-yellow-400">NPR {data.pending_payout.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Earned</p>
            <p className="text-xl font-bold">NPR {data.total_earnings.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="dashboard-card p-6 stat-card-gradient">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/20 text-primary rounded-lg">
              <span className="material-symbols-outlined">ev_station</span>
            </div>
            {data.stations_count > 0 && (
              <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded">
                {weekGrowth}
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm font-medium">Total Stations</p>
          <p className="text-3xl font-bold mt-1">{data.stations_count}</p>
          <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary h-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div className="dashboard-card p-6 stat-card-gradient">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <span className="material-symbols-outlined">storefront</span>
            </div>
            {data.vendors_count > 0 && (
              <span className="text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-1 rounded">
                {data.vendors_count} active
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm font-medium">Total Vendors</p>
          <p className="text-3xl font-bold mt-1">{data.vendors_count}</p>
          <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
            <div className="bg-blue-400 h-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        <div className="dashboard-card p-6 stat-card-gradient">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            {data.vendor_payouts_pending > 0 && (
              <span className="text-xs text-yellow-400 font-bold bg-yellow-500/10 px-2 py-1 rounded">
                Pending
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm font-medium">Vendor Payouts</p>
          <p className="text-3xl font-bold mt-1">{data.vendor_payouts_pending}</p>
          <p className="text-xs text-gray-500 mt-2">
            NPR {data.vendor_payouts_amount.toLocaleString()}
          </p>
        </div>

        <div className="dashboard-card p-6 stat-card-gradient">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium">This Month</p>
          <p className="text-3xl font-bold mt-1">{data.this_month.transactions}</p>
          <p className="text-xs text-gray-500 mt-2">
            NPR {data.this_month.my_share.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Earnings */}
          <div className="dashboard-card p-8 border-primary/20 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-xl">payments</span>
                  <h3 className="text-lg font-bold text-gray-300">Today&apos;s Earnings</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-primary stat-glow tracking-tight">
                    NPR {data.today.my_share.toLocaleString()}
                  </span>
                  {data.today.my_share > 0 && (
                    <div className="flex items-center text-primary text-sm font-bold bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20">
                      <span className="material-symbols-outlined text-sm">trending_up</span>
                      <span>{todayVsYesterday}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {data.today.transactions} transactions • NPR {data.today.gross_revenue.toLocaleString()} gross
                </p>
              </div>
            </div>
          </div>

          {/* Period Stats */}
          <div className="dashboard-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Revenue Overview</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Today */}
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Today</p>
                <p className="text-2xl font-bold text-white mb-1">
                  NPR {data.today.my_share.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">{data.today.transactions} transactions</p>
              </div>

              {/* This Week */}
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">This Week</p>
                <p className="text-2xl font-bold text-white mb-1">
                  NPR {data.this_week.my_share.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">{data.this_week.transactions} transactions</p>
              </div>

              {/* This Month */}
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">This Month</p>
                <p className="text-2xl font-bold text-primary mb-1">
                  NPR {data.this_month.my_share.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">{data.this_month.transactions} transactions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="lg:col-span-1">
          <div className="dashboard-card h-full">
            <div className="p-6 border-b border-white/5 bg-white/5">
              <h3 className="text-xl font-bold">Quick Stats</h3>
              <p className="text-sm text-gray-500">Network overview</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Stations */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Stations</span>
                  <span className="text-lg font-bold">{data.stations_count}</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Vendors */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Vendors</span>
                  <span className="text-lg font-bold">{data.vendors_count}</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Pending Payouts */}
              {data.vendor_payouts_pending > 0 && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-xs text-yellow-400 font-bold uppercase tracking-wider mb-2">
                    Pending Vendor Payouts
                  </p>
                  <p className="text-2xl font-bold text-white mb-1">
                    {data.vendor_payouts_pending}
                  </p>
                  <p className="text-sm text-gray-400">
                    NPR {data.vendor_payouts_amount.toLocaleString()}
                  </p>
                </div>
              )}

              {/* Balance Info */}
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">
                  Available Balance
                </p>
                <p className="text-2xl font-bold text-primary mb-1">
                  NPR {data.balance.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  Pending: NPR {data.pending_payout.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-8 border-t border-border-dark mt-12 text-center text-gray-600 text-sm">
        <p>© 2026 CHARGE GHAR Franchise Network. All operations encrypted and monitored.</p>
      </footer>
    </div>
  );
}
