"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/stats-card";
import { MOCK_DATA } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Wallet, History, ArrowDownCircle } from "lucide-react";

export default function VendorPayouts() {
  const stats = [
    {
      title: "Available Balance",
      value: "NPR 12,450",
      icon: Wallet,
      description: "Ready for withdrawal"
    },
    {
      title: "Total Withdrawn",
      value: "NPR 45,000",
      icon: History,
      description: "Lifetime received"
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
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary">My Payouts</h3>
          <p className="text-sm text-text-muted">Track your earnings and payout history</p>
        </div>
        <Button variant="primary" leftIcon={<ArrowDownCircle className="h-4 w-4" />}>
          Request Payout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <Card className="p-0 overflow-hidden" title="Transaction History">
        <DataTable columns={columns} data={MOCK_DATA.transactions.filter(t => t.type === "DEBIT")} />
      </Card>
    </div>
  );
}
