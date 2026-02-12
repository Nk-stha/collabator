export interface Vendor {
  id: string;
  code: string;
  business_name: string;
  vendor_type: 'REVENUE' | 'NON_REVENUE';
  contact_phone: string;
  contact_email: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  balance: number;
  total_earnings: number;
  created_at: string;
  station: {
    id: string;
    station_name: string;
    serial_number: string;
    address: string;
    status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
  };
}

export interface VendorListResponse {
  success: boolean;
  message: string;
  data: {
    results: Vendor[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_count: number;
      page_size: number;
      has_next: boolean;
      has_previous: boolean;
      next_page: number | null;
      previous_page: number | null;
    };
  };
}

export interface VendorDetail {
  id: string;
  code: string;
  business_name: string;
  vendor_type: 'REVENUE' | 'NON_REVENUE';
  contact_phone: string;
  contact_email: string | null;
  address: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  balance: number;
  total_earnings: number;
  created_at: string;
  updated_at: string;
  notes: string | null;
  user: {
    id: number;
    email: string;
    username: string;
    phone_number: string | null;
  };
  station: {
    id: string;
    station_name: string;
    serial_number: string;
    address: string;
    status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
    total_slots: number;
  };
  revenue_share: {
    revenue_model: 'PERCENTAGE' | 'FIXED';
    partner_percent: number | null;
    fixed_amount: number | null;
  } | null;
}

export interface VendorDetailResponse {
  success: boolean;
  message: string;
  data: VendorDetail;
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

export interface CreateVendorRequest {
  user_id: number;
  vendor_type: 'REVENUE' | 'NON_REVENUE';
  business_name: string;
  contact_phone: string;
  contact_email?: string;
  address?: string;
  station_id: string;
  revenue_model?: 'PERCENTAGE' | 'FIXED';
  partner_percent?: string;
  fixed_amount?: string;
  password?: string;
  notes?: string;
}

export interface CreateVendorResponse {
  success: boolean;
  message: string;
  data?: {
    vendor_id: string;
    business_name: string;
    vendor_type: string;
    station_assigned: string;
  };
  error?: {
    code: string;
    message: string;
    context?: any;
  };
}

export interface UpdateVendorRequest {
  business_name?: string;
  contact_phone?: string;
  contact_email?: string;
  address?: string;
}

export interface UpdateVendorResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    code: string;
    business_name: string;
    contact_phone: string;
    contact_email: string;
    address: string;
    updated_at: string;
  };
  error?: {
    code: string;
    message: string;
    context?: any;
  };
}

export interface UpdateVendorStatusRequest {
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  reason?: string;
}

export interface UpdateVendorStatusResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    status: string;
    updated_at: string;
  };
  error?: {
    code: string;
    message: string;
    context?: any;
  };
}

export interface UserSearchResult {
  id: number;
  email: string | null;
  phone_number: string | null;
  username: string;
  profile_picture: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  is_partner: boolean;
  profile: {
    full_name: string;
    date_of_birth: string | null;
    address: string | null;
    avatar_url: string | null;
    is_profile_complete: boolean;
  };
}

export interface UserSearchResponse {
  success: boolean;
  message: string;
  data: {
    results: UserSearchResult[];
    count: number;
    page: number;
    page_size: number;
    total_pages: number;
  };
}
