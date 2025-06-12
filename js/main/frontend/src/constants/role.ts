import { EGrade, ERole } from "../types";

export const roleOptions = [
  { value: ERole.ROLE_ADMIN, label: "Admin" },
  { value: ERole.ROLE_TEACHER, label: "Teacher" },
  { value: ERole.ROLE_RECEPTIONIST, label: "Receptionist" },
  { value: ERole.ROLE_STUDENT, label: "Student" },
];

export const gradeOptions = [
  { value: EGrade.GRADE_5, label: "Grade 5" },
  { value: EGrade.GRADE_6, label: "Grade 6" },
  { value: EGrade.GRADE_7, label: "Grade 7" },
  { value: EGrade.GRADE_8, label: "Grade 8" },
  { value: EGrade.GRADE_9, label: "Grade 9" },
  { value: EGrade.GRADE_10, label: "Grade 10" },
  { value: EGrade.GRADE_11, label: "Grade 11" },
];
