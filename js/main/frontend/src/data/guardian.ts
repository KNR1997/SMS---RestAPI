import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetParams,
  Guardian,
  GuardianPaginator,
  GuardianQueryOptions,
} from "../types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { GuardianClient } from "./client/guardian";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useGuardiansQuery = (
  params: Partial<GuardianQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<GuardianPaginator, Error>(
    [API_ENDPOINTS.GUARDIANS, params],
    ({ queryKey, pageParam }) =>
      GuardianClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    guardians: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useGuardianQuery = ({ slug }: GetParams) => {
  const { data, error, isLoading } = useQuery<Guardian, Error>(
    [API_ENDPOINTS.GUARDIANS, { slug }],
    () => GuardianClient.get({ slug })
  );

  return {
    guardian: data,
    error,
    loading: isLoading,
  };
};

export const useGuardianByIDNumberQuery = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery<Guardian, Error>(
    [API_ENDPOINTS.GUARDIANS, { id }],
    () => GuardianClient.getByIDNumber({ id }),
    {
      enabled: !!id,
    }
  );

  return {
    guardian: data,
    error,
    loading: isLoading,
  };
};

export const useUpdateGuardianMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(GuardianClient.update, {
    onSuccess: async () => {
      navigate("/guardians");
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GUARDIANS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useEnableGuardianMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(GuardianClient.enable, {
    onSuccess: async () => {
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GUARDIANS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDisableGuardianMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(GuardianClient.disable, {
    onSuccess: async () => {
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GUARDIANS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteGuardianMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(GuardianClient.delete, {
    onSuccess: async () => {
      toast.success("Successfully deleted!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.GUARDIANS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });
};
