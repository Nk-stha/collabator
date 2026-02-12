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
