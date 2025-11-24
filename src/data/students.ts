/**
 * Student and Parent Data Module
 * 
 * This file re-exports data from the comprehensive schoolData module
 * for backward compatibility with existing components
 * 
 * @deprecated Consider importing directly from './schoolData' for new code
 */

export type { Student, ParentData } from './schoolData';
export { 
  getStudentsByPhone, 
  getParentNameByPhone,
  PHONE_USER_MAP,
  getSchoolServices,
  getSchoolByPhone,
  getParentDataByPhone,
  isPhoneRegistered
} from './schoolData';

// Re-export PARENT_STUDENT_MAP for backward compatibility
import { SCHOOL_DATABASE } from './schoolData';

/**
 * Legacy Parent-Student Map
 * Built from the comprehensive school database
 * Maps phone numbers to ParentData objects
 * 
 * @deprecated Use getParentDataByPhone() instead
 */
export const PARENT_STUDENT_MAP: Record<string, any> = {};

// Build the legacy map from the new comprehensive database
Object.values(SCHOOL_DATABASE).forEach(school => {
  school.parents.forEach(parent => {
    PARENT_STUDENT_MAP[parent.phone] = parent;
  });
});
