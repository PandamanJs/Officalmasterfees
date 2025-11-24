/**
 * API Service Layer
 * Business logic for API calls with typed responses
 */

import { apiClient } from './client';
import type { 
  Student, 
  Service, 
  PaymentRequest, 
  PaymentResponse, 
  PaymentData,
  ApiError,
} from '../../types';

/**
 * Students API
 */
export const studentsApi = {
  /**
   * Search students by query
   */
  async search(query: string, phone?: string): Promise<{ data: Student[] | null; error: ApiError | null }> {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (phone) params.append('phone', phone);

    const response = await apiClient.get<Student[]>(`/api/students/search?${params.toString()}`);
    return { data: response.data, error: response.error };
  },

  /**
   * Get student by ID
   */
  async getById(id: string): Promise<{ data: Student | null; error: ApiError | null }> {
    const response = await apiClient.get<Student>(`/api/students/${id}`);
    return { data: response.data, error: response.error };
  },

  /**
   * Get students by phone number
   */
  async getByPhone(phone: string): Promise<{ data: Student[] | null; error: ApiError | null }> {
    const response = await apiClient.get<Student[]>(`/api/students/phone/${phone}`);
    return { data: response.data, error: response.error };
  },
};

/**
 * Services API
 */
export const servicesApi = {
  /**
   * Get all available services
   */
  async getAll(): Promise<{ data: Service[] | null; error: ApiError | null }> {
    const response = await apiClient.get<Service[]>('/api/services');
    return { data: response.data, error: response.error };
  },

  /**
   * Get services by category
   */
  async getByCategory(category: string): Promise<{ data: Service[] | null; error: ApiError | null }> {
    const response = await apiClient.get<Service[]>(`/api/services/category/${category}`);
    return { data: response.data, error: response.error };
  },

  /**
   * Get service by ID
   */
  async getById(id: string): Promise<{ data: Service | null; error: ApiError | null }> {
    const response = await apiClient.get<Service>(`/api/services/${id}`);
    return { data: response.data, error: response.error };
  },
};

/**
 * Payment API
 */
export const paymentApi = {
  /**
   * Process a payment
   */
  async process(paymentData: PaymentRequest): Promise<{ data: PaymentResponse | null; error: ApiError | null }> {
    const response = await apiClient.post<PaymentResponse>('/api/payments/process', paymentData, {
      retry: false, // Don't retry payment requests
      timeout: 60000, // 60 seconds for payment processing
    });
    return { data: response.data, error: response.error };
  },

  /**
   * Get payment history for a phone number
   */
  async getHistory(phone: string): Promise<{ data: PaymentData[] | null; error: ApiError | null }> {
    const response = await apiClient.get<PaymentData[]>(`/api/payments/history/${phone}`);
    return { data: response.data, error: response.error };
  },

  /**
   * Get payment by transaction ID
   */
  async getByTransactionId(transactionId: string): Promise<{ data: PaymentData | null; error: ApiError | null }> {
    const response = await apiClient.get<PaymentData>(`/api/payments/${transactionId}`);
    return { data: response.data, error: response.error };
  },

  /**
   * Verify payment status
   */
  async verifyStatus(transactionId: string): Promise<{ data: { status: string; verified: boolean } | null; error: ApiError | null }> {
    const response = await apiClient.get<{ status: string; verified: boolean }>(`/api/payments/verify/${transactionId}`);
    return { data: response.data, error: response.error };
  },
};

/**
 * Health check API
 */
export const healthApi = {
  /**
   * Check API health
   */
  async check(): Promise<{ data: { status: string; timestamp: number } | null; error: ApiError | null }> {
    const response = await apiClient.get<{ status: string; timestamp: number }>('/api/health', {
      retry: false,
      timeout: 5000,
    });
    return { data: response.data, error: response.error };
  },
};

/**
 * Export all API services
 */
export const api = {
  students: studentsApi,
  services: servicesApi,
  payment: paymentApi,
  health: healthApi,
};
