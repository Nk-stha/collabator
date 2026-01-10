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
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-black font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
            <span className="material-symbols-outlined text-sm">add</span>
            <span>New Station</span>
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
          <div className="dashboard-card p-6 border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">dynamic_form</span>
                <h3 className="text-xl font-bold">Bulk Eject Control</h3>
              </div>
              <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest font-bold">Inventory Management</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <p className="text-sm text-gray-400">Select multiple stations to trigger powerbank release for maintenance or re-stocking.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-lg cursor-pointer">S-001 (Mumbai)</span>
                  <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-lg cursor-pointer">S-014 (Bangalore)</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 text-xs font-bold rounded-lg hover:border-primary/20 cursor-pointer">+ 4 more</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button className="w-full py-4 bg-primary hover:bg-primary-hover text-black font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 group">
                  <span className="material-symbols-outlined group-active:animate-bounce">eject</span>
                  START BULK EJECT (6 STATIONS)
                </button>
                <button className="w-full py-3 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white font-bold rounded-xl transition-all">
                  Cancel Operation
                </button>
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
        </div>
        <div className="lg:col-span-1">
          <div className="dashboard-card h-full">
            <div className="p-6 border-b border-white/5 bg-white/5">
              <h3 className="text-xl font-bold">Top Venders</h3>
              <p className="text-sm text-gray-500">Highest rental yields this week</p>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary border border-primary/20">01</div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold truncate">Starbucks BKC</h4>
                  <p className="text-xs text-gray-500">12 Stations • Mumbai</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">₹12,450</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Revenue</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group">
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center font-bold text-gray-400 border border-white/10">02</div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold truncate">PVR Icon</h4>
                  <p className="text-xs text-gray-500">8 Stations • Pune</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹9,820</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Revenue</p>
                </div>
              </div>
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
