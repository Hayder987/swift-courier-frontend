import apiClient from "@/lib/apiClient";
import type { ILoginPayload } from "@/types/auth.types";
import type {
  IForgotPasswordPayload,
  IRegisterUserPayload,
  IResendOtpPayload,
  IVerifyEmailPayload,
} from "@/validation";

export function userLogin(payload: ILoginPayload) {
  return apiClient(`/auth/login`, { method: "POST", body: payload });
}

export function userRegister(payload: IRegisterUserPayload) {
  return apiClient("/auth/sign-up", { method: "POST", body: payload });
}

export function verifyAccount(payload: IVerifyEmailPayload) {
  return apiClient("/auth/verify-email", { method: "POST", body: payload });
}

export function forgotPassword(payload: IForgotPasswordPayload) {
  return apiClient("/auth/forgot-password", { method: "POST", body: payload });
}

export function resetPassword(payload: IForgotPasswordPayload) {
  return apiClient("/auth/reset-password", { method: "POST", body: payload });
}

export function resendAuthOtp(payload: IResendOtpPayload) {
  return apiClient("/auth/resend-otp", { method: "POST", body: payload });
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
