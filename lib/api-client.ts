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
  skipBaseUrl?: boolean; // Flag to use relative URL (for Next.js API routes)
  retryOnRateLimit?: boolean; // Flag to enable automatic retry on 429
  maxRetries?: number; // Maximum number of retries for rate limit
}

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// Request throttling to prevent rate limit
const requestQueue: Map<string, number> = new Map();
const REQUEST_DELAY = 100; // Minimum delay between requests to same endpoint (ms)

/**
 * Central API client wrapping native fetch.
 *
 * Features:
 * - Automatic token refresh on 401
 * - Rate limit handling with exponential backoff retry
 * - Request throttling to prevent hitting rate limits
 * - Centralized error handling
 *
 * Usage:
 *   const stations = await apiClient<Station[]>('/stations');
 *   const station  = await apiClient<Station>('/stations/123');
 *   await apiClient('/stations/123/eject', { method: 'POST', body: { slot: 3 } });
 *   
 *   // With rate limit retry:
 *   await apiClient('/stations', { retryOnRateLimit: true, maxRetries: 3 });
 */
export async function apiClient<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { 
    method = 'GET', 
    body, 
    headers = {}, 
    params, 
    cache, 
    revalidate, 
    skipAuthRefresh = false, 
    skipBaseUrl = false,
    retryOnRateLimit = false,
    maxRetries = 3
  } = config;

  const url = skipBaseUrl ? buildRelativeUrl(endpoint, params) : buildProxyUrl(endpoint, params);
  
  // All requests go through proxy now to avoid CORS issues
  const isProxyRequest = true;

  // Throttle requests to prevent rate limiting
  await throttleRequest(endpoint);

  const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Only add Authorization header for external API calls
      ...(!isProxyRequest ? { Authorization: `Bearer ${getAuthToken() || ''}` } : {}),
      ...headers,
    },
    credentials: 'include', // Important: include cookies in requests
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...(cache ? { cache } : {}),
    ...(revalidate !== undefined ? { next: { revalidate } } : {}),
  };

  let response: Response;
  let retryCount = 0;

  while (true) {
    try {
      response = await fetch(url, fetchOptions);
    } catch (error) {
      throw ApiError.networkError(
        error instanceof Error ? error.message : 'Network request failed'
      );
    }

    // Handle 429 Rate Limit with retry
    if (response.status === 429 && retryOnRateLimit && retryCount < maxRetries) {
      const retryAfter = response.headers.get('Retry-After');
      const waitTime = retryAfter 
        ? parseInt(retryAfter) * 1000 
        : Math.min(1000 * Math.pow(2, retryCount), 10000); // Exponential backoff, max 10s

      console.warn(`Rate limit hit. Retrying after ${waitTime}ms (attempt ${retryCount + 1}/${maxRetries})`);
      
      await sleep(waitTime);
      retryCount++;
      continue;
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

    break; // Exit loop if no retry needed
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

async function throttleRequest(endpoint: string): Promise<void> {
  const now = Date.now();
  const lastRequest = requestQueue.get(endpoint);
  
  if (lastRequest) {
    const timeSinceLastRequest = now - lastRequest;
    if (timeSinceLastRequest < REQUEST_DELAY) {
      await sleep(REQUEST_DELAY - timeSinceLastRequest);
    }
  }
  
  requestQueue.set(endpoint, Date.now());
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function refreshAccessToken(): Promise<string> {
  // Prevent multiple simultaneous refresh requests
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  
  refreshPromise = (async () => {
    try {
      // Use proxy endpoint since tokens are httpOnly
      const response = await fetch('/api/proxy/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data: any = await response.json();
      
      if (data.success && data.data?.access_token) {
        // Cookies are updated by the proxy route
        // Return a placeholder since we can't access httpOnly cookies
        return 'refreshed';
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
  // Not used anymore since tokens are httpOnly
  // Kept for compatibility
}

function getRefreshToken(): string | null {
  // Tokens are httpOnly, cannot be accessed from client
  return null;
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

function buildProxyUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  // Remove leading slash from endpoint
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const base = `/api/proxy/${cleanEndpoint}`;
  
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

function buildRelativeUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  if (!params) return endpoint;

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `${endpoint}?${queryString}` : endpoint;
}

function getAuthToken(): string | null {
  // Tokens are httpOnly and sent automatically with requests
  // This function is kept for compatibility but returns null
  // The browser will automatically include the httpOnly cookie
  return null;
}

async function handleErrorResponse(response: Response): Promise<never> {
  let errorBody: any = {};

  try {
    errorBody = await response.json();
  } catch {
    // Response body is not JSON
  }

  // Handle different error response formats
  let message: string;
  let fieldErrors: Record<string, string[]> | undefined;

  if (errorBody.error) {
    // Format: { success: false, error: { code: "...", message: "..." } }
    message = errorBody.error.message || getDefaultErrorMessage(response.status);
  } else if (errorBody.message) {
    // Format: { message: "...", errors: {...} }
    message = errorBody.message;
    fieldErrors = errorBody.errors;
  } else {
    message = getDefaultErrorMessage(response.status);
  }

  throw new ApiError(response.status, message, fieldErrors);
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
