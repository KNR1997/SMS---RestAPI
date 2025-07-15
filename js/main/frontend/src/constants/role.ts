import {
  EGender,
  EGrade,
  ERole,
  EventType,
  ExamStatusType,
  RelationshipType,
} from "../types";

export const roleOptions = [
  { value: ERole.ROLE_ADMIN, label: "Admin" },
  { value: ERole.ROLE_MANAGER, label: "Manager" },
  { value: ERole.ROLE_TEACHER, label: "Teacher" },
  { value: ERole.ROLE_RECEPTIONIST, label: "Receptionist" },
  { value: ERole.ROLE_STUDENT, label: "Student" },
];

export const gradeOptions = [
  //{ value: EGrade.GRADE_5, label: "Grade 5" },
  { value: EGrade.GRADE_6, label: "Grade 6" },
  { value: EGrade.GRADE_7, label: "Grade 7" },
  { value: EGrade.GRADE_8, label: "Grade 8" },
  { value: EGrade.GRADE_9, label: "Grade 9" },
  { value: EGrade.GRADE_10, label: "Grade 10" },
  { value: EGrade.GRADE_11, label: "Grade 11" },
];

export const genderOptions = [
  { value: EGender.Male, label: "Male" },
  { value: EGender.Female, label: "Female" },
];

export const relationshipOptions = [
  { value: RelationshipType.FATHER, label: "Father" },
  { value: RelationshipType.MOTHER, label: "Mother" },
  { value: RelationshipType.GUARDIAN, label: "Guardian" },
];

export const eventTypeOptions = [
  { value: EventType.COURSE, label: "Class" },
  { value: EventType.EXAM, label: "Exam" },
];

export const monthOptions = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "Auguest" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export const examStatusOptions = [
  { value: ExamStatusType.PENDING, label: "Penidng" },
  { value: ExamStatusType.COMPLETED, label: "Completed" },
  { value: ExamStatusType.CANCELLED, label: "Cancelled" },
];
