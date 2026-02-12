import { apiClient } from '../api-client';
import type { PayoutListResponse, PayoutListParams } from '../types';

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

export const payoutService = {
  async getVendorPayouts(params?: PayoutListParams): Promise<PayoutListResponse> {
    return apiClient<PayoutListResponse>('/partner/vendor/payouts', { params });
  },

  async getFranchisePayouts(params?: PayoutListParams): Promise<PayoutListResponse> {
    return apiClient<PayoutListResponse>('/partner/franchise/payouts', { params });
  },

  async requestVendorPayout(params: PayoutRequestParams): Promise<PayoutRequestResponse> {
    return apiClient<PayoutRequestResponse>('/partner/vendor/payouts/request', { 
      method: 'POST',
      body: params
    });
  },
};
