"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Package,
  RefreshCw,
  Truck,
  UserRound,
  UsersRound,
} from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useGetSuspenseAdminDashboardOverview } from "@/hooks/dashboard.hook";

import type { DashboardPeriod } from "@/types/dashboard.stats.type";

import {
  EmptyState,
  formatCurrency,
  formatDate,
  formatDateTime,
  getAuditIcon,
  getAuditTone,
  getInitials,
  getStatusTone,
  periodOptions,
  StatCard,
  shipmentStatusLabel,
} from "./OverviewUtils";

const OverViewComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const periodParam = searchParams.get("period");

  const period: DashboardPeriod =
    periodParam === "7d" ||
    periodParam === "30d" ||
    periodParam === "90d" ||
    periodParam === "1y"
      ? periodParam
      : "7d";

  const { data } = useGetSuspenseAdminDashboardOverview({
    period,
  });

  const dashboard = data?.data;

  const handlePeriodChange = (value: DashboardPeriod) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("period", value);

    router.push(`${pathname}?${params.toString()}`);
  };

  const shipmentTrend = dashboard.shipmentTrend.map((item) => ({
    ...item,
    date: formatDate(item.date),
  }));

  const revenueTrend = dashboard.revenueTrend.map((item) => ({
    ...item,
    date: formatDate(item.date),
  }));

  const shipmentStatusData = dashboard.shipmentStatusDistribution.map(
    (item) => ({
      name: shipmentStatusLabel[item.status],
      value: item.count,
      status: item.status,
    }),
  );

  const paymentStatusData = dashboard.paymentStatusDistribution.map((item) => ({
    name: item.status,
    value: item.count,
    amount: item.amount,
  }));

  const paymentMethodData = dashboard.paymentMethodDistribution.map((item) => ({
    name: item.method,
    value: item.count,
    amount: item.amount,
  }));

  const courierAvailabilityData = dashboard.courierAvailability.map((item) => ({
    name: item.availability,
    value: item.count,
  }));

  const hasShipmentTrend = dashboard.shipmentTrend.some(
    (item) =>
      item.created > 0 ||
      item.delivered > 0 ||
      item.cancelled > 0 ||
      item.failed > 0,
  );

  const hasRevenueTrend = dashboard.revenueTrend.some(
    (item) => item.revenue > 0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary shadow-[0_0_12px] shadow-primary/70" />

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              SwiftCourier Control Center
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Dashboard Overview
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Monitor shipments, revenue, couriers and platform activity from one
            place.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={period}
            onValueChange={(value) => {
              if (value) {
                handlePeriodChange(value as DashboardPeriod);
              }
            }}
          >
            <SelectTrigger className="w-full min-w-45 sm:w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>

            <SelectContent>
              {periodOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={() => router.refresh()}
            aria-label="Refresh dashboard"
          >
            <RefreshCw className="size-4" />
          </Button>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Users"
          value={dashboard.overview.totalUsers}
          description="Registered platform users"
          icon={<UsersRound className="size-5" />}
        />

        <StatCard
          title="Customers"
          value={dashboard.overview.totalCustomers}
          description="Active customer accounts"
          icon={<UserRound className="size-5" />}
        />

        <StatCard
          title="Couriers"
          value={dashboard.overview.totalCouriers}
          description="Courier accounts"
          icon={<Truck className="size-5" />}
        />

        <StatCard
          title="Total Shipments"
          value={dashboard.overview.totalShipments}
          description="Shipments across platform"
          icon={<Package className="size-5" />}
        />
      </section>

      {/* Revenue Overview */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(dashboard.revenueOverview.totalRevenue)}
          description="All-time collected revenue"
          icon={<CircleDollarSign className="size-5" />}
        />

        <StatCard
          title="Period Revenue"
          value={formatCurrency(dashboard.revenueOverview.periodRevenue)}
          description={`Revenue for ${period}`}
          icon={<Banknote className="size-5" />}
        />

        <StatCard
          title="Today's Revenue"
          value={formatCurrency(dashboard.revenueOverview.todayRevenue)}
          description="Collected today"
          icon={<ArrowUpRight className="size-5" />}
        />

        <StatCard
          title="Pending Payments"
          value={formatCurrency(dashboard.revenueOverview.pendingPayment)}
          description="Awaiting successful payment"
          icon={<Clock3 className="size-5" />}
        />
      </section>

      {/* Shipment + Revenue Charts */}
      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Shipment Trends</CardTitle>

                <p className="mt-1 text-xs text-muted-foreground">
                  Shipment activity over the selected period.
                </p>
              </div>

              <Package className="size-5 text-primary" />
            </div>
          </CardHeader>

          <CardContent>
            {hasShipmentTrend ? (
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={shipmentTrend}>
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                    />

                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--card))",
                      }}
                    />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="created"
                      name="Created"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2.5}
                      dot={false}
                    />

                    <Line
                      type="monotone"
                      dataKey="delivered"
                      name="Delivered"
                      stroke="hsl(142 71% 45%)"
                      strokeWidth={2.5}
                      dot={false}
                    />

                    <Line
                      type="monotone"
                      dataKey="cancelled"
                      name="Cancelled"
                      stroke="hsl(0 84% 60%)"
                      strokeWidth={2.5}
                      dot={false}
                    />

                    <Line
                      type="monotone"
                      dataKey="failed"
                      name="Failed"
                      stroke="hsl(38 92% 50%)"
                      strokeWidth={2.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState
                title="No shipment activity yet"
                description="There is no shipment activity recorded for the selected period."
              />
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Revenue Trend</CardTitle>

                <p className="mt-1 text-xs text-muted-foreground">
                  Revenue generated throughout the selected period.
                </p>
              </div>

              <CircleDollarSign className="size-5 text-primary" />
            </div>
          </CardHeader>

          <CardContent>
            {hasRevenueTrend ? (
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueTrend}>
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      fontSize={11}
                    />

                    <YAxis tickLine={false} axisLine={false} fontSize={11} />

                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--card))",
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState
                title="No revenue generated"
                description="No successful revenue transactions were recorded for the selected period."
              />
            )}
          </CardContent>
        </Card>
      </section>

      {/* Distribution */}
      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle>Shipment Status</CardTitle>

            <p className="text-xs text-muted-foreground">
              Current shipment distribution.
            </p>
          </CardHeader>

          <CardContent>
            {shipmentStatusData.length > 0 ? (
              <div className="h-65">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={shipmentStatusData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={3}
                    >
                      {shipmentStatusData.map((entry) => (
                        <Cell
                          key={entry.status}
                          fill={
                            entry.status === "DELIVERED"
                              ? "hsl(142 71% 45%)"
                              : entry.status === "CANCELLED"
                                ? "hsl(0 84% 60%)"
                                : "hsl(var(--primary))"
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip />

                    <Legend verticalAlign="bottom" height={40} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState
                title="No shipment statuses"
                description="Shipment status information will appear here once shipments are created."
              />
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>

            <p className="text-xs text-muted-foreground">
              Payment transaction distribution.
            </p>
          </CardHeader>

          <CardContent>
            {paymentStatusData.length > 0 ? (
              <div className="space-y-3">
                {paymentStatusData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-xl border bg-muted/20 p-4"
                  >
                    <div>
                      <Badge
                        variant="secondary"
                        className={getStatusTone(item.name)}
                      >
                        {item.name}
                      </Badge>

                      <p className="mt-2 text-xs text-muted-foreground">
                        {item.value} transaction
                        {item.value !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <p className="text-sm font-bold">
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No payment activity"
                description="Payment status data will appear here after payment transactions are recorded."
              />
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>

            <p className="text-xs text-muted-foreground">
              Payment methods used by customers.
            </p>
          </CardHeader>

          <CardContent>
            {paymentMethodData.length > 0 ? (
              <div className="space-y-3">
                {paymentMethodData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-xl border bg-muted/20 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <CreditCard className="size-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>

                        <p className="text-xs text-muted-foreground">
                          {item.value} transaction
                          {item.value !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-bold">
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No payment methods"
                description="Payment method statistics will appear once customers complete transactions."
              />
            )}
          </CardContent>
        </Card>
      </section>

      {/* Courier */}
      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle>Courier Availability</CardTitle>

            <p className="text-xs text-muted-foreground">
              Current courier workforce status.
            </p>
          </CardHeader>

          <CardContent>
            {courierAvailabilityData.length > 0 ? (
              <div className="space-y-3">
                {courierAvailabilityData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-xl border bg-muted/20 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Truck className="size-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>

                        <p className="text-xs text-muted-foreground">
                          Courier availability
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant="secondary"
                      className={getStatusTone(item.name)}
                    >
                      {item.value}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No courier availability data"
                description="Courier availability will appear here when courier accounts are available."
              />
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle>Courier Performance</CardTitle>

            <p className="text-xs text-muted-foreground">
              Shipment delivery performance by courier.
            </p>
          </CardHeader>

          <CardContent>
            {dashboard.courierPerformance.length > 0 ? (
              <div className="space-y-3">
                {dashboard.courierPerformance.map((courier) => (
                  <div
                    key={courier.courierId}
                    className="rounded-xl border bg-muted/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarFallback>
                            {getInitials(courier.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {courier.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {courier.email}
                          </p>
                        </div>
                      </div>

                      <Badge variant="secondary">
                        {formatCurrency(courier.earnings)}
                      </Badge>
                    </div>

                    <Separator className="my-4" />

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Shipments
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          {courier.totalShipments}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Delivered
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          <ArrowUpRight className="size-3" />

                          {courier.deliveredShipments}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Failed</p>

                        <p className="mt-1 flex items-center gap-1 text-sm font-bold text-red-600 dark:text-red-400">
                          <ArrowDownRight className="size-3" />

                          {courier.failedShipments}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No courier performance yet"
                description="Courier performance will appear after shipments are assigned and completed."
              />
            )}
          </CardContent>
        </Card>
      </section>

      {/* Recent Activity */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Recent Activity</CardTitle>

              <p className="mt-1 text-xs text-muted-foreground">
                Latest actions performed across SwiftCourier.
              </p>
            </div>

            <Activity className="size-5 text-primary" />
          </div>
        </CardHeader>

        <CardContent>
          {dashboard.recentAuditActivity.length > 0 ? (
            <div className="space-y-1">
              {dashboard.recentAuditActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-muted/50 sm:p-4"
                >
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full ${getAuditTone(
                      activity.action,
                    )}`}
                  >
                    {getAuditIcon(activity.action)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <p className="text-sm font-semibold">
                        {activity.description}
                      </p>

                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {formatDateTime(activity.createdAt)}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {activity.user.name}
                      </span>

                      <Badge variant="outline" className="text-[10px]">
                        {activity.user.role}
                      </Badge>

                      <Badge variant="secondary" className="text-[10px]">
                        {activity.resource}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No recent activity"
              description="System activity will appear here as administrators and users interact with SwiftCourier."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OverViewComponent;
