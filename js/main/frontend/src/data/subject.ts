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
import { subjectClient } from "./client/subject";

export const useSubjectsQuery = (
  params: Partial<SubjectQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<SubjectPaginator, Error>(
    [API_ENDPOINTS.SUBJECTS, params],
    ({ queryKey, pageParam }) =>
      subjectClient.paginated(Object.assign({}, queryKey[1], pageParam)),
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
    () => subjectClient.get({ slug })
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

  return useMutation(subjectClient.create, {
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
  return useMutation(subjectClient.update, {
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
    () => subjectClient.getStudentCountsPerGrade()
  );

  return {
    studentsPerGrades: data,
    error,
    loading: isLoading,
  };
};

export const useEnableSubjectMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(subjectClient.enable, {
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

export const useDisableSubjectMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(subjectClient.disable, {
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

export const useDeleteSubjectMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(subjectClient.delete, {
    onSuccess: async () => {
      navigate("/subjects");
      toast.success("Successfully deleted!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SUBJECTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });
};
