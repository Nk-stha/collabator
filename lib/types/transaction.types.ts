export interface Transaction {
  id: string;
  transaction_id: string;
  type: 'EARNED' | 'CREDIT' | 'TOPUP' | 'DEBIT';
  amount?: number;
  points?: number;
  status: string;
  created_at: string;
  description: string;
  source: string;
  user: {
    id: string;
    username: string;
    email: string | null;
  };
}

export interface Payout {
  id: string;
  reference_id: string;
  amount: number;
  net_amount: number;
  status: 'PENDING' | 'APPROVED' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  payout_type: string;
  bank_name: string | null;
  account_number: string | null;
  account_holder_name: string | null;
  requested_at: string;
  processed_at: string | null;
  processed_by: string | null;
  rejection_reason: string;
  admin_notes: string;
}

export interface PayoutListResponse {
  success: boolean;
  message: string;
  data: {
    results: Payout[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_count: number;
      page_size: number;
      has_next: boolean;
      has_previous: boolean;
      next_page: number | null;
      previous_page: number | null;
    };
    summary: {
      pending_amount: number;
      total_paid: number;
    };
  };
}

export interface PayoutListParams {
  page?: number;
  page_size?: number;
  start_date?: string;
  end_date?: string;
  status?: 'PENDING' | 'APPROVED' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  [key: string]: string | number | undefined;
}

export interface PayoutTransaction {
  id: string;
  date: string;
  method: { type: string; icon: string };
  amount: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface PayoutStats {
  total_earned: number;
  available_balance: number;
  last_payout_amount: number;
  last_payout_date: string;
}

export interface PayoutRequestParams {
  amount: string;
  bank_name: string;
  account_number: string;
  account_holder_name: string;
}

export interface PayoutRequestResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    reference_id: string;
    amount: number;
    status: string;
    requested_at: string;
  };
}

export interface VendorPayout {
  id: string;
  reference_id: string;
  amount: number;
  net_amount: number;
  status: 'PENDING' | 'APPROVED' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  bank_name: string | null;
  account_number: string | null;
  account_holder_name: string | null;
  created_at: string;
  processed_at: string | null;
  rejection_reason: string | null;
  vendor: {
    id: string;
    code: string;
    business_name: string;
  };
}

export interface VendorPayoutListResponse {
  success: boolean;
  message: string;
  data: {
    results: VendorPayout[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_count: number;
      page_size: number;
      has_next: boolean;
      has_previous: boolean;
      next_page: number | null;
      previous_page: number | null;
    };
  };
}

export interface VendorPayoutActionResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: string;
    updated_at: string;
  };
}

export interface RejectVendorPayoutParams {
  reason: string;
}

// Revenue Types
export interface RevenueTransaction {
  id: string;
  transaction_id: string;
  rental_id: string | null;
  station: {
    id: string;
    station_name: string;
    serial_number: string;
  };
  vendor: {
    id: string;
    code: string;
    business_name: string;
  } | null;
  gross_amount: string;
  vat_amount: string;
  service_charge: string;
  net_amount: string;
  chargeghar_share: string;
  franchise_share: string;
  vendor_share: string;
  is_distributed: boolean;
  created_at: string;
}

export interface RevenueSummary {
  total_transactions: number;
  total_gross: string;
  total_net: string;
  franchise_total_share: string;
}

export interface RevenueListResponse {
  success: boolean;
  message: string;
  data: {
    results: RevenueTransaction[];
    summary: RevenueSummary;
    pagination: {
      current_page: number;
      total_pages: number;
      total_count: number;
      page_size: number;
      has_next: boolean;
      has_previous: boolean;
      next_page: number | null;
      previous_page: number | null;
    };
  };
}

export interface RevenueListParams {
  page?: number;
  page_size?: number;
  start_date?: string;
  end_date?: string;
  station_id?: string;
  vendor_id?: string;
  [key: string]: string | number | undefined;
}

// Vendor Revenue Types
export interface VendorRevenueTransaction {
  id: string;
  rental_id: string | null;
  transaction_date: string;
  gross_revenue: string;
  net_revenue: string;
  vat_amount: string;
  service_charge: string;
  vendor_share: string;
  vendor_share_percent: string;
  station: {
    id: string;
    name: string;
  };
}

export interface VendorRevenueSummary {
  total_transactions: number;
  total_gross_revenue: string;
  total_net_revenue: string;
  total_vendor_share: string;
}

export interface VendorRevenueListResponse {
  success: boolean;
  message: string;
  data: {
    results: VendorRevenueTransaction[];
    summary: VendorRevenueSummary;
    pagination: {
      current_page: number;
      total_pages: number;
      total_count: number;
      page_size: number;
      has_next: boolean;
      has_previous: boolean;
      next_page: number | null;
      previous_page: number | null;
    };
  };
}

export interface VendorRevenueListParams {
  page?: number;
  page_size?: number;
  start_date?: string;
  end_date?: string;
  station_id?: string;
  [key: string]: string | number | undefined;
}
