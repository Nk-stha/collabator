import { env } from './env';
import { ApiError } from './api-error';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  cache?: RequestCache;
  revalidate?: number;
  skipAuthRefresh?: boolean; // Flag to prevent infinite refresh loops
}

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

/**
 * Central API client wrapping native fetch.
 *
 * Usage:
 *   const stations = await apiClient<Station[]>('/stations');
 *   const station  = await apiClient<Station>('/stations/123');
 *   await apiClient('/stations/123/eject', { method: 'POST', body: { slot: 3 } });
 */
export async function apiClient<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { method = 'GET', body, headers = {}, params, cache, revalidate, skipAuthRefresh = false } = config;

  const url = buildUrl(endpoint, params);
  const token = getAuthToken();

  const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...(cache ? { cache } : {}),
    ...(revalidate !== undefined ? { next: { revalidate } } : {}),
  };

  let response: Response;

  try {
    response = await fetch(url, fetchOptions);
  } catch (error) {
    throw ApiError.networkError(
      error instanceof Error ? error.message : 'Network request failed'
    );
  }

  // Handle 401 Unauthorized - attempt token refresh
  if (response.status === 401 && !skipAuthRefresh && !endpoint.includes('/auth/refresh')) {
    try {
      const newToken = await refreshAccessToken();
      
      // Retry the original request with new token
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${newToken}`,
      };
      
      response = await fetch(url, fetchOptions);
    } catch (refreshError) {
      // Refresh failed, redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new ApiError(401, 'Session expired. Please log in again.');
    }
  }

  if (!response.ok) {
    await handleErrorResponse(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  try {
    const data: T = await response.json();
    return data;
  } catch {
    throw new ApiError(response.status, 'Invalid response format from server');
  }
}

// --- Helper Functions ---

async function refreshAccessToken(): Promise<string> {
  // Prevent multiple simultaneous refresh requests
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  
  refreshPromise = (async () => {
    try {
      const refreshToken = getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${env.API_BASE_URL}/partners/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data: any = await response.json();
      
      if (data.success && data.data) {
        const { access_token, refresh_token } = data.data;
        
        // Update cookies
        setTokenCookie('access_token', access_token, 60 * 60 * 24 * 30);
        setTokenCookie('refresh_token', refresh_token, 60 * 60 * 24 * 30);
        
        return access_token;
      }
      
      throw new Error('Invalid refresh response');
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function setTokenCookie(name: string, token: string, maxAge: number): void {
  if (typeof document !== 'undefined') {
    document.cookie = `${name}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  }
}

function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )refresh_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const base = `${env.API_BASE_URL}${endpoint}`;
  if (!params) return base;

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `${base}?${queryString}` : base;
}

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )access_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

async function handleErrorResponse(response: Response): Promise<never> {
  let errorBody: { message?: string; errors?: Record<string, string[]> } = {};

  try {
    errorBody = await response.json();
  } catch {
    // Response body is not JSON
  }

  const message = errorBody.message || getDefaultErrorMessage(response.status);
  throw new ApiError(response.status, message, errorBody.errors);
}

function getDefaultErrorMessage(status: number): string {
  const messages: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'Your session has expired. Please log in again.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    409: 'This action conflicts with the current state.',
    422: 'Validation failed. Please check the form fields.',
    429: 'Too many requests. Please wait a moment and try again.',
    500: 'An internal server error occurred. Please try again later.',
    502: 'The server is temporarily unavailable.',
    503: 'Service is under maintenance. Please try again later.',
  };
  return messages[status] || `Request failed with status ${status}`;
}
