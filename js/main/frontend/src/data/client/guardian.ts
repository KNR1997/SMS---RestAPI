import {
  CreateGuardian,
  Guardian,
  GuardianPaginator,
  GuardianQueryOptions,
  QueryOptions,
} from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const GuardianClient = {
  ...crudFactory<Guardian, QueryOptions, CreateGuardian>(
    API_ENDPOINTS.GUARDIANS
  ),
  paginated: ({ name, ...params }: Partial<GuardianQueryOptions>) => {
    return HttpClient.get<GuardianPaginator>(API_ENDPOINTS.GUARDIANS, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({
        name,
      }),
    });
  },
  getByIDNumber: ({ id }: { id: string }) => {
    return HttpClient.get<Guardian>(
      `${API_ENDPOINTS.GUARDIANS}/by-identityNumber/${id}`
    );
  },
};
