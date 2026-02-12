"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { StationCheckResponse } from "@/lib/types";
import { CheckCircle, XCircle, AlertTriangle, Battery, Thermometer, Zap } from "lucide-react";

interface StationCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkResult: StationCheckResponse | null;
}

export function StationCheckModal({ isOpen, onClose, checkResult }: StationCheckModalProps) {
  if (!checkResult) return null;

  const { data } = checkResult;
  const hasIssues = data.slots.some(slot => slot.status !== 0 || slot.message !== "NONE");

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
        <div className="bg-card-dark border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-card-dark border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">fact_check</span>
                Station Check Results
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
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Summary */}
            <div className={cn(
              "p-4 rounded-lg border flex items-start gap-3",
              hasIssues 
                ? "bg-yellow-500/10 border-yellow-500/20" 
                : "bg-primary/10 border-primary/20"
            )}>
              {hasIssues ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              )}
              <div>
                <p className={cn(
                  "font-bold",
                  hasIssues ? "text-yellow-500" : "text-primary"
                )}>
                  {data.message}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Check ID: {data.iot_history_id}
                </p>
              </div>
            </div>

            {/* Slots Grid */}
            <div>
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
                Slot Details ({data.slots.length} slots)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.slots.map((slot) => {
                  const hasError = slot.status !== 0 || slot.message !== "NONE";
                  const isEmpty = slot.sn_as_int === 0;

                  return (
                    <div
                      key={slot.index}
                      className={cn(
                        "dashboard-card p-4 border",
                        hasError && "border-yellow-500/30 bg-yellow-500/5",
                        !hasError && !isEmpty && "border-primary/30 bg-primary/5",
                        !hasError && isEmpty && "border-white/10"
                      )}
                    >
                      {/* Slot Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">
                            Slot {slot.index}
                          </span>
                          {hasError && (
                            <XCircle className="h-4 w-4 text-yellow-500" />
                          )}
                          {!hasError && !isEmpty && (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <span className="text-xs text-gray-500 font-mono">
                          Board {slot.pinboard_index}
                        </span>
                      </div>

                      {/* Status Message */}
                      {slot.message !== "NONE" && (
                        <div className="mb-3 p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                          <p className="text-xs text-yellow-500 font-medium">
                            {slot.message}
                          </p>
                        </div>
                      )}

                      {/* Powerbank Info */}
                      {!isEmpty && (
                        <div className="mb-3 p-2 rounded bg-white/5">
                          <p className="text-xs text-gray-500 mb-1">Powerbank SN</p>
                          <p className="text-sm font-mono text-white">{slot.sn_as_string}</p>
                        </div>
                      )}

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 p-2 rounded bg-white/5">
                          <Battery className="h-3 w-3 text-primary" />
                          <div>
                            <p className="text-[10px] text-gray-500">Power</p>
                            <p className="text-xs font-bold text-white">{slot.power}%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded bg-white/5">
                          <Thermometer className="h-3 w-3 text-orange-500" />
                          <div>
                            <p className="text-[10px] text-gray-500">Temp</p>
                            <p className="text-xs font-bold text-white">{slot.temp}°C</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded bg-white/5">
                          <Zap className="h-3 w-3 text-yellow-500" />
                          <div>
                            <p className="text-[10px] text-gray-500">Voltage</p>
                            <p className="text-xs font-bold text-white">{slot.voltage}V</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded bg-white/5">
                          <Zap className="h-3 w-3 text-blue-500" />
                          <div>
                            <p className="text-[10px] text-gray-500">Current</p>
                            <p className="text-xs font-bold text-white">{slot.current}mA</p>
                          </div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Status Code:</span>
                          <span className="ml-1 text-white font-mono">{slot.status}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Locked:</span>
                          <span className={cn(
                            "ml-1 font-bold",
                            slot.locked ? "text-red-500" : "text-primary"
                          )}>
                            {slot.locked ? "Yes" : "No"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Micro Switch:</span>
                          <span className="ml-1 text-white font-mono">{slot.micro_switch}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Valve:</span>
                          <span className="ml-1 text-white font-mono">{slot.solenoid_valve_switch}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
