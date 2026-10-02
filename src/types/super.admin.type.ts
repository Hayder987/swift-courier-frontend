import { IMeta } from "./api.type";

export type AuditAction =
  | "CREATED"
  | "UPDATE"
  | "DELETE"
  | "APPROVE"
  | "REJECT"
  | "ASSIGN"
  | "ACCEPT"
  | "PICKUP"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "DELIVERY_FAILED"
  | "CANCEL"
  | "PAYMENT"
  | "PAYROLL";

export type AuditResource =
  | "USER"
  | "EMPLOYEE"
  | "COURIER"
  | "CUSTOMER"
  | "SHIPMENT"
  | "ZONE"
  | "PAYMENT"
  | "PAYROLL"
  | "SALARY";

export type AuditType = "CURRENT" | "OLD";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "COURIER" | "CUSTOMER";

export interface IAuditLogUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface IAuditLog {
  id: string;
  userId: string;
  action: AuditAction;
  type: AuditType;
  resource: AuditResource;
  resourceId: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  onboardingOldTime: string | null;
  user: IAuditLogUser;
}

// params
export interface IAuditLogQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  type?: AuditType;
  action?: AuditAction;
  resource?: AuditResource;
  createdAt?: "today" | "thisWeek" | "thisMonth";
}
