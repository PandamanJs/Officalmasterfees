/**
 * Student and Parent Data Module
 * 
 * Mock data structure for the school fee payment system
 * In production, this would be replaced with API calls to a database
 * 
 * Data Structure:
 * - Parent information (name, phone)
 * - Associated students for each parent
 * - Student details (name, ID, grade, outstanding balances)
 */

/**
 * Student Interface
 * Represents a student in the school system
 */
export interface Student {
  name: string;      // Full name of the student
  id: string;        // Unique student ID (e.g., C20012)
  grade: string;     // Class/grade (e.g., Grade 3B)
  balances: number;  // Number of outstanding balances/invoices
}

/**
 * Parent Data Interface
 * Represents a parent/guardian and their children
 */
export interface ParentData {
  name: string;       // Full name of parent/guardian
  phone: string;      // Contact phone number
  students: Student[]; // Array of children enrolled
}

/**
 * Parent to Student Mapping
 * Maps phone numbers to parent and student data
 * Key: Phone number (as string)
 * Value: ParentData object containing parent info and students
 */
export const PARENT_STUDENT_MAP: Record<string, ParentData> = {
  // Mr Stephen Kapambwe's account
  "977123456": {
    name: "Mr Stephen Kapambwe",
    phone: "977123456",
    students: [
      {
        name: "Talitha Kapambwe",
        id: "C20012",
        grade: "Grade 3B",
        balances: 0,  // No outstanding balances
      },
      {
        name: "Isaiah Kapambwe",
        id: "C30013",
        grade: "Grade 4A",
        balances: 1,  // 1 outstanding invoice
      },
    ],
  },
  // Mrs Alice Mwamba's account
  "966987654": {
    name: "Mrs Alice Mwamba",
    phone: "966987654",
    students: [
      {
        name: "John Mwansa",
        id: "C20013",
        grade: "Grade 5A",
        balances: 0,  // No outstanding balances
      },
      {
        name: "Sarah Banda",
        id: "C20014",
        grade: "Grade 6B",
        balances: 2,  // 2 outstanding invoices
      },
    ],
  },
};

/**
 * Get Students by Phone Number
 * 
 * Retrieves all students associated with a parent's phone number
 * Cleans the phone number by removing non-digit characters
 * 
 * @param phone - Phone number (can include formatting like spaces, dashes)
 * @returns Array of Student objects, or empty array if phone not found
 */
export function getStudentsByPhone(phone: string): Student[] {
  const cleaned = phone.replace(/\D/g, "");  // Remove non-digits
  const parentData = PARENT_STUDENT_MAP[cleaned];
  return parentData?.students || [];
}

/**
 * Get Parent Name by Phone Number
 * 
 * Retrieves the parent's name based on their phone number
 * 
 * @param phone - Phone number (can include formatting)
 * @returns Parent's name as string, or empty string if not found
 */
export function getParentNameByPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");  // Remove non-digits
  const parentData = PARENT_STUDENT_MAP[cleaned];
  return parentData?.name || "";
}