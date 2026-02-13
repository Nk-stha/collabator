import { apiClient } from '../api-client';
import type { LoginRequest, LoginResponse, GetMeResponse, Partner, ChangePasswordRequest, ChangePasswordResponse, RefreshTokenRequest, RefreshTokenResponse } from '../types';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';
const TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30 days for refresh token

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Use proxy endpoint to bypass CORS
    const response = await apiClient<LoginResponse>('/api/proxy/auth/login', {
      method: 'POST',
      body: credentials,
      skipBaseUrl: true,
    });
    
    // Cookies are set by the proxy route as httpOnly
    // No need to set them client-side
    
    return response;
  },

  async getMe(): Promise<Partner> {
    const response = await apiClient<GetMeResponse>('/partners/auth/me', {
      method: 'GET',
    });
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch partner profile');
    }
    
    return response.data;
  },

  async logout(): Promise<void> {
    // Call proxy logout endpoint to clear httpOnly cookies
    try {
      await apiClient('/api/proxy/auth/logout', {
        method: 'POST',
        skipBaseUrl: true,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
    
    // Clear localStorage and sessionStorage
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
  },

  getAccessToken(): string | null {
    // Tokens are httpOnly, cannot be accessed from client
    // This method is kept for compatibility but will return null
    return null;
  },

  getRefreshToken(): string | null {
    // Tokens are httpOnly, cannot be accessed from client
    // This method is kept for compatibility but will return null
    return null;
  },

  async changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    const response = await apiClient<ChangePasswordResponse>('/partners/auth/change-password', {
      method: 'PUT',
      body: data,
    });
    return response;
  },

  async refreshToken(): Promise<RefreshTokenResponse> {
    // Use proxy endpoint since tokens are httpOnly
    const response = await apiClient<RefreshTokenResponse>('/api/proxy/auth/refresh', {
      method: 'POST',
      skipBaseUrl: true,
    });

    return response;
  },
};
