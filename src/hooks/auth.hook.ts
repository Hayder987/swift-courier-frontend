import { useMutation, useQuery } from "@tanstack/react-query";
import {
  forgotPassword,
  getMe,
  googleOAuth,
  resendAuthOtp,
  resetPassword,
  userLogin,
  userLogout,
  userRegister,
  verifyAccount,
} from "@/api";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useRegisterUser() {
  return useMutation({
    mutationFn: userRegister,
  });
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}

export function useResendAuthOtp() {
  return useMutation({
    mutationFn: resendAuthOtp,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useGoogleOAuth() {
  return useMutation({
    mutationFn: googleOAuth,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}
