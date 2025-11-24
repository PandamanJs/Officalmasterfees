/**
 * Comprehensive School Data Module
 * 
 * This module contains all data for the Master-Fees payment system:
 * - Parent/Guardian information
 * - Student records linked to parents and schools
 * - School-specific services and fees
 * - Authentication mapping
 * 
 * Architecture:
 * Each of the 5 schools has unique:
 * - Parents with different phone numbers
 * - Students enrolled in that specific school
 * - Available services/fees for payment
 */

/**
 * Student Interface
 * Represents an individual student enrolled in a school
 */
export interface Student {
  name: string;      // Full name of the student
  id: string;        // Unique student ID (e.g., TEC001, CTA001)
  grade: string;     // Class/grade (e.g., Grade 3B, Form 1)
  balances: number;  // Number of outstanding invoices
  schoolName: string; // School the student attends
}

/**
 * Parent/Guardian Interface
 * Represents a parent or guardian with associated students
 */
export interface ParentData {
  name: string;       // Full name of parent/guardian
  phone: string;      // Contact phone number (9 digits)
  students: Student[]; // Array of children enrolled in schools
  primarySchool: string; // Primary school affiliation
}

/**
 * Service/Fee Interface
 * Represents a payable service or fee type
 */
export interface SchoolService {
  id: string;          // Unique service identifier
  name: string;        // Service name
  description: string; // Detailed description
  amount: number;      // Cost in ZMW (Zambian Kwacha)
  category: 'tuition' | 'meals' | 'transport' | 'activities' | 'supplies' | 'other';
}

/**
 * School Configuration Interface
 * Complete data structure for each school
 */
export interface SchoolData {
  name: string;
  code: string;        // School code prefix for student IDs
  services: SchoolService[];
  parents: ParentData[];
}

/**
 * Complete School Database
 * Contains all data for 5 schools in the system
 */
export const SCHOOL_DATABASE: Record<string, SchoolData> = {
  /**
   * TWALUMBU EDUCATIONAL CENTER
   * Rural community school in Eastern Province
   */
  "Twalumbu Educational Center": {
    name: "Twalumbu Educational Center",
    code: "TEC",
    services: [
      {
        id: "TEC-S001",
        name: "Tuition Fees - Term 1",
        description: "Full term tuition for primary grades",
        amount: 1200,
        category: "tuition"
      },
      {
        id: "TEC-S002",
        name: "Canteen (Lunch)",
        description: "Daily lunch program for one month",
        amount: 300,
        category: "meals"
      },
      {
        id: "TEC-S003",
        name: "Textbooks & Materials",
        description: "Required textbooks and learning materials",
        amount: 250,
        category: "supplies"
      },
      {
        id: "TEC-S004",
        name: "Sports Uniform",
        description: "PE kit and sports day uniform",
        amount: 180,
        category: "supplies"
      },
      {
        id: "TEC-S005",
        name: "School Bus",
        description: "Monthly transport subscription",
        amount: 400,
        category: "transport"
      },
      {
        id: "TEC-S006",
        name: "Term 1 Fees",
        description: "First term miscellaneous fees",
        amount: 150,
        category: "other"
      },
      {
        id: "TEC-S007",
        name: "Term 2 Fees",
        description: "Second term miscellaneous fees",
        amount: 150,
        category: "other"
      },
      {
        id: "TEC-S008",
        name: "Term 3 Fees",
        description: "Third term miscellaneous fees",
        amount: 150,
        category: "other"
      }
    ],
    parents: [
      {
        name: "Mr Stephen Kapambwe",
        phone: "977123456",
        primarySchool: "Twalumbu Educational Center",
        students: [
          {
            name: "Talitha Kapambwe",
            id: "TEC001",
            grade: "Grade 3B",
            balances: 0,
            schoolName: "Twalumbu Educational Center"
          },
          {
            name: "Isaiah Kapambwe",
            id: "TEC002",
            grade: "Grade 4A",
            balances: 1,
            schoolName: "Twalumbu Educational Center"
          }
        ]
      },
      {
        name: "Mrs Grace Phiri",
        phone: "955234567",
        primarySchool: "Twalumbu Educational Center",
        students: [
          {
            name: "Emmanuel Phiri",
            id: "TEC003",
            grade: "Grade 5B",
            balances: 2,
            schoolName: "Twalumbu Educational Center"
          }
        ]
      }
    ]
  },

  /**
   * CHIMILUTE TRUST ACADEMY
   * Christian-based secondary school in Lusaka
   */
  "Chimilute Trust Academy": {
    name: "Chimilute Trust Academy",
    code: "CTA",
    services: [
      {
        id: "CTA-S001",
        name: "Tuition Fees - Term 1",
        description: "Secondary school tuition fees",
        amount: 2500,
        category: "tuition"
      },
      {
        id: "CTA-S002",
        name: "Canteen (Lunch)",
        description: "Daily nutritious meals for students",
        amount: 450,
        category: "meals"
      },
      {
        id: "CTA-S003",
        name: "Boarding Fees",
        description: "Full boarding accommodation",
        amount: 1800,
        category: "other"
      },
      {
        id: "CTA-S004",
        name: "Laboratory Fees",
        description: "Science lab materials and equipment",
        amount: 450,
        category: "supplies"
      },
      {
        id: "CTA-S005",
        name: "Library Subscription",
        description: "Annual library access and book lending",
        amount: 200,
        category: "supplies"
      },
      {
        id: "CTA-S006",
        name: "Music & Arts Program",
        description: "Extracurricular music and arts classes",
        amount: 350,
        category: "activities"
      },
      {
        id: "CTA-S007",
        name: "School Bus",
        description: "Daily transport to and from school",
        amount: 500,
        category: "transport"
      },
      {
        id: "CTA-S008",
        name: "Term 1 Fees",
        description: "First term miscellaneous fees",
        amount: 200,
        category: "other"
      },
      {
        id: "CTA-S009",
        name: "Term 2 Fees",
        description: "Second term miscellaneous fees",
        amount: 200,
        category: "other"
      },
      {
        id: "CTA-S010",
        name: "Term 3 Fees",
        description: "Third term miscellaneous fees",
        amount: 200,
        category: "other"
      }
    ],
    parents: [
      {
        name: "Mrs Alice Mwamba",
        phone: "966987654",
        primarySchool: "Chimilute Trust Academy",
        students: [
          {
            name: "John Mwansa",
            id: "CTA001",
            grade: "Form 2",
            balances: 0,
            schoolName: "Chimilute Trust Academy"
          },
          {
            name: "Sarah Banda",
            id: "CTA002",
            grade: "Form 3",
            balances: 2,
            schoolName: "Chimilute Trust Academy"
          }
        ]
      },
      {
        name: "Dr Patrick Chilufya",
        phone: "977456789",
        primarySchool: "Chimilute Trust Academy",
        students: [
          {
            name: "Michael Chilufya",
            id: "CTA003",
            grade: "Form 1",
            balances: 1,
            schoolName: "Chimilute Trust Academy"
          },
          {
            name: "Grace Chilufya",
            id: "CTA004",
            grade: "Form 4",
            balances: 0,
            schoolName: "Chimilute Trust Academy"
          }
        ]
      }
    ]
  },

  /**
   * JULANI SCHOOL
   * Premium preparatory school in Kitwe
   */
  "Julani School": {
    name: "Julani School",
    code: "JUL",
    services: [
      {
        id: "JUL-S001",
        name: "Tuition Fees - Term 1",
        description: "Premium preparatory education",
        amount: 3500,
        category: "tuition"
      },
      {
        id: "JUL-S002",
        name: "Canteen (Lunch)",
        description: "Gourmet daily lunch program",
        amount: 500,
        category: "meals"
      },
      {
        id: "JUL-S003",
        name: "Swimming Lessons",
        description: "Professional swimming instruction",
        amount: 600,
        category: "activities"
      },
      {
        id: "JUL-S004",
        name: "Computer Lab Access",
        description: "ICT lessons and computer time",
        amount: 500,
        category: "supplies"
      },
      {
        id: "JUL-S005",
        name: "Field Trip Package",
        description: "Educational excursions and trips",
        amount: 750,
        category: "activities"
      },
      {
        id: "JUL-S006",
        name: "School Uniform Set",
        description: "Complete uniform with tie and blazer",
        amount: 850,
        category: "supplies"
      },
      {
        id: "JUL-S007",
        name: "School Bus",
        description: "Premium transport to and from school",
        amount: 550,
        category: "transport"
      },
      {
        id: "JUL-S008",
        name: "Term 1 Fees",
        description: "First term miscellaneous fees",
        amount: 250,
        category: "other"
      },
      {
        id: "JUL-S009",
        name: "Term 2 Fees",
        description: "Second term miscellaneous fees",
        amount: 250,
        category: "other"
      },
      {
        id: "JUL-S010",
        name: "Term 3 Fees",
        description: "Third term miscellaneous fees",
        amount: 250,
        category: "other"
      }
    ],
    parents: [
      {
        name: "Mr James Mutale",
        phone: "965111222",
        primarySchool: "Julani School",
        students: [
          {
            name: "Natasha Mutale",
            id: "JUL001",
            grade: "Grade 2",
            balances: 1,
            schoolName: "Julani School"
          }
        ]
      },
      {
        name: "Mrs Rebecca Banda",
        phone: "977333444",
        primarySchool: "Julani School",
        students: [
          {
            name: "Daniel Banda",
            id: "JUL002",
            grade: "Grade 4",
            balances: 0,
            schoolName: "Julani School"
          },
          {
            name: "Rachel Banda",
            id: "JUL003",
            grade: "Grade 1",
            balances: 2,
            schoolName: "Julani School"
          }
        ]
      }
    ]
  },

  /**
   * CRESTED CRANE ACADEMY
   * International curriculum school in Ndola
   */
  "Crested Crane Academy": {
    name: "Crested Crane Academy",
    code: "CCA",
    services: [
      {
        id: "CCA-S001",
        name: "Tuition Fees - Term 1",
        description: "International Cambridge curriculum",
        amount: 4200,
        category: "tuition"
      },
      {
        id: "CCA-S002",
        name: "Canteen (Lunch)",
        description: "Gourmet lunch and snacks program",
        amount: 550,
        category: "meals"
      },
      {
        id: "CCA-S003",
        name: "IGCSE Exam Fees",
        description: "Cambridge examination registration",
        amount: 1200,
        category: "other"
      },
      {
        id: "CCA-S004",
        name: "Drama & Theatre Club",
        description: "Weekly drama and performance arts",
        amount: 400,
        category: "activities"
      },
      {
        id: "CCA-S005",
        name: "Language Tutoring",
        description: "French and Mandarin language classes",
        amount: 650,
        category: "activities"
      },
      {
        id: "CCA-S006",
        name: "School Bus",
        description: "Premium transport service",
        amount: 600,
        category: "transport"
      },
      {
        id: "CCA-S007",
        name: "Term 1 Fees",
        description: "First term miscellaneous fees",
        amount: 300,
        category: "other"
      },
      {
        id: "CCA-S008",
        name: "Term 2 Fees",
        description: "Second term miscellaneous fees",
        amount: 300,
        category: "other"
      },
      {
        id: "CCA-S009",
        name: "Term 3 Fees",
        description: "Third term miscellaneous fees",
        amount: 300,
        category: "other"
      }
    ],
    parents: [
      {
        name: "Mr David Mwansa",
        phone: "966555666",
        primarySchool: "Crested Crane Academy",
        students: [
          {
            name: "Sophie Mwansa",
            id: "CCA001",
            grade: "Year 7",
            balances: 1,
            schoolName: "Crested Crane Academy"
          },
          {
            name: "Oliver Mwansa",
            id: "CCA002",
            grade: "Year 9",
            balances: 0,
            schoolName: "Crested Crane Academy"
          }
        ]
      },
      {
        name: "Mrs Catherine Lungu",
        phone: "955777888",
        primarySchool: "Crested Crane Academy",
        students: [
          {
            name: "Isabella Lungu",
            id: "CCA003",
            grade: "Year 5",
            balances: 3,
            schoolName: "Crested Crane Academy"
          }
        ]
      }
    ]
  },

  /**
   * INTERNATIONAL MAARIF SCHOOL
   * Turkish international school in Lusaka
   */
  "International Maarif School": {
    name: "International Maarif School",
    code: "IMS",
    services: [
      {
        id: "IMS-S001",
        name: "Tuition Fees - Term 1",
        description: "International Baccalaureate program",
        amount: 5000,
        category: "tuition"
      },
      {
        id: "IMS-S002",
        name: "Canteen (Lunch)",
        description: "International cuisine lunch program",
        amount: 650,
        category: "meals"
      },
      {
        id: "IMS-S003",
        name: "Turkish Language Course",
        description: "Optional Turkish language instruction",
        amount: 800,
        category: "activities"
      },
      {
        id: "IMS-S004",
        name: "Robotics & STEM Lab",
        description: "Advanced robotics and coding classes",
        amount: 950,
        category: "activities"
      },
      {
        id: "IMS-S005",
        name: "International Sports",
        description: "Football, basketball, and tennis",
        amount: 700,
        category: "activities"
      },
      {
        id: "IMS-S006",
        name: "Cultural Exchange Program",
        description: "International student exchange fees",
        amount: 1500,
        category: "other"
      },
      {
        id: "IMS-S007",
        name: "School Bus",
        description: "Premium transport with AC",
        amount: 700,
        category: "transport"
      },
      {
        id: "IMS-S008",
        name: "Term 1 Fees",
        description: "First term miscellaneous fees",
        amount: 350,
        category: "other"
      },
      {
        id: "IMS-S009",
        name: "Term 2 Fees",
        description: "Second term miscellaneous fees",
        amount: 350,
        category: "other"
      },
      {
        id: "IMS-S010",
        name: "Term 3 Fees",
        description: "Third term miscellaneous fees",
        amount: 350,
        category: "other"
      }
    ],
    parents: [
      {
        name: "Mr Ahmed Hassan",
        phone: "977888999",
        primarySchool: "International Maarif School",
        students: [
          {
            name: "Amira Hassan",
            id: "IMS001",
            grade: "Grade 8",
            balances: 0,
            schoolName: "International Maarif School"
          },
          {
            name: "Yusuf Hassan",
            id: "IMS002",
            grade: "Grade 10",
            balances: 1,
            schoolName: "International Maarif School"
          }
        ]
      },
      {
        name: "Mrs Jennifer Sakala",
        phone: "966222333",
        primarySchool: "International Maarif School",
        students: [
          {
            name: "Mwila Sakala",
            id: "IMS003",
            grade: "Grade 6",
            balances: 2,
            schoolName: "International Maarif School"
          }
        ]
      }
    ]
  }
};

/**
 * Phone to Parent Authentication Map
 * Maps phone numbers to parent names for login validation
 * Used in SchoolDetailsPage for authentication
 */
export const PHONE_USER_MAP: Record<string, string> = {
  // Twalumbu Educational Center
  "977123456": "Mr Stephen Kapambwe",
  "955234567": "Mrs Grace Phiri",
  
  // Chimilute Trust Academy
  "966987654": "Mrs Alice Mwamba",
  "977456789": "Dr Patrick Chilufya",
  
  // Julani School
  "965111222": "Mr James Mutale",
  "977333444": "Mrs Rebecca Banda",
  
  // Crested Crane Academy
  "966555666": "Mr David Mwansa",
  "955777888": "Mrs Catherine Lungu",
  
  // International Maarif School
  "977888999": "Mr Ahmed Hassan",
  "966222333": "Mrs Jennifer Sakala",
};

/**
 * Phone to School Mapping
 * Determines which school a parent is affiliated with
 */
export const PHONE_SCHOOL_MAP: Record<string, string> = {
  // Twalumbu Educational Center
  "977123456": "Twalumbu Educational Center",
  "955234567": "Twalumbu Educational Center",
  
  // Chimilute Trust Academy
  "966987654": "Chimilute Trust Academy",
  "977456789": "Chimilute Trust Academy",
  
  // Julani School
  "965111222": "Julani School",
  "977333444": "Julani School",
  
  // Crested Crane Academy
  "966555666": "Crested Crane Academy",
  "955777888": "Crested Crane Academy",
  
  // International Maarif School
  "977888999": "International Maarif School",
  "966222333": "International Maarif School",
};

/**
 * Get students by phone number
 * Retrieves all students associated with a parent's phone
 * 
 * @param phone - Phone number (with or without formatting)
 * @returns Array of Student objects
 */
export function getStudentsByPhone(phone: string): Student[] {
  const cleaned = phone.replace(/\D/g, "");
  
  // Search through all schools to find the parent
  for (const schoolData of Object.values(SCHOOL_DATABASE)) {
    const parent = schoolData.parents.find(p => p.phone === cleaned);
    if (parent) {
      return parent.students;
    }
  }
  
  return [];
}

/**
 * Get parent name by phone number
 * 
 * @param phone - Phone number (with or without formatting)
 * @returns Parent's full name or empty string
 */
export function getParentNameByPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  return PHONE_USER_MAP[cleaned] || "";
}

/**
 * Get school services by school name
 * Retrieves all available services/fees for a specific school
 * 
 * @param schoolName - Name of the school
 * @returns Array of SchoolService objects
 */
export function getSchoolServices(schoolName: string): SchoolService[] {
  const schoolData = SCHOOL_DATABASE[schoolName];
  return schoolData?.services || [];
}

/**
 * Get school by phone number
 * Determines which school a parent is affiliated with
 * 
 * @param phone - Phone number (with or without formatting)
 * @returns School name or empty string
 */
export function getSchoolByPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  return PHONE_SCHOOL_MAP[cleaned] || "";
}

/**
 * Get parent data by phone
 * Retrieves complete parent information including students
 * 
 * @param phone - Phone number (with or without formatting)
 * @returns ParentData object or null
 */
export function getParentDataByPhone(phone: string): ParentData | null {
  const cleaned = phone.replace(/\D/g, "");
  
  for (const schoolData of Object.values(SCHOOL_DATABASE)) {
    const parent = schoolData.parents.find(p => p.phone === cleaned);
    if (parent) {
      return parent;
    }
  }
  
  return null;
}

/**
 * Validate phone number exists in system
 * Checks if a phone number is registered
 * 
 * @param phone - Phone number (with or without formatting)
 * @returns true if phone exists, false otherwise
 */
export function isPhoneRegistered(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned in PHONE_USER_MAP;
}