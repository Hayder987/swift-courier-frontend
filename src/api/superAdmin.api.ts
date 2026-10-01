import apiClient from "@/lib/apiClient";
import type { ICreateEmployeeUserPayload } from "@/validation";

export function createEmployee(payload: ICreateEmployeeUserPayload) {
  return apiClient("/super/admin/create-employee", {
    method: "POST",
    body: payload,
  });
}
