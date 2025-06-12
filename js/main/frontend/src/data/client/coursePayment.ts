import {
  CreatePayment,
  Payment,
  PaymentPaginator,
  PaymentQueryOptions,
  QueryOptions,
  StudentPaginator,
} from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const CoursePaymentClient = {
  ...crudFactory<Payment, QueryOptions, CreatePayment>(API_ENDPOINTS.PAYMENTS),
  paginated: ({ ...params }: Partial<PaymentQueryOptions>) => {
    return HttpClient.get<PaymentPaginator>(API_ENDPOINTS.PAYMENTS, {
      searchJoin: "and",
      // self,
      ...params,
      page: params?.page ? params.page - 1 : 0,
      search: HttpClient.formatSearchParams({}),
    });
  },
};
