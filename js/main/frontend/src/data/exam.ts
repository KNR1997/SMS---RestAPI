import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Exam,
  ExamPaginator,
  ExamQueryOptions,
  GetParams,
} from "@types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ExamClient } from "./client/exam";

export const useExamsQuery = (
  params: Partial<ExamQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<ExamPaginator, Error>(
    [API_ENDPOINTS.EXAMS, params],
    ({ queryKey, pageParam }) =>
      ExamClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    exams: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useExamQuery = ({ slug }: GetParams) => {
  const { data, error, isLoading } = useQuery<Exam, Error>(
    [API_ENDPOINTS.EXAMS, { slug }],
    () => ExamClient.get({ slug })
  );

  return {
    exam: data,
    error,
    loading: isLoading,
  };
};

export const useCreateExamMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(ExamClient.create, {
    onSuccess: async () => {
      navigate("/exams");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EXAMS);
    },
    onError: (error: any) => {
      toast.error("Something going wrong!");
    },
  });
};

export const useUpdateExamMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return useMutation(ExamClient.update, {
    onSuccess: async () => {
      navigate("/exams");
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EXAMS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something going wrong!");
    },
  });
};
