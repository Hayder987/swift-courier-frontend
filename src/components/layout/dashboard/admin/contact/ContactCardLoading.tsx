import { Skeleton } from "@/components/ui/skeleton";

const ContactCardLoading = () => {
  return (
    <div className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
      <Skeleton className="absolute inset-x-0 top-0 h-1 rounded-none" />

      {/* Header */}
      <div className="mb-4 flex items-start gap-3">
        <Skeleton className="size-11 shrink-0 rounded-xl" />

        <div className="flex-1 space-y-2 pt-1">
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-3 w-2/5" />
        </div>

        <Skeleton className="h-6 w-16 shrink-0 rounded-full" />
      </div>

      {/* Email */}
      <Skeleton className="mb-4 h-12 w-full rounded-xl" />

      {/* Description */}
      <div className="flex-1 space-y-3 rounded-xl border border-border/50 p-3.5">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Dates */}
      <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3.5 w-2/3" />
      </div>

      {/* Button */}
      <div className="mt-4 border-t border-border/60 pt-4">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
};

export default ContactCardLoading;
