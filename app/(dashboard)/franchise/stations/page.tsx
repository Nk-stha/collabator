"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_DATA } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Radio, Power, ExternalLink, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FranchiseStations() {
  const router = useRouter();
  const columns = [
    { 
      header: "Station Name", 
      accessorKey: "station_name",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <Radio className={cn("h-4 w-4", row.status === "ONLINE" ? "text-green-500" : "text-red-500")} />
          <span className="font-medium text-text-primary">{row.station_name}</span>
        </div>
      )
    },
    { header: "Serial Number", accessorKey: "serial_number" },
    { 
      header: "Slots (Avail/Total)", 
      accessorKey: "available_slots",
      render: (row: any) => `${row.available_slots} / ${row.total_slots}`
    },
    { 
      header: "Status", 
      accessorKey: "status",
      render: (row: any) => (
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          row.status === "ONLINE" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        )}>
          {row.status}
        </span>
      )
    },
    { header: "Last Heartbeat", accessorKey: "last_heartbeat", render: (row: any) => new Date(row.last_heartbeat).toLocaleString() },
    {
      header: "Actions",
      accessorKey: "id",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Power className="h-4 w-4 text-red-500" />
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
          <h3 className="text-lg font-bold text-text-primary">My Stations</h3>
          <p className="text-sm text-text-muted">Manage and monitor your assigned powerbank stations</p>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />}>
          Refresh Status
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={MOCK_DATA.stations} 
          onRowClick={(row: any) => router.push(`/franchise/stations/${row.id}`)}
          pagination={true}
          pageSize={10}
        />
      </Card>
    </div>
  );
}
