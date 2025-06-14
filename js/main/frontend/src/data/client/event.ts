import {
  CreateEvent,
  Event,
  EventPaginator,
  EventQueryOptions,
  QueryOptions,
} from "@types";
import { crudFactory } from "./crud-factory";
import { API_ENDPOINTS } from "./api-endpoints";
import { HttpClient } from "./http-client";

export const EventClient = {
  ...crudFactory<Event, QueryOptions, CreateEvent>(API_ENDPOINTS.EVENTS),
  paginated: ({ code, ...params }: Partial<EventQueryOptions>) => {
    return HttpClient.get<EventPaginator>(API_ENDPOINTS.EVENTS, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({
        code,
      }),
    });
  },
};
