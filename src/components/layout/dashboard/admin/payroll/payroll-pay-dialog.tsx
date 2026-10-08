"use client";

import { useForm } from "@tanstack/react-form";
import { Banknote, CheckCircle2, CreditCard } from "lucide-react";
import type { FetchError } from "ofetch";

import ProcessSpinner from "@/components/loading/process-spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { usePaySalaries } from "@/hooks/payroll.hook";
import type { IPayroll } from "@/types/payroll.type";
import {
  formatPayrollMoney,
  formatPayrollMonth,
} from "@/utils/DashBoard/payroll.utils";
import { paySalarySchema } from "@/validation/payroll.validation";

interface PayrollPaySalariesDialogProps {
  payroll: IPayroll | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PayrollPaySalariesDialog = ({
  payroll,
  open,
  onOpenChange,
}: PayrollPaySalariesDialogProps) => {
  const { mutate: paySalary, isPending } = usePaySalaries(payroll?.id ?? "");

  const form = useForm({
    defaultValues: {
      paymentReference: "",
    },

    validators: {
      onSubmit: paySalarySchema,
    },

    onSubmit: async ({ value }) => {
      if (!payroll) {
        return;
      }

      paySalary(
        {
          paymentReference: value.paymentReference.trim(),
        },
        {
          onSuccess: (response) => {
            if (!response.success) {
              toast.add({
                title: "Payment Failed",
                description:
                  response.message ?? "Unable to mark this salary as paid.",
                type: "error",
              });

              return;
            }

            toast.add({
              title: "Salary Paid Successfully",
              description: `${payroll.employee.user.name}'s salary has been marked as paid.`,
              type: "success",
            });

            form.reset({
              paymentReference: "",
            });

            onOpenChange(false);
          },

          onError: (error: FetchError) => {
            const errorMessage =
              error.data?.message ??
              error.data?.errors?.[0]?.message ??
              error.message ??
              "Unable to process salary payment.";

            toast.add({
              title: "Payment Failed",
              description: errorMessage,
              type: "error",
            });
          },
        },
      );
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) {
      return;
    }

    if (!nextOpen) {
      form.reset({
        paymentReference: "",
      });
    }

    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden rounded-2xl border-border/60 bg-background p-0 shadow-2xl sm:max-w-md">
        <DialogHeader className="border-b border-border/50 bg-muted/20 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Banknote className="size-5" />
            </div>

            <div className="min-w-0">
              <DialogTitle className="text-lg font-bold">
                Pay salary
              </DialogTitle>

              <DialogDescription className="mt-1">
                Mark this payroll record as paid.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {payroll ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5 px-6 py-5"
            noValidate
          >
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {payroll.employee.user.name}
                  </p>

                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    {payroll.employee.employeeCode}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Net salary</p>

                  <p className="text-base font-bold">
                    {formatPayrollMoney(payroll.netSalary)}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <CreditCard className="size-3.5" />

                {formatPayrollMonth(payroll.month, payroll.year)}
              </div>
            </div>

            <form.Field name="paymentReference">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Payment Reference
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="BANK-TXN-20261008-001"
                      disabled={isPending}
                      aria-invalid={isInvalid}
                      className="h-11 rounded-xl"
                    />

                    <FieldDescription>
                      Enter the bank transaction ID, cheque number, or other
                      payment reference.
                    </FieldDescription>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/15 bg-emerald-500/5 px-3.5 py-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />

              <p className="text-xs leading-5 text-muted-foreground">
                After confirming, this payroll will be marked as
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {" "}
                  PAID
                </span>
                .
              </p>
            </div>

            <DialogFooter className="gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => handleOpenChange(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isPending}
                className="min-w-32 gap-2 rounded-xl bg-[#e50914] font-semibold text-white hover:bg-[#c70812]"
              >
                {isPending ? (
                  <>
                    <ProcessSpinner />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-4" />
                    <span>Confirm Payment</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="px-6 py-8">
            <p className="text-center text-sm text-muted-foreground">
              Payroll data is unavailable.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PayrollPaySalariesDialog;
