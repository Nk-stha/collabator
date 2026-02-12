export interface DashboardStation {
  id: string;
  name: string;
  code: string;
}

export interface DashboardPeriodStats {
  transactions: number;
  gross_revenue: number;
  my_share: number;
}

export interface VendorDashboard {
  balance: number;
  total_earnings: number;
  pending_payout: number;
  station: DashboardStation;
  today: DashboardPeriodStats;
  this_week: DashboardPeriodStats;
  this_month: DashboardPeriodStats;
}

export interface VendorDashboardResponse {
  success: boolean;
  message: string;
  data: VendorDashboard;
}

export interface FranchiseDashboard {
  profile: {
    id: string;
    code: string;
    business_name: string;
    status: string;
    revenue_share_percent: number;
  };
  balance: number;
  total_earnings: number;
  pending_payout: number;
  stations_count: number;
  vendors_count: number;
  vendor_payouts_pending: number;
  vendor_payouts_amount: number;
  today: DashboardPeriodStats;
  this_week: DashboardPeriodStats;
  this_month: DashboardPeriodStats;
}

export interface FranchiseDashboardResponse {
  success: boolean;
  message: string;
  data: FranchiseDashboard;
}
