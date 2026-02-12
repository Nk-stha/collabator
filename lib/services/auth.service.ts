import { apiClient } from '../api-client';
import type { LoginRequest, LoginResponse, GetMeResponse, Partner, ChangePasswordRequest, ChangePasswordResponse, RefreshTokenRequest, RefreshTokenResponse } from '../types';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';
const TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30 days for refresh token

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient<LoginResponse>('/partners/auth/login', {
      method: 'POST',
      body: credentials,
    });
    
    if (response.success && response.data) {
      setTokenCookie(ACCESS_TOKEN_COOKIE, response.data.access_token, 60 * 60 * 24 * 30); // 30 days
      setTokenCookie(REFRESH_TOKEN_COOKIE, response.data.refresh_token, TOKEN_MAX_AGE);
    }
    
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
    const refreshToken = this.getRefreshToken();
    
    // Call API to blacklist refresh token
    if (refreshToken) {
      try {
        await apiClient('/partners/auth/logout', {
          method: 'POST',
          body: { refresh_token: refreshToken },
        });
      } catch (error) {
        // Continue with local cleanup even if API call fails
        console.error('Logout API call failed:', error);
      }
    }
    
    // Clear all cookies
    document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
    document.cookie = `${REFRESH_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    
    // Clear sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  },

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${ACCESS_TOKEN_COOKIE}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  },

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${REFRESH_TOKEN_COOKIE}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  },

  async changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    const response = await apiClient<ChangePasswordResponse>('/partners/auth/change-password', {
      method: 'PUT',
      body: data,
    });
    return response;
  },

  async refreshToken(): Promise<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient<RefreshTokenResponse>('/partners/auth/refresh', {
      method: 'POST',
      body: { refresh_token: refreshToken },
    });

    if (response.success && response.data) {
      // Update tokens in cookies
      setTokenCookie(ACCESS_TOKEN_COOKIE, response.data.access_token, 60 * 60 * 24 * 30);
      setTokenCookie(REFRESH_TOKEN_COOKIE, response.data.refresh_token, TOKEN_MAX_AGE);
    }

    return response;
  },
};

function setTokenCookie(name: string, token: string, maxAge: number): void {
  document.cookie = `${name}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}
