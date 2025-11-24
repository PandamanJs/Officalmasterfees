/**
 * Preferences Utility
 * 
 * Manages user preferences and autofill data using localStorage.
 * Tracks frequently selected options to improve user experience
 * with smart autofill and pre-selection.
 * 
 * Features:
 * - Phone number autofill
 * - Most selected students tracking
 * - Most selected services tracking  
 * - Last used payment method
 * - Frequency-based ranking
 */

const STORAGE_KEYS = {
  LAST_PHONE: 'masterfees_last_phone',
  STUDENT_FREQUENCY: 'masterfees_student_frequency',
  SERVICE_FREQUENCY: 'masterfees_service_frequency',
  LAST_PAYMENT_METHOD: 'masterfees_last_payment_method',
} as const;

/**
 * Saves the last used phone number for autofill
 */
export const saveLastPhone = (phoneNumber: string): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_PHONE, phoneNumber);
  } catch (error) {
    console.error('Error saving phone number:', error);
  }
};

/**
 * Gets the last used phone number
 */
export const getLastPhone = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.LAST_PHONE);
  } catch (error) {
    console.error('Error retrieving phone number:', error);
    return null;
  }
};

/**
 * Increments the selection count for a student
 * Tracks how often each student is selected
 */
export const incrementStudentSelection = (studentId: string): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STUDENT_FREQUENCY);
    const frequency: Record<string, number> = stored ? JSON.parse(stored) : {};
    
    frequency[studentId] = (frequency[studentId] || 0) + 1;
    
    localStorage.setItem(STORAGE_KEYS.STUDENT_FREQUENCY, JSON.stringify(frequency));
  } catch (error) {
    console.error('Error updating student frequency:', error);
  }
};

/**
 * Gets students sorted by selection frequency (most selected first)
 */
export const getMostSelectedStudents = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STUDENT_FREQUENCY);
    if (!stored) return [];
    
    const frequency: Record<string, number> = JSON.parse(stored);
    
    // Sort by frequency (descending)
    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .map(([studentId]) => studentId);
  } catch (error) {
    console.error('Error retrieving student frequency:', error);
    return [];
  }
};

/**
 * Increments the selection count for a service
 * Tracks how often each service is selected
 */
export const incrementServiceSelection = (serviceId: string): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SERVICE_FREQUENCY);
    const frequency: Record<string, number> = stored ? JSON.parse(stored) : {};
    
    frequency[serviceId] = (frequency[serviceId] || 0) + 1;
    
    localStorage.setItem(STORAGE_KEYS.SERVICE_FREQUENCY, JSON.stringify(frequency));
  } catch (error) {
    console.error('Error updating service frequency:', error);
  }
};

/**
 * Gets services sorted by selection frequency (most selected first)
 */
export const getMostSelectedServices = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SERVICE_FREQUENCY);
    if (!stored) return [];
    
    const frequency: Record<string, number> = JSON.parse(stored);
    
    // Sort by frequency (descending)
    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .map(([serviceId]) => serviceId);
  } catch (error) {
    console.error('Error retrieving service frequency:', error);
    return [];
  }
};

/**
 * Saves the last used payment method for autofill
 */
export const saveLastPaymentMethod = (method: string): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_PAYMENT_METHOD, method);
  } catch (error) {
    console.error('Error saving payment method:', error);
  }
};

/**
 * Gets the last used payment method
 */
export const getLastPaymentMethod = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.LAST_PAYMENT_METHOD);
  } catch (error) {
    console.error('Error retrieving payment method:', error);
    return null;
  }
};

/**
 * Clears all saved preferences (useful for testing or logout)
 */
export const clearAllPreferences = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing preferences:', error);
  }
};

/**
 * Gets statistics about saved preferences
 */
export const getPreferenceStats = () => {
  try {
    const studentFreq = localStorage.getItem(STORAGE_KEYS.STUDENT_FREQUENCY);
    const serviceFreq = localStorage.getItem(STORAGE_KEYS.SERVICE_FREQUENCY);
    
    return {
      hasPhone: !!localStorage.getItem(STORAGE_KEYS.LAST_PHONE),
      studentCount: studentFreq ? Object.keys(JSON.parse(studentFreq)).length : 0,
      serviceCount: serviceFreq ? Object.keys(JSON.parse(serviceFreq)).length : 0,
      hasPaymentMethod: !!localStorage.getItem(STORAGE_KEYS.LAST_PAYMENT_METHOD),
    };
  } catch (error) {
    console.error('Error getting preference stats:', error);
    return {
      hasPhone: false,
      studentCount: 0,
      serviceCount: 0,
      hasPaymentMethod: false,
    };
  }
};
