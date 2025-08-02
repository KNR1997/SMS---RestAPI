import {
  ChangePasswordInput,
  CreateUser,
  QueryOptions,
  User,
  UserPaginator,
  UserQueryOptions,
} from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const UserClient = {
  ...crudFactory<User, QueryOptions, CreateUser>(API_ENDPOINTS.USERS),
  paginated: ({ username, name, ...params }: Partial<UserQueryOptions>) => {
    return HttpClient.get<UserPaginator>(API_ENDPOINTS.USERS, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({
        username,
        name,
      }),
    });
  },
  fetchUser: ({ id }: { id: string }) => {
    return HttpClient.get<User>(`${API_ENDPOINTS.USERS}/${id}`);
  },
  removeUser: ({ id }: { id: string }) => {
    return HttpClient.delete<any>(`${API_ENDPOINTS.USERS}/${id}`);
  },
  me: () => {
    return HttpClient.get<any>(API_ENDPOINTS.ME);
  },
  resetPassword: ({ id }: { id: number }) => {
    return HttpClient.put<User>(
      `${API_ENDPOINTS.USERS}/${id}/reset-password`,
      {}
    );
  },
  enable: ({ id }: { id: number }) => {
    return HttpClient.put<any>(`${API_ENDPOINTS.USERS}/${id}/enable`, {});
  },
  disable: ({ id }: { id: number }) => {
    return HttpClient.put<any>(`${API_ENDPOINTS.USERS}/${id}/disable`, {});
  },
  changePassword: (data: ChangePasswordInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.CHANGE_PASSWORD, data);
  },
};
