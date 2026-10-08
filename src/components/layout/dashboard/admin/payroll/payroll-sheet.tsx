"use client";

import {
  Banknote,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  CreditCard,
  Mail,
  PackageCheck,
  Phone,
  ReceiptText,
  TrendingUp,
  UserRound,
} from "lucide-react";
import NoDataFound from "@/components/common/NoDataFound";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { IPayroll } from "@/types/payroll.type";
import {
  formatPayrollDate,
  formatPayrollMoney,
  formatPayrollMonth,
  getPayrollInitials,
  payrollStatusClassName,
} from "@/utils/DashBoard/payroll.utils";

interface PayrollDetailsSheetProps {
  payroll: IPayroll | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SalaryRowProps {
  label: string;
  value: string;
  emphasized?: boolean;
}

const SalaryRow = ({ label, value, emphasized = false }: SalaryRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span
        className={cn(
          "text-xs",
          emphasized
            ? "font-semibold text-foreground"
            : "text-muted-foreground",
        )}
      >
        {label}
      </span>

      <span
        className={cn(
          "whitespace-nowrap text-sm font-semibold",
          emphasized && "text-[#e50914]",
        )}
      >
        {value}
      </span>
    </div>
  );
};

const PayrollDetailsSheet = ({
  payroll,
  open,
  onOpenChange,
}: PayrollDetailsSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto border-border/60 p-0 sm:max-w-xl">
        <SheetHeader className="border-b border-border/50 bg-muted/20 px-6 py-6">
          {payroll ? (
            <>
              <div className="flex items-start gap-3">
                <Avatar className="size-12 rounded-xl border border-border/60">
                  <AvatarImage
                    src={payroll.employee.imageUrl ?? undefined}
                    alt={payroll.employee.user.name}
                  />

                  <AvatarFallback className="rounded-xl bg-[#e50914]/10 font-bold text-[#e50914]">
                    {getPayrollInitials(payroll.employee.user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <SheetTitle className="text-lg font-bold">
                      {payroll.employee.user.name}
                    </SheetTitle>

                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-semibold",
                        payrollStatusClassName(payroll.status),
                      )}
                    >
                      {payroll.status}
                    </Badge>
                  </div>

                  <SheetDescription className="mt-1">
                    {payroll.employee.employeeCode} ·{" "}
                    {formatPayrollMonth(payroll.month, payroll.year)}
                  </SheetDescription>
                </div>
              </div>
            </>
          ) : (
            <>
              <SheetTitle>Payroll Details</SheetTitle>

              <SheetDescription>
                Payroll details are unavailable.
              </SheetDescription>
            </>
          )}
        </SheetHeader>

        {!payroll ? (
          <div className="px-6 py-12">
            <NoDataFound />
          </div>
        ) : (
          <div className="space-y-5 px-6 py-6">
            {/* Net Salary */}
            <div className="relative overflow-hidden rounded-2xl border border-[#e50914]/15 bg-[#e50914]/5 p-5">
              <div className="pointer-events-none absolute -right-10 -bottom-10 size-32 rounded-full bg-[#e50914]/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#e50914]">
                  <CircleDollarSign className="size-4" />
                  Net Salary
                </div>

                <p className="mt-2 text-3xl font-black tracking-tight">
                  {formatPayrollMoney(payroll.netSalary)}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Payroll for {formatPayrollMonth(payroll.month, payroll.year)}
                </p>
              </div>
            </div>

            {/* Employee */}
            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <UserRound className="size-4" />
                </div>

                <h3 className="text-sm font-bold">Employee Information</h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                    Employee Code
                  </p>

                  <p className="mt-1 font-mono text-sm font-semibold">
                    {payroll.employee.employeeCode}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                    Join Date
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {formatPayrollDate(payroll.employee.joinAt)}
                  </p>
                </div>

                <div className="flex min-w-0 items-center gap-2">
                  <Mail className="size-3.5 shrink-0 text-muted-foreground" />

                  <span className="truncate text-xs text-muted-foreground">
                    {payroll.employee.user.email}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 shrink-0 text-muted-foreground" />

                  <span className="text-xs text-muted-foreground">
                    {payroll.employee.user.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Salary Breakdown */}
            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                  <ReceiptText className="size-4" />
                </div>

                <h3 className="text-sm font-bold">Salary Breakdown</h3>
              </div>

              <div className="divide-y divide-border/50">
                <SalaryRow
                  label="Basic Salary"
                  value={formatPayrollMoney(payroll.basicSalary)}
                />

                <SalaryRow
                  label="Total Allowance"
                  value={formatPayrollMoney(payroll.totalAllowance)}
                />

                <SalaryRow
                  label="Delivery Earning"
                  value={formatPayrollMoney(payroll.deliveryEarning)}
                />

                <SalaryRow
                  label="Bonus"
                  value={formatPayrollMoney(payroll.bonus)}
                />

                <SalaryRow
                  label="Gross Salary"
                  value={formatPayrollMoney(payroll.grossSalary)}
                  emphasized
                />

                <SalaryRow
                  label="Total Deduction"
                  value={`- ${formatPayrollMoney(payroll.totalDeduction)}`}
                />

                <SalaryRow
                  label="Net Salary"
                  value={formatPayrollMoney(payroll.netSalary)}
                  emphasized
                />
              </div>
            </div>

            {/* Delivery Statistics */}
            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                  <TrendingUp className="size-4" />
                </div>

                <h3 className="text-sm font-bold">Delivery Performance</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
                  <PackageCheck className="size-4 text-muted-foreground" />

                  <p className="mt-2 text-xl font-black">
                    {payroll.totalDeliveries}
                  </p>

                  <p className="text-[11px] text-muted-foreground">
                    Total Deliveries
                  </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-muted/30 p-3">
                  <CheckCircle2 className="size-4 text-emerald-500" />

                  <p className="mt-2 text-xl font-black">
                    {payroll.successfulDeliveries}
                  </p>

                  <p className="text-[11px] text-muted-foreground">
                    Successful
                  </p>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Banknote className="size-4" />
                </div>

                <h3 className="text-sm font-bold">Payment Information</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">Status</span>

                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full text-[10px] font-semibold",
                      payrollStatusClassName(payroll.status),
                    )}
                  >
                    {payroll.status}
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    Payment Reference
                  </span>

                  <span className="max-w-55 text-right font-mono text-xs font-semibold break-all">
                    {payroll.paymentReference ?? "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">Paid At</span>

                  <span className="text-right text-xs font-medium">
                    {formatPayrollDate(payroll.paidAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Created */}
            <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/20 px-3.5 py-3">
              <CalendarDays className="size-3.5 text-muted-foreground" />

              <span className="text-[11px] text-muted-foreground">
                Payroll created {formatPayrollDate(payroll.createdAt)}
              </span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default PayrollDetailsSheet;
