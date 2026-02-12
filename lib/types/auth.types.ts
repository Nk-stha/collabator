export interface LoginRequest {
  email: string;
  password: string;
}

export interface PartnerProfile {
  full_name: string | null;
  date_of_birth: string | null;
  address: string | null;
  avatar_url: string | null;
}

export interface Partner {
  id: string;
  partner_type: 'VENDOR' | 'FRANCHISEE';
  vendor_type: 'REVENUE' | 'NON_REVENUE' | null;
  code: string;
  business_name: string;
  contact_phone: string;
  contact_email: string;
  status: 'ACTIVE' | 'INACTIVE';
  balance: string;
  total_earnings: string;
  profile: PartnerProfile;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    partner: Partner;
  };
}

export interface GetMeResponse {
  success: boolean;
  message: string;
  data: Partner;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}

// Legacy type for backward compatibility
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'VENDOR' | 'FRANCHISEE';
}
