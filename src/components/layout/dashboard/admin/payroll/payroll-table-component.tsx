"use client";

import { CheckCircle2, Eye, MoreHorizontal, WalletCards } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { IPayroll } from "@/types/payroll.type";
import {
  formatPayrollMoney,
  formatPayrollMonth,
  getPayrollInitials,
  payrollStatusClassName,
} from "@/utils/DashBoard/payroll.utils";
import PayrollPaySalariesDialog from "./payroll-pay-dialog";
import PayrollDetailsSheet from "./payroll-sheet";

interface PayrollTableComponentProps {
  payroll: IPayroll;
}

const PayrollTableComponent = ({ payroll }: PayrollTableComponentProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [payOpen, setPayOpen] = useState(false);

  return (
    <>
      {/* Employee */}
      <TableCell className="min-w-60">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 shrink-0 rounded-xl border border-border/60">
            <AvatarImage
              src={payroll.employee.imageUrl ?? undefined}
              alt={payroll.employee.user.name}
            />

            <AvatarFallback className="rounded-xl bg-[#e50914]/10 font-bold text-[#e50914]">
              {getPayrollInitials(payroll.employee.user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {payroll.employee.user.name}
            </p>

            <p className="truncate font-mono text-[11px] text-muted-foreground">
              {payroll.employee.employeeCode}
            </p>

            <p className="truncate text-[11px] text-muted-foreground">
              {payroll.employee.user.phone}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Period */}
      <TableCell className="min-w-35">
        <div>
          <p className="text-sm font-semibold">
            {formatPayrollMonth(payroll.month, payroll.year)}
          </p>

          <p className="mt-0.5 text-[10px] text-muted-foreground">
            Payroll Period
          </p>
        </div>
      </TableCell>

      {/* Gross */}
      <TableCell className="whitespace-nowrap">
        <span className="text-sm font-semibold">
          {formatPayrollMoney(payroll.grossSalary)}
        </span>
      </TableCell>

      {/* Deduction */}
      <TableCell className="hidden whitespace-nowrap lg:table-cell">
        <span className="text-sm font-medium text-muted-foreground">
          {formatPayrollMoney(payroll.totalDeduction)}
        </span>
      </TableCell>

      {/* Net */}
      <TableCell className="whitespace-nowrap">
        <div>
          <span className="text-sm font-bold text-[#e50914]">
            {formatPayrollMoney(payroll.netSalary)}
          </span>

          <p className="mt-0.5 text-[10px] text-muted-foreground">Net salary</p>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge
          variant="outline"
          className={cn(
            "whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold",
            payrollStatusClassName(payroll.status),
          )}
        >
          {payroll.status === "PAID" ? (
            <CheckCircle2 className="mr-1 size-3" />
          ) : null}

          {payroll.status}
        </Badge>
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1.5">
          {/* Details */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setDetailsOpen(true)}
            className="size-8 rounded-lg"
            aria-label={`View ${payroll.employee.user.name} payroll details`}
          >
            <Eye className="size-4" />
          </Button>

          {/* Pay */}
          {payroll.status === "PENDING" ? (
            <Button
              type="button"
              size="icon"
              onClick={() => setPayOpen(true)}
              className="size-8 rounded-lg bg-[#e50914] text-white hover:bg-[#c70812]"
              aria-label={`Pay ${payroll.employee.user.name} salary`}
            >
              <WalletCards className="size-4" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled
              className="size-8 rounded-lg"
              aria-label="Salary already paid"
              title="Salary already paid"
            >
              <CheckCircle2 className="size-4 text-emerald-500" />
            </Button>
          )}

          {/* More */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8 rounded-lg"
                  aria-label="Payroll actions"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              }
            />

            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuItem
                onClick={() => setDetailsOpen(true)}
                className="gap-2 rounded-lg"
              >
                <Eye className="size-4" />
                View Details
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                disabled={payroll.status === "PAID"}
                onClick={() => setPayOpen(true)}
                className="gap-2 rounded-lg"
              >
                {payroll.status === "PAID" ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    Already Paid
                  </>
                ) : (
                  <>
                    <WalletCards className="size-4" />
                    Pay Salary
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>

      <PayrollDetailsSheet
        payroll={payroll}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <PayrollPaySalariesDialog
        payroll={payroll}
        open={payOpen}
        onOpenChange={setPayOpen}
      />
    </>
  );
};

export default PayrollTableComponent;
