"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileText, Plus, Download, Eye } from "lucide-react";

export default function FranchiseAgreements() {
  const mockAgreements = [
    {
      id: "AGR-001",
      vendor: "TechSolutions Vendor",
      type: "Percentage Split",
      value: "20% Revenue",
      startDate: "2025-01-01",
      status: "ACTIVE"
    },
    {
      id: "AGR-002",
      vendor: "CityCenter Mall",
      type: "Fixed Price",
      value: "NPR 5,000/mo",
      startDate: "2025-02-15",
      status: "PENDING"
    }
  ];

  const columns = [
    { header: "Agreement ID", accessorKey: "id" },
    { header: "Vendor", accessorKey: "vendor" },
    { header: "Model Type", accessorKey: "type" },
    { header: "Value", accessorKey: "value" },
    { header: "Start Date", accessorKey: "startDate" },
    { 
      header: "Status", 
      accessorKey: "status",
      render: (row: any) => (
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          row.status === "ACTIVE" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
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
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Agreements</h3>
          <p className="text-sm text-text-muted">Manage contracts and revenue models with your vendors</p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
          Create Agreement
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <DataTable columns={columns} data={mockAgreements} />
      </Card>
    </div>
  );
}
