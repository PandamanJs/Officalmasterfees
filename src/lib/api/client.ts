/**
 * API Client
 * Centralized HTTP client with error handling, retries, and type safety
 */

import { API_CONFIG } from '../../config/constants';
import type { ApiError } from '../../types';

/**
 * HTTP Methods
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Request configuration
 */
interface RequestConfig {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  retry?: boolean;
  retryAttempts?: number;
}

/**
 * API Response wrapper
 */
interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  status: number;
}

/**
 * Create a timeout promise that rejects after specified milliseconds
 */
const createTimeoutPromise = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), ms);
  });
};

/**
 * Delay execution for specified milliseconds
 */
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * API Client Class
 */
class ApiClient {
  private baseUrl: string;
  private defaultTimeout: number;

  constructor(baseUrl: string = API_CONFIG.BASE_URL, timeout: number = API_CONFIG.TIMEOUT) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = timeout;
  }

  /**
   * Make an HTTP request with error handling and retry logic
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      body,
      headers = {},
      timeout = this.defaultTimeout,
      retry = true,
      retryAttempts = API_CONFIG.RETRY_ATTEMPTS,
    } = config;

    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    const fetchOptions: RequestInit = {
      method,
      headers: defaultHeaders,
      ...(body && { body: JSON.stringify(body) }),
    };

    let lastError: Error | null = null;
    let attempts = 0;

    while (attempts < (retry ? retryAttempts : 1)) {
      try {
        attempts++;

        // Race between fetch and timeout
        const response = await Promise.race([
          fetch(url, fetchOptions),
          createTimeoutPromise(timeout),
        ]) as Response;

        // Handle non-OK responses
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const error: ApiError = {
            message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
            code: errorData.code,
            statusCode: response.status,
            details: errorData,
          };

          return {
            data: null,
            error,
            status: response.status,
          };
        }

        // Parse successful response
        const data = await response.json();

        return {
          data: data as T,
          error: null,
          status: response.status,
        };

      } catch (error) {
        lastError = error as Error;

        // Don't retry on timeout or if retry is disabled
        if (!retry || error instanceof Error && error.message === 'Request timeout') {
          break;
        }

        // Wait before retrying (exponential backoff)
        if (attempts < retryAttempts) {
          await delay(API_CONFIG.RETRY_DELAY * attempts);
        }
      }
    }

    // All retries failed
    const apiError: ApiError = {
      message: lastError?.message || 'Unknown error occurred',
      code: 'NETWORK_ERROR',
      statusCode: 0,
    };

    return {
      data: null,
      error: apiError,
      status: 0,
    };
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: unknown, config?: Omit<RequestConfig, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: unknown, config?: Omit<RequestConfig, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, body?: unknown, config?: Omit<RequestConfig, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  /**
   * Set base URL
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * Get base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}

/**
 * Default API client instance
 */
export const apiClient = new ApiClient();

/**
 * Export the class for custom instances
 */
export { ApiClient };
