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
import { courseClient } from "./client/course";

export const useCoursesQuery = (
  params: Partial<CourseQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<CoursePaginator, Error>(
    [API_ENDPOINTS.COURSES, params],
    ({ queryKey, pageParam }) =>
      courseClient.paginated(Object.assign({}, queryKey[1], pageParam)),
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
    () => courseClient.get({ slug })
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

  return useMutation(courseClient.create, {
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

  return useMutation(courseClient.update, {
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

export const useEnableCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(courseClient.enable, {
    onSuccess: async () => {
      toast.success("Successfully updated!");
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

export const useDisableCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(courseClient.disable, {
    onSuccess: async () => {
      toast.success("Successfully updated!");
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

export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(courseClient.delete, {
    onSuccess: async () => {
      toast.success("Successfully deleted!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.COURSES);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });
};
