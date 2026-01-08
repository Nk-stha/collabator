"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui/card";
import { MOCK_DATA } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { 
  Radio, 
  Wallet, 
  Activity,
  History
} from "lucide-react";

export default function VendorDashboard() {
  const stats = [
    {
      title: "My Stations",
      value: "3",
      icon: Radio,
      description: "Assigned by Franchise"
    },
    {
      title: "Earnings (Available)",
      value: "NPR 12,450",
      icon: Wallet,
      trend: { value: 5, isPositive: true },
      description: "Ready for payout"
    },
    {
      title: "Active Rentals",
      value: "14",
      icon: Activity,
      description: "Current users"
    },
    {
      title: "Total Payouts",
      value: "NPR 45,000",
      icon: History,
      description: "Lifetime received"
    }
  ];

  const transactionColumns = [
    { header: "Date", accessorKey: "created_at", render: (row: any) => new Date(row.created_at).toLocaleDateString() },
    { header: "Reference", accessorKey: "transaction_id" },
    { header: "Amount", accessorKey: "amount", render: (row: any) => `NPR ${row.amount || row.points || 0}` },
    { header: "Status", accessorKey: "status", render: (row: any) => (
      <span className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        row.status === "COMPLETED" || row.status === "SUCCESS" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
      )}>
        {row.status}
      </span>
    )}
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6" title="Recent Payouts">
          <DataTable 
            columns={transactionColumns} 
            data={MOCK_DATA.transactions.filter(t => t.type === "DEBIT").slice(0, 5)} 
          />
        </Card>

        <Card className="p-6" title="Active Station Status">
          <div className="space-y-6 mt-4">
            {MOCK_DATA.stations.slice(0, 3).map((station) => (
              <div key={station.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center border",
                    station.status === "ONLINE" ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
                  )}>
                    <Radio className={cn("h-5 w-5", station.status === "ONLINE" ? "text-green-500" : "text-red-500")} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{station.station_name}</p>
                    <p className="text-xs text-text-muted">{station.serial_number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold",
                    station.status === "ONLINE" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  )}>
                    {station.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
