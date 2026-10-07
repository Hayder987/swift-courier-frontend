"use client";

import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Globe2,
  Image as ImageIcon,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGetSingleUser } from "@/hooks/admin.hook";
import type {
  IAdminCustomerProfile,
  IAdminEmployeeProfile,
  IAdminSingleUser,
} from "@/types/admin.employee.types";

interface AdminUserDetailsSheetProps {
  userId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatDate = (value: string | null) => {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const formatLabel = (value: string) => {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const isEmployeeProfile = (
  profile: IAdminEmployeeProfile | IAdminCustomerProfile,
): profile is IAdminEmployeeProfile => {
  return "employeeCode" in profile;
};

const AdminUserDetailsSkeleton = () => {
  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div className="rounded-2xl border border-border/60 bg-card/80 p-5">
        <div className="flex items-center gap-4">
          <div className="size-24 animate-pulse rounded-3xl bg-muted sm:size-28" />

          <div className="flex-1 space-y-3">
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            <div className="h-3 w-52 animate-pulse rounded bg-muted" />

            <div className="flex gap-2">
              <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
              <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </div>

      {[1, 2, 3].map((section) => (
        <div
          key={section}
          className="overflow-hidden rounded-2xl border border-border/60 bg-card/70"
        >
          <div className="border-b border-border/50 px-4 py-3">
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          </div>

          <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const AdminUserDetailsSheet = ({
  userId,
  open,
  onOpenChange,
}: AdminUserDetailsSheetProps) => {
  const { data, isLoading, isError } = useGetSingleUser(userId ?? "", open);

  const userData: IAdminSingleUser | null = data?.data ?? null;

  const user = userData?.user;
  const profile = userData?.profile;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l border-border/60 bg-background/95 p-0 backdrop-blur-xl sm:max-w-2xl"
      >
        <SheetHeader className="border-b border-border/50 px-5 py-5 sm:px-6">
          <SheetTitle className="text-left text-lg">User Details</SheetTitle>

          <SheetDescription className="text-left">
            Complete account and profile information.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <AdminUserDetailsSkeleton />
        ) : isError || !user ? (
          <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <XCircle className="size-6" />
            </div>

            <h3 className="mt-4 font-semibold">Unable to load user</h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Something went wrong while retrieving this user.
            </p>
          </div>
        ) : (
          <div className="space-y-5 p-4 sm:p-6">
            {/* Profile Hero */}
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm sm:p-6">
              <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-[#e50914]/10 blur-3xl" />

              <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                <Avatar className="size-24 shrink-0 rounded-3xl border-2 border-border/60 shadow-lg sm:size-28">
                  <AvatarImage
                    src={profile?.imageUrl ?? undefined}
                    alt={user.name}
                    className="object-cover"
                  />

                  <AvatarFallback className="rounded-3xl bg-[#e50914]/10 text-xl font-bold text-[#e50914] sm:text-2xl">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <h2 className="text-xl font-bold">{user.name}</h2>

                    <Badge
                      variant="outline"
                      className="rounded-full border-[#e50914]/20 bg-[#e50914]/5 text-[10px] text-[#e50914]"
                    >
                      {formatLabel(user.role)}
                    </Badge>
                  </div>

                  <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-muted-foreground sm:justify-start sm:text-sm">
                    <Mail className="size-3.5" />
                    {user.email}
                  </p>

                  <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
                    <StatusBadge status={user.status} />

                    <Badge
                      variant="outline"
                      className="rounded-full text-[10px]"
                    >
                      {formatLabel(user.authMethod)}
                    </Badge>

                    {user.isEmailVerified && (
                      <Badge
                        variant="outline"
                        className="gap-1 rounded-full text-[10px] text-emerald-600 dark:text-emerald-400"
                      >
                        <CheckCircle2 className="size-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <section className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-sm">
              <SectionTitle title="Account Information" />

              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                <InfoItem
                  icon={<UserRound className="size-4" />}
                  label="Full Name"
                  value={user.name}
                />

                <InfoItem
                  icon={<Mail className="size-4" />}
                  label="Email"
                  value={user.email}
                />

                <InfoItem
                  icon={<Phone className="size-4" />}
                  label="Phone"
                  value={user.phone ?? "Not provided"}
                />

                <InfoItem
                  icon={<ShieldCheck className="size-4" />}
                  label="Role"
                  value={formatLabel(user.role)}
                />

                <InfoItem
                  icon={<UserRound className="size-4" />}
                  label="Authentication"
                  value={formatLabel(user.authMethod)}
                />

                <InfoItem
                  icon={<CheckCircle2 className="size-4" />}
                  label="Email Verified"
                  value={user.isEmailVerified ? "Verified" : "Not verified"}
                />

                <InfoItem
                  icon={<CalendarDays className="size-4" />}
                  label="Created"
                  value={formatDate(user.createdAt)}
                />

                <InfoItem
                  icon={<Clock3 className="size-4" />}
                  label="Updated"
                  value={formatDate(user.updatedAt)}
                />

                <InfoItem
                  icon={<Clock3 className="size-4" />}
                  label="Last Login"
                  value={formatDate(user.lastLoginAt)}
                />
              </div>
            </section>

            {/* Employee / Customer */}
            {profile ? (
              isEmployeeProfile(profile) ? (
                <EmployeeProfileSection profile={profile} />
              ) : (
                <CustomerProfileSection profile={profile} />
              )
            ) : (
              <section className="rounded-2xl border border-dashed border-border/70 bg-muted/20 p-6 text-center">
                <UserRound className="mx-auto size-7 text-muted-foreground/60" />

                <p className="mt-2 text-sm font-medium">
                  No profile information
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  This user does not currently have a profile.
                </p>
              </section>
            )}

            {/* Account Flags */}
            <section className="rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold">Account Flags</h3>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Flag label="Email Verified" active={user.isEmailVerified} />

                <Flag label="Employee" active={user.isEmployee} />

                <Flag label="Deleted" active={user.isDeleted} />

                <Flag
                  label="Change Password"
                  active={user.mustChangePassword}
                />
              </div>
            </section>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

const EmployeeProfileSection = ({
  profile,
}: {
  profile: IAdminEmployeeProfile;
}) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-sm">
      <SectionTitle title="Employee Profile" />

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        <InfoItem
          icon={<BriefcaseBusiness className="size-4" />}
          label="Employee Code"
          value={profile.employeeCode}
        />

        <InfoItem
          icon={<ShieldCheck className="size-4" />}
          label="Employment Status"
          value={formatLabel(profile.employmentStatus)}
        />

        <InfoItem
          icon={<MapPin className="size-4" />}
          label="Permanent City"
          value={profile.permanentCity}
        />

        <InfoItem
          icon={<MapPin className="size-4" />}
          label="Permanent Address"
          value={profile.permanentAddress}
        />

        <InfoItem
          icon={<CalendarDays className="size-4" />}
          label="Join Date"
          value={formatDate(profile.joinAt)}
        />

        <InfoItem
          icon={<Clock3 className="size-4" />}
          label="Onboarding"
          value={formatDate(profile.onboardingTime)}
        />

        <InfoItem
          icon={<Clock3 className="size-4" />}
          label="Suspended At"
          value={formatDate(profile.suspendedAt)}
        />

        <InfoItem
          icon={<CalendarDays className="size-4" />}
          label="Leave Job At"
          value={formatDate(profile.leaveJobAt)}
        />

        <InfoItem
          icon={<XCircle className="size-4" />}
          label="Deleted At"
          value={formatDate(profile.deletedAt)}
        />

        <InfoItem
          icon={<CalendarDays className="size-4" />}
          label="Profile Created"
          value={formatDate(profile.createdAt)}
        />

        <InfoItem
          icon={<Clock3 className="size-4" />}
          label="Profile Updated"
          value={formatDate(profile.updatedAt)}
        />

        <InfoItem
          icon={<ImageIcon className="size-4" />}
          label="Image"
          value={
            profile.imageUrl ? "Profile image available" : "No profile image"
          }
        />

        <InfoItem
          icon={<FileText className="size-4" />}
          label="Additional Files"
          value={
            profile.additionalFiles?.length
              ? `${profile.additionalFiles.length} file(s)`
              : "No files"
          }
        />
      </div>
    </section>
  );
};

const CustomerProfileSection = ({
  profile,
}: {
  profile: IAdminCustomerProfile;
}) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-sm">
      <SectionTitle title="Customer Profile" />

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        <InfoItem
          icon={<Globe2 className="size-4" />}
          label="Country"
          value={profile.country}
        />

        <InfoItem
          icon={<Clock3 className="size-4" />}
          label="Timezone"
          value={profile.timezone}
        />

        <InfoItem
          icon={<CalendarDays className="size-4" />}
          label="Deletion Deadline"
          value={formatDate(profile.deletionDeadline)}
        />

        <InfoItem
          icon={<XCircle className="size-4" />}
          label="Deleted At"
          value={formatDate(profile.deletedAt)}
        />

        <InfoItem
          icon={<ImageIcon className="size-4" />}
          label="Image"
          value={
            profile.imageUrl ? "Profile image available" : "No profile image"
          }
        />

        <InfoItem
          icon={<CalendarDays className="size-4" />}
          label="Profile Created"
          value={formatDate(profile.createdAt)}
        />

        <InfoItem
          icon={<Clock3 className="size-4" />}
          label="Profile Updated"
          value={formatDate(profile.updatedAt)}
        />
      </div>
    </section>
  );
};

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="border-b border-border/50 px-4 py-3">
      <h3 className="text-sm font-semibold">{title}</h3>
    </div>
  );
};

const StatusBadge = ({
  status,
}: {
  status: IAdminSingleUser["user"]["status"];
}) => {
  const className =
    status === "ACTIVE"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
      : status === "SUSPENDED"
        ? "border-amber-500/20 bg-amber-500/10 text-amber-600"
        : "border-destructive/20 bg-destructive/10 text-destructive";

  return (
    <Badge
      variant="outline"
      className={`rounded-full text-[10px] ${className}`}
    >
      {formatLabel(status)}
    </Badge>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>

      <p className="mt-1 wrap-break-word text-sm font-medium">{value}</p>
    </div>
  );
};

const Flag = ({ label, active }: { label: string; active: boolean }) => {
  return (
    <div className="rounded-xl border border-border/50 bg-background/50 p-3">
      <div
        className={
          active
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-muted-foreground"
        }
      >
        {active ? (
          <CheckCircle2 className="size-4" />
        ) : (
          <XCircle className="size-4" />
        )}
      </div>

      <p className="mt-1 text-[10px] font-medium text-muted-foreground">
        {label}
      </p>
    </div>
  );
};

export default AdminUserDetailsSheet;
