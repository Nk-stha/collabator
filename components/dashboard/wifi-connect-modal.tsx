"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import React from "react";
import { toast } from "sonner";
import { stationService } from "@/lib/services";
import { ApiError } from "@/lib/api-error";
import { AlertCircle } from "lucide-react";

interface WifiConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationId: string;
  availableNetworks?: string[];
  preselectedSSID?: string;
}

export function WifiConnectModal({
  isOpen,
  onClose,
  stationId,
  availableNetworks = [],
  preselectedSSID,
}: WifiConnectModalProps) {
  const [selectedSSID, setSelectedSSID] = useState("");
  const [customSSID, setCustomSSID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Update selected SSID when preselectedSSID changes
  React.useEffect(() => {
    if (preselectedSSID) {
      setSelectedSSID(preselectedSSID);
    }
  }, [preselectedSSID]);

  // Reset state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setSelectedSSID("");
      setCustomSSID("");
      setPassword("");
      setShowPassword(false);
      setApiError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnect = async () => {
    setApiError(null);
    
    const ssidToConnect = selectedSSID === "custom" ? customSSID : selectedSSID;
    
    if (!ssidToConnect.trim()) {
      setApiError("Please select or enter a network SSID");
      return;
    }

    setIsConnecting(true);

    try {
      const result = await stationService.connectWifiNew({
        station_id: stationId,
        wifi_ssid: ssidToConnect,
        wifi_password: password || undefined,
      });

      if (result.success) {
        toast.success("Successfully connected to WiFi", {
          description: `Station is now connected to ${ssidToConnect}`,
        });
        onClose();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.isValidationError && error.fieldErrors) {
          const fieldErrors: string[] = [];
          for (const [field, messages] of Object.entries(error.fieldErrors)) {
            fieldErrors.push(`${field}: ${messages[0]}`);
          }
          setApiError(fieldErrors.join(", "));
        } else if (error.isNetworkError) {
          setApiError("Network error. Please check your connection and try again.");
          toast.error("Network Error", { description: error.message });
        } else if (error.isServerError) {
          setApiError("Server error. Please try again later.");
          toast.error("Server Error", { description: error.message });
        } else {
          setApiError(error.message);
          toast.error("Connection Failed", { description: error.message });
        }
      } else {
        const message = error instanceof Error ? error.message : "Failed to connect to WiFi";
        setApiError(message);
        toast.error("Connection Failed", { description: message });
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-[#171712]/85 backdrop-blur-xl w-full max-w-[520px] rounded-2xl border border-primary/40 shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-start p-6 pb-2">
          <div>
            <h2 className="text-white text-2xl font-bold tracking-tight">
              Connect to WiFi
            </h2>
            <p className="text-[#b6b6a0] text-sm mt-1">
              Configure network settings for Station
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isConnecting}
            className="text-[#b6b6a0] hover:text-white transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* API Error Alert */}
          {apiError && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{apiError}</p>
            </div>
          )}

          {/* SSID Dropdown */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Select Network
            </label>
            <div className="relative">
              <select
                value={selectedSSID}
                onChange={(e) => {
                  setSelectedSSID(e.target.value);
                  if (apiError) setApiError(null);
                }}
                disabled={isConnecting}
                className="w-full rounded-lg text-white border border-[#51513e] bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-14 px-4 appearance-none cursor-pointer outline-none disabled:opacity-50"
              >
                <option value="">-- Select a network --</option>
                {availableNetworks.map((network, index) => (
                  <option key={index} value={network}>
                    {network}
                  </option>
                ))}
                <option value="custom">Enter Custom SSID...</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#b6b6a0]">
                <span className="material-symbols-outlined">wifi</span>
              </div>
            </div>
          </div>

          {/* Custom SSID Input */}
          {selectedSSID === "custom" && (
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">
                Custom Network SSID
              </label>
              <input
                type="text"
                value={customSSID}
                onChange={(e) => {
                  setCustomSSID(e.target.value);
                  if (apiError) setApiError(null);
                }}
                disabled={isConnecting}
                className="w-full rounded-lg text-white border border-[#51513e] bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-14 px-4 placeholder:text-[#51513e] outline-none disabled:opacity-50"
                placeholder="Enter network name"
              />
            </div>
          )}

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Network Password (Optional)
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (apiError) setApiError(null);
                }}
                disabled={isConnecting}
                className="w-full rounded-lg text-white border border-[#51513e] bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-14 px-4 placeholder:text-[#51513e] outline-none disabled:opacity-50"
                placeholder="Leave empty for open networks"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isConnecting}
                className="absolute inset-y-0 right-4 flex items-center text-[#b6b6a0] hover:text-primary transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Leave password empty for open/guest networks
            </p>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="p-6 pt-2 flex items-center gap-3">
          <button
            onClick={onClose}
            disabled={isConnecting}
            className="flex-1 h-12 rounded-lg border border-[#51513e] text-white text-sm font-bold hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="flex-1 h-12 rounded-lg bg-primary text-[#171712] text-sm font-black uppercase tracking-widest hover:brightness-110 shadow-[0_0_20px_rgba(189,189,40,0.3)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
                <>
                <span className="material-symbols-outlined animate-spin text-xl">sync</span>
                Connecting...
                </>
            ) : (
                <>
                <span className="material-symbols-outlined text-xl">cast_connected</span>
                Connect Now
                </>
            )}
          </button>
        </div>

        {/* Subtle glow effect at bottom */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>
    </div>
  );
}
