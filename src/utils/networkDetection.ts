/**
 * Network Detection Utility
 * 
 * Detects mobile network providers in Zambia based on phone number prefixes
 * Supports Airtel, MTN, and Zamtel
 */

export type MobileNetwork = 'Airtel' | 'MTN' | 'Zamtel' | null;

export interface NetworkInfo {
  name: MobileNetwork;
  color: string;
  logo?: string;
}

/**
 * Detect mobile network from phone number
 * 
 * @param phoneNumber - Phone number (can include +260, 0, or just digits)
 * @returns Network name or null if not detected
 */
export function detectNetwork(phoneNumber: string): MobileNetwork {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Get the last 9 digits (ignore country code and leading 0)
  // Zambian numbers are 9 digits after the country code
  let number = cleaned;
  
  // Remove country code if present (+260 or 260)
  if (number.startsWith('260')) {
    number = number.slice(3);
  }
  
  // Remove leading 0 if present
  if (number.startsWith('0')) {
    number = number.slice(1);
  }
  
  // Check if we have at least 2 digits to detect network
  if (number.length < 2) {
    return null;
  }
  
  // Get first 2 digits
  const prefix = number.slice(0, 2);
  
  // Detect network based on prefix
  if (prefix === '97' || prefix === '77') {
    return 'Airtel';
  } else if (prefix === '96' || prefix === '76') {
    return 'MTN';
  } else if (prefix === '95') {
    return 'Zamtel';
  }
  
  return null;
}

/**
 * Get network information including colors for UI display
 * 
 * @param phoneNumber - Phone number to detect
 * @returns NetworkInfo object with name, color, and optional logo
 */
export function getNetworkInfo(phoneNumber: string): NetworkInfo {
  const network = detectNetwork(phoneNumber);
  
  switch (network) {
    case 'Airtel':
      return {
        name: 'Airtel',
        color: '#FF0000', // Airtel red
      };
    case 'MTN':
      return {
        name: 'MTN',
        color: '#FFCC00', // MTN yellow
      };
    case 'Zamtel':
      return {
        name: 'Zamtel',
        color: '#00A651', // Zamtel green
      };
    default:
      return {
        name: null,
        color: '#6B7280', // Gray for unknown
      };
  }
}

/**
 * Format phone number for display with network detection
 * 
 * @param phoneNumber - Phone number to format
 * @returns Formatted string like "0977 123 456 (Airtel)"
 */
export function formatPhoneWithNetwork(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const network = detectNetwork(phoneNumber);
  
  // Format the number (Zambian format: 0XXX XXX XXX)
  let formatted = cleaned;
  
  // Remove country code if present
  if (formatted.startsWith('260')) {
    formatted = '0' + formatted.slice(3);
  }
  
  // Add leading 0 if not present
  if (!formatted.startsWith('0')) {
    formatted = '0' + formatted;
  }
  
  // Format with spaces
  if (formatted.length === 10) {
    formatted = `${formatted.slice(0, 4)} ${formatted.slice(4, 7)} ${formatted.slice(7)}`;
  }
  
  // Add network name if detected
  if (network) {
    formatted += ` (${network})`;
  }
  
  return formatted;
}

/**
 * Validate if phone number belongs to a supported network
 * 
 * @param phoneNumber - Phone number to validate
 * @returns true if network is detected, false otherwise
 */
export function isSupportedNetwork(phoneNumber: string): boolean {
  return detectNetwork(phoneNumber) !== null;
}

/**
 * Get all supported network prefixes
 * 
 * @returns Array of objects with network names and their prefixes
 */
export function getSupportedNetworks() {
  return [
    {
      name: 'Airtel',
      prefixes: ['097', '077'],
      color: '#FF0000',
    },
    {
      name: 'MTN',
      prefixes: ['096', '076'],
      color: '#FFCC00',
    },
    {
      name: 'Zamtel',
      prefixes: ['095'],
      color: '#00A651',
    },
  ];
}
