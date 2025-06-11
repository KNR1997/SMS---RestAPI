import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Course,
  CoursePaginator,
  CourseQueryOptions,
  Enrollment,
  EnrollmentPaginator,
  GetParams,
} from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { CourseClient } from "./client/course";
import { EnrollmentClient } from "./client/enrollment";

export const useEnrollmentsQuery = (
  params: Partial<CourseQueryOptions>,
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

export const useCreateCourseMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(CourseClient.create, {
    onSuccess: async () => {
      navigate("/courses");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.COURSES);
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
