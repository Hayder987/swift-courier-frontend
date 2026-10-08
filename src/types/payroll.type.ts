export interface ICreatePayrollPayload {
  month: number;
  year: number;
  bonus: number;
  totalDeduction: number;
}

export interface IPayrollQueryParams {
  page?: number;
  limit?: number;
  month?: number;
  year?: number;
}

// payroll response
export type PayrollStatus = "PENDING" | "PAID" | "CANCELLED";

export interface IPayroll {
  id: string;
  employeeId: string;
  month: number;
  year: number;

  basicSalary: string;
  totalAllowance: string;
  deliveryEarning: string;
  bonus: string;
  grossSalary: string;
  totalDeduction: string;
  netSalary: string;

  totalDeliveries: number;
  successfulDeliveries: number;

  status: PayrollStatus;

  paidAt: string | null;
  paymentReference: string | null;

  createdAt: string;
  updatedAt: string;

  employee: IPayrollEmployee;
}

export interface IPayrollEmployee {
  id: string;
  userId: string;
  employeeCode: string;
  imageUrl: string | null;
  joinAt: string;
  user: IPayrollEmployeeUser;
}

export interface IPayrollEmployeeUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IPaySalaries {
  paymentReference: string;
}

export interface IPayrollQueryParams {
  page?: number;
  limit?: number;

  month?: number;
  year?: number;

  status?: PayrollStatus;

  sortBy?: "createdAt" | "netSalary" | "year" | "month";
  sortOrder?: "asc" | "desc";
}
