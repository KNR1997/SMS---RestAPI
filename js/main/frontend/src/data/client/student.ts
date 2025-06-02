import {
  CreateStudent,
  QueryOptions,
  Student,
  StudentPaginator,
  StudentQueryOptions,
  User,
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
  fetchUser: ({ id }: { id: string }) => {
    return HttpClient.get<User>(`${API_ENDPOINTS.USERS}/${id}`);
  },
  removeUser: ({ id }: { id: string }) => {
    return HttpClient.delete<any>(`${API_ENDPOINTS.USERS}/${id}`);
  },
};
