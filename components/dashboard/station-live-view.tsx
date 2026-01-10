"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface SlotStatus {
  slotNumber: number;
  status: "charging" | "empty" | "offline";
  batteryLevel?: number; // 0-100, only for charging
}

interface StationLiveViewProps {
  slots: SlotStatus[];
  onQuickEject?: () => void;
  className?: string;
}

export function StationLiveView({
  slots,
  onQuickEject,
  className,
}: StationLiveViewProps) {
  const getBatteryIcon = (level?: number) => {
    if (!level) return "battery_0_bar";
    if (level >= 95) return "battery_full";
    if (level >= 80) return "battery_5_bar";
    if (level >= 60) return "battery_charging_80";
    if (level >= 40) return "battery_4_bar";
    if (level >= 20) return "battery_2_bar";
    return "battery_1_bar";
  };

  return (
    <section
      className={cn(
        "bg-surface-dark rounded-2xl border border-white/5 overflow-hidden",
        className
      )}
    >
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">dock</span>
          Station Live View
        </h3>
        <button
          onClick={onQuickEject}
          className="bg-primary hover:bg-primary-hover text-black font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">eject</span>
          QUICK EJECT
        </button>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-6 gap-4">
          {slots.map((slot) => (
            <div key={slot.slotNumber} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-full aspect-[2/3] rounded-lg flex flex-col items-center justify-center relative",
                  slot.status === "charging"
                    ? "bg-primary/20 border-2 border-primary"
                    : "bg-zinc-800/50 border-2 border-dashed border-zinc-700"
                )}
              >
                <span
                  className={cn(
                    "material-symbols-outlined text-2xl",
                    slot.status === "charging" ? "text-primary" : "text-zinc-600"
                  )}
                >
                  {slot.status === "offline"
                    ? "error"
                    : getBatteryIcon(slot.batteryLevel)}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-bold mt-1",
                    slot.status === "charging" ? "text-primary" : "text-zinc-600"
                  )}
                >
                  {slot.status === "charging"
                    ? `${slot.batteryLevel}%`
                    : slot.status === "empty"
                    ? "EMPTY"
                    : "OFFLINE"}
                </span>
                {slot.status === "charging" && slot.batteryLevel === 100 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-surface-dark"></div>
                )}
              </div>
              <span className="text-[10px] text-text-secondary font-mono">
                SLOT {String(slot.slotNumber).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
