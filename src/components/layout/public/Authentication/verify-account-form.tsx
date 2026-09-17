"use client";

import { useQueryClient } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { CheckCircle2, Mail, RefreshCw, ShieldCheck } from "lucide-react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";
import { useVerifyAccount } from "@/hooks";
import { ResendOtpSend } from "./ResendOtpSend";

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const { mutate: verify, isPending: verifyPending } = useVerifyAccount();
  const queryClient = useQueryClient();

  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.replace("/");
    }
  }, [email, router]);

  const resendPayload = {
    email,
    emailVerifyOtp: true,
  };

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verify(verifyData, {
      onSuccess: async (res) => {
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
          title: "Verification Successful",
          description: "Your SwiftCourier account is ready.",
          type: "success",
        });

        await queryClient.invalidateQueries({
          queryKey: ["user"],
        });
        router.push("/");
      },

      onError: (err) => {
        setIsInvalid(true);
        toast.add({
          title: "Verification Failed",
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
      <div className="h-1 w-full bg-gradient-to-r from-[#e50914] via-[#e50914]/80 to-transparent" />

      <CardHeader className="space-y-5 px-5 pb-5 pt-7 sm:px-8 sm:pt-9">
        {/* Icon */}
        <div className="flex size-14 items-center justify-center rounded-2xl bg-[#e50914]/8 text-[#e50914] shadow-[0_8px_25px_rgba(229,9,20,0.08)] dark:bg-[#e50914]/10 dark:shadow-[0_8px_30px_rgba(229,9,20,0.12)]">
          <ShieldCheck className="size-7" strokeWidth={1.8} />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <CardTitle className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Verify your account
          </CardTitle>

          <CardDescription className="max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-[15px]">
            Enter the 6-digit verification code we sent to your email address.
          </CardDescription>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#e50914] shadow-sm dark:bg-slate-900">
            <Mail className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Code sent to
            </p>

            <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
              {maskedEmail}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-5 sm:px-8">
        <form
          id="otp-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleOTP();
          }}
        >
          <Field data-invalid={isInvalid}>
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

            {/* OTP */}
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);

                if (isInvalid) {
                  setIsInvalid(false);
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

            {/* Error */}
            {isInvalid && (
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
        </form>
        {/* Resend */}
        <ResendOtpSend payload={resendPayload} />
      </CardContent>

      <CardFooter className="flex flex-col gap-3 px-5 pb-7 pt-6 sm:px-8 sm:pb-9">
        {/* Verify button */}
        <Button
          type="submit"
          form="otp-form"
          disabled={verifyPending || otp.length !== 6}
          className="h-12 w-full rounded-xl bg-[#e50914] px-6 text-sm font-bold text-white shadow-[0_10px_30px_rgba(229,9,20,0.18)] transition-all duration-300 hover:bg-[#c90812] hover:shadow-[0_14px_35px_rgba(229,9,20,0.28)] disabled:pointer-events-none disabled:opacity-50 sm:h-13 sm:rounded-2xl"
        >
          {verifyPending ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Verifying...
            </>
          ) : (
            <>
              <CheckCircle2 className="size-4" />
              Verify account
            </>
          )}
        </Button>

        {/* Terms */}
        <p className="text-center text-[10px] leading-5 text-slate-400 dark:text-slate-600 sm:text-[11px]">
          By verifying your account, you agree to use SwiftCourier according to
          our terms and policies.
        </p>
      </CardFooter>
    </Card>
  );
}
