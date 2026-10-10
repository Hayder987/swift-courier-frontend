import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  deleteContactInfo,
  deleteEmployeeById,
  deleteUserById,
  getAllContactInfo,
  getAllEmployee,
  getAllUsers,
  getEmployeeById,
  getUserById,
  updateAdminUserStatus,
} from "@/api";
import type { IGetAllEmployeesParams } from "@/types";
import type { IAdminUserQueryParams } from "@/types/admin.employee.types";
import type { IAllContactParams } from "@/types/contact.info.type";
import type { IAdminUserStatusUpdate } from "@/validation/admin.user.validation";

// employee management
export function useSuspenseGetAllEmployee(params: IGetAllEmployeesParams) {
  return useSuspenseQuery({
    queryKey: ["employees", params],
    queryFn: () => getAllEmployee(params),
  });
}

export function useGetSingleEmployee(employeeId: string) {
  return useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getEmployeeById(employeeId),
    enabled: !!employeeId,
  });
}

export function useDeleteEmployee(employeeId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteEmployeeById(employeeId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });

      if (employeeId) {
        queryClient.invalidateQueries({
          queryKey: ["employee", employeeId],
        });
      }
    },
  });
}

// user management

export function useSuspenseGetAllUsers(params: IAdminUserQueryParams) {
  return useSuspenseQuery({
    queryKey: ["users", params],
    queryFn: () => getAllUsers(params),
  });
}

export function useGetSingleUser(userId: string, enabled = true) {
  return useQuery({
    queryKey: ["user", userId],

    queryFn: () => getUserById(userId),
    enabled: Boolean(userId) && enabled,
    staleTime: 30_000,
    refetchOnMount: true,
  });
}

export function useDeleteUser(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUserById(userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });
    },
  });
}

export function useUpdateUserStatusAdmin(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IAdminUserStatusUpdate) =>
      updateAdminUserStatus(payload, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });
    },
  });
}

// contact service api
export function useSuspenseGetAllContacts(params: IAllContactParams) {
  return useSuspenseQuery({
    queryKey: ["contact", params],
    queryFn: () => getAllContactInfo(params),
  });
}

export function useDeleteContactInfo(contactId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteContactInfo(contactId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contact"],
      });
    },
  });
}
