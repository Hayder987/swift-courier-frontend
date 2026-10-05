import apiClient from "@/lib/apiClient";
import type {
  ApplyCourierPayload,
  IEmployee,
  IQueryParamsCourierApplicant,
} from "@/types";
import type { IApiResponse } from "@/types/api.type";
import type { IApprovedCourierPayload } from "@/validation";

// apply courier
export function applyCourier(payload: ApplyCourierPayload) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(payload.data));

  formData.append("resume", payload.resume);

  for (const file of payload.vehicleDocuments) {
    formData.append("vehicleDocuments", file);
  }

  for (const file of payload.nationalIdPic) {
    formData.append("nationalIdPic", file);
  }

  return apiClient("/employee/be-courier", {
    method: "POST",
    body: formData,
  });
}

export function getCourierApplications(params: IQueryParamsCourierApplicant) {
  return apiClient<IApiResponse<IEmployee[]>>("/employee/jobs", {
    params,
  });
}

export function ApprovedEmployeeStatus(
  payload: IApprovedCourierPayload,
  employeeId: string,
) {
  return apiClient(`/employee/jobs/${employeeId}`, {
    method: "PATCH",
    body: payload,
  });
}
