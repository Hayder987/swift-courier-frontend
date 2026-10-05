"use client";

import { format } from "date-fns";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { IEmployee } from "@/types";
import { getStatusClassName } from "@/utils/DashBoard/employee.utils";
import ApplicantEmployeeDetailsSheet from "./applicant-employee-detailsSheet";

interface EmployeeTableComponentProps {
  employee: IEmployee;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((item) => item[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const ApplicantEmployeeTableComponent = ({
  employee,
}: EmployeeTableComponentProps) => {
  const [detailsEmployeeId, setDetailsEmployeeId] = useState<string | null>(
    null,
  );

  return (
    <>
      <TableCell className="min-w-60">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 shrink-0 rounded-xl border border-border/60">
            <AvatarImage
              src={employee.imageUrl ?? undefined}
              alt={employee.user.name}
            />

            <AvatarFallback className="rounded-xl bg-[#e50914]/10 font-semibold text-[#e50914]">
              {getInitials(employee.user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {employee.user.name}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {employee.user.email}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell className="whitespace-nowrap">
        <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold">
          {employee.employeeCode ?? "Not assigned"}
        </span>
      </TableCell>

      <TableCell>
        <Badge
          variant="outline"
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px]",
            getStatusClassName(employee.employmentStatus),
          )}
        >
          {employee.employmentStatus.replaceAll("_", " ")}
        </Badge>
      </TableCell>

      <TableCell className="hidden lg:table-cell">
        {employee.courier?.zone ? (
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {employee.courier.zone.name}
            </span>

            <span className="text-xs text-muted-foreground">
              {employee.courier.zone.code}
            </span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">Not Courier</span>
        )}
      </TableCell>

      <TableCell className="whitespace-nowrap">
        <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-semibold">
          {format(new Date(employee.createdAt), "dd MMM yyyy, hh:mm a") ??
            "Not assigned"}
        </span>
      </TableCell>

      <TableCell className="text-right">
        <Button
          variant={"outline"}
          onClick={() => setDetailsEmployeeId(employee.id)}
          className="gap-2 rounded-lg"
        >
          <Eye className="size-4" />
          Details
        </Button>
      </TableCell>

      <ApplicantEmployeeDetailsSheet
        employeeId={detailsEmployeeId}
        open={!!detailsEmployeeId}
        onOpenChange={(open) => {
          if (!open) {
            setDetailsEmployeeId(null);
          }
        }}
      />
    </>
  );
};

export default ApplicantEmployeeTableComponent;
