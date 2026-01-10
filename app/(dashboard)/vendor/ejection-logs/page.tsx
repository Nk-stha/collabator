"use client";

import { EjectionView, EjectionLog } from "@/components/dashboard/ejection-view";
import { EjectionStat } from "@/components/dashboard/ejection-stats";

const VENDOR_STATS: EjectionStat[] = [
  {
    title: "Total Ejections",
    value: "342",
    icon: "outbox",
    trend: { value: "+5%", label: "Since last 24h", isPositive: true },
  },
  {
    title: "Active Powerbanks",
    value: "105",
    icon: "battery_charging_full",
    highlight: true,
    trend: { value: "Live Network", label: "" },
  },
  {
    title: "Last Event",
    value: "15",
    unit: "min ago",
    icon: "history",
    timestamp: "16-12-2025 14:15:00",
  },
];

const VENDOR_LOGS: EjectionLog[] = [
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
    timestamp: "15-12-2025 10:10:45",
    stationName: "Station 0223",
    powerbankId: "PB-2230",
    type: "Single Eject",
    status: "FAILED",
  },
];

export default function VendorEjectionLogs() {
  return (
    <EjectionView 
        stats={VENDOR_STATS} 
        logs={VENDOR_LOGS} 
        role="vendor" 
    />
  );
}
