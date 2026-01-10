"use client";

import { VendorStats } from "@/components/dashboard/vendor-stats";
import { VendorPayoutCard, PayoutActivity } from "@/components/dashboard/vendor-payout-card";
import { SupportCta } from "@/components/dashboard/support-cta";
import { GlassTable } from "@/components/dashboard/glass-table";
import { cn } from "@/lib/utils";
import { Receipt } from "lucide-react";

// Demo data for the dashboard
const VENDOR_STATS = [
  {
    title: "Today's Earnings",
    value: "NPR 4,250",
    trend: { value: "+12.5%", isPositive: true },
    progress: 75,
  },
  {
    title: "Active Rentals",
    value: "8",
    suffix: "/ 12 total slots",
    subtext: "4 available for rent",
  },
  {
    title: "Station Health",
    value: "98%",
    icon: "check_circle",
    subtext: "Next maintenance: 15 Oct",
  },
];

const RECENT_TRANSACTIONS = [
  { id: "#CG-8821", customer: "Aditya K.", duration: "2h 15m", amount: "NPR 150", status: "Completed" },
  { id: "#CG-8822", customer: "Riya S.", duration: "Active", amount: "--", status: "In Use" },
  { id: "#CG-8819", customer: "Binod T.", duration: "45m", amount: "NPR 80", status: "Completed" },
];

const PAYOUT_ACTIVITY: PayoutActivity[] = [
  { id: "1", amount: "NPR 5,000", date: "Oct 12, 2023", status: "PENDING" },
  { id: "2", amount: "NPR 12,000", date: "Oct 05, 2023", status: "PAID" },
];

export default function VendorDashboard() {
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
          <p className="text-text-secondary text-sm">
            Station ID: CG-ST-88291 • Kathmandu, Nepal
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
      <VendorStats stats={VENDOR_STATS} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Rental Volume + Transactions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Rental Volume Chart */}
          <div className="dashboard-card p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Rental Volume</h3>
              <div className="flex bg-white/5 rounded-lg p-1">
                <button className="px-3 py-1 text-xs font-bold bg-primary text-black rounded-md">Week</button>
                <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-white transition-all">Month</button>
                <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-white transition-all">Year</button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-4 px-2">
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '40%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '60%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '55%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '85%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '75%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '95%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '80%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
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
            balance="NPR 18,400"
            recentActivity={PAYOUT_ACTIVITY}
          />
          <SupportCta />
        </div>
      </div>
    </div>
  );
}
