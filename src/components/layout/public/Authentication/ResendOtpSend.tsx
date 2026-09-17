import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldDescription } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { useResendAuthOtp } from "@/hooks";
import type { IResendOtpPayload } from "@/validation";

const RESEND_COOLDOWN = 60;

export const ResendOtpSend = ({ payload }: { payload: IResendOtpPayload }) => {
  const { mutate: resendOtp, isPending: resendPending } = useResendAuthOtp();

  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  if (!payload.email) {
    return null;
  }

  const handleResendOtp = () => {
    resendOtp(payload, {
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

        // OTP resend successful
        toast.add({
          title: `${
            payload.emailVerifyOtp ? "Verification" : "Reset"
          } OTP Resend Successful`,
          description: `${
            payload.emailVerifyOtp ? "Verification" : "Reset"
          } OTP has been sent to ${payload.email}`,
          type: "success",
        });
      },

      onError: (err) => {
        toast.add({
          title: `${
            payload.emailVerifyOtp ? "Verification" : "Reset"
          } OTP Resend Failed`,
          description: err.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };

  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <FieldDescription className="m-0 text-xs text-slate-400 dark:text-slate-500">
        Didn&apos;t receive the code?
      </FieldDescription>

      <button
        type="button"
        disabled={resendTimer > 0 || resendPending}
        onClick={handleResendOtp}
        className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#e50914] transition-colors hover:text-[#c90812] disabled:cursor-not-allowed disabled:text-slate-400 dark:hover:text-[#ff3340] dark:disabled:text-slate-600"
      >
        <RefreshCw
          className={`size-3.5 transition-transform duration-300 ${
            resendTimer > 0 ? "" : "hover:rotate-180"
          }`}
        />

        {resendPending && (
          <div className="flex justify-center items-center gap-2">
            <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span className="">Sending...</span>
          </div>
        )}
        {!resendPending && (
          <span className="">
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend code"}
          </span>
        )}
      </button>
    </div>
  );
};
