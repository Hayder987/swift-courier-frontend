import { BarChart3, Package, Truck, Users } from "lucide-react";

const SIDEBAR_ITEMS = [
  "dashboard",
  "shipments",
  "notifications",
  "payments",
  "tracking",
  "profile",
  "settings",
];

const MOBILE_NAV_ITEMS = ["overview", "shipments", "tracking", "profile"];

const STAT_ITEMS = ["total", "pending", "transit", "delivered"];

const CHART_BARS = [
  { id: "bar-1", height: 45 },
  { id: "bar-2", height: 70 },
  { id: "bar-3", height: 52 },
  { id: "bar-4", height: 85 },
  { id: "bar-5", height: 62 },
  { id: "bar-6", height: 78 },
  { id: "bar-7", height: 58 },
  { id: "bar-8", height: 92 },
  { id: "bar-9", height: 68 },
  { id: "bar-10", height: 80 },
  { id: "bar-11", height: 55 },
  { id: "bar-12", height: 74 },
];

const CHART_AXIS_ITEMS = [
  "axis-1",
  "axis-2",
  "axis-3",
  "axis-4",
  "axis-5",
  "axis-6",
];

const ACTIVITY_ITEMS = [
  { id: "activity-1", width: "65%" },
  { id: "activity-2", width: "75%" },
  { id: "activity-3", width: "85%" },
  { id: "activity-4", width: "65%" },
  { id: "activity-5", width: "75%" },
];

const BOTTOM_CARDS = [
  {
    id: "packages",
    icon: Package,
  },
  {
    id: "delivery",
    icon: Truck,
  },
  {
    id: "customers",
    icon: Users,
  },
];

export default function DashboardSkeleton() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-background/45 backdrop-blur-[2px] dark:bg-background/55" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] gap-4 p-3 opacity-45 sm:gap-5 sm:p-5 lg:gap-6 lg:p-6">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 rounded-2xl border border-border/50 bg-card/60 p-4 shadow-sm lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-2.5">
            <div className="size-9 animate-pulse rounded-xl bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
          </div>

          <div className="space-y-2">
            {SIDEBAR_ITEMS.map((item, itemIndex) => (
              <div
                key={item}
                className={`flex h-10 items-center gap-3 rounded-xl px-3 ${
                  itemIndex === 0 ? "bg-muted/80" : ""
                }`}
              >
                <div className="size-4 animate-pulse rounded bg-muted" />

                <div
                  className="h-3 animate-pulse rounded bg-muted"
                  style={{
                    width: `${55 + (itemIndex % 3) * 15}px`,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <div className="rounded-xl border border-border/40 bg-muted/30 p-3">
              <div className="mb-3 size-8 animate-pulse rounded-lg bg-muted" />
              <div className="mb-2 h-3 w-24 animate-pulse rounded bg-muted" />
              <div className="h-2.5 w-32 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </aside>

        {/* Main Dashboard */}
        <main className="min-w-0 flex-1">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
            <div className="space-y-2">
              <div className="h-5 w-32 animate-pulse rounded-md bg-muted sm:w-40" />
              <div className="h-3 w-44 animate-pulse rounded-md bg-muted sm:w-56" />
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden size-9 animate-pulse rounded-xl bg-muted sm:block" />
              <div className="size-9 animate-pulse rounded-full bg-muted" />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="mb-4 flex gap-2 overflow-hidden lg:hidden">
            {MOBILE_NAV_ITEMS.map((item) => (
              <div
                key={item}
                className="h-9 min-w-20 animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>

          {/* Welcome Banner */}
          <div className="mb-4 overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-4 shadow-sm sm:mb-5 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                <div className="h-6 w-48 animate-pulse rounded-md bg-muted sm:w-64" />
                <div className="h-3 w-56 animate-pulse rounded bg-muted sm:w-80" />
              </div>

              <div className="hidden size-16 animate-pulse rounded-2xl bg-muted sm:block lg:size-20" />
            </div>
          </div>

          {/* Stats */}
          <div className="mb-4 grid grid-cols-2 gap-3 sm:mb-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {STAT_ITEMS.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border/50 bg-card/60 p-4 shadow-sm sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="size-9 animate-pulse rounded-xl bg-muted" />
                  <div className="h-2.5 w-10 animate-pulse rounded bg-muted" />
                </div>

                <div className="mb-2 h-6 w-16 animate-pulse rounded-md bg-muted" />
                <div className="h-2.5 w-24 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Chart */}
            <div className="rounded-2xl border border-border/50 bg-card/60 p-4 shadow-sm sm:p-5 lg:col-span-2">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="mb-2 h-4 w-28 animate-pulse rounded bg-muted" />
                  <div className="h-2.5 w-40 animate-pulse rounded bg-muted" />
                </div>

                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <BarChart3 className="size-4 text-muted-foreground/30" />
                </div>
              </div>

              <div className="flex h-48 items-end gap-2 sm:h-56 sm:gap-3">
                {CHART_BARS.map((bar) => (
                  <div
                    key={bar.id}
                    className="flex-1 rounded-t-md bg-muted/80"
                    style={{
                      height: `${bar.height}%`,
                    }}
                  />
                ))}
              </div>

              <div className="mt-4 flex justify-between">
                {CHART_AXIS_ITEMS.map((item) => (
                  <div
                    key={item}
                    className="h-2 w-8 animate-pulse rounded bg-muted"
                  />
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="rounded-2xl border border-border/50 bg-card/60 p-4 shadow-sm sm:p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="mb-2 h-4 w-28 animate-pulse rounded bg-muted" />
                  <div className="h-2.5 w-36 animate-pulse rounded bg-muted" />
                </div>

                <div className="size-8 animate-pulse rounded-lg bg-muted" />
              </div>

              <div className="space-y-4">
                {ACTIVITY_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="size-9 shrink-0 animate-pulse rounded-xl bg-muted" />

                    <div className="min-w-0 flex-1 space-y-2">
                      <div
                        className="h-2.5 animate-pulse rounded bg-muted"
                        style={{
                          width: item.width,
                        }}
                      />

                      <div className="h-2 w-20 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BOTTOM_CARDS.map(({ id, icon: Icon }) => (
              <div
                key={id}
                className="rounded-2xl border border-border/50 bg-card/60 p-4 shadow-sm sm:p-5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
                    <Icon className="size-4 text-muted-foreground/40" />
                  </div>

                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                </div>

                <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
