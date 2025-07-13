import {
  CreateEmployeePayment,
  CreateEvent,
  EmployeePayment,
  Event,
  EventPaginator,
  EventQueryOptions,
  QueryOptions,
} from "@types";
import { crudFactory } from "./crud-factory";
import { API_ENDPOINTS } from "./api-endpoints";
import { HttpClient } from "./http-client";

export const EmployeePaymentClient = {
  ...crudFactory<EmployeePayment, QueryOptions, CreateEmployeePayment>(
    API_ENDPOINTS.EMPLOYEE_PAYMENTS
  ),
  //   paginated: ({ code, ...params }: Partial<EventQueryOptions>) => {
  //     return HttpClient.get<EventPaginator>(API_ENDPOINTS.EVENTS, {
  //       searchJoin: "and",
  //       // self,
  //       ...params,
  //       page: params?.page ? params.page - 1 : 0,
  //       search: HttpClient.formatSearchParams({
  //         code,
  //       }),
  //     });
  //   },
};
