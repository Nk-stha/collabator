import { apiClient } from '../api-client';
import type { Vendor, VendorListResponse, VendorDetail, VendorDetailResponse, PaginatedResponse, PaginationParams, CreateVendorRequest, CreateVendorResponse, UpdateVendorRequest, UpdateVendorResponse, UpdateVendorStatusRequest, UpdateVendorStatusResponse, UserSearchResponse } from '../types';

export const vendorService = {
  async getSubVendors(params?: PaginationParams): Promise<VendorListResponse> {
    return apiClient<VendorListResponse>('/partner/franchise/vendors', { params });
  },

  async getVendorById(id: string): Promise<VendorDetailResponse> {
    return apiClient<VendorDetailResponse>(`/partner/franchise/vendors/${id}`);
  },

  async createVendor(request: CreateVendorRequest): Promise<CreateVendorResponse> {
    return apiClient<CreateVendorResponse>('/partner/franchise/vendors', {
      method: 'POST',
      body: request,
    });
  },

  async updateVendor(id: string, request: UpdateVendorRequest): Promise<UpdateVendorResponse> {
    // Use Next.js API route proxy to bypass CORS
    return apiClient<UpdateVendorResponse>(`/api/proxy/vendors/${id}`, {
      method: 'PATCH',
      body: request,
      skipBaseUrl: true, // Use relative URL for Next.js API route
    });
  },

  async updateVendorStatus(id: string, request: UpdateVendorStatusRequest): Promise<UpdateVendorStatusResponse> {
    // Use Next.js API route proxy to bypass CORS
    return apiClient<UpdateVendorStatusResponse>(`/api/proxy/vendors/${id}/status`, {
      method: 'PATCH',
      body: request,
      skipBaseUrl: true,
    });
  },

  async searchUsers(query?: string): Promise<UserSearchResponse> {
    const params = query ? { search: query } : undefined;
    return apiClient<UserSearchResponse>('/partner/franchise/users/search', { params });
  },
};
