import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Globe2,
  Hash,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type {
  CustomerProfile,
  EmployeeProfile,
  ProfileComponentProps,
  UserRole,
} from "@/types";
import {
  formatDate,
  formatDateTime,
  getInitials,
  getRoleBadgeClass,
  getRoleLabel,
} from "@/utils/shared/user.utils";

const employeeRoles: UserRole[] = ["SUPER_ADMIN", "ADMIN", "COURIER"];

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="group flex min-w-0 items-start gap-3 rounded-2xl border border-border/50 bg-background/50 p-3.5 transition-all duration-300 hover:border-[#e50914]/20 hover:bg-[#e50914]/5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/70 transition-colors duration-300 group-hover:bg-[#e50914]/10">
        <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-[#e50914]" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status, label }: { status: string; label?: string }) {
  const active = status === "ACTIVE";

  return (
    <Badge
      variant="outline"
      className={
        active
          ? "gap-1.5 border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "gap-1.5 border-border bg-muted text-muted-foreground"
      }
    >
      <span
        className={`size-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-muted-foreground"
        }`}
      />

      {label ?? status}
    </Badge>
  );
}

export default function ProfileComponent({ user }: ProfileComponentProps) {
  const { user: account, profile } = user;

  const [imageError, setImageError] = useState(false);

  const isEmployee = employeeRoles.includes(account.role);

  const imageUrl =
    typeof profile.imageUrl === "string" && profile.imageUrl.trim().length > 0
      ? profile.imageUrl
      : null;

  const showImage = Boolean(imageUrl) && !imageError;

  const employeeProfile = isEmployee ? (profile as EmployeeProfile) : null;

  const customerProfile = !isEmployee ? (profile as CustomerProfile) : null;

  const initials = getInitials(account.name);

  return (
    <div className="relative overflow-hidden">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 size-80 rounded-full bg-[#e50914]/10 blur-3xl dark:bg-[#e50914]/15 " />

        <div className=" absolute -right-32 top-20 size-96 rounded-full bg-[#e50914]/5 blur-3xl " />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#e50914_1px,transparent_1px),linear-gradient(to_bottom,#e50914_1px,transparent_1px)][background-size:32px_32px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* =========================================================
            PAGE HEADER
        ========================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-[#e50914]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e50914]">
                Account Center
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Manage your SwiftCourier account information and view your profile
              details.
            </p>
          </div>

          <StatusBadge status={account.status} label="Account Active" />
        </div>

        {/* =========================================================
            HERO PROFILE CARD
        ========================================================== */}

        <Card className="relative overflow-hidden rounded-3xl border-border/60 bg-background/75 shadow-sm backdrop-blur-xl">
          {/* Top red line */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-[#e50914] to-transparent" />

          {/* Ambient glow */}
          <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-[#e50914]/10 blur-3xl" />

          <CardContent className="relative p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* User identity */}
              <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-linear-to-br from-[#e50914]/50 via-transparent to-[#e50914]/20 blur-sm" />

                  <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-2 border-background bg-muted shadow-xl sm:size-24">
                    {showImage ? (
                      <Image
                        src={imageUrl!}
                        alt={`${account.name} profile`}
                        fill
                        sizes="96px"
                        className="object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <span className="text-xl font-bold tracking-tight text-[#e50914] sm:text-2xl">
                        {initials}
                      </span>
                    )}
                  </div>

                  {/* Online indicator */}
                  <span className="absolute bottom-1 right-1 flex size-5 items-center justify-center rounded-full border-2 border-background bg-emerald-500">
                    <span className="size-1.5 rounded-full bg-white" />
                  </span>
                </div>

                {/* Identity */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-xl font-bold tracking-tight sm:text-2xl">
                      {account.name}
                    </h2>

                    {account.isEmailVerified && (
                      <span title="Email verified" className="shrink-0">
                        <BadgeCheck className="size-5 text-[#e50914]" />
                      </span>
                    )}
                  </div>

                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {account.email}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`rounded-full ${getRoleBadgeClass(account.role)}`}
                    >
                      {getRoleLabel(account.role)}
                    </Badge>

                    {account.isEmailVerified && (
                      <Badge
                        variant="outline"
                        className="rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      >
                        <CheckCircle2 className="mr-1 size-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Account meta */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-90">
                <div className="rounded-2xl border border-border/50 bg-muted/30 p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Account
                  </p>

                  <p className="mt-1 text-sm font-semibold">{account.status}</p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-muted/30 p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Auth
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {account.authMethod === "CREDENTIALS"
                      ? "Credentials"
                      : account.authMethod}
                  </p>
                </div>

                <div className="col-span-2 rounded-2xl border border-border/50 bg-muted/30 p-3 sm:col-span-1">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Member Since
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatDate(account.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* =========================================================
            MAIN GRID
        ========================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* =======================================================
              ACCOUNT INFORMATION
          ======================================================== */}

          <Card className="rounded-3xl border-border/60 bg-background/75 shadow-sm backdrop-blur-xl">
            <CardHeader className="p-5 pb-3 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-[#e50914]/10">
                      <UserRound className="size-4 text-[#e50914]" />
                    </span>
                    Account Information
                  </CardTitle>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Your primary SwiftCourier account details.
                  </p>
                </div>

                <ShieldCheck className="size-5 text-[#e50914]/70" />
              </div>
            </CardHeader>

            <CardContent className="grid gap-3 p-5 pt-2 sm:grid-cols-2 sm:p-6 sm:pt-3">
              <InfoItem
                icon={Mail}
                label="Email Address"
                value={account.email}
              />

              <InfoItem
                icon={Phone}
                label="Phone Number"
                value={account.phone || "Not provided"}
              />

              <InfoItem
                icon={UserRound}
                label="Account Role"
                value={getRoleLabel(account.role)}
              />

              <InfoItem
                icon={ShieldCheck}
                label="Account Status"
                value={account.status}
              />

              <InfoItem
                icon={Clock3}
                label="Last Login"
                value={formatDateTime(account.lastLoginAt)}
              />

              <InfoItem
                icon={CalendarDays}
                label="Created At"
                value={formatDate(account.createdAt)}
              />
            </CardContent>
          </Card>

          {/* =======================================================
              PROFILE DETAILS
          ======================================================== */}

          <Card className="rounded-3xl border-border/60 bg-background/75 shadow-sm backdrop-blur-xl">
            <CardHeader className="p-5 pb-3 sm:p-6 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="flex size-8 items-center justify-center rounded-xl bg-[#e50914]/10">
                  {isEmployee ? (
                    <BriefcaseBusiness className="size-4 text-[#e50914]" />
                  ) : (
                    <Globe2 className="size-4 text-[#e50914]" />
                  )}
                </span>

                {isEmployee ? "Employee Profile" : "Customer Profile"}
              </CardTitle>

              <p className="mt-1 text-xs text-muted-foreground">
                {isEmployee
                  ? "Employment and organizational information."
                  : "Customer account preferences and location."}
              </p>
            </CardHeader>

            <CardContent className="space-y-3 p-5 pt-2 sm:p-6 sm:pt-3">
              {isEmployee && employeeProfile ? (
                <>
                  <InfoItem
                    icon={Hash}
                    label="Employee Code"
                    value={employeeProfile.employeeCode}
                  />

                  <InfoItem
                    icon={Building2}
                    label="Employment Status"
                    value={employeeProfile.employmentStatus}
                  />

                  <InfoItem
                    icon={CalendarDays}
                    label="Joined"
                    value={formatDate(employeeProfile.joinAt)}
                  />

                  <InfoItem
                    icon={MapPin}
                    label="Permanent City"
                    value={employeeProfile.permanentCity || "Not provided"}
                  />
                </>
              ) : customerProfile ? (
                <>
                  <InfoItem
                    icon={Globe2}
                    label="Timezone"
                    value={customerProfile.timezone || "Not provided"}
                  />

                  <InfoItem
                    icon={Globe2}
                    label="Country"
                    value={customerProfile.country || "Not provided"}
                  />

                  <InfoItem
                    icon={CalendarDays}
                    label="Member Since"
                    value={formatDate(customerProfile.createdAt)}
                  />

                  <InfoItem
                    icon={Clock3}
                    label="Profile Updated"
                    value={formatDate(customerProfile.updatedAt)}
                  />
                </>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* =========================================================
            ROLE SPECIFIC DETAILS
        ========================================================== */}

        <Card className="mt-6 overflow-hidden rounded-3xl border-[#e50914]/10 bg-[#e50914]/2.5 shadow-sm">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e50914]/10">
                  <ShieldCheck className="size-5 text-[#e50914]" />
                </div>

                <div>
                  <p className="text-sm font-semibold">Account Security</p>

                  <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">
                    Your account is currently active and your verified
                    information is securely associated with SwiftCourier.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                className="rounded-xl border-[#e50914]/20 bg-background/60 hover:border-[#e50914]/40 hover:bg-[#e50914]/5 hover:text-[#e50914]"
              >
                Security Settings
                <ExternalLink className="ml-2 size-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* =========================================================
            FOOTER META
        ========================================================== */}

        <div className="mt-5 flex flex-col gap-2 px-1 text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>SwiftCourier • Secure Logistics Platform</span>

          <span className="font-mono">ID: {account.id.slice(0, 8)}...</span>
        </div>
      </div>
    </div>
  );
}
