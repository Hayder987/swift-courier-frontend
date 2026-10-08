export type ShipmentStatus =
  | "CREATED"
  | "READY_FOR_PAYMENT"
  | "PENDING"
  | "ASSIGNED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "DELIVERY_FAILED"
  | "RETURNED"
  | "CANCELLED";

export type PaymentStatus = "PAID" | "PENDING" | "FAILED" | "CANCELLED";

export type PaymentMethod = "CARD";

export type CourierAvailability = "AVAILABLE" | "BUSY" | "TERMINATED";

export type AuditAction = "CREATED" | "UPDATE" | "DELETE" | "APPROVE";

export type AuditResource =
  | "SHIPMENT"
  | "USER"
  | "CUSTOMER"
  | "EMPLOYEE"
  | "COURIER";

export type DashboardUserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "COURIER"
  | "CUSTOMER";

export interface IDashboardOverview {
  totalUsers: number;
  totalCustomers: number;
  totalCouriers: number;
  totalShipments: number;
}

export interface IShipmentStatusDistribution {
  status: ShipmentStatus;
  count: number;
}

export interface IShipmentTrend {
  date: string;
  created: number;
  delivered: number;
  cancelled: number;
  failed: number;
}

export interface IRevenueOverview {
  totalRevenue: number;
  periodRevenue: number;
  todayRevenue: number;
  pendingPayment: number;
  failedPayment: number;
  cancelledPayment: number;
}

export interface IRevenueTrend {
  date: string;
  revenue: number;
}

export interface IPaymentStatusDistribution {
  status: PaymentStatus;
  count: number;
  amount: number;
}

export interface IPaymentMethodDistribution {
  method: PaymentMethod;
  count: number;
  amount: number;
}

export interface ICourierAvailability {
  availability: CourierAvailability;
  count: number;
}

export interface ICourierPerformance {
  courierId: string;
  name: string;
  email: string;
  totalShipments: number;
  deliveredShipments: number;
  failedShipments: number;
  earnings: number;
}

export interface IDashboardAuditUser {
  id: string;
  name: string;
  email: string;
  role: DashboardUserRole;
}

export interface IRecentAuditActivity {
  id: string;
  action: AuditAction;
  resource: AuditResource;
  description: string;
  createdAt: string;
  user: IDashboardAuditUser;
}

export interface IDashboardData {
  overview: IDashboardOverview;
  shipmentStatusDistribution: IShipmentStatusDistribution[];
  shipmentTrend: IShipmentTrend[];
  revenueOverview: IRevenueOverview;
  revenueTrend: IRevenueTrend[];
  paymentStatusDistribution: IPaymentStatusDistribution[];
  paymentMethodDistribution: IPaymentMethodDistribution[];
  courierAvailability: ICourierAvailability[];
  courierPerformance: ICourierPerformance[];
  recentAuditActivity: IRecentAuditActivity[];
}

export type DashboardPeriod = "7d" | "30d" | "90d" | "1y";

export interface IDashboardQuery {
  period: DashboardPeriod;
}
