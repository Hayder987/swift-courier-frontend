"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const DashBoardFormSkeleton = () => {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm backdrop-blur-xl dark:bg-card/60">
        {/* Decorative Glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#e50914]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#e50914]/5 blur-3xl" />

        {/* Header */}
        <div className="relative border-b border-border/60 px-5 py-5 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <Skeleton className="size-12 shrink-0 rounded-xl" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-5 w-40 rounded-md sm:h-6 sm:w-48" />

              <Skeleton className="h-4 w-full max-w-md rounded-md" />
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="relative p-5 sm:p-6 lg:p-8">
          <div className="space-y-8">
            {/* ================= BASIC INFORMATION ================= */}
            <SkeletonSection
              titleWidth="w-36"
              descriptionWidth="w-72"
              fields={5}
            />

            {/* ================= ADDRESS INFORMATION ================= */}
            <SkeletonSection
              titleWidth="w-40"
              descriptionWidth="w-64"
              fields={2}
            />

            {/* ================= PROFESSIONAL INFORMATION ================= */}
            <SkeletonSection
              titleWidth="w-48"
              descriptionWidth="w-80"
              fields={2}
            />

            {/* ================= SALARY INFORMATION ================= */}
            <SkeletonSection
              titleWidth="w-48"
              descriptionWidth="w-80"
              fields={5}
              salary
            />

            {/* ================= INFORMATION BOX ================= */}
            <div className="rounded-xl border border-[#e50914]/10 bg-[#e50914]/5 p-4">
              <div className="flex gap-3">
                <Skeleton className="mt-0.5 size-8 shrink-0 rounded-lg" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-3 w-full max-w-2xl rounded-md" />
                  <Skeleton className="h-3 w-4/5 max-w-xl rounded-md" />
                </div>
              </div>
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="flex flex-col-reverse gap-3 border-t border-border/60 pt-6 sm:flex-row sm:justify-end">
              <Skeleton className="h-11 w-full rounded-lg sm:w-24" />

              <Skeleton className="h-11 w-full rounded-lg sm:w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SECTION SKELETON
========================================================= */

type SkeletonSectionProps = {
  titleWidth?: string;
  descriptionWidth?: string;
  fields: number;
  salary?: boolean;
};

const SkeletonSection = ({
  titleWidth = "w-40",
  descriptionWidth = "w-64",
  fields,
  salary = false,
}: SkeletonSectionProps) => {
  return (
    <section>
      {/* Section Header */}
      <div className="mb-5 flex items-start gap-3">
        <Skeleton className="size-9 shrink-0 rounded-lg" />

        <div className="flex-1 space-y-1.5">
          <Skeleton className={cn("h-4 rounded-md", titleWidth)} />

          <Skeleton
            className={cn("h-3 max-w-full rounded-md", descriptionWidth)}
          />
        </div>
      </div>

      {/* Fields */}
      <div
        className={cn(
          "grid grid-cols-1 gap-5",
          salary ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2",
        )}
      >
        {Array.from(
          { length: fields },
          (_, fieldId) => `skeleton-field-${fieldId}`,
        ).map((fieldId) => (
          <SkeletonField key={fieldId} />
        ))}
      </div>
    </section>
  );
};

/* =========================================================
   FIELD SKELETON
========================================================= */

const SkeletonField = () => {
  return (
    <div className="space-y-2">
      {/* Label */}
      <Skeleton className="h-3.5 w-28 rounded-md" />

      {/* Input */}
      <div className="relative">
        <Skeleton className="h-11 w-full rounded-lg" />

        {/* Fake input icon */}
        <Skeleton className="absolute left-3 top-1/2 size-4 -translate-y-1/2 rounded-md opacity-70" />
      </div>
    </div>
  );
};

export default DashBoardFormSkeleton;
