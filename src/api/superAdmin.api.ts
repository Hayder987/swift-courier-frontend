import apiClient from "@/lib/apiClient";
import type { IApiResponse } from "@/types/api.type";
import type { IAuditLog, IAuditLogQueryParams } from "@/types/super.admin.type";
import type { ICreateEmployeeUserPayload } from "@/validation";

export function createEmployee(payload: ICreateEmployeeUserPayload) {
  return apiClient("/super/admin/create-employee", {
    method: "POST",
    body: payload,
  });
}

export function getAllAuditLogs(params: IAuditLogQueryParams) {
  return apiClient<IApiResponse<IAuditLog[]>>("/super/admin/logs", { params });
}

export function deleteAuditLog(auditId: string) {
  return apiClient<IApiResponse<null>>(`/super/admin/log/${auditId}`, {
    method: "DELETE",
  });
}
