import { useSuspenseQuery } from "@tanstack/react-query";
import { getAdminDashBoardOverview } from "@/api/dashboard.api";
import type { IDashboardQuery } from "@/types/dashboard.stats.type";

export function useGetSuspenseAdminDashboardOverview(params: IDashboardQuery) {
  return useSuspenseQuery({
    queryKey: ["dashboard", params],
    queryFn: () => getAdminDashBoardOverview(params),
  });
}
