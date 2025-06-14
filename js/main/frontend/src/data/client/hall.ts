import { CreateHall, Hall, HallPaginator, HallQueryOptions, QueryOptions } from "@types";
import { crudFactory } from "./crud-factory";
import { API_ENDPOINTS } from "./api-endpoints";
import { HttpClient } from "./http-client";


export const HallClient = {
  ...crudFactory<Hall, QueryOptions, CreateHall>(API_ENDPOINTS.HALLS),
  paginated: ({ name, ...params }: Partial<HallQueryOptions>) => {
    return HttpClient.get<HallPaginator>(API_ENDPOINTS.HALLS, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({
        name,
      }),
    });
  },
};
