"use client";

import { useState } from "react";
import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  Plus, 
  Download, 
  Eye, 
  Calendar, 
  CheckCircle,
  Briefcase,
  Users
} from "lucide-react";

export default function FranchiseAgreements() {
  const [activeTab, setActiveTab] = useState<"master" | "vendors">("master");

  const masterAgreement = {
    id: "M-AGR-F-501",
    partner: "Chargeghar Centrals",
    type: "Master Franchise Deal",
    upfrontAmount: "NPR 500,000",
    stationsCount: "50 Stations",
    revenueModel: "15% Service Fee to Chargeghar",
    startDate: "2025-01-01",
    status: "ACTIVE",
    terms: [
      "Initial upfront payment for hardware",
      "15% percentage of total earnings to Chargeghar",
      "Full maintenance responsibility by Franchise",
      "Manual payout release by Admin",
      "Sub-vendor payment management by Franchise"
    ]
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Agreements Management</h3>
          <p className="text-sm text-text-muted">Manage your master contract and sub-vendor agreements</p>
        </div>
        <div className="flex items-center gap-2 bg-surface p-1 rounded-xl border border-border">
          <button
            onClick={() => setActiveTab("master")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "master" 
                ? "bg-primary text-white shadow-sm" 
                : "text-text-muted hover:text-text-primary hover:bg-gray-50/50 dark:hover:bg-white/5"
            )}
          >
            <Briefcase className="h-4 w-4" />
            My Master Agreement
          </button>
          <button
            onClick={() => setActiveTab("vendors")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === "vendors" 
                ? "bg-primary text-white shadow-sm" 
                : "text-text-muted hover:text-text-primary hover:bg-gray-50/50 dark:hover:bg-white/5"
            )}
          >
            <Users className="h-4 w-4" />
            Vendor Agreements
          </button>
        </div>
      </div>

      {activeTab === "master" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-xl">{masterAgreement.id}</h4>
                  <p className="text-sm text-text-muted">Status: <span className="text-green-500 font-semibold">{masterAgreement.status}</span></p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-muted flex items-center gap-2 justify-end">
                  <Calendar className="h-4 w-4" />
                  Effective: {masterAgreement.startDate}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="space-y-1">
                <p className="text-sm font-medium text-text-muted">Agreement Type</p>
                <p className="text-lg font-bold text-text-primary">{masterAgreement.type}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-text-muted">Upfront Investment</p>
                <p className="text-lg font-bold text-text-primary text-primary">{masterAgreement.upfrontAmount}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-text-muted">Station Capacity</p>
                <p className="text-lg font-bold text-text-primary">{masterAgreement.stationsCount}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-border/50 mb-8">
              <p className="text-sm font-medium text-text-muted mb-1">Revenue Model</p>
              <p className="text-lg font-bold text-text-primary">{masterAgreement.revenueModel}</p>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-text-primary">Master Terms & Obligations</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {masterAgreement.terms.map((term, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-border/50">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-text-primary leading-snug">{term}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h5 className="font-bold text-text-primary mb-4">Official Document</h5>
              <p className="text-sm text-text-muted mb-6">Access your full signed manual agreement document.</p>
              <div className="space-y-4">
                <Button variant="primary" fullWidth leftIcon={<Download className="h-4 w-4" />}>Download PDF</Button>
                <Button variant="ghost" fullWidth leftIcon={<Eye className="h-4 w-4" />}>Preview Online</Button>
              </div>
            </Card>
            
            <Card className="p-6 border-border">
              <h5 className="font-bold text-text-primary mb-2">Need Support?</h5>
              <p className="text-sm text-text-muted mb-4">Questions about your master terms or expansion?</p>
              <Button variant="secondary" fullWidth>Contact Admin</Button>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-text-primary">Vendor Contracts</h4>
            <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
              Create New Agreement
            </Button>
          </div>
          <Card className="p-0 overflow-hidden">
            <DataTable columns={columns} data={mockAgreements} />
          </Card>
        </div>
      )}
    </div>
  );
}
