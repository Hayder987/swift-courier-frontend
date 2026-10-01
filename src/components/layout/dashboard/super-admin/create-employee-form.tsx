"use client";

import { useForm } from "@tanstack/react-form";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CarFront,
  Eye,
  EyeOff,
  IdCard,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  User,
  UserRoundCog,
} from "lucide-react";
import { useState } from "react";
import type { z } from "zod";
import ProcessSpinner from "@/components/loading/process-spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useCreateEmployee } from "@/hooks";
import { createEmployeeZodSchema } from "@/validation";
import { useRouter } from "next/navigation";

type CreateEmployeeFormValues = z.input<typeof createEmployeeZodSchema>;

const CreateEmployeeForm = () => {
  const { mutate: createEmployee, isPending } = useCreateEmployee();
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);

  const defaultValues: CreateEmployeeFormValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "COURIER",

    permanentAddress: "",
    permanentCity: "",

    vehicleLicenseNumber: "",
    qualifications: "",

    basicSalary: "",
    houseAllowance: "",
    medicalAllowance: "",
    transportAllowance: "",
    perDeliveryAmount: "",
  };

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: createEmployeeZodSchema,
    },

    onSubmit: async ({ value }) => {
      const employeeData = {
        ...value,

        basicSalary: Number(value.basicSalary),
        houseAllowance: Number(value.houseAllowance),
        medicalAllowance: Number(value.medicalAllowance),
        transportAllowance: Number(value.transportAllowance),
        perDeliveryAmount: Number(value.perDeliveryAmount),
      };

      createEmployee(employeeData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Server Failure",
              description:
                res.message || "Something went wrong. Please try again.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Employee Created",
            description: "The employee account has been created successfully.",
            type: "success",
          });

          form.reset();
          router.push("/super-admin-dashboard/employees")
        },

        onError: (err) => {
          toast.add({
            title: "Employee Creation Failed",
            description:
              err.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="max-w-380 mx-auto">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          form.handleSubmit();
        }}
        className="w-full"
      >
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-xl dark:bg-card/60">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#e50914]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#e50914]/5 blur-3xl" />

          {/* Header */}
          <div className="relative border-b border-border/60 px-5 py-5 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914] ring-1 ring-[#e50914]/20">
                <UserRoundCog className="size-6" />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                  Create Employee
                </h2>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Create a new SwiftCourier employee or courier account.
                </p>
              </div>
            </div>
          </div>

          <div className="relative p-5 sm:p-6 lg:p-8">
            <FieldGroup className="gap-8">
              {/* =====================================================
                  BASIC INFORMATION
              ====================================================== */}
              <section>
                <SectionHeader
                  icon={<User className="size-4" />}
                  title="Basic Information"
                  description="Enter the employee's personal and account details."
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Full Name */}
                  <form.Field name="name">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Full Name"
                        placeholder="Hayder Ali"
                        icon={<User className="size-4" />}
                        autoComplete="name"
                        required
                      />
                    )}
                  </form.Field>

                  {/* Email */}
                  <form.Field name="email">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Email Address"
                        placeholder="employee@example.com"
                        type="email"
                        icon={<Mail className="size-4" />}
                        autoComplete="email"
                        required
                      />
                    )}
                  </form.Field>

                  {/* Phone */}
                  <form.Field name="phone">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Phone Number"
                        placeholder="+8801711111111"
                        type="tel"
                        icon={<Phone className="size-4" />}
                        autoComplete="tel"
                        required
                      />
                    )}
                  </form.Field>

                  {/* Password */}
                  <form.Field name="password">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Password
                            <span className="ml-1 text-[#e50914]">*</span>
                          </FieldLabel>

                          <div className="relative">
                            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                              id={field.name}
                              name={field.name}
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="h-11 pl-10 pr-11"
                              value={field.state.value}
                              onChange={(event) =>
                                field.handleChange(event.target.value)
                              }
                              onBlur={field.handleBlur}
                              autoComplete="new-password"
                              aria-invalid={isInvalid}
                            />

                            <button
                              type="button"
                              onClick={() =>
                                setShowPassword((previous) => !previous)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                            >
                              {showPassword ? (
                                <EyeOff className="size-4" />
                              ) : (
                                <Eye className="size-4" />
                              )}
                            </button>
                          </div>

                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>

                  {/* Role */}
                  <form.Field name="role">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Employee Role
                            <span className="ml-1 text-[#e50914]">*</span>
                          </FieldLabel>

                          <div className="relative">
                            <UserRoundCog className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />

                            <select
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onChange={(event) =>
                                field.handleChange(
                                  event.target.value as "ADMIN" | "COURIER",
                                )
                              }
                              onBlur={field.handleBlur}
                              className="h-11 w-full appearance-none rounded-lg border border-input bg-background px-10 text-sm outline-none transition-all focus:border-[#e50914] focus:ring-2 focus:ring-[#e50914]/20"
                              aria-invalid={isInvalid}
                            >
                              <option value="COURIER">Courier</option>

                              <option value="ADMIN">Admin</option>
                            </select>
                          </div>

                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>
                </div>
              </section>

              {/* =====================================================
                  ADDRESS INFORMATION
              ====================================================== */}
              <section>
                <SectionHeader
                  icon={<MapPin className="size-4" />}
                  title="Address Information"
                  description="Provide the employee's permanent address."
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Permanent Address */}
                  <form.Field name="permanentAddress">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Permanent Address"
                        placeholder="Pabna Sadar, Pabna"
                        icon={<MapPin className="size-4" />}
                        required
                      />
                    )}
                  </form.Field>

                  {/* Permanent City */}
                  <form.Field name="permanentCity">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Permanent City"
                        placeholder="Pabna"
                        icon={<MapPin className="size-4" />}
                        required
                      />
                    )}
                  </form.Field>
                </div>
              </section>

              {/* =====================================================
                  PROFESSIONAL INFORMATION
              ====================================================== */}
              <section>
                <SectionHeader
                  icon={<BriefcaseBusiness className="size-4" />}
                  title="Professional Information"
                  description="Add employee qualifications and vehicle information."
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Qualifications */}
                  <form.Field name="qualifications">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Qualifications"
                        placeholder="BSc"
                        icon={<IdCard className="size-4" />}
                      />
                    )}
                  </form.Field>

                  {/* Vehicle License */}
                  <form.Field name="vehicleLicenseNumber">
                    {(field) => (
                      <TextField
                        field={field}
                        label="Vehicle License Number"
                        placeholder="TRX-5836d9df2dx5"
                        icon={<CarFront className="size-4" />}
                      />
                    )}
                  </form.Field>
                </div>
              </section>

              {/* =====================================================
                  SALARY INFORMATION
              ====================================================== */}
              <section>
                <SectionHeader
                  icon={<BadgeDollarSign className="size-4" />}
                  title="Salary & Compensation"
                  description="Configure the employee's salary and delivery compensation."
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Basic Salary */}
                  <form.Field name="basicSalary">
                    {(field) => (
                      <NumberField
                        field={field}
                        label="Basic Salary"
                        placeholder="15000"
                      />
                    )}
                  </form.Field>

                  {/* House Allowance */}
                  <form.Field name="houseAllowance">
                    {(field) => (
                      <NumberField
                        field={field}
                        label="House Allowance"
                        placeholder="5000"
                      />
                    )}
                  </form.Field>

                  {/* Medical Allowance */}
                  <form.Field name="medicalAllowance">
                    {(field) => (
                      <NumberField
                        field={field}
                        label="Medical Allowance"
                        placeholder="2000"
                      />
                    )}
                  </form.Field>

                  {/* Transport Allowance */}
                  <form.Field name="transportAllowance">
                    {(field) => (
                      <NumberField
                        field={field}
                        label="Transport Allowance"
                        placeholder="4000"
                      />
                    )}
                  </form.Field>

                  {/* Per Delivery */}
                  <form.Field name="perDeliveryAmount">
                    {(field) => (
                      <NumberField
                        field={field}
                        label="Per Delivery Amount"
                        placeholder="0"
                      />
                    )}
                  </form.Field>
                </div>
              </section>

              {/* =====================================================
                  INFORMATION BOX
              ====================================================== */}
              <div className="rounded-xl border border-[#e50914]/15 bg-[#e50914]/5 p-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#e50914]/10 text-[#e50914]">
                    <BriefcaseBusiness className="size-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">Employee Account</p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      The employee will receive access according to the selected
                      role. Make sure the provided account, address and
                      compensation information is correct before creating the
                      account.
                    </p>
                  </div>
                </div>
              </div>

              {/* =====================================================
                  ACTIONS
              ====================================================== */}
              <div className="flex flex-col-reverse gap-3 border-t border-border/60 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => form.reset()}
                  disabled={isPending}
                  className="h-11 rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#e50914] px-6 text-sm font-semibold text-white shadow-lg shadow-[#e50914]/20 transition-all hover:bg-[#c90812] hover:shadow-[#e50914]/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? (
                    <>
                      <ProcessSpinner />
                      Creating Employee...
                    </>
                  ) : (
                    <>
                      <UserRoundCog className="size-4" />
                      Create Employee
                    </>
                  )}
                </button>
              </div>
            </FieldGroup>
          </div>
        </div>
      </form>
    </div>
  );
};

/* =========================================================
   TEXT FIELD
========================================================= */

type TextFieldProps = {
  field: any;
  label: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
  required?: boolean;
};

const TextField = ({
  field,
  label,
  placeholder,
  type = "text",
  icon,
  autoComplete,
  required = false,
}: TextFieldProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>
        {label}

        {required && <span className="ml-1 text-[#e50914]">*</span>}
      </FieldLabel>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}

        <Input
          id={field.name}
          name={field.name}
          type={type}
          placeholder={placeholder}
          className={icon ? "h-11 pl-10" : "h-11"}
          value={field.state.value ?? ""}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
          autoComplete={autoComplete}
          aria-invalid={isInvalid}
        />
      </div>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

/* =========================================================
   NUMBER FIELD
========================================================= */

type NumberFieldProps = {
  field: any;
  label: string;
  placeholder?: string;
};

const NumberField = ({ field, label, placeholder }: NumberFieldProps) => {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

      <div className="relative">
        <BadgeDollarSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          id={field.name}
          name={field.name}
          type="number"
          min={0}
          placeholder={placeholder}
          className="h-11 pl-10"
          value={field.state.value ?? 0}
          onChange={(event) => {
            const value = event.target.value;

            field.handleChange(value === "" ? 0 : Number(value));
          }}
          onBlur={field.handleBlur}
          aria-invalid={isInvalid}
        />
      </div>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
};

/* =========================================================
   SECTION HEADER
========================================================= */

type SectionHeaderProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const SectionHeader = ({ icon, title, description }: SectionHeaderProps) => {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#e50914]/10 text-[#e50914] ring-1 ring-[#e50914]/10">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title}</h3>

        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CreateEmployeeForm;
