import apiClient from "@/lib/apiClient";

export function getNotifications() {
  return apiClient("/notifications/all-notifications");
}
