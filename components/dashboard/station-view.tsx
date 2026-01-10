"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StationViewProps {
  role: "franchise" | "vendor";
  stationId: string;
}

import { MOCK_DATA } from "@/lib/mockData";
import { toast } from "sonner";

import { WifiConnectModal } from "./wifi-connect-modal";

export function StationView({ role, stationId }: StationViewProps) {
  const [selectedSlot, setSelectedSlot] = React.useState<number | null>(null);
  const [isWifiModalOpen, setIsWifiModalOpen] = React.useState(false);

  const station = MOCK_DATA.stations.find((s) => s.id === stationId);
  const stationDisplay = station ? station.station_name : `Station ${stationId}`;

  const handleScanWifi = () => {
    toast.info("Scanning for networks...", {
        duration: 2000,
        onAutoClose: () => {
            toast.success("Scan Complete", { description: "Found 4 available networks." });
        }
    });
  }

  return (
    <div className="space-y-6">
      {/* Header / Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">{stationDisplay}</h1>
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            ONLINE
          </span>
        </div>
        <div className="flex items-center gap-3">
          {role === "franchise" && (
            <button className="px-4 py-2 rounded-lg border border-border-dark bg-transparent text-gray-300 text-sm font-medium hover:bg-white/5 hover:border-gray-600 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">eject</span>
              Random Eject
            </button>
          )}
          <button className="px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/5 text-red-500 text-sm font-medium hover:bg-red-500/10 hover:border-red-500/50 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            Reboot Station
          </button>
          {role === "franchise" ? (
            <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-black font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
              Check Station
            </button>
          ) : (
            <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-black font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
              Check Station
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Station Overview */}
        <div className="lg:col-span-2 dashboard-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">info</span>
              Station Overview
            </h3>
            <span className="text-xs text-gray-500 font-mono">ID: {stationId}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</span>
              <p className="text-base text-gray-200 font-mono tracking-wide">86701606982{stationId}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">IMEI</span>
              <p className="text-base text-gray-200 font-mono tracking-wide">356938035643892</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Coordinates</span>
              <div className="flex items-center gap-2">
                <p className="text-base text-gray-200 font-mono">27.7172° N, 85.3240° E</p>
                <button className="text-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Address</span>
              <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-md w-fit border border-yellow-500/20">
                <span className="material-symbols-outlined text-sm">warning</span>
                <p className="text-sm font-medium">Pending Configuration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hardware Info */}
        <div className="lg:col-span-1 dashboard-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">router</span>
              Hardware Info
            </h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">signal_cellular_alt</span>
                <span className="text-sm text-gray-400">Signal Strength</span>
              </div>
              <span className="font-mono font-medium">-37 dBm</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">system_update</span>
                <span className="text-sm text-gray-400">Firmware</span>
              </div>
              <span className="font-mono font-medium">v2.1.5</span>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Heartbeat</span>
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                2025-12-15 16:25
              </p>
            </div>
          </div>
        </div>

        {/* WiFi Settings */}
        <div className="lg:col-span-1 dashboard-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">wifi</span>
              WiFi Settings
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <button 
                onClick={handleScanWifi}
                className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-black text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">wifi_find</span>
              Scan WiFi
            </button>
            <button 
                onClick={() => setIsWifiModalOpen(true)}
                className="w-full py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add_link</span>
              Connect WiFi
            </button>
            <button className="w-full py-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 hover:bg-orange-500/20 text-sm font-bold transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">priority_high</span>
              WiFi Priority
            </button>
            <button className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 text-sm font-bold transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">signal_cellular_alt</span>
              4G Priority
            </button>
          </div>
        </div>
      </div>

      {/* Slot Management */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Slot Management</h2>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> Available</span>
            <span className="flex items-center gap-1 ml-2"><span className="w-2 h-2 rounded-full bg-gray-600"></span> Empty</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((slot) => (
            <div 
              key={slot}
              onClick={() => role === "franchise" && setSelectedSlot(slot)}
              className={cn(
                "dashboard-card p-4 flex flex-col items-center justify-center gap-3 transition-all group relative overflow-hidden bg-surface",
                role === "franchise" 
                  ? "cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 active:scale-95" 
                  : "cursor-default opacity-80"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-xs font-medium text-gray-500 uppercase z-10">Slot {slot}</span>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-4xl text-primary">battery_0_bar</span>
              </div>
              <div className="text-center z-10">
                <p className="text-xs font-bold mb-0.5">AVAILABLE</p>
                <p className="text-[10px] text-gray-400">0% Battery</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="mt-12 mb-4 text-center text-xs text-gray-600">
          Charge Ghar © 2025 Station Management System.
      </footer>

      {/* Eject Popup Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card-dark border border-border-dark p-6 rounded-2xl w-full max-w-sm shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                 <span className="material-symbols-outlined text-3xl text-primary">eject</span>
              </div>
              <h3 className="text-xl font-bold text-white">Eject Powerbank?</h3>
              <p className="text-gray-400 text-sm">
                Are you sure you want to eject the powerbank from <span className="text-primary font-bold">Slot {selectedSlot}</span>?
              </p>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button 
                  onClick={() => setSelectedSlot(null)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 font-bold text-sm transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    toast.success(`Powerbank ejected successfully from Slot ${selectedSlot}`);
                    setSelectedSlot(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-black font-bold text-sm shadow-lg shadow-primary/20 transition-all"
                >
                  Confirm Eject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WiFi Connection Modal */}
      <WifiConnectModal 
        isOpen={isWifiModalOpen}
        onClose={() => setIsWifiModalOpen(false)}
        stationId={stationId}
      />
    </div>
  );
}
