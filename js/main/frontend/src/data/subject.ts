import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetParams,
  StudentsPerGrade,
  Subject,
  SubjectPaginator,
  SubjectQueryOptions,
} from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { SubjectClient } from "./client/subject";

export const useSubjectsQuery = (
  params: Partial<SubjectQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<SubjectPaginator, Error>(
    [API_ENDPOINTS.SUBJECTS, params],
    ({ queryKey, pageParam }) =>
      SubjectClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    subjects: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useSubjectQuery = ({ slug }: GetParams) => {
  const { data, error, isLoading } = useQuery<Subject, Error>(
    [API_ENDPOINTS.SUBJECTS, { slug }],
    () => SubjectClient.get({ slug })
  );

  return {
    subject: data,
    error,
    loading: isLoading,
  };
};

export const useCreateSubjectMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(SubjectClient.create, {
    onSuccess: async () => {
      navigate("/subjects");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SUBJECTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error ?? "Something going wrong!");
    },
  });
};

export const useUpdateSubjectMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(SubjectClient.update, {
    onSuccess: async () => {
      navigate("/subjects");
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SUBJECTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useStudentCountPerGradeQuery = () => {
  const { data, error, isLoading } = useQuery<StudentsPerGrade[], Error>(
    [`${API_ENDPOINTS.STUDENTS}/students-per-grade`],
    () => SubjectClient.getStudentCountsPerGrade()
  );

  return {
    studentsPerGrades: data,
    error,
    loading: isLoading,
  };
};

export const useDeleteSubjectMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(SubjectClient.delete, {
    onSuccess: async () => {
      navigate("/subjects");
      toast.success("Successfully deleted!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SUBJECTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDisableSubjectMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(SubjectClient.disable, {
    onSuccess: async () => {
      navigate("/subjects");
      toast.success("Successfully deleted!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SUBJECTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};
