/**
 * Centralized Type Definitions
 * Single source of truth for all application types
 */

/**
 * Page navigation types
 */
export type PageType = 
  | "search" 
  | "details" 
  | "services" 
  | "history" 
  | "receipts" 
  | "pay-fees" 
  | "add-services" 
  | "checkout" 
  | "payment" 
  | "processing" 
  | "failed" 
  | "success" 
  | "download-receipt";

/**
 * Navigation direction for animations
 */
export type NavigationDirection = 'forward' | 'back';

/**
 * Student entity
 */
export interface Student {
  id: string;
  name: string;
  grade: string;
  schoolName: string;
  parentPhone?: string;
  parentName?: string;
}

/**
 * Service entity
 */
export interface Service {
  id: string;
  name: string;
  description: string;
  amount: number;
  category?: string;
  isRecurring?: boolean;
}

/**
 * Checkout service item
 * Represents a service being purchased for a specific student
 */
export interface CheckoutService {
  id: string;
  description: string;
  amount: number;
  invoiceNo: string;
  studentName: string;
  studentId?: string;
}

/**
 * Payment data structure
 */
export interface PaymentData {
  id: string;
  date: string;
  amount: number;
  serviceFee: number;
  totalAmount: number;
  services: CheckoutService[];
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  receiptNumber: string;
  timestamp: number;
}

/**
 * Payment method types
 */
export type PaymentMethod = 
  | 'airtel-money' 
  | 'mtn-money' 
  | 'zamtel-money' 
  | 'visa' 
  | 'mastercard';

/**
 * Payment status types
 */
export type PaymentStatus = 
  | 'pending' 
  | 'processing' 
  | 'completed' 
  | 'failed' 
  | 'refunded';

/**
 * Payment request payload
 */
export interface PaymentRequest {
  userPhone: string;
  userName: string;
  services: CheckoutService[];
  totalAmount: number;
  serviceFee: number;
  finalAmount: number;
  schoolName: string;
  paymentMethod: PaymentMethod;
}

/**
 * Payment response from server
 */
export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  receiptNumber?: string;
  error?: string;
  message?: string;
}

/**
 * School entity
 */
export interface School {
  id: number | string;
  name: string;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
}

/**
 * User preferences
 */
export interface UserPreferences {
  studentSelections: Record<string, number>;
  serviceSelections: Record<string, number>;
  lastUsedPaymentMethod?: PaymentMethod;
  theme?: 'light' | 'dark';
}

/**
 * API Error response
 */
export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: unknown;
}

/**
 * Receipt data for PDF generation
 */
export interface ReceiptData {
  receiptNumber: string;
  date: string;
  studentName: string;
  studentId: string;
  schoolName: string;
  services: CheckoutService[];
  subtotal: number;
  serviceFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  parentName: string;
  parentPhone: string;
}

/**
 * Tutorial step
 */
export interface TutorialStep {
  title: string;
  description: string;
  position: "center" | "top" | "bottom";
}

/**
 * Form validation error
 */
export interface ValidationError {
  field: string;
  message: string;
}
