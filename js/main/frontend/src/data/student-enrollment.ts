import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { StudentEnrollmentClient } from "./client/student-enrollment";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "./client/api-endpoints";

export const useStudentEnrollCourseMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(StudentEnrollmentClient.enrollToCourse, {
    onSuccess: async () => {
      navigate("/enrollments");
      toast.success("Successfully created!");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ENROLLMENTS);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Something going wrong!");
    },
  });
};