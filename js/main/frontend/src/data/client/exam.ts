import {
  CreateExam,
  Exam,
  ExamPageData,
  ExamPaginator,
  ExamQueryOptions,
  GetParams,
  QueryOptions,
} from "@types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const ExamClient = {
  ...crudFactory<Exam, QueryOptions, CreateExam>(API_ENDPOINTS.EXAMS),
  paginated: ({ name, ...params }: Partial<ExamQueryOptions>) => {
    return HttpClient.get<ExamPaginator>(API_ENDPOINTS.EXAMS, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({
        name,
      }),
    });
  },
  pageData: ({ slug }: GetParams) => {
    return HttpClient.get<ExamPageData>(`${API_ENDPOINTS.EXAMS}/${slug}`);
  },
  generateResultTable: ({ slug }: GetParams) => {
    return HttpClient.post<ExamPageData>(
      `${API_ENDPOINTS.EXAMS}/${slug}/generate-result-table`,
      {}
    );
  },
  enable: ({ id }: { id: number }) => {
    return HttpClient.put<any>(`${API_ENDPOINTS.EXAMS}/${id}/enable`, {});
  },
  disable: ({ id }: { id: number }) => {
    return HttpClient.put<any>(`${API_ENDPOINTS.EXAMS}/${id}/disable`, {});
  },
};
