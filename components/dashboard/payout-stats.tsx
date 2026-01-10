"use client";

import { cn } from "@/lib/utils";

export interface PayoutStat {
  title: string;
  value: string | number;
  unit?: string;
  icon: string; // Material symbol name
  trend?: {
    value: string;
    label: string;
    isPositive?: boolean;
    icon?: string;
  };
  highlight?: boolean; // For the orange stat card
}

interface PayoutStatsProps {
  stats: PayoutStat[];
  className?: string;
}

export function PayoutStats({ stats, className }: PayoutStatsProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-5", className)}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative overflow-hidden transition-all duration-300 border border-white/[0.08] hover:border-primary/40 bg-card-bg/40 backdrop-blur-xl rounded-2xl p-5 group shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(84,188,40,0.15)]"
          style={{
            background:
              "linear-gradient(145deg, rgba(20, 20, 20, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <div
              className={cn(
                "h-9 w-9 rounded-lg flex items-center justify-center relative border transition-all",
                stat.highlight
                  ? "bg-accent-orange/5 border-accent-orange/10"
                  : "bg-primary/5 border-primary/10"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-lg blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  stat.highlight ? "bg-accent-orange/20" : "bg-primary/20"
                )}
              />
              <span
                className={cn(
                  "material-symbols-outlined text-[20px] relative z-10 font-light",
                  stat.highlight ? "text-accent-orange" : "text-primary"
                )}
              >
                {stat.icon}
              </span>
            </div>
            {stat.trend && (
              <div
                className={cn(
                  "flex items-center gap-1.5 px-2 py-0.5 rounded-full border",
                  stat.highlight
                    ? "bg-white/5 border-white/10" // Default for highlight card unless specific trend color needed
                    : stat.trend.isPositive === undefined
                    ? "bg-white/5 border-white/10"
                    : "bg-primary/10 border-primary/20"
                )}
              >
                {stat.trend.icon && (
                  <span
                    className={cn(
                      "material-symbols-outlined text-[12px]",
                      stat.highlight
                        ? "text-gray-500"
                        : "text-primary font-bold"
                    )}
                  >
                    {stat.trend.icon}
                  </span>
                )}
                <span
                  className={cn(
                    "text-[10px] font-bold",
                    stat.highlight
                      ? "text-gray-400"
                      : "text-primary"
                  )}
                >
                  {stat.trend.value}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-0.5">
            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">
              {stat.title}
            </p>
            <div className="flex items-baseline gap-1">
              {stat.unit && (
                <span className="text-[14px] font-extrabold text-primary/80">
                  {stat.unit}
                </span>
              )}
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {stat.value}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
