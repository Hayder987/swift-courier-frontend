import apiClient from "@/lib/apiClient";
import type { ICreatePayrollPayload } from "@/types/payroll.type";

export function generatePayroll(payload: ICreatePayrollPayload) {
  return apiClient("/payroll/generate", {
    method: "POST",
    body: payload,
  });
}
