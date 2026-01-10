"use client";

import { PayoutStat, PayoutStats } from "./payout-stats";
import { Transaction, TransactionTable } from "./transaction-table";

interface PayoutViewProps {
  stats: PayoutStat[];
  transactions: Transaction[];
}

export function PayoutView({ stats, transactions }: PayoutViewProps) {
  return (
    <div className="w-full relative space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
            <span className="hover:text-gray-300 cursor-pointer after:content-['/'] after:mx-2 after:text-gray-600 after:font-light">
              Dashboard
            </span>
            <span className="font-bold text-primary">Payouts</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Payout History
          </h1>
          <p className="text-gray-500 text-sm max-w-md">
            Manage your earnings and station performance payouts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 text-sm font-bold hover:bg-white/10 hover:text-white transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">
              file_download
            </span>
            Download Report
          </button>
          <button className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-[0_0_20px_rgba(84,188,40,0.15)] transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">
              account_balance_wallet
            </span>
            Withdraw Funds
          </button>
        </div>
      </div>

      <PayoutStats stats={stats} />

      <TransactionTable
        transactions={transactions}
        totalTransactions={128} // Mock total for now
      />

      <footer className="pt-8 pb-12 text-center">
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.25em] font-semibold mb-3">
          Charge Ghar Ecosystem
        </p>
        <div className="flex items-center justify-center gap-8 text-[11px] text-gray-500 font-medium">
          <a className="hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Service Terms
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Support Center
          </a>
        </div>
        <p className="text-[10px] text-gray-800 mt-6">
          © 2025 Charge Ghar Technologies. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
