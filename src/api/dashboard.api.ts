import apiClient from "@/lib/apiClient";
import type { IApiResponse } from "@/types/api.type";
import type {
  IDashboardData,
  IDashboardQuery,
} from "@/types/dashboard.stats.type";

export function getAdminDashBoardOverview(params: IDashboardQuery) {
  return apiClient<IApiResponse<IDashboardData>>("/dashboard/stats", {
    params,
  });
}
