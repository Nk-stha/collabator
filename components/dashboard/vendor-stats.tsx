"use client";

import { cn } from "@/lib/utils";

interface VendorStat {
  title: string;
  value: string | number;
  suffix?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  progress?: number; // 0-100
  subtext?: string;
  icon?: string; // Material symbol name
}

interface VendorStatsProps {
  stats: VendorStat[];
  className?: string;
}

export function VendorStats({ stats, className }: VendorStatsProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-surface-dark p-6 rounded-2xl border border-white/5"
        >
          <p className="text-text-secondary text-sm mb-1">{stat.title}</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold">{stat.value}</h2>
            {stat.suffix && (
              <span className="text-text-secondary text-xs">{stat.suffix}</span>
            )}
            {stat.trend && (
              <span
                className={cn(
                  "text-xs font-medium",
                  stat.trend.isPositive ? "text-primary" : "text-red-500"
                )}
              >
                {stat.trend.value}
              </span>
            )}
            {stat.icon && (
              <span className="material-symbols-outlined text-primary text-xl">
                {stat.icon}
              </span>
            )}
          </div>
          {stat.progress !== undefined && (
            <div className="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${stat.progress}%` }}
              ></div>
            </div>
          )}
          {stat.subtext && (
            <p className="text-xs text-text-secondary mt-4">{stat.subtext}</p>
          )}
        </div>
      ))}
    </div>
  );
}
