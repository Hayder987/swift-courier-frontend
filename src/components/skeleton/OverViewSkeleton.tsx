import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const overviewSkeletons = [
  "overview-users",
  "overview-customers",
  "overview-couriers",
  "overview-shipments",
];

const revenueSkeletons = [
  "revenue-total",
  "revenue-period",
  "revenue-today",
  "revenue-pending",
];

const chartSkeletons = ["shipment-trend", "revenue-trend"];

const distributionSkeletons = [
  "shipment-status",
  "payment-status",
  "payment-method",
];

const distributionRowSkeletons = [
  "distribution-row-one",
  "distribution-row-two",
];

const courierSkeletons = ["courier-availability", "courier-performance"];

const courierRowSkeletons = [
  "courier-row-one",
  "courier-row-two",
  "courier-row-three",
];

const activitySkeletons = [
  "activity-one",
  "activity-two",
  "activity-three",
  "activity-four",
  "activity-five",
  "activity-six",
];

const OverViewSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-85 max-w-full" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="size-10" />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewSkeletons.map((skeleton) => (
          <Card key={skeleton}>
            <CardContent className="p-5">
              <div className="flex justify-between gap-4">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-28" />
                  <Skeleton className="h-3 w-32" />
                </div>

                <Skeleton className="size-11 rounded-xl" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {revenueSkeletons.map((skeleton) => (
          <Card key={skeleton}>
            <CardContent className="p-5">
              <div className="flex justify-between gap-4">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-3 w-36" />
                </div>

                <Skeleton className="size-11 rounded-xl" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 xl:grid-cols-2">
        {chartSkeletons.map((skeleton) => (
          <Card key={skeleton}>
            <CardHeader className="space-y-3">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3 w-64" />
            </CardHeader>

            <CardContent>
              <Skeleton className="h-80 w-full rounded-xl" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Distribution */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {distributionSkeletons.map((skeleton) => (
          <Card key={skeleton}>
            <CardHeader className="space-y-3">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3 w-52" />
            </CardHeader>

            <CardContent className="space-y-3">
              <Skeleton className="h-52 w-full rounded-xl" />

              {distributionRowSkeletons.map((rowSkeleton) => (
                <Skeleton
                  key={`${skeleton}-${rowSkeleton}`}
                  className="h-12 w-full rounded-xl"
                />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Courier */}
      <div className="grid gap-4 lg:grid-cols-2">
        {courierSkeletons.map((skeleton) => (
          <Card key={skeleton}>
            <CardHeader className="space-y-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3 w-64" />
            </CardHeader>

            <CardContent className="space-y-3">
              {courierRowSkeletons.map((rowSkeleton) => (
                <Skeleton
                  key={`${skeleton}-${rowSkeleton}`}
                  className="h-18 w-full rounded-xl"
                />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="space-y-3">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3 w-72" />
        </CardHeader>

        <CardContent className="space-y-2">
          {activitySkeletons.map((skeleton) => (
            <div key={skeleton} className="flex gap-3 rounded-xl p-3 sm:p-4">
              <Skeleton className="size-9 shrink-0 rounded-full" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OverViewSkeleton;
