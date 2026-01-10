"use client";

import { PayoutView } from "@/components/dashboard/payout-view";
import { PayoutStat } from "@/components/dashboard/payout-stats";
import { Transaction } from "@/components/dashboard/transaction-table";

// Mock Data for Vendor - slightly different values
const VENDOR_STATS: PayoutStat[] = [
  {
    title: "Total Earned",
    value: "150,000",
    unit: "NPR",
    icon: "account_balance_wallet",
    trend: {
      value: "8.5%",
      label: "",
      isPositive: true,
      icon: "trending_up",
    },
  },
  {
    title: "Available Balance",
    value: "5,450",
    unit: "NPR",
    icon: "payments",
    trend: {
      value: "Current",
      label: "",
      isPositive: undefined,
    },
  },
  {
    title: "Last Payout",
    value: "2,200",
    unit: "NPR",
    icon: "history",
    highlight: true,
    trend: {
      value: "DEC 10",
      label: "",
      icon: "calendar_today",
    },
  },
];

const VENDOR_TRANSACTIONS: Transaction[] = [
  {
    id: "PY-8821",
    date: "2025-12-14",
    method: { type: "E-Sewa", icon: "phone_iphone" },
    amount: 2200,
    status: "COMPLETED",
  },
  {
    id: "PY-8820",
    date: "2025-12-05",
    method: { type: "Bank Transfer", icon: "account_balance" },
    amount: 5150,
    status: "COMPLETED",
  },
  {
    id: "PY-8819",
    date: "2025-11-28",
    method: { type: "E-Sewa", icon: "phone_iphone" },
    amount: 1900,
    status: "COMPLETED",
  },
];

export default function VendorPayouts() {
  return (
    <PayoutView stats={VENDOR_STATS} transactions={VENDOR_TRANSACTIONS} />
  );
}
