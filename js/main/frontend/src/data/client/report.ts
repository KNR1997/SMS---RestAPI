import { API_ENDPOINTS } from "./api-endpoints";
import { HttpClient } from "./http-client";

export const ReportClient = {
  getInstituteMonthlyIncome: () => {
    return HttpClient.get<any>(`${API_ENDPOINTS.REPORTS}/institute-monthly-income`);
  },
};
