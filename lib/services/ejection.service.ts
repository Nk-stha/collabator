import { apiClient } from '../api-client';
import type { EjectionStats, EjectionLog, PaginatedResponse, PaginationParams } from '../types';

export const ejectionService = {
  async getStats(): Promise<EjectionStats> {
    return apiClient<EjectionStats>('/ejections/stats');
  },

  async getLogs(params?: PaginationParams): Promise<PaginatedResponse<EjectionLog>> {
    return apiClient<PaginatedResponse<EjectionLog>>('/ejections/logs', { params });
  },
};
