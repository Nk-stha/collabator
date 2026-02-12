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
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <DataTable 
            columns={columns} 
            data={data?.data.results || []} 
            onRowClick={(row: any) => router.push(`/vendor/stations/${row.id}`)}
            pagination={true}
            pageSize={10}
          />
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-4 p-4">
          {data?.data.results.map((station: any) => (
            <div
              key={station.id}
              onClick={() => router.push(`/vendor/stations/${station.id}`)}
              className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-primary/20 p-4 hover:bg-white/5 transition-colors cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Radio className={cn("h-5 w-5 shrink-0", station.status === "ONLINE" ? "text-green-500" : "text-red-500")} />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-white truncate">{station.station_name}</h3>
                    <p className="text-xs text-gray-400 font-mono">{station.serial_number}</p>
                  </div>
                </div>
                <span className={cn(
                  "px-2 py-1 rounded-lg text-xs font-bold shrink-0",
                  station.status === "ONLINE" ? "bg-green-500/10 text-green-500" : 
                  station.status === "OFFLINE" ? "bg-red-500/10 text-red-500" :
                  "bg-yellow-500/10 text-yellow-500"
                )}>
                  {station.status}
                </span>
              </div>

              {/* Details Grid */}
              <div className="space-y-3">
                {/* Location */}
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 font-medium mb-1">Location</p>
                  <p className="text-sm text-white">{station.address}</p>
                  {station.landmark && <p className="text-xs text-gray-500 mt-1">{station.landmark}</p>}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-400 font-medium mb-1">Slots</p>
                    <p className="text-sm font-bold text-white">{station.available_slots} / {station.total_slots}</p>
                    <p className="text-xs text-gray-500">Available</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-400 font-medium mb-1">Today's Revenue</p>
                    <p className="text-sm font-bold text-primary">NPR {station.revenue_stats.today_revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{station.revenue_stats.today_transactions} txns</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
