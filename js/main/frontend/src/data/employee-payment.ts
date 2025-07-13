import { useNavigate } from "react-router";
import { EmployeePaymentClient } from "./client/employee-payment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "./client/api-endpoints";

export const useCreateEmployeePaymentMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(EmployeePaymentClient.create, {
    onSuccess: async () => {
      navigate("/exams");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.EMPLOYEE_PAYMENTS);
    },
    onError: (error: any) => {
      toast.error("Something going wrong!");
    },
  });
};