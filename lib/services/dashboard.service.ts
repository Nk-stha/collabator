import { apiClient } from '../api-client';
import type { VendorDashboardResponse, FranchiseDashboardResponse } from '../types';

export const dashboardService = {
  async getVendorDashboard(): Promise<VendorDashboardResponse> {
    return apiClient<VendorDashboardResponse>('/partner/vendor/dashboard');
  },

  async getFranchiseDashboard(): Promise<FranchiseDashboardResponse> {
    return apiClient<FranchiseDashboardResponse>('/partner/franchise/dashboard');
  },
};
