"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Radio, Power, ExternalLink, RefreshCw, Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/use-api";
import { stationService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";
import { useState } from "react";
import type { Station } from "@/lib/types/station.types";

export default function FranchiseStations() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | ''>('');
  const [page, setPage] = useState(1);
  
  const { data, isLoading, error, refetch } = useApi(
    () => stationService.getStations({ 
      page, 
      page_size: 10,
      search: search || undefined,
      status: statusFilter || undefined,
    }),
    [page, search, statusFilter]
  );

  // Safe number formatter
  const formatNumber = (value: number | null | undefined): string => {
    return (value ?? 0).toLocaleString();
  };

  // Safe station data accessor
  const getStationData = (station: Station | null | undefined) => {
    if (!station) return null;
    return {
      id: station.id ?? '',
      station_name: station.station_name ?? 'Unknown Station',
      serial_number: station.serial_number ?? 'N/A',
      address: station.address ?? 'No address',
      landmark: station.landmark ?? null,
      available_slots: station.available_slots ?? 0,
      total_slots: station.total_slots ?? 0,
      status: station.status ?? 'OFFLINE',
      revenue_stats: {
        today_revenue: station.revenue_stats?.today_revenue ?? 0,
        today_transactions: station.revenue_stats?.today_transactions ?? 0,
      }
    };
  };

  const columns = [
    { 
      header: "Station Name", 
      accessorKey: "station_name",
      render: (row: Station) => {
        const data = getStationData(row);
        if (!data) return <span className="text-text-secondary">-</span>;
        return (
          <div className="flex items-center gap-3">
            <Radio className={cn("h-4 w-4", data.status === "ONLINE" ? "text-green-500" : "text-red-500")} />
            <div>
              <p className="font-medium text-text-primary">{data.station_name}</p>
              <p className="text-xs text-text-secondary">{data.serial_number}</p>
            </div>
          </div>
        );
      }
    },
    { 
      header: "Location", 
      accessorKey: "address",
      render: (row: Station) => {
        const data = getStationData(row);
        if (!data) return <span className="text-text-secondary">-</span>;
        return (
          <div className="max-w-xs">
            <p className="text-sm text-text-primary truncate">{data.address}</p>
            {data.landmark && <p className="text-xs text-text-secondary">{data.landmark}</p>}
          </div>
        );
      }
    },
    { 
      header: "Slots", 
      accessorKey: "available_slots",
      render: (row: Station) => {
        const data = getStationData(row);
        if (!data) return <span className="text-text-secondary">-</span>;
        return (
          <div className="text-center">
            <p className="text-sm font-medium text-text-primary">{data.available_slots} / {data.total_slots}</p>
            <p className="text-xs text-text-secondary">Available</p>
          </div>
        );
      }
    },
    { 
      header: "Revenue (Today)", 
      accessorKey: "revenue_stats",
      render: (row: Station) => {
        const data = getStationData(row);
        if (!data) return <span className="text-text-secondary">-</span>;
        return (
          <div className="text-right">
            <p className="text-sm font-medium text-primary">NPR {formatNumber(data.revenue_stats.today_revenue)}</p>
            <p className="text-xs text-text-secondary">{data.revenue_stats.today_transactions} txns</p>
          </div>
        );
      }
    },
    { 
      header: "Status", 
      accessorKey: "status",
      render: (row: Station) => {
        const data = getStationData(row);
        if (!data) return <span className="text-text-secondary">-</span>;
        return (
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            data.status === "ONLINE" ? "bg-green-500/10 text-green-500" : 
            data.status === "OFFLINE" ? "bg-red-500/10 text-red-500" :
            "bg-yellow-500/10 text-yellow-500"
          )}>
            {data.status}
          </span>
        );
      }
    },
    {
      header: "Actions",
      accessorKey: "id",
      render: (row: Station) => {
        const data = getStationData(row);
        if (!data) return null;
        return (
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/franchise/stations/${data.id}`);
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        );
      }
    }
  ];

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  
  const stations = data?.data?.results ?? [];
  const pagination = data?.data?.pagination;
  const totalCount = pagination?.total_count ?? 0;

  if (stations.length === 0 && !search && !statusFilter) {
    return <EmptyState title="No Stations" message="You don't have any stations assigned yet." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary">My Stations</h3>
          <p className="text-sm text-text-muted">
            {totalCount} station{totalCount !== 1 ? 's' : ''} total
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

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, serial number, or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-4 py-2 rounded-xl border border-border bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="">All Status</option>
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
          </div>
        </div>
      </Card>

      {stations.length === 0 ? (
        <Card className="p-12">
          <EmptyState 
            title="No Results" 
            message="No stations match your search criteria. Try adjusting your filters." 
          />
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <DataTable 
              columns={columns} 
              data={stations} 
              onRowClick={(row: Station) => {
                const data = getStationData(row);
                if (data) router.push(`/franchise/stations/${data.id}`);
              }}
              pagination={true}
              pageSize={10}
            />
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4 p-4">
            {stations.map((station) => {
              const data = getStationData(station);
              if (!data) return null;
              
              return (
                <div
                  key={data.id}
                  onClick={() => router.push(`/franchise/stations/${data.id}`)}
                  className="bg-[#171712]/60 backdrop-blur-xl rounded-xl border border-primary/20 p-4 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Radio className={cn("h-5 w-5 shrink-0", data.status === "ONLINE" ? "text-green-500" : "text-red-500")} />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-white truncate">{data.station_name}</h3>
                        <p className="text-xs text-gray-400 font-mono">{data.serial_number}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-xs font-bold shrink-0",
                      data.status === "ONLINE" ? "bg-green-500/10 text-green-500" : 
                      data.status === "OFFLINE" ? "bg-red-500/10 text-red-500" :
                      "bg-yellow-500/10 text-yellow-500"
                    )}>
                      {data.status}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-3">
                    {/* Location */}
                    <div className="p-3 bg-white/5 rounded-lg">
                      <p className="text-xs text-gray-400 font-medium mb-1">Location</p>
                      <p className="text-sm text-white">{data.address}</p>
                      {data.landmark && <p className="text-xs text-gray-500 mt-1">{data.landmark}</p>}
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-xs text-gray-400 font-medium mb-1">Slots</p>
                        <p className="text-sm font-bold text-white">{data.available_slots} / {data.total_slots}</p>
                        <p className="text-xs text-gray-500">Available</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-xs text-gray-400 font-medium mb-1">Today's Revenue</p>
                        <p className="text-sm font-bold text-primary">NPR {formatNumber(data.revenue_stats.today_revenue)}</p>
                        <p className="text-xs text-gray-500">{data.revenue_stats.today_transactions} txns</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
