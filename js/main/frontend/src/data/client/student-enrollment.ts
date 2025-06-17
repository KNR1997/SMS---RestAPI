import { EnrollCourseData } from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { HttpClient } from "./http-client";

export const StudentEnrollmentClient = {
  enrollToCourse: ({
    studentId,
    input,
  }: {
    studentId: number;
    input: EnrollCourseData;
  }) => {
    return HttpClient.post<any>(
      `${API_ENDPOINTS.STUDENTS}/${studentId}/enrollments`,
      input
    );
  },
}