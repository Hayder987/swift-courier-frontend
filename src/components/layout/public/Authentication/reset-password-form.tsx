"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";
import { useResetPassword } from "@/hooks";
import { ResetPasswordZodSchema } from "@/validation";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { mutate: resetPassword, isPending: resetPending } = useResetPassword();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isOtpInvalid, setIsOtpInvalid] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!email) {
      router.replace("/forgot-password");
    }
  }, [email, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsOtpInvalid(false);
    setPasswordError("");

    // OTP validation
    if (otp.length !== 6) {
      setIsOtpInvalid(true);
      return;
    }

    // Password validation
    const validationResult = ResetPasswordZodSchema.safeParse({
      email,
      otp,
      newPassword,
    });

    if (!validationResult.success) {
      const newPasswordIssue = validationResult.error.issues.find(
        (issue) => issue.path[0] === "newPassword",
      );

      if (newPasswordIssue) {
        setPasswordError(newPasswordIssue.message);
      }

      return;
    }

    const resetData = {
      email,
      otp,
      newPassword,
    };

    resetPassword(resetData, {
      onSuccess: (res) => {
        // Server returned an unsuccessful response
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description:
              res.message || "Something went wrong. Please try again",
            type: "error",
          });

          return;
        }

        toast.add({
          title: "Password Reset Successful",
          description:
            "Your password has been reset successfully. Please login with your new password.",
          type: "success",
        });

        router.push("/login");
      },

      onError: (err) => {
        setIsOtpInvalid(true);

        toast.add({
          title: "Password Reset Failed",
          description:
            err.message || "The verification code is invalid or expired.",
          type: "error",
        });
      },
    });
  };

  if (!email) {
    return null;
  }

  const maskedEmail = email.replace(
    /^(.{2})(.*)(@.*)$/,
    (_, first, middle, domain) =>
      `${first}${"*".repeat(Math.min(middle.length, 5))}${domain}`,
  );

  return (
    <Card className="overflow-hidden rounded-3xl border-slate-200/80 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-900 dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)] sm:rounded-[2rem]">
      {/* Top accent */}
      <div className="h-1 w-full bg-linear-to-r from-[#e50914] via-[#e50914]/80 to-transparent" />

      <CardHeader className="space-y-5 px-5 pb-5 pt-7 sm:px-8 sm:pt-9">
        {/* Icon */}
        <div className="flex size-14 items-center justify-center rounded-2xl bg-[#e50914]/8 text-[#e50914] shadow-[0_8px_25px_rgba(229,9,20,0.08)] dark:bg-[#e50914]/10 dark:shadow-[0_8px_30px_rgba(229,9,20,0.12)]">
          <ShieldCheck className="size-7" strokeWidth={1.8} />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <CardTitle className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Reset your password
          </CardTitle>

          <CardDescription className="max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-[15px]">
            Enter the verification code we sent to your email and create a new
            password for your account.
          </CardDescription>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#e50914] shadow-sm dark:bg-slate-900">
            <Mail className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Reset code sent to
            </p>

            <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
              {maskedEmail}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-5 sm:px-8">
        <form id="reset-password-form" onSubmit={handleSubmit}>
          {/* OTP */}
          <Field data-invalid={isOtpInvalid}>
            {/* Label */}
            <div className="mb-3 flex items-center justify-between">
              <FieldLabel
                htmlFor="otp"
                className="text-sm font-bold text-slate-800 dark:text-slate-200"
              >
                Verification code
              </FieldLabel>

              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                6 digits
              </span>
            </div>

            {/* OTP Input */}
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);

                if (isOtpInvalid) {
                  setIsOtpInvalid(false);
                }
              }}
              autoComplete="one-time-code"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
              containerClassName="w-full"
              className="w-full"
            >
              <InputOTPGroup className="flex w-full justify-between gap-1.5 sm:gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="size-11 rounded-xl border-slate-200 bg-slate-50 text-lg font-bold text-slate-900 shadow-sm transition-all duration-200 focus-within:border-[#e50914] focus-within:ring-2 focus-within:ring-[#e50914]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus-within:border-[#e50914] dark:focus-within:ring-[#e50914]/15 sm:size-12 sm:rounded-2xl sm:text-xl"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {/* OTP Error */}
            {isOtpInvalid && (
              <FieldError
                className="mt-2"
                errors={[
                  {
                    message:
                      "Invalid or expired code. Please check your email and try again.",
                  },
                ]}
              />
            )}
          </Field>

          {/* New Password */}
          <Field className="mt-5">
            <FieldLabel
              htmlFor="newPassword"
              className="text-sm font-bold text-slate-800 dark:text-slate-200"
            >
              New password
            </FieldLabel>

            <div className="relative mt-2">
              <LockKeyhole className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />

              <Input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);

                  if (passwordError) {
                    setPasswordError("");
                  }
                }}
                className="h-12 pr-11 pl-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            <FieldDescription>
              Password must be at least 8 characters long.
            </FieldDescription>

            {passwordError && <FieldError>{passwordError}</FieldError>}
          </Field>

          {/* Security Note */}
          <div className="mt-5 flex gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />

            <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
              Choose a strong password that you do not use on other websites.
              Your new password will replace your existing password.
            </p>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 px-5 pb-7 pt-6 sm:px-8 sm:pb-9">
        {/* Reset button */}
        <Button
          type="submit"
          form="reset-password-form"
          disabled={resetPending || otp.length !== 6 || !newPassword}
          className="h-12 w-full rounded-xl bg-[#e50914] px-6 text-sm font-bold text-white shadow-[0_10px_30px_rgba(229,9,20,0.18)] transition-all duration-300 hover:bg-[#c90812] hover:shadow-[0_14px_35px_rgba(229,9,20,0.28)] disabled:pointer-events-none disabled:opacity-50 sm:h-13 sm:rounded-2xl"
        >
          {resetPending ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Resetting password...
            </>
          ) : (
            <>
              <CheckCircle2 className="size-4" />
              Reset password
            </>
          )}
        </Button>

        {/* Login */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="font-semibold text-[#e50914] hover:underline"
          >
            Back to Login
          </button>
        </p>

        {/* Terms */}
        <p className="text-center text-[10px] leading-5 text-slate-400 dark:text-slate-600 sm:text-[11px]">
          By resetting your password, you agree to use SwiftCourier according to
          our terms and policies.
        </p>
      </CardFooter>
    </Card>
  );
}
