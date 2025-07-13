import {
  CoursePaymentQueryOptions,
  CoursePaymentSummaryPaginator,
  EnrollmentPayment,
  QueryOptions,
} from "../../types";
import { API_ENDPOINTS } from "./api-endpoints";
import { crudFactory } from "./crud-factory";
import { HttpClient } from "./http-client";

export const EnrollmentPaymentClient = {
  ...crudFactory<EnrollmentPayment, QueryOptions, EnrollmentPayment>(
    API_ENDPOINTS.ENROLLMENT_PAYMENTS
  ),
  coursePayments: ({ ...params }: Partial<CoursePaymentQueryOptions>) => {
    return HttpClient.get<CoursePaymentSummaryPaginator>(
      `${API_ENDPOINTS.ENROLLMENT_PAYMENTS}/summary`,
      {
        searchJoin: "and",
        // self,
        ...params,
        page: params?.page ? params.page - 1 : 0,
        search: HttpClient.formatSearchParams({}),
      }
    );
  },
};
