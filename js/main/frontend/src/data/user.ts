import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User, UserPaginator, UserQueryOptions } from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { UserClient } from "./client/user";
import { mapPaginatorData } from "../utils/data-mappers";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// get all users from backend
export const useUsersQuery = (
  params: Partial<UserQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<UserPaginator, Error>(
    [API_ENDPOINTS.USERS, params],
    ({ queryKey, pageParam }) =>
      UserClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    users: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

// User create
export const useCreateUserMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(UserClient.create, {
    onSuccess: async () => {
      navigate("/users");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error ?? "Something going wrong!");
    },
  });
};

// user update
export const useUpdateUserMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(UserClient.update, {
    onSuccess: async () => {
      navigate("/users");
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error ?? "Something going wrong!");
    },
  });
};

export const usePatchUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(UserClient.patch, {
    onSuccess: async () => {
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ME);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error ?? "Something going wrong!");
    },
  });
};

// get single user from the backend
export const useUserQuery = (id: string) => {
  const { data, error, isLoading } = useQuery<User, Error>(
    [API_ENDPOINTS.USERS, { id }],
    () => UserClient.fetchUser({ id })
  );

  return {
    user: data,
    error,
    loading: isLoading,
  };
};

// user details in profile
export const useMeQuery = () => {
  const { data, error, isLoading } = useQuery<User, Error>(
    [API_ENDPOINTS.ME],
    () => UserClient.me()
  );

  return {
    user: data,
    error,
    loading: isLoading,
  };
};

// user password reset
export const useResetUserPasswordMutation = () => {
  //const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(UserClient.resetPassword, {
    onSuccess: async () => {
      // navigate("/users");
      toast.success("Successfull Password Reset!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
    onError: (error: any) => {
      console.error("error: ", error);
      toast.error(error?.response?.data?.message ?? "Something going wrong!");
    },
  });
};

export const useEnableUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(UserClient.enable, {
    onSuccess: async () => {
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDisableUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(UserClient.disable, {
    onSuccess: async () => {
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(UserClient.delete, {
    onSuccess: async () => {
      toast.success("Successfully deleted!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation(UserClient.changePassword);
};