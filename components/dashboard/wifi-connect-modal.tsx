"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface WifiConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationId: string;
}

export function WifiConnectModal({
  isOpen,
  onClose,
  stationId,
}: WifiConnectModalProps) {
  const [selectedSSID, setSelectedSSID] = useState("hq_5g");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [securityType, setSecurityType] = useState("WPA2");
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen) return null;

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate API call
    setTimeout(() => {
      setIsConnecting(false);
      toast.success(`Successfully connected to network`, {
          description: `Station ${stationId} is now online on secure network.`
      });
      onClose();
    }, 1500);
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
              Configure network settings for Station {stationId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#b6b6a0] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* SSID Dropdown */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-white text-sm font-medium">
                Select Network
              </label>
              <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Signal Strength: Excellent
              </div>
            </div>
            <div className="relative">
              <select
                value={selectedSSID}
                onChange={(e) => setSelectedSSID(e.target.value)}
                className="w-full rounded-lg text-white border border-[#51513e] bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-14 px-4 appearance-none cursor-pointer outline-none"
              >
                <option value="hq_5g">ChargeGhar_HQ_5G</option>
                <option value="guest">Office_Guest</option>
                <option value="warehouse">Warehouse_B_IoT</option>
                <option value="hidden">Enter Hidden SSID...</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#b6b6a0]">
                <span className="material-symbols-outlined">wifi</span>
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Network Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg text-white border border-[#51513e] bg-[#1E1E1E] focus:ring-2 focus:ring-primary/50 focus:border-primary h-14 px-4 placeholder:text-[#51513e] outline-none"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-[#b6b6a0] hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Security Type Tags */}
          <div className="space-y-3">
            <label className="text-white text-sm font-medium">
              Security Type
            </label>
            <div className="flex flex-wrap gap-2">
              {["WPA", "WPA2", "WPA3", "Open"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSecurityType(type)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all border",
                    securityType === type
                      ? "bg-primary/20 text-primary border-primary/50 shadow-[0_0_10px_rgba(189,189,40,0.15)]"
                      : "bg-[#37372a] text-[#b6b6a0] border-transparent hover:border-primary/50"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="p-6 pt-2 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-lg border border-[#51513e] text-white text-sm font-bold hover:bg-white/5 transition-colors"
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
