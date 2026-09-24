import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/api";

export function useGetNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    retry: false,
  });
}
