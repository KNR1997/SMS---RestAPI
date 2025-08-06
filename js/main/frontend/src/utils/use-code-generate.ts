import { EGrade } from "../types";

export function generateSubjectCode(inputString: string): string {
  if (!inputString) return "";
  /* This line get only the first 3 characters of the word. */
  const firstThreeCharacters = inputString.slice(0, 3);
  /* Return the uppercase version. */
  return firstThreeCharacters.toUpperCase();
}

function generateGradeCode(gradeType: EGrade): string {
  const gradeMap: Record<EGrade, string> = {
    [EGrade.GRADE_6]: "G6",
    [EGrade.GRADE_7]: "G7",
    [EGrade.GRADE_8]: "G8",
    [EGrade.GRADE_9]: "G9",
    [EGrade.GRADE_10]: "G10",
    [EGrade.GRADE_11]: "G11",
  };
  return gradeMap[gradeType] ?? "G";
}

export function generateCourseCode(
  gradeType: EGrade,
  subject: string,
  teacherFirstName: string,
  teacherLastName: string,
  batch: number,
  year: number
): string {
  if (
    !gradeType ||
    !subject ||
    !teacherFirstName ||
    !teacherLastName ||
    !batch ||
    !year
  )
    return "";

  const safeSlice = (value: string, length = 3) =>
    (value || "").substring(0, length).toUpperCase();

  const subjectFirstThree = safeSlice(subject);
  const teacherFirstNameFirstThree = safeSlice(teacherFirstName);
  const teacherLastNameFirstThree = safeSlice(teacherLastName);
  const gradeCode = generateGradeCode(gradeType);

  return `${subjectFirstThree}${gradeCode}B${batch}${teacherFirstNameFirstThree}${teacherLastNameFirstThree}${year}`;
}

export function generateCourseName(
  gradeType: EGrade,
  subject: string,
  teacherFirstName: string,
  teacherLastName: string,
  batch: number,
  year: number
): string {
  if (
    !gradeType ||
    !subject ||
    !teacherFirstName ||
    !teacherLastName ||
    !batch ||
    !year
  )
    return "";

  return `${gradeType} ${subject} Batch${batch} ${teacherFirstName} ${teacherLastName} ${year}`;
}
