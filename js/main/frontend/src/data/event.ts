import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Event, EventPaginator, EventQueryOptions, GetParams } from "@types";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { mapPaginatorData } from "../utils/data-mappers";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { EventClient } from "./client/event";

export const useEventsQuery = (
  params: Partial<EventQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<EventPaginator, Error>(
    [API_ENDPOINTS.EVENTS, params],
    ({ queryKey, pageParam }) =>
      EventClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    events: data?.content ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useEventQuery = ({ slug }: GetParams) => {
  const { data, error, isLoading } = useQuery<Event, Error>(
    [API_ENDPOINTS.EVENTS, { slug }],
    () => EventClient.get({ slug })
  );

  return {
    event: data,
    error,
    loading: isLoading,
  };
};

export const useCreateEventMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(EventClient.create, {
    onSuccess: async () => {
      navigate("/events");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EVENTS);
    },
    onError: (error: any) => {
      toast.error("Something going wrong!");
    },
  });
};

export const useUpdateEventMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(EventClient.update, {
    onSuccess: async () => {
      navigate("/events");
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EVENTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something going wrong!");
    },
  });
};

export const useEnableEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(EventClient.enable, {
    onSuccess: async () => {
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EVENTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDisableEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(EventClient.disable, {
    onSuccess: async () => {
      toast.success("Successfully updated!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EVENTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(EventClient.delete, {
    onSuccess: async () => {
      toast.success("Successfully deleted!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EVENTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data);
    },
  });
};
