"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StationViewProps {
  role: "franchise" | "vendor";
  stationId: string;
}

import { toast } from "sonner";
import { useApi } from "@/hooks/use-api";
import { stationService } from "@/lib/services";
import { PageLoader } from "@/components/ui/page-loader";
import { ErrorDisplay } from "@/components/ui/error-display";
import { EmptyState } from "@/components/ui/empty-state";

import { WifiConnectModal } from "./wifi-connect-modal";
import { StationCheckModal } from "./station-check-modal";
import { WifiScanModal } from "./wifi-scan-modal";
import { VolumeControlModal } from "./volume-control-modal";
import type { StationCheckResponse, WifiScanResponse } from "@/lib/types";

export function StationView({ role, stationId }: StationViewProps) {
  const [selectedSlot, setSelectedSlot] = React.useState<number | null>(null);
  const [selectedPowerbank, setSelectedPowerbank] = React.useState<{ sn: string; slotNumber: number } | null>(null);
  const [isWifiModalOpen, setIsWifiModalOpen] = React.useState(false);
  const [isVolumeModalOpen, setIsVolumeModalOpen] = React.useState(false);
  const [isCheckingStation, setIsCheckingStation] = React.useState(false);
  const [isEjecting, setIsEjecting] = React.useState(false);
  const [isScanningWifi, setIsScanningWifi] = React.useState(false);
  const [isRebooting, setIsRebooting] = React.useState(false);
  const [isSettingMode, setIsSettingMode] = React.useState<'wifi' | '4g' | null>(null);
  const [checkResult, setCheckResult] = React.useState<StationCheckResponse | null>(null);
  const [wifiScanResult, setWifiScanResult] = React.useState<WifiScanResponse | null>(null);
  const [isCheckModalOpen, setIsCheckModalOpen] = React.useState(false);
  const [isWifiScanModalOpen, setIsWifiScanModalOpen] = React.useState(false);
  const [preselectedSSID, setPreselectedSSID] = React.useState<string | undefined>(undefined);

  const { data: response, loading, error, refetch } = useApi(() => stationService.getStationById(stationId));

  const handleScanWifi = async () => {
    setIsScanningWifi(true);
    try {
      const result = await stationService.scanWifi({
        station_id: stationId,
      });

      if (result.success) {
        setWifiScanResult(result);
        setIsWifiScanModalOpen(true);
        toast.success("WiFi scan completed", {
          description: `Found ${result.data.networks.length} network${result.data.networks.length !== 1 ? 's' : ''}`,
        });
      }
    } catch (error: any) {
      toast.error("WiFi scan failed", {
        description: error?.message || "Please try again",
      });
    } finally {
      setIsScanningWifi(false);
    }
  };

  const handleCheckStation = async () => {
    setIsCheckingStation(true);
    try {
      const result = await stationService.checkStation({
        station_id: stationId,
        include_empty: true,
        checkAll: true,
      });

      if (result.success) {
        setCheckResult(result);
        setIsCheckModalOpen(true);
        toast.success("Station check completed", {
          description: result.data.message || "Station is operating normally",
        });
        // Optionally refetch station data to get updated status
        refetch();
      }
    } catch (error: any) {
      toast.error("Station check failed", {
        description: error?.message || "Please try again",
      });
    } finally {
      setIsCheckingStation(false);
    }
  };

  const handleRandomEject = async () => {
    setIsEjecting(true);
    try {
      const result = await stationService.ejectPowerbank({
        station_id: stationId,
        reason: "Random eject requested by franchise",
      });

      if (result.success) {
        toast.success("Powerbank ejected successfully", {
          description: result.data?.message || "Random powerbank has been ejected",
        });
        refetch();
      }
    } catch (error: any) {
      toast.error("Eject failed", {
        description: error?.message || "No available powerbank or device timeout",
      });
    } finally {
      setIsEjecting(false);
    }
  };

  const handleSpecificEject = async (powerbankSn: string, slotNumber: number) => {
    setIsEjecting(true);
    try {
      const result = await stationService.ejectPowerbank({
        station_id: stationId,
        powerbank_sn: powerbankSn,
        reason: `Eject powerbank from slot ${slotNumber}`,
      });

      if (result.success) {
        toast.success(`Powerbank ejected from Slot ${slotNumber}`, {
          description: result.data?.message || "Powerbank has been ejected successfully",
        });
        setSelectedSlot(null);
        setSelectedPowerbank(null);
        refetch();
      }
    } catch (error: any) {
      toast.error("Eject failed", {
        description: error?.message || "Failed to eject powerbank",
      });
    } finally {
      setIsEjecting(false);
    }
  };

  const handleRebootStation = async () => {
    setIsRebooting(true);
    try {
      const result = await stationService.rebootStationNew({
        station_id: stationId,
      });

      if (result.success) {
        toast.success("Station reboot initiated", {
          description: result.data.message || "Station is rebooting...",
        });
        // Optionally refetch station data after a delay
        setTimeout(() => {
          refetch();
        }, 5000);
      }
    } catch (error: any) {
      toast.error("Reboot failed", {
        description: error?.message || "Failed to reboot station",
      });
    } finally {
      setIsRebooting(false);
    }
  };

  const handleSetNetworkMode = async (mode: 'wifi' | '4g') => {
    setIsSettingMode(mode);
    try {
      const result = await stationService.setNetworkMode({
        station_id: stationId,
        mode,
      });

      if (result.success) {
        toast.success(`Network mode set to ${mode.toUpperCase()}`, {
          description: result.data.message || `Station is now prioritizing ${mode.toUpperCase()}`,
        });
      }
    } catch (error: any) {
      toast.error("Failed to set network mode", {
        description: error?.message || "Please try again",
      });
    } finally {
      setIsSettingMode(null);
    }
  };

  if (loading) return <PageLoader />;
  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (!response?.data) return <EmptyState message="Station not found" />;

  const station = response.data;
  const stationDisplay = station.station_name;

  return (
    <div className="space-y-6">
      {/* Header / Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">{stationDisplay}</h1>
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5",
            station.status === 'ONLINE' && "bg-primary/10 border border-primary/20 text-primary",
            station.status === 'OFFLINE' && "bg-red-500/10 border border-red-500/20 text-red-500",
            station.status === 'MAINTENANCE' && "bg-yellow-500/10 border border-yellow-500/20 text-yellow-500"
          )}>
            <span className={cn(
              "w-1.5 h-1.5 rounded-full",
              station.status === 'ONLINE' && "bg-primary animate-pulse",
              station.status === 'OFFLINE' && "bg-red-500",
              station.status === 'MAINTENANCE' && "bg-yellow-500"
            )}></span>
            {station.status}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {role === "franchise" && (
            <button 
              onClick={handleRandomEject}
              disabled={isEjecting}
              className="px-4 py-2 rounded-lg border border-border-dark bg-transparent text-gray-300 text-sm font-medium hover:bg-white/5 hover:border-gray-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEjecting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">hourglass_bottom</span>
                  Ejecting...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">eject</span>
                  Random Eject
                </>
              )}
            </button>
          )}
          <button 
            onClick={handleRebootStation}
            disabled={isRebooting}
            className="px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/5 text-red-500 text-sm font-medium hover:bg-red-500/10 hover:border-red-500/50 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRebooting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">hourglass_bottom</span>
                Rebooting...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                Reboot Station
              </>
            )}
          </button>
          <button 
            onClick={handleCheckStation}
            disabled={isCheckingStation}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-black font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCheckingStation ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">hourglass_bottom</span>
                Checking...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">fact_check</span>
                Check Station
              </>
            )}
          </button>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</span>
              <p className="text-base text-gray-200 font-mono tracking-wide">{station.serial_number}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">IMEI</span>
              <p className="text-base text-gray-200 font-mono tracking-wide">{station.imei}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Coordinates</span>
              <div className="flex items-center gap-2">
                <p className="text-base text-gray-200 font-mono">
                  {station.latitude.toFixed(4)}° N, {station.longitude.toFixed(4)}° E
                </p>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${station.latitude}, ${station.longitude}`);
                    toast.success("Coordinates copied to clipboard");
                  }}
                  className="text-primary hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Address</span>
              {station.address ? (
                <p className="text-sm text-gray-300">{station.address}</p>
              ) : (
                <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-md w-fit border border-yellow-500/20">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  <p className="text-sm font-medium">Pending Configuration</p>
                </div>
              )}
            </div>
            {station.landmark && (
              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Landmark</span>
                <p className="text-sm text-gray-300">{station.landmark}</p>
              </div>
            )}
            {station.description && (
              <div className="space-y-1 md:col-span-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Description</span>
                <p className="text-sm text-gray-300">{station.description}</p>
              </div>
            )}
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Operating Hours</span>
              <p className="text-sm text-gray-300">
                {station.opening_time} - {station.closing_time}
              </p>
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
                <span className="material-symbols-outlined text-gray-400">memory</span>
                <span className="text-sm text-gray-400">Model</span>
              </div>
              <span className="font-mono font-medium">{station.hardware_info.model}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">system_update</span>
                <span className="text-sm text-gray-400">Version</span>
              </div>
              <span className="font-mono font-medium">{station.hardware_info.version}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">factory</span>
                <span className="text-sm text-gray-400">Manufacturer</span>
              </div>
              <span className="font-mono font-medium">{station.hardware_info.manufacturer}</span>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Heartbeat</span>
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                {new Date(station.last_heartbeat).toLocaleString()}
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
                disabled={isScanningWifi}
                className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-black text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isScanningWifi ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">hourglass_bottom</span>
                  Scanning...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">wifi_find</span>
                  Scan WiFi
                </>
              )}
            </button>
            <button 
                onClick={() => setIsWifiModalOpen(true)}
                disabled={isSettingMode !== null}
                className="w-full py-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">add_link</span>
              Connect WiFi
            </button>
            <button 
                onClick={() => handleSetNetworkMode('wifi')}
                disabled={isSettingMode !== null}
                className="w-full py-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 hover:bg-orange-500/20 text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSettingMode === 'wifi' ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">hourglass_bottom</span>
                  Setting...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">priority_high</span>
                  WiFi Priority
                </>
              )}
            </button>
            <button 
                onClick={() => handleSetNetworkMode('4g')}
                disabled={isSettingMode !== null}
                className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSettingMode === '4g' ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">hourglass_bottom</span>
                  Setting...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">signal_cellular_alt</span>
                  4G Priority
                </>
              )}
            </button>
            <button
              onClick={() => setIsVolumeModalOpen(true)}
              className="w-full py-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">volume_up</span>
              Volume Control
            </button>
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      {station.amenities && station.amenities.length > 0 && (
        <div className="dashboard-card p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">local_convenience_store</span>
            Available Amenities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {station.amenities.map((amenity) => (
              <div 
                key={amenity.id}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border transition-all",
                  amenity.is_available 
                    ? "bg-primary/5 border-primary/20 text-primary" 
                    : "bg-gray-500/5 border-gray-500/20 text-gray-500"
                )}
              >
                <span className="material-symbols-outlined text-2xl">{amenity.icon}</span>
                <span className="text-xs font-medium text-center">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slot Management */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Slot Management</h2>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> Available</span>
            <span className="flex items-center gap-1 ml-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Occupied</span>
            <span className="flex items-center gap-1 ml-2"><span className="w-2 h-2 rounded-full bg-gray-600"></span> Empty</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {station.slots.map((slot) => {
            const statusColor = 
              slot.status === 'AVAILABLE' ? 'text-primary' :
              slot.status === 'OCCUPIED' ? 'text-yellow-500' :
              'text-gray-600';
            
            const batteryIcon = 
              slot.battery_level >= 80 ? 'battery_full' :
              slot.battery_level >= 60 ? 'battery_5_bar' :
              slot.battery_level >= 40 ? 'battery_3_bar' :
              slot.battery_level >= 20 ? 'battery_2_bar' :
              slot.battery_level > 0 ? 'battery_1_bar' :
              'battery_0_bar';

            return (
              <div 
                key={slot.id}
                onClick={() => {
                  if (role === "franchise" && slot.status === 'AVAILABLE' && slot.powerbank) {
                    setSelectedSlot(slot.slot_number);
                    setSelectedPowerbank({
                      sn: slot.powerbank.serial_number,
                      slotNumber: slot.slot_number
                    });
                  }
                }}
                className={cn(
                  "dashboard-card p-4 flex flex-col items-center justify-center gap-3 transition-all group relative overflow-hidden bg-surface",
                  role === "franchise" && slot.status === 'AVAILABLE' && slot.powerbank
                    ? "cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 active:scale-95" 
                    : "cursor-default opacity-80"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-xs font-medium text-gray-500 uppercase z-10">Slot {slot.slot_number}</span>
                <div className="relative z-10">
                  <span className={cn("material-symbols-outlined text-4xl", statusColor)}>{batteryIcon}</span>
                </div>
                <div className="text-center z-10">
                  <p className="text-xs font-bold mb-0.5">{slot.status}</p>
                  <p className="text-[10px] text-gray-400">{slot.battery_level}% Battery</p>
                  {slot.powerbank && (
                    <p className="text-[10px] text-gray-500 mt-1 font-mono">{slot.powerbank.serial_number}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <footer className="mt-12 mb-4 text-center text-xs text-gray-600">
          Charge Ghar © 2025 Station Management System.
      </footer>

      {/* Eject Popup Modal */}
      {selectedSlot && selectedPowerbank && (
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
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs text-gray-500 mb-1">Powerbank SN</p>
                <p className="text-sm font-mono text-white">{selectedPowerbank.sn}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button 
                  onClick={() => {
                    setSelectedSlot(null);
                    setSelectedPowerbank(null);
                  }}
                  disabled={isEjecting}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 font-bold text-sm transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleSpecificEject(selectedPowerbank.sn, selectedSlot)}
                  disabled={isEjecting}
                  className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-black font-bold text-sm shadow-lg shadow-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isEjecting ? (
                    <>
                      <span className="material-symbols-outlined text-sm animate-spin">hourglass_bottom</span>
                      Ejecting...
                    </>
                  ) : (
                    "Confirm Eject"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WiFi Connection Modal */}
      <WifiConnectModal 
        isOpen={isWifiModalOpen}
        onClose={() => {
          setIsWifiModalOpen(false);
          setPreselectedSSID(undefined);
        }}
        stationId={stationId}
        availableNetworks={wifiScanResult?.data.networks || []}
        preselectedSSID={preselectedSSID}
      />

      {/* Station Check Results Modal */}
      <StationCheckModal
        isOpen={isCheckModalOpen}
        onClose={() => setIsCheckModalOpen(false)}
        checkResult={checkResult}
      />

      {/* WiFi Scan Results Modal */}
      <WifiScanModal
        isOpen={isWifiScanModalOpen}
        onClose={() => setIsWifiScanModalOpen(false)}
        scanResult={wifiScanResult}
        onSelectNetwork={(ssid) => {
          setPreselectedSSID(ssid);
          setIsWifiScanModalOpen(false);
          setIsWifiModalOpen(true);
        }}
      />

      {/* Volume Control Modal */}
      <VolumeControlModal
        isOpen={isVolumeModalOpen}
        onClose={() => setIsVolumeModalOpen(false)}
        stationId={stationId}
      />
    </div>
  );
}
