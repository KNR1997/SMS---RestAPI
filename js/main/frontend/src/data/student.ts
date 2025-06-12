import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CoursePaginator,
  GetParams,
  Student,
  StudentPaginator,
  StudentQueryOptions,
} from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { StudentClient } from "./client/student";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useStudentsQuery = (
  params: Partial<StudentQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<StudentPaginator, Error>(
    [API_ENDPOINTS.STUDENTS, params],
    ({ queryKey, pageParam }) =>
      StudentClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    students: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useStudentQuery = ({ slug }: GetParams) => {
  const { data, error, isLoading } = useQuery<Student, Error>(
    [API_ENDPOINTS.STUDENTS, { slug }],
    () => StudentClient.get({ slug })
  );

  return {
    student: data,
    error,
    loading: isLoading,
  };
};

export const useCreateStudentMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(StudentClient.create, {
    onSuccess: async () => {
      navigate("/students");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.STUDENTS);
    },
    onError: (error: any) => {
      toast.error("Something going wrong!");
    },
  });
};

export const useUpdateStudentMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(StudentClient.update, {
    onSuccess: async () => {
      navigate("/students");
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.STUDENTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useStudentEnrollCourseMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(StudentClient.enrollToCourse, {
    onSuccess: async () => {
      navigate("/enrollments");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.STUDENTS);
    },
    onError: (error: any) => {
      console.log('erroreeeeeeeeeee: ', error?.message)
      toast.error(error?.response?.data?.message ?? "Something going wrong!");
    },
  });
};

export const useMyCoursesQuery = (
  params: Partial<StudentQueryOptions & { studentId: number }>
) => {
  const { data, error, isLoading } = useQuery<CoursePaginator, Error>(
    [API_ENDPOINTS.STUDENTS, params],
    () => StudentClient.getMyCourses(params),
    {
      keepPreviousData: true,
    }
  );

  return {
    courses: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};
