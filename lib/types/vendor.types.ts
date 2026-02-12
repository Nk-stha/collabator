export interface Vendor {
  id: string;
  name: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE';
  stations_count: number;
}

export interface VendorAgreementBase {
  id: string;
  type: string;
  value: string;
  start_date: string;
  status: 'ACTIVE' | 'PENDING' | 'EXPIRED';
}

export interface MasterAgreement extends VendorAgreementBase {
  partner: string;
  upfront_amount: string;
  stations_count: string;
  revenue_model: string;
  terms: string[];
}

export interface VendorAgreement extends VendorAgreementBase {
  vendor_name: string;
}
