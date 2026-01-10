"use client";

import { GlassTable } from "@/components/dashboard/glass-table";
import { Button } from "@/components/ui/button";
import { MOCK_DATA } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Users, UserPlus, Mail, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FranchiseSubVendors() {
  const router = useRouter();
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
          <span className="font-medium text-white">{row.name}</span>
        </div>
      )
    },
    { header: "Email", accessorKey: "email", className: "text-gray-400" },
    { 
      header: "Status", 
      accessorKey: "status",
      render: (row: any) => (
        <span className={cn(
          "px-2 py-0.5 rounded cursor-default border text-[10px] font-bold tracking-widest",
          row.status === "ACTIVE" 
            ? "bg-primary/10 border-primary/20 text-primary" 
            : "bg-red-500/10 border-red-500/20 text-red-500"
        )}>
          {row.status}
        </span>
      )
    },
    { 
      header: "Actions", 
      accessorKey: "id",
      className: "text-right",
      headerClassName: "text-right",
      render: (row: any) => (
        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
            {/* Breadcrumb removed as per user request */}
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Sub-Vendors</h1>
            <p className="text-gray-500 text-sm font-medium">Manage your partner vendors and their assignments</p>
        </div>
        <Button variant="primary" leftIcon={<UserPlus className="h-4 w-4" />}>
          Add Sub-Vendor
        </Button>
      </div>

      <GlassTable 
        title="Active Vendors"
        icon={<Users className="h-5 w-5" />}
        columns={columns} 
        data={vendors} 
        onRowClick={(row: any) => router.push(`/franchise/sub-vendors/${row.id}`)}
        searchPlaceholder="Search vendors..."
      />
    </div>
  );
}
