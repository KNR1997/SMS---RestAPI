import {
  Enrollment,
  EnrollmentPaginator,
  EnrollmentQueryOptions,
  QueryOptions,
} from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const EnrollmentClient = {
  ...crudFactory<Enrollment, QueryOptions, Enrollment>(
    API_ENDPOINTS.ENROLLMENTS
  ),
  paginated: ({ ...params }: Partial<EnrollmentQueryOptions>) => {
    return HttpClient.get<EnrollmentPaginator>(API_ENDPOINTS.ENROLLMENTS, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({}),
    });
  },
  invoke: ({ id }: { id: number }) => {
    return HttpClient.post<any>(
      `${API_ENDPOINTS.ENROLLMENTS}/${id}/invoke`,
      {}
    );
  },
  getStudentCountsPerCourse: () => {
    return HttpClient.get<any>(
      `${API_ENDPOINTS.ENROLLMENTS}/students-per-course`
    );
  },
};
