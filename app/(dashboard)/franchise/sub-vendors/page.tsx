"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_DATA } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Users, UserPlus, Mail, Phone, ExternalLink } from "lucide-react";

export default function FranchiseSubVendors() {
  const vendors = MOCK_DATA.users.filter(u => u.role === "VENDOR");

  const columns = [
    { 
      header: "Vendor Name", 
      accessorKey: "name",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium text-text-primary">{row.name}</span>
        </div>
      )
    },
    { header: "Email", accessorKey: "email" },
    { 
      header: "Status", 
      accessorKey: "status",
      render: (row: any) => (
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          row.status === "ACTIVE" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        )}>
          {row.status}
        </span>
      )
    },
    { 
      header: "Actions", 
      accessorKey: "id",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Sub-Vendors</h3>
          <p className="text-sm text-text-muted">Manage your partner vendors and their assignments</p>
        </div>
        <Button variant="primary" leftIcon={<UserPlus className="h-4 w-4" />}>
          Add Sub-Vendor
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <DataTable columns={columns} data={vendors} />
      </Card>
    </div>
  );
}
