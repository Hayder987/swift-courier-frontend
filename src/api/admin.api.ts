import apiClient from "@/lib/apiClient";
import type {
  IEmployee,
  IGetAllEmployeesParams,
  ISingleEmployee,
} from "@/types";
import type { IApiResponse } from "@/types/api.type";

export function getAllEmployee(params: IGetAllEmployeesParams) {
  return apiClient<IApiResponse<IEmployee[]>>("/employee/all-employee", {
    params,
  });
}

export function getEmployeeById(id: string) {
  return apiClient<IApiResponse<ISingleEmployee>>(`/employee/emp/${id}`);
}

export function deleteEmployeeById(id: string | null) {
  return apiClient<IApiResponse<null>>(`/employee/emp/${id}`, {
    method: "DELETE",
  });
}
