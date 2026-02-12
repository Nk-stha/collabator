"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { WifiScanResponse } from "@/lib/types";
import { Wifi, WifiOff, Lock, LockOpen } from "lucide-react";

interface WifiScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  scanResult: WifiScanResponse | null;
  onSelectNetwork?: (ssid: string) => void;
}

export function WifiScanModal({ isOpen, onClose, scanResult, onSelectNetwork }: WifiScanModalProps) {
  if (!scanResult) return null;

  const { data } = scanResult;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Modal */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-card-dark border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-card-dark border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Wifi className="h-5 w-5 text-primary" />
                Available WiFi Networks
              </h2>
              <p className="text-xs text-gray-400 mt-1">IMEI: {data.station_imei}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Summary */}
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-start gap-3">
              <Wifi className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-primary">
                  {data.message}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Found {data.networks.length} network{data.networks.length !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Scan ID: {data.iot_history_id}
                </p>
              </div>
            </div>

            {/* Networks List */}
            {data.networks.length > 0 ? (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                  Networks
                </h3>
                <div className="space-y-2">
                  {data.networks.map((network, index) => {
                    // Infer security based on network name patterns
                    const isOpen = network.toLowerCase().includes('open') || 
                                   network.toLowerCase().includes('guest');
                    const signalStrength = Math.max(20, 100 - (index * 10)); // Mock signal strength

                    return (
                      <div
                        key={index}
                        onClick={() => onSelectNetwork?.(network)}
                        className={cn(
                          "dashboard-card p-4 border border-white/10 hover:border-primary/30 transition-all group",
                          onSelectNetwork && "cursor-pointer hover:bg-primary/5"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <Wifi className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-white truncate">{network}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1">
                                  {isOpen ? (
                                    <LockOpen className="h-3 w-3 text-green-500" />
                                  ) : (
                                    <Lock className="h-3 w-3 text-gray-400" />
                                  )}
                                  <span className="text-xs text-gray-400">
                                    {isOpen ? 'Open' : 'Secured'}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-400">
                                  Signal: {signalStrength}%
                                </span>
                              </div>
                            </div>
                          </div>
                          {onSelectNetwork && (
                            <div className="ml-3">
                              <button className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary/20 transition-all group-hover:bg-primary group-hover:text-black">
                                Connect
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <WifiOff className="h-12 w-12 text-gray-600 mb-4" />
                <p className="text-gray-400">No networks found</p>
                <p className="text-sm text-gray-500 mt-1">Try scanning again</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-card-dark border-t border-white/5 px-6 py-4">
            <button
              onClick={onClose}
              className="w-full px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-black font-bold transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
