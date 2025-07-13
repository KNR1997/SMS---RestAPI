import {
  CreateEmployeePayment,
  EmployeePayment,
  EmployeePaymentPaginator,
  EmployeePaymentQueryOptions,
  QueryOptions,
} from "@types";
import { crudFactory } from "./crud-factory";
import { API_ENDPOINTS } from "./api-endpoints";
import { HttpClient } from "./http-client";

export const EmployeePaymentClient = {
  ...crudFactory<EmployeePayment, QueryOptions, CreateEmployeePayment>(
    API_ENDPOINTS.EMPLOYEE_PAYMENTS
  ),
  paginated: ({
    employeeName,
    ...params
  }: Partial<EmployeePaymentQueryOptions>) => {
    return HttpClient.get<EmployeePaymentPaginator>(
      API_ENDPOINTS.EMPLOYEE_PAYMENTS,
      {
        searchJoin: "and",
        // self,
        ...params,
        page: params?.page ? params.page - 1 : 0,
        search: HttpClient.formatSearchParams({
          employeeName,
        }),
      }
    );
  },
};
