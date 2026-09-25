import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteNotification, getNotifications } from "@/api";

export function useGetNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    retry: false,
  });
}

export function useDeleteNotification() {
  return useMutation({
    mutationFn: deleteNotification,
  });
}
