"use client";

import { EjectionStat, EjectionStats } from "./ejection-stats";
import { cn } from "@/lib/utils";

export interface EjectionLog {
  id: string;
  timestamp: string;
  stationName: string;
  powerbankId: string;
  type: "Single Eject" | "Bulk Eject";
  status: "SUCCESS" | "FAILED";
}

interface EjectionViewProps {
  stats: EjectionStat[];
  logs: EjectionLog[];
  role: "franchise" | "vendor";
}

export function EjectionView({ stats, logs, role }: EjectionViewProps) {
  return (
    <div className="w-full relative space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          {/* Breadcrumb removed as per user request */}
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Ejection Logs
          </h1>
          <p className="text-gray-500 text-sm max-w-md font-medium">
            Real-time monitoring of powerbank ejection events across the
            network.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-primary/40 bg-primary/5 text-primary text-sm font-bold hover:bg-primary/10 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">
              file_download
            </span>
            Download CSV
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-[0_0_20px_rgba(84,188,40,0.15)] transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">refresh</span>
            Refresh Logs
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <EjectionStats stats={stats} />

      {/* Live Stream Table */}
      <div className="bg-card-bg/40 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden border-white/[0.05]">
        <div className="px-8 py-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.01]">
          <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-gray-400">
            <span className="material-symbols-outlined text-primary text-xl">
              terminal
            </span>
            Live Ejection Stream
          </h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                search
              </span>
              <input
                className="bg-app-bg border border-border-dark rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary transition-all w-full placeholder-gray-600 text-white"
                placeholder="Filter Station or PB ID..."
                type="text"
              />
            </div>
            <button className="p-2 border border-border-dark rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined">filter_alt</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="px-8 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Timestamp
                </th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Station Name
                </th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Powerbank No.
                </th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Type
                </th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-8 py-5 font-mono text-sm text-gray-400">
                    {log.timestamp}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full",
                          log.status === "SUCCESS"
                            ? "bg-primary/40"
                            : "bg-danger/40"
                        )}
                      ></div>
                      <span className="text-sm font-semibold text-white">
                        {log.stationName}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-mono text-sm text-primary/80">
                    {log.powerbankId}
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-400">
                    {log.type}
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest flex items-center w-fit gap-1.5 border",
                        log.status === "SUCCESS"
                          ? "bg-primary/10 border-primary/20 text-primary"
                          : "bg-danger/10 border-danger/20 text-danger"
                      )}
                    >
                      <span
                        className={cn(
                          "w-1 h-1 rounded-full",
                          log.status === "SUCCESS" ? "bg-primary" : "bg-danger"
                        )}
                      ></span>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-gray-500 hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        info
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
          <span className="text-xs text-gray-500 font-medium tracking-wide">
            Showing <span className="text-white">{logs.length}</span> of{" "}
            <span className="text-white">1,240</span> ejection events
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-border-dark rounded-lg text-gray-500 hover:text-white disabled:opacity-30 flex items-center gap-1 text-xs font-bold transition-all hover:bg-white/5"
              disabled
            >
              <span className="material-symbols-outlined text-lg">
                chevron_left
              </span>
              PREV
            </button>
            <button className="px-3 py-1.5 border border-border-dark rounded-lg text-gray-500 hover:text-white transition-all flex items-center gap-1 text-xs font-bold hover:bg-white/5">
              NEXT
              <span className="material-symbols-outlined text-lg">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-8 pb-12 text-center border-t border-white/5">
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.25em] font-bold mb-4">
          Charge Ghar Infrastructure Network
        </p>
        <div className="flex items-center justify-center gap-8 text-[11px] text-gray-500 font-bold uppercase tracking-widest">
          <a className="hover:text-primary transition-colors" href="#">
            Security Protocol
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Node Status
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            API Docs
          </a>
        </div>
        <p className="text-[10px] text-gray-800 mt-6 font-mono tracking-tighter">
          BUILD v2.4.0-STABLE // © 2025 Charge Ghar Technologies
        </p>
      </footer>
    </div>
  );
}
