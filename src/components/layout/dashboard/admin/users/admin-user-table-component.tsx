"use client";

import {
  Eye,
  Mail,
  MoreHorizontal,
  Pencil,
  Phone,
  ShieldAlert,
  Trash2,
} from "lucide-react";

import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { cn } from "@/lib/utils";

import type {
  IAdminUser,
  UserRole,
  UserStatus,
} from "@/types/admin.employee.types";
import AdminUserDeleteDialog from "./admin-user-delete-dialog";
import AdminUserDetailsSheet from "./admin-user-sheet";
import AdminUserStatusUpdateDialog from "./admin-user-update-dialog";

interface AdminUserTableComponentsProps {
  user: IAdminUser;
  loginUserRole: UserRole | undefined;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const formatLabel = (value: string) => {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const statusClassName = (status: UserStatus) => {
  switch (status) {
    case "ACTIVE":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600";

    case "SUSPENDED":
      return "border-amber-500/20 bg-amber-500/10 text-amber-600";

    case "DELETED":
      return "border-destructive/20 bg-destructive/10 text-destructive";

    default:
      return "";
  }
};

const roleClassName = (role: UserRole) => {
  if (role === "SUPER_ADMIN") {
    return "border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]";
  }

  if (role === "ADMIN") {
    return "border-purple-500/20 bg-purple-500/10 text-purple-600";
  }

  if (role === "COURIER") {
    return "border-blue-500/20 bg-blue-500/10 text-blue-600";
  }

  return "border-cyan-500/20 bg-cyan-500/10 text-cyan-600";
};

const AdminUserTableComponents = ({
  user,
  loginUserRole,
}: AdminUserTableComponentsProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const isDeleted = user.status === "DELETED";

  const canUpdateStatus = loginUserRole === "ADMIN" && !isDeleted;

  const canDelete =
    (loginUserRole === "SUPER_ADMIN" ||
      (loginUserRole === "ADMIN" &&
        user.role !== "ADMIN" &&
        user.role !== "SUPER_ADMIN")) &&
    !isDeleted;

  const canManage = canUpdateStatus || canDelete;

  const handlePermissionDenied = (message = "You have no permission.") => {
    toast.add({
      title: "Permission denied",
      description: message,
      type: "error",
    });
  };

  return (
    <>
      {/* User */}
      <TableCell className="min-w-65">
        <div className="flex items-center gap-3">
          <Avatar className="size-11 shrink-0 rounded-xl border border-border/60">
            <AvatarFallback className="rounded-xl bg-[#e50914]/10 font-semibold text-[#e50914]">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold">{user.name}</p>

              {user.isEmailVerified && (
                <span
                  className="size-1.5 rounded-full bg-emerald-500"
                  title="Email verified"
                />
              )}
            </div>

            <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
              <Mail className="size-3 shrink-0" />
              {user.email}
            </p>

            <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
              <Phone className="size-3 shrink-0" />
              {user.phone ?? "No phone"}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Role */}
      <TableCell>
        <Badge
          variant="outline"
          className={cn(
            "whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold",
            roleClassName(user.role),
          )}
        >
          {formatLabel(user.role)}
        </Badge>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge
          variant="outline"
          className={cn(
            "whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold",
            statusClassName(user.status),
          )}
        >
          {formatLabel(user.status)}
        </Badge>
      </TableCell>

      {/* Auth */}
      <TableCell className="hidden md:table-cell">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium">
            {formatLabel(user.authMethod)}
          </span>

          <span className="text-[10px] text-muted-foreground">
            {user.isEmployee ? "Employee" : "Non-employee"}
          </span>
        </div>
      </TableCell>

      {/* Created */}
      <TableCell className="hidden lg:table-cell">
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {new Intl.DateTimeFormat("en-BD", {
            dateStyle: "medium",
          }).format(new Date(user.createdAt))}
        </span>
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-8 rounded-lg border-border/60"
                aria-label={`Actions for ${user.name}`}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            }
          >
            <span />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 rounded-xl">
            {/* Details */}
            <DropdownMenuItem
              onClick={() => setDetailsOpen(true)}
              className="gap-2 rounded-lg"
            >
              <Eye className="size-4" />
              View Details
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Status Update */}
            <DropdownMenuItem
              disabled={!canUpdateStatus}
              onClick={() => {
                if (!canUpdateStatus) {
                  handlePermissionDenied(
                    isDeleted
                      ? "Deleted users cannot be activated or suspended."
                      : "Only ADMIN can activate or suspend users.",
                  );

                  return;
                }

                setUpdateOpen(true);
              }}
              className="gap-2 rounded-lg"
              title={
                !canUpdateStatus
                  ? isDeleted
                    ? "Deleted users cannot be updated"
                    : "Only ADMIN can update user status"
                  : undefined
              }
            >
              <Pencil className="size-4" />

              {isDeleted
                ? "Status Locked — Deleted"
                : canUpdateStatus
                  ? "Update Status"
                  : "Only ADMIN Can Update"}
            </DropdownMenuItem>

            {/* Delete */}
            <DropdownMenuItem
              disabled={!canDelete}
              onClick={() => {
                if (!canDelete) {
                  handlePermissionDenied(
                    isDeleted
                      ? "This user is already deleted."
                      : "You have no permission to delete this user.",
                  );

                  return;
                }

                setDeleteOpen(true);
              }}
              className="gap-2 rounded-lg text-destructive focus:text-destructive"
              title={
                !canDelete
                  ? isDeleted
                    ? "Already deleted"
                    : "You have no permission"
                  : undefined
              }
            >
              <Trash2 className="size-4" />

              {isDeleted
                ? "Already Deleted"
                : canDelete
                  ? "Soft Delete"
                  : "No Delete Permission"}
            </DropdownMenuItem>

            {!canManage && (
              <>
                <DropdownMenuSeparator />

                <div className="flex items-start gap-2 px-2.5 py-2 text-[10px] leading-4 text-muted-foreground">
                  <ShieldAlert className="mt-0.5 size-3.5 shrink-0 text-amber-500" />

                  <span>
                    You have no permission to manage this user's account.
                  </span>
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      {/* Details */}
      <AdminUserDetailsSheet
        userId={user.id}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      {/* Delete */}
      <AdminUserDeleteDialog
        user={user}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />

      {/* Update */}
      <AdminUserStatusUpdateDialog
        user={user}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
      />
    </>
  );
};

export default AdminUserTableComponents;
