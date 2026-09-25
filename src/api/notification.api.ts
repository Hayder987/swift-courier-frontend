import apiClient from "@/lib/apiClient";

export function getNotifications() {
  return apiClient("/notifications/all-notifications");
}

export function deleteNotification(id: string) {
  return apiClient(`/notifications/${id}`, {
    method: "DELETE",
  });
}
