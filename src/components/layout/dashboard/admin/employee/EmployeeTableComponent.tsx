"use client";

import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import type { FetchError } from "ofetch";
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
import { toast } from "@/components/ui/toast";
import { useGetMe } from "@/hooks";
import { useDeleteEmployee } from "@/hooks/admin.hook";
import { cn } from "@/lib/utils";
import type { IEmployee } from "@/types";
import {
  getRoleClassName,
  getStatusClassName,
} from "@/utils/DashBoard/employee.utils";
import DeleteEmployeeDialog from "./employee-delete-dialoge";
import EmployeeDetailsSheet from "./employee-details.sheet";

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

const EmployeeTableComponent = ({ employee }: EmployeeTableComponentProps) => {
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<string | null>(null);

  const [detailsEmployeeId, setDetailsEmployeeId] = useState<string | null>(
    null,
  );

  const { data: userData } = useGetMe();

  const loginUserRole = userData?.data?.user?.role;

  const { mutate: deleteEmployee, isPending: empDeletePending } =
    useDeleteEmployee(deleteEmployeeId);

  const employeeRole = employee.user.role;

  const canDelete =
    loginUserRole === "ADMIN"
      ? employeeRole === "COURIER"
      : loginUserRole === "SUPER_ADMIN"
        ? employeeRole === "ADMIN" || employeeRole === "COURIER"
        : false;

  const isTerminated = employee.employmentStatus === "TERMINATED";

  const showDelete = !isTerminated;

  const handleDeleteEmployee = () => {
    setDeleteEmployeeId(employee.id);
  };

  const handleConfirmDeleteEmployee = () => {
    if (!deleteEmployeeId) return;

    deleteEmployee(undefined, {
      onSuccess: () => {
        setDeleteEmployeeId(null);
        toast.add({
          title: "Deleted Successfully!",
          description: "This notification was deleted successfully.",
          type: "success",
        });
      },
      onError: (error: FetchError) => {
        const errorMessage =
          error.data?.message ??
          error.data?.errors?.[0]?.message ??
          error.message ??
          "Unable to submit your application. Please try again.";

        toast.add({
          title: "Something Went Wrong",
          description: errorMessage,
          type: "error",
        });
      },
    });
  };

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
            getRoleClassName(employeeRole),
          )}
        >
          {employeeRole.replaceAll("_", " ")}
        </Badge>
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

      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-8 rounded-lg"
                aria-label={`Actions for ${employee.user.name}`}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            }
          >
            <span />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 rounded-xl">
            <DropdownMenuItem
              onClick={() => setDetailsEmployeeId(employee.id)}
              className="gap-2 rounded-lg"
            >
              <Eye className="size-4" />
              Details
            </DropdownMenuItem>

            {showDelete && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  disabled={!canDelete || empDeletePending}
                  onClick={handleDeleteEmployee}
                  className="gap-2 rounded-lg text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                >
                  <Trash2 className="size-4" />

                  {canDelete ? "Delete Employee" : "Delete Restricted"}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      <DeleteEmployeeDialog
        open={!!deleteEmployeeId}
        onOpenChange={(open) => {
          if (!open && !empDeletePending) {
            setDeleteEmployeeId(null);
          }
        }}
        onConfirm={handleConfirmDeleteEmployee}
        isPending={empDeletePending}
      />

      <EmployeeDetailsSheet
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

export default EmployeeTableComponent;
