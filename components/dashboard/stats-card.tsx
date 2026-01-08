import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("p-6", className)} hoverable>
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full",
              trend.isPositive
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            )}
          >
            {trend.isPositive ? "+" : "-"}{trend.value}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-text-muted">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-text-primary">{value}</h3>
        {description && (
          <p className="text-xs text-text-muted mt-2">{description}</p>
        )}
      </div>
    </Card>
  );
}
