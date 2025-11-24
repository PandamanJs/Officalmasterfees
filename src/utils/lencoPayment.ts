/**
 * Lenco Payment Integration Utility
 * 
 * Handles payment processing through Lenco's payment gateway
 * Supports both card and mobile money payments
 */

// Extend the Window interface to include LencoPay
declare global {
  interface Window {
    LencoPay: {
      getPaid: (config: LencoPaymentConfig) => void;
    };
  }
}

export interface LencoCustomer {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface LencoBilling {
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface LencoPaymentConfig {
  key: string;
  reference: string;
  email: string;
  amount: number;
  currency?: string;
  label?: string;
  bearer?: 'merchant' | 'customer';
  channels?: ('card' | 'mobile-money')[];
  customer?: LencoCustomer;
  billing?: LencoBilling;
  onSuccess?: (response: LencoSuccessResponse) => void;
  onClose?: () => void;
  onConfirmationPending?: () => void;
}

export interface LencoSuccessResponse {
  reference: string;
  status: string;
  message: string;
}

export interface LencoPaymentData {
  userName: string;
  userPhone: string;
  userEmail: string;
  amount: number;
  schoolName: string;
  services: Array<{ name: string; amount: number }>;
}

/**
 * Generate a unique reference for the payment
 * Format: MF-YYYYMMDD-TIMESTAMP-RANDOM
 * 
 * @returns Unique payment reference string
 */
export function generatePaymentReference(): string {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return `MF-${dateStr}-${timestamp}-${random}`;
}

/**
 * Split full name into first name and last name
 * 
 * @param fullName - Full name of the customer
 * @returns Object with firstName and lastName
 */
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const nameParts = fullName.trim().split(' ');
  
  if (nameParts.length === 1) {
    return {
      firstName: nameParts[0],
      lastName: '',
    };
  }
  
  return {
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(' '),
  };
}

/**
 * Format phone number for Lenco (remove formatting characters)
 * 
 * @param phone - Phone number with possible formatting
 * @returns Clean phone number string
 */
export function formatPhoneForLenco(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // If it starts with 260, keep as is
  if (cleaned.startsWith('260')) {
    return `0${cleaned.slice(3)}`;
  }
  
  // If it starts with 0, keep as is
  if (cleaned.startsWith('0')) {
    return cleaned;
  }
  
  // Otherwise add 0
  return `0${cleaned}`;
}

/**
 * Initialize Lenco payment widget
 * 
 * @param paymentData - Payment information
 * @param publicKey - Lenco public key
 * @param onSuccess - Callback for successful payment
 * @param onClose - Callback for closed payment window
 * @param onConfirmationPending - Callback for pending confirmation
 */
export function initializeLencoPayment(
  paymentData: LencoPaymentData,
  publicKey: string,
  onSuccess: (reference: string) => void,
  onClose: () => void,
  onConfirmationPending: () => void
): void {
  // Check if LencoPay is available
  if (!window.LencoPay) {
    console.error('Lenco payment widget not loaded');
    throw new Error('Payment system not available. Please refresh the page.');
  }

  // Generate unique reference
  const reference = generatePaymentReference();

  // Split customer name
  const { firstName, lastName } = splitName(paymentData.userName);

  // Format phone number
  const formattedPhone = formatPhoneForLenco(paymentData.userPhone);

  // Configure payment
  const config: LencoPaymentConfig = {
    key: publicKey,
    reference: reference,
    email: paymentData.userEmail,
    amount: paymentData.amount,
    currency: 'ZMW',
    label: `${paymentData.schoolName} - School Fees`,
    bearer: 'customer',
    channels: ['card', 'mobile-money'],
    customer: {
      firstName: firstName,
      lastName: lastName,
      phone: formattedPhone,
    },
    onSuccess: (response: LencoSuccessResponse) => {
      console.log('Payment successful:', response);
      onSuccess(response.reference);
    },
    onClose: () => {
      console.log('Payment window closed');
      onClose();
    },
    onConfirmationPending: () => {
      console.log('Payment confirmation pending');
      onConfirmationPending();
    },
  };

  // Initialize payment widget
  window.LencoPay.getPaid(config);
}

/**
 * Verify payment status on the backend
 * 
 * @param reference - Payment reference to verify
 * @returns Promise with verification result
 */
export async function verifyPayment(reference: string): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  try {
    const response = await fetch(`/api/verify-payment?reference=${reference}`);
    
    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check if Lenco widget is loaded and ready
 * 
 * @returns true if Lenco is available
 */
export function isLencoReady(): boolean {
  return typeof window !== 'undefined' && !!window.LencoPay;
}
