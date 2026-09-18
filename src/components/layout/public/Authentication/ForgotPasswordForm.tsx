"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

import { useForgotPassword } from "@/hooks";
import { forgotPasswordSchema } from "@/validation";

const defaultValues = {
  email: "",
};

export default function ForgotPasswordForm() {
  const router = useRouter();

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: forgotPasswordSchema,
    },

    onSubmit: async ({ value }) => {
      const forgotData = {
        email: value.email,
      };

      forgotPassword(forgotData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Request Failed",
              description:
                res.message || "Something went wrong. Please try again.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Verification Code Sent",
            description: "Please check your email for the password reset code.",
            type: "success",
          });

          const params = new URLSearchParams({ email: forgotData.email });
          router.push(`/reset-password?${params.toString()}`);
        },

        onError: (error) => {
          toast.add({
            title: "Request Failed",
            description:
              error instanceof Error
                ? error.message
                : "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="w-full">
      {/* Brand */}
      <div className="mb-10">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div
            className="
              flex size-10 items-center justify-center
              rounded-xl
              bg-[#e50914]
              text-sm font-black
              text-white
              shadow-[0_8px_25px_rgba(229,9,20,0.22)]
            "
          >
            SC
          </div>

          <span
            className="
              text-xl font-black
              tracking-tight
              text-slate-950
              dark:text-white
            "
          >
            Swift<span className="text-[#e50914]">Courier</span>
          </span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div
          className="
            mb-5 flex size-12 items-center justify-center
            rounded-xl
            border border-[#e50914]/15
            bg-[#e50914]/5
            text-[#e50914]

            dark:border-[#e50914]/20
            dark:bg-[#e50914]/10
          "
        >
          <ShieldCheck className="size-6" />
        </div>

        <h2
          className="
            text-3xl font-black
            tracking-tight
            text-slate-950
            sm:text-4xl
            dark:text-white
          "
        >
          Forgot your password?
        </h2>

        <p
          className="
            mt-3 max-w-md
            text-sm leading-6
            text-slate-500
            dark:text-slate-400
          "
        >
          Enter the email address associated with your SwiftCourier account.
          We&apos;ll send you a verification code to reset your password.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="
                    text-sm font-semibold
                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  Email address
                </FieldLabel>

                <div className="relative mt-2">
                  <Mail
                    className="
                      pointer-events-none
                      absolute left-3.5 top-1/2
                      size-4
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                    className="
                      h-12
                      rounded-xl
                      border-slate-200
                      bg-white
                      pl-10
                      text-sm
                      shadow-sm
                      transition-all

                      placeholder:text-slate-400

                      focus:border-[#e50914]
                      focus:ring-[#e50914]/20

                      dark:border-white/10
                      dark:bg-white/[0.04]
                      dark:text-white
                      dark:placeholder:text-slate-500
                      dark:focus:border-[#e50914]
                    "
                  />
                </div>

                <FieldDescription
                  className="
                    mt-2
                    text-xs
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  Use the email you used when creating your account.
                </FieldDescription>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="
            h-12 w-full
            rounded-xl
            bg-[#e50914]
            text-sm font-bold
            text-white
            shadow-[0_10px_30px_rgba(229,9,20,0.20)]
            transition-all duration-300

            hover:-translate-y-0.5
            hover:bg-[#c90812]
            hover:shadow-[0_14px_35px_rgba(229,9,20,0.28)]

            disabled:cursor-not-allowed
            disabled:opacity-60
            disabled:hover:translate-y-0
          "
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span
                className="
                  size-4 animate-spin
                  rounded-full
                  border-2
                  border-white/30
                  border-t-white
                "
              />
              Sending code...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Send verification code
              <ArrowRight className="size-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Back to Login */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="
              font-bold
              text-[#e50914]
              transition-colors
              hover:text-[#c90812]
            "
          >
            Back to login
          </Link>
        </p>
      </div>

      {/* Security Note */}
      <div
        className="
          mt-8 flex items-start gap-3
          rounded-xl
          border border-slate-200
          bg-slate-50
          p-4

          dark:border-white/10
          dark:bg-white/[0.03]
        "
      >
        <ShieldCheck
          className="
            mt-0.5 size-4
            shrink-0
            text-[#e50914]
          "
        />

        <p
          className="
            text-xs leading-5
            text-slate-500
            dark:text-slate-500
          "
        >
          For your security, never share your verification code or password with
          anyone.
        </p>
      </div>
    </div>
  );
}
