# Requirements & Business Rules (v3.0 - Final)

This document serves as the final, 1000% accurate source of truth for the Chargeghar platform. It incorporates all business logic nuances, payment hierarchies, and hardware rules to eliminate gaps and assumptions.

---

## 1. Payment Hierarchy & Distribution

- **Centralized Collection:** All user transactions (rentals, top-ups, ad payments) are processed through the **Chargeghar Mobile App** into the main Chargeghar account.
- **Distribution Model:**
  - **Chargeghar -> Franchise:** Chargeghar distributes the agreed share to the Franchise.
  - **Chargeghar -> Direct Vendor:** Chargeghar distributes the share directly to vendors who are not under a franchise.
  - **Franchise -> Sub-Vendor:** The Franchise is solely responsible for paying their sub-vendors. The sub-vendors request payouts through their Franchise's dashboard, and the Franchise manually releases the payment.
- **VAT & Service Charge Logic:**
  - For **Chargeghar-level payouts** (to Franchises or Direct Vendors), the system/admin **deducts VAT and Service Charges** before manual release.
  - For **Franchise-level payouts** (to their Sub-Vendors), the system **does NOT deduct VAT and Service Charges**, as these are handled as internal private distributions or were already addressed at the Chargeghar level.
- **Tracing:** All requests, transactions, revenues, and distributed amounts must be fully traced in the system.

---

## 2. Platform Entity Models

### A. Franchise Model

- **Agreement:** Physical/manual deal. The Franchise pays an **Upfront Amount** (₹X) for a specific number of stations (Y). Admin records this in the system.
- **Revenue Model:** The Franchise pays a specific **percentage of total earnings** to Chargeghar based on the manual agreement. 
- **Payout:** Franchise requests payouts from the Admin when they have sufficient balance.

### B. Vendor Model (Assigned without Pre-payment)

- **Zero Upfront:** Unlike Franchises, Vendors **never pay upfront** and do not "buy" stations. They are assigned a station by the Admin or a Franchise.
- **Revenue Structure (Two Options):**
  1. **Share %:** Vendor receives a specific percentage of earnings (e.g., 2.5% to vendor, balance to Chargeghar/Franchise).
  2. **Fixed Rent (%):** Chargeghar/Franchise takes a fixed cut (e.g., 70%), and the vendor receives the remaining percentage.
- **Vendor Types:** 
  - **Revenue Vendor:** Has a dashboard and payout features.
  - **Non-Revenue Vendor:** Assigned for physical presence; excluded from revenue/dashboard features.
- **Conversion:** A Franchise can transition to a Vendor model after their initial agreement term ends, switching to fixed or percentage-based revenue.

---




