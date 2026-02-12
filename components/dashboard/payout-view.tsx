"use client";

import { PayoutStat, PayoutStats } from "./payout-stats";
import { Transaction, TransactionTable } from "./transaction-table";

interface PayoutViewProps {
  stats: PayoutStat[];
  transactions: Transaction[];
  totalTransactions?: number;
  onTransactionClick?: (transactionId: string) => void;
  onWithdrawClick?: () => void;
}

export function PayoutView({ stats, transactions, totalTransactions = transactions.length, onTransactionClick, onWithdrawClick }: PayoutViewProps) {
  return (
    <div className="w-full relative space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Payout History
        </h1>
        <p className="text-gray-500 text-sm max-w-md">
          Manage your earnings and station performance payouts.
        </p>
      </div>
      {onWithdrawClick && (
        <button 
          onClick={onWithdrawClick}
          className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-black text-sm font-bold shadow-[0_0_20px_rgba(84,188,40,0.15)] transition-all flex items-center gap-2 w-full md:w-auto"
        >
          <span className="material-symbols-outlined text-xl">
            account_balance_wallet
          </span>
          Request Payout
        </button>
      )}

      <PayoutStats stats={stats} />

      <TransactionTable
        transactions={transactions}
        totalTransactions={totalTransactions}
        onRowClick={onTransactionClick}
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
