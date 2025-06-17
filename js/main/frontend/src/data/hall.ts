import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetParams, Hall, HallPaginator, HallQueryOptions } from "@types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { HallClient } from "./client/hall";
import { mapPaginatorData } from "../utils/data-mappers";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useHallsQuery = (
  params: Partial<HallQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<HallPaginator, Error>(
    [API_ENDPOINTS.HALLS, params],
    ({ queryKey, pageParam }) =>
      HallClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    halls: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useHallQuery = ({ slug }: GetParams) => {
  const { data, error, isLoading } = useQuery<Hall, Error>(
    [API_ENDPOINTS.HALLS, { slug }],
    () => HallClient.get({ slug })
  );

  return {
    hall: data,
    error,
    loading: isLoading,
  };
};

export const useCreateHallMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(HallClient.create, {
    onSuccess: async () => {
      navigate("/halls");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.HALLS);
    },
    onError: (error: any) => {
      toast.error("Something going wrong!");
    },
  });
};

export const useUpdateHallMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return useMutation(HallClient.update, {
    onSuccess: async () => {
      navigate("/halls");
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.HALLS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something going wrong!");
    },
  });
};
