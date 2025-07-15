import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetParams,
  Payment,
  PaymentPaginator,
  PaymentQueryOptions,
} from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { PaymentClient } from "./client/payment";

export const usePaymentsQuery = (
  params: Partial<PaymentQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<PaymentPaginator, Error>(
    [API_ENDPOINTS.PAYMENTS, params],
    ({ queryKey, pageParam }) =>
      PaymentClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    payments: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const usePaymentQuery = ({ slug }: GetParams) => {
  const { data, error, isLoading } = useQuery<Payment, Error>(
    [API_ENDPOINTS.PAYMENTS, { slug }],
    () => PaymentClient.get({ slug })
  );

  return {
    payment: data,
    error,
    loading: isLoading,
  };
};

export const useCreatePaymentMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(PaymentClient.create, {
    onSuccess: async () => {
      navigate("/payments");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.PAYMENTS);
    },
    onError: (error: any) => {
      toast.error("Something going wrong!");
    },
  });
};

// export const useUpdateSubjectMutation = () => {
//   const navigate = useNavigate();

//   const queryClient = useQueryClient();
//   return useMutation(SubjectClient.update, {
//     onSuccess: async () => {
//       navigate("/subjects");
//       toast.success("Successfully updated!");
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.SUBJECTS);
//     },
//     onError: (error: any) => {
//       toast.error(error?.response?.data?.message);
//     },
//   });
// };
