"use client";

import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import {
  ArrowUpRight,
  BadgeDollarSign,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Coins,
  ReceiptText,
} from "lucide-react";
import type { FetchError } from "ofetch";
import { useState } from "react";

import GlobalProgressBar from "@/components/loading/global-progress-bar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/toast";
import { useGeneratePayroll } from "@/hooks/payroll.hook";
import { createPayrollSchema } from "@/validation/payroll.validation";

const defaultPayrollDate = new Date();

const defaultValues = {
  month: defaultPayrollDate.getMonth() + 1,
  year: defaultPayrollDate.getFullYear(),
  bonus: 0,
  totalDeduction: 0,
};

const GeneratePayrollForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(defaultPayrollDate);

  const { mutate: generatePayroll, isPending, isError } = useGeneratePayroll();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: createPayrollSchema,
    },

    onSubmit: async ({ value }) => {
      const payrollData = {
        month: value.month,
        year: value.year,
        bonus: value.bonus,
        totalDeduction: value.totalDeduction,
      };

      console.log("Payroll Data:", payrollData);

      generatePayroll(payrollData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Payroll Generation Failed",
              description:
                res.message || "Unable to generate payroll. Please try again.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Payroll Generated Successfully",
            description: `Payroll for ${format(
              selectedDate,
              "MMMM yyyy",
            )} has been generated successfully.`,
            type: "success",
          });

          const resetDate = new Date();

          setSelectedDate(resetDate);

          form.reset({
            month: resetDate.getMonth() + 1,
            year: resetDate.getFullYear(),
            bonus: 0,
            totalDeduction: 0,
          });
        },

        onError: (error: FetchError) => {
          const errorMessage =
            error.data?.message ??
            error.data?.errors?.[0]?.message ??
            error.message ??
            "Unable to generate payroll. Please try again.";

          toast.add({
            title: "Something Went Wrong",
            description: errorMessage,
            type: "error",
          });
        },
      });
    },
  });

  const handleMonthChange = (date: Date) => {
    setSelectedDate(date);

    form.setFieldValue("month", date.getMonth() + 1);
    form.setFieldValue("year", date.getFullYear());
  };

  return (
    <Card className="relative overflow-hidden border-slate-200 bg-white/90 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/8 dark:bg-slate-950/80 dark:shadow-black/30">
      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-[#e50914]" />

      {/* Decorative Glows */}
      <div className="pointer-events-none absolute -top-32 -right-24 size-64 rounded-full bg-[#e50914]/6 blur-3xl dark:bg-[#e50914]/10" />

      <div className="pointer-events-none absolute -bottom-32 -left-24 size-64 rounded-full bg-[#e50914]/4 blur-3xl dark:bg-[#e50914]/8" />

      {/* Header */}
      <CardHeader className="relative px-6 pt-8 pb-5 sm:px-8 sm:pt-9">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914]">
            <BadgeDollarSign className="size-5" />
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-3 py-1.5 text-[9px] font-bold tracking-wide text-emerald-500 uppercase">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Payroll Management
          </div>
        </div>

        <h2 className="text-2xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-3xl">
          Generate employee payroll
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Generate payroll for a selected month with applicable bonuses and
          deductions.
        </p>
      </CardHeader>

      <CardContent className="relative px-6 pb-8 sm:px-8 sm:pb-9">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
          noValidate
        >
          {/* ============================================================
              PAYROLL PERIOD
          ============================================================ */}

          <form.Field name="month">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="payroll-period">
                    Payroll Period
                  </FieldLabel>

                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          id="payroll-period"
                          type="button"
                          variant="outline"
                          className="h-12 w-full justify-start border-slate-200 bg-slate-50/80 px-3.5 font-normal text-slate-900 transition-all hover:bg-slate-100 hover:text-slate-900 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white dark:hover:bg-white/6 dark:hover:text-white"
                          aria-invalid={isInvalid}
                        >
                          <CalendarDays className="mr-2.5 size-4 shrink-0 text-slate-400" />

                          <span>{format(selectedDate, "MMMM yyyy")}</span>

                          <ArrowUpRight className="ml-auto size-4 rotate-90 text-slate-400" />
                        </Button>
                      }
                    />

                    <PopoverContent
                      className="w-auto overflow-hidden rounded-2xl border-slate-200 bg-white p-0 shadow-2xl dark:border-white/10 dark:bg-slate-950"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        month={selectedDate}
                        onMonthChange={handleMonthChange}
                        captionLayout="dropdown"
                        defaultMonth={selectedDate}
                        className="p-3"
                      />
                    </PopoverContent>
                  </Popover>

                  <FieldDescription>
                    Select the month and year for payroll generation.
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* ============================================================
              BONUS
          ============================================================ */}

          <form.Field name="bonus">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Bonus</FieldLabel>

                  <div className="relative">
                    <Coins className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={0}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        const value = event.target.value;

                        field.handleChange(value === "" ? 0 : Number(value));
                      }}
                      placeholder="500"
                      aria-invalid={isInvalid}
                      className="h-12 border-slate-200 bg-slate-50/80 pr-16 pl-10 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white"
                    />

                    <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-xs font-semibold text-slate-400">
                      BDT
                    </span>
                  </div>

                  <FieldDescription>
                    Add any additional bonus amount for this payroll period.
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* ============================================================
              TOTAL DEDUCTION
          ============================================================ */}

          <form.Field name="totalDeduction">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Total Deduction</FieldLabel>

                  <div className="relative">
                    <ReceiptText className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={0}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        const value = event.target.value;

                        field.handleChange(value === "" ? 0 : Number(value));
                      }}
                      placeholder="600"
                      aria-invalid={isInvalid}
                      className="h-12 border-slate-200 bg-slate-50/80 pr-16 pl-10 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#e50914]/40 focus:ring-[#e50914]/10 dark:border-white/8 dark:bg-white/[0.035] dark:text-white"
                    />

                    <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-xs font-semibold text-slate-400">
                      BDT
                    </span>
                  </div>

                  <FieldDescription>
                    Enter the total deduction amount for this payroll.
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* ============================================================
              PAYROLL PREVIEW
          ============================================================ */}

          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4 py-4 dark:border-white/6 dark:bg-white/2.5">
            <div className="pointer-events-none absolute -right-10 -bottom-10 size-28 rounded-full bg-[#e50914]/5 blur-2xl dark:bg-[#e50914]/10" />

            <div className="relative flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
                <CircleDollarSign className="size-4" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Payroll calculation
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-500 dark:text-slate-500">
                  Payroll will be generated for{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {format(selectedDate, "MMMM yyyy")}
                  </span>{" "}
                  using the provided bonus and deduction amounts.
                </p>
              </div>
            </div>
          </div>

          {/* ============================================================
              VALIDATION INFO
          ============================================================ */}

          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 dark:border-white/6 dark:bg-white/2.5">
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />

            <p className="text-[10px] leading-5 text-slate-500 dark:text-slate-500">
              Please verify the payroll period, bonus, and deduction amounts
              before generating payroll.
            </p>
          </div>

          {/* ============================================================
              SUBMIT
          ============================================================ */}

          {isPending ? (
            <GlobalProgressBar
              isError={isError}
              completeTitle={isError ? "UnSuccessful!!!" : "Generating Payroll"}
              completeDescription={
                isError
                  ? "Unable to generate payroll. Please try again."
                  : "Your payroll is being generated."
              }
            />
          ) : (
            <Button
              type="submit"
              disabled={isPending}
              className="group h-13 w-full rounded-xl bg-[#e50914] font-bold text-white shadow-lg shadow-[#e50914]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c70812] hover:shadow-[#e50914]/30 disabled:translate-y-0"
            >
              <BadgeDollarSign className="size-4" />
              Generate Payroll
              <ArrowUpRight className="ml-auto size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default GeneratePayrollForm;
