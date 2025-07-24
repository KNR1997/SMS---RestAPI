import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Course,
  CoursePaginator,
  CourseQueryOptions,
  GetParams,
} from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { CourseClient } from "./client/course";

export const useCoursesQuery = (
  params: Partial<CourseQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<CoursePaginator, Error>(
    [API_ENDPOINTS.COURSES, params],
    ({ queryKey, pageParam }) =>
      CourseClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    courses: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useCourseQuery = ({ slug }: GetParams) => {
  const { data, error, isLoading } = useQuery<Course, Error>(
    [API_ENDPOINTS.COURSES, { slug }],
    () => CourseClient.get({ slug })
  );

  return {
    course: data,
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
      toast.error(error?.response?.data?.error ?? "Something going wrong!");
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

export const useDisableCourseMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(CourseClient.disable, {
    onSuccess: async () => {
      navigate("/courses");
      toast.success("Successfully deleted!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.COURSES);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};