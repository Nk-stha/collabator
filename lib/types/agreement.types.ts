export interface AgreementPartner {
  id: string;
  code: string;
  business_name: string;
  vendor_type?: string;
  status: string;
  balance: number;
  total_earnings: number;
}

export interface AgreementStation {
  id: string;
  name: string;
  code: string;
  address: string;
  total_slots: number;
}

export interface Distribution {
  distribution_type: string;
  effective_date: string;
  is_active: boolean;
}

export interface RevenueModel {
  model_type: 'PERCENTAGE' | 'FIXED';
  partner_percent?: number;
  fixed_amount?: number;
  description: string;
}

export interface Agreement {
  vendor: AgreementPartner;
  parent: AgreementPartner | null;
  station: AgreementStation;
  distribution: Distribution;
  revenue_model: RevenueModel;
}

export interface FranchiseAgreement {
  franchise_id: string;
  franchise_code: string;
  franchise_name: string;
  revenue_share_percent: string;
  upfront_payment: string;
  balance: string;
  total_earnings: string;
  total_stations: number;
  total_vendors: number;
  created_at: string;
}

export interface FranchiseVendorAgreement {
  vendor_id: string;
  vendor_code: string;
  vendor_name: string;
  station_id: string;
  station_name: string;
  revenue_share_percent: string;
  status: string;
  created_at: string;
}

export interface FranchiseAgreementsData {
  franchise_agreement: FranchiseAgreement;
  vendor_agreements: FranchiseVendorAgreement[];
}

export interface AgreementResponse {
  success: boolean;
  message: string;
  data: Agreement;
}

export interface FranchiseAgreementsResponse {
  success: boolean;
  message: string;
  data: FranchiseAgreementsData;
}
