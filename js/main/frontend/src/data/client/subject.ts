import {
  CreateSubject,
  QueryOptions,
  Subject,
  SubjectPaginator,
  SubjectQueryOptions,
} from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const subjectClient = {
  ...crudFactory<Subject, QueryOptions, CreateSubject>(API_ENDPOINTS.SUBJECTS),
  paginated: ({ name, ...params }: Partial<SubjectQueryOptions>) => {
    return HttpClient.get<SubjectPaginator>(API_ENDPOINTS.SUBJECTS, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({
        name,
      }),
    });
  },
  getStudentCountsPerGrade: () => {
    return HttpClient.get<any>(`${API_ENDPOINTS.STUDENTS}/students-per-grade`);
  },
  enable: ({ id }: { id: number }) => {
    return HttpClient.put<any>(`${API_ENDPOINTS.SUBJECTS}/${id}/enable`, {});
  },
  disable: ({ id }: { id: number }) => {
    return HttpClient.put<any>(`${API_ENDPOINTS.SUBJECTS}/${id}/disable`, {});
  }
};
