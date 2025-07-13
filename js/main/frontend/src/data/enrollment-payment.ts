import { useQuery } from "@tanstack/react-query";
import {
  CoursePaymentQueryOptions,
  CoursePaymentSummaryPaginator,
} from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { EnrollmentPaymentClient } from "./client/enrollment-payment";

export const useCoursePaymentsSummaryQuery = (
  params: Partial<CoursePaymentQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<
    CoursePaymentSummaryPaginator,
    Error
  >(
    [`${API_ENDPOINTS.ENROLLMENT_PAYMENTS}/summary`, params],
    ({ queryKey, pageParam }) =>
      EnrollmentPaymentClient.coursePayments(
        Object.assign({}, queryKey[1], pageParam)
      ),
    {
      keepPreviousData: true,
      enabled: !!params.teacherId,
      ...options,
    }
  );

  return {
    coursePayments: data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};
