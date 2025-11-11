// Student and parent data shared across the application

export interface Student {
  name: string;
  id: string;
  grade: string;
  balances: number;
}

export interface ParentData {
  name: string;
  phone: string;
  students: Student[];
}

// Parent to student mapping based on phone numbers
export const PARENT_STUDENT_MAP: Record<string, ParentData> = {
  "977123456": {
    name: "Mr Stephen Kapambwe",
    phone: "977123456",
    students: [
      {
        name: "Talitha Kapambwe",
        id: "C20012",
        grade: "Grade 3B",
        balances: 0,
      },
      {
        name: "Isaiah Kapambwe",
        id: "C30013",
        grade: "Grade 4A",
        balances: 1,
      },
    ],
  },
  "966987654": {
    name: "Mrs Alice Mwamba",
    phone: "966987654",
    students: [
      {
        name: "John Mwansa",
        id: "C20013",
        grade: "Grade 5A",
        balances: 0,
      },
      {
        name: "Sarah Banda",
        id: "C20014",
        grade: "Grade 6B",
        balances: 2,
      },
    ],
  },
};

// Get students for a specific phone number
export function getStudentsByPhone(phone: string): Student[] {
  const cleaned = phone.replace(/\D/g, "");
  const parentData = PARENT_STUDENT_MAP[cleaned];
  return parentData?.students || [];
}

// Get parent name by phone number
export function getParentNameByPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const parentData = PARENT_STUDENT_MAP[cleaned];
  return parentData?.name || "";
}