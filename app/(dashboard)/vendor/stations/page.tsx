"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Radio, Info, Search, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/use-api";
import { stationService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function VendorStations() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  
  const { data, isLoading, error, refetch } = useApi(
    () => stationService.getStations({ 
      page, 
      page_size: 10,
      search: search || undefined,
    }),
    [page, search]
  );

  const columns = [
    { 
      header: "Station Name", 
      accessorKey: "station_name",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <Radio className={cn("h-4 w-4", row.status === "ONLINE" ? "text-green-500" : "text-red-500")} />
          <div>
            <p className="font-medium text-text-primary">{row.station_name}</p>
            <p className="text-xs text-text-secondary">{row.serial_number}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Location", 
      accessorKey: "address",
      render: (row: any) => (
        <div className="max-w-xs">
          <p className="text-sm text-text-primary truncate">{row.address}</p>
          {row.landmark && <p className="text-xs text-text-secondary">{row.landmark}</p>}
        </div>
      )
    },
    { 
      header: "Slots", 
      accessorKey: "available_slots",
      render: (row: any) => (
        <div className="text-center">
          <p className="text-sm font-medium text-text-primary">{row.available_slots} / {row.total_slots}</p>
          <p className="text-xs text-text-secondary">Available</p>
        </div>
      )
    },
    { 
      header: "Revenue (Today)", 
      accessorKey: "revenue_stats",
      render: (row: any) => (
        <div className="text-right">
          <p className="text-sm font-medium text-primary">NPR {row.revenue_stats.today_revenue.toLocaleString()}</p>
          <p className="text-xs text-text-secondary">{row.revenue_stats.today_transactions} txns</p>
        </div>
      )
    },
    { 
      header: "Status", 
      accessorKey: "status",
      render: (row: any) => (
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          row.status === "ONLINE" ? "bg-green-500/10 text-green-500" : 
          row.status === "OFFLINE" ? "bg-red-500/10 text-red-500" :
          "bg-yellow-500/10 text-yellow-500"
        )}>
          {row.status}
        </span>
      )
    }
  ];

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!data?.data.results.length && !search) {
    return <EmptyState title="No Stations" message="You don't have any stations assigned yet." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-primary">Assigned Stations</h3>
          <p className="text-sm text-text-muted">
            {data?.data.pagination.total_count} station{data?.data.pagination.total_count !== 1 ? 's' : ''} assigned
          </p>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          leftIcon={<RefreshCw className="h-4 w-4" />}
          onClick={() => refetch()}
        >
          Refresh
        </Button>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          As a Vendor, you have read-only access to station details. Contact your Franchise for any hardware issues or ejections.
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name, serial number, or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={data?.data.results || []} 
          onRowClick={(row: any) => router.push(`/vendor/stations/${row.id}`)}
          pagination={true}
          pageSize={10}
        />
      </Card>
    </div>
  );
}
