"use client";

import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useLogin } from "@/hooks";
import { loginSchema } from "@/validation";

import { Field, FieldError, FieldGroup, FieldLabel } from "../../../ui/field";
import GoogleLoginComponent from "../../modules/GoogleLogin";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: loginPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "superadmin@swift.com",
      password: "Swift@Admin123",
    },

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: async () => {
          toast.add({
            title: "Login Success",
            description: "Welcome back",
            type: "success",
          });

          await queryClient.invalidateQueries({
            queryKey: ["user"],
          });
          router.push("/");
        },

        onError: (err) => {
          toast.add({
            title: "Authorization failure",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <div>
        <h2 className="text-base font-semibold tracking-tight">
          Sign in to your account
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Enter your credentials to continue to your dashboard.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold"
                  >
                    Email address
                  </FieldLabel>

                  <div className="relative">
                    <Mail
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground transition-colors"
                    />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="you@example.com"
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="email"
                      aria-invalid={isInvalid}
                      className="h-11 rounded-xl border-border/70 bg-background/70 pl-10 text-sm shadow-none transition-all placeholder:text-muted-foreground/50 focus-visible:border-[#e50914]/50 focus-visible:ring-4 focus-visible:ring-[#e50914]/10"
                    />
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs font-semibold"
                    >
                      Password
                    </FieldLabel>

                    <Link
                      href="/forgot-password"
                      className="text-[11px] font-medium text-[#e50914] transition-colors hover:text-[#e50914]/75"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <LockKeyhole
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground transition-colors"
                    />

                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="current-password"
                      aria-invalid={isInvalid}
                      className="h-11 rounded-xl border-border/70 bg-background/70 px-10 text-sm shadow-none transition-all placeholder:text-muted-foreground/50 focus-visible:border-[#e50914]/50 focus-visible:ring-4 focus-visible:ring-[#e50914]/10"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((previous) => !previous)}
                      className="absolute right-3 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loginPending}
            className="group relative h-11 w-full overflow-hidden rounded-xl bg-[#e50914] text-sm font-semibold text-white shadow-[0_10px_30px_rgba(229,9,20,0.18)] transition-all hover:bg-[#c90812] hover:shadow-[0_14px_36px_rgba(229,9,20,0.24)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <span className="relative flex items-center justify-center gap-2">
              {loginPending && (
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}

              {loginPending ? "Signing in..." : "Sign in"}
            </span>
          </Button>
        </FieldGroup>
      </form>

      {/* Divider */}
      <div className="relative flex items-center">
        <div className="h-px flex-1 bg-border" />

        <span className="px-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Or continue with
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Google */}
      <GoogleLoginComponent />

      {/* Register */}
      <p className="text-center text-xs text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-[#e50914] hover:decoration-[#e50914]"
        >
          Create an account
        </Link>
      </p>
      <p className="text-center text-xs text-muted-foreground">
        ForgotPassword?{" "}
        <Link
          href="/forgot-password"
          className="font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-[#e50914] hover:decoration-[#e50914]"
        >
          Reset Now
        </Link>
      </p>
    </div>
  );
}
