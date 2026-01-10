"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui/card";
import { MOCK_DATA } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Radio, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VendorStations() {
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
    { header: "Last Heartbeat", accessorKey: "last_heartbeat", render: (row: any) => new Date(row.last_heartbeat).toLocaleString() }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Assigned Stations</h3>
          <p className="text-sm text-text-muted">View status of powerbank stations assigned to your location</p>
        </div>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex items-start gap-3 mb-6">
        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          As a Vendor, you have read-only access to station details. Contact your Franchise for any hardware issues or ejections.
        </p>
      </div>

      <Card className="p-0 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={MOCK_DATA.stations} 
          onRowClick={(row: any) => router.push(`/vendor/stations/${row.id}`)}
          pagination={true}
          pageSize={5}
        />
      </Card>
    </div>
  );
}
