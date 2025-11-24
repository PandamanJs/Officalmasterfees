/**
 * Form Validation Utilities
 * Centralized validation logic for all form inputs
 */

import { VALIDATION } from '../config/constants';
import type { ValidationError } from '../types';

/**
 * Validate phone number
 * @param phone - Phone number string (with or without formatting)
 * @returns Error message or empty string if valid
 */
export function validatePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (!cleaned) {
    return 'Phone number is required';
  }
  
  if (cleaned.length < VALIDATION.PHONE_MIN_LENGTH) {
    return `Phone number must be at least ${VALIDATION.PHONE_MIN_LENGTH} digits`;
  }
  
  if (cleaned.length > VALIDATION.PHONE_MAX_LENGTH) {
    return `Phone number must not exceed ${VALIDATION.PHONE_MAX_LENGTH} digits`;
  }
  
  return '';
}

/**
 * Validate user name
 * @param name - User name string
 * @returns Error message or empty string if valid
 */
export function validateName(name: string): string {
  const trimmed = name.trim();
  
  if (!trimmed) {
    return 'Name is required';
  }
  
  if (trimmed.length < VALIDATION.NAME_MIN_LENGTH) {
    return `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`;
  }
  
  if (trimmed.length > VALIDATION.NAME_MAX_LENGTH) {
    return `Name must not exceed ${VALIDATION.NAME_MAX_LENGTH} characters`;
  }
  
  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  }
  
  return '';
}

/**
 * Validate credit card number (Luhn algorithm)
 * @param cardNumber - Card number string
 * @returns Error message or empty string if valid
 */
export function validateCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (!cleaned) {
    return 'Card number is required';
  }
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return 'Card number must be between 13 and 19 digits';
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  if (sum % 10 !== 0) {
    return 'Invalid card number';
  }
  
  return '';
}

/**
 * Validate card expiry date (MM/YY format)
 * @param expiryDate - Expiry date string
 * @returns Error message or empty string if valid
 */
export function validateExpiryDate(expiryDate: string): string {
  const cleaned = expiryDate.replace(/\D/g, '');
  
  if (!cleaned) {
    return 'Expiry date is required';
  }
  
  if (cleaned.length !== 4) {
    return 'Expiry date must be in MM/YY format';
  }
  
  const month = parseInt(cleaned.substring(0, 2), 10);
  const year = parseInt(cleaned.substring(2, 4), 10);
  
  if (month < 1 || month > 12) {
    return 'Invalid month';
  }
  
  // Check if card is expired
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return 'Card has expired';
  }
  
  return '';
}

/**
 * Validate CVV
 * @param cvv - CVV string
 * @returns Error message or empty string if valid
 */
export function validateCVV(cvv: string): string {
  const cleaned = cvv.replace(/\D/g, '');
  
  if (!cleaned) {
    return 'CVV is required';
  }
  
  if (cleaned.length < 3 || cleaned.length > 4) {
    return 'CVV must be 3 or 4 digits';
  }
  
  return '';
}

/**
 * Validate email address
 * @param email - Email string
 * @returns Error message or empty string if valid
 */
export function validateEmail(email: string): string {
  const trimmed = email.trim();
  
  if (!trimmed) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Invalid email address';
  }
  
  return '';
}

/**
 * Validate amount
 * @param amount - Amount number or string
 * @param min - Minimum allowed amount
 * @param max - Maximum allowed amount
 * @returns Error message or empty string if valid
 */
export function validateAmount(amount: number | string, min: number = 0, max: number = Infinity): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return 'Amount must be a valid number';
  }
  
  if (numAmount < min) {
    return `Amount must be at least ${min}`;
  }
  
  if (numAmount > max) {
    return `Amount must not exceed ${max}`;
  }
  
  return '';
}

/**
 * Validate selection (at least one item selected)
 * @param items - Array of selected items
 * @param minCount - Minimum number of items required
 * @returns Error message or empty string if valid
 */
export function validateSelection<T>(items: T[], minCount: number = 1): string {
  if (!items || items.length < minCount) {
    return `Please select at least ${minCount} item${minCount > 1 ? 's' : ''}`;
  }
  
  return '';
}

/**
 * Check if form has any errors
 * @param errors - Object containing field errors
 * @returns True if any field has an error
 */
export function hasFormErrors(errors: Record<string, string>): boolean {
  return Object.values(errors).some(error => error !== '');
}

/**
 * Check if form is complete
 * @param values - Object containing field values
 * @param requiredFields - Array of required field names
 * @returns True if all required fields have values
 */
export function isFormComplete(values: Record<string, unknown>, requiredFields: string[]): boolean {
  return requiredFields.every(field => {
    const value = values[field];
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== null && value !== undefined;
  });
}

/**
 * Validate multiple fields at once
 * @param fields - Object with field names and their validators
 * @returns Object with field names and their error messages
 */
export function validateFields(fields: Record<string, { value: unknown; validator: (value: any) => string }>): Record<string, string> {
  const errors: Record<string, string> = {};
  
  for (const [fieldName, { value, validator }] of Object.entries(fields)) {
    errors[fieldName] = validator(value);
  }
  
  return errors;
}

/**
 * Format validation errors for display
 * @param errors - Object containing field errors
 * @returns Array of ValidationError objects
 */
export function formatValidationErrors(errors: Record<string, string>): ValidationError[] {
  return Object.entries(errors)
    .filter(([_, message]) => message !== '')
    .map(([field, message]) => ({ field, message }));
}

/**
 * Debounce validation (for real-time validation)
 * @param validator - Validation function
 * @param delay - Delay in milliseconds
 * @returns Debounced validation function
 */
export function debounceValidation<T>(
  validator: (value: T) => string,
  delay: number = VALIDATION.DEBOUNCE_DELAY
): (value: T, callback: (error: string) => void) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (value: T, callback: (error: string) => void) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const error = validator(value);
      callback(error);
    }, delay);
  };
}

/**
 * Real-time input validator hook helper
 * Returns validation state and handlers
 */
export function createInputValidator<T>(
  validator: (value: T) => string,
  options: {
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
    debounce?: number;
  } = {}
) {
  const {
    validateOnChange = false,
    validateOnBlur = true,
    debounce = 0,
  } = options;
  
  return {
    validator: debounce > 0 ? debounceValidation(validator, debounce) : validator,
    validateOnChange,
    validateOnBlur,
  };
}
