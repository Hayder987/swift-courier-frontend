import {
  AlertTriangle,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ISingleEmployee } from "@/types";
import {
  formatDate,
  formatStatus,
  getInitials,
  getStatusClass,
} from "@/utils/DashBoard/applicant.courier.utils";
import CourierDocumentCard from "./courier-document-card";

interface DetailItemProps {
  icon: typeof UserRound;
  label: string;
  value: string;
}

const DetailItem = ({ icon: Icon, label, value }: DetailItemProps) => {
  return (
    <div className="group flex min-w-0 items-start gap-3 rounded-2xl border border-border/60 bg-muted/20 p-3.5 transition-colors hover:bg-muted/40">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-background text-muted-foreground shadow-sm">
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>

        <p className="mt-1.5 wrap-break-word text-sm font-medium leading-5">
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
};

interface StatusBadgeProps {
  value: string;
}

const StatusBadge = ({ value }: StatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClass(
        value,
      )}`}
    >
      {formatStatus(value)}
    </Badge>
  );
};

/* -------------------------------------------------------------------------- */
/* Employee details                                                           */
/* -------------------------------------------------------------------------- */

export const EmployeeDetailsContent = ({
  employee,
}: {
  employee: ISingleEmployee;
}) => {
  const user = employee.user;
  const courier = employee.courier;

  if (!courier) {
    return (
      <div className="px-4 pb-28 pt-5 sm:px-6">
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-500" />

            <div>
              <p className="text-sm font-semibold">
                Courier information unavailable
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                This employee record does not currently contain courier
                application information.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 pb-28 pt-5 sm:px-6">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-[#e50914]/10 via-background to-background p-5 shadow-sm">
        <div className="absolute -right-20 -top-20 size-44 rounded-full bg-[#e50914]/10 blur-3xl" />

        <div className="absolute -bottom-24 -left-16 size-36 rounded-full bg-[#e50914]/5 blur-3xl" />

        <div className="relative flex items-start gap-4">
          <Avatar className="size-16 shrink-0 rounded-2xl border border-border/70 shadow-md sm:size-18">
            <AvatarImage src={employee.imageUrl ?? undefined} alt={user.name} />

            <AvatarFallback className="rounded-2xl bg-[#e50914]/10 text-base font-bold text-[#e50914]">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-bold sm:text-lg">
                {user.name}
              </h2>

              <StatusBadge value={courier.applicationStatus} />
            </div>

            <p className="mt-1 truncate text-sm text-muted-foreground">
              {user.email}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span>
                Employee ID{" "}
                <span className="font-semibold text-foreground">
                  {employee.employeeCode ?? "Not assigned"}
                </span>
              </span>

              <span className="hidden sm:inline">•</span>

              <span>Applied {formatDate(courier.createdAt)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Application overview                                               */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e50914]/10 text-[#e50914]">
            <ShieldCheck className="size-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">Application Overview</h3>

            <p className="text-xs text-muted-foreground">
              Current application and employment state
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailItem
            icon={ShieldCheck}
            label="Application Status"
            value={formatStatus(courier.applicationStatus)}
          />

          <DetailItem
            icon={BadgeCheck}
            label="Availability"
            value={formatStatus(courier.courierAvailability)}
          />

          <DetailItem
            icon={Building2}
            label="Employment Status"
            value={formatStatus(employee.employmentStatus)}
          />

          <DetailItem
            icon={ShieldCheck}
            label="Account Status"
            value={formatStatus(user.status)}
          />
        </div>
      </section>

      <Separator />

      {/* ------------------------------------------------------------------ */}
      {/* Personal information                                                */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e50914]/10 text-[#e50914]">
            <UserRound className="size-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">Personal Information</h3>

            <p className="text-xs text-muted-foreground">
              Applicant contact and address
            </p>
          </div>
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

      <Separator />

      {/* ------------------------------------------------------------------ */}
      {/* Courier information                                                 */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#e50914]/10 text-[#e50914]">
            <Building2 className="size-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold">Courier Information</h3>

            <p className="text-xs text-muted-foreground">
              Vehicle and courier application details
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DetailItem
            icon={UserRound}
            label="Courier Name"
            value={courier.name}
          />

          <DetailItem icon={Mail} label="Courier Email" value={courier.email} />

          <DetailItem
            icon={ShieldCheck}
            label="License Number"
            value={courier.vehicleLicenseNumber}
          />

          <DetailItem
            icon={FileText}
            label="Qualification"
            value={courier.qualifications}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Zone                                                                */}
      {/* ------------------------------------------------------------------ */}

      {courier.zone && (
        <>
          <Separator />

          <section>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#e50914]/10 text-[#e50914]">
                <MapPin className="size-4" />
              </div>

              <div>
                <h3 className="text-sm font-semibold">Assigned Zone</h3>

                <p className="text-xs text-muted-foreground">
                  Courier operating area
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold">{courier.zone.name}</span>

                <Badge variant="outline" className="rounded-full text-[10px]">
                  Zone
                </Badge>
              </div>

              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {courier.zone.address}
              </p>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl border border-border/50 bg-background/70 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Latitude
                  </p>

                  <p className="mt-1 text-xs font-semibold">
                    {courier.zone.latitude}
                  </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-background/70 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Longitude
                  </p>

                  <p className="mt-1 text-xs font-semibold">
                    {courier.zone.longitude}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Separator />

      {/* ------------------------------------------------------------------ */}
      {/* Verification                                                        */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <div className="mb-3 flex items-center gap-2">
          {user.isEmailVerified ? (
            <CheckCircle2 className="size-4 text-emerald-500" />
          ) : (
            <XCircle className="size-4 text-red-500" />
          )}

          <h3 className="text-sm font-semibold">Account Verification</h3>
        </div>

        <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Email verification</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Applicant email verification status
              </p>
            </div>

            <StatusBadge value={user.isEmailVerified ? "ACTIVE" : "DELETED"} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Resume                                                              */}
      {/* ------------------------------------------------------------------ */}

      {courier.resume && (
        <>
          <Separator />

          <section>
            <div className="mb-3 flex items-center gap-2">
              <FileText className="size-4 text-[#e50914]" />

              <div>
                <h3 className="text-sm font-semibold">Resume</h3>

                <p className="text-xs text-muted-foreground">
                  Applicant CV / resume
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
              <iframe
                src={courier.resume}
                title="Courier resume"
                className="h-80 w-full border-0 bg-background"
              />
            </div>

            <Button variant="outline" size="sm" className="mt-3 rounded-xl">
              <a
                href={courier.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Resume
              </a>
            </Button>
          </section>
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Vehicle documents                                                   */}
      {/* ------------------------------------------------------------------ */}

      {courier.vehicleDocuments && courier.vehicleDocuments.length > 0 && (
        <>
          <Separator />

          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-[#e50914]" />

                <div>
                  <h3 className="text-sm font-semibold">Vehicle Documents</h3>

                  <p className="text-xs text-muted-foreground">
                    Submitted vehicle verification documents
                  </p>
                </div>
              </div>

              <Badge variant="outline" className="rounded-full text-[10px]">
                {courier.vehicleDocuments.length} files
              </Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {courier.vehicleDocuments.map((document, index) => (
                <CourierDocumentCard
                  key={document.publicId}
                  document={document}
                  index={index}
                  label="Vehicle Document"
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* National ID                                                         */}
      {/* ------------------------------------------------------------------ */}

      {courier.nationalIdPic && courier.nationalIdPic.length > 0 && (
        <>
          <Separator />

          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#e50914]" />

                <div>
                  <h3 className="text-sm font-semibold">National ID</h3>

                  <p className="text-xs text-muted-foreground">
                    Identity verification documents
                  </p>
                </div>
              </div>

              <Badge variant="outline" className="rounded-full text-[10px]">
                {courier.nationalIdPic.length} files
              </Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {courier.nationalIdPic.map((document, index) => (
                <CourierDocumentCard
                  key={document.publicId}
                  document={document}
                  index={index}
                  label="National ID"
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Timeline                                                            */}
      {/* ------------------------------------------------------------------ */}

      <Separator />

      <section>
        <div className="mb-3 flex items-center gap-2">
          <CalendarDays className="size-4 text-[#e50914]" />

          <h3 className="text-sm font-semibold">Application Timeline</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1.5 size-2 shrink-0 rounded-full bg-[#e50914]" />

            <div>
              <p className="text-xs font-semibold">Application submitted</p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {formatDate(courier.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1.5 size-2 shrink-0 rounded-full bg-muted-foreground/40" />

            <div>
              <p className="text-xs font-semibold">Last updated</p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {formatDate(courier.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
