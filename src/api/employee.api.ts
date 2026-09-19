import apiClient from "@/lib/apiClient";

export function applyCourier(payload: any) {
  return apiClient("/employee/be-courier", { method: "POST" });
}
