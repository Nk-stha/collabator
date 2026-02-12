import { apiClient } from '../api-client';
import type { EjectionStats, EjectionLog, PaginatedResponse, PaginationParams, IoTHistoryParams, IoTHistoryResponse } from '../types';

export const ejectionService = {
  async getStats(): Promise<EjectionStats> {
    return apiClient<EjectionStats>('/ejections/stats');
  },

  async getLogs(params?: PaginationParams): Promise<PaginatedResponse<EjectionLog>> {
    return apiClient<PaginatedResponse<EjectionLog>>('/ejections/logs', { params });
  },

  async getIoTHistory(params?: IoTHistoryParams): Promise<IoTHistoryResponse> {
    return apiClient<IoTHistoryResponse>('/partner/iot/history', { params });
  },
};
