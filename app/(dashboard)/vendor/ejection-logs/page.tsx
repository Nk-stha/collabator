"use client";

import { EjectionView } from "@/components/dashboard/ejection-view";
import { useApi } from "@/hooks/use-api";
import { ejectionService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import type { EjectionStat } from "@/components/dashboard/ejection-stats";
import type { EjectionLog } from "@/components/dashboard/ejection-view";

export default function VendorEjectionLogs() {
  const { data: historyData, loading, error, refetch } = useApi(() => 
    ejectionService.getIoTHistory({ page: 1, page_size: 50 })
  );

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!historyData?.data) {
    return <ErrorDisplay error={new Error("No data available") as any} onRetry={refetch} />;
  }

  const { results, pagination } = historyData.data;

  // Calculate stats from the data
  const totalEjections = pagination.total_count;
  const successfulEjections = results.filter(r => r.is_successful).length;
  const lastEvent = results.length > 0 ? results[0] : null;
  
  // Calculate minutes ago for last event
  const minutesAgo = lastEvent 
    ? Math.floor((Date.now() - new Date(lastEvent.created_at).getTime()) / 60000)
    : 0;

  const stats: EjectionStat[] = [
    {
      title: "Total Actions",
      value: totalEjections.toString(),
      icon: "outbox",
      trend: { 
        value: `${successfulEjections}/${totalEjections}`, 
        label: "Successful", 
        isPositive: true 
      },
    },
    {
      title: "Action Types",
      value: new Set(results.map(r => r.action_type)).size.toString(),
      icon: "category",
      highlight: true,
      trend: { value: "Unique Types", label: "" },
    },
    {
      title: "Last Event",
      value: minutesAgo.toString(),
      unit: "min ago",
      icon: "history",
      timestamp: lastEvent ? new Date(lastEvent.created_at).toLocaleString() : "N/A",
    },
  ];

  // Map API data to EjectionLog format
  const logs: EjectionLog[] = results.map((record) => ({
    id: record.id,
    timestamp: new Date(record.created_at).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    stationName: record.action_type, // Action Type column
    powerbankId: record.powerbank_sn || 'N/A', // Powerbank SN column
    type: (record.performed_from === 'ADMIN_PANEL' ? 'Single Eject' : 'Bulk Eject') as "Single Eject" | "Bulk Eject", // Performed From column
    status: record.is_successful ? 'SUCCESS' : 'FAILED',
  }));

  return (
    <EjectionView 
      stats={stats} 
      logs={logs} 
      role="vendor" 
    />
  );
}
