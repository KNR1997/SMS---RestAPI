import { useNavigate } from "react-router";
import { EmployeePaymentClient } from "./client/employee-payment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { EmployeePaymentPaginator, EmployeePaymentQueryOptions } from "@types";
import { mapPaginatorData } from "../utils/data-mappers";

export const useCreateEmployeePaymentMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(EmployeePaymentClient.create, {
    onSuccess: async () => {
      navigate("/exams");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EMPLOYEE_PAYMENTS);
    },
    onError: (error: any) => {
      toast.error("Something going wrong!");
    },
  });
};

export const useEmployeePaymentsQuery = (
  params: Partial<EmployeePaymentQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<EmployeePaymentPaginator, Error>(
    [API_ENDPOINTS.EMPLOYEE_PAYMENTS, params],
    ({ queryKey, pageParam }) =>
      EmployeePaymentClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    employeePayments: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};