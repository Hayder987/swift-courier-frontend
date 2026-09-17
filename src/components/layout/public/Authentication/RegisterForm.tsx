"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useRegisterUser } from "@/hooks";
import { registerZodSchema } from "@/validation";
import { Button } from "../../../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../../ui/field";
import { Input } from "../../../ui/input";
import GoogleLoginComponent from "../../modules/GoogleLogin";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: registration, isPending } = useRegisterUser();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },

    validators: {
      onSubmit: registerZodSchema,
    },

    onSubmit: async ({ value }) => {
      const registrationData = {
        name: value.name,
        email: value.email,
        password: value.password,
        phone: value.phone,
      };

      registration(registrationData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Server Failure",
              description: "Something went wrong. Please try again",
              type: "error",
            });
          }

          toast.add({
            title: "Registration Successful",
            description: "Please verify your account",
            type: "success",
          });
          const params = new URLSearchParams({ email: registrationData.email });
          router.push(`/register/verify-account?${params.toString()}`);
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
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="mb-1 inline-flex w-fit items-center gap-2 rounded-full border border-[#e50914]/15 bg-[#e50914]/5 px-3 py-1.5">
          <span className="size-1.5 rounded-full bg-[#e50914]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e50914]">
            New account
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">
          Create your account
        </h1>

        <p className="text-sm leading-6 text-muted-foreground">
          Join SwiftCourier and manage your deliveries from one place.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* Name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full name</FieldLabel>

                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Hayder Ali"
                      className="h-11 pl-10"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="name"
                      aria-invalid={isInvalid}
                    />
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="hayderbd095@gmail.com"
                      className="h-11 pl-10"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="email"
                      aria-invalid={isInvalid}
                    />
                  </div>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Phone */}
          <form.Field name="phone">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      placeholder="+8801700000000"
                      className="h-11 pl-10"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="tel"
                      aria-invalid={isInvalid}
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
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-11 pr-11"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      autoComplete="new-password"
                      aria-invalid={isInvalid}
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
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
            disabled={isPending}
            className="h-11 w-full bg-[#e50914] font-semibold text-white shadow-[0_10px_30px_rgba(229,9,20,0.18)] transition-all duration-300 hover:bg-[#c90812] hover:shadow-[0_14px_35px_rgba(229,9,20,0.25)]"
          >
            {isPending && (
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}

            {isPending ? "Submitting..." : "Register"}
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

      {/* Login link */}
      <p className="text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-[#e50914] transition-colors hover:text-[#c90812]"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
