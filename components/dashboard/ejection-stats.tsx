"use client";

import { cn } from "@/lib/utils";

export interface EjectionStat {
  title: string;
  value: string | number;
  unit?: string;
  icon: string; // Material symbol name
  trend?: {
    value: string;
    label?: string; // e.g. "Since last 24h"
    isPositive?: boolean;
    icon?: string; // Material symbol, default trending_up
  };
  highlight?: boolean; // For "Live Network" blinking style
  timestamp?: string; // For "Last Event" style
}

interface EjectionStatsProps {
  stats: EjectionStat[];
  className?: string;
}

export function EjectionStats({ stats, className }: EjectionStatsProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative overflow-hidden transition-all duration-300 border border-white/[0.08] hover:border-primary/40 bg-card-bg/40 backdrop-blur-xl rounded-2xl p-5 group shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(84,188,40,0.15)]"
          style={{
            background:
              "linear-gradient(145deg, rgba(20, 20, 20, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)",
          }}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                {stat.title}
              </p>
              <h3 className="text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-2">
                {stat.value}
                {stat.unit && (
                  <span className="text-sm font-medium text-gray-500">
                    {stat.unit}
                  </span>
                )}
              </h3>
            </div>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center relative bg-primary/5 border border-primary/10">
              <div
                className="absolute inset-0 rounded-lg blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-primary/20"
              />
              <span className="material-symbols-outlined text-primary text-[20px] relative z-10 font-light">
                {stat.icon}
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            {stat.trend && (
               <div className="flex items-center gap-2">
                 <div className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded-full border",
                    stat.highlight 
                        ? "bg-white/5 border-white/10" 
                        : "bg-primary/10 border-primary/20"
                 )}>
                    {stat.highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    )}
                    {!stat.highlight && (
                        <span className="material-symbols-outlined text-[12px] text-primary font-bold">
                            {stat.trend.icon || "trending_up"}
                        </span>
                    )}
                    <span className={cn(
                        "text-[10px] font-bold uppercase",
                        stat.highlight ? "text-gray-400" : "text-primary"
                    )}>
                        {stat.trend.value}
                    </span>
                 </div>
                 {stat.trend.label && (
                    <span className="text-[10px] text-gray-500 font-medium">
                        {stat.trend.label}
                    </span>
                 )}
               </div> 
            )}

            {stat.timestamp && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 w-fit">
                    <span className="material-symbols-outlined text-[14px] text-gray-500">schedule</span>
                    <span className="text-[10px] font-bold text-gray-400">{stat.timestamp}</span>
                </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
