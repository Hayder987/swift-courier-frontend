import apiClient from "@/lib/apiClient";
import type { ILoginPayload } from "@/types/auth.types";

export function userLogin(paylod: ILoginPayload) {
  return apiClient(`/auth/login`, { method: "POST", body: paylod });
}

export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiClient("/users/me");
}
