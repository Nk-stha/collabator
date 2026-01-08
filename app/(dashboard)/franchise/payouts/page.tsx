"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/stats-card";
import { MOCK_DATA } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Wallet, ArrowDownCircle, History, Filter } from "lucide-react";

export default function FranchisePayouts() {
  const stats = [
    {
      title: "Available Balance",
      value: "NPR 45,230",
      icon: Wallet,
      description: "Minimum payout: NPR 1,000"
    },
    {
      title: "Pending Payouts",
      value: "NPR 0",
      icon: History,
      description: "Currently being processed"
    },
    {
      title: "Total Withdrawn",
      value: "NPR 1,20,500",
      icon: ArrowDownCircle,
      description: "Lifetime earnings withdrawn"
    }
  ];

  const columns = [
    { header: "Date", accessorKey: "created_at", render: (row: any) => new Date(row.created_at).toLocaleDateString() },
    { header: "Reference", accessorKey: "transaction_id" },
    { header: "Amount", accessorKey: "amount", render: (row: any) => `NPR ${row.amount || row.points || 0}` },
    { 
      header: "Status", 
      accessorKey: "status",
      render: (row: any) => (
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          row.status === "COMPLETED" || row.status === "SUCCESS" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
        )}>
          {row.status}
        </span>
      )
    },
    { header: "Method", accessorKey: "source", render: (row: any) => row.source.toUpperCase() }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Payouts</h3>
          <p className="text-sm text-text-muted">Manage your earnings and request withdrawals</p>
        </div>
        <Button variant="primary" leftIcon={<ArrowDownCircle className="h-4 w-4" />}>
          Request Payout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <Card className="p-0 overflow-hidden" title="Payout History">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h4 className="font-semibold text-text-primary">Recent History</h4>
          <Button variant="ghost" size="sm" leftIcon={<Filter className="h-4 w-4" />}>
            Filter
          </Button>
        </div>
        <DataTable columns={columns} data={MOCK_DATA.transactions} />
      </Card>
    </div>
  );
}
