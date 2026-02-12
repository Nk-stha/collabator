import { apiClient } from '../api-client';
import type { 
  PayoutListResponse, 
  PayoutListParams, 
  PayoutRequestParams, 
  PayoutRequestResponse, 
  VendorPayoutListResponse,
  VendorPayoutActionResponse,
  RejectVendorPayoutParams
} from '../types';

export const payoutService = {
  async getVendorPayouts(params?: PayoutListParams): Promise<PayoutListResponse> {
    return apiClient<PayoutListResponse>('/partner/vendor/payouts', { params });
  },

  async getFranchisePayouts(params?: PayoutListParams): Promise<PayoutListResponse> {
    return apiClient<PayoutListResponse>('/partner/franchise/payouts', { params });
  },

  async getFranchiseVendorPayouts(params?: PayoutListParams): Promise<VendorPayoutListResponse> {
    return apiClient<VendorPayoutListResponse>('/partner/franchise/payouts/vendors', { params });
  },

  async requestVendorPayout(params: PayoutRequestParams): Promise<PayoutRequestResponse> {
    return apiClient<PayoutRequestResponse>('/partner/vendor/payouts/request', { 
      method: 'POST',
      body: params
    });
  },

  async requestFranchisePayout(params: PayoutRequestParams): Promise<PayoutRequestResponse> {
    return apiClient<PayoutRequestResponse>('/partner/franchise/payouts/request', { 
      method: 'POST',
      body: params
    });
  },

  async approveVendorPayout(payoutId: string): Promise<VendorPayoutActionResponse> {
    return apiClient<VendorPayoutActionResponse>(
      `/api/proxy/payouts/vendors/${payoutId}/approve`, 
      { method: 'PATCH', skipBaseUrl: true }
    );
  },

  async completeVendorPayout(payoutId: string): Promise<VendorPayoutActionResponse> {
    return apiClient<VendorPayoutActionResponse>(
      `/api/proxy/payouts/vendors/${payoutId}/complete`, 
      { method: 'PATCH', skipBaseUrl: true }
    );
  },

  async rejectVendorPayout(payoutId: string, params: RejectVendorPayoutParams): Promise<VendorPayoutActionResponse> {
    return apiClient<VendorPayoutActionResponse>(
      `/api/proxy/payouts/vendors/${payoutId}/reject`, 
      { 
        method: 'PATCH',
        body: params,
        skipBaseUrl: true
      }
    );
  },
};
