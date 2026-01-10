"use client";

import { PayoutView } from "@/components/dashboard/payout-view";
import { PayoutStat } from "@/components/dashboard/payout-stats";
import { Transaction } from "@/components/dashboard/transaction-table";

// Mock Data for Franchise
const FRANCHISE_STATS: PayoutStat[] = [
  {
    title: "Total Earned",
    value: "450,000",
    unit: "NPR",
    icon: "account_balance_wallet",
    trend: {
      value: "12.5%",
      label: "",
      isPositive: true,
      icon: "trending_up",
    },
  },
  {
    title: "Available Balance",
    value: "12,450",
    unit: "NPR",
    icon: "payments",
    trend: {
      value: "Current",
      label: "",
      isPositive: undefined, // No color/icon needed
    },
  },
  {
    title: "Last Payout",
    value: "5,200",
    unit: "NPR",
    icon: "history",
    highlight: true,
    trend: {
      value: "DEC 12",
      label: "",
      icon: "calendar_today",
    },
  },
];

const FRANCHISE_TRANSACTIONS: Transaction[] = [
  {
    id: "PY-9921",
    date: "2025-12-14",
    method: { type: "E-Sewa", icon: "phone_iphone" },
    amount: 5200,
    status: "COMPLETED",
  },
  {
    id: "PY-9920",
    date: "2025-12-07",
    method: { type: "Bank Transfer", icon: "account_balance" },
    amount: 8150,
    status: "COMPLETED",
  },
  {
    id: "PY-9919",
    date: "2025-11-30",
    method: { type: "E-Sewa", icon: "phone_iphone" },
    amount: 4900,
    status: "COMPLETED",
  },
  {
    id: "PY-9918",
    date: "2025-11-23",
    method: { type: "Bank Transfer", icon: "account_balance" },
    amount: 12000,
    status: "PENDING",
  },
];

export default function FranchisePayouts() {
  return (
    <PayoutView stats={FRANCHISE_STATS} transactions={FRANCHISE_TRANSACTIONS} />
  );
}
