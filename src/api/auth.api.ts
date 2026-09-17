import apiClient from "@/lib/apiClient";
import type { ILoginPayload } from "@/types/auth.types";
import type { IRegisterUserPayload, IVerifyEmailPayload } from "@/validation";

export function userLogin(paylod: ILoginPayload) {
  return apiClient(`/auth/login`, { method: "POST", body: paylod });
}

export function userRegister(payload: IRegisterUserPayload) {
  return apiClient("/auth/sign-up", { method: "POST", body: payload });
}

export function verifyAccount(payload: IVerifyEmailPayload) {
  return apiClient("/auth/verify-email", { method: "POST", body: payload });
}

export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiClient("/users/me");
}

export function googleOAuth(payload: { idToken: string }) {
  return apiClient("/auth/google", { method: "POST", body: payload });
}
