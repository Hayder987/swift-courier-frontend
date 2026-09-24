import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationSkeleton = () => {
  return (
    <Card className="overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur-xl">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* Icon skeleton */}
          <Skeleton className="size-10 shrink-0 rounded-xl" />

          <div className="min-w-0 flex-1">
            {/* Title + button */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-44 rounded-md sm:w-56" />

                <Skeleton className="h-5 w-18 rounded-md" />
              </div>

              <Skeleton className="size-8 shrink-0 rounded-lg" />
            </div>

            {/* Message */}
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3.5 w-full rounded-md" />

              <Skeleton className="h-3.5 w-4/5 rounded-md" />
            </div>

            {/* Meta */}
            <div className="mt-4 flex flex-wrap gap-3">
              <Skeleton className="h-3 w-28 rounded-md" />

              <Skeleton className="h-3 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSkeleton;
