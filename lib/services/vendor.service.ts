import { apiClient } from '../api-client';
import type { Vendor, PaginatedResponse, PaginationParams } from '../types';

export const vendorService = {
  async getSubVendors(params?: PaginationParams): Promise<PaginatedResponse<Vendor>> {
    return apiClient<PaginatedResponse<Vendor>>('/vendors', { params });
  },

  async getVendorById(id: string): Promise<Vendor> {
    return apiClient<Vendor>(`/vendors/${id}`);
  },
};
