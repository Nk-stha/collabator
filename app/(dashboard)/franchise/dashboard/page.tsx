"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui/card";
import { MOCK_DATA } from "@/lib/mockData";
import { 
  Radio, 
  Wallet, 
  Users, 
  ArrowUpRight, 
  Activity,
  Battery
} from "lucide-react";

export default function FranchiseDashboard() {
  const stats = [
    {
      title: "Total Stations",
      value: "12",
      icon: Radio,
      trend: { value: 8, isPositive: true },
      description: "2 added this month"
    },
    {
      title: "Available Balance",
      value: "NPR 45,230",
      icon: Wallet,
      trend: { value: 12, isPositive: true },
      description: "Net earnings this period"
    },
    {
      title: "Active Rentals",
      value: "84",
      icon: Activity,
      trend: { value: 5, isPositive: false },
      description: "Currently out on field"
    },
    {
      title: "Sub Vendors",
      value: "5",
      icon: Users,
      trend: { value: 0, isPositive: true },
      description: "Partner vendors"
    }
  ];

  const transactionColumns = [
    { header: "Date", accessorKey: "created_at", render: (row: any) => new Date(row.created_at).toLocaleDateString() },
    { header: "Transaction ID", accessorKey: "transaction_id" },
    { header: "User", accessorKey: "user", render: (row: any) => row.user.username },
    { header: "Type", accessorKey: "type", render: (row: any) => (
      <span className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        row.type === "CREDIT" || row.type === "EARNED" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"
      )}>
        {row.type}
      </span>
    )},
    { header: "Amount", accessorKey: "amount", render: (row: any) => `NPR ${row.amount || row.points || 0}` },
    { header: "Status", accessorKey: "status", render: (row: any) => (
      <span className="flex items-center gap-2">
        <span className={cn(
          "h-2 w-2 rounded-full",
          row.status === "COMPLETED" || row.status === "SUCCESS" ? "bg-green-500" : "bg-yellow-500"
        )} />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-6" title="Recent Transactions">
          <DataTable 
            columns={transactionColumns} 
            data={MOCK_DATA.transactions.slice(0, 5)} 
          />
        </Card>

        <Card className="p-6" title="Station Status Overview">
          <div className="space-y-6 mt-4">
            {MOCK_DATA.stations.slice(0, 4).map((station) => (
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
                  <p className="text-sm font-medium text-text-primary">{station.available_slots}/{station.total_slots}</p>
                  <p className="text-xs text-text-muted">Slots</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// Helper function for class merging (imported from lib/utils)
import { cn } from "@/lib/utils";
