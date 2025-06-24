import {
  CreateExam,
  ExamResult,
  ExamResultPaginator,
  ExamResultQueryOptions,
  QueryOptions,
} from "@types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const ExamResultClient = {
  ...crudFactory<ExamResult, QueryOptions, CreateExam>(
    API_ENDPOINTS.EXAMRESULTS
  ),
  paginated: ({ ...params }: Partial<ExamResultQueryOptions>) => {
    return HttpClient.get<ExamResultPaginator>(API_ENDPOINTS.EXAMRESULTS, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({
        // examId,
      }),
    });
  },
};
