import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { ReportClient } from "./client/report";
import { InstitueMonthlyIncome } from "@types";

export const useInstituteMonthlyIncomeQuery = () => {
  const { data, error, isLoading } = useQuery<InstitueMonthlyIncome[], Error>(
    [`${API_ENDPOINTS.REPORTS}/institute-monthly-income`],
    () => ReportClient.getInstituteMonthlyIncome()
  );

  return {
    instituteMonthlyIncomes: data,
    error,
    loading: isLoading,
  };
};
