"use client";

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";

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
import { Skeleton } from "@/components/ui/skeleton";

import { useGetSingleEmployee } from "@/hooks/admin.hook";

import type { ISingleEmployee } from "@/types";

interface EmployeeDetailsSheetProps {
  employeeId: string | null;
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

const getInitials = (name?: string) => {
  if (!name) return "U";

  return name
    .split(" ")
    .map((item) => item[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const statusClassName = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "SUSPENDED":
      return "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400";

    case "TERMINATED":
    case "DELETED":
      return "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

const DetailItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/20 p-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 wrap-break-word text-sm font-medium">
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
};

const EmployeeDetailsContent = ({
  employee,
}: {
  employee: ISingleEmployee;
}) => {
  const user = employee.user;
  const courier = employee.courier;

  return (
    <div className="space-y-6 px-4 pb-6 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-[#e50914]/10 via-background to-background p-5">
        <div className="absolute -right-16 -top-16 size-36 rounded-full bg-[#e50914]/10 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <Avatar className="size-16 rounded-2xl border border-border/60 shadow-sm">
            <AvatarImage src={employee.imageUrl ?? undefined} alt={user.name} />

            <AvatarFallback className="rounded-2xl bg-[#e50914]/10 font-semibold text-[#e50914]">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-bold">{user.name}</h3>

              <Badge
                variant="outline"
                className="rounded-full border-[#e50914]/20 bg-[#e50914]/10 text-[#e50914]"
              >
                {user.role.replaceAll("_", " ")}
              </Badge>
            </div>

            <p className="mt-1 truncate text-sm text-muted-foreground">
              {user.email}
            </p>

            <p className="mt-2 text-xs font-medium text-muted-foreground">
              Employee Code:{" "}
              <span className="text-foreground">
                {employee.employeeCode || "Not assigned"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck className="size-4 text-[#e50914]" />

          <h4 className="text-sm font-semibold">Account & Employment</h4>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailItem
            icon={ShieldCheck}
            label="Employment Status"
            value={employee.employmentStatus}
          />

          <DetailItem
            icon={ShieldCheck}
            label="Account Status"
            value={user.status}
          />

          <DetailItem
            icon={CalendarDays}
            label="Joined"
            value={formatDate(employee.joinAt)}
          />

          <DetailItem
            icon={Clock3}
            label="Last Login"
            value={formatDate(user.lastLoginAt)}
          />
        </div>
      </section>

      <Separator />

      <section>
        <div className="mb-3 flex items-center gap-2">
          <UserRound className="size-4 text-[#e50914]" />

          <h4 className="text-sm font-semibold">Personal Information</h4>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailItem icon={Mail} label="Email" value={user.email} />

          <DetailItem icon={Phone} label="Phone" value={user.phone} />

          <DetailItem
            icon={MapPin}
            label="City"
            value={employee.permanentCity ?? "Not available"}
          />

          <DetailItem
            icon={MapPin}
            label="Address"
            value={employee.permanentAddress ?? "Not available"}
          />
        </div>
      </section>

      {courier && (
        <>
          <Separator />

          <section>
            <div className="mb-3 flex items-center gap-2">
              <Building2 className="size-4 text-[#e50914]" />

              <h4 className="text-sm font-semibold">Courier Information</h4>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={ShieldCheck}
                label="Application"
                value={courier.applicationStatus}
              />

              <DetailItem
                icon={ShieldCheck}
                label="Availability"
                value={courier.courierAvailability}
              />

              <DetailItem
                icon={FileText}
                label="Qualifications"
                value={courier.qualifications}
              />

              <DetailItem
                icon={Building2}
                label="Zone"
                value={courier.zone ? courier.zone.name : "Not assigned"}
              />
            </div>

            {courier.zone && (
              <div className="mt-3 rounded-xl border border-border/50 bg-muted/20 p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#e50914]" />

                  <span className="text-sm font-semibold">
                    {courier.zone.name}
                  </span>

                  <Badge variant="outline" className="ml-auto rounded-full">
                    {courier.zone.id.slice(0, 8)}
                  </Badge>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  {courier.zone.address}
                </p>
              </div>
            )}
          </section>
        </>
      )}

      <Separator />

      <section>
        <div className="mb-3 flex items-center gap-2">
          {user.isEmailVerified ? (
            <CheckCircle2 className="size-4 text-emerald-500" />
          ) : (
            <XCircle className="size-4 text-red-500" />
          )}

          <h4 className="text-sm font-semibold">Verification</h4>
        </div>

        <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground">
              Email verification
            </span>

            <Badge
              variant="outline"
              className={statusClassName(
                user.isEmailVerified ? "ACTIVE" : "DELETED",
              )}
            >
              {user.isEmailVerified ? "Verified" : "Not verified"}
            </Badge>
          </div>
        </div>
      </section>
    </div>
  );
};

const EmployeeDetailsSheet = ({
  employeeId,
  open,
  onOpenChange,
}: EmployeeDetailsSheetProps) => {
  const { data, isLoading } = useGetSingleEmployee(employeeId ?? "");

  const employee = data?.data;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l border-border/60 p-0 sm:max-w-xl"
      >
        <SheetHeader className="border-b border-border/60 px-4 py-5 sm:px-6">
          <SheetTitle>Employee Details</SheetTitle>

          <SheetDescription>
            View complete employee and courier information.
          </SheetDescription>
        </SheetHeader>

        <div className="pt-5">
          {isLoading || !employee ? (
            <div className="space-y-6 px-4 pb-6 sm:px-6">
              <div className="flex items-center gap-4">
                <Skeleton className="size-16 rounded-2xl" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-36 rounded-md" />
                  <Skeleton className="h-3 w-48 rounded-md" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "employee-status",
                  "account-status",
                  "joined-date",
                  "last-login",
                  "email",
                  "phone",
                ].map((key) => (
                  <Skeleton key={key} className="h-16 rounded-xl" />
                ))}
              </div>
            </div>
          ) : (
            <EmployeeDetailsContent employee={employee} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeDetailsSheet;
