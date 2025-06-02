import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetParams, StudentPaginator, StudentQueryOptions, User, UserPaginator, UserQueryOptions } from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { UserClient } from "./client/user";
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

export const useStudentQuery = (id: string) => {
  const { data, error, isLoading } = useQuery<User, Error>(
    [API_ENDPOINTS.STUDENTS, { id }],
    () => UserClient.fetchUser({ id })
  );

  return {
    user: data,
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
  const queryClient = useQueryClient();
  return useMutation(StudentClient.update, {
    onSuccess: async () => {
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