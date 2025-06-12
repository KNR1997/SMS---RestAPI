import {
  CoursePaginator,
  CourseQueryOptions,
  CreateStudent,
  EnrollCourseData,
  QueryOptions,
  Student,
  StudentPaginator,
  StudentQueryOptions,
} from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const StudentClient = {
  ...crudFactory<Student, QueryOptions, CreateStudent>(API_ENDPOINTS.STUDENTS),
  paginated: ({ username, ...params }: Partial<StudentQueryOptions>) => {
    return HttpClient.get<StudentPaginator>(API_ENDPOINTS.STUDENTS, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({
        username,
      }),
    });
  },
  enrollToCourse: ({
    studentId,
    input,
  }: {
    studentId: number;
    input: EnrollCourseData;
  }) => {
    return HttpClient.post<any>(
      `${API_ENDPOINTS.STUDENTS}/${studentId}/enroll`,
      input
    );
  },
  getMyCourses: ({
    studentId,
    name,
    ...params
  }: Partial<CourseQueryOptions & { studentId: number }>) => {
    return HttpClient.get<CoursePaginator>(
      `${API_ENDPOINTS.STUDENTS}`,
      {
        searchJoin: "and",
        ...params,
        search: HttpClient.formatSearchParams({ name }),
      }
    );
  },
};
