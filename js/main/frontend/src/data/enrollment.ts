import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Enrollment,
  EnrollmentPaginator,
  EnrollmentQueryOptions,
  GetParams,
  StudentsPerCouse,
} from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { CourseClient } from "./client/course";
import { EnrollmentClient } from "./client/enrollment";

export const useEnrollmentsQuery = (
  params: Partial<EnrollmentQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<EnrollmentPaginator, Error>(
    [API_ENDPOINTS.ENROLLMENTS, params],
    ({ queryKey, pageParam }) =>
      EnrollmentClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    enrollments: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useEnrollmentQuery = ({ slug }: GetParams) => {
  const { data, error, isLoading } = useQuery<Enrollment, Error>(
    [API_ENDPOINTS.ENROLLMENTS, { slug }],
    () => EnrollmentClient.get({ slug })
  );

  return {
    enrollment: data,
    error,
    loading: isLoading,
  };
};

export const useInvokeEnrollmentMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(EnrollmentClient.invoke, {
    onSuccess: async () => {
      navigate("/enrollments");
      toast.success("Successfully invoked!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ENROLLMENTS);
    },
    onError: (error: any) => {
      toast.error("Something going wrong!");
    },
  });
};

export const useUpdateCourseMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(CourseClient.update, {
    onSuccess: async () => {
      navigate("/courses");
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.COURSES);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something going wrong!");
    },
  });
};

export const useStudentCountPerCourseQuery = () => {
  const { data, error, isLoading } = useQuery<StudentsPerCouse[], Error>(
    [`${API_ENDPOINTS.ENROLLMENTS}/students-per-course`],
    () => EnrollmentClient.getStudentCountsPerCourse()
  );

  return {
    studentsPerCourses: data,
    error,
    loading: isLoading,
  };
};
