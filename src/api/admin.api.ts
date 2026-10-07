import apiClient from "@/lib/apiClient";
import type {
  IEmployee,
  IGetAllEmployeesParams,
  ISingleEmployee,
} from "@/types";
import type {
  IAdminSingleUser,
  IAdminUser,
  IAdminUserQueryParams,
} from "@/types/admin.employee.types";
import type { IApiResponse } from "@/types/api.type";
import type { IAdminUserStatusUpdate } from "@/validation/admin.user.validation";

// employee management
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
    method: "PATCH",
  });
}

// // user management
// export function getAllUsers(params: IAdminUserQueryParams) {
//   return apiClient<IApiResponse<IAdminUser[]>>("/users/all-user", {
//     params,
//   });
// }

// export function getUserById(userId: string) {
//   return apiClient<IApiResponse<IAdminSingleUser>>(`/users/user/${userId}`);
// }

// export function deleteUserById(userId: string | null) {
//   return apiClient<IApiResponse<null>>(`/users/user/${userId}`, {
//     method: "PATCH",
//   });
// }

// export function updateAdminUserStatus(
//   payload: IAdminUserStatusUpdate,
//   userId: string
// ) {
//   return apiClient(`/users/user/${userId}`, {
//     method: "PATCH",
//     body: payload,
//   });
// }

// user management

export function getAllUsers(params: IAdminUserQueryParams) {
  return apiClient<IApiResponse<IAdminUser[]>>("/users/all-user", {
    params,
  });
}

export function getUserById(userId: string) {
  return apiClient<IApiResponse<IAdminSingleUser>>(`/users/user/${userId}`);
}

export function updateAdminUserStatus(
  payload: IAdminUserStatusUpdate,
  userId: string,
) {
  return apiClient<IApiResponse<null>>(`/users/user/${userId}/status`, {
    method: "PATCH",
    body: payload,
  });
}

export function deleteUserById(userId: string) {
  return apiClient<IApiResponse<null>>(`/users/user/${userId}`, {
    method: "PATCH",
  });
}
