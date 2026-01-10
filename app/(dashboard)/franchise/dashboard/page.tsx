"use client";

import React from 'react';
import { cn } from '@/lib/utils'; // Keep utility for potential usage

export default function FranchiseDashboard() {
  return (
    <div className="space-y-6">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Franchise <span className="text-primary">Analytics</span></h1>
          <p className="text-gray-400 max-w-lg">Real-time performance overview and network management for your Charge Ghar franchise network.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card-dark border border-border-dark rounded-xl hover:bg-white/5 transition-all">
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Reports</span>
          </button>

        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="dashboard-card p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20">
              <span className="material-symbols-outlined text-4xl">sensors</span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-widest mb-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Network Live
              </div>
              <h2 className="text-3xl font-bold">98.4% System Uptime</h2>
              <p className="text-gray-400 mt-1">Across 42 active station nodes</p>
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-8 border-l border-white/5 pl-8 hidden md:grid">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Response Time</p>
              <p className="text-xl font-bold">120ms</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Active Alerts</p>
              <p className="text-xl font-bold text-yellow-500">2</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Peak Hours</p>
              <p className="text-xl font-bold">18:00 - 21:00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="dashboard-card p-6 stat-card-gradient">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/20 text-primary rounded-lg">
              <span className="material-symbols-outlined">ev_station</span>
            </div>
            <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded">+12%</span>
          </div>
          <p className="text-gray-400 text-sm font-medium">Total Stations</p>
          <p className="text-3xl font-bold mt-1">42</p>
          <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary h-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        <div className="dashboard-card p-6 stat-card-gradient">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <span className="material-symbols-outlined">storefront</span>
            </div>
            <span className="text-xs text-blue-400 font-bold bg-blue-500/10 px-2 py-1 rounded">+5 new</span>
          </div>
          <p className="text-gray-400 text-sm font-medium">Total Venders</p>
          <p className="text-3xl font-bold mt-1">128</p>
          <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
            <div className="bg-blue-400 h-full" style={{ width: '60%' }}></div>
          </div>
        </div>
        <div className="dashboard-card p-6 stat-card-gradient">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
              <span className="material-symbols-outlined">battery_5_bar</span>
            </div>
            <span className="text-xs text-orange-400 font-bold bg-orange-500/10 px-2 py-1 rounded">94% Active</span>
          </div>
          <p className="text-gray-400 text-sm font-medium">Active Powerbanks</p>
          <p className="text-3xl font-bold mt-1">1,024</p>
          <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
            <div className="bg-orange-400 h-full" style={{ width: '94%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="dashboard-card p-8 border-primary/20 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-xl">payments</span>
                  <h3 className="text-lg font-bold text-gray-300">Today&apos;s Earnings</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-primary stat-glow tracking-tight">NPR 24,500</span>
                  <div className="flex items-center text-primary text-sm font-bold bg-primary/10 px-2 py-0.5 rounded-lg border border-primary/20">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    <span>+15%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">vs yesterday (NPR 21,304)</p>
              </div>
              <div className="flex-grow max-w-xs h-24 flex items-end gap-1.5 px-4">
                <div className="w-full bg-primary/10 rounded-t-sm relative h-[40%] hover:bg-primary/30 transition-all cursor-help" title="09:00 - NPR 1,200"></div>
                <div className="w-full bg-primary/10 rounded-t-sm relative h-[30%] hover:bg-primary/30 transition-all cursor-help" title="10:00 - NPR 900"></div>
                <div className="w-full bg-primary/10 rounded-t-sm relative h-[55%] hover:bg-primary/30 transition-all cursor-help" title="11:00 - NPR 1,600"></div>
                <div className="w-full bg-primary/10 rounded-t-sm relative h-[45%] hover:bg-primary/30 transition-all cursor-help" title="12:00 - NPR 1,300"></div>
                <div className="w-full bg-primary/10 rounded-t-sm relative h-[70%] hover:bg-primary/30 transition-all cursor-help" title="13:00 - NPR 2,100"></div>
                <div className="w-full bg-primary/10 rounded-t-sm relative h-[85%] hover:bg-primary/30 transition-all cursor-help" title="14:00 - NPR 2,500"></div>
                <div className="w-full bg-primary/30 rounded-t-sm relative h-[100%] border-t-2 border-primary hover:bg-primary/40 transition-all cursor-help" title="Peak: 15:00 - NPR 2,950"></div>
                <div className="w-full bg-primary/10 rounded-t-sm relative h-[75%] hover:bg-primary/30 transition-all cursor-help" title="16:00 - NPR 2,200"></div>
                <div className="w-full bg-primary/10 rounded-t-sm relative h-[65%] hover:bg-primary/30 transition-all cursor-help" title="17:00 - NPR 1,900"></div>
                <div className="w-full bg-primary/10 rounded-t-sm relative h-[80%] hover:bg-primary/30 transition-all cursor-help" title="18:00 - NPR 2,400"></div>
              </div>
            </div>
          </div>
          <div className="dashboard-card p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Rental Volume</h3>
              <div className="flex bg-white/5 rounded-lg p-1">
                <button className="px-3 py-1 text-xs font-bold bg-primary text-black rounded-md">Week</button>
                <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-white transition-all">Month</button>
                <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-white transition-all">Year</button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-4 px-2">
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '40%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '60%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '55%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '85%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '75%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '95%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
              <div className="flex-grow bg-primary/5 rounded-t-lg relative" style={{ height: '80%' }}>
                <div className="absolute inset-0 bg-primary/20 border-t-2 border-primary"></div>
              </div>
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
          {/* Recent Transactions */}
          <div className="dashboard-card overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-bold">Recent Transactions</h3>
              <a className="text-primary text-xs font-semibold hover:underline cursor-pointer">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-text-secondary border-b border-white/5">
                    <th className="px-6 py-4 font-medium uppercase">Order ID</th>
                    <th className="px-6 py-4 font-medium uppercase">Customer</th>
                    <th className="px-6 py-4 font-medium uppercase">Duration</th>
                    <th className="px-6 py-4 font-medium uppercase">Amount</th>
                    <th className="px-6 py-4 font-medium uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono">#CG-8821</td>
                    <td className="px-6 py-4 text-sm">Aditya K.</td>
                    <td className="px-6 py-4 text-sm">2h 15m</td>
                    <td className="px-6 py-4 text-sm font-bold">NPR 150</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">Completed</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono">#CG-8822</td>
                    <td className="px-6 py-4 text-sm">Riya S.</td>
                    <td className="px-6 py-4 text-sm text-primary font-medium italic">Active</td>
                    <td className="px-6 py-4 text-sm font-bold">--</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold rounded uppercase tracking-wider">In Use</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono">#CG-8819</td>
                    <td className="px-6 py-4 text-sm">Binod T.</td>
                    <td className="px-6 py-4 text-sm">45m</td>
                    <td className="px-6 py-4 text-sm font-bold">NPR 80</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">Completed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="dashboard-card h-full">
            <div className="p-6 border-b border-white/5 bg-white/5">
              <h3 className="text-xl font-bold">Top Venders</h3>
              <p className="text-sm text-gray-500">Highest rental yields this week</p>
            </div>
            <div className="p-4 space-y-4">
             
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group">
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center font-bold text-gray-400 border border-white/10">03</div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold truncate">Social Church Street</h4>
                  <p className="text-xs text-gray-500">5 Stations • Bangalore</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹8,140</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Revenue</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group">
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center font-bold text-gray-400 border border-white/10">04</div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold truncate">T3 Airport Terminal</h4>
                  <p className="text-xs text-gray-500">15 Stations • Delhi</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹7,600</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Revenue</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group">
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center font-bold text-gray-400 border border-white/10">05</div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold truncate">Phoenix Market City</h4>
                  <p className="text-xs text-gray-500">10 Stations • Mumbai</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹6,900</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Revenue</p>
                </div>
              </div>
              <button className="w-full mt-4 py-3 text-sm font-bold text-gray-400 hover:text-primary transition-all flex items-center justify-center gap-2">
                View All Venders
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="py-8 border-t border-border-dark mt-12 text-center text-gray-600 text-sm">
        <p>© 2023 CHARGE GHAR Franchise Network. All operations encrypted and monitored.</p>
      </footer>
    </div>
  );
}
