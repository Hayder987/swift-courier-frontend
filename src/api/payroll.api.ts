import apiClient from "@/lib/apiClient";
import type { IApiResponse } from "@/types/api.type";
import type {
  ICreatePayrollPayload,
  IPayroll,
  IPayrollQueryParams,
  IPaySalaries,
} from "@/types/payroll.type";

export function generatePayroll(payload: ICreatePayrollPayload) {
  return apiClient("/payroll/generate", {
    method: "POST",
    body: payload,
  });
}

// export function getAllPayrolls(params: IPayrollQueryParams) {
//   return apiClient<IApiResponse<IPayroll[]>>("payrolls", {
//     params,
//   });
// }

// export function paySalaries(
//   payload: IPaySalaries,
//   payrollId: string,
// ) {
//   return apiClient(`/payroll/${payrollId}/pay`, {
//     method: "PATCH",
//     body: payload,
//   });
// }

export function getAllPayrolls(params: IPayrollQueryParams) {
  return apiClient<IApiResponse<IPayroll[]>>("/payroll/paid", {
    params,
  });
}

export function paySalaries(payload: IPaySalaries, payrollId: string) {
  return apiClient(`/payroll/${payrollId}/pay`, {
    method: "PATCH",
    body: payload,
  });
}
