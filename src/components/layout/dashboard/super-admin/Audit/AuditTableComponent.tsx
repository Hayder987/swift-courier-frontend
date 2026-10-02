"use client";

import { Activity, Eye, MoreHorizontal, Trash2, UserRound } from "lucide-react";
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
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { useDeleteAuditLog } from "@/hooks";
import { cn } from "@/lib/utils";
import type { IAuditLog } from "@/types/super.admin.type";
import {
  getActionClassName,
  getResourceClassName,
} from "@/utils/DashBoard/audit.utils";
import AuditDeleteDialog from "./audit-delete-dialog";
import AuditLogDialog from "./audit-log-dialog";

interface AuditTableComponentProps {
  auditLog: IAuditLog;
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((item) => item[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const AuditTableComponent = ({ auditLog }: AuditTableComponentProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { mutate: deleteAuditLog, isPending } = useDeleteAuditLog(auditLog.id);

  const handleDelete = () => {
    deleteAuditLog(undefined, {
      onSuccess: () => {
        setDeleteOpen(false);

        toast.add({
          title: "Deleted Successfully!",
          description: "The audit log was deleted successfully.",
          type: "success",
        });
      },

      onError: (error: FetchError) => {
        const errorMessage =
          error.data?.message ??
          error.data?.errors?.[0]?.message ??
          error.message ??
          "Unable to delete the audit log. Please try again.";

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
      <TableRow className="group border-border/50 transition-colors hover:bg-muted/30">
        {/* Activity */}
        <TableCell className="min-w-64">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10 text-[#e50914]">
              <Activity className="size-4" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {auditLog.description || "System activity"}
              </p>

              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {auditLog.resourceId
                  ? `Resource ID: ${auditLog.resourceId.slice(0, 8)}...`
                  : "No resource ID"}
              </p>
            </div>
          </div>
        </TableCell>

        {/* User */}
        <TableCell className="min-w-48">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-8 rounded-lg border border-border/60">
              <AvatarImage src={undefined} alt={auditLog.user.name} />

              <AvatarFallback className="rounded-lg bg-muted text-[10px] font-semibold">
                {getInitials(auditLog.user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">
                {auditLog.user.name}
              </p>

              <p className="truncate text-[11px] text-muted-foreground">
                {auditLog.user.email}
              </p>
            </div>
          </div>
        </TableCell>

        {/* Action */}
        <TableCell>
          <Badge
            variant="outline"
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] font-semibold",
              getActionClassName(auditLog.action),
            )}
          >
            {auditLog.action.replaceAll("_", " ")}
          </Badge>
        </TableCell>

        {/* Resource */}
        <TableCell>
          <Badge
            variant="outline"
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] font-semibold",
              getResourceClassName(auditLog.resource),
            )}
          >
            {auditLog.resource.replaceAll("_", " ")}
          </Badge>
        </TableCell>

        {/* Type */}
        <TableCell>
          <Badge
            variant="outline"
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px]",
              auditLog.type === "CURRENT"
                ? "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-400"
                : "border-muted bg-muted text-muted-foreground",
            )}
          >
            {auditLog.type}
          </Badge>
        </TableCell>

        {/* Date */}
        <TableCell className="hidden min-w-44 xl:table-cell">
          <div className="flex flex-col">
            <span className="text-xs font-medium">
              {formatDate(auditLog.createdAt)}
            </span>

            <span className="mt-0.5 text-[11px] text-muted-foreground">
              {auditLog.onboardingOldTime
                ? `Old: ${formatDate(auditLog.onboardingOldTime)}`
                : "Current record"}
            </span>
          </div>
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
                  className="size-8 rounded-lg"
                  aria-label={`Actions for ${auditLog.description ?? "audit log"}`}
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              }
            >
              <span />
            </DropdownMenuTrigger>

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
                onClick={() => setDeleteOpen(true)}
                className="gap-2 rounded-lg text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
              >
                <Trash2 className="size-4" />
                Delete Log
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <AuditLogDialog
        auditLog={auditLog}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <AuditDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        isPending={isPending}
      />
    </>
  );
};

export default AuditTableComponent;
