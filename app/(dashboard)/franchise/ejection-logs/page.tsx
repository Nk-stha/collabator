"use client";

import { EjectionView, EjectionLog } from "@/components/dashboard/ejection-view";
import { EjectionStat } from "@/components/dashboard/ejection-stats";

const FRANCHISE_STATS: EjectionStat[] = [
  {
    title: "Total Ejections",
    value: "1,240",
    icon: "outbox",
    trend: { value: "+12%", label: "Since last 24h", isPositive: true },
  },
  {
    title: "Active Powerbanks",
    value: "458",
    icon: "battery_charging_full",
    highlight: true,
    trend: { value: "Live Network", label: "" },
  },
  {
    title: "Last Event",
    value: "2",
    unit: "min ago",
    icon: "history",
    timestamp: "16-12-2025 14:32:05",
  },
];

const FRANCHISE_LOGS: EjectionLog[] = [
  {
    id: "1",
    timestamp: "16-12-2025 14:30:15",
    stationName: "Station 1609",
    powerbankId: "PB-1022",
    type: "Bulk Eject",
    status: "SUCCESS",
  },
  {
    id: "2",
    timestamp: "16-12-2025 14:15:02",
    stationName: "Station 0223",
    powerbankId: "PB-4491",
    type: "Single Eject",
    status: "SUCCESS",
  },
  {
    id: "3",
    timestamp: "15-12-2025 22:10:45",
    stationName: "Station 3607",
    powerbankId: "PB-2230",
    type: "Single Eject",
    status: "FAILED",
  },
  {
    id: "4",
    timestamp: "15-12-2025 18:45:12",
    stationName: "Station 1609",
    powerbankId: "PB-8820",
    type: "Bulk Eject",
    status: "SUCCESS",
  },
];

export default function FranchiseEjectionLogs() {
  return (
    <EjectionView 
        stats={FRANCHISE_STATS} 
        logs={FRANCHISE_LOGS} 
        role="franchise" 
    />
  );
}
