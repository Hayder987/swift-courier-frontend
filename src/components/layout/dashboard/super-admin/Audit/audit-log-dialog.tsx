"use client";

import {
  Activity,
  CalendarDays,
  FileText,
  Hash,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import type { IAuditLog } from "@/types/super.admin.type";

interface AuditLogDialogProps {
  auditLog: IAuditLog;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatDate = (date: string | null) => {
  if (!date) return "Not available";

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const DetailItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/20 p-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 wrap-break-word text-sm font-medium">
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
};

const AuditLogDialog = ({
  auditLog,
  open,
  onOpenChange,
}: AuditLogDialogProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l border-border/60 p-0 sm:max-w-xl"
      >
        <SheetHeader className="border-b border-border/60 px-4 py-5 sm:px-6">
          <SheetTitle>Audit Log Details</SheetTitle>

          <SheetDescription>
            Complete information about this system activity.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 py-6 sm:px-6">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-[#e50914]/10 via-background to-background p-5">
            <div className="absolute -right-16 -top-16 size-36 rounded-full bg-[#e50914]/10 blur-3xl" />

            <div className="relative flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#e50914]/10 text-[#e50914]">
                <Activity className="size-6" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold">
                  {auditLog.description || "System Activity"}
                </h3>

                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="rounded-full border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]"
                  >
                    {auditLog.action.replaceAll("_", " ")}
                  </Badge>

                  <Badge variant="outline" className="rounded-full">
                    {auditLog.resource.replaceAll("_", " ")}
                  </Badge>

                  <Badge variant="outline" className="rounded-full">
                    {auditLog.type}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Activity */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <FileText className="size-4 text-[#e50914]" />
              <h4 className="text-sm font-semibold">Activity Information</h4>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={Activity}
                label="Action"
                value={auditLog.action.replaceAll("_", " ")}
              />

              <DetailItem
                icon={FileText}
                label="Resource"
                value={auditLog.resource.replaceAll("_", " ")}
              />

              <DetailItem
                icon={Hash}
                label="Resource ID"
                value={auditLog.resourceId ?? "Not available"}
              />

              <DetailItem
                icon={CalendarDays}
                label="Created At"
                value={formatDate(auditLog.createdAt)}
              />
            </div>
          </section>

          <Separator />

          {/* User */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <UserRound className="size-4 text-[#e50914]" />
              <h4 className="text-sm font-semibold">Performed By</h4>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={UserRound}
                label="Name"
                value={auditLog.user.name}
              />

              <DetailItem
                icon={UserRound}
                label="Role"
                value={auditLog.user.role.replaceAll("_", " ")}
              />

              <DetailItem
                icon={FileText}
                label="Email"
                value={auditLog.user.email}
              />

              <DetailItem
                icon={Hash}
                label="User ID"
                value={auditLog.user.id}
              />
            </div>
          </section>

          <Separator />

          {/* Metadata */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <FileText className="size-4 text-[#e50914]" />
              <h4 className="text-sm font-semibold">Metadata</h4>
            </div>

            {auditLog.metadata && Object.keys(auditLog.metadata).length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-border/50 bg-muted/20">
                <pre className="max-h-80 overflow-auto p-4 text-xs leading-6 text-muted-foreground">
                  {JSON.stringify(auditLog.metadata, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-5 text-center text-xs text-muted-foreground">
                No metadata available for this log.
              </div>
            )}
          </section>

          {auditLog.onboardingOldTime && (
            <>
              <Separator />

              <DetailItem
                icon={CalendarDays}
                label="Previous Record Time"
                value={formatDate(auditLog.onboardingOldTime)}
              />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AuditLogDialog;
