import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExamResultPaginator, ExamResultQueryOptions } from "@types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { ExamResultClient } from "./client/examResult";
import { toast } from "react-toastify";

export const useExamResultsQuery = (
  params: Partial<ExamResultQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<ExamResultPaginator, Error>(
    [API_ENDPOINTS.EXAMRESULTS, params],
    ({ queryKey, pageParam }) =>
      ExamResultClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      // enabled: !!params.examId,
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    examResults: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useUpdateExamResultMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation(ExamResultClient.update, {
    onSuccess: async () => {
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EXAMRESULTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something going wrong!");
    },
  });
};
