"use client";

import { cn } from "@/lib/utils";

export interface PayoutActivity {
  id: string;
  amount: string;
  date: string;
  status: "PENDING" | "PAID";
}

interface VendorPayoutCardProps {
  balance: string;
  recentActivity: PayoutActivity[];
  onRequestPayout?: () => void;
  className?: string;
}

export function VendorPayoutCard({
  balance,
  recentActivity,
  onRequestPayout,
  className,
}: VendorPayoutCardProps) {
  return (
    <section
      className={cn(
        "bg-surface-dark rounded-2xl border border-white/5 overflow-hidden",
        className
      )}
    >
      <div className="p-6 border-b border-white/5">
        <h3 className="font-bold">Payouts</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="bg-background-dark p-4 rounded-xl border border-white/5">
          <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">
            Withdrawable Balance
          </p>
          <p className="text-2xl font-bold">{balance}</p>
        </div>
        <button
          onClick={onRequestPayout}
          className="w-full bg-primary hover:bg-primary-hover active:bg-primary-active text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/10"
        >
          Request Payout
        </button>
        <div className="mt-6 pt-4 border-t border-white/5">
          <p className="text-xs font-semibold text-text-secondary uppercase mb-3 tracking-widest">
            Recent Activity
          </p>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      activity.status === "PENDING"
                        ? "bg-yellow-500/10"
                        : "bg-primary/10"
                    )}
                  >
                    <span
                      className={cn(
                        "material-symbols-outlined text-sm",
                        activity.status === "PENDING"
                          ? "text-yellow-500"
                          : "text-primary"
                      )}
                    >
                      {activity.status === "PENDING" ? "schedule" : "check"}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium">{activity.amount}</p>
                    <p className="text-[10px] text-text-secondary">
                      {activity.date}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded",
                    activity.status === "PENDING"
                      ? "text-yellow-500 bg-yellow-500/10"
                      : "text-primary bg-primary/10"
                  )}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
