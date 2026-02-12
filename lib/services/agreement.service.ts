import { apiClient } from '../api-client';
import type { AgreementResponse, FranchiseAgreementsResponse } from '../types';

export const agreementService = {
  async getVendorAgreement(): Promise<AgreementResponse> {
    return apiClient<AgreementResponse>('/partner/vendor/agreement');
  },

  async getFranchiseAgreement(): Promise<AgreementResponse> {
    return apiClient<AgreementResponse>('/partner/franchise/agreement');
  },

  async getFranchiseAgreements(): Promise<FranchiseAgreementsResponse> {
    return apiClient<FranchiseAgreementsResponse>('/partner/franchise/agreements');
  },
};
